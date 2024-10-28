// ProductList.tsx
import {useInfiniteQuery} from 'react-query';
import {Product, ProductsList} from './../../types/product';
import ProductCard from '../../components/ProductCard/ProductCard';
import CategoriesFilterTop from './CategoriesFilterTop/CategoriesFilterTop';
import {fetchProducts} from '../../services/products';
import {useState, useRef, useCallback, useEffect} from 'react';
import ProductListPageLoader from '../../components/Loader/ProductListPageLoader/ProductListPageLoader';
import {showErrorToast} from '../../utils/toastUtils';

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

  return (
    <div className="bg-gray-50 pb-24">
      <div className="max-w-screen-xl mx-auto">
        <CategoriesFilterTop onChange={handleOnChange} selected={selectedCategory} />

        {isLoading && <ProductListPageLoader />}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 py-6">
          {data?.pages.map((page) =>
            page.products.map((product: Product) => <ProductCard key={product.id} {...product} />)
          )}
        </div>

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
