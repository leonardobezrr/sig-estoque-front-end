import React from "react";
import TableProducts from "../components/employee/products-table";
import { AddUserButton, Container } from "@/styles/pages/manager";
import { DefaultButton } from "@/styles/pages/home";
import EmployeeNavbar from "../components/employee/employee-navbar";
export default function ManagerProducts() {
  return (
    <Container>
      <EmployeeNavbar />
      <AddUserButton>
        <DefaultButton>Adicionar Produto</DefaultButton>
      </AddUserButton>
      <TableProducts />
    </Container>
  );
}
