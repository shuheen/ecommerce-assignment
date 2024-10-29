import {useInfiniteQuery} from 'react-query';
import {ProductsList} from './../../types/product';
import CategoriesFilterTop from './CategoriesFilterTop/CategoriesFilterTop';
import {fetchProducts} from '../../services/products';
import {useState, useRef, useCallback, useEffect} from 'react';
import ProductListPageLoader from '../../components/Loader/ProductListPageLoader/ProductListPageLoader';
import {showErrorToast} from '../../utils/toastUtils';
import ProductGrid from './ProductGrid/ProductGrid';

// Reusable component for loading state
const LoadingState = () => (
  <div className="flex justify-center py-4">
    <ProductListPageLoader />
  </div>
);

// Reusable component for error state
const ErrorState = () => (
  <div className="h-screen flex flex-col justify-center items-center">
    <span className="text-lg font-bold text-gray-500">Something went wrong...</span>
  </div>
);

// Reusable component for no products state
const NoProductsState = () => (
  <div className="h-[calc(100vh-340px)] flex flex-col justify-center items-center w-full">
    <img src="/images/no-product.webp" className="max-w-[250px]" alt="No Products" />
    <span className="text-lg font-bold text-gray-500">No Products Found</span>
  </div>
);

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const limit = 10; // Set limit for products per page
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} = useInfiniteQuery<ProductsList>(
    ['products', selectedCategory],
    ({pageParam = 0}) => fetchProducts(selectedCategory, pageParam, limit),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.products.length < limit ? undefined : allPages.length * limit;
      },
    }
  );

  const handleOnChange = (value: string) => {
    setSelectedCategory(value);
  };

  const observer = useRef<IntersectionObserver | null>(null);
  const loadMore = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      showErrorToast('Something went wrong while fetching products.');
    }
  }, [error]);

  // Flatten all pages of products into a single array
  const products = data?.pages.flatMap((page) => page.products) || [];

  return (
    <div className="bg-gray-50 pb-24">
      <div className="max-w-screen-xl mx-auto">
        <CategoriesFilterTop onChange={handleOnChange} selected={selectedCategory} />
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState />
        ) : products.length === 0 ? (
          <NoProductsState />
        ) : (
          <ProductGrid products={products} />
        )}
        {/* Infinite Scroll Loader */}
        <div ref={loadMoreRef} className="flex justify-center py-4">
          {isFetchingNextPage ? (
            <span className="text-gray-500">Loading more products...</span>
          ) : (
            <div ref={loadMore} />
          )}
        </div>
      </div>
    </div>
  );
}
