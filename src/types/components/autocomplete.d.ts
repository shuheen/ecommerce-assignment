interface AutoCompleteProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  suggestions?: Product[];
  onSuggestionSelect?: (suggestion: Product) => void;
  className?: string;
  isLoading?: boolean;
  loadMore?: () => void; // Function to load more results
  hasMore?: boolean; // Indicates if there are more results to load
}

export {AutoCompleteProps};
