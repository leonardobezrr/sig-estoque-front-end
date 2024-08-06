import { Container, StyledInputUpdateUser } from "@/styles/pages/manager";
import ManagerNavbar from "../../components/manager-navbar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetchUserData, updateEmployeeUser, updateManagerUser } from "./api";
import { DefaultButton, Form, Icon, Text } from "@/styles/pages/manager";
import { Box, CircularProgress } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { SubmitHandler, useForm } from "react-hook-form";

interface UserData {
  userId: string;
  name: string;
  email: string;
  password?: string;
  role: string;
}

function UpdateUser() {
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>();

  const getUserProfile = async () => {
    try {
      if (typeof id === "string") {
        const response = await fetchUserData(id);
        setUserData(response.user);
      }
    } catch (error) {
      console.log("Não foi possível encontrar o colaborador");
    }
  };

  useEffect(() => {
    if (id) {
      getUserProfile();
    }
  }, [id]);

  useEffect(() => {
    console.log("User data state updated:", userData);
  }, [userData]);

  const onSubmit: SubmitHandler<UserData> = async (data) => {
    setLoading(true);
    try {
      if (typeof id === "string" && userData) {
        const formattedData = { ...data, userId: id };

        if (userData.role === "MANAGER") {
          await updateManagerUser(id, formattedData);
        } else if (userData.role === "EMPLOYEE") {
          await updateEmployeeUser(id, formattedData);
        }
        window.location.href = "/manager";
      } else {
        console.error("ID inválido ou dados do usuário ausentes");
      }
    } catch (error) {
      console.error("Erro ao editar o usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ManagerNavbar />
      {userData ? (
        <div style={{ width: "30%", marginTop: "4rem" }}>
          <h1>Atualizar usuário</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Icon>
              <FaUser size={24} aria-hidden="true" />
              <StyledInputUpdateUser
                type="text"
                value={userData.name}
                placeholder="Nome"
                aria-label="Nome"
                {...register("name", { required: "Nome é obrigatório" })}
              />
            </Icon>
            {errors.name && <Text>{errors.name.message}</Text>}
            <Icon>
              <FaUser size={24} aria-hidden="true" />
              <StyledInputUpdateUser
                type="email"
                value={userData.email}
                placeholder="Email"
                aria-label="Email"
                {...register("email", { required: "Email é obrigatório" })}
              />
            </Icon>
            {errors.email && <Text>{errors.email.message}</Text>}

            <Icon>
              <RiLockPasswordFill size={24} aria-hidden="true" />
              <StyledInputUpdateUser
                type="password"
                placeholder="Senha"
                aria-label="Senha"
                {...register("password")}
              />
            </Icon>
            {errors.password && <Text>{errors.password.message}</Text>}
            <DefaultButton type="submit" aria-label="Login" disabled={loading}>
              {loading ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              ) : (
                "Salvar"
              )}
            </DefaultButton>
          </Form>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </Container>
  );
}

export default UpdateUser;
