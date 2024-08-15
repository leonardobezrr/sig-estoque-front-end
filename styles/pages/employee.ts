import styled from "styled-components";

export const AddProductButton = styled.div`
  width: 100%;
  padding: 2rem 0rem 2rem 0rem;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0rem 2rem 2rem 2rem;
`;

export const CreateProductButton = styled.button`
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
