import { DefaultButton } from "@/styles/pages/home";
import { Container, Heading, Header, Form, StyledInput, Text, Overlay, Icon, LinkA } from "@/styles/pages/login";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Logo from "../../assets/Group1.svg"
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <Container>
      <Image src={Logo} alt="Logo da aplicação" width={100} />
      <Heading>
        SIGEstoque, realize seu login ou cadastre-se.
      </Heading>

      <Header>
        Informe seus dados para acessar!
      </Header>

      <Form>
        <label>
          <Icon>
            <FaUser size={24}/>
            <StyledInput type="text" placeholder="Email"/>
          </Icon>

          <Icon>
            <RiLockPasswordFill size={24}/>
            <StyledInput type="password" placeholder="Senha" />
          </Icon>

        </label>
          <DefaultButton>
            <Link href="/components/manager/products">Login</Link>
          </DefaultButton>
        </Form>
      <Overlay />
    </Container>
  )
}
