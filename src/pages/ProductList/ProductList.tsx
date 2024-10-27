// components/ProductList.tsx
import {useQuery} from 'react-query';
import {Product} from './../../types/product';
import ProductCard from '../../components/ProductCard/ProductCard';
import CategoriesFilterTop from '../../components/CategoriesFilterTop/CategoriesFilterTop';
import { fetchProducts } from '../../services/products';
import { fetchCategories } from '../../services/categories';



export default function ProductList() {
  const {data:products, error:productsError, isLoading:productsLoading} = useQuery<Product[]>('/products', fetchProducts);
  const {data: categories, error: categoriesError, isLoading: categoriesLoading} = useQuery<string[]>('/products/categories', fetchCategories);

  if (productsLoading || categoriesError) return <div>Loading...</div>;
  if (productsError || categoriesLoading) return <div>Error fetching products</div>;
console.log(categories)
    return (
      <div className="bg-gray-50">
        <div className="max-w-screen-xl mx-auto ">
            <div className="mt-[60px]">
                <CategoriesFilterTop categories={categories!} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 py-6">
                {products?.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
                </div>
          </div>
        </div>
      </div>
    );
}
