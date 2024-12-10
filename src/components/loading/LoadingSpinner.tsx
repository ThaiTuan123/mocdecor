import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
  </div>
);

export default LoadingSpinner;
