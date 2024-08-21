import { api } from "@/src/services/api";

export const createSale = async () => {
  const response = await api.post(`/sales`);
  return response.data;
};

export const fetchAllSalesData = async () => {
  const response = await api.get(`/sales`);
  return response.data;
};