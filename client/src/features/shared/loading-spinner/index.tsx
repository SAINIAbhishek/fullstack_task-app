import React from 'react';

type Props = {
  size?: 'sm';
  color?: string;
};

const LoadingSpinner = ({ size, color = 'border-blue-500' }: Props) => {
  const spinnerSize =
    size === 'sm'
      ? `h-6 w-6 border-t-2 ${color}`
      : `h-8 w-8 border-t-4 ${color}`;

  return (
    <div
      className={`flex justify-center items-center ${
        size === 'sm' ? 'h-10' : 'h-16'
      }`}>
      <div
        className={`animate-spin rounded-full ${spinnerSize} border-solid`}></div>
    </div>
  );
};

export default LoadingSpinner;
