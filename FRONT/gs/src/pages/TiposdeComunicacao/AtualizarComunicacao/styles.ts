
import styled, { css }from "styled-components";
import { Form } from 'react-bootstrap';
interface ContainerProps {
  isFocused: boolean;
  hasError: boolean;
}

export const Content = styled.div`
   width:100%;  
   margin-top:20px;   
   background: #fff;
   border-radius: 4px;   
 `;

 export const Selects = styled.select`
  -webkit-appearance: listbox !important;
 `;

export const CustomSwitch = styled(Form.Switch)`
  .custom-control-label{
    color: blue !important;
  }
  .custom-control-input:checked~.custom-control-label::before {
      background-color: blue !important;
  }
`
 
export const SelectComponent = styled.select<ContainerProps>`
width: 100%;
height: calc(1.5em + 0.75rem + 2px);
padding: 0.375rem 0.75rem;
font-size: 1rem;
font-weight: 400;
line-height: 1.5;
color: #495057;
border: 1px solid #ced4da;
border-radius: 0.25rem;
outline: 0;

${(props) =>
  props.isFocused &&
  css`
    border: 1px solid #8fc5ff;
    box-shadow: 0 0 1px 1px #8fc5ff;
    transition: #ced4da 5s ease-in-out, box-shadow 5s ease-in-out;
  `}

${(props) =>
  props.isFocused &&
  props.hasError &&
  css`
    box-shadow: 0 0 1px 1px rgba(255, 0, 0, 0.6);
    border: 1px solid rgba(255, 0, 0, 0.6);
  `}

  ${(props) =>
  props.hasError &&
  css`
    border: 1px solid rgba(255, 0, 0, 0.6);
  `}
`;
