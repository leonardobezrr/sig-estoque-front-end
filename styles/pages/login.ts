import { styled } from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
`
export const Overlay = styled.div`
    position: absolute;
    width: 45%;
    height: 70%;
    background-color: red;
    z-index: -1; 
    border-radius: 2.5rem;
    background-color: #121214;
`
export const Heading = styled.h2`
    font-size: 1.5rem;
    line-height: 160%;
`

export const Header = styled.h3`
    color: #522d80;
`
export const Title = styled.p`
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    color: #fff;
`

export const Text = styled.p`
    margin-top: 1rem;
    line-height: 100%;
    display: flex;
    justify-content: center;
    color: white;
`

export const LinkA = styled.a`
    color: #522d80;
    cursor: pointer;
    text-decoration: underline;
`

export const Form = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const StyledInput = styled.input`
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
    width: 20rem;
    padding: 0.5rem;
    border: none;
    border-radius: 0.2rem;
    outline: none;
`
