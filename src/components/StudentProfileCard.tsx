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
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 transform transition-all duration-500 hover:shadow-xl hover:scale-105 animate-fadeInUp">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 animate-bounceIn">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-800 animate-fadeInLeft delay-200">
            Student Information
          </h2>
        </div>
      </div>

      {/* Student Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="animate-fadeInUp delay-300">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Full Name
          </label>
          <p className="text-lg font-semibold text-gray-900">{fullName}</p>
        </div>

        {/* Matric Number */}
        <div className="animate-fadeInUp delay-400">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Matric Number
          </label>
          <p className="text-lg font-semibold text-gray-900">
            {student.matricNo}
          </p>
        </div>

        {/* Department */}
        <div className="animate-fadeInUp delay-500">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Department
          </label>
          <p className="text-lg font-semibold text-gray-900">{student.dept}</p>
        </div>

        {/* Faculty */}
        <div className="animate-fadeInUp delay-600">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Faculty
          </label>
          <p className="text-lg font-semibold text-gray-900">
            {student.school}
          </p>
        </div>

        {/* Current Level */}
        <div className="animate-fadeInUp delay-700">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Current Level
          </label>
          <p className="text-lg font-semibold text-gray-900">
            {student.level} Level
          </p>
        </div>

        {/* Current Session */}
        <div className="animate-fadeInUp delay-800">
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
