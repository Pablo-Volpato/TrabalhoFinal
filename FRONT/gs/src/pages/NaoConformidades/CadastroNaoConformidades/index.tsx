/* eslint-disable */
import React, { useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Spinner } from 'react-bootstrap';
import { Checkbox } from '../../../components/Checkbox';
import ButtonsForm from '../../../components/ButtonsForm/ButtonsForm';
import Navegacao from '../../../components/Navegacao';
import axios from '../../../config/axiosMaquina';
import Header from '../../../components/Header';

function CadastroNaoConformidades() {
  const [naturezaDoEvento, setNaturezaDoEvento] = useState('');
  const [causaRaiz, setCausaRaiz] = useState('');
  const [processoMacro, setProcessoMacro] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [ hasError, setHasError] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isDialogVisibleCadEfetuado, setIsDialogVisibleCadEfetuado] = useState(false);
  const [isDialogVisibleCadNaoEfetuado, setIsDialogVisibleCadNaoEfetuado] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const usuarioId = 2;

  const cadastrarNaoConf = async (event: any) => {
    try {
      event.preventDefault();
      setValidated(true);
      setLoading(true);
      const naturezaEvento = naturezaDoEvento.trim();
      if (naturezaDoEvento.length <= 0) {
        setNaturezaDoEvento(naturezaEvento);
        setHasError(true)
        return;
      }
      const dados = {
        idUsuario: usuarioId,
        naturezaDoEvento: naturezaDoEvento,
        causaRaiz: causaRaiz,
        processoMacro: processoMacro,
        ativo: ativo
      }
      await axios.post(`/naoConformidade?idUsuario${usuarioId}`, dados);
      setIsDialogVisibleCadEfetuado(true);
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true);
    } finally {
      setLoading(false);
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
              <h2 className="titulo">Não Conformidades</h2>
              <h6 className="subtitulo">{'Cadastro > Não Conformidades > Cadastro'}</h6>
            </div>
            <Dialog
              header="Não conformidades cadastradas com sucesso!"
              footer={
                <>
                  <Button label="OK" onClick={() => history.push('/nao-conformidade/1')} />
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
              <Form noValidate validated={validated} onSubmit={cadastrarNaoConf}>
                <Form.Row>
                  <Form.Group as={Col} sm={6}>
                    <Form.Label className="requiredField">NATUREZA DO EVENTO<b style={{ marginLeft: 0, fontSize: 18, color: "#f00"}}>*</b>
                    </Form.Label>
                    <Form.Control
                      value={naturezaDoEvento}
                      onChange={(event: any) => setNaturezaDoEvento(event.target.value)}
                      name="Natureza do Evento"
                      type="text"
                      required
                      title="Preencha com o tipo de natureza do evento "
                      maxLength={256}
                    />
                    <div>
                    { hasError && <small style={{color: 'red'}}> O nome é um campo obrigatorio!!</small>}
                    </div>
                    <Form.Label className="requiredField">PROCESSO MACRO 
                    </Form.Label>
                    <Form.Control
                      value={processoMacro}
                      onChange={(event: any) => setProcessoMacro(event.target.value)}
                      name="Processo Macro"
                      type="text"
                      title="Preencha com o tipo de processo "
                      maxLength={256}
                    />
                  </Form.Group>

                  <Form.Group as={Col} sm={6}>
                    <Form.Label className="requiredField">CAUSA RAIZ
                    </Form.Label>
                    <Form.Control
                      value={causaRaiz}
                      onChange={(event: any) => setCausaRaiz(event.target.value)}
                      name="Causa Raiz"
                      type="text"
                      title="Preencha com o tipo de causa raíz "
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

export default CadastroNaoConformidades;
