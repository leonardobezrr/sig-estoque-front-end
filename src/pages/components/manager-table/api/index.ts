import { api } from "@/src/services/api";

export const fetchUsersData = async () => {
  const response = await api.get(`/users`);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/delete/${id}`);
  return response.data;
};
