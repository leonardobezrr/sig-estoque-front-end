import { Container, StyledInputUpdateUser } from "@/styles/pages/manager";
import ManagerNavbar from "../../components/manager/manager-navbar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetchProductData, updateProduct } from "./api";
import { DefaultButton, Form, Icon, Text } from "@/styles/pages/manager";
import { Box, CircularProgress } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { SubmitHandler, useForm } from "react-hook-form";

interface ProductData {
  name: string;
  description: string;
  price: number;
  supplierId: string;
  quantity_in_stock: number;
}

function UpdateProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    formState: { errors },
  } = useForm<ProductData>();

  const getProduct = async () => {
    try {
      if (typeof id === "string") {
        const response = await fetchProductData(id);
        setProductData(response.product);
      }
    } catch (error) {
      console.log("Não foi possível encontrar o produto");
    }
  };

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  useEffect(() => {
    console.log("User data state updated:", productData);
  }, [productData]);

  // const onSubmit: SubmitHandler<ProductData> = async (data) => {
  //   setLoading(true);
  //   try {
  //     if (typeof id === "string" && userData) {
  //       const formattedData = { ...data, userId: id };

  //       if (userData.role === "MANAGER") {
  //         await updateManagerUser(id, formattedData);
  //       } else if (userData.role === "EMPLOYEE") {
  //         await updateEmployeeUser(id, formattedData);
  //       }
  //       window.location.href = "/manager";
  //     } else {
  //       console.error("ID inválido ou dados do usuário ausentes");
  //     }
  //   } catch (error) {
  //     console.error("Erro ao editar o usuário:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Container>
      <ManagerNavbar />
      {productData ? (
        <div style={{ width: "30%", marginTop: "4rem" }}>
          <h1>Atualizar produto</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Icon>
              <FaUser size={24} aria-hidden="true" />
              <StyledInputUpdateUser
                type="text"
                placeholder="Nome"
                aria-label="Nome"
                {...register("name", { required: "Nome é obrigatório" })}
                defaultValue={productData.name} // Inicializa o valor com o dado do estado
              />
            </Icon>
            {errors.name && <Text>{errors.name.message}</Text>}

            <Icon>
              <FaUser size={24} aria-hidden="true" />
              <StyledInputUpdateUser
                type="description"
                placeholder="Descrição"
                aria-label="Descrição"
                {...register("description", { required: "Descrição é obrigatório" })}
                defaultValue={productData.description} // Inicializa o valor com o dado do estado
              />
            </Icon>
            {errors.description && <Text>{errors.description.message}</Text>}

            <Icon>
              <FaUser size={24} aria-hidden="true" />
              <StyledInputUpdateUser
                type="price"
                placeholder="Preço"
                aria-label="Preço"
                {...register("price", { required: "Preço é obrigatório" })}
                defaultValue={productData.price} // Inicializa o valor com o dado do estado
              />
            </Icon>
            {errors.price && <Text>{errors.price.message}</Text>}

            <Icon>
              <FaUser size={24} aria-hidden="true" />
              <StyledInputUpdateUser
                type="quantity_in_stock"
                placeholder="Quantidade em estoque"
                aria-label="Quantidade em estoque"
                {...register("quantity_in_stock", { required: "Quantidade em estoque é obrigatório" })}
                defaultValue={productData.quantity_in_stock} // Inicializa o valor com o dado do estado
              />
            </Icon>
            {errors.quantity_in_stock && <Text>{errors.quantity_in_stock.message}</Text>}

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

export default UpdateProduct;
