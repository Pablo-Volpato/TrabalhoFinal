import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { AnalistaDePerfilTypesGryd } from '../../../Types/analistaDePerfilTypesGryd';
import { Col, Row, Spinner } from 'react-bootstrap';
import axios from '../../../config/axiosMaquina';
import Pagination from '../../../components/Pagination/Pagination';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import Navegacao from '../../../components/Navegacao';
import Header from '../../../components/Header';
import './styles.css';

const ListagemAnalistaDePerfil = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<AnalistaDePerfilTypesGryd[]>([]);
  const [analistaDePerfilRecuperado, setanalistaDePerfilRecuperado] = useState<any>();
  const [analistaDePerfil, setAnalistaDePerfil] = useState<AnalistaDePerfilTypesGryd[]>([]);
  const [isDialogVisibleCadEfetuado, setIsDialogVisibleCadEfetuado] = useState(false);
  const [isDialogVisibleDelet, setIsDialogVisibleDelet] = useState(false);
  const [isDialogVisibleCadNaoEfetuado, setIsDialogVisibleCadNaoEfetuado] = useState(false);
  const [isDialogVisibleRecuperarAnalista, setIsDialogVisibleRecuperarAnalista] = useState(false);
  const [isDialogVisibleAnalistaExistente, setIsDialogVisibleAnalistaExistente] = useState(false);
  const [isDialogVisibleUpdateEfetuado, setIsDialogVisibleUpdateEfetuado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState<string>('');
  const [edicaoIndex, setEdicaoIndex] = useState<number>();
  const [edicaoNome, setEdicaoNome] = useState<string>('');
  const [edicaoID, setEdicaoID] = useState<string | number>(0);
  const [itensPerPage, setItensPerPage] = useState('10');
  const [totalPosts, setTotalPosts] = useState(0);
  const [validated, setValidated] = useState(false);
  const [hasError, setHasError] = useState(false);


  const history = useHistory();
  const usuarioId = 2;

  const { page }: any = useParams();

  const paginate = (pageNumber: number) => {
    history.push(`/analista-de-perfil/${pageNumber}`);
  };

  const habitarEdicao = (analista: AnalistaDePerfilTypesGryd, index: number) => {
    setEdicaoNome(analista.nome);
    setEdicaoID(analista.id);
    setEdicaoIndex(index);
  }

  const salvarAlteraçoes = (event: any) => {
    if (event.key === 'Enter') {
      atualizarAnalistaDePerfil();
    }
  }

  const validarAnalistaDePerfil = () => {
    return analistaDePerfil.filter(
      (analista: AnalistaDePerfilTypesGryd) => analista.nome === edicaoNome || analista.nome === nome);
  }

  const recuperarAnalistaDePerfilInativo = async () => {
    try {
      analistaDePerfilRecuperado.ativo = true;
      await axios.put(`/analista_de_perfil/${analistaDePerfilRecuperado.id}?idUsuario${usuarioId}`, analistaDePerfilRecuperado);
      setIsDialogVisibleUpdateEfetuado(true);
      loadAnalistaDePerfil();
      fetchQtdPosts();
      setEdicaoIndex(-1);
      setNome('');
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true)
    }
  }

  const cadastrarAnalistaDePerfil = async (event: any) => {
    try {
      event.preventDefault();

      const novoNome = nome.trim();
      setValidated(true);
      console.log(nome)
      if (novoNome.length <= 0) {
        setNome(novoNome);
        setHasError(true)
        return;
      }
      const analistaEncontrado = validarAnalistaDePerfil();
      if (analistaEncontrado.length <= 0) {
        const dados = {
          'idUsuario': usuarioId,
          'nome': nome,
          'ativo': true
        }
        await axios.post(`/analista_de_perfil?idUsuario${usuarioId}`, dados);
        setIsDialogVisibleCadEfetuado(true);
        loadAnalistaDePerfil();
        fetchQtdPosts();
        setNome('');

        return
      }
      if (analistaEncontrado[0].ativo === false) {
        setIsDialogVisibleRecuperarAnalista(true);
        setanalistaDePerfilRecuperado(analistaEncontrado[0]);
      } else {
        setIsDialogVisibleAnalistaExistente(true);
      }
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true)
    }
  }

  const atualizarAnalistaDePerfil = async () => {
    try {

      const novoNome = edicaoNome.trim();
      if (novoNome.length <= 0) {
        setEdicaoNome(novoNome);
        return;
      }

      const analistaEncontrado = validarAnalistaDePerfil();

      if (analistaEncontrado.length <= 0) {
        const dados = {
          idUsuario: usuarioId,
          nome: edicaoNome,
          ativo: true
        }

        await axios.put(`/analista_de_perfil/${edicaoID}?idUsuario${usuarioId}`, dados);
        setIsDialogVisibleUpdateEfetuado(true);
        fetchQtdPosts();
        loadAnalistaDePerfil();
        setEdicaoIndex(-1);
        return
      }

      if (analistaEncontrado[0].ativo === false) {
        setIsDialogVisibleRecuperarAnalista(true);
        setanalistaDePerfilRecuperado(analistaEncontrado[0]);
      } else {
        setIsDialogVisibleAnalistaExistente(true);
      }
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true)
    }
  }

  const obterTodosAnalistaDePerfil = async () => {
    try {
      ;
      const { data } = await axios.get(`/analista_de_perfil?idUsuario=${usuarioId}`);
      setAnalistaDePerfil(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true);
        const response = await axios.get(`/analista_de_perfil/listaDadosGrid`, {
          params: {
            idUsuario: usuarioId,
            qtdRegistros: itensPerPage,
            pagina: page - 1,
          },
        });
        console.log(response.data);
        setSearchResults(response.data);
        setLoading(false);
      };
      obterTodosAnalistaDePerfil();
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [itensPerPage, page]);

  const fetchQtdPosts = async () => {
    try {
      const response = await axios.get(`/analista_de_perfil/listaDadosGrid/count?idUsuario${usuarioId}`);
      setTotalPosts(response.data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchQtdPosts();
  }, []);

  const loadAnalistaDePerfil = async () => {
    try {
      const response = await axios.get(`/analista_de_perfil/listaDadosGrid`, {
        params: {
          idUsuario: usuarioId,
          qtdRegistros: itensPerPage,
          pagina: page - 1,
        },
      });
      setSearchResults(response.data);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    try {
      const search = async () => {
        if (searchTerm !== '') {
          const response = await axios.get(`/analista_de_perfil/search`, {
            params: {
              idUsuario: usuarioId,
              keyword: searchTerm,
            },
          });
          setSearchResults(response.data);
        }
        if (searchTerm === '') {
          loadAnalistaDePerfil();
        }
      };
      search();
    } catch (error) {
      console.log(error);
    }
  }, [searchTerm]);

  const deletarAnalistaDePerfil = async (id: any) => {
    try {
      setLoading(true)
      await axios.delete(`/analista_de_perfil/${id}`)
      setIsDialogVisibleDelet(true);
      fetchQtdPosts();
      loadAnalistaDePerfil();
      obterTodosAnalistaDePerfil();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }

  }

  return (
    <Row>
      <Navegacao />
      <Col >
        <Header />
        <div className="card">
          <div className="titulo-container">
            <h2 className="titulo">Analistas de Perfil</h2>
            <h6 className="subtitulo">{'Cadastro > Analistas de Perfil'}</h6>
          </div>
          <label style={{ marginLeft: 6, fontSize: 14}} >ANALISTA DE PERFIL<b style={{ marginLeft: 0, fontSize: 18, color: "#f00"}}>*</b> </label>
          <div style={{ marginTop:0}}>
              {hasError && <small style={{ color: 'red', fontSize: 10 }}>O nome é um campo obrigatorio!!</small>}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Row style={{ marginLeft: 2 }} >
              <input
                className="p-inputtext p-component"
                value={nome}
                style={{ borderColor:validated && nome ==='' || nome === undefined ? '#dc3545' : '' }}
                onChange={e => setNome(e.target.value)} />
              <div className="btn-create" onClick={cadastrarAnalistaDePerfil} style={{cursor: "pointer", marginLeft: 10 }}>
                <i
                  style={{ fontSize: '1em', color: '#000', textDecoration: 'none' }}
                  className="pi pi-plus"
                ></i>
              </div>
            </Row>
            <span className="p-input-icon-left  search-create mb-4">
              <input
                type="text"
                placeholder="Pesquise"
                className="p-inputtext p-component"
                id="search-input"
                style={{ width: '240px' }}
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
              />
              <i className="pi pi-search"></i>
            </span>
          </div>
   
          <Dialog
            header="Este Analista foi excluído anteriormente. Tem certeza que deseja reativar o cadastro dele?"
            footer={
              <>
                <Button label="Não" onClick={() => setIsDialogVisibleRecuperarAnalista(false)} />
                <Button
                  label="Sim"
                  onClick={() => {
                    setIsDialogVisibleRecuperarAnalista(false);
                    recuperarAnalistaDePerfilInativo();
                  }}
                />
              </>
            }
            visible={isDialogVisibleRecuperarAnalista}
            style={{ width: '50vw' }}
            modal
            onHide={() => setIsDialogVisibleRecuperarAnalista(false)}
          />
          <Dialog
            header={`Analista de Perfil foi cadastrado com sucesso!`}
            footer={
              <>
                <Button label="OK" onClick={() => setIsDialogVisibleCadEfetuado(false)} />
              </>
            }
            visible={isDialogVisibleCadEfetuado}
            style={{ width: '50vw' }}
            modal
            onHide={() => setIsDialogVisibleCadEfetuado(false)}
          />
          <Dialog
            header={`Analista de Perfil foi atualizado com sucesso!`}
            footer={
              <>
                <Button label="OK" onClick={() => setIsDialogVisibleUpdateEfetuado(false)} />
              </>
            }
            visible={isDialogVisibleUpdateEfetuado}
            style={{ width: '50vw' }}
            modal
            onHide={() => setIsDialogVisibleUpdateEfetuado(false)}
          />
          <Dialog
            header="Analista de Perfil já cadastrado!"
            footer={
              <>
                <Button label="OK" onClick={() => setIsDialogVisibleAnalistaExistente(false)} />
              </>
            }
            visible={isDialogVisibleAnalistaExistente}
            style={{ width: '50vw' }}
            modal
            onHide={() => setIsDialogVisibleAnalistaExistente(false)}
          />
          <Dialog
            header="Analista de Perfil deletado com sucesso"
            footer={
              <>
                <Button label="OK" onClick={() => setIsDialogVisibleDelet(false)} />
              </>
            }
            visible={isDialogVisibleDelet}
            style={{ width: '50vw' }}
            modal
            onHide={() => setIsDialogVisibleDelet(false)}
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
          <div className="painel" >
            <div className="table-responsive">
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
                <table className="table" >
                  <thead className="thead" >
                    <tr>
                      <th></th>
                      <th></th>
                      <th>ID</th>
                      <th>Nome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((analistaDePerfil, index) => (
                      <tr key={index}>
                        <td style={{ width: '40px' }}>
                          <button
                            style={{
                              backgroundColor: 'transparent',
                              borderColor: 'transparent',
                              width: 20,
                              height: 20,
                              padding: 0,
                              marginRight: 15,
                              marginBottom: 2,
                            }}>
                            <i
                              onClick={() => habitarEdicao(analistaDePerfil, index)}
                              className="pi pi-pencil"
                              title="Editar Analistas de Perfil "
                            ></i>
                          </button>
                        </td>
                        <td style={{ width: '90px' }}>
                          <DeleteModal registro={analistaDePerfil.nome} onPress={() => deletarAnalistaDePerfil(analistaDePerfil.id)}>
                            <i className="pi pi-trash"
                              title="Deletar  Analistas de Perfil"
                              style={{ fontSize: '1em', color: '#000', textDecoration: 'none' }}
                            >  </i>
                          </DeleteModal>
                        </td>
                        <td style={{ width: '90px' }}>{analistaDePerfil.id}</td>
                        {edicaoIndex == index ?
                          <td>
                            <input value={edicaoNome}
                              onChange={e => setEdicaoNome(e.target.value)}
                              onKeyPress={e => salvarAlteraçoes(e)}
                            />
                          </td>
                          :
                          <td>{analistaDePerfil.nome}</td>
                        }
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <Pagination
                itensPerPage={itensPerPage}
                setItensPerPage={setItensPerPage}
                totalPosts={searchTerm ? searchResults.length : totalPosts}
                paginate={paginate}
                currentPage={page}
              />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ListagemAnalistaDePerfil;