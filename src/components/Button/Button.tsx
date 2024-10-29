// components/Button.tsx
import React, {BaseSyntheticEvent} from 'react';

interface ButtonProps {
  onClick?: (e?: BaseSyntheticEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({onClick, type = 'button', className = '', children, disabled = false}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`w-full py-3 px-3 text-sm tracking-wide rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none font-medium ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
