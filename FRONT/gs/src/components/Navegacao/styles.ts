import styled from "styled-components";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

export const ContainerNavegacao = styled.div`
  display: grid;
  align-items: flex-start;
  justify-content: center;
  padding: 0 28px;

  .botao{ 
    margin: 10px 0;
    border: 0;
    position: fixed;
    width: 40px;
    cursor: pointer;
    transition: 0.2s;
    &:hover{
      color: #FFDA53
    }
  }
`;

export const NavCustom = styled(Nav)`
  position: relative;
  top: 0;
  left: 0;
  transition: left 0.5s cubic-bezier(0.82, 0.085, 0.395, 0.895);
  margin-top:55px
`;

export const LinkCustom = styled(Link)``;
