import { api } from "@/src/services/api";

interface SupplierBody {
  social_name: string;
  company_name: string;
  phone_number: string;
  cnpj: string;
}

export const fetchSuppliersData = async () => {
    const response = await api.get(`/suppliers`);
    return response.data;
  };

export const createSupplier = async (supplierBody: SupplierBody) => {
  const response = await api.post("/suppliers", supplierBody);
}