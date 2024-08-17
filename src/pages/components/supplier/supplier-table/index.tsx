import { useEffect, useState } from "react";
import { MdDeleteOutline, MdEdit, MdLabel } from "react-icons/md";
import { 
  deleteSupplier, 
  fetchAllSuppliersData, 
  fetchAllSuppliersByIdData, 
  updateSupplier 
} from "./api/index";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  DefaultButton,
  Form,
  Icon,
  Text,
  StyledInputUpdateUser,
} from "@/styles/pages/manager";
import { FaUser } from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { TbFileDescription } from "react-icons/tb";
import { IoPricetagsOutline } from "react-icons/io5";
import { CiBoxes } from "react-icons/ci";

export interface Supplier {
  id: string;
  social_name: string,
  company_name: string,
  phone_number: string,
  cnpj: string
}

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#1d232a",
  p: 4,
};

interface SupplierData {
  id: string;
  social_name: string,
  company_name: string,
  phone_number: string,
  cnpj: string
}

export default function TableSuppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);
  const [supplierData, setSupplierData] = useState<SupplierData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAllSuppliers = async () => {
    try {
      const response = await fetchAllSuppliersData();
      setSuppliers(response.supplier);
    } catch (error) {
      console.log("Erro na requisição", error);
    }
  };

  useEffect(() => {
    fetchAllSuppliers();
  }, []);

  const handleDeleteSupplier = async () => {
    if (selectedSupplierId) {
      try {
        await deleteSupplier(selectedSupplierId);
        console.log("Fornecedor excluído com sucesso");
        await fetchAllSuppliers();
        handleClose();
      } catch (error) {
        console.error("Erro na requisição ao excluir fornecedor:", error);
      }
    }
  };

  const handleOpenDelete = (id: string) => {
    setSelectedSupplierId(id);
    setOpenDelete(true);
  };

  const handleClose = () => {
    console.log("Fechando modal");
    setOpenDelete(false);
    setSelectedSupplierId(null);
  };

  const handleOpenEdit = async (id: string) => {
    setSelectedSupplierId(id);
    try {
      const response = await fetchAllSuppliersByIdData(id);
      setSupplierData(response.supplier);
      setOpenEdit(true);
    } catch (error) {
      console.error("Erro ao abrir modal de edição:", error);
    }
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedSupplierId(null);
    setSupplierData(null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SupplierData>();

  const onSubmit: SubmitHandler<SupplierData> = async (data) => {
    setLoading(true);
    try {
      if (supplierData && selectedSupplierId) {
        await updateSupplier(supplierData.id, data);
        fetchAllSuppliers();
        handleCloseEdit();
      } else {
        console.error("ID inválido ou dados do fornecedor ausentes");
      }
    } catch (error) {
      console.error("Erro ao editar o fornecedor:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (supplierData) {
      reset(supplierData);
    }
  }, [supplierData, reset]);

  return (
    <div
      className="overflow-x-auto flex w-full"
      style={{
        backgroundColor: "#1d232e",
        padding: "2rem",
        border: "1px solid #8888",
        borderRadius: "8px",
      }}
    >
      <table className="table w-full">
        <thead>
          <tr>
            <th className="text-center">Nome social</th>
            <th className="text-center">Nome da empresa</th>
            <th className="text-center">Número de telefone</th>
            <th className="text-center">CNPJ</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {suppliers?.map((supplier) => (
            <tr key={supplier.id}>
              <td className="flex justify-center">
                <div className="flex text-center gap-3">
                  <div className="flex items-center">
                    <div className="font-bold w-10 flex justify-center">{supplier.social_name}</div>
                  </div>
                </div>
              </td>
              <td className="text-center">
                {supplier.company_name}
                <br />
              </td>
              <td className="text-center">
                {supplier.phone_number}
                <br />
              </td>
              <td className="text-center">
                {supplier.cnpj}
                <br />
              </td>
              <td className="text-center">
                <div className="flex justify-center space-x-2">
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => handleOpenEdit(supplier.id)}
                  >
                    <MdEdit size={17} />
                  </button>
                  <button
                    onClick={() => handleOpenDelete(supplier.id)}
                    className="btn btn-ghost btn-xs"
                  >
                    <MdDeleteOutline size={17} color="red" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirmar Exclusão
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Tem certeza de que deseja excluir este usuário?
          </Typography>
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleClose}
              variant="outlined"
              color="inherit"
              sx={{ marginRight: 2 }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDeleteSupplier}
              variant="contained"
              color="error"
            >
              Excluir
            </Button>
          </div>
        </Box>
      </Modal>

      {supplierData && (
        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Editar Produto
            </Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <label style={{ marginBottom: '-20px'}} htmlFor="name">Nome social</label>
              <Icon>
                <FaUser size={24} aria-hidden="true" />
                <StyledInputUpdateUser
                  type="text"
                  placeholder="Nome social"
                  aria-label="Nome social"
                  {...register("social_name", { required: "Nome social é obrigatório" })}
                />
              </Icon>
              {errors.social_name && <Text>{errors.social_name.message}</Text>}

              <label style={{ marginBottom: '-20px'}} htmlFor="name">Nome da empresa</label>
              <Icon>
                <TbFileDescription size={24} aria-hidden="true" />
                <StyledInputUpdateUser
                  type="text"
                  placeholder="Nome da empresa"
                  aria-label="Nome da empresa"
                  {...register("company_name", { required: "Nome da empresa é obrigatório" })}
                />
              </Icon>
              {errors.company_name && <Text>{errors.company_name.message}</Text>}

              <label style={{ marginBottom: '-20px'}} htmlFor="name">Número de telefone</label>
              <Icon>
                <IoPricetagsOutline size={24} aria-hidden="true" />
                <StyledInputUpdateUser
                  type="string"
                  placeholder="Número de telefone"
                  aria-label="Número de telefone"
                  {...register("phone_number", { required: "Número de telefone é obrigatório" })}
                />
              </Icon>
              {errors.phone_number && <Text>{errors.phone_number.message}</Text>}

              <label style={{ marginBottom: '-20px'}} htmlFor="name">CNPJ</label>
              <Icon>
                <CiBoxes size={24} aria-hidden="true" />
                <StyledInputUpdateUser
                  type="string"
                  placeholder="CNPJ"
                  aria-label="CNPJ"
                  {...register("cnpj", { required: "CNPJ é obrigatório" })}
                />
              </Icon>
              {errors.cnpj && <Text>{errors.cnpj.message}</Text>}

              <Button
              onClick={handleCloseEdit}
              variant="outlined"
              color="inherit"
            >
              Cancelar
            </Button>
            
            <DefaultButton
              type="submit"
              aria-label="Salvar"
              disabled={loading}
            >
              {loading ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              ) : (
                "Salvar"
              )}
            </DefaultButton>
            </Form>
          </Box>
        </Modal>
      )}
    </div>
  );
}
