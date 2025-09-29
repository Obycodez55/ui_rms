// Search form component for matric number input

import React, { useState } from "react";
import { validateMatricNo } from "../services/api.service";

interface SearchFormProps {
  onSubmit: (matricNo: string) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit, isLoading }) => {
  const [matricNo, setMatricNo] = useState("");
  const [validationError, setValidationError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate matric number
    const validation = validateMatricNo(matricNo);

    if (!validation.isValid) {
      setValidationError(validation.error || "Invalid matric number");
      return;
    }

    // Clear any previous errors
    setValidationError("");

    // Submit the form
    onSubmit(matricNo.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMatricNo(e.target.value);
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 transform transition-all duration-500 hover:shadow-xl hover:scale-105">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeInDown">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 animate-bounceIn">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-2 animate-fadeInUp delay-200">
            Student Result Checker
          </h1>
          <p className="text-gray-600 animate-fadeInUp delay-300">
            Enter your matric number to view your results
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 animate-fadeInUp delay-400">
          <div>
            <label
              htmlFor="matricNo"
              className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200"
            >
              Matric Number
            </label>
            <div className="relative">
              <input
                type="text"
                id="matricNo"
                value={matricNo}
                onChange={handleInputChange}
                placeholder="Enter your matric number"
                disabled={isLoading}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 transform hover:scale-105 ${
                  validationError
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500 animate-pulse"
                    : "border-gray-300"
                } ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
              />
              {isLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
                </div>
              )}
            </div>
            {validationError && (
              <div className="mt-2 animate-fadeInDown">
                <p className="text-sm text-red-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {validationError}
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg hover:shadow-xl"
            }`}
          >
            <span className="flex items-center justify-center">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Loading...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  View Results
                </>
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
