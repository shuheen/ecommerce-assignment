// components/Checkbox.tsx
import React from 'react';

interface CheckboxProps {
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const Checkbox = ({name, checked, onChange, label}: CheckboxProps) => {
  return (
    <label className="flex items-center">
      <input type="checkbox" name={name} checked={checked} onChange={onChange} className="mr-2" />
      {label}
    </label>
  );
};

export default Checkbox;
