import { Container } from "@/styles/pages/manager";
import ManagerNavbar from "../../components/manager-navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchUserData } from "./api";

interface UserData {
  id: string;
  name: string;
  email: string;
}

function UpdateUser() {
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState<UserData | null>(null);

  const getUserProfile = async () => {
    try {
      if (typeof id === "string") {
        const response = await fetchUserData(id);
        setUserData(response.user);
      }
    } catch (error) {
      console.log("Não foi possível encontrar o colaborador");
    }
  };

  useEffect(() => {
    if (id) {
      getUserProfile();
    }
  }, [id]);

  useEffect(() => {
    console.log("User data state updated:", userData);
  }, [userData]);

  return (
    <Container>
      <ManagerNavbar />
      {userData ? (
        <div>
          <p>ID do usuário: {userData.id}</p>
          <p>Nome: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </Container>
  );
}

export default UpdateUser;
