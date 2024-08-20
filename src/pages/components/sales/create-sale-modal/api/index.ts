import { api } from "@/src/services/api";

interface CreateSale {
  nf_number: string;
  userId: string;
  items: {
      productId: string;
      quantity: number;
      value: number;
  }[];
}

export const fetchSuppliersData = async () => {
  const response = await api.get(`/suppliers`);
  return response.data;
};

export const fetchProductsData = async () => {
  const response = await api.get(`/products`);
  return response.data;
}

export const createSale = async (saleBody: CreateSale) => {
  const response = await api.post("/sales", saleBody);
  return response.data;
}

