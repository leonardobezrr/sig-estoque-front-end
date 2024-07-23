import React from "react";
import ManagerNavbar from "../components/manager-navbar";
import TableUsers from "../components/manager-table";
import { Container } from "@/styles/pages/manager";

export default function ManagerUsers() {
  return (
    <Container>
      <ManagerNavbar />
      <TableUsers />
    </Container >
  );
}
