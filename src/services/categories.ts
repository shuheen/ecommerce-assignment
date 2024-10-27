import api from "../utils/axios";

const fetchCategories = async (): Promise<string[]> => {
  const response = await api.get('/products/categories');
  return response.data;
};


export {fetchCategories}