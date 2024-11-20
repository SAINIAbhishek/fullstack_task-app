import Spinner from '@/components/spinner/Spinner';
import { useTranslation } from 'react-i18next';

export type PrimaryButtonProps = {
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
}: PrimaryButtonProps) => {
  const { t } = useTranslation();

  const handleButtonClick = () => {
    if (!isDisabled && !isLoading && handleClick) {
      handleClick();
    }
  };

  return (
    <button
      type={type}
      disabled={isDisabled || isLoading}
      onClick={handleButtonClick}
      className={`w-auto bg-primary-600 text-white focus:outline-none font-medium px-3 rounded-lg transition hover:bg-primary-700 ${
        isLoading ? 'py-1' : 'py-2.5'
      } ${isDisabled || isLoading ? 'cursor-not-allowed' : ''} ${className}`}>
      {isLoading ? <Spinner size="sm" color="border-white" /> : t(title)}
    </button>
  );
};

export default PrimaryButton;
