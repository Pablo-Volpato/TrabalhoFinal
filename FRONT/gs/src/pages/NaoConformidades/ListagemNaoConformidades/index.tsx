import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Col, Row, Spinner } from 'react-bootstrap';
import { NaoConformidadesTypesGryd } from '../../../Types/naoConformidade';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Pagination from '../../../components/Pagination/Pagination';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import Navegacao from '../../../components/Navegacao';
import axios from '../../../config/axiosMaquina';
import Header from '../../../components/Header';
import './styles.css';

const ListagemNaoConformidades = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<NaoConformidadesTypesGryd[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogVisibleDelet, setIsDialogVisibleDelet] = useState(false);
  const [itensPerPage, setItensPerPage] = useState('10');
  const [totalPosts, setTotalPosts] = useState(0);


  const history = useHistory();
  const usuarioId = 2;

  const { page }: any = useParams();

  const paginate = (pageNumber: number) => {
    history.push(`/nao-conformidade/${pageNumber}`);
  };


  function editar(id: any) {
    history.push(`/atualizar-nao-conformidade/${id}`);
  }

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true);

        const response = await axios.get(`/naoConformidade/listaDadosGrid`, {
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
      const response = await axios.get(`/naoConformidade/listaDadosGrid/count?idUsuario${usuarioId}`);
      setTotalPosts(response.data);
    } catch (error) {
      console.log(error)
    }

  };

  useEffect(() => {
    fetchQtdPosts();
  }, []);

  const loadNaoConf = async () => {
    try {
      const response = await axios.get(`/naoConformidade/listaDadosGrid`, {
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
          const response = await axios.get(`/naoConformidade/search`, {
            params: {
              idUsuario: usuarioId,
              keyword: searchTerm,
            },
          });
          setSearchResults(response.data);
        }
        if (searchTerm === '') {
          loadNaoConf();
        }
      };
      search();
    } catch (error) {
      console.log(error);
    }

  }, [searchTerm]);


  const deletarNaoConf = async (id: any) => {
    try {
      setLoading(true)
      await axios.delete(`/naoConformidade/${id}`)
      setIsDialogVisibleDelet(true);
      loadNaoConf();
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
            <h2 className="titulo">Não Conformidades</h2>
            <h6 className="subtitulo">{'Cadastro > Não Conformidades'}</h6>
          </div>
          <div className="search-create mb-4">
            <Link to="/cadastro-nao-conformidade" className="btn-create">
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
                      <th>Natureza do Evento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((naoConformidades, index) => (
                      <tr key={index}>
                        <td style={{ width: '40px' }}>
                          <DeleteModal registro={naoConformidades.naturezaDoEvento} onPress={() => deletarNaoConf(naoConformidades.id)}>
                            <i className="pi pi-trash"
                              title="Deletar não coformidades"
                              style={{ fontSize: '1em', color: '#000', textDecoration: 'none' }}
                            >  </i>
                          </DeleteModal>
                        </td>
                        <td style={{ width: '90px' }}>
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
                              onClick={() => editar(naoConformidades.id)}
                              className="pi pi-pencil"
                              title="Editar não conformidades"
                            ></i>
                          </button>
                        </td>
                        <td style={{ width: '90px' }}>{naoConformidades.id}</td>
                        <td>{naoConformidades.naturezaDoEvento}</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <Dialog
                header="Grupo de veículos deletado com sucesso !"
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

export default ListagemNaoConformidades;