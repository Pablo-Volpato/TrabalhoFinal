import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { Checkbox } from "../../../components/Checkbox";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { CorretoraTypesGryd } from "../../../Types/corretoraTypesGryd";
import { Spinner } from "react-bootstrap";
import axios from "../../../config/axiosMaquina";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import Navegacao from "../../../components/Navegacao";
import ButtonsForm from "../../../components/ButtonsForm/ButtonsForm";
import Header from "../../../components/Header";

const AtualizarCorretora = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [corretora, setCorretora] = useState<CorretoraTypesGryd[]>([]);
  const [loading, setLoading] = useState(false);
  const [
    isDialogVisibleRecuperarCorretora,
    setisDialogVisibleRecuperarCorretora,
  ] = useState(false);
  const [
    isDialogVisibleCorretoraExistente,
    setisDialogVisibleCorretoraExistente,
  ] = useState(false);
  const [isDialogVisibleCadEfetuado, setIsDialogVisibleCadEfetuado] =
    useState(false);
  const [isDialogVisibleCadNaoEfetuado, setIsDialogVisibleCadNaoEfetuado] =
    useState(false);
  const [corretoraRecuperado, setCorretoraRecuperado] = useState<any>();
  const [hasError, setHasError] = useState(false);
  const [validated, setValidated] = useState(false);

  const history = useHistory();
  const usuarioId = 2;
  const { id }: any = useParams();

  const validarCadastro = () => {
    return corretora.filter(
      (corretora) => corretora.nome === nome && corretora.id != id
    );
  };

  const cadastrarCorretora = async (event: any) => {
    event.preventDefault();
    setValidated(true);
    const novonome = nome.trim();
    if (novonome.length <= 0) {
      setNome(novonome);
      setHasError(true);
      return;
    }

    try {
      const corretoraEncontrado = validarCadastro();
      if (corretoraEncontrado.length <= 0) {
        const dados = {
          idUsuario: usuarioId,
          nome: nome,
          descricao: descricao,
          ativo: ativo,
        };
        setLoading(true);
        await axios.put(`/corretora/${id}?idUsuario${usuarioId}`, dados);
        setIsDialogVisibleCadEfetuado(true);
        setLoading(false);
        return;
      }

      if (corretoraEncontrado[0].ativo === false) {
        setisDialogVisibleRecuperarCorretora(true);
        setCorretoraRecuperado(corretoraEncontrado[0]);
      } else {
        setisDialogVisibleCorretoraExistente(true);
      }
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true);
    }
  };
  const recuperarCorretoraInativo = async () => {
    try {
      corretoraRecuperado.ativo = true;
      setLoading(true);
      await axios.put(
        `/corretora/${corretoraRecuperado.id}?idUsuario${usuarioId}`,
        corretoraRecuperado
      );
      setIsDialogVisibleCadEfetuado(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const obterCorretoraPorId = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/corretora/${id}?idUsuario${usuarioId}`
      );
      setNome(data.nome);
      setDescricao(data.descricao);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const obterCorretora = async () => {
    const { data } = await axios.get(`/corretora?idUsuario=${usuarioId}`);
    setCorretora(data);
  };
  useEffect(() => {
    obterCorretoraPorId();
    obterCorretora();
  }, [id]);

  const deletarCorretora = async () => {
    try {
      setLoading(true);
      await axios.delete(`/corretora/${id}`);
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
                <h2 className="titulo">Corretora</h2>
                <h6 className="subtitulo">
                  {"Cadastro > Corretora > Atualizar"}
                </h6>
              </div>
              <DeleteModal registro={nome} onPress={deletarCorretora}>
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
              header="Esta Corretora foi excluído anteriormente. Tem certeza que deseja reativar o cadastro dele?"
              footer={
                <>
                  <Button
                    label="Não"
                    onClick={() => setisDialogVisibleRecuperarCorretora(false)}
                  />
                  <Button
                    label="Sim"
                    onClick={() => {
                      setisDialogVisibleRecuperarCorretora(false);
                      recuperarCorretoraInativo();
                    }}
                  />
                </>
              }
              visible={isDialogVisibleRecuperarCorretora}
              style={{ width: "50vw" }}
              modal
              onHide={() => setisDialogVisibleRecuperarCorretora(false)}
            />
            <Dialog
              header="Corretora foi atualizada com sucesso!"
              footer={
                <>
                  <Button
                    label="OK"
                    onClick={() => history.push("/corretora/1")}
                  />
                </>
              }
              visible={isDialogVisibleCadEfetuado}
              style={{ width: "50vw" }}
              modal
              onHide={() => setIsDialogVisibleCadEfetuado(false)}
            />
            <Dialog
              header="Corretora já cadastrada!"
              footer={
                <>
                  <Button
                    label="OK"
                    onClick={() => setisDialogVisibleCorretoraExistente(false)}
                  />
                </>
              }
              visible={isDialogVisibleCorretoraExistente}
              style={{ width: "50vw" }}
              modal
              onHide={() => setisDialogVisibleCorretoraExistente(false)}
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
                onSubmit={cadastrarCorretora}
              >
                <Form.Row>
                  <Form.Group as={Col} sm={6}>
                    <Form.Label className="requiredField">CORRETORA<b style={{ marginLeft: 0, fontSize: 18, color: "#f00"}}>*</b></Form.Label>
                    <Form.Control
                      value={nome}
                      onChange={(event: any) => setNome(event.target.value)}
                      name="Corretora"
                      type="text"
                      required
                      title="Preencha com o nome da Corretora"
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
                      DESCRIÇÃO{" "}
                    </Form.Label>
                    <Form.Control
                      value={descricao}
                      onChange={(event: any) =>
                        setDescricao(event.target.value)
                      }
                      name="Correto"
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

export default AtualizarCorretora;
