// TypeScript interfaces for student data

export interface StudentData {
    _id: string;
    department_id_fk: string;
    matricNo: string;
    surname: string;
    firstname: string;
    middlename: string;
    gender_id: string;
    session_admitted_id_fk: string;
    dept_code: string;
    dept: string;
    faculty_id_fk: string;
    school_code: string;
    school: string; // This is actually the faculty
    session_id_fk: string;
    lev_id_fk: string;
    has_registered: string;
    session: string;
    level: string;
}

export interface StudentSession {
    _id: string;
    session: string;
}

export interface StudentCourse {
    id: string;
    student_id_fk: string;
    course_id_fk: string;
    course_code: string;
    course_title: string;
    course_units: string;
    level_id_fk: string;
    semester: string;
    status: 'R' | 'C' | 'E'; // Required, Compulsory, Elective
    session_id_fk: string;
    session: string;
    result: string; // Score or "NA"
    grade_id_fk: string;
    approval: string;
}

export interface CurrentSession {
    _id: string;
    session: string;
    is_current: string;
    last_mod_by: string;
    last_mod_ts: string;
}

export interface ApiResponse {
    status: string;
    student_data: StudentData;
    student_sessions: StudentSession[];
    student_courses: StudentCourse[];
    student_auth_data: any[];
    current_session: CurrentSession;
    message: string;
}

export interface GradeInfo {
    grade: string;
    color: string;
}