import Spinner from '@/components/spinner';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={handleClick}
      className={`w-auto bg-primary-600 text-white focus:outline-none font-medium px-3 rounded-lg transition hover:bg-primary-700 ${
        isLoading ? 'py-1' : 'py-2.5'
      } ${isDisabled || isLoading ? 'cursor-not-allowed' : ''} ${className}`}>
      {isLoading ? <Spinner size="sm" color="border-white" /> : t(title)}
    </button>
  );
};

export default PrimaryButton;
