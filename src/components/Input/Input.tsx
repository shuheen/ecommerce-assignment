// components/Input.tsx
import React from 'react';

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  showIcon?: boolean;
  icon?: React.ReactNode;
  onClickIcon?: () => void; // Added this prop
  className?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  required = false,
  showIcon = false,
  icon,
  onClickIcon,
  className = '',
}) => {
  return (
    <div className="relative flex items-center">
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className={`w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 ${className}`}
        placeholder={placeholder}
        autoComplete="off"
      />
      {showIcon && icon && (
        <span
          className={`absolute right-4 cursor-pointer ${value === '' && onClickIcon && 'cursor-default opacity-50'}`}
          onClick={value && onClickIcon ? onClickIcon : () => false}
        >
          {icon}
        </span>
      )}
    </div>
  );
};

export default Input;
