import { ErrorMessage, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { handleSanitizedChange } from '@/helpers/SanitizeInputHelper';

type InputFieldProps = {
  name: string;
  label: string;
  type: string;
  value: string | number;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string | undefined;
  touched?: boolean;
  placeholder?: string;
  readOnly?: boolean;
};

const InputField = (props: InputFieldProps) => {
  const { t } = useTranslation();
  const {
    name,
    label,
    type,
    onBlur,
    onChange,
    value,
    error,
    touched,
    placeholder,
    readOnly,
  } = props;

  const handleOnChange =
    readOnly || !onChange ? null : handleSanitizedChange(onChange);

  const handleOnBlur = readOnly ? null : onBlur;

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
        type={type}
        name={name}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        value={value}
        id={name}
        readOnly={readOnly}
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

export default InputField;
