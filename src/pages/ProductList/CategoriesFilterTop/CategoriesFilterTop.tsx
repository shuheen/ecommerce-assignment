import {useQuery} from 'react-query';
import {useRef, useEffect} from 'react';
import {fetchCategories} from '../../../services/categories';
import CategoriesCardLoader from '../../../components/Loader/CategoriesCardLoader';
import {CategoriesFilterTopProps, CategoriesList} from '../../../types/categories';

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
    <div className="py-5 flex gap-4 px-4 items-center ">
      <span className="cat text-md font-bold">Categories</span>
      <div ref={scrollRef} className="categories-list flex gap-3 overflow-hidden py-2 overflow-x-scroll hide-scrollbar">
        {isLoading ? (
          <CategoriesCardLoader />
        ) : (
          <button
            className={`rounded-full border font-medium px-7 py-2 ${
              selected === 'all'
                ? 'border-sky-700 text-white hover:bg-sky-900 bg-sky-700'
                : 'text-gray-600 border-gray-400 hover:bg-gray-200'
            }`}
            onClick={() => handleClick('all')}
          >
            All
          </button>
        )}

        {data?.map((category) => {
          const {name} = category;
          const categoryId = name.replace(/ '/g, '').toLowerCase();
          return (
            <button
              key={categoryId}
              className={`rounded-full border font-medium px-7 py-2 text-nowrap ${
                selected === categoryId
                  ? 'border-sky-700 text-white hover:bg-sky-900 bg-sky-700'
                  : 'text-gray-600 border-gray-400 hover:bg-gray-200'
              }`}
              onClick={() => handleClick(categoryId)}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesFilterTop;
