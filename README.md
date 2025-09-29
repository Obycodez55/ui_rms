# Student Result Checker

A modern, responsive web application for checking student results at the University of Ibadan. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🔍 **Simple Search**: Enter matric number to view results
- 📊 **Detailed Results**: View courses with scores, grades, and status
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🎨 **Clean UI**: Modern interface with green color scheme
- ⚡ **Fast**: Built with Vite for optimal performance
- 🔒 **Type-Safe**: Built with TypeScript

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Vite** - Build tool

## Project Structure

```
src/
├── components/          # React components
│   ├── SearchForm.tsx          # Matric number input
│   ├── StudentProfileCard.tsx  # Student information display
│   ├── ResultsTable.tsx        # Course results table
│   ├── LoadingSpinner.tsx      # Loading state
│   └── ErrorMessage.tsx        # Error display
├── services/           # API services
│   └── api.service.ts         # Axios API calls
├── types/              # TypeScript types
│   └── student.types.ts       # Data interfaces
├── utils/              # Utility functions
│   └── grading.utils.ts       # Grade calculation
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## Grading Scale

- **A**: 70-100
- **B**: 60-69
- **C**: 50-59
- **D**: 45-49
- **F**: 0-44

## Course Status

- **R**: Required
- **C**: Compulsory
- **E**: Elective

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd student-result-checker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

1. Enter a valid matric number in the search form
2. Click "View Results" to fetch student data
3. View student information and results organized by semester
4. Results are displayed for the current academic session only

## API Integration

The application fetches data from:
```
https://uirms.ui.edu.ng/backend/student.php?action=get_student_data_res&matricNo={matricNo}
```

## Features in Detail

### Search Form
- Input validation for matric numbers
- Clear error messages
- Loading state during API calls

### Student Profile
- Full name display
- Matric number
- Department and Faculty
- Current level and session

### Results Tables
- Separate tables for Semester 1 and Semester 2
- Course code, title, and units
- Status badges (Required/Compulsory/Elective)
- Score display with grade calculation
- Handling of unavailable results (N/A)
- Total units calculation per semester

### Error Handling
- Network error messages
- Invalid matric number validation
- Retry functionality
- User-friendly error displays

## Design Decisions

1. **Modular Architecture**: Components, services, types, and utils are separated for maintainability
2. **Type Safety**: Full TypeScript implementation for reliability
3. **Single Search**: Users can only search one student at a time (no search history)
4. **Current Session Only**: Only displays courses from the current academic session
5. **Green Theme**: Consistent color scheme throughout the application
6. **Responsive Tables**: Mobile-friendly table design with horizontal scroll

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

Potential features for future versions:
- GPA/CGPA calculation
- Print/download results
- Search history (localStorage)
- Multi-session view toggle
- PDF export functionality

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is created for educational purposes.

## Contact

For issues or questions, please open an issue in the repository.