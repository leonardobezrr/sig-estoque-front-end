import { api } from "@/src/services/api";

export const fetchSuppliersData = async () => {
    const response = await api.get(`/suppliers`);
    return response.data;
  };