import React, {useState, useRef, useEffect} from 'react';
import {CgSearch} from 'react-icons/cg';
import ProductCardInline from '../ProductCard/ProductCardInline';
import {Product} from '../../types/product';

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

const AutoComplete = ({
  placeholder = 'Search...',
  onSearch,
  suggestions = [],
  onSuggestionSelect,
  className = '',
  isLoading = false,
  loadMore,
  hasMore = false,
}: AutoCompleteProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setShowSuggestions(true);
    onSearch && onSearch(value);
  };

  const handleSuggestionClick = (suggestion: Product) => {
    setInputValue(suggestion.title);
    setShowSuggestions(false);
    onSuggestionSelect && onSuggestionSelect(suggestion);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    if (!loadMoreRef.current || !loadMore || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadMore();
    });
    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [loadMore, hasMore]);

  return (
    <div ref={wrapperRef} className={`max-w-full sm:max-w-md mx-auto ${className}`}>
      <label htmlFor="autocomplete-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <CgSearch />
        </div>
        <input
          type="search"
          id="autocomplete-search"
          className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          required
          autoComplete="off"
        />

        {/* Show loading if fetching data */}
        {isLoading && (
          <div className="absolute py-5 px-2 bg-white border border-gray-2 rounded-lg mt-2 text-sm text-gray-500 w-full h-full flex flex-col justify-center items-center">
            Loading suggestions...
          </div>
        )}

        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute max-h-96 overflow-hidden overflow-y-auto z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-2">
            {suggestions.map((suggestion) => (
              <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
                <ProductCardInline {...suggestion} />
              </li>
            ))}
            {/* Infinite Scroll Loader */}
            {hasMore && (
              <div ref={loadMoreRef} className="flex justify-center py-4">
                {isLoading ? <span className="text-gray-500">Loading more suggestions...</span> : null}
              </div>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AutoComplete;
