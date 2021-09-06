import styled from "styled-components";

export const Container = styled.div`
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