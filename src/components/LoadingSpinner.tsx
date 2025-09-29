// Loading spinner component

import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-green-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-green-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-green-700 font-medium">Loading student data...</p>
    </div>
  );
};

export default LoadingSpinner;