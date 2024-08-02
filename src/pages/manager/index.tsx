import React from "react";
import ManagerNavbar from "../components/manager-navbar";
import TableUsers from "../components/manager-table";
import { AddUserButton, Container } from "@/styles/pages/manager";
import { DefaultButton } from "@/styles/pages/home";

export default function ManagerUsers() {
  return (
    <Container>
      <ManagerNavbar  />
      <AddUserButton>
        <DefaultButton>Adicionar Usuário</DefaultButton>
      </AddUserButton>
      <TableUsers />
    </Container >
  );
}
