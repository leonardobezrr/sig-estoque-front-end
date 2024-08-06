import { styled } from "styled-components";
import Select from "@mui/material/Select";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0rem 2rem 2rem 2rem;
`;

export const AddUserButton = styled.div`
  width: 100%;
  padding: 2rem 0rem 2rem 0rem;
`;

export const Form = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledInput = styled.input`
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
  width: 20rem;
  padding: 0.5rem;
  border: none;
  border-radius: 0.2rem;
  outline: none;

  &:focus {
    border: 1.5px solid #522d80;
  }
`;

export const Icon = styled.p`
  margin-top: 0.3rem;
  display: flex;
  margin-bottom: 0.3rem;
  align-items: center;
  color: #fff;

  & > svg {
    margin-right: 0.5rem;
  }
`;

export const Text = styled.p`
  margin-top: 1rem;
  line-height: 100%;
  display: flex;
  justify-content: center;
  color: white;
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
  font-weight: 100;
  font-size: 16px;
  font-weight: 400;
  background-color: #522d80;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

export const StyledSelect = styled(Select)`
  .MuiSelect-select {
    color: white;
  }
`;

export const StyledSelectContainer = styled.div`
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
  width: 20rem;
  padding: 0.5rem;
  border-radius: 0.2rem;
  border: none;
`;
