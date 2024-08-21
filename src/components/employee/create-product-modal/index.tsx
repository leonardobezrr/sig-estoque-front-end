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
import { CreateProduct } from "../products-table/api/index"
import { useModal } from "../../../context/employee/modal-context";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoPricetagOutline } from "react-icons/io5";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#1d232a",
  p: 4,
};

interface CreateProduct {
  name: string;
  description: string;
  price: number;
  quantity_in_stock: number;
}

export default function CreateProductModal() {
  const [loading, setLoading] = React.useState(false);
  const { isOpen, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProduct>();

  
  const onSubmit: SubmitHandler<CreateProduct> = async (data) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        price: Number(data.price),
        quantity_in_stock: Number(data.quantity_in_stock),
      };
      
      await CreateProduct(payload);
      console.log("Produto cadastrado com sucesso");
      closeModal();
      window.location.href = "/employee";
    } catch (error) {
      console.error("Erro ao cadastrar o produto", error);
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
            <MdOutlineProductionQuantityLimits size={24} aria-hidden="true" />
            <StyledInput
              type="text"
              placeholder="Nome do produto"
              aria-label="Nome"
              {...register("name", { required: "Nome é obrigatório" })}
            />
          </Icon>
          <Icon>
            <MdOutlineProductionQuantityLimits size={24} aria-hidden="true" />
            <StyledInput
              type="text"
              placeholder="Descrição do produto"
              aria-label="Nome"
              {...register("description", { required: "Descrição é obrigatória" })}
            />
          </Icon>
          {errors.description && <Text>{errors.description.message}</Text>}

          <Icon>
            <IoPricetagOutline size={24} aria-hidden="true" />
            <StyledInput
              type="number"
              placeholder="Preço do produto"
              aria-label="Preço"
              {...register("price", { required: "Preço é obrigatório" })}
            />
          </Icon>
          {errors.price && <Text>{errors.price.message}</Text>}

          <Icon>
            <MdOutlineProductionQuantityLimits size={24} aria-hidden="true" />
            <StyledInput
              type="number"
              placeholder="Quantidade de itens"
              aria-label="Quantidade"
              {...register("quantity_in_stock", { required: "Quantidade é obrigatória" })}
            />
          </Icon>
          {errors.quantity_in_stock && <Text>{errors.quantity_in_stock.message}</Text>}

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
