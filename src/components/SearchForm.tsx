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
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Student Result Checker
          </h1>
          <p className="text-gray-600">
            Enter your matric number to view your results
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="matricNo"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Matric Number
            </label>
            <input
              type="text"
              id="matricNo"
              value={matricNo}
              onChange={handleInputChange}
              placeholder="Enter your matric number"
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                validationError
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300"
              } ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
            />
            {validationError && (
              <p className="mt-2 text-sm text-red-600">{validationError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            }`}
          >
            {isLoading ? "Loading..." : "View Results"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
