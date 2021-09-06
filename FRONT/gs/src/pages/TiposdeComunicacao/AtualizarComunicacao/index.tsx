import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Checkbox } from "../../../components/Checkbox";
import { Spinner } from "react-bootstrap";
import Navegacao from "../../../components/Navegacao";
import Header from "../../../components/Header";
import ButtonsForm from "../../../components/ButtonsForm/ButtonsForm";
import axios from "../../../config/axiosMaquina";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";

const AtualizarComunicacao = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState();
  const [imagemLogo, setImagemLogo] = useState("");
  const [ativo, setAtivo] = useState(false);
  const [isDialogVisibleCadNaoEfetuado, setIsDialogVisibleCadNaoEfetuado] =
    useState(false);
  const [isDialogVisibleCadEfetuado, setIsDialogVisibleCadEfetuado] =
    useState(false);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const history = useHistory();
  const usuarioId = 2;
  const { id }: any = useParams();

  const atualizarComunicacao = async (event: any) => {
    event.preventDefault();
    const novoNome = nome.trim();
    if (novoNome.length <= 0) {
      setNome(novoNome);
      setHasError(true);
      return;
    }
    const dados = {
      idUsuario: usuarioId,
      nome: nome,
      descricao: descricao,
      imagem: imagemLogo,
    };
    try {
      setLoading(true);
      await axios.put(`/tipoDeComunicacao/${id}?idUsuario${usuarioId}`, dados);
      setIsDialogVisibleCadEfetuado(true);
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true);
    } finally {
      setLoading(false);
    }
  };

  const obterComunicacaoPorId = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/tipoDeComunicacao/${id}??idUsuario${usuarioId}`
      );
      setNome(data.nome);
      setDescricao(data.descricao);
      setImagemLogo(data.imagem);
      setAtivo(data.ativo);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obterComunicacaoPorId();
  }, [id]);

  const deletarTipoDeComunicacao = async () => {
    try {
      setLoading(true);
      await axios.delete(`/tipoDeComunicacao/${id}`)
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
                <h2 className="titulo">Tipo de Comunicação</h2>
                <h6 className="subtitulo">
                  {"Cadastro > Tipos de Comunicação > Atualizar"}
                </h6>
              </div>
              <DeleteModal registro={nome} onPress={deletarTipoDeComunicacao}>
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
              header="Tipo de comunicação foi atualizada com sucesso!"
              footer={
                <>
                  <Button
                    label="OK"
                    onClick={() => history.push("/tipo-de-comunicacao/1")}
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
              <Form
                noValidate
                validated={validated}
                onSubmit={atualizarComunicacao}
              >
                <Form.Row>
                  <Form.Group as={Col} sm={6}>
                    <Form.Label className="requiredField">NOME<b style={{ marginLeft: 0, fontSize: 18, color: "#f00"}}>*</b></Form.Label>
                    <Form.Control
                      value={nome}
                      onChange={(event: any) => setNome(event.target.value)}
                      name="nome"
                      type="text"
                      required
                      title="Preencha com o nome de Comunicacao de Ratreamento "
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
                    <Form.Label className="requiredField">DESCRIÇÃO</Form.Label>
                    <Form.Control
                      value={descricao}
                      onChange={(event: any) =>
                        setDescricao(event.target.value)
                      }
                      name="Descrição"
                      type="text"
                      title="Preencha com a descrição da Comunicacao de Rastreamento"
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

export default AtualizarComunicacao;
