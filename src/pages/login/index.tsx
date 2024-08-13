import { DefaultButton } from "@/styles/pages/home";
import {
  Container,
  Heading,
  Header,
  Form,
  StyledInput,
  Text,
  Overlay,
  Icon,
} from "@/styles/pages/login";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Logo from "../../assets/Group1.svg";
import Image from "next/image";
import { useContext, useState } from "react";
import { AuthContext } from "@/src/context/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, CircularProgress } from "@mui/material";

interface User {
  email: string;
  password: string;
}

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<User> = async (data) => {
    setLoading(true);
    try {
<<<<<<< HEAD
      await signIn(data);
      console.log(data);
=======
      signIn(data);
>>>>>>> eefaa681c45cafb1040bc380046cb2ecd9299319
    } catch (error) {
      console.error("Falha no login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Image src={Logo} alt="Logo da aplicação" width={100} />
      <Heading>SIGEstoque, realize seu login ou cadastre-se.</Heading>

      <Header>Informe seus dados para acessar!</Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <label>
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
        </label>
        <DefaultButton type="submit" aria-label="Login" disabled={loading}>
          {loading ?
          <Box sx={{ display: 'flex' }}>
            setTime
            <CircularProgress />
          </Box>
          : "Login"}
        </DefaultButton>
      </Form>
      <Overlay />
    </Container>
  );
}
