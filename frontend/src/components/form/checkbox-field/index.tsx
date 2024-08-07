import { ErrorMessage, Field } from 'formik';
import { FormikValues } from 'formik/dist/types';
import { useTranslation } from 'react-i18next';

const CheckboxField = ({ name, label, onChange, value }: FormikValues) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <Field
            type="checkbox"
            id={name}
            name={name}
            checked={value}
            onChange={onChange}
            value={value}
            className="w-4 h-4 border rounded focus:ring-3 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor={name} className="font-light text-gray-300">
            {t(label)}
          </label>
        </div>
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm pt-1"
      />
    </div>
  );
};

export default CheckboxField;
