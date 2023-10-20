import Spinner from '@/components/spinner';

type Props = {
  title: string;
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  handleClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

const PrimaryButton = ({
  className,
  title,
  handleClick,
  isLoading,
  isDisabled,
  type = 'button',
}: Props) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={handleClick}
      className={`w-full bg-primary-600 text-white focus:outline-none font-medium px-3 rounded-lg w-auto transition hover:bg-primary-700 ${
        isLoading ? 'py-1' : 'py-2.5'
      } ${isDisabled || isLoading ? 'cursor-not-allowed' : ''} ${className}`}>
      {isLoading ? <Spinner size="sm" color="border-white" /> : title}
    </button>
  );
};

export default PrimaryButton;
