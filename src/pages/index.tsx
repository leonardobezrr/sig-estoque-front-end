import { Heading, Hero, HomeContainer, Preview, DefaultButton, Text } from "@/styles/pages/home";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  return (
      <HomeContainer>
        <Hero>
          <Heading>SIGEstoque</Heading>

        <Text>
          Controle de estoque preciso, compras e vendas inteligentes.
        </Text>

        <DefaultButton>
          <Link href="/login">Começar agora</Link>
          <FaArrowRight />
        </DefaultButton>

        </Hero>

        <Preview>
          anexar imagem....
        </Preview>
      </HomeContainer>   
  )
}