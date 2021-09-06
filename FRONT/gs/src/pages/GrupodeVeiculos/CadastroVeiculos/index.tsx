/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { GrupoMacroTypesGryd } from '../../../Types/grupoMacroTypesGryd ';
import { MultiSelect } from 'primereact/multiselect';
import { Spinner } from 'react-bootstrap';
import { Form, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Select from '../../../components/Select';
import Navegacao from '../../../components/Navegacao';
import ButtonsForm from '../../../components/ButtonsForm/ButtonsForm';
import axios from '../../../config/axiosMaquina';
import Header from '../../../components/Header';
import { DispositivosTypesGryd } from '../../../Types/dispositivosTypesGryd';
import { Checkbox } from '../../../components/Checkbox';
import ModalCadastroGrupo from '../../GrupoMacro/Modal/Modal';

function CadastroVeiculos() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState();
  const [ativo, setAtivo] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [validated, setValidated] = useState(false);
  const [grupo_macro_de_veiculos, setGrupo_macro_de_veiculos] = useState<any>();
  const [grupoMacrodeVeiculos, setGrupoMacrodeVeiculos] = useState<GrupoMacroTypesGryd[]>([]);
  const [isDialogVisibleCadNaoEfetuado, setIsDialogVisibleCadNaoEfetuado] = useState(false);
  const [isDialogVisibleCadEfetuado, setIsDialogVisibleCadEfetuado] = useState(false);
  const [dispositivos, setDispositivos] = useState<DispositivosTypesGryd[]>([]);
  const [dispositivosID, setDispositivosID] = useState<any>([]);
  const [loading, setLoading] = useState(false);


  const history = useHistory();
  const usuarioId = 2;

  useEffect(() => {
    obterGrupoMacrodeVeiculos();
    obterDispositivos();
  }, []);

  const select = dispositivos.map((tipo, index) => ({ name: tipo.nome, code: tipo.id }));

  const cadastrarGrupodeVeiculos = async (event: any) => {
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
      grupoMacroId: grupo_macro_de_veiculos,
      "dispositivoId": dispositivosID.map((tipo: any) => tipo.code)
    }
    try {
      setLoading(true)
      await axios.post(`/grupoVeiculos?idUsuario${usuarioId}`, dados)
      setIsDialogVisibleCadEfetuado(true);
      setLoading(false)

    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true);
    }
  }

  const obterGrupoMacrodeVeiculos = async () => {
    try {
      const response = await axios.get(`/grupoMacroDeVeiculos/listaDadosGrid?idUsuario${usuarioId}`);
      setGrupoMacrodeVeiculos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const obterDispositivos = async () => {
    try {
      const { data } = await axios.get(`/dispositivo?idUsuari=${usuarioId}`);
      setDispositivos(data);
    } catch (error) {
      console.log(error);
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
              <h2 className="titulo">Grupo de veículos</h2>
              <h6 className="subtitulo">{'Cadastro > Grupo de Veículos > Cadastro'}</h6>
            </div>
            <Dialog
              header="Grupo de veículos foi cadastrado com sucesso!"
              footer={
                <>
                  <Button label="OK" onClick={() => history.push('/grupo-de-veiculos/1')} />
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
              <Form noValidate validated={validated} onSubmit={cadastrarGrupodeVeiculos}>
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
                      title="Preencha com o nome do grupo de veículos "
                      maxLength={256}
                    />
                    <div>
                      {hasError && <small style={{ color: 'red' }}> O nome é um campo obrigatorio!!</small>}
                    </div>

                    <Form.Label style={{ marginTop:"1.8%" }} className="requiredField">DESCRIÇÃO</Form.Label>
                    <Form.Control
                      value={descricao}
                      onChange={(event: any) => setDescricao((event.target.value))}
                      name="Descrição"
                      type="text"
                      title="Preencha com a descrição do Grupo de Veículos"
                      maxLength={256}
                    />
                  </Form.Group>
                  <Form.Group as={Col} sm={6}>

                    <Form.Label className="requiredField">DISPOSITIVO<b style={{ marginLeft: 0, fontSize: 18, color: "#f00"}}>*</b></Form.Label>
                    <div>
                      <MultiSelect
                        style={{ width: "100%", borderColor: dispositivosID.length <= 0 && validated ? '#dc3545' : '' }}
                        emptyFilterMessage={<Button></Button>}
                        display="chip"
                        optionLabel="name"
                        value={dispositivosID}
                        options={select} onChange={(e: any) => setDispositivosID(e.target.value)} filter />
                    </div>
                    <div style={{ display: 'flex' }}>
                      <Select
                        style={{ borderColor: grupo_macro_de_veiculos === undefined && validated ? '#dc3545' : '' }}
                        required={true}
                        value={grupo_macro_de_veiculos}
                        textInputTitle="GRUPO MACRO DE VEÍCULOS"
                        onChange={(e: any) => setGrupo_macro_de_veiculos(e.target.value)}>
                        <option value="0">Selecione o grupo macro</option>
                        {grupoMacrodeVeiculos.map((tipo, index) => (<option value={tipo.id}>{tipo.nome}</option>))}
                      </Select>
                      <div style={{ marginTop:"7%" }}>
                      <ModalCadastroGrupo />
                      </div>
                    </div>
                  </Form.Group>
                  <Checkbox ativo={ativo} checked={() => setAtivo(!ativo)} />

                </Form.Row>
                <ButtonsForm />
              </Form>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default CadastroVeiculos;