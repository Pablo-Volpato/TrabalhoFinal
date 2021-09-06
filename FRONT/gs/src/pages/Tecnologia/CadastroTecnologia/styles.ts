/* eslint-disable */
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
    color: #333333 !important;
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

export const Checkbox = styled.div`
display: flex;
align-items: center;

.switch {
    position: relative;
    display: inline-block;
    width: 36px;
    height: 19px;
    margin: 4px 8px;
    
  }
  
  .switch input { 
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 13px;
    width: 13px;
    left: 2px;
    bottom: 3px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  input:checked + .slider {
    background-color: #ffda53;
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px #ffda59;
  }
  
  input:checked + .slider:before {
    -webkit-transform: translateX(22px);
    -ms-transform: translateX(24px);
    transform: translateX(17px);
  }
  
  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }
  
  .slider.round:before {
    border-radius: 50%;
  }
`