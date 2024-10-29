import {motion} from 'framer-motion';
import {Product, ProductsList} from '../../../types/product';
import ProductCard from '../../../components/ProductCard/ProductCard';

// Reusable component for rendering the product grid
const ProductGrid = ({products}: ProductsList) => (
  <motion.div
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 py-6"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {
        opacity: 0,
        transition: {staggerChildren: 0.4},
      },
      visible: {
        opacity: 1,
        transition: {staggerChildren: 0.4},
      },
    }}
  >
    {products.map((product: Product) => (
      <ProductCard key={product.id} {...product} />
    ))}
  </motion.div>
);

export default ProductGrid;
