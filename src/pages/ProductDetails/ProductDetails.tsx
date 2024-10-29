import React, {useEffect} from 'react';
import {useQuery} from 'react-query';
import ProductGallery from './ProductGallery/ProductGallery';
import ProductInfo from './ProductInfo/ProductInfo';
import {fetchProductDetails} from '../../services/products';
import {useLocation} from 'react-router-dom';
import ProductListPageLoader from '../../components/Loader/ProductListPageLoader/ProductListPageLoader';
import LoaderMutationDots from '../../components/Loader/LoaderMutationDots';

const ProductDetails = () => {
  const location = useLocation();
  const {pathname} = location;
  const id = pathname.split('/').at(-1);

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useQuery(['product', id], () => fetchProductDetails(parseFloat(id!)), {
    enabled: !!id,
  });

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  if (isLoading) return <LoaderMutationDots />;
  if (error) return <p>Error loading product</p>;
  return (
    <div className="p-4 py-6 max-w-screen-xl mx-auto">
      <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
        <ProductGallery images={product.images} />
        <ProductInfo {...product} />
      </div>
    </div>
  );
};

export default ProductDetails;
