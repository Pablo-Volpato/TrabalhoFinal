/* eslint-disable */
import React, { FC, useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Form, Col, Row } from 'react-bootstrap';
import { Botao, Content } from './styles';
import { Dialog } from 'primereact/dialog';
import { Spinner } from 'react-bootstrap';
import { GrupoMacroTypesGryd } from '../../../Types/grupoMacroTypesGryd ';
import axios from '../../../config/axiosMaquina';



const ModalCadastroGrupo = () => {
  const [show, setShow] = useState<Boolean>(false);
  const [grupoMacroRecuperado, setgrupoMacroRecuperado] =
    useState<any>();
  const [grupoMacro, setGrupoMacro] = useState<GrupoMacroTypesGryd[]>([]);
  const [isDialogVisibleCadEfetuado, setIsDialogVisibleCadEfetuado] =
    useState(false);
  const [isDialogVisibleCadNaoEfetuado, setIsDialogVisibleCadNaoEfetuado] =
    useState(false);
  const [
    isDialogVisibleRecuperarGrupoMacro,
    setIsDialogVisibleRecuperarGrupoMacro,
  ] = useState(false);
  const [
    isDialogVisibleGrupoMacroExistente,
    setisDialogVisibleGrupoMacroExistente,
  ] = useState(false);
  const [isDialogVisibleUpdateEfetuado, setIsDialogVisibleUpdateEfetuado] =
    useState(false);
  const [mensagem, setMensagem] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState<string>("");
  const [edicaoIndex, setEdicaoIndex] = useState<number>();
  const [edicaoNome, setEdicaoNome] = useState<string>("");
  const [edicaoID, setEdicaoID] = useState<string | number>(0);
  const [itensPerPage, setItensPerPage] = useState("10");
  const [totalPosts, setTotalPosts] = useState(0);
  const [validated, setValidated] = useState(false);
  const [hasErrorGM, sethasErrorGM] = useState(false);


  const usuarioId = 2;
  const history = useHistory();
  const validarGrupoMacro = () => {
    return grupoMacro.filter(
      (grupoMacro: GrupoMacroTypesGryd) =>
        grupoMacro.nome === edicaoNome || grupoMacro.nome === nome
    );
  };

  const recuperargrupoMacroInativo = async () => {
    try {
      grupoMacroRecuperado.ativo = true;
      await axios.put(
        `/grupoMacroDeVeiculos/${grupoMacroRecuperado.id}?idUsuario${usuarioId}`,
        grupoMacroRecuperado
      );
      setIsDialogVisibleUpdateEfetuado(true);
      setNome("");
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true);
    }
  };

  const obterTodosgrupoMacro = async () => {
    try {
      const { data } = await axios.get(
        `/grupoMacroDeVeiculos?idUsuario=${usuarioId}`
      );
      setGrupoMacro(data);
    } catch (error) {
      console.log(error);
    }
  };

  const cadastrargrupoMacro = async (event: any) => {
    try {
      event.preventDefault();
      const novoNome = nome.trim();
      setValidated(true);
      if (novoNome.length <= 0) {
        setNome(novoNome);
        sethasErrorGM(true)
        return;
      }
      const grupoMacroEncontrado = validarGrupoMacro();
      if (grupoMacroEncontrado.length <= 0) {
        const dados = {
          idUsuario: usuarioId,
          nome: nome,
          ativo: true,
        };
        await axios.post(`/grupoMacroDeVeiculos?idUsuario${usuarioId}`, dados);
        setIsDialogVisibleCadEfetuado(true);
        setNome("");
        return;
      }
      if (grupoMacroEncontrado[0].ativo === false) {
        setIsDialogVisibleRecuperarGrupoMacro(true);
        setgrupoMacroRecuperado(grupoMacroEncontrado[0]);
      } else {
        setisDialogVisibleGrupoMacroExistente(true);
      }
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true);
    }
  };
  useEffect(() => {
    recuperargrupoMacroInativo()
    obterTodosgrupoMacro()
  }, []);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  function back() {
    history.go(0);
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
          <h2 className="titulo">Grupo Macro de Veículos</h2>
        </Modal.Header>
        <Modal.Body style={{ fontSize: 20, alignSelf: 'center', width: "90%" }}>
          <Dialog
            header="Este Grupo Macro de Veículos foi excluído anteriormente. Tem certeza que deseja reativar o cadastro dele?"
            footer={
              <>
                <Button

                  onClick={() => setIsDialogVisibleRecuperarGrupoMacro(false)}
                >Não</Button>
                <Button

                  onClick={() => {
                    setIsDialogVisibleRecuperarGrupoMacro(false);
                    recuperargrupoMacroInativo();
                  }}
                >Sim</Button>
              </>
            }
            visible={isDialogVisibleRecuperarGrupoMacro}
            style={{ width: "50vw" }}
            modal
            onHide={() => setIsDialogVisibleRecuperarGrupoMacro(false)}
          />
          <Dialog
            header={`Grupo Macro de Veículos foi cadastrado com sucesso!`}
            footer={
              <>
                <Button

                  onClick={() => setIsDialogVisibleCadEfetuado(false)}
                >OK</Button>
              </>
            }
            visible={isDialogVisibleCadEfetuado}
            style={{ width: "50vw" }}
            modal
            onHide={() => setIsDialogVisibleCadEfetuado(false)}
          />
          <Dialog
            header={`Grupo Macro de Veículos foi atualizado com sucesso!`}
            footer={
              <>
                <Button
                  onClick={() => setIsDialogVisibleUpdateEfetuado(false)}
                >OK</Button>
              </>
            }
            visible={isDialogVisibleUpdateEfetuado}
            style={{ width: "50vw" }}
            modal
            onHide={() => setIsDialogVisibleUpdateEfetuado(false)}
          />
          <Dialog
            header="Grupo Macro de Veículos já cadastrado!"
            footer={
              <>
                <Button

                  onClick={() => setisDialogVisibleGrupoMacroExistente(false)}
                >OK</Button>
              </>
            }
            visible={isDialogVisibleGrupoMacroExistente}
            style={{ width: "50vw" }}
            modal
            onHide={() => setisDialogVisibleGrupoMacroExistente(false)}
          />
          <Dialog
            header="Erro ao cadastrar, verifique os campos!"
            footer={
              <>
                <Button onClick={() => setIsDialogVisibleCadNaoEfetuado(false)} >OK</Button>
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
            <Form noValidate validated={validated} onSubmit={cadastrargrupoMacro}>
              <Form.Row>
                <Form.Group as={Col} sm={6}>
                  <Form.Label className="requiredField">NOME<b style={{ marginLeft: 0, fontSize: 18, color: "#f00"}}>*</b>
                  </Form.Label>
                  <Form.Control
                    value={nome}
                    onChange={(event: any) => setNome(event.target.value)}
                    name="nome"
                    type="text"
                    required
                    title="Preencha com o nome do grupo de veículos "
                    maxLength={256}
                  />
                  {hasErrorGM && <small style={{ color: 'red' }}> O nome é um campo obrigatorio!!</small>}
                </Form.Group>
                <div>
                  <Botao className="container-buttons justify-content-between" >
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
                </div>
              </Form.Row>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCadastroGrupo;
