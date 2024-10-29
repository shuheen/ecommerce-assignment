import {FormProps} from '../../types/components/form';

const Form = ({onSubmit, children}: FormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {children}
    </form>
  );
};

export default Form;
