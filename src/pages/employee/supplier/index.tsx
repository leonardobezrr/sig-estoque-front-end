import React from "react";
import { Container } from "@/styles/pages/manager";
import TableSuppliers from "../../components/supplier/supplier-table";
import EmployeeNavbar from "../../components/employee/employee-navbar";
import { AddSupplerButton, CreateSupplierButton } from "@/styles/pages/supplier";
import { useModal, ModalProvider } from "../../components/supplier/create-supplier-modal/modal-context";
import CreateSupplierModal from "../../components/supplier/create-supplier-modal";

const Supplier: React.FC = () => {
  const { openModal } = useModal();
  return (
    <Container>
      <EmployeeNavbar />
      <AddSupplerButton>
        <div className="w-full">
          <CreateSupplierButton onClick={openModal}>Cadastrar fornecedor</CreateSupplierButton>
        </div>
      </AddSupplerButton>
      <TableSuppliers />
      <CreateSupplierModal />
    </Container>
  );
}

export default function SupplierModalProvider() {
  return (
    <ModalProvider>
      <Supplier />
    </ModalProvider>
  );
}
