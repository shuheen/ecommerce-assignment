import {useQuery} from 'react-query';
import {useRef, useEffect} from 'react';
import {fetchCategories} from '../../../services/categories';
import CategoriesCardLoader from '../../../components/Loader/CategoriesCardLoader';
import {CategoriesFilterTopProps, CategoriesList} from '../../../types/categories';
import Button from '../../../components/Button/Button';

const CategoriesFilterTop = ({onChange, selected}: CategoriesFilterTopProps) => {
  const {data, error, isLoading} = useQuery<CategoriesList[]>('/products/categories', fetchCategories, {
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleClick = (value: string) => {
    onChange!(value);
  };

  // Add horizontal scroll on mouse wheel
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const handleWheelScroll = (event: WheelEvent) => {
      if (scrollContainer) {
        event.preventDefault();
        scrollContainer.scrollLeft += event.deltaY;
      }
    };

    scrollContainer?.addEventListener('wheel', handleWheelScroll);
    return () => scrollContainer?.removeEventListener('wheel', handleWheelScroll);
  }, []);

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="py-5 flex-col gap-6 sm:gap-4 px-4 items-center sm:flex-row">
      <span className="cat text-md font-bold">Categories</span>
      <div
        ref={scrollRef}
        className="categories-list flex gap-3 overflow-hidden py-4 sm:py-2 overflow-x-scroll hide-scrollbar"
      >
        {isLoading ? (
          <CategoriesCardLoader />
        ) : (
          <Button
            className={`!rounded-full !bg-transparent !text-gray-600 border font-medium px-7 py-2 ${
              selected === 'all'
                ? '!border-orange-500 !text-white hover:!bg-orange-600 !bg-orange-500'
                : 'text-gray-600 border-gray-400 hover:bg-gray-200'
            }`}
            onClick={() => handleClick('all')}
          >
            All
          </Button>
        )}

        {data?.map((category) => {
          const {name} = category;
          const categoryId = name.replace(/ '/g, '').toLowerCase();
          return (
            <Button
              key={categoryId}
              className={`!rounded-full !bg-transparent !text-gray-600 border font-medium px-7 py-2 text-nowrap ${
                selected === categoryId
                  ? '!border-orange-500 !text-white hover:bg-orange-600 !bg-orange-500'
                  : 'text-gray-600 border-gray-400 hover:bg-gray-200'
              }`}
              onClick={() => handleClick(categoryId)}
            >
              {name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesFilterTop;
