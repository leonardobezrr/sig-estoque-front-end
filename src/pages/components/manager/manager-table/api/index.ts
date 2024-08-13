import { api } from "@/src/services/api";

interface createUserRequest {
  name: string;
  email: string;
  password: string;
  type: string;
}

export const fetchUsersData = async () => {
  const response = await api.get(`/users`);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/delete/${id}`);
  return response.data;
};

export const createUser = async (type: string, userBody: createUserRequest) => {
  const response = await api.post(`/${type}`, userBody);
  return response.data;
<<<<<<< HEAD:src/pages/components/manager-table/api/index.ts
}
=======
};
>>>>>>> eefaa681c45cafb1040bc380046cb2ecd9299319:src/pages/components/manager/manager-table/api/index.ts
