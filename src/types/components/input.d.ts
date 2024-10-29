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

export {InputProps};
