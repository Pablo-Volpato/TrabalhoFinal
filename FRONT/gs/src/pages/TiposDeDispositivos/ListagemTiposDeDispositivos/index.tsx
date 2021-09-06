import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { TiposDeDispositivosTypesGryd } from '../../../Types/tiposDeDispositivosTypes';
import { Col, Row, Spinner } from 'react-bootstrap';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import Navegacao from '../../../components/Navegacao';
import Header from '../../../components/Header';
import axios from '../../../config/axiosMaquina';
import Pagination from '../../../components/Pagination/Pagination';


const ListagemTiposDeDispositivos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<TiposDeDispositivosTypesGryd[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogVisibleDelet, setIsDialogVisibleDelet] = useState(false);
  const [isDialogVisibleErro, setIsDialogVisibleErro] = useState(false);
  const [itensPerPage, setItensPerPage] = useState('10');
  const [totalPosts, setTotalPosts] = useState(0);


  const history = useHistory();
  const usuarioId = 2;

  const { page }: any = useParams();

  const paginate = (pageNumber: number) => {
    history.push(`/tipos-de-dispositivos/${pageNumber}`);
  };


  function editar(id: any) {
    history.push(`/atualizar-tipos-de-dispositivos/${id}`);
  }

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true);

        const response = await axios.get(`/tiposDeDispositivos/listaDadosGrid`, {
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
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [itensPerPage, page]);

  const fetchQtdPosts = async () => {
    try {
      const response = await axios.get(`/tiposDeDispositivos/listaDadosGrid/count?idUsuario${usuarioId}`);
      setTotalPosts(response.data);
    } catch (error) {
      console.log(error)
    }

  };

  useEffect(() => {
    fetchQtdPosts();
  }, []);

  const loadTiposDeDispositivos = async () => {
    try {
      const response = await axios.get(`/tiposDeDispositivos/listaDadosGrid`, {
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
          const response = await axios.get(`/tiposDeDispositivos/search`, {
            params: {
              idUsuario: usuarioId,
              keyword: searchTerm,
            },
          });
          setSearchResults(response.data);
        }
        if (searchTerm === '') {
          loadTiposDeDispositivos();
        }
      };
      search();
    } catch (error) {
      console.log(error);
    }

  }, [searchTerm]);


  const deletarTiposDeDispositivos = async (id: any) => {
    try {
      setLoading(true)
      await axios.delete(`/tiposDeDispositivos/${id}`)
      setIsDialogVisibleDelet(true);
      loadTiposDeDispositivos();
      fetchQtdPosts()
    } catch (error) {
      setIsDialogVisibleErro(true)
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
            <h2 className="titulo">Tipos de Dispositivos</h2>
            <h6 className="subtitulo">{'Cadastro > Tipos de Dispositivos'}</h6>
          </div>
          <div className="search-create mb-4">
            <Link to="/cadastro-tipos-de-dispositivos" className="btn-create">
              <i
                style={{ fontSize: '1em', color: '#000', textDecoration: 'none' }}
                className="pi pi-plus"
              ></i>
            </Link>
            <span className="p-input-icon-left">
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
                    {searchResults.map((tiposDeDispositivos, index) => (
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
                              onClick={() => editar(tiposDeDispositivos.id)}
                              className="pi pi-pencil"
                              title="Editar Tipos de Dispositivos"
                            ></i>
                          </button>
                        </td>
                        <td style={{ width: '90px' }}>
                          <DeleteModal registro={tiposDeDispositivos.nome} onPress={() => deletarTiposDeDispositivos(tiposDeDispositivos.id)}>
                            <i className="pi pi-trash"
                              title="Deletar  Tipos de Dispositivos"
                              style={{ fontSize: '1em', color: '#000', textDecoration: 'none' }}
                            >  </i>
                          </DeleteModal>
                        </td>
                        <td style={{ width: '90px' }}>{tiposDeDispositivos.id}</td>
                        <td>{tiposDeDispositivos.nome}</td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <Dialog
                header="Tipo de dispositivo deletado com sucesso!"
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
                header="Erro ao Deletar!"
                footer={
                  <>
                    <Button label="OK" onClick={() => setIsDialogVisibleErro(false)} />
                  </>
                }
                visible={isDialogVisibleErro}
                style={{ width: '50vw' }}
                modal
                onHide={() => setIsDialogVisibleErro(false)}
              />
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

export default ListagemTiposDeDispositivos;