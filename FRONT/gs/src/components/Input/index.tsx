import React, { FC, InputHTMLAttributes, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Container, InputText, MessageError, RequiredContainter } from './styles';

interface InputPros extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | undefined;
  textInputTitle: string;
  required?: boolean;
}

const Input: FC<InputPros> = ({ textInputTitle, error, required, ...rest }) => {
  const [focused, setFocused] = useState(false);

  return (
    <Container onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
      <Form.Label>
        {textInputTitle}
        <RequiredContainter>{required ? '*' : ''}</RequiredContainter>
      </Form.Label>
      <InputText {...rest} isFocused={focused} hasError={!!error} />
      <MessageError>{error || ''}</MessageError>
    </Container>
  );
};

export default Input;
