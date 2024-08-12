import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import IconButton, { IconButtonProps } from '..';

describe('IconButton', () => {
  const renderButton = (props: IconButtonProps) => {
    render(<IconButton {...props} />);
  };

  test('renders the button with children', () => {
    renderButton({ children: <span>Icon</span> });
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  test('renders with disabled state', () => {
    renderButton({ children: <span>Icon</span>, isDisabled: true });
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('cursor-not-allowed');
  });

  test('renders with loading state', () => {
    renderButton({ children: <span>Icon</span>, isLoading: true });
    const button = screen.getByRole('button');
    expect(button).toHaveClass('cursor-not-allowed');
  });

  test('calls handleClick when clicked', () => {
    const handleClick = vi.fn();
    renderButton({ children: <span>Icon</span>, handleClick });
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call handleClick when disabled', () => {
    const handleClick = vi.fn();
    renderButton({
      children: <span>Icon</span>,
      handleClick,
      isDisabled: true,
    });
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('applies the submit type', () => {
    renderButton({ children: <span>Icon</span>, type: 'submit' });
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  test('applies the reset type', () => {
    renderButton({ children: <span>Icon</span>, type: 'reset' });
    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
  });

  test('applies additional classes from className prop', () => {
    renderButton({
      children: <span>Icon</span>,
      className: 'extra-class',
    });
    expect(screen.getByRole('button')).toHaveClass('extra-class');
  });

  test('translates the title', () => {
    renderButton({
      children: <span>Icon</span>,
      title: 'translated.title',
    });
    expect(screen.getByRole('button')).toHaveAttribute(
      'title',
      'translated.title',
    );
  });
});
