/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import { Form, Col, Row, FormCheck } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { Content, CustomSwitch } from './styles';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Spinner } from 'react-bootstrap';
import { FileProvider } from '../../../context/file';
import { MultiSelect } from 'primereact/multiselect';
import { VeiculosTypesGryd } from '../../../Types/veiculosTypesGryd';
import { TiposDeDispositivosTypesGryd } from '../../../Types/tiposDeDispositivosTypes';
import { Checkbox } from '../../../components/Checkbox';
import ButtonsForm from '../../../components/ButtonsForm/ButtonsForm';
import Upload from '../../../components/Upload';
import FileList from '../../../components/FileList';
import Header from '../../../components/Header';
import Navegacao from '../../../components/Navegacao';
import Select from '../../../components/Select';
import axios from '../../../config/axiosMaquina';
import ModalCadastro from '../../GrupodeVeiculos/Modal/Modal';
import ModalCadastroTipoDeDispositivo from '../../TiposDeDispositivos/Modal/Modal';


function CadastroDispositivos() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState();
  const [ativo, setAtivo] = useState(true);
  const [grupo_de_veiculos, setGrupo_de_veiculos] = useState<any>([]);
  const [GrupodeVeiculos, setGrupodeVeiculos] = useState<VeiculosTypesGryd[]>([]);
  const [tipo_de_dispositivo, setTipo_de_dispositivo] = useState<any>();
  const [tiposDeDispositivos, setTiposDeDispositivos] = useState<TiposDeDispositivosTypesGryd[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogVisibleCadEfetuado, setIsDialogVisibleCadEfetuado] = useState(false);
  const [isDialogVisibleCadNaoEfetuado, setIsDialogVisibleCadNaoEfetuado] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [validated, setValidated] = useState(false);

  const history = useHistory();
  const usuarioId = 2;

  useEffect(() => {
    obterGrupodeVeiculos();

  }, []);

  useEffect(() => {
    obterTiposDeDispositivos();

  }, []);

  const select = GrupodeVeiculos.map((tipo, index) => ({ name: tipo.nome, code: tipo.id }));

  const cadastrarDispositivos = async (event: any) => {
    event.preventDefault();
    setValidated(true)
    const novoNome = nome.trim();
    if (novoNome.length <= 0) {
      setNome(novoNome);
      setHasError(true)
      return;
    }
    const dados = {
      idUsuario: usuarioId,
      nome: nome,
      descricao: descricao,
      ativo: ativo,
      grupo_de_veiculos: grupo_de_veiculos.map((tipo: any) => tipo.code),
      tipoDispositivoId: tipo_de_dispositivo
    }
    console.log(dados);
    try {
      setLoading(true)
      await axios.post(`/dispositivo?idUsuario${usuarioId}`, dados)
      setIsDialogVisibleCadEfetuado(true)
    } catch (error) {
      alert("Error ao Cadastrar, verifique os campos");
    } finally{
      setLoading(false)
    }
  }

  const obterGrupodeVeiculos = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/grupoVeiculos?idUsuario${usuarioId}`);
      setGrupodeVeiculos(response.data);

    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  const obterTiposDeDispositivos = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/tiposDeDispositivos?idUsuario${usuarioId}`);
      setTiposDeDispositivos(response.data);

    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
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
              <h2 className="titulo">Dispositivos</h2>
              <h6 className="subtitulo">{'Cadastro > Dispositivos > Cadastro'}</h6>
            </div>
            <Dialog
              header="Dispositivo foi cadastrado com sucesso!"
              footer={
                <>
                  <Button label="OK" onClick={() => history.push('/dispositivos/1')} />
                </>
              }
              visible={isDialogVisibleCadEfetuado}
              style={{ width: '50vw' }}
              modal
              onHide={() => setIsDialogVisibleCadEfetuado(false)}
            />
            <Dialog
              header="Erro ao cadastrar, verifique se os campos!"
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
              <Form noValidate validated={validated} onSubmit={cadastrarDispositivos}>
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
                      title="Preencha com o nome do Dispositivo"
                      maxLength={256}
                    />
                    <div>
                      {hasError && <small style={{ color: 'red' }}> O nome é um campo obrigatorio!!</small>}
                    </div>
                    <Form.Label style={{ marginTop:12}} className="requiredField">DESCRIÇÃO</Form.Label>
                    <Form.Control
                      value={descricao}
                      onChange={(event: any) => setDescricao((event.target.value))}
                      name="Descrição"
                      type="text"
                      title="Preencha com a descrição do Dispositivo"
                      maxLength={256}
                    />
                  </Form.Group>
                  <Form.Group as={Col} sm={6}>
                    <Form.Label className="requiredField">GRUPO DE VEÍCULOS<b style={{ marginLeft: 0, fontSize: 18, color: "#f00"}}>*</b></Form.Label>
                    <div style={{ display: 'flex' }}>  
                    <MultiSelect required={true}  
                                     
                     style={{ width: "90%", borderColor: grupo_de_veiculos.length <= 0 && validated ? '#dc3545': '' }} 
                    display="chip" optionLabel="name" value={grupo_de_veiculos}
                      options={select} onChange={(e: any) => setGrupo_de_veiculos(e.target.value)} filter 
                      />
                      <ModalCadastro/>
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
}

export default CadastroDispositivos;
