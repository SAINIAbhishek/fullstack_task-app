import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import PrimaryButton, { PrimaryButtonProps } from '..';

describe('PrimaryButton', () => {
  const title = 'Title';

  const renderPrimaryButton = (props: PrimaryButtonProps) => {
    render(<PrimaryButton {...props} />);
  };

  test('renders the button with title', () => {
    renderPrimaryButton({ title: title });
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test('renders with loading state', () => {
    renderPrimaryButton({ title: title, isLoading: true });
    expect(screen.queryByText(title)).not.toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toHaveClass(
      'h-6',
      'w-6',
      'border-t-2',
      'border-white',
    );
  });

  test('calls handleClick when clicked', () => {
    const handleClick = vi.fn();
    renderPrimaryButton({ title: title, handleClick });
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('calls handleClick when clicked', () => {
    const handleClick = vi.fn();
    renderPrimaryButton({ title: title, handleClick });
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call handleClick when disabled', () => {
    const handleClick = vi.fn();
    renderPrimaryButton({ title: title, handleClick, isDisabled: true });
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('applies the correct type', () => {
    renderPrimaryButton({ title: title, type: 'submit' });
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  test('applies additional classes from className prop', () => {
    renderPrimaryButton({ title: title, className: 'extra-class' });
    expect(screen.getByRole('button')).toHaveClass('extra-class');
  });

  test('translates the title', () => {
    renderPrimaryButton({ title: 'translated.title' });
    expect(screen.getByText('translated.title')).toBeInTheDocument();
  });
});
