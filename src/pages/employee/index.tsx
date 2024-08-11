import React from "react";
import ManagerNavbar from "../components/manager/manager-navbar";
import TableProducts from "../components/employee/products-table";
import { AddUserButton, Container } from "@/styles/pages/manager";
import { DefaultButton } from "@/styles/pages/home";
export default function ManagerProducts() {
  return (
    <Container>
      <ManagerNavbar />
      <AddUserButton>
        <DefaultButton>Adicionar Produto</DefaultButton>
      </AddUserButton>
      <TableProducts />
    </Container>
  );
}
