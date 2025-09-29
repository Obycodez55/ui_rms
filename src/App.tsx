// Main App component

import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import StudentProfileCard from "./components/StudentProfileCard";
import ResultsTable from "./components/ResultsTable";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import { fetchStudentData } from "./services/api.service";
import type { ApiResponse, StudentCourse } from "./types/student.types";

const App: React.FC = () => {
  const [studentData, setStudentData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (matricNo: string) => {
    setIsLoading(true);
    setError("");
    setHasSearched(true);
    setStudentData(null);

    try {
      const data = await fetchStudentData(matricNo);
      setStudentData(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setHasSearched(false);
    setError("");
    setStudentData(null);
  };

  // Filter courses for current session only
  const getCurrentSessionCourses = (): StudentCourse[] => {
    if (!studentData) return [];

    const currentSessionId = studentData.current_session._id;
    return studentData.student_courses.filter(
      (course) => course.session_id_fk === currentSessionId
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Show search form if no search has been made */}
        {!hasSearched && (
          <SearchForm onSubmit={handleSearch} isLoading={isLoading} />
        )}

        {/* Show loading state */}
        {isLoading && <LoadingSpinner />}

        {/* Show error state */}
        {error && !isLoading && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {/* Show results */}
        {studentData && !isLoading && !error && (
          <div>
            {/* Student Profile */}
            <StudentProfileCard student={studentData.student_data} />

            {/* Results Tables */}
            <div className="space-y-6">
              <ResultsTable courses={getCurrentSessionCourses()} semester="1" />
              <ResultsTable courses={getCurrentSessionCourses()} semester="2" />
            </div>

            {/* No courses message */}
            {getCurrentSessionCourses().length === 0 && (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <p className="text-gray-600">
                  No courses found for the current session.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
