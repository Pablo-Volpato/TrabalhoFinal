import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Col, Row, Spinner } from 'react-bootstrap';
import { TiposDeVeiculosTypesGryd } from '../../../Types/tiposDeVeiculosTypesGryd';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import Pagination from '../../../components/Pagination/Pagination';
import Navegacao from '../../../components/Navegacao';
import axios from '../../../config/axiosMaquina';
import Header from '../../../components/Header';

const ListagemTiposDeVeiculos = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<TiposDeVeiculosTypesGryd[]>([]);
    const [loading, setLoading] = useState(false);
    const [isDialogVisibleDelet, setIsDialogVisibleDelet] = useState(false);
  const [isDialogVisibleErro, setIsDialogVisibleErro] = useState(false);
    const [itensPerPage, setItensPerPage] = useState('10');
    const [totalPosts, setTotalPosts] = useState(0);

    const history = useHistory();
    const usuarioId = 2;

    const { page }: any = useParams();

    const paginate = (pageNumber: number) => {
        history.push(`/tiposDeVeiculos/${pageNumber}`);
    };

    function editar(id: any) {
        history.push(`/atualizar-tipo-de-veiculo/${id}`);
    };

    useEffect(() => {
        try {
            const fetchData = async () => {
                setLoading(true);
                const response = await axios.get(`/tiposDeVeiculos/listaDadosGrid`, {
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
            const response = await axios.get(`/tiposDeVeiculos/listaDadosGrid/count?idUsuario${usuarioId}`);
            setTotalPosts(response.data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchQtdPosts();
    }, []);

    const loadTiposDeVeiculos = async () => {
        try {
            const response = await axios.get(`/tiposDeVeiculos/listaDadosGrid`, {
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
                    const response = await axios.get(`/tiposDeVeiculos/search`, {
                        params: {
                            idUsuario: usuarioId,
                            keyword: searchTerm,
                        },
                    });
                    setSearchResults(response.data);
                }
                if (searchTerm === '') {
                    loadTiposDeVeiculos();
                }
            };
            search();
        } catch (error) {
            console.log(error);
        }
    }, [searchTerm]);


    const deletarTiposDeVeiculos = async (id: any) => {
      try {
        setLoading(true)
        await axios.delete(`/tiposDeVeiculos/${id}`)
        setIsDialogVisibleDelet(true);
        loadTiposDeVeiculos();
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
                        <h2 className="titulo">Tipos De Veículos</h2>
                        <h6 className="subtitulo">{'Cadastro > Tipos de Veículos'}</h6>
                    </div>
                    <div className="search-create mb-4">
                        <Link to="/cadastro-tipo-de-veiculo" className="btn-create">
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
                                        {searchResults.map((tipoDeVeiculo, index) => (
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
                                                            onClick={() => editar(tipoDeVeiculo.id)}
                                                            className="pi pi-pencil"
                                                            title="Editar Tipo De Veículo"
                                                        ></i>
                                                    </button>
                                                </td>
                                                <td style={{ width: '90px' }}>
                                                    <DeleteModal registro={tipoDeVeiculo.nome} onPress={() => deletarTiposDeVeiculos(tipoDeVeiculo.id)}>
                                                        <i className="pi pi-trash"
                                                            title="Deletar Tipos de Veículo"
                                                            style={{ fontSize: '1em', color: '#000', textDecoration: 'none' }}
                                                        >
                                                        </i>
                                                    </DeleteModal>
                                                </td>
                                                <td style={{ width: '90px' }}>{tipoDeVeiculo.id}</td>
                                                <td>{tipoDeVeiculo.nome}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            <Dialog
                                header="Tipo de Veículo deletado com sucesso!"
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

export default ListagemTiposDeVeiculos;