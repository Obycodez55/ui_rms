// Utility functions for grade calculation

import type { GradeInfo } from "../types/student.types";


/**
 * Calculate grade from numerical score
 * Grading scale:
 * 70-100 = A
 * 60-69 = B
 * 50-59 = C
 * 45-49 = D
 * 0-44 = F
 */
export const calculateGrade = (score: string): GradeInfo => {
  // Handle NA or empty results
  if (score === 'NA' || !score || score.trim() === '') {
    return {
      grade: 'N/A',
      color: 'text-gray-500',
    };
  }

  const numericScore = parseFloat(score);

  // Handle invalid scores
  if (isNaN(numericScore)) {
    return {
      grade: 'N/A',
      color: 'text-gray-500',
    };
  }

  // Calculate grade based on score
  if (numericScore >= 70) {
    return {
      grade: 'A',
      color: 'text-green-700 font-semibold',
    };
  } else if (numericScore >= 60) {
    return {
      grade: 'B',
      color: 'text-green-600 font-semibold',
    };
  } else if (numericScore >= 50) {
    return {
      grade: 'C',
      color: 'text-yellow-600 font-semibold',
    };
  } else if (numericScore >= 45) {
    return {
      grade: 'D',
      color: 'text-orange-600 font-semibold',
    };
  } else {
    return {
      grade: 'F',
      color: 'text-red-600 font-semibold',
    };
  }
};

/**
 * Get status label from status code
 */
export const getStatusLabel = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    R: 'Required',
    C: 'Compulsory',
    E: 'Elective',
  };
  return statusMap[status] || status;
};

/**
 * Get status color for badge styling
 */
export const getStatusColor = (status: string): string => {
  const colorMap: { [key: string]: string } = {
    R: 'bg-blue-100 text-blue-800',
    C: 'bg-purple-100 text-purple-800',
    E: 'bg-green-100 text-green-800',
  };
  return colorMap[status] || 'bg-gray-100 text-gray-800';
};