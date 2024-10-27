import { Product } from "../types/product";
import api from "../utils/axios";

const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};


export {fetchProducts}