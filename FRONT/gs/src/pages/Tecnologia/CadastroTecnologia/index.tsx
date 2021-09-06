/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import { Checkbox } from '../../../components/Checkbox';
import { Form, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Content } from './styles';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";
import { TipoDeComunicacaoTypes } from '../../../Types/tipoDeComunicacaoTypes';
import { FileProvider } from '../../../context/file';
import { MultiSelect } from 'primereact/multiselect';
import Navegacao from '../../../components/Navegacao';
import Header from '../../../components/Header';
import axios from '../../../config/axiosMaquina';
import ButtonsForm from '../../../components/ButtonsForm/ButtonsForm';
import Upload from '../../../components/Upload';
import FileList from '../../../components/FileList';
import ModalCadastro from '../../TiposdeComunicacao/Modal/Modal';


function CadastroTecnologia() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState();
  const [imagemLogo, setImagemLogo] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [tipo_de_comunicacao, setTipo_de_comunicaca] = useState<any>([]);
  const [tipoDeComunicacoes, setTipoDeComunicacoes] = useState<TipoDeComunicacaoTypes[]>([]);
  const [wasCadastred, setWasCadastred] = useState(false);
  const [isDialogVisibleCadEfetuado, setIsDialogVisibleCadEfetuado] = useState(false);
  const [isDialogVisibleCadNaoEfetuado, setIsDialogVisibleCadNaoEfetuado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [validated, setValidated] = useState(false);

  const history = useHistory();
  const usuarioId = 2;

  useEffect(() => {
    obterTiposDeComunicacao();
  }, []);


  const select = tipoDeComunicacoes.map((tipo, index) => ({ name: tipo.nome, code: tipo.id }));

  const cadastrarTecnologiaDeRatreamento = async (event: any) => {
    event.preventDefault();
    const novoNome = nome.trim();
    setValidated(true)
    if (novoNome.length <= 0) {
      setNome(novoNome);
      setHasError(true)
      return;
    }
    const dados = {
      idUsuario: usuarioId,
      nome: nome,
      descricao: descricao,
      imagem: imagemLogo,
      ativo: ativo,
      tipo_de_comunicacao: tipo_de_comunicacao.map((tipo: any) => tipo.code)
    }
    try {
      setLoading(true);
      await axios.post(`/tecnologia?idUsuario${usuarioId}`, dados)
      setIsDialogVisibleCadEfetuado(true)
      setWasCadastred(true)
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true);
    }finally{
      setLoading(false);
    }
  }

  const obterTiposDeComunicacao = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/tipoDeComunicacao?idUsuario${usuarioId}`);
      setTipoDeComunicacoes(response.data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <Row>
      <Navegacao />
      <Col >
        <Header />
 
        <div style={{ display: 'flex', justifyContent: 'row' }}>
          <div className="card">
            <div className="titulo-container">
              <h2 className="titulo">Tecnologia de Rastreamento</h2>
              <h6 className="subtitulo">{'Cadastro > Tecnologia de Rastreamento > Cadastro'}</h6>
            </div>
            <Dialog
              header="Tecnologia de Rastreamento foi cadastrado com sucesso!"
              footer={
                <>
                  <Button label="OK" onClick={() => history.push('/tecnologia/1')} />
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
              <Form noValidate validated={validated} onSubmit={cadastrarTecnologiaDeRatreamento}>
                <Form.Row>
                  <Form.Group as={Col} sm={6}>
                    <Form.Label className="requiredField">NOME<b style={{ marginLeft: 0, fontSize: 18, color: "#f00"}}>*</b>
                    </Form.Label>
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
                      {hasError && <small style={{ color: 'red' }}> O nome é um campo obrigatorio!!</small>}
                    </div>
                    <Form.Label >DESCRIÇÃO</Form.Label>
                    <Form.Control
                      value={descricao}
                      onChange={(event: any) => setDescricao((event.target.value))}
                      name="Descrição"
                      type="text"
                      title="Preencha com a descrição da Tecnologia de Rastreamento"
                      maxLength={256}
                    />
                  </Form.Group>
                  <Form.Group as={Col} sm={6}>
                    <Form.Label className="requiredField">TIPO COMUNICAÇÃO<b style={{ marginLeft: 0, fontSize: 18, color: "#f00"}}>*</b></Form.Label>
                    <div style={{ display: 'flex' }}>
                    <MultiSelect required={true} style={{ width: "85%" }}  display="chip" optionLabel="name" value={tipo_de_comunicacao}
                      options={select} onChange={(e: any) => setTipo_de_comunicaca(e.target.value)} filter />
                      <ModalCadastro/>
                     </div> 
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Content>
                    <FileProvider done={wasCadastred} foto={imagemLogo} setFoto={setImagemLogo}>
                      <Upload />
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
}

export default CadastroTecnologia;
