import { fireEvent, render, screen } from '@testing-library/react';
import LinkButton, { LinkButtonProps } from '..';
import { vi } from 'vitest';

describe('LinkButton', () => {
  const title = 'Title';

  const renderButton = (props: LinkButtonProps) => {
    render(<LinkButton {...props} />);
  };

  test('renders the button with title', () => {
    renderButton({ title: title });
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test('renders with disabled state', () => {
    renderButton({ title: title, isDisabled: true });
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('calls handleClick when clicked', () => {
    const handleClick = vi.fn();
    renderButton({ title: title, handleClick });
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call handleClick when disabled', () => {
    const handleClick = vi.fn();
    renderButton({ title: title, handleClick, isDisabled: true });
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('applies the reset type', () => {
    renderButton({ title: title, type: 'reset' });
    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
  });

  test('applies the submit type', () => {
    renderButton({ title: title, type: 'submit' });
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  test('applies additional classes from className prop', () => {
    renderButton({ title: title, className: 'extra-class' });
    expect(screen.getByRole('button')).toHaveClass('extra-class');
  });

  test('translates the title', () => {
    renderButton({ title: 'translated.title' });
    expect(screen.getByText('translated.title')).toBeInTheDocument();
  });
});
