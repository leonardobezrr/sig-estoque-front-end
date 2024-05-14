import { DefaultButton } from "@/styles/pages/home";
import { Container, Heading, Header, Form, StyledInput, Text, Overlay, Title, LinkA } from "@/styles/pages/login";

export default function Login() {
  return (
    <Container>
      <Heading>
        SIGEstoque, realize seu login ou cadastre-se.
      </Heading>

      <Header>
        Informe seus dados para acessar!
      </Header>

      <Form>
        <label>
          <Title>
            Insira o email:
          </Title>
          <StyledInput type="text" placeholder="email do usuário"/>
          <Title>
            Insira a senha:
          </Title>
          <StyledInput type="password" placeholder="senha do usuário" />
        </label>
          <DefaultButton>Login</DefaultButton>
          <Text>
            Não tem uma conta?
            <LinkA>Cadastrar-se</LinkA>
          </Text>
      </Form>
      <Overlay />
    </Container>
  )
}
