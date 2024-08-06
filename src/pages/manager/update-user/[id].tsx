import { Container } from "@/styles/pages/manager";
import ManagerNavbar from "../../components/manager-navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchUserData } from "./api";

function UpdateUser() {
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState(null);

  const getUserProfile = async () => {
    try {
      if (typeof id === "string") {
        const response = await fetchUserData(id);
        console.log(response);
        setUserData(response.data);
      }
    } catch (error) {
      console.log("Não foi possível encontrar o colaborador");
    }
  };

  useEffect(() => {
    getUserProfile();
  });
  oi;

  return (
    <Container>
      <ManagerNavbar />
      {`id do usuario ${id}`}
      {userData && (
        <div>
          <h1>olar</h1>
          {/* Adicione mais campos conforme necessário */}
        </div>
      )}
    </Container>
  );
}

export default UpdateUser;
