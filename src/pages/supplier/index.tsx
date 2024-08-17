import React from "react";
import ManagerNavbar from "../components/manager/manager-navbar";
import { Container } from "@/styles/pages/manager";
import { Header } from "@/styles/pages/login";
import TableSuppliers from "../components/supplier/supplier-table";

export default function Suppliers() {
  return (
    <Container>
      <ManagerNavbar />
      <TableSuppliers />
    </Container>
  );
}
