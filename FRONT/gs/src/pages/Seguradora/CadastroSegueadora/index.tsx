import React, { useEffect, useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Checkbox } from '../../../components/Checkbox';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { SeguradoraTypesGryd } from '../../../Types/seguradoraTypesGryd';
import { Spinner } from 'react-bootstrap';
import axios from '../../../config/axiosMaquina';
import Navegacao from '../../../components/Navegacao';
import ButtonsForm from '../../../components/ButtonsForm/ButtonsForm';
import Header from '../../../components/Header';


function CadastroSeguradora() {
  const [nome, setnome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [seguradora, setSegurado] = useState<SeguradoraTypesGryd[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogVisibleRecuperarseguradora, setisDialogVisibleRecuperarseguradora] = useState(false);
  const [isDialogVisibleseguradoraExistente, setisDialogVisibleseguradoraExistente] = useState(false);
  const [isDialogVisibleCadEfetuado, setIsDialogVisibleCadEfetuado] = useState(false);
  const [isDialogVisibleCadNaoEfetuado, setIsDialogVisibleCadNaoEfetuado] = useState(false);
  const [seguradoraRecuperado, setSeguradoRecuperado] = useState<any>();
  const [hasError, setHasError] = useState(false);
  const [validated, setValidated] = useState(false);

  const history = useHistory();
  const usuarioId = 2;

  const obterSeguradora = async () => {
    const { data } = await axios.get(`/seguradora?idUsuario=${usuarioId}`);
    setSegurado(data);
  }

  useEffect(() => {
    obterSeguradora();
  }, []);

  const validarCadastro = () => {
    return seguradora.filter(seguradora => seguradora.nome === nome);
  }

  const recuperarSeguradoraInativo = async () => {
    try {
      seguradoraRecuperado.ativo = true;
      setLoading(true);
      await axios.put(`/seguradora/${seguradoraRecuperado.id}?idUsuario${usuarioId}`, seguradoraRecuperado);
      setIsDialogVisibleCadEfetuado(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const cadastrarseguradora = async (event: any) => {
    try {
      event.preventDefault();
      setValidated(true)
      const novonome = nome.trim();
      if (novonome.length <= 0) {
        setnome(novonome);
        setHasError(true)
        return;
      }
      const seguradoraEncontrado = validarCadastro();
      if (seguradoraEncontrado.length <= 0) {
        const dados = {
          'idUsuario': usuarioId,
          'nome': nome,
          'descricao': descricao,
          'ativo': ativo
        }
        setLoading(true);
        await axios.post(`/seguradora?idUsuario${usuarioId}`, dados);
        setIsDialogVisibleCadEfetuado(true);
        setLoading(false);
        return;
      }

      if (seguradoraEncontrado[0].ativo === false) {
        setisDialogVisibleRecuperarseguradora(true);
        setSeguradoRecuperado(seguradoraEncontrado[0]);
      } else {
        setisDialogVisibleseguradoraExistente(true);
      }
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true);
    }
  }

  return (
    <Row>
      <Navegacao />
      <Col>
        <Header />
        <div style={{ display: 'flex', justifyContent: 'row' }}>
          <div className="card">
            <div className="titulo-container">
              <h2 className="titulo">Seguradora</h2>
              <h6 className="subtitulo">{'Cadastros > Seguradora > Cadastro'}</h6>
            </div>
            <Dialog
              header="Esta Seguradora foi excluído anteriormente. Tem certeza que deseja reativar o cadastro dele?"
              footer={
                <>
                  <Button label="Não" onClick={() => setisDialogVisibleRecuperarseguradora(false)} />
                  <Button
                    label="Sim"
                    onClick={() => {
                      setisDialogVisibleRecuperarseguradora(false);
                      recuperarSeguradoraInativo();
                    }}
                  />
                </>
              }
              visible={isDialogVisibleRecuperarseguradora}
              style={{ width: '50vw' }}
              modal
              onHide={() => setisDialogVisibleRecuperarseguradora(false)}
            />
            <Dialog
              header="Seguradora foi cadastrado com sucesso!"
              footer={
                <>
                  <Button label="OK" onClick={() => history.push('/seguradora/1')} />
                </>
              }
              visible={isDialogVisibleCadEfetuado}
              style={{ width: '50vw' }}
              modal
              onHide={() => setIsDialogVisibleCadEfetuado(false)}
            />
            <Dialog
              header="Seguradora já cadastrada!"
              footer={
                <>
                  <Button label="OK" onClick={() => setisDialogVisibleseguradoraExistente(false)} />
                </>
              }
              visible={isDialogVisibleseguradoraExistente}
              style={{ width: '50vw' }}
              modal
              onHide={() => setisDialogVisibleseguradoraExistente(false)}
            />
            <Dialog
              header="Erro ao cadastrar, verifique se os campos!"
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
              <Form noValidate validated={validated} onSubmit={cadastrarseguradora}>
                <Form.Row>
                  <Form.Group as={Col} sm={6}>
                    <Form.Label className="requiredField">SEGURADORA<b style={{ marginLeft: 0, fontSize: 18, color: "#f00"}}>*</b>
                    </Form.Label>
                    <Form.Control
                      value={nome}
                      onChange={(event: any) => setnome(event.target.value)}
                      name="seguradora"

                      type="text"
                      required
                      title='Preencha com o nome da Seguradora'
                      maxLength={256}
                    />
                    <div>
                      {hasError && <small style={{ color: 'red' }}> O nome é um campo obrigatorio!!</small>}
                    </div>
                    <Form.Label className="requiredField">DESCRIÇÃO </Form.Label>
                    <Form.Control
                      value={descricao}
                      onChange={(event: any) => setDescricao(event.target.value)}
                      name="Correto"
                      type="text"
                      title='Preencha descricao'
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

export default CadastroSeguradora;