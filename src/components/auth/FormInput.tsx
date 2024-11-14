import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  register: UseFormRegister<any>;
  error?: string;
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type,
  register,
  error,
  placeholder
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={name}
          type={type}
          {...register(name)}
          placeholder={placeholder}
          className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;