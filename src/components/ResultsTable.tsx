// Results table component for displaying semester courses

import React from "react";
import type { StudentCourse } from "../types/student.types";
import {
  calculateGrade,
  getStatusLabel,
  getStatusColor,
} from "../utils/grading.utils";

interface ResultsTableProps {
  courses: StudentCourse[];
  semester: string;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ courses, semester }) => {
  // Filter courses by semester
  const semesterCourses = courses.filter(
    (course) => course.semester === semester
  );

  // If no courses for this semester, don't render
  if (semesterCourses.length === 0) {
    return null;
  }

  // Calculate total units for the semester
  const totalUnits = semesterCourses.reduce(
    (sum, course) => sum + parseInt(course.course_units || "0"),
    0
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 transform transition-all duration-500 hover:shadow-xl hover:scale-105 animate-fadeInUp">
      {/* Semester Header */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 animate-bounceIn">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-800 animate-fadeInLeft delay-200">
              Semester {semester} Results
            </h3>
          </div>
          <div className="animate-fadeInRight delay-300">
            <span className="text-sm font-medium text-gray-600">
              Total Units:{" "}
              <span className="text-green-700 font-bold bg-green-100 px-2 py-1 rounded-full">
                {totalUnits}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-green-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider animate-fadeInUp delay-400">
                Course Code
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider animate-fadeInUp delay-500">
                Course Title
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-green-800 uppercase tracking-wider animate-fadeInUp delay-600">
                Units
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-green-800 uppercase tracking-wider animate-fadeInUp delay-700">
                Status
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-green-800 uppercase tracking-wider animate-fadeInUp delay-800">
                Score
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-green-800 uppercase tracking-wider animate-fadeInUp delay-900">
                Grade
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {semesterCourses.map((course, index) => {
              const gradeInfo = calculateGrade(course.result);
              const isNA = course.result === "NA" || !course.result;

              return (
                <tr
                  key={course.id}
                  className="hover:bg-gray-50 transition-all duration-300 hover:scale-105 animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Course Code */}
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <span className="bg-gray-100 px-2 py-1 rounded-md font-mono">
                      {course.course_code}
                    </span>
                  </td>

                  {/* Course Title */}
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {course.course_title}
                  </td>

                  {/* Units */}
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                      {course.course_units}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 hover:scale-110 ${getStatusColor(
                        course.status
                      )}`}
                    >
                      {getStatusLabel(course.status)}
                    </span>
                  </td>

                  {/* Score */}
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                    {isNA ? (
                      <span className="text-gray-400 italic animate-pulse">
                        Not Available
                      </span>
                    ) : (
                      <span className="font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded-md">
                        {parseFloat(course.result).toFixed(1)}
                      </span>
                    )}
                  </td>

                  {/* Grade */}
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                    <span className={`${gradeInfo.color} font-bold text-lg px-3 py-1 rounded-full transition-all duration-300 hover:scale-110`}>
                      {gradeInfo.grade}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      {semesterCourses.some((c) => c.result === "NA" || !c.result) && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg animate-fadeInUp delay-1000">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-yellow-600 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-yellow-800">
              <span className="font-semibold">Note:</span> Some results are not
              yet available.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;
