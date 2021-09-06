import React, { FC, SelectHTMLAttributes, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Container, SelectComponent, MessageError } from './styles';
import { RequiredContainter } from '../Input/styles';

interface InputPros extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string | undefined;
  textInputTitle: string;
  required?: boolean;
}

const Select: FC<InputPros> = ({ textInputTitle, error, children, required, ...rest }) => {
  const [focused, setFocused] = useState(false);

  return (
    <Container onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
      <Form.Label>
        {textInputTitle}
        <RequiredContainter>{required ? '*' : ''}</RequiredContainter>
      </Form.Label>
      <SelectComponent {...rest} isFocused={focused} hasError={!!error}>
        {children}
      </SelectComponent>
      <MessageError>{error || ''}</MessageError>
    </Container>
  );
};

export default Select;
