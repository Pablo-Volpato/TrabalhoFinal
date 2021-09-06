import { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Checkbox } from "../../../components/Checkbox";
import { Spinner } from "react-bootstrap";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import Navegacao from "../../../components/Navegacao";
import ButtonsForm from "../../../components/ButtonsForm/ButtonsForm";
import axios from "../../../config/axiosMaquina";
import Header from "../../../components/Header";

const AtualizarNaoConformidades = () => {
  const [naturezaDoEvento, setNaturezaDoEvento] = useState("");
  const [causaRaiz, setCausaRaiz] = useState("");
  const [processoMacro, setProcessoMacro] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isDialogVisibleCadEfetuado, setIsDialogVisibleCadEfetuado] =
    useState(false);
  const [isDialogVisibleCadNaoEfetuado, setIsDialogVisibleCadNaoEfetuado] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const usuarioId = 2;
  const { id }: any = useParams();

  const atualizar = async (event: any) => {
    setValidated(true);
    setLoading(true);
    const naturezaEvento = naturezaDoEvento.trim();
    if (naturezaDoEvento.length <= 0) {
      setNaturezaDoEvento(naturezaEvento);
      setHasError(true);
    }
    const dados = {
      idUsuario: usuarioId,
      naturezaDoEvento: naturezaDoEvento,
      causaRaiz: causaRaiz,
      processoMacro: processoMacro,
      ativo: ativo,
    };
    try {
      await axios.put(`/naoConformidade/${id}?idUsuario${usuarioId}`, dados);
      setIsDialogVisibleCadEfetuado(true);
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true);
    }
  };

  const obterPorId = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/naoConformidade/${id}?idUsuario${usuarioId}`
      );
      setNaturezaDoEvento(response.data.naturezaDoEvento);
      setCausaRaiz(response.data.causaRaiz);
      setProcessoMacro(response.data.processoMacro);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obterPorId();
  }, [id]);

  const deletarNaoConformidade = async () => {
    try {
      setLoading(true);
      await axios.delete(`/naoConformidade/${id}`);
      history.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row>
      <Navegacao />
      <Col>
        <Header />
        <div style={{ display: "flex", justifyContent: "row" }}>
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="titulo-container">
                <h2 className="titulo">Não Conformidades</h2>
                <h6 className="subtitulo">
                  {"Cadastro > Não Conformidades > Atualizar"}
                </h6>
              </div>
              <DeleteModal registro={naturezaDoEvento} onPress={deletarNaoConformidade}>
                <i
                  className="pi pi-trash"
                  title="Deletar  Corretora"
                  style={{
                    fontSize: "1.2em",
                    color: "red",
                    textDecoration: "none",
                  }}
                >
                  {" "}
                </i>
              </DeleteModal>
            </div>
            <Dialog
              header="Não conformidade atualizada com sucesso!"
              footer={
                <>
                  <Button
                    label="OK"
                    onClick={() => history.push("/nao-conformidade/1")}
                  />
                </>
              }
              visible={isDialogVisibleCadEfetuado}
              style={{ width: "50vw" }}
              modal
              onHide={() => setIsDialogVisibleCadEfetuado(false)}
            />
            <Dialog
              header="Erro ao atualizar, verifique os campos!"
              footer={
                <>
                  <Button
                    label="OK"
                    onClick={() => setIsDialogVisibleCadNaoEfetuado(false)}
                  />
                </>
              }
              visible={isDialogVisibleCadNaoEfetuado}
              style={{ width: "50vw" }}
              modal
              onHide={() => setIsDialogVisibleCadNaoEfetuado(false)}
            />
            {loading ? (
              <Spinner
                animation="border"
                variant="warning"
                style={{
                  display: "flex",
                  marginLeft: "47.5%",
                  marginTop: "5%",
                  marginBottom: "5%",
                }}
              />
            ) : (
              <Form noValidate validated={validated} onSubmit={atualizar}>
                <Form.Row>
                  <Form.Group as={Col} sm={6}>
                    <Form.Label className="requiredField">
                      NATUREZA DO EVENTO<b style={{ marginLeft: 0, fontSize: 18, color: "#f00"}}>*</b>
                    </Form.Label>
                    <Form.Control
                      value={naturezaDoEvento}
                      onChange={(event: any) =>
                        setNaturezaDoEvento(event.target.value)
                      }
                      name="Natureza do Evento"
                      type="text"
                      required
                      title="Preencha com o tipo de natureza do evento "
                      maxLength={256}
                    />
                    <div>
                      {hasError && (
                        <small style={{ color: "red" }}>
                          {" "}
                          O nome é um campo obrigatorio!!
                        </small>
                      )}
                    </div>
                    <Form.Label className="requiredField">
                      PROCESSO MACRO<b style={{ marginLeft: 0, fontSize: 18, color: "#f00"}}>*</b>
                    </Form.Label>
                    <Form.Control
                      value={processoMacro}
                      onChange={(event: any) =>
                        setProcessoMacro(event.target.value)
                      }
                      name="Processo Macro"
                      type="text"
                      title="Preencha com o tipo de processo "
                      maxLength={256}
                    />
                  </Form.Group>

                  <Form.Group as={Col} sm={6}>
                    <Form.Label className="requiredField">
                      CAUSA RAIZ
                    </Form.Label>
                    <Form.Control
                      value={causaRaiz}
                      onChange={(event: any) =>
                        setCausaRaiz(event.target.value)
                      }
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
};

export default AtualizarNaoConformidades;
