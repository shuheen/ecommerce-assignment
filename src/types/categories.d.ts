interface CategoriesList {
  slug: string;
  name: string;
  url: string;
}
interface CategoriesFilterTopProps {
  onChange?: (value: string) => void;
  selected: string;
}

export {CategoriesFilterTopProps, CategoriesList};
