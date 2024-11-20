import { handleSanitizedChange } from '@/helpers/SanitizeInputHelper';
import { ErrorMessage, Field } from 'formik';
import { useTranslation } from 'react-i18next';

type TextareaFieldProps = {
  name: string;
  label: string;
  value: string;
  onBlur: React.FocusEventHandler<HTMLTextAreaElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string | undefined;
  touched?: boolean;
  placeholder?: string;
};

const TextareaField = (props: TextareaFieldProps) => {
  const { t } = useTranslation();
  const { name, label, onBlur, onChange, value, error, touched, placeholder } =
    props;

  const placeholderText = placeholder
    ? t(placeholder)
    : `Enter your ${t(label).toLowerCase()}`;

  const fieldClass = `border sm:text-sm rounded-lg placeholder-gray-400 border-gray-600 p-2.5 bg-gray-700 text-white block w-full ${
    error && touched ? 'border-red-500' : 'focus:ring-blue-500'
  }`;

  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-white">
        {t(label)}
      </label>
      <Field
        as="textarea"
        name={name}
        onBlur={onBlur}
        onChange={handleSanitizedChange(onChange)}
        value={value}
        id={name}
        className={fieldClass}
        placeholder={placeholderText}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm pt-1"
      />
    </div>
  );
};

export default TextareaField;
