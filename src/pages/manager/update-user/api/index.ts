import { api } from "@/src/services/api";

interface UserBody {
  userId: string;
  name: string;
  email: string;
  password?: string;
  role: string;
}

export const fetchUserData = async (id: string) => {
  const response = await api.get(`/user/${id}`);
  return response.data;
};

export const updateManagerUser = async (id: string, userBody: UserBody) => {
  const response = await api.put(`/manager/update/${id}`, userBody);
  return response.data;
};

export const updateEmployeeUser = async (id: string, userBody: UserBody) => {
  const response = await api.put(`/employee/update/${id}`, userBody);
  return response.data;
};
