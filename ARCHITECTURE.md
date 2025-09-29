# Component Architecture & Data Flow

## Component Tree

```
App.tsx (State Management)
│
├── SearchForm.tsx
│   └── Props: { onSubmit, isLoading }
│   └── Handles: User input, validation, form submission
│
├── LoadingSpinner.tsx
│   └── Shown when: isLoading === true
│
├── ErrorMessage.tsx
│   └── Props: { message, onRetry }
│   └── Shown when: error !== ''
│
├── StudentProfileCard.tsx
│   └── Props: { student: StudentData }
│   └── Displays: Name, matric, department, faculty, level, session
│
└── ResultsTable.tsx (x2 - Semester 1 & 2)
    └── Props: { courses: StudentCourse[], semester: string }
    └── Displays: Course results in table format
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         User Action                          │
│                  (Enter Matric Number)                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    SearchForm Component                      │
│  - Validates input using validateMatricNo()                 │
│  - Calls onSubmit(matricNo) if valid                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      App Component                           │
│  - Sets isLoading = true                                    │
│  - Calls fetchStudentData(matricNo)                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   api.service.ts                             │
│  - Makes axios.get() call to backend API                    │
│  - Returns ApiResponse or throws error                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                ┌────────┴────────┐
                │                 │
                ▼                 ▼
        ┌───────────┐      ┌──────────┐
        │  Success  │      │  Error   │
        └─────┬─────┘      └────┬─────┘
              │                 │
              ▼                 ▼
┌──────────────────┐  ┌──────────────────┐
│ App Component    │  │ App Component    │
│ - Sets data      │  │ - Sets error     │
│ - isLoading=false│  │ - isLoading=false│
└────────┬─────────┘  └────────┬─────────┘
         │                     │
         ▼                     ▼
┌─────────────────┐  ┌──────────────────┐
│ Display Results │  │ ErrorMessage.tsx │
└─────────────────┘  └──────────────────┘
         │
    ┌────┴─────┐
    │          │
    ▼          ▼
┌─────────┐ ┌─────────────┐
│ Profile │ │ Results x2  │
│  Card   │ │ (Sem 1 & 2) │
└─────────┘ └─────────────┘
```

## State Management Flow

```typescript
// App.tsx manages all application state

State Variables:
├── studentData: ApiResponse | null
│   └── Contains: student_data, student_courses, current_session
│
├── isLoading: boolean
│   └── Controls: Loading spinner visibility
│
├── error: string
│   └── Contains: Error message (if any)
│
└── hasSearched: boolean
    └── Controls: Which view to show
```

## API Call Flow

```
User Input (Matric Number)
         ↓
validateMatricNo()
         ↓
    [Valid?]
    ↙     ↘
  Yes      No → Show Error
   ↓
fetchStudentData()
   ↓
axios.get(API_URL, { params })
   ↓
Backend API
   ↓
Response
   ↓
[Success?]
  ↙    ↘
Yes     No → Throw Error
 ↓
Return ApiResponse
 ↓
Update State
 ↓
Render Components
```

## Utility Functions Flow

### Grade Calculation
```
Course Result (score)
         ↓
calculateGrade(score)
         ↓
    [Score Type]
    ↙    |    ↘
   NA   Number  Invalid
   ↓     ↓      ↓
  N/A   A-F    N/A
   ↓     ↓      ↓
Return GradeInfo
   ↓
{ grade: string, color: string }
```

### Status Label
```
Course Status ('R'|'C'|'E')
         ↓
getStatusLabel(status)
         ↓
Return Label String
('Required'|'Compulsory'|'Elective')
```

## Component Responsibilities

### App.tsx
**Role**: Orchestrator
- Manages global state
- Handles API calls
- Determines which view to show
- Passes data to child components

### SearchForm.tsx
**Role**: Input Handler
- Collects matric number
- Validates input
- Triggers search action
- Shows validation errors

### StudentProfileCard.tsx
**Role**: Data Display
- Receives student data
- Formats and displays info
- No business logic

### ResultsTable.tsx
**Role**: Data Presenter
- Receives courses array
- Filters by semester
- Calculates total units
- Uses grading utilities
- Handles N/A results

### LoadingSpinner.tsx
**Role**: Feedback
- Shows loading state
- No props needed
- Pure UI component

### ErrorMessage.tsx
**Role**: Error Handler
- Displays error message
- Provides retry button
- Triggers retry action

## Type System Flow

```
API Response (JSON)
         ↓
Validated against ApiResponse interface
         ↓
    ┌────┴─────┐
    ↓          ↓
StudentData  StudentCourse[]
    ↓          ↓
Passed to    Passed to
Profile      Results
Component    Component
```

## Rendering Logic

```typescript
if (!hasSearched) {
  return <SearchForm />
}

if (isLoading) {
  return <LoadingSpinner />
}

if (error) {
  return <ErrorMessage />
}

if (studentData) {
  return (
    <>
      <StudentProfileCard />
      <ResultsTable semester="1" />
      <ResultsTable semester="2" />
    </>
  )
}
```

## Key Design Patterns

1. **Composition**: App composes smaller components
2. **Props Down**: Data flows from parent to children
3. **Events Up**: Actions bubble up via callbacks
4. **Single Source of Truth**: App holds all state
5. **Separation of Concerns**: Each component has one job
6. **Utility Functions**: Reusable logic extracted
7. **Type Safety**: TypeScript interfaces everywhere

## File Dependencies

```
App.tsx
├── imports: SearchForm, StudentProfileCard, ResultsTable, 
│            LoadingSpinner, ErrorMessage
├── imports: fetchStudentData from api.service
└── imports: ApiResponse, StudentCourse from types

SearchForm.tsx
└── imports: validateMatricNo from api.service

StudentProfileCard.tsx
└── imports: StudentData from types

ResultsTable.tsx
├── imports: StudentCourse from types
└── imports: calculateGrade, getStatusLabel, 
             getStatusColor from grading.utils

api.service.ts
├── imports: axios
└── imports: ApiResponse from types

grading.utils.ts
└── imports: GradeInfo from types
```

## Styling Strategy

```
Tailwind Classes
├── Layout: flex, grid, container, max-w-*
├── Colors: green-*, gray-*, red-*, yellow-*
├── Spacing: p-*, m-*, space-*
├── Typography: text-*, font-*
├── Borders: border-*, rounded-*
└── Effects: shadow-*, hover:*, transition-*

Color Scheme:
├── Primary: Green (600-800)
├── Success: Green
├── Warning: Yellow/Orange
├── Error: Red
└── Neutral: Gray
```

---

This architecture provides:
✅ Clear separation of concerns
✅ Easy to test individual components
✅ Simple to add new features
✅ Type-safe data flow
✅ Predictable state management