import { Heading, Hero, HomeContainer, Preview, StartNowButton, Text } from "@/styles/pages/home";

export default function Home() {
  return (
      <HomeContainer>
        <Hero>
          <Heading>SIGEstoque</Heading>

        <Text>
          Controle de estoque preciso, compras e vendas inteligentes.
        </Text>

        <StartNowButton>
          Começar agora
        </StartNowButton>

        </Hero>

        <Preview>
          anexar imagem....
        </Preview>
      </HomeContainer>   
  )
}