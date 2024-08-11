import { api } from "@/src/services/api";

export const fetchAllProductsData = async () => {
  const response = await api.get(`/products`);
  return response.data;
};
