import { ErrorMessage, Field } from 'formik';
import { FormikValues } from 'formik/dist/types';
import { useTranslation } from 'react-i18next';
import { handleSanitizedChange } from '@/utils/sanitize-input';

const InputField = (props: FormikValues) => {
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
    ...rest
  } = props;

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
        onBlur={onBlur}
        onChange={handleSanitizedChange(onChange)}
        value={value}
        id={name}
        className={`border sm:text-sm rounded-lg placeholder-gray-400 border-gray-600 p-2.5 bg-gray-700 text-white block w-full ${
          error && touched ? 'border-red-500' : 'focus:ring-blue-500'
        }`}
        placeholder={`Enter your ${t(label).toLowerCase()}`}
        {...rest}
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
