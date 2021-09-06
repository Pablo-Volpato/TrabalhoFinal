import React, { useEffect, useState } from "react";
import fs from 'fs';
import { Form, Col, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { Content } from "./styles";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { TipoDeComunicacaoTypes } from "../../../Types/tipoDeComunicacaoTypes";
import { Spinner } from "react-bootstrap";
import { MultiSelect } from "primereact/multiselect";
import { FileProvider, useFiles } from "../../../context/file";
import { Checkbox } from "../../../components/Checkbox";
import axios from "../../../config/axiosMaquina";
import ButtonsForm from "../../../components/ButtonsForm/ButtonsForm";
import FileList from "../../../components/FileList";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import Upload from "../../../components/Upload";
import Navegacao from "../../../components/Navegacao";
import Header from "../../../components/Header";
import ModalCadastro from "../../TiposdeComunicacao/Modal/Modal";

export interface IFile {
  id: string;
  name: string;
  readableSize: string;
  uploaded?: boolean;
  preview: string;
  file: File | null;
  progress?: number;
  error?: boolean;
  url: string;
  }

interface IFileArray {
  teste: IFile[];
}
  

const AtualizarTecnologia = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState();
  const [imagemLogo, setImagemLogo] = useState("");
  const [tipo_de_comunicacao, setTipo_de_comunicacao] = useState<any>([]);
  const [tipoDeComunicacoes, setTipoDeComunicacoes] = useState<
    TipoDeComunicacaoTypes[]
  >([]);
  const [ativo, setAtivo] = useState(false);
  const [isDialogVisibleCadEfetuado, setIsDialogVisibleCadEfetuado] =
    useState(false);
  const [isDialogVisibleCadNaoEfetuado, setIsDialogVisibleCadNaoEfetuado] =
    useState(false);
  const [ oi, setFile ] = useState<IFileArray | any >();
  const [wasCadastred, setWasCadastred] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [validated, setValidated] = useState(false);

  const history = useHistory();
  const usuarioId = 2;
  const { id }: any = useParams();

  const atualizarTecnologiaDeRatreamento = async (event: any) => {
    try {
      const novoNome = nome.trim();
      setValidated(true);
      if (novoNome.length <= 0) {
        setNome(novoNome);
        setHasError(true);
        return;
      }
      setLoading(true);
      const dados = {
        idUsuario: usuarioId,
        nome: nome,
        descricao: descricao,
        imagem: imagemLogo,
        ativo: ativo,
        tipo_de_comunicacao: tipo_de_comunicacao.map((tipo: any) => tipo.code),
      };
      setWasCadastred(true);
      await axios.put(`/tecnologia/${id}?idUsuario${usuarioId}`, dados);

      setIsDialogVisibleCadEfetuado(true);
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true);
    } finally {
      setLoading(false);
    }
  };

  const obterTecnologiaPorId = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/tecnologia/${id}?idUsuario${usuarioId}`
      );
      const tipoComunicao = data.tiposDeComunicacao.map((comunicacao: any) => ({
        name: comunicacao.nome,
        code: comunicacao.id,
      }))
      const file = new File(['teste1'], data.imagem, {
        type: "image/png",
      });
      setFile([file])
      setNome(data.nome);
      setDescricao(data.descricao);
      setTipo_de_comunicacao(tipoComunicao);
      setImagemLogo(data.imagem);
      setAtivo(data.ativo);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const obterTiposDeComunicacao = async () => {
    try {
      const response = await axios.get(
        `/tipoDeComunicacao?idUsuario${usuarioId}`
      );
      setTipoDeComunicacoes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obterTecnologiaPorId();
  }, [id]);

  useEffect(() => {
    obterTiposDeComunicacao();
  }, []);

  const deletarTecnologia = async () => {
    try {
      setLoading(true);
      await axios.delete(`/tecnologia/${id}`);
      history.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const select = tipoDeComunicacoes.map((tipo) => ({
    name: tipo.nome,
    code: tipo.id,
  }));

  return (
    <Row>
      <Navegacao />
      <Col>
        <Header />
        <div style={{ display: "flex", justifyContent: "row" }}>
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="titulo-container">
                <h2 className="titulo">Tecnologia de Rastreamento</h2>
                <h6 className="subtitulo">
                  {"Cadastro > Tecnologia de Rastreamento > Atualizar"}
                </h6>
              </div>
              <DeleteModal registro={nome} onPress={deletarTecnologia}>
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
              header="Tecnologia de Rastreamento foi atualizada com sucesso!"
              footer={
                <>
                  <Button
                    label="OK"
                    onClick={() => history.push("/tecnologia/1")}
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
                onSubmit={atualizarTecnologiaDeRatreamento}
              >
                <Form.Row>
                  <Form.Group as={Col} sm={6}>
                    <Form.Label className="requiredField">NOME<b style={{ marginLeft: 0, fontSize: 18, color: "#f00" }}>*</b></Form.Label>
                    <Form.Control
                      value={nome}
                      onChange={(event: any) => setNome(event.target.value)}
                      name="nome"
                      type="text"
                      required
                      title="Preencha com o nome de Tecnologia de Ratreamento "
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
                    <Form.Label>DESCRIÇÃO</Form.Label>
                    <Form.Control
                      value={descricao}
                      onChange={(event: any) =>
                        setDescricao(event.target.value)
                      }
                      name="Descrição"
                      type="text"
                      title="Preencha com a descrição da Tecnologia de Rastreamento"
                      maxLength={256}
                    />
                  </Form.Group>
                  <Form.Group as={Col} sm={6}>
                    <Form.Label className="requiredField">
                      TIPO COMUNICAÇÃO<b style={{ marginLeft: 0, fontSize: 18, color: "#f00" }}>*</b>
                    </Form.Label>
                    <div style={{ display: "flex" }}>
                      <MultiSelect
                        required={true}
                        style={{ width: "85%" }}
                        display="chip"
                        optionLabel="name"
                        value={tipo_de_comunicacao}
                        options={select}
                        onChange={(e: any) =>
                          setTipo_de_comunicacao(e.target.value)
                        }
                        filter
                      />
                      <ModalCadastro />
                    </div>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Content>
                    <FileProvider
                      done={wasCadastred}
                      foto={imagemLogo}
                      setFoto={setImagemLogo}
                    >
                      <Upload teste={oi} />
                      <FileList />
                    </FileProvider>
                  </Content>
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

export default AtualizarTecnologia;
