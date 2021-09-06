/* eslint-disable */
import React, { useState, useRef } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Spinner } from 'react-bootstrap';
import { Checkbox } from '../../../components/Checkbox';
import Header from '../../../components/Header';
import ButtonsForm from '../../../components/ButtonsForm/ButtonsForm';
import Navegacao from '../../../components/Navegacao';
import axios from '../../../config/axiosMaquina';

function CadastroComunicacao() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState();
  const [imagemLogo, setImagemLogo] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [isDialogVisibleCadEfetuado, setIsDialogVisibleCadEfetuado] = useState(false);
  const [isDialogVisibleCadNaoEfetuado, setIsDialogVisibleCadNaoEfetuado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [validated, setValidated] = useState(false);

  const history = useHistory();
  const usuarioId = 2;

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
      imagem: imagemLogo,
      ativo: ativo
    }
    try {
      setLoading(true)
      await axios.post(`/tipoDeComunicacao?idUsuario${usuarioId}`, dados)
      setIsDialogVisibleCadEfetuado(true)
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true);
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row>
      <Navegacao />
      <Col >
        <Header />
        <div style={{ display: 'flex', justifyContent: 'row' }}>
          <div className="card">
            <div className="titulo-container">
              <h2 className="titulo">Tipos de Comunicação</h2>
              <h6 className="subtitulo">{'Cadastro > Tipos de Comunicação > Cadastro'}</h6>
            </div>
            <Dialog
              header="Tipo de Comunicação foi cadastrado com sucesso!"
              footer={
                <>
                  <Button label="OK" onClick={() => history.push('/tipo-de-comunicacao/1')} />
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
                  <Button label="OK" onClick={() => setIsDialogVisibleCadNaoEfetuado(false)} />
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
                  <Form.Group as={Col} sm={6}>
                    <Form.Label className="requiredField">NOME<b style={{ marginLeft: 0, fontSize: 18, color: "#f00"}}>*</b>
                    </Form.Label>
                    <Form.Control
                      value={nome}
                      onChange={(event: any) => setNome(event.target.value)}
                      name="nome"
                      type="text"
                      required
                      title="Preencha com o tipo de comunicação"
                      maxLength={256}
                    />
                    <div>
                      {hasError && <small style={{ color: 'red' }}> O nome é um campo obrigatorio!!</small>}
                    </div>
                    <Form.Label className="requiredField">DESCRIÇÃO</Form.Label>
                    <Form.Control
                      value={descricao}
                      onChange={(event: any) => setDescricao((event.target.value))}
                      name="Descrição"
                      type="text"
                      title="Preencha com a descrição do tipo de comunicaçãoo"
                      maxLength={256}
                    />
                  </Form.Group>
                </Form.Row>
                <Checkbox ativo={ativo} checked={() => setAtivo(!ativo)} />
                <ButtonsForm />
              </Form>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default CadastroComunicacao;