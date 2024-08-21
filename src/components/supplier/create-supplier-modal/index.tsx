import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  DefaultButton,
  Form,
  Icon,
  StyledInput,
  Text,
} from "@/styles/pages/manager";
import { useForm, SubmitHandler } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import { useModal } from "../../../context/supplier/modal-context";
import { createSupplier } from "./api";
import { IoPricetagOutline } from "react-icons/io5";
import { FaRegUser, FaRegBuilding, FaPhoneAlt   } from "react-icons/fa";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#1d232a",
  p: 4,
};

interface CreateSupplier {
  social_name: string;
  company_name: string;
  phone_number: string;
  cnpj: string;
}

export default function CreateSupplierModal() {
  const [loading, setLoading] = React.useState(false);
  const { isOpen, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSupplier>();

  
  const onSubmit: SubmitHandler<CreateSupplier> = async (data) => {
    setLoading(true);
    try {
      await createSupplier(data);
      console.log("Fornecedor cadastrado com sucesso");
      closeModal();
      window.location.href = "/employee/supplier";
    } catch (error) {
      console.error("Erro ao cadastrar o fornecedor", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Adicionar Produto
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Icon>
            <FaRegUser size={24} aria-hidden="true" />
            <StyledInput
              type="text"
              placeholder="Nome do fornecedor"
              aria-label="Nome"
              {...register("social_name", { required: "Nome é obrigatório" })}
            />
          </Icon>
          <Icon>
            <FaRegBuilding size={24} aria-hidden="true" />
            <StyledInput
              type="text"
              placeholder="Nome da empresa"
              aria-label="Nome"
              {...register("company_name", { required: "Nome da empresa é obrigatório" })}
            />
          </Icon>
          {errors.company_name && <Text>{errors.company_name.message}</Text>}

          <Icon>
            <FaPhoneAlt  size={24} aria-hidden="true" />
            <StyledInput
              type="text"
              placeholder="Telefone do fornecedor"
              aria-label="Telefone"
              {...register("phone_number", { required: "Telefone é obrigatório" })}
            />
          </Icon>
          {errors.phone_number && <Text>{errors.phone_number.message}</Text>}

          <Icon>
            <IoPricetagOutline size={24} aria-hidden="true" />
            <StyledInput
              type="text"
              placeholder="CNPJ"
              aria-label="CNPJ"
              {...register("cnpj", { required: "Quantidade é obrigatória" })}
            />
          </Icon>
          {errors.cnpj && <Text>{errors.cnpj.message}</Text>}

          <DefaultButton type="submit" aria-label="Login" disabled={loading}>
            {loading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              "Cadastrar produto"
            )}
          </DefaultButton>
        </Form>
      </Box>
    </Modal>
  );
}
