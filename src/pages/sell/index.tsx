import React from "react";
import ManagerNavbar from "../../components/manager/manager-navbar";
import { Container } from "@/styles/pages/manager";
import { Header } from "@/styles/pages/login";
import TableUsers from "../../components/manager/manager-table";

export default function Suppliers() {
  return (
    <Container>
      <ManagerNavbar />
      <TableUsers />
      <Header style={{ marginTop: "2rem", fontSize: "1.5rem" }}>Fornece</Header>
    </Container>
  );
}
