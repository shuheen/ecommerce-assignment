interface ButtonProps {
  onClick?: (e?: BaseSyntheticEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export {ButtonProps};
