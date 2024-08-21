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


export const createPurchase = async () => {
  const response = await api.post(`/purchases`);
  return response.data;
};

export const fetchAllPurchasesByIdData = async (id: string) => {
  const response = await api.get(`/purchases/${id}`);
  return response.data;
}

export const fetchAllPurchasesData = async () => {
  const response = await api.get(`/purchases`);
  return response.data;
};

export default {
  createPurchase,
  fetchAllPurchasesByIdData,
  fetchAllPurchasesData
}