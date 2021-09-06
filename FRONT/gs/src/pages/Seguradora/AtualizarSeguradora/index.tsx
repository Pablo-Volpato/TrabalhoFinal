import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { Checkbox } from "../../../components/Checkbox";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { SeguradoraTypesGryd } from "../../../Types/seguradoraTypesGryd";
import { Spinner } from "react-bootstrap";
import axios from "../../../config/axiosMaquina";
import Navegacao from "../../../components/Navegacao";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import ButtonsForm from "../../../components/ButtonsForm/ButtonsForm";
import Header from "../../../components/Header";

const AtualizarSeguadora = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [seguradora, setSeguradora] = useState<SeguradoraTypesGryd[]>([]);
  const [loading, setLoading] = useState(false);
  const [
    isDialogVisibleRecuperarSeguradora,
    setisDialogVisibleRecuperarSeguradora,
  ] = useState(false);
  const [
    isDialogVisibleSeguradoraExistente,
    setisDialogVisibleSeguradoraExistente,
  ] = useState(false);
  const [isDialogVisibleCadEfetuado, setIsDialogVisibleCadEfetuado] =
    useState(false);
  const [isDialogVisibleCadNaoEfetuado, setIsDialogVisibleCadNaoEfetuado] =
    useState(false);
  const [seguradoraRecuperado, setSeguradoraRecuperado] = useState<any>();
  const [hasError, setHasError] = useState(false);
  const [validated, setValidated] = useState(false);

  const history = useHistory();
  const usuarioId = 2;
  const { id }: any = useParams();

  const validarCadastro = () => {
    return seguradora.filter((seguradora) => seguradora.nome === nome);
  };

  const cadastrarSeguradora = async (event: any) => {
    event.preventDefault();
    setValidated(true);
    const novonome = nome.trim();
    if (novonome.length <= 0) {
      setNome(novonome);
      setHasError(true);
      return;
    }

    try {
      const seguradoraEncontrado = validarCadastro();
      if (seguradoraEncontrado.length <= 0) {
        const dados = {
          idUsuario: usuarioId,
          nome: nome,
          descricao: descricao,
          ativo: ativo,
        };
        setLoading(true);
        await axios.put(`/seguradora/${id}?idUsuario${usuarioId}`, dados);
        setIsDialogVisibleCadEfetuado(true);
        setLoading(false);
        return;
      }

      if (seguradoraEncontrado[0].ativo === false) {
        setisDialogVisibleRecuperarSeguradora(true);
        setSeguradoraRecuperado(seguradoraEncontrado[0]);
      } else {
        setisDialogVisibleSeguradoraExistente(true);
      }
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true);
    }
  };
  const recuperarSeguradoraInativo = async () => {
    try {
      seguradoraRecuperado.ativo = true;
      setLoading(true);
      await axios.put(
        `/seguradora/${seguradoraRecuperado.id}?idUsuario${usuarioId}`,
        seguradoraRecuperado
      );
      setIsDialogVisibleCadEfetuado(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const obterSeguradoraPorId = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/seguradora/${id}?idUsuario${usuarioId}`
      );
      setNome(response.data.nome);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const obterSeguradora = async () => {
    const { data } = await axios.get(`/seguradora?idUsuario=${usuarioId}`);
    setSeguradora(data);
  };
  useEffect(() => {
    obterSeguradoraPorId();
    obterSeguradora();
  }, [id]);

  const deletarSeguradora = async () => {
    try {
      setLoading(true);
      await axios.delete(`/seguradora/${id}`);
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
                <h2 className="titulo">Seguradora</h2>
                <h6 className="subtitulo">
                  {"Cadastro > Seguradora > Atualizar"}
                </h6>
              </div>
              <DeleteModal registro={nome} onPress={deletarSeguradora}>
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
              header="Esta Seguradora foi excluído anteriormente. Tem certeza que deseja reativar o cadastro dele?"
              footer={
                <>
                  <Button
                    label="Não"
                    onClick={() => setisDialogVisibleRecuperarSeguradora(false)}
                  />
                  <Button
                    label="Sim"
                    onClick={() => {
                      setisDialogVisibleRecuperarSeguradora(false);
                      recuperarSeguradoraInativo();
                    }}
                  />
                </>
              }
              visible={isDialogVisibleRecuperarSeguradora}
              style={{ width: "50vw" }}
              modal
              onHide={() => setisDialogVisibleRecuperarSeguradora(false)}
            />
            <Dialog
              header="Seguradora foi cadastrado com sucesso!"
              footer={
                <>
                  <Button
                    label="OK"
                    onClick={() => history.push("/seguradora/1")}
                  />
                </>
              }
              visible={isDialogVisibleCadEfetuado}
              style={{ width: "50vw" }}
              modal
              onHide={() => setIsDialogVisibleCadEfetuado(false)}
            />
            <Dialog
              header="Seguradora já cadastrada!"
              footer={
                <>
                  <Button
                    label="OK"
                    onClick={() => setisDialogVisibleSeguradoraExistente(false)}
                  />
                </>
              }
              visible={isDialogVisibleSeguradoraExistente}
              style={{ width: "50vw" }}
              modal
              onHide={() => setisDialogVisibleSeguradoraExistente(false)}
            />
            <Dialog
              header="Erro ao cadastrar, verifique os campos!"
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
              <Form
                noValidate
                validated={validated}
                onSubmit={cadastrarSeguradora}
              >
                <Form.Row>
                  <Form.Group as={Col} sm={6}>
                    <Form.Label className="requiredField">
                      Seguradora<b style={{ marginLeft: 0, fontSize: 18, color: "#f00"}}>*</b>
                    </Form.Label>
                    <Form.Control
                      value={nome}
                      onChange={(event: any) => setNome(event.target.value)}
                      name="seguradora"
                      type="text"
                      required
                      title="Preencha com o nome da Seguradora"
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
                      Descrição{" "}
                    </Form.Label>
                    <Form.Control
                      value={descricao}
                      onChange={(event: any) =>
                        setDescricao(event.target.value)
                      }
                      name="Descrição"
                      type="text"
                      title="Preencha descricao"
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

export default AtualizarSeguadora;
