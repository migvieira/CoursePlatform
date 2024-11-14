import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../stores/authStore';
import AuthLayout from '../../components/auth/AuthLayout';
import FormInput from '../../components/auth/FormInput';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.name, data.email, data.password);
      navigate('/courses');
    } catch (error) {
      setError('root', {
        message: 'Registration failed. Please try again.'
      });
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Full name"
          name="name"
          type="text"
          register={register}
          error={errors.name?.message}
          placeholder="John Doe"
        />

        <FormInput
          label="Email address"
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
          placeholder="you@example.com"
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password?.message}
          placeholder="••••••••"
        />

        <FormInput
          label="Confirm password"
          name="confirmPassword"
          type="password"
          register={register}
          error={errors.confirmPassword?.message}
          placeholder="••••••••"
        />

        {errors.root && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {errors.root.message}
                </h3>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>

        <p className="text-xs text-gray-500 text-center">
          By signing up, you agree to our{' '}
          <Link to="/terms" className="text-blue-600 hover:text-blue-500">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
            Privacy Policy
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;