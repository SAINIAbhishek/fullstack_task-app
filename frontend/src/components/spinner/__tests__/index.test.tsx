import { render, screen } from '@testing-library/react';
import Spinner, { SpinnerProps } from '..';

describe('Spinner', () => {
  const renderSpinner = (props: SpinnerProps) => {
    render(<Spinner {...props} />);
    return screen.getByTestId('spinner');
  };

  test('renders with default props', () => {
    const spinner = renderSpinner({});
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('h-8', 'w-8', 'border-t-4', 'border-blue-500');
  });

  test('renders with small size', () => {
    const spinner = renderSpinner({ size: 'sm' });
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('h-6', 'w-6', 'border-t-2', 'border-blue-500');
  });

  test('renders with custom color', () => {
    const spinner = renderSpinner({ color: 'border-red-500' });
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('border-red-500');
  });

  test('renders with small size and custom color', () => {
    const spinner = renderSpinner({ size: 'sm', color: 'border-green-500' });
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('h-6', 'w-6', 'border-t-2', 'border-green-500');
  });
});
