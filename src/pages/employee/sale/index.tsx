import React from "react";
import { Container } from "@/styles/pages/manager";
import EmployeeNavbar from "../../components/employee/employee-navbar";
import { AddPurchaseButton, CreatePurchaseButton } from "@/styles/pages/purchases";
import CreateSaleModal from "../../components/sales/create-sale-modal";
import TableSales from "../../components/sales/sale-table";
import { ModalProvider, useModal } from "../../components/sales/create-sale-modal/modal-context";


const Sale: React.FC = () => {
  const { openModal } = useModal();
  return (
    <Container>
      <EmployeeNavbar />
      <AddPurchaseButton>
        <div className="w-full">
          <CreatePurchaseButton onClick={openModal}>Cadastrar venda</CreatePurchaseButton>
        </div>
      </AddPurchaseButton>
      <TableSales />
      <CreateSaleModal />
    </Container>
  );
}

export default function SupplierModalProvider() {
  return (
    <ModalProvider>
      <Sale />
    </ModalProvider>
  );
}
