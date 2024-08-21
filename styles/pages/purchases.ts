import styled from "styled-components";

export const CreatePurchaseButton = styled.button`
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

export const AddPurchaseButton = styled.div`
  width: 100%;
  padding: 2rem 0rem 2rem 0rem;
`;