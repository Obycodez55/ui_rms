// Loading spinner component

import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fadeInUp">
      {/* Main spinner */}
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-green-200 rounded-full animate-spin border-t-green-600"></div>
        
        {/* Inner ring */}
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-green-100 rounded-full animate-spin border-t-green-500" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
      </div>

      {/* Loading text with animation */}
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold text-green-800 animate-fadeInUp delay-200">
          Loading Student Data
        </h3>
        <p className="text-gray-600 mt-2 animate-fadeInUp delay-300">
          Please wait while we fetch your results...
        </p>
        
        {/* Animated dots */}
        <div className="flex justify-center mt-4 space-x-1">
          <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-green-100 rounded-full mt-6 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full animate-shimmer"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;