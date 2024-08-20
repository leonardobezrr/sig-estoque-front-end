import React from "react";
import TableProducts from "../components/employee/products-table";
import { AddProductButton, Container, CreateProductButton } from "@/styles/pages/employee";
import EmployeeNavbar from "../components/employee/employee-navbar";
import {
  useModal,
  ModalProvider,
} from "../components/employee/create-product-modal/modal-context";
import CreateProductModal from "../components/employee/create-product-modal/index";
import Link from "next/link";

const Employee: React.FC = () => {
  const { openModal } = useModal();

  return (
    <Container>
      <EmployeeNavbar />
      <AddProductButton>
        <div className="flex gap-4">
          <CreateProductButton onClick={openModal}>Cadastrar Produto</CreateProductButton>
          <CreateProductButton><Link href='/employee/purchases'>Compras</Link></CreateProductButton>
          <CreateProductButton>Vendas</CreateProductButton>
          <CreateProductButton><Link href='employee/supplier'>Fornecedores</Link></CreateProductButton>
        </div>
      </AddProductButton>
      <TableProducts />
      <CreateProductModal />
    </Container>
  );
};

export default function ManagerUsersWithProvider() {
  return (
    <ModalProvider>
      <Employee />
    </ModalProvider>
  );
}