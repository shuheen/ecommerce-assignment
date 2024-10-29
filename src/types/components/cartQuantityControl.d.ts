interface CartQuantityControlProps {
  quantity: number;
  onIncrement: (e?: BaseSyntheticEvent) => void;
  onDecrement: (e?: BaseSyntheticEvent) => void;
  onRemove: (e?: BaseSyntheticEvent) => void;
  className?: string;
}

export {CartQuantityControlProps};
