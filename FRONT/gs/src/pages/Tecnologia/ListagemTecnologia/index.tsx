import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Col, Row, Spinner } from 'react-bootstrap';
import { TecnologiaTypesGryd } from '../../../Types/tecnologiaTypesGryd';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import Navegacao from '../../../components/Navegacao';
import Header from '../../../components/Header';
import axios from '../../../config/axiosMaquina';
import Pagination from '../../../components/Pagination/Pagination';
import './styles.css';

const ListagemTecnologia = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<TecnologiaTypesGryd[]>([]);
  const [isDialogVisibleErro, setIsDialogVisibleErro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDialogVisibleDelet, setIsDialogVisibleDelet] = useState(false);
  const [itensPerPage, setItensPerPage] = useState('10');
  const [totalPosts, setTotalPosts] = useState(0);


  const history = useHistory();
  const usuarioId = 2;

  const { page }: any = useParams();

  const paginate = (pageNumber: number) => {
    history.push(`/tecnologia/${pageNumber}`);
  };

  function editar(id: any) {
    history.push(`/atualizar-tecnologia/${id}`);
  }

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true);
        const response = await axios.get(`/tecnologia/listaDadosGrid`, {
          params: {
            idUsuario: usuarioId,
            qtdRegistros: itensPerPage,
            pagina: page - 1,
          },
        });
        setSearchResults(response.data);
      };
      fetchData();
    } catch (error) {
      setIsDialogVisibleErro(true)
    }finally{
      setLoading(false);
    }
  }, [itensPerPage, page]);

  const fetchQtdPosts = async () => {
    try {
      const response = await axios.get(`/tecnologia/listaDadosGrid/count?idUsuario${usuarioId}`);
      setTotalPosts(response.data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchQtdPosts();
  }, []);

  const loadTecnologia = async () => {
    try {
      const response = await axios.get(`/tecnologia/listaDadosGrid`, {
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
          const response = await axios.get(`/tecnologia/search`, {
            params: {
              idUsuario: usuarioId,
              keyword: searchTerm,
            },
          });
          setSearchResults(response.data);
        }
        if (searchTerm === '') {
          loadTecnologia();
        }
      };
      search();
    } catch (error) {
      console.log(error);
    }
  }, [searchTerm]);


  const deletarTecnologia = async (id: any) => {
    try {
      setLoading(true);
      await axios.delete(`/tecnologia/${id}`)
      setIsDialogVisibleDelet(true);
      loadTecnologia();
      fetchQtdPosts()
    } catch (error) {
      setIsDialogVisibleErro(true)
    }finally{
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
            <h2 className="titulo">Tecnologia de Rastreamento</h2>
            <h6 className="subtitulo">{'Cadastro > Tecnologia de Rastreamento'}</h6>
          </div>
          <div className="search-create mb-4">
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
              <Dialog
                header="Tecnologia deletado com sucesso!"
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
            <Link to="/cadastro-tecnologia" className="btn-create">
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
                    {searchResults.map((tecnologia, index) => (
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
                              onClick={() => editar(tecnologia.id)}
                              className="pi pi-pencil"
                              title="Editar Tecnologia"
                            ></i>
                          </button>
                        </td>
                        <td style={{ width: '90px' }}>
                          <DeleteModal registro={tecnologia.nome} onPress={() => deletarTecnologia(tecnologia.id)}>
                            <i className="pi pi-trash"
                              title="Deletar Tecnologia"
                              style={{ fontSize: '1em', color: '#000', textDecoration: 'none' }}
                            >  </i>
                          </DeleteModal>
                        </td>
                        <td style={{ width: '90px' }}>{tecnologia.id}</td>
                        <td>{tecnologia.nome}</td>
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

export default ListagemTecnologia;