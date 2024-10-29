import {CheckboxProps} from '../../types/components/checkbox';

const Checkbox = ({name, checked, onChange, label}: CheckboxProps) => {
  return (
    <label className="flex items-center">
      <input type="checkbox" name={name} checked={checked} onChange={onChange} className="mr-2" />
      {label}
    </label>
  );
};

export default Checkbox;
