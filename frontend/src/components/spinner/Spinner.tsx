export type SpinnerProps = {
  size?: 'sm';
  color?: string;
};

const Spinner = ({ size, color = 'border-blue-500' }: SpinnerProps) => {
  const spinnerSize =
    size === 'sm'
      ? `h-6 w-6 border-t-2 ${color}`
      : `h-8 w-8 border-t-4 ${color}`;

  return (
    <div
      className={`flex justify-center items-center ${size === 'sm' ? 'h-10' : 'h-16'}`}>
      <div
        data-testid="spinner"
        className={`animate-spin rounded-full ${spinnerSize} border-solid`}></div>
    </div>
  );
};

export default Spinner;
