import { api } from "@/src/services/api";

interface CreateProductSchema {
  name: string;
  description: string;
  price: number;
  quantity_in_stock: number;
}

interface UpdateProductSchema {
  name: string;
  description: string;
  price: number;
  quantity_in_stock: number;
}

export const fetchAllProductsData = async () => {
  const response = await api.get(`/products`);
  return response.data;
};

export const fetchAllProductsByIdData = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
}

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
}

export const CreateProduct = async (productBody: CreateProductSchema) => {
  const response = await api.post(`/products`, productBody);
  return response.data;
}

export const UpdateProduct = async (id: string, productBody: UpdateProductSchema) => {
  const response = await api.patch(`/products/${id}`, productBody);
  return response.data;
};

export default {
  fetchAllProductsData,
  fetchAllProductsByIdData,
  deleteProduct,
  CreateProduct,
  UpdateProduct,
};