import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { EMAIL_PATTERN } from '@/utils/regex';
import { RegisterType } from '@/features/auth/types/register.type';
import InputField from '@/components/form/input-field';
import { API_REGISTER_USER } from '@/api/auth.api';
import CheckboxField from '@/components/form/checkbox-field';
import Spinner from '@/components/spinner';
import { AUTH_BASE_ROUTE } from '@/features/auth/routes';

const validationSchema = yup.object().shape({
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Email is invalid')
    .matches(EMAIL_PATTERN, 'Email is invalid')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 characters minimum'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the Terms and Conditions'),
});

const initialValues: RegisterType = {
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  terms: false,
};

const RegisterForm = () => {
  const navigate = useNavigate();

  const { mutate, isError } = useMutation(API_REGISTER_USER, {
    onSuccess: (data) => {
      toast.success(data.message);
      navigate(`${AUTH_BASE_ROUTE}/login`);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => mutate(values)}
      validationSchema={validationSchema}>
      {({
        values,
        handleBlur,
        errors,
        touched,
        handleChange,
        handleSubmit,
        dirty,
        isValid,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-6">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <InputField
                name="firstname"
                label="First Name"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstname}
                error={errors.firstname}
                touched={touched.firstname}
              />
            </div>

            <div className="w-1/2">
              <InputField
                name="lastname"
                label="Last Name"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastname}
                error={errors.lastname}
                touched={touched.lastname}
              />
            </div>
          </div>

          <InputField
            name="email"
            label="Email Address"
            type="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            error={errors.email}
            touched={touched.email}
          />

          <InputField
            name="password"
            label="Password"
            type="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            error={errors.password}
            touched={touched.password}
          />

          <CheckboxField
            name="terms"
            label="I accept the Terms and Conditions"
            checked={values.terms}
            onChange={handleChange}
            error={errors.terms}
            touched={touched.terms}
          />

          <button
            type="submit"
            disabled={!(dirty && isValid)}
            className={`w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-center bg-primary-600 hover:bg-primary-700 px-5 ${
              isSubmitting && !isError ? '' : 'py-2.5'
            } ${!(dirty && isValid) ? 'cursor-not-allowed' : ''}`}>
            {isSubmitting && !isError ? (
              <Spinner size="sm" color="border-white" />
            ) : (
              'Create an account'
            )}
          </button>

          <p className="text-sm font-light text-gray-400">
            Already have an account?
            <button
              type="button"
              onClick={() => navigate(`${AUTH_BASE_ROUTE}/login`)}
              className="font-medium hover:underline text-primary-500 ml-1">
              Login here
            </button>
          </p>
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;
