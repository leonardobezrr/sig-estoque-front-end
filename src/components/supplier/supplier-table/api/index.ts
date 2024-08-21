import { api } from "@/src/services/api";

interface CreateSupplierSchema {
  id: string;
  social_name: string,
  company_name: string,
  phone_number: string,
  cnpj: string
}

interface UpdateSupplierSchema {
  id: string;
  social_name: string,
  company_name: string,
  phone_number: string,
  cnpj: string
}

export const fetchAllSuppliersData = async () => {
  const response = await api.get(`/suppliers`);
  return response.data;
};

export const deleteSupplier = async (id: string) => {
  const response = await api.delete(`/suppliers/${id}`);
  return response.data;
}

export const fetchAllSuppliersByIdData = async (id: string) => {
  const response = await api.get(`/suppliers/${id}`);
  return response.data;
}

export const createSupplier = async (supplierBody: CreateSupplierSchema) => {
  const response = await api.post(`/suppliers`, supplierBody);
  return response.data;
}

export const updateSupplier = async (id: string, supplierBody: UpdateSupplierSchema) => {
  const response = await api.patch(`/suppliers/${id}`, supplierBody);
  return response.data;
};