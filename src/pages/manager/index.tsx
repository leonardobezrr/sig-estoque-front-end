import React from "react";
import ManagerNavbar from "../components/manager-navbar";
import TableUsers from "../components/manager-table";
import { AddUserButton, Container } from "@/styles/pages/manager";
import { DefaultButton } from "@/styles/pages/home";
import {
  useModal,
  ModalProvider,
} from "../components/create-user-modal/modal-context";
import CreateUserModal from "../components/create-user-modal/index";

const ManagerUsers: React.FC = () => {
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
      <ManagerUsers />
    </ModalProvider>
  );
}
