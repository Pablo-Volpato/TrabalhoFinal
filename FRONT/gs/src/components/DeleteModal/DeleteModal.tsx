import React, { FC, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

type DeleteModalProps = {
  registro: string;
  onPress: () => void;
};

const DeleteModal: FC<DeleteModalProps> = ({ registro, onPress , children}) => {
  const [show, setShow] = useState<Boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 

  function defaultFunc() {
    onPress();
    handleClose();
  }

  return (
      <>
    <Button
      style={{
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        width: 20,
        height: 20,
        padding: 0,
        marginRight: 15,
        marginBottom: 2,
      }}
    onClick={handleShow}
  >
    {children}
  </Button>
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      enforceFocus
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Atenção</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: 20, alignSelf: 'center' }}>
        Deseja realmente excluir o registro "{registro}"?
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          style={{ width: '120px', height: '50px' }}
          onClick={handleClose}
        >
          Cancelar
        </Button>
        <Button
          style={{ backgroundColor:'#fdd43d', color: '#000', width: '120px', height: '50px' }}
          variant="primary"
          onClick={defaultFunc}
        >
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default DeleteModal;

