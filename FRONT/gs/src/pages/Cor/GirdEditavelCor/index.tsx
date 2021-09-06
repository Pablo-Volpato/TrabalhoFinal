import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Col, Row, Spinner } from 'react-bootstrap';
import { CorTypesGryd } from '../../../Types/corTypesGryd';
import axios from '../../../config/axiosMaquina';
import Pagination from '../../../components/Pagination/Pagination';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import Navegacao from '../../../components/Navegacao';
import Header from '../../../components/Header';
import './styles.css';

const ListagemCor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<CorTypesGryd[]>([]);
  const [corRecuperada, setCorRecuperada] = useState<any>();
  const [objetoCor, setObjetoCor] = useState<CorTypesGryd[]>([]);
  const [isDialogVisibleCadEfetuado, setIsDialogVisibleCadEfetuado] = useState(false);
  const [isDialogVisibleDelet, setIsDialogVisibleDelet] = useState(false);
  const [isDialogVisibleCadNaoEfetuado, setIsDialogVisibleCadNaoEfetuado] = useState(false);
  const [isDialogVisibleRecuperarCor, setIsDialogVisibleCor] = useState(false);
  const [isDialogVisibleCorExistente, setIsDialogVisibleCorExistente] = useState(false);
  const [mensagem, setMensagem] = useState<boolean>(false)
  const [loading, setLoading] = useState(false);
  const [isDialogVisibleUpdateEfetuado, setIsDialogVisibleUpdateEfetuado] = useState(false);
  const [cor, setCor] = useState<string>('');
  const [edicaoIndex, setEdicaoIndex] = useState<number>();
  const [edicaoCor, setEdicaoCor] = useState<string>('');
  const [edicaoID, setEdicaoID] = useState<string | number>(0);
  const [itensPerPage, setItensPerPage] = useState('10');
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [hasErrorOBG, setHasErrorOBG] = useState(false);
  const [hasErrorEdit, setHasErrorEdit] = useState(false);
  const [validated, setValidated] = useState(false);


  const history = useHistory();
  const usuarioId = 2;

  const { page }: any = useParams();

  const paginate = (pageNumber: number) => {
    history.push(`/cor/${pageNumber}`);
  };

  const habitarEdicao = (cor: CorTypesGryd, index: number) => {
    setEdicaoCor(cor.cor);
    setEdicaoID(cor.id);
    setEdicaoIndex(index);
  }

  const salvarAlteraçoes = (event: any) => {
    if (event.key === 'Enter') {
      atualizarCor();
    }
  }
  const validarCaracterEspecialCadastro = (value: string) => {
    setHasErrorOBG(false)
    if (!/([\u0300-\u036f]|[^0-9a-zA-Z])/g.test(value)) {
      setHasError(false);
    }
    if (/([\u0300-\u036f]|[^0-9a-zA-Z])/g.test(value)) {
      setHasError(true);
    }
    setCor(value);
  }
  const validarCaracterEspecialEdicao = (value: string) => {

    if (!/([\u0300-\u036f]|[^0-9a-zA-Z])/g.test(value)) {
      setHasErrorEdit(false);
    }
    if (/([\u0300-\u036f]|[^0-9a-zA-Z])/g.test(value)) {
      setHasErrorEdit(true);
    }
    setEdicaoCor(value);
  }
  const validarCor = () => {
    return objetoCor.filter(
      (_cor: CorTypesGryd) => _cor.cor === edicaoCor || _cor.cor === cor);
  }

  const recuperarCor = async () => {
    try {
      corRecuperada.ativo = true;
      await axios.put(`/cor/${corRecuperada.id}?idUsuario${usuarioId}`, corRecuperada);
      setMensagem(false);
      setIsDialogVisibleUpdateEfetuado(true);
      loadCor();
      fetchQtdPosts();
      setEdicaoIndex(-1);
      setCor('');
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true)
    }
  }

  const cadastrarCor = async (event: any) => {
    try {
      event.preventDefault();
      setValidated(true)
      const novoNome = cor.trim();
      if (novoNome.length <= 0) {
        setCor(novoNome);
        setHasErrorOBG(true)
        return;
      }
    const corEncontrado = validarCor();
      console.log(corEncontrado)
      if (corEncontrado.length <= 0) {
        const dados = {
          'idUsuario': usuarioId,
          'cor': cor,
          'ativo': true
        }
        await axios.post(`/cor?idUsuario${usuarioId}`, dados);
        setMensagem(true);
        fetchQtdPosts();
        setIsDialogVisibleCadEfetuado(true);
        loadCor();
        setCor('');
        return
      }

      if (corEncontrado[0].ativo === false) {
        setIsDialogVisibleCor(true);
        setCorRecuperada(corEncontrado[0]);
      } else {
        setIsDialogVisibleCorExistente(true);
      }
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true)
    }
  }

  const atualizarCor = async () => {
    try {
      const novoNome = edicaoCor.trim();
      if (novoNome.length <= 0) {
        setEdicaoCor(novoNome);
        return;
      }
      const corEncontrado = validarCor();
      if (corEncontrado.length <= 0) {
        const dados = {
          idUsuario: usuarioId,
          cor: edicaoCor,
          ativo: true
        }
        await axios.put(`/cor/${edicaoID}?idUsuario${usuarioId}`, dados);
        setMensagem(false);
        setIsDialogVisibleUpdateEfetuado(true);
        loadCor();
        setEdicaoIndex(-1);
        return
      }

      if (corEncontrado[0].ativo === false) {
        setMensagem(false);
        setIsDialogVisibleCor(true);
        setCorRecuperada(corEncontrado[0]);
      } else {
        setIsDialogVisibleCorExistente(true);
      }
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true)
    }
  }

  const obterTodasCores = async () => {
    try {
      ;
      const { data } = await axios.get(`/cor?idUsuario=${usuarioId}`);
      setObjetoCor(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true);
        const response = await axios.get(`/cor/listaDadosGrid`, {
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
      obterTodasCores();
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [itensPerPage, page]);

  const fetchQtdPosts = async () => {
    try {
      const response = await axios.get(`/cor/listaDadosGrid/count?idUsuario${usuarioId}`);
      setTotalPosts(response.data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchQtdPosts();
  }, []);

  const loadCor = async () => {
    try {
      const response = await axios.get(`/cor/listaDadosGrid`, {
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
          const response = await axios.get(`/cor/search`, {
            params: {
              idUsuario: usuarioId,
              keyword: searchTerm,
            },
          });
          setSearchResults(response.data);
        }
        if (searchTerm === '') {
          loadCor();
        }
      };
      search();
    } catch (error) {
      console.log(error);
    }
  }, [searchTerm]);

  const deletarCor = async (id: any) => {
    try {
      setLoading(true)
      await axios.delete(`/cor/${id}`)
      setIsDialogVisibleDelet(true);
      loadCor();
      obterTodasCores();
      fetchQtdPosts()
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
            <h2 className="titulo">Cor</h2>
            <h6 className="subtitulo">{'Cadastro > Cor'}</h6>
          </div>
          <label style={{ marginLeft: 6, fontSize: 14}} >COR<b style={{ marginLeft: 0, fontSize: 18, color: "#f00"}}>*</b></label>
          {hasError && <small style={{ color: 'red', marginTop: 0, fontSize: 13 }}> Não permitido caracteres especiais!!</small>}
          {hasErrorOBG && <small style={{ color: 'red', marginTop: 0, fontSize: 13 }}>Campo obrigatorio!</small>}
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: 0, padding: 0 }}>
            <Row style={{ marginLeft: 2, display: "flex" }}>
              <input
                style={{ borderColor: validated && cor === '' || cor === undefined ? '#dc3545' : '' }}
                className="p-inputtext p-component"
                value={cor}
                onChange={e => validarCaracterEspecialCadastro(e.target.value)} />
              <div className="btn-create" onClick={cadastrarCor} style={{ cursor: "pointer", marginLeft: 10 }}>
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
            header="Esta Cor foi excluído anteriormente. Tem certeza que deseja reativar o cadastro dele?"
            footer={
              <>
                <Button label="Não" onClick={() => setIsDialogVisibleCor(false)} />
                <Button
                  label="Sim"
                  onClick={() => {
                    setIsDialogVisibleCor(false);
                    recuperarCor();
                  }}
                />
              </>
            }
            visible={isDialogVisibleRecuperarCor}
            style={{ width: '50vw' }}
            modal
            onHide={() => setIsDialogVisibleCor(false)}
          />
          <Dialog
            header={`Cor foi atualizada com sucesso!`}
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
            header={`Cor foi cadastrada com sucesso!`}
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
            header="Cor já cadastrado !"
            footer={
              <>
                <Button label="OK" onClick={() => setIsDialogVisibleCorExistente(false)} />
              </>
            }
            visible={isDialogVisibleCorExistente}
            style={{ width: '50vw' }}
            modal
            onHide={() => setIsDialogVisibleCorExistente(false)}
          />
          <Dialog
            header="Cor deletado com sucesso !"
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
                    {searchResults.map((corMap, index) => (
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
                              onClick={() => habitarEdicao(corMap, index)}
                              className="pi pi-pencil"
                              title="Editar Cor "
                            ></i>
                          </button>
                        </td>
                        <td style={{ width: '90px' }}>
                          <DeleteModal registro={corMap.cor} onPress={() => deletarCor(corMap.id)}>
                            <i className="pi pi-trash"
                              title="Deletar Cor"
                              style={{ fontSize: '1em', color: '#000', textDecoration: 'none' }}
                            >  </i>
                          </DeleteModal>
                        </td>
                        <td style={{ width: '90px' }}>{corMap.id}</td>
                        {edicaoIndex === index ?
                          <td>
                            <input value={edicaoCor}
                              onChange={e => validarCaracterEspecialEdicao(e.target.value)}
                              onKeyPress={e => salvarAlteraçoes(e)}
                            />
                            {hasErrorEdit && <small style={{ color: 'red', marginTop: 0, fontSize: 13 }}> Não permitido caracteres especiais!!</small>}
                          </td>
                          :
                          <td>{corMap.cor}</td>
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

export default ListagemCor;