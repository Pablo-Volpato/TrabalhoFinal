/* eslint-disable */
import React, { FC } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './styles.css';

interface Props {
  disabled?: boolean;
}

const ButtonsForm: FC<Props> = (props) => {
  const history = useHistory();

  function back() {
    history.goBack();
  }

  return (
    <Form.Row className="container-buttons justify-content-end">
      <Form.Group as={Col} md={2}>
        <Button
          className="btn-cancelar"
          onClick={() => {
            back();
          }}
        >
          Cancelar
        </Button>
      </Form.Group>
      <Form.Group as={Col} md={2}>
        <Button className="btn-enviar" disabled={props.disabled} type="submit">
          Confirmar
        </Button>
      </Form.Group>
    </Form.Row>
  );
};

export default ButtonsForm;
