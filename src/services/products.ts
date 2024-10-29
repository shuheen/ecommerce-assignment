import {API_BASE_URL} from '../constants/global';
import {ProductsList} from '../types/product';
import api from '../utils/axios';

const fetchProducts = async (cat: string, skip: number = 0, limit: number = 10): Promise<ProductsList> => {
  const productsBaseUrl = `${API_BASE_URL}/products`;
  const url =
    cat !== 'all'
      ? `${productsBaseUrl}/category/${encodeURIComponent(cat)}?limit=${limit}&skip=${skip}`
      : `${productsBaseUrl}?limit=${limit}&skip=${skip}`;

  const response = await api.get(url);
  return response.data;
};

const fetchProductsByQuery = async (query: string, skip: number = 0, limit: number = 10): Promise<ProductsList> => {
  const response = await api.get(`/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`);
  return response.data;
};

const fetchProductDetails = async (id: number) => {
  const {data} = await api.get(`/products/${id}`);
  return data;
};

export {fetchProducts, fetchProductsByQuery, fetchProductDetails};
