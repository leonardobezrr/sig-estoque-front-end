import React from "react";
import TableProducts from "../components/employee/products-table";
import { AddProductButton, Container } from "@/styles/pages/employee";
import { DefaultButton } from "@/styles/pages/home";
import EmployeeNavbar from "../components/employee/employee-navbar";
import {
  useModal,
  ModalProvider,
} from "../components/manager/create-user-modal/modal-context";
import CreateUserModal from "../components/manager/create-user-modal/index";

export default function ManagerProducts() {
  return (
    <Container>
      <EmployeeNavbar />
      <AddProductButton>
        <DefaultButton>Adicionar Produto</DefaultButton>
      </AddProductButton>
      <TableProducts />
    </Container>
  );
}
