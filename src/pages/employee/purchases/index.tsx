import React from "react";
import { Container } from "@/styles/pages/manager";
import EmployeeNavbar from "../../components/employee/employee-navbar";
import { ModalProvider, useModal } from "../../components/purchases/create-purchase-modal/modal-context";
import TableSuppliers from "../../components/purchases/purchase-table";
import CreateSupplierModal from "../../components/purchases/create-purchase-modal";
import { AddPurchaseButton, CreatePurchaseButton } from "@/styles/pages/purchases";


const Purchase: React.FC = () => {
  const { openModal } = useModal();
  return (
    <Container>
      <EmployeeNavbar />
      <AddPurchaseButton>
        <div className="w-full">
          <CreatePurchaseButton onClick={openModal}>Cadastrar compra</CreatePurchaseButton>
        </div>
      </AddPurchaseButton>
      <TableSuppliers />
      <CreateSupplierModal />
    </Container>
  );
}

export default function SupplierModalProvider() {
  return (
    <ModalProvider>
      <Purchase />
    </ModalProvider>
  );
}
