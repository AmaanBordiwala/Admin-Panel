'use client';

import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { Eye, EyeOff } from 'lucide-react';

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  icon: React.ElementType;
  showPasswordToggle?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  placeholder,
  icon: Icon,
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-foreground">
        {label}
      </label>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>

        <Field
          id={name}
          name={name}
          type={showPasswordToggle && showPassword ? 'text' : type}
          placeholder={placeholder}
          className="
            block w-full pl-10 pr-3 py-3 rounded-xl border
            bg-input text-foreground placeholder-muted-foreground
            border-border
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            transition-all duration-200
          "
        />

        {showPasswordToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
};

export default InputField;
