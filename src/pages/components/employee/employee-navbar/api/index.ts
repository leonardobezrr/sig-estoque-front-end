import { api } from "@/src/services/api";

export const fetchUserData = async (id: string) => {
    const response = await api.get(`/user/${id}`);
    return response.data;
  };