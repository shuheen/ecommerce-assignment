import {CategoriesList} from '../types/categories';
import api from '../utils/axios';

const fetchCategories = async (): Promise<CategoriesList[]> => {
  const response = await api.get('/products/categories');
  return response.data;
};

export {fetchCategories};
