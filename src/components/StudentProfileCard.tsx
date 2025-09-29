// Student profile card component

import React from "react";
import type { StudentData } from "../types/student.types";

interface StudentProfileCardProps {
  student: StudentData;
}

const StudentProfileCard: React.FC<StudentProfileCardProps> = ({ student }) => {
  // Format full name
  const fullName =
    `${student.surname} ${student.firstname} ${student.middlename}`.trim();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-2xl font-bold text-green-800">
          Student Information
        </h2>
      </div>

      {/* Student Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Full Name
          </label>
          <p className="text-lg font-semibold text-gray-900">{fullName}</p>
        </div>

        {/* Matric Number */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Matric Number
          </label>
          <p className="text-lg font-semibold text-gray-900">
            {student.matricNo}
          </p>
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Department
          </label>
          <p className="text-lg font-semibold text-gray-900">{student.dept}</p>
        </div>

        {/* Faculty */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Faculty
          </label>
          <p className="text-lg font-semibold text-gray-900">
            {student.school}
          </p>
        </div>

        {/* Current Level */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Current Level
          </label>
          <p className="text-lg font-semibold text-gray-900">
            {student.level} Level
          </p>
        </div>

        {/* Current Session */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Current Session
          </label>
          <p className="text-lg font-semibold text-gray-900">
            {student.session}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileCard;
