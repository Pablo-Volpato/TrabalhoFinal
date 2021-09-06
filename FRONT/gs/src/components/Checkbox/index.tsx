import React, { FC } from 'react';
import { Container } from './styles';

interface Props {
  ativo?: boolean;
  checked?: () => void;
}

export const Checkbox: FC<Props> = ({ ativo, checked }) => {
  return (
    <Container>
      <label className="switch" >
        <input type="checkbox" checked={ativo} />
        <span className="slider round" onClick={checked}></span>
      </label>
      <span >{ativo ? " Ativo" : "Inativo"}</span>
    </Container>
  )
}