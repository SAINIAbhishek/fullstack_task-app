import { useTranslation } from 'react-i18next';

export type LinkButtonProps = {
  title: string;
  className?: string;
  isDisabled?: boolean;
  handleClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

const LinkButton = ({
  className,
  title,
  handleClick,
  isDisabled,
  type = 'button',
}: LinkButtonProps) => {
  const { t } = useTranslation();

  const handleButtonClick = () => {
    if (!isDisabled && handleClick) {
      handleClick();
    }
  };

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={handleButtonClick}
      className={`font-medium hover:underline text-primary-500 ml-1 ${className}`}>
      {t(title)}
    </button>
  );
};

export default LinkButton;
