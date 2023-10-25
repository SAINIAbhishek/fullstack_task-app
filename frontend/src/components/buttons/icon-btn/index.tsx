import React from 'react';

type Props = {
  title?: string;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  handleClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

const IconButton = ({
  className,
  handleClick,
  isDisabled,
  isLoading,
  children,
  type = 'button',
  title,
}: Props) => {
  return (
    <button
      type={type}
      title={title}
      disabled={isDisabled}
      onClick={handleClick}
      className={`font-medium text-sm p-2.5 text-center inline-flex items-center 
      mr-2 text-blue-500 hover:text-white rounded-full hover:bg-blue-500 ${
        isDisabled || isLoading ? 'cursor-not-allowed' : ''
      } ${className}`}>
      {children}
    </button>
  );
};

export default IconButton;
