import React from "react";
import ManagerNavbar from "../../components/manager/manager-navbar";
import TableUsers from "../../components/manager/manager-table";
import { AddUserButton, Container } from "@/styles/pages/manager";
import { DefaultButton } from "@/styles/pages/home";
import {
  useModal,
  ModalProvider,
} from "../../context/manager/modal-context";
import CreateUserModal from "../../components/manager/create-user-modal/index";

const Manager: React.FC = () => {
  const { openModal } = useModal();

  return (
    <Container>
      <ManagerNavbar />
      <AddUserButton>
        <DefaultButton onClick={openModal}>Adicionar Usuário</DefaultButton>
      </AddUserButton>
      <TableUsers />
      <CreateUserModal />
    </Container>
  );
};

export default function ManagerUsersWithProvider() {
  return (
    <ModalProvider>
      <Manager />
    </ModalProvider>
  );
}
