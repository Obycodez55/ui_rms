// Error message component

import React from "react";

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="max-w-md mx-auto mt-8 animate-fadeInUp">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 transform transition-all duration-500 hover:shadow-lg hover:scale-105">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center animate-bounceIn">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
          </div>
          <div className="ml-3 flex-1 animate-fadeInLeft delay-200">
            <h3 className="text-sm font-medium text-red-800 animate-fadeInUp delay-300">
              Error Loading Data
            </h3>
            <p className="mt-2 text-sm text-red-700 animate-fadeInUp delay-400">
              {message}
            </p>
            <div className="mt-4 animate-fadeInUp delay-500">
              <button
                onClick={onRetry}
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Try Again
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
