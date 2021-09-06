/* eslint-disable */
import styled, { css }from "styled-components";
import { Form } from 'react-bootstrap';

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

export const Botao = styled(Form.Row)`
        .container-buttons{
            margin-top:1.5rem;
        }
             .container-buttons.form-row > .form-group.col-md-2 {
                text-align: right;
            }

            .container-buttons.form-row > .form-group.col-md-2 > .btn-cancelar.btn.btn-primary{
                width: 175px;
                height: 50px;
                border: 2px solid var(--unnamed-color-0b141f);
                border: 2px solid #0B141F;
                background: #FFF 0% 0% no-repeat padding-box;
                color: #0B141F;
                border-radius: 5px;
                opacity: 1;
                font-weight: 400;
      
            }

             .container-buttons.form-row > .form-group.col-md-2 > .btn-enviar{
                width: 183px;
                height: 50px;
                background: #FFDA53 0% 0% no-repeat padding-box;
                border: 2px solid #FFDA53;
                color: #0B141F;
                border-radius: 5px;
                opacity: 1;
                font-weight: 400;
            }

            
`
