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
  StyledSelectContainer,
  StyledSelect,
} from "@/styles/pages/manager";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { CircularProgress } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { createUser } from "../manager-table/api/index";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../context/manager/modal-context";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#1d232a",
  p: 4,
};

interface CreateUser {
  name: string;
  email: string;
  password: string;
  type: string;
}

export default function CreateUserModal() {
  const [loading, setLoading] = React.useState(false);
  const { isOpen, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateUser>();

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setValue("type", event.target.value as string);
  };

  const onSubmit: SubmitHandler<CreateUser> = async (data) => {
    setLoading(true);
    try {
      await createUser(data.type, data);
      console.log("Usuário cadastrado com sucesso");
      closeModal();
      window.location.href = "/manager";
    } catch (error) {
      console.error("Erro ao cadastrar o usuário", error);
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
          Adicionar Usuário
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <StyledSelectContainer>
            <StyledSelect
              defaultValue="none"
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Tipo de Usuário"
              className="w-full text-white"
              {...register("type", {
                required: "Tipo de usuário é obrigatório",
              })}
              onChange={handleChange}
            >
              <MenuItem className="text-white" value="none" disabled>
                Selecione um tipo de usuário
              </MenuItem>
              <MenuItem className="text-white" value="managers">
                Administrador
              </MenuItem>
              <MenuItem className="text-white" value="employees">
                Colaborador
              </MenuItem>
            </StyledSelect>
          </StyledSelectContainer>
          {errors.type && <Text>{errors.type.message}</Text>}
          <Icon>
            <FaUser size={24} aria-hidden="true" />
            <StyledInput
              type="name"
              placeholder="Nome"
              aria-label="Nome"
              {...register("name", { required: "Nome é obrigatório" })}
            />
          </Icon>
          <Icon>
            <FaUser size={24} aria-hidden="true" />
            <StyledInput
              type="email"
              placeholder="Email"
              aria-label="Email"
              {...register("email", { required: "Email é obrigatório" })}
            />
          </Icon>
          {errors.email && <Text>{errors.email.message}</Text>}

          <Icon>
            <RiLockPasswordFill size={24} aria-hidden="true" />
            <StyledInput
              type="password"
              placeholder="Senha"
              aria-label="Senha"
              {...register("password", { required: "Senha é obrigatória" })}
            />
          </Icon>
          {errors.password && <Text>{errors.password.message}</Text>}
          <DefaultButton type="submit" aria-label="Login" disabled={loading}>
            {loading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              "Cadastrar usuário"
            )}
          </DefaultButton>
        </Form>
      </Box>
    </Modal>
  );
}
