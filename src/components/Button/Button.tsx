import {ButtonProps} from '../../types/components/button';

const Button = ({onClick, type = 'button', className = '', children, disabled = false}: ButtonProps) => {
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
