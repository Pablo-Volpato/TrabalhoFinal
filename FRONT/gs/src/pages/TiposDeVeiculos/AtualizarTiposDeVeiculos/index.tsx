import { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { VeiculosTypesGryd } from "../../../Types/veiculosTypesGryd";
import { Spinner } from "react-bootstrap";
import { Checkbox } from "../../../components/Checkbox";
import Header from "../../../components/Header";
import Navegacao from "../../../components/Navegacao";
import ButtonsForm from "../../../components/ButtonsForm/ButtonsForm";
import Select from "../../../components/Select";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import axios from "../../../config/axiosMaquina";
import ModalCadastro from '../../GrupodeVeiculos/Modal/Modal';


const AtualizarTiposDeVeiculos = () => {
  const [nome, setNome] = useState("");
  const [ativo, setAtivo] = useState(false);
  const [grupo_de_veiculo, setGrupo_de_veiculo] = useState<any>([]);
  const [grupoDeVeiculo, setGrupoDeVeiculo] = useState<VeiculosTypesGryd[]>([]);
  const [isDialogVisibleCadNaoEfetuado, setIsDialogVisibleCadNaoEfetuado] =
    useState(false);
  const [isDialogVisibleCadEfetuado, setIsDialogVisibleCadEfetuado] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [validated, setValidated] = useState(false);

  const history = useHistory();
  const { id }: any = useParams();
  const usuarioId = 2;

  const cadastrarTiposDeVeiculos = async (event: any) => {
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
      ativo: ativo,
      grupoVeiculosId: grupo_de_veiculo,
    };
    try {
      await axios.put(`/tiposDeVeiculos/${id}?idUsuario${usuarioId}`, dados);
      setIsDialogVisibleCadEfetuado(true);
    } catch (error) {
      alert("Error ao atualizar");
    }
  };

  const obterTiposDeVeiculosPorId = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/tiposDeVeiculos/${id}??idUsuario${usuarioId}`
      );
      console.log(data);
      setNome(data.nome);
      setGrupo_de_veiculo(data.grupoDeVeiculos.nome);
      setAtivo(data.ativo);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const obterGrupoDeVeiculo = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/grupoVeiculos?idUsuario${usuarioId}`);
      setGrupoDeVeiculo(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    obterTiposDeVeiculosPorId();
  }, [id]);
  useEffect(() => {
    obterGrupoDeVeiculo();
  }, []);

  const deletarTipoDeVeiculo = async () => {
    try {
      setLoading(true);
      await axios.delete(`/tiposDeVeiculos/${id}`);
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
                <h2 className="titulo">Tipos de Veículos</h2>
                <h6 className="subtitulo">
                  {"Cadastro > Tipos de Veículos > Atualizar"}
                </h6>
              </div>
              <DeleteModal registro={nome} onPress={deletarTipoDeVeiculo}>
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
              header="Tipo de Veículo foi atualizada com sucesso!"
              footer={
                <>
                  <Button
                    label="OK"
                    onClick={() => history.push("/tipo-de-veiculo/1")}
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
                onSubmit={cadastrarTiposDeVeiculos}
              >
                <Form.Row>
                  <Form.Group as={Col} sm={6}>
                    <Form.Label className="requiredField">NOME<b style={{ marginLeft: 0, fontSize: 18, color: "#f00"}}>*</b></Form.Label>
                    <Form.Control
                      value={nome}
                      onChange={(event: any) => setNome(event.target.value)}
                      name="nome"
                      placeholder="Nome"
                      type="text"
                      required
                      title="Preencha com o nome do Tipo de Veículo"
                      maxLength={256}
                    />
                  </Form.Group>
                </Form.Row>
                <div>
                  {hasError && (
                    <small style={{ color: "red" }}>
                      {" "}
                      O nome é um campo obrigatorio!!
                    </small>
                  )}
                </div>
                <Form.Row>
                  <Form.Group as={Col} sm={6} style={{ display: 'inline-block'}}>
                    <Select
                      style={{
                        borderColor:
                          grupo_de_veiculo === undefined && validated
                            ? "#dc3545"
                            : "",
                      }}
                      textInputTitle="GRUPO DE VEÍCULO"
                      required={true}
                      value={grupo_de_veiculo}
                      onChange={(event: any) =>
                        setGrupo_de_veiculo(event.target.value)
                      }
                    >
                      {grupoDeVeiculo.map((tipo, index) => (
                        <option value={tipo.id}>{tipo.nome}</option>
                      ))}
                    </Select>
                  </Form.Group>
                  <div style={{marginTop:'3%'}}> 
                    <ModalCadastro />
                  </div>
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

export default AtualizarTiposDeVeiculos;
