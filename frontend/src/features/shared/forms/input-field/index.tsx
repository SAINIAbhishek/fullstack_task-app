import { ErrorMessage, Field } from 'formik';
import { FormikValues } from 'formik/dist/types';

const InputField = ({
  name,
  label,
  type,
  onBlur,
  onChange,
  value,
  error,
  touched,
  ...props
}: FormikValues) => (
  <div>
    <label htmlFor={name} className="block mb-2 text-sm font-medium text-white">
      {label}
    </label>
    <Field
      type={type}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
      id={name}
      className={`border sm:text-sm rounded-lg placeholder-gray-400 border-gray-600 p-2.5 bg-gray-700 text-white block w-full ${
        error && touched ? 'border-red-500' : 'focus:ring-blue-500'
      }`}
      placeholder={`Enter your ${label.toLowerCase()}`}
      {...props}
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm pt-1"
    />
  </div>
);

export default InputField;
