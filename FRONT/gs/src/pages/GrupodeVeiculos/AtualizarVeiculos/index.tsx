import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { GrupoMacroTypesGryd } from "../../../Types/grupoMacroTypesGryd ";
import { Spinner } from "react-bootstrap";
import { Checkbox } from "./styles";
import { MultiSelect } from "primereact/multiselect";
import Navegacao from "../../../components/Navegacao";
import axios from "../../../config/axiosMaquina";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import Select from "../../../components/Select";
import ButtonsForm from "../../../components/ButtonsForm/ButtonsForm";
import Header from "../../../components/Header";
import { DispositivosTypesGryd } from "../../../Types/dispositivosTypesGryd";

const AtualizarVeiculos = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState();
  const [ativo, setAtivo] = useState(true);
  const [grupo_macro_de_veiculos, setGrupo_macro_de_veiculos] = useState<any>(
    []
  );
  const [grupoMacrodeVeiculos, setgrupoMacrodeVeiculos] = useState<
    GrupoMacroTypesGryd[]
  >([]);
  const [isDialogVisibleCadNaoEfetuado, setIsDialogVisibleCadNaoEfetuado] =
    useState(false);
  const [isDialogVisibleCadEfetuado, setIsDialogVisibleCadEfetuado] =
    useState(false);
  const [dispositivos, setDispositivos] = useState<DispositivosTypesGryd[]>([]);
  const [dispositivosID, setDispositivosID] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [hasError, setHasError] = useState(false);

  const history = useHistory();
  const usuarioId = 2;
  const { id }: any = useParams();

  const cadastrarGrupodeVeiculos = async (event: any) => {
    event.preventDefault();
    const novoNome = nome.trim();
    setValidated(true);
    if (novoNome.length <= 0) {
      setNome(novoNome);
      setHasError(true);
      return;
    }
    const dados = {
      idUsuario: usuarioId,
      nome: nome,
      descricao: descricao,
      grupoMacroId: grupo_macro_de_veiculos,
      dispositivoId: dispositivosID.map((tipo: any) => tipo.code),
    };
    try {
      await axios.put(`/grupoVeiculos/${id}?idUsuario${usuarioId}`, dados);
      setIsDialogVisibleCadEfetuado(true);
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true);
    }
  };

  const obterVeiculosPorId = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/grupoVeiculos/${id}?idUsuario${usuarioId}`
      );
      setNome(response.data.nome);
      setDescricao(response.data.descricao);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const obterGrupoMacrodeVeiculos = async () => {
    try {
      const response = await axios.get(
        `/grupoMacroDeVeiculos?idUsuario${usuarioId}`
      );
      setgrupoMacrodeVeiculos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obterVeiculosPorId();
  }, [id]);

  useEffect(() => {
    obterGrupoMacrodeVeiculos();
  }, []);

  const select = grupoMacrodeVeiculos.map((tipo, index) => ({
    name: tipo.nome,
    code: tipo.id,
  }));

  const deletarGrupoVeiculos = async () => {
    try {
      setLoading(true);
      await axios.delete(`/grupoVeiculos/${id}`);
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
                <h2 className="titulo">Grupo de Veículos</h2>
                <h6 className="subtitulo">
                  {"Cadastro > Grupo de Veículos > Atualizar"}
                </h6>
              </div>
              <DeleteModal registro={nome} onPress={deletarGrupoVeiculos}>
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
              header="Veiculos de Rastreamento foi atualizada com sucesso!"
              footer={
                <>
                  <Button
                    label="OK"
                    onClick={() => history.push("/grupo-de-veiculos/1")}
                  />
                </>
              }
              visible={isDialogVisibleCadEfetuado}
              style={{ width: "50vw" }}
              modal
              onHide={() => setIsDialogVisibleCadEfetuado(false)}
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
                onSubmit={cadastrarGrupodeVeiculos}
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
                      title="Preencha com o nome do grupo de veículos "
                      maxLength={256}
                    />
                    {hasError && (
                      <small style={{ color: "red" }}>
                        {" "}
                        O nome é um campo obrigatorio!!
                      </small>
                    )}
                    <Select
                      style={{
                        borderColor:
                          grupo_macro_de_veiculos === undefined && validated
                            ? "#dc3545"
                            : "",
                      }}
                      required={true}
                      value={grupo_macro_de_veiculos}
                      textInputTitle="GRUPO MACRO DE VEÍCULOS"
                      onChange={(e: any) =>
                        setGrupo_macro_de_veiculos(e.target.value)
                      }
                    >
                      <option value="0">Selecione o grupo macro</option>
                      {grupoMacrodeVeiculos.map((tipo, index) => (
                        <option value={tipo.id}>{tipo.nome}</option>
                      ))}
                    </Select>
                  </Form.Group>
                  <Form.Group as={Col} sm={6}>
                    <Form.Label className="requiredField">DESCRIÇÃO</Form.Label>
                    <Form.Control
                      value={descricao}
                      onChange={(event: any) =>
                        setDescricao(event.target.value)
                      }
                      name="Descrição"
                      type="text"
                      title="Preencha com a descrição do Grupo de Veículos"
                      maxLength={256}
                    />
                    <Form.Label
                      style={{ marginTop: 8 }}
                      className="requiredField"
                    >
                      DISPOSITIVO<b style={{ marginLeft: 0, fontSize: 18, color: "#f00"}}>*</b>
                    </Form.Label>
                    <div>
                      <MultiSelect
                        style={{
                          width: "100%",
                          borderColor:
                            dispositivosID.length <= 0 && validated
                              ? "#dc3545"
                              : "",
                        }}
                        emptyFilterMessage={<Button></Button>}
                        display="chip"
                        optionLabel="name"
                        value={dispositivosID}
                        options={select}
                        onChange={(e: any) => setDispositivosID(e.target.value)}
                        filter
                      />
                    </div>
                  </Form.Group>
                  <Checkbox>
                    <label className="switch">
                      <input type="checkbox" checked={ativo} />
                      <span
                        className="slider round"
                        onClick={() => setAtivo(!ativo)}
                      ></span>
                    </label>
                    <span>{ativo ? " Ativo" : "Inativo"}</span>
                  </Checkbox>
                </Form.Row>
                <ButtonsForm />
              </Form>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default AtualizarVeiculos;
