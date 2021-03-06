/* eslint-disable */
import React, { FC, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Form, Col, Row } from 'react-bootstrap';
import { Botao, Content } from './styles';
import { Dialog } from 'primereact/dialog';
import { Checkbox } from '../../../components/Checkbox';
import { Spinner } from 'react-bootstrap';
import axios from '../../../config/axiosMaquina';


const ModalCadastro = () => {
  const [show, setShow] = useState<Boolean>(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState();
  const [ativo, setAtivo] = useState(true);
  const [isDialogVisibleCadEfetuado, setIsDialogVisibleCadEfetuado] = useState(false);
  const [isDialogVisibleCadNaoEfetuado, setIsDialogVisibleCadNaoEfetuado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [validated, setValidated] = useState(false);


  const usuarioId = 2;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const history = useHistory();

  function back() {
    history.go(0);
  }

  const cadastrarComunicacao = async (event: any) => {
    event.preventDefault();
    const novoNome = nome.trim();
    setValidated(true)
    if (novoNome.length <= 0) {
      setNome(novoNome);
      setHasError(true)
      return;
    }
    const dados = {
      idUsuario: usuarioId,
      nome: nome,
      descricao: descricao,
      imagem: "null",
      ativo: ativo
    }
    try {
      setLoading(true)
      await axios.post(`/tipoDeComunicacao?idUsuario${usuarioId}`, dados)
      setIsDialogVisibleCadEfetuado(true)
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true);
    } finally {
      setLoading(true)
    }
  }

  return (
    <>
      <Button
        style={{
          backgroundColor: 'transparent',
          width: "44px",
          height: "40px",
          borderColor: "#ffda53",
          borderRadius: "5px",
          opacity: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: '0',
          marginLeft: "10px",
          paddingRight: "30px",
          paddingBottom: 0
        }}
        onClick={handleShow}
      >

        <i
          style={{ fontSize: 18, color: '#000', textDecoration: 'none' }}
          className="pi pi-plus"
        ></i>

      </Button>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        enforceFocus
        show={show}
        onHide={handleClose}
      >
        <Modal.Header style={{ alignSelf: 'center' }}>
          <h2 className="titulo">Tipos de Comunica????o</h2>
        </Modal.Header>
        <Modal.Body style={{ fontSize: 20, alignSelf: 'center', width: "80%" }}>
          <Dialog
            header="Tipo de Comunica????o foi cadastrado com sucesso!"
            footer={
              <>
                <Button onClick={back} >
                  OK
                </Button>
              </>
            }
            visible={isDialogVisibleCadEfetuado}
            style={{ width: '50vw' }}
            modal
            onHide={() => setIsDialogVisibleCadEfetuado(false)}
          />
          <Dialog
            header="Erro ao cadastrar, verifique os campos!"
            footer={
              <>
                <Button onClick={() => setIsDialogVisibleCadNaoEfetuado(false)}>
                  OK
                </Button>
              </>
            }
            visible={isDialogVisibleCadNaoEfetuado}
            style={{ width: '50vw' }}
            modal
            onHide={() => setIsDialogVisibleCadNaoEfetuado(false)}
          />
          {loading ? (
            <Spinner
              animation="border"
              variant="warning"
              style={{
                display: 'flex',
                marginLeft: '47.5%',
                marginTop: '5%',
                marginBottom: '5%',
              }}
            />
          ) : (
            <Form noValidate validated={validated} onSubmit={cadastrarComunicacao}>
              <Form.Row>
                <Form.Group as={Col} sm={12}>
                  <Form.Label className="requiredField">NOME
                  </Form.Label>
                  <Form.Control
                    value={nome}
                    onChange={(event: any) => setNome(event.target.value)}
                    name="nome"
                    placeholder="Nome"
                    type="text"
                    required
                    title="Preencha com o tipo de comunica????o"
                    maxLength={256}
                  />
                  <div>
                    {hasError && <small style={{ color: 'red' }}> O nome ?? um campo obrigatorio!!</small>}
                  </div>
                  <Form.Label className="requiredField">DESCRI????O</Form.Label>
                  <Form.Control
                    value={descricao}
                    onChange={(event: any) => setDescricao((event.target.value))}
                    name="Descri????o"
                    placeholder="Descri????o"
                    type="text"
                    title="Preencha com a descri????o do tipo de comunica????oo"
                    maxLength={256}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Checkbox ativo={ativo} checked={() => setAtivo(!ativo)} />
              </Form.Row>
              <Botao className="container-buttons justify-content-between" style={{ justifyContent: '' }}>
                <Form.Group as={Col} md={2}>
                  <Button
                    className="btn-cancelar"
                    onClick={() => {
                      handleClose()
                    }}
                  >
                    Cancelar
                  </Button>
                </Form.Group>
                <Form.Group as={Col} md={2}>
                  <Button className="btn-enviar" type="submit">
                    Confirmar
                  </Button>
                </Form.Group>
              </Botao>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCadastro;
