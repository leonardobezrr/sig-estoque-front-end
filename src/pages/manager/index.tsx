import ManagerNavbar from "../components/manager-navbar";
import TableUsers from "../components/manager-table";
import { AddUserButton, Container } from "@/styles/pages/manager";
import { DefaultButton } from "@/styles/pages/home";

function ManagerUsers() {
  return (
    <Container>
      <ManagerNavbar />
      <AddUserButton>
        <DefaultButton>Adicionar Usuário</DefaultButton>
      </AddUserButton>
      <TableUsers />
    </Container>
  );
}

export default ManagerUsers;
