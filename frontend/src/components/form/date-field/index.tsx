import { ErrorMessage } from 'formik';
import { FormikValues } from 'formik/dist/types';
import DatePicker from 'react-datepicker';
import { DATE_FORMAT } from '@/config';
import { useTranslation } from 'react-i18next';

const DateField = ({
  name,
  label,
  onBlur,
  onChange,
  value,
  error,
  touched,
  dateFormat = DATE_FORMAT,
  ...props
}: FormikValues) => {
  const { t } = useTranslation();

  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-white">
        {t(label)}
      </label>
      <DatePicker
        selected={value}
        dateFormat={dateFormat}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        name={name}
        className={`border sm:text-sm rounded-lg placeholder-gray-400 border-gray-600 p-2.5 bg-gray-700 text-white block w-full ${
          error && touched ? 'border-red-500' : 'focus:ring-blue-500'
        }`}
        {...props}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm pt-1"
      />
    </div>
  );
};

export default DateField;
