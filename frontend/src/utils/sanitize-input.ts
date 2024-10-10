import DOMPurify from 'dompurify';

/**
 * Generic handler for sanitizing input values.
 * @param handleChange - The onChange handler function from the input component.
 */
export const handleSanitizedChange = (
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = DOMPurify.sanitize(e.target.value);
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        name: e.target.name,
        value: sanitizedValue,
      },
    };
    handleChange(syntheticEvent);
  };
};
