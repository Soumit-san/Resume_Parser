import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
  onReset: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onReset }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col items-center text-center">
        <div className="bg-red-100 p-4 rounded-full mb-4">
          <AlertTriangle size={32} className="text-red-500" />
        </div>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Error Processing Resume
        </h2>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        <button
          onClick={onReset}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};