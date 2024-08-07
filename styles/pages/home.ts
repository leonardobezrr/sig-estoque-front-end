import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20rem;
  margin-left: auto;
  height: 100vh;
  max-width: calc(100vw - (100vw - 1160px) / 2);
  margin-left: "auto";
`;

export const Hero = styled.div`
  max-width: 600px;
  padding: 0 10rem;
`;

export const Heading = styled.h2`
  display: flex;
  line-height: 100%;
  margin: 0;
  color: #fff;
  font-size: 2.5rem;
`;

export const Text = styled.p`
  line-height: 160%;
  margin: 0;
  color: white;
  font-weight: 400;
`;

export const Preview = styled.div`
  padding-right: 2rem;
  overflow: hidden;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const DefaultButton = styled.button`
  all: unset;
  display: flex;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  border-radius: 8px;
  padding: 0.8em;
  font-size: 16px;
  background-color: #522d80;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;
