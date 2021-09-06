import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Checkbox } from "../../../components/Checkbox";
import { VeiculosTypesGryd } from "../../../Types/veiculosTypesGryd";
import { Spinner } from "react-bootstrap";
import { MultiSelect } from "primereact/multiselect";
import { TiposDeDispositivosTypesGryd } from "../../../Types/tiposDeDispositivosTypes";
import Select from "../../../components/Select";
import ButtonsForm from "../../../components/ButtonsForm/ButtonsForm";
import Navegacao from "../../../components/Navegacao";
import axios from "../../../config/axiosMaquina";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import Header from "../../../components/Header";
import ModalCadastro from "../../GrupodeVeiculos/Modal/Modal";
import ModalCadastroTipoDeDispositivo from "../../TiposDeDispositivos/Modal/Modal";

const AtualizarDispositivos = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState();
  const [grupo_de_veiculos, setGrupo_de_veiculos] = useState<any>([]);
  const [GrupodeVeiculos, setGrupodeVeiculos] = useState<VeiculosTypesGryd[]>( []);
  const [ativo, setAtivo] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [validated, setValidated] = useState(false);
  const [tipo_de_dispositivo, setTipo_de_dispositivo] = useState<any>([]);
  const [tiposDeDispositivos, setTiposDeDispositivos] = useState<
    TiposDeDispositivosTypesGryd[]
  >([]);

  const [isDialogVisibleCadEfetuado, setIsDialogVisibleCadEfetuado] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const usuarioId = 2;
  const { id }: any = useParams();

  const atualizarDispositivos = async (event: any) => {
    event.preventDefault();
    setValidated(true);
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
      ativo: ativo,
      grupo_de_veiculos: grupo_de_veiculos.map((tipo: any) => tipo.code),
      tipoDispositivoId: tipo_de_dispositivo,
    };
    try {
      await axios.put(`/dispositivo/${id}?idUsuario${usuarioId}`, dados);
      setIsDialogVisibleCadEfetuado(true);
    } catch (error) {
      alert("Error ao atualizar");
    }
  };

  const obterDispositivosPorId = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/dispositivo/${id}?idUsuario${usuarioId}`
      );
      setNome(response.data.nome);
      setDescricao(response.data.descricao);
      setAtivo(response.data.ativo);
      setLoading(false);
    } catch (error) { }
  };

  const obterGrupoDeVeiculo = async () => {
    try {
      const response = await axios.get(`/grupoVeiculos?idUsuario${usuarioId}`);
      setGrupodeVeiculos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const obterTiposDeDispositivos = async () => {
    try {
      const response = await axios.get(
        `/tiposDeDispositivos?idUsuario${usuarioId}`
      );
      setTiposDeDispositivos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obterDispositivosPorId();
  }, [id]);

  useEffect(() => {
    obterGrupoDeVeiculo();
  }, []);

  useEffect(() => {
    obterTiposDeDispositivos();
  }, []);

  const select = GrupodeVeiculos.map((tipo, index) => ({
    name: tipo.nome,
    code: tipo.id,
  }));
  
  const deletarDispositivo = async () => {
    try {
      setLoading(true);
      await axios.delete(`/dispositivo/${id}`);
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
              <h2 className="titulo">Dispositivo</h2>
              <h6 className="subtitulo">
                {"Cadastro > Dispositivos > Atualizar"}
              </h6>
            </div>
              <DeleteModal registro={nome} onPress={deletarDispositivo}>
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
              header="Dispositivo foi atualizado com sucesso!"
              footer={
                <>
                  <Button
                    label="OK"
                    onClick={() => history.push("/dispositivos/1")}
                  />
                </>
              }
              visible={isDialogVisibleCadEfetuado}
              style={{ width: "50vw" }}
              modal
              onHide={() => setIsDialogVisibleCadEfetuado(false)}
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
                onSubmit={atualizarDispositivos}
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
                      title="Preencha com o nome do Dispositivo"
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

                    <Form.Label
                      style={{ marginTop: 12 }}
                      className="requiredField"
                    >
                      DESCRIÇÃO
                    </Form.Label>
                    <Form.Control
                      value={descricao}
                      onChange={(event: any) =>
                        setDescricao(event.target.value)
                      }
                      name="Descrição"
                      type="text"
                      title="Preencha com a descrição do Dispositivo"
                      maxLength={256}
                    />
                  </Form.Group>
                  <Form.Group as={Col} sm={6}>
                    <Form.Label className="requiredField">
                      GRUPO DE VEICULOS<b style={{ marginLeft: 0, fontSize: 18, color: "#f00"}}>*</b>
                    </Form.Label>
                    <div style={{ display: 'flex' }}>
                      <MultiSelect
                        required={true}
                        style={{
                          width: "90%",
                          borderColor:
                            grupo_de_veiculos.length <= 0 && validated
                              ? "#dc3545"
                              : "",
                        }}
                        display="chip"
                        optionLabel="name"
                        value={grupo_de_veiculos}
                        options={select}
                        onChange={(e: any) =>
                          setGrupo_de_veiculos(e.target.value)
                        }
                        filter
                      />
                      <ModalCadastro />
                    </div>
                    <div style={{ display: 'flex' }}>
                      <Select
                        textInputTitle="TIPO DE DISPOSITIVO"
                        required={true}
                        style={{
                          width: "100%",
                          borderColor:
                            tipo_de_dispositivo === undefined && validated
                              ? "#dc3545"
                              : "",
                        }}
                        value={tipo_de_dispositivo}
                        onChange={(event: any) =>
                          setTipo_de_dispositivo(event.target.value)
                        }
                      >
                        {tiposDeDispositivos.map((tipo, index) => (
                          <option value={tipo.id}>{tipo.nome}</option>
                        ))}
                      </Select>
                      <div   style={{marginTop:"7%"}} > 
                      <ModalCadastroTipoDeDispositivo />
                      </div>
                    </div>
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

export default AtualizarDispositivos;
