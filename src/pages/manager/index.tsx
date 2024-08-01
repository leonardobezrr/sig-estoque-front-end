import React from "react";
import ManagerNavbar from "../components/manager-navbar";
import TableUsers from "../components/manager-table";
import { Container } from "@/styles/pages/manager";
import { Header } from "@/styles/pages/login";
import { Button } from "@mui/material";

export default function ManagerUsers() {
  return (
    <Container>
      <ManagerNavbar />
      <TableUsers />
      <Header style={{ marginTop: "2rem", fontSize: "1.5rem" }}>
        Usuários
      </Header>
    </Container >
  );
}
