// components/Form.tsx
import React from 'react';

interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({onSubmit, children}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {children}
    </form>
  );
};

export default Form;
