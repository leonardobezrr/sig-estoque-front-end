import { api } from "@/src/services/api";

const fetchSuppliersData = async () => {
  const response = await api.get(`/suppliers`);
  return response.data;
};

export default fetchSuppliersData;

