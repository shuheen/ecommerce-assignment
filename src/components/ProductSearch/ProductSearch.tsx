// ProductSearch.tsx
import React, {useState} from 'react';
import {useInfiniteQuery} from 'react-query';
import {debounce} from 'lodash';
import AutoComplete from './../AutoComplete/AutoComplete';
import {ProductsList} from '../../types/product';
import {fetchProductsByQuery} from '../../services/products';

const ProductSearch = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const limit = 10; // Set number of items per page

  const handleInputChange = debounce((query: string) => {
    setInputValue(query);
  }, 300);

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} = useInfiniteQuery<ProductsList>(
    ['fetchSuggestions', inputValue],
    ({pageParam = 0}) => fetchProductsByQuery(inputValue, pageParam, limit),
    {
      enabled: !!inputValue,
      staleTime: 1000 * 60 * 5,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.products.length < limit ? undefined : allPages.length * limit;
      },
    }
  );

  return (
    <AutoComplete
      className="w-[500px]"
      placeholder="Search products..."
      onSearch={handleInputChange}
      suggestions={data?.pages.flatMap((page) => page.products) || []}
      isLoading={isLoading || isFetchingNextPage}
      loadMore={fetchNextPage} // Load next page when user scrolls to the end
      hasMore={!!hasNextPage} // Pass flag if more results are available
    />
  );
};

export default ProductSearch;
