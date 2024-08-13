// ManagerUsers.tsx
import React from "react";
import ManagerNavbar from "../components/manager/manager-navbar";
import TableUsers from "../components/manager/manager-table";
import { AddUserButton, Container } from "@/styles/pages/manager";
import { DefaultButton } from "@/styles/pages/home";
<<<<<<< HEAD
import { useModal, ModalProvider } from '../components/create-user-modal/modal-context';
import CreateUserModal from '../components/create-user-modal/index';
=======
import {
  useModal,
  ModalProvider,
} from "../components/manager/create-user-modal/modal-context";
import CreateUserModal from "../components/manager/create-user-modal/index";
>>>>>>> eefaa681c45cafb1040bc380046cb2ecd9299319

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
