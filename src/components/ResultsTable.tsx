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
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      {/* Semester Header */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-green-800">
            Semester {semester} Results
          </h3>
          <span className="text-sm font-medium text-gray-600">
            Total Units:{" "}
            <span className="text-green-700 font-bold">{totalUnits}</span>
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-green-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                Course Code
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                Course Title
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-green-800 uppercase tracking-wider">
                Units
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-green-800 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-green-800 uppercase tracking-wider">
                Score
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-green-800 uppercase tracking-wider">
                Grade
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {semesterCourses.map((course) => {
              const gradeInfo = calculateGrade(course.result);
              const isNA = course.result === "NA" || !course.result;

              return (
                <tr
                  key={course.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Course Code */}
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {course.course_code}
                  </td>

                  {/* Course Title */}
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {course.course_title}
                  </td>

                  {/* Units */}
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {course.course_units}
                  </td>

                  {/* Status Badge */}
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        course.status
                      )}`}
                    >
                      {getStatusLabel(course.status)}
                    </span>
                  </td>

                  {/* Score */}
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                    {isNA ? (
                      <span className="text-gray-400 italic">
                        Not Available
                      </span>
                    ) : (
                      <span className="font-semibold text-gray-900">
                        {parseFloat(course.result).toFixed(1)}
                      </span>
                    )}
                  </td>

                  {/* Grade */}
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                    <span className={gradeInfo.color}>{gradeInfo.grade}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      {semesterCourses.some((c) => c.result === "NA" || !c.result) && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <span className="font-semibold">Note:</span> Some results are not
            yet available.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;
