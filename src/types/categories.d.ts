type CategoriesList = {
  slug: string;
  name: string;
  url: string;
};
type CategoriesFilterTopProps = {
  onChange?: (value: string) => void;
  selected: string;
};

export {CategoriesFilterTopProps, CategoriesList};
