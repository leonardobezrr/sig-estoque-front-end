import { api } from "@/src/services/api";

interface CreatePurchase {
  nf_number: string;
  supplierId: string;
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

export const createPurchase = async (purchaseBody: CreatePurchase) => {
  const response = await api.post("/purchases", purchaseBody);
  return response.data;
}

