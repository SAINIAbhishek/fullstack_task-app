import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-16">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-8 w-8"></div>
    </div>
  );
};

export default LoadingSpinner;
