import { api } from "@/src/services/api";

interface ProductBody {
  name: string;
  description: string;
  price: number;
  supplierId: string;
  quantity_in_stock: number;
}

export const fetchProductData = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const updateProduct = async (id: string, productBody: ProductBody) => {
  const response = await api.put(`/products/update/${id}`, productBody);
  return response.data;
};

export default {
  fetchProductData,
  updateProduct,
};