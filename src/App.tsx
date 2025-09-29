// Main App component

import React, { useState, useEffect } from "react";
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
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Page load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
    <div className={`min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8 px-4 transition-all duration-1000 ${
      isPageLoaded ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Show search form if no search has been made */}
        {!hasSearched && (
          <div className={`transition-all duration-700 delay-200 ${
            isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <SearchForm onSubmit={handleSearch} isLoading={isLoading} />
          </div>
        )}

        {/* Show loading state */}
        {isLoading && (
          <div className={`transition-all duration-500 ${
            isLoading ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <LoadingSpinner />
          </div>
        )}

        {/* Show error state */}
        {error && !isLoading && (
          <div className={`transition-all duration-500 ${
            error ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <ErrorMessage message={error} onRetry={handleRetry} />
          </div>
        )}

        {/* Show results */}
        {studentData && !isLoading && !error && (
          <div className={`transition-all duration-700 ${
            studentData ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* Student Profile */}
            <div className="animate-fadeInUp">
              <StudentProfileCard student={studentData.student_data} />
            </div>

            {/* Results Tables */}
            <div className="space-y-6">
              <div className="animate-fadeInUp delay-200">
                <ResultsTable courses={getCurrentSessionCourses()} semester="1" />
              </div>
              <div className="animate-fadeInUp delay-400">
                <ResultsTable courses={getCurrentSessionCourses()} semester="2" />
              </div>
            </div>

            {/* No courses message */}
            {getCurrentSessionCourses().length === 0 && (
              <div className="animate-fadeInUp delay-600">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                  <p className="text-gray-600">
                    No courses found for the current session.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
