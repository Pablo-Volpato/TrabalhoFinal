import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Col, Row, Spinner } from "react-bootstrap";
import { MarcaTypesGryd } from "../../../Types/marcaTypesGryd";
import axios from "../../../config/axiosMaquina";
import Pagination from "../../../components/Pagination/Pagination";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import Navegacao from "../../../components/Navegacao";
import Header from "../../../components/Header";
import "./styles.css";

const ListagemMarca = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<MarcaTypesGryd[]>([]);
  const [marcaRecuperada, setMarcaRecuperada] = useState<any>();
  const [objetoMarca, setObjetoMarca] = useState<MarcaTypesGryd[]>([]);
  const [isDialogVisibleCadEfetuado, setIsDialogVisibleCadEfetuado] =
    useState(false);
  const [isDialogVisibleDelet, setIsDialogVisibleDelet] = useState(false);
  const [isDialogVisibleCadNaoEfetuado, setIsDialogVisibleCadNaoEfetuado] =
    useState(false);
  const [isDialogVisiblerecuperarMarca, setIsDialogVisiblerecuperarMarca] =
    useState(false);
  const [isDialogVisiblemarcaExistente, setIsDialogVisibleMarcaExistente] =
    useState(false);
  const [isDialogVisibleUpdateEfetuado, setIsDialogVisibleUpdateEfetuado] =
    useState(false);
  const [mensagem, setMensagem] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [marca, setMarca] = useState<string>("");
  const [edicaoIndex, setEdicaoIndex] = useState<number>();
  const [edicaoMarca, setEdicaoMarca] = useState<string>("");
  const [edicaoID, setEdicaoID] = useState<string | number>(0);
  const [itensPerPage, setItensPerPage] = useState("10");
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [hasErrorOBG, setHasErrorOBG] = useState(false);
  const [hasErrorEdit, setHasErrorEdit] = useState(false);
  const [validated, setValidated] = useState(false);

  const history = useHistory();
  const usuarioId = 2;
  const { page }: any = useParams();

  const paginate = (pageNumber: number) => {
    history.push(`/marca/${pageNumber}`);
  };

  const habitarEdicao = (marcaEdt: MarcaTypesGryd, index: number) => {
    setEdicaoMarca(marcaEdt.marca);
    setEdicaoID(marcaEdt.id);
    setEdicaoIndex(index);
  };

  const salvarAlteraçoes = (event: any) => {
    if (event.key === "Enter") {
      atualizarMarca();
    }
  };

  const validarCaracterEspecialCadastro = (value: string) => {
    setHasErrorOBG(false)
    if (!/([\u0300-\u036f]|[^0-9a-zA-Z])/g.test(value)) {
      setHasError(false);
    }
    if (/([\u0300-\u036f]|[^0-9a-zA-Z])/g.test(value)) {
      setHasError(true);
    }
    setMarca(value);
  }
  const validarCaracterEspecialEdicao = (value: string) => {

    if (!/([\u0300-\u036f]|[^0-9a-zA-Z])/g.test(value)) {
      setHasErrorEdit(false);
    }
    if (/([\u0300-\u036f]|[^0-9a-zA-Z])/g.test(value)) {
      setHasErrorEdit(true);
    }
    setEdicaoMarca(value);
  }
  const validarMarca = () => {
    return objetoMarca.filter(
      (nomeMarca: MarcaTypesGryd) =>
        nomeMarca.marca === edicaoMarca || nomeMarca.marca === marca
    );
  };

  const recuperarMarca = async () => {
    try {
      marcaRecuperada.ativo = true;
      await axios.put(
        `/marcas/${marcaRecuperada.id}?idUsuario${usuarioId}`,
        marcaRecuperada
      );
      setMensagem(false);
      setIsDialogVisibleUpdateEfetuado(true);
      loadMarca();
      fetchQtdPosts();
      setEdicaoIndex(-1);
      setMarca("");
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true);
    }
  };

  const cadastrarMarca = async (event: any) => {
    try {
      event.preventDefault();
      const novoNome = marca.trim();
      setValidated(true)
      if (novoNome.length <= 0) {
        setMarca(novoNome);
        setHasErrorOBG(true)
        return;
      }

      const marcaEncontrado = validarMarca();
      if (marcaEncontrado.length <= 0) {
        const dados = {
          idUsuario: usuarioId,
          marca: marca,
          ativo: true,
        };
        await axios.post(`/marcas?idUsuario${usuarioId}`, dados);
        setMensagem(true);
        setIsDialogVisibleCadEfetuado(true);
        loadMarca();
        fetchQtdPosts();
        setMarca("");
        return;
      }
      if (marcaEncontrado[0].ativo === false) {
        setIsDialogVisiblerecuperarMarca(true);
        setMarcaRecuperada(marcaEncontrado[0]);
      } else {
        setIsDialogVisibleMarcaExistente(true);
      }
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true);
    }
  };

  const atualizarMarca = async () => {
    try {
      const novoNome = edicaoMarca.trim();
      if (novoNome.length <= 0) {
        setEdicaoMarca(novoNome);
        return;
      }
      const marcaEncontrado = validarMarca();
      if (marcaEncontrado.length <= 0) {
        const dados = {
          idUsuario: usuarioId,
          marca: edicaoMarca,
          ativo: true,
        };
        await axios.put(`/marcas/${edicaoID}?idUsuario${usuarioId}`, dados);
        setMensagem(false);
        setIsDialogVisibleUpdateEfetuado(true);
        loadMarca();
        fetchQtdPosts();
        setEdicaoIndex(-1);
        return;
      }
      if (marcaEncontrado[0].ativo === false) {
        setMensagem(false);
        setIsDialogVisiblerecuperarMarca(true);
        setMarcaRecuperada(marcaEncontrado[0]);
      } else {
        setIsDialogVisibleMarcaExistente(true);
      }
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true);
    }
  };

  const obterTodasmarcas = async () => {
    try {
      const { data } = await axios.get(`/marcas?idUsuario=${usuarioId}`);
      setObjetoMarca(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true);
        const response = await axios.get(`/marcas/listaDadosGrid`, {
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
      obterTodasmarcas();
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [itensPerPage, page]);

  const fetchQtdPosts = async () => {
    try {
      const response = await axios.get(
        `/marcas/listaDadosGrid/count?idUsuario${usuarioId}`
      );
      setTotalPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const tabelaFipe = async () => {
    try {
      const response = await axios.get(
        "/marcas/fipe"
      );
      loadMarca();
      fetchQtdPosts();
      console.log(response.data);
    }catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQtdPosts();
    tabelaFipe();
  }, []);

  const loadMarca = async () => {
    try {
      const response = await axios.get(`/marcas/listaDadosGrid`, {
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
        if (searchTerm !== "") {
          const response = await axios.get(`/marcas/search`, {
            params: {
              idUsuario: usuarioId,
              keyword: searchTerm,
            },
          });
          setSearchResults(response.data);
        }
        if (searchTerm === "") {
          loadMarca();
        }
      };
      search();
    } catch (error) {
      console.log(error);
    }
  }, [searchTerm]);

  const deletarMarca = async (id: any) => {
    try {
      setLoading(true);
      await axios.delete(`/marcas/${id}`);
      setIsDialogVisibleDelet(true);
      loadMarca();
      setLoading(false);
      fetchQtdPosts();
      obterTodasmarcas();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row>
      <Navegacao />
      <Col>
        <Header />
        <div className="card">
          <div className="titulo-container">
            <h2 className="titulo">Marca</h2>
            <h6 className="subtitulo">{"Cadastro > marca"}</h6>
          </div>
          <label style={{ marginLeft: 6, fontSize: 14 }}>MARCA<b style={{ marginLeft: 0, fontSize: 18, color: "#f00"}}>*</b></label>
          {hasError && <small style={{ color: 'red', marginTop: 0, fontSize: 13 }}> Não permitido caracteres especiais!!</small>}
          {hasErrorOBG && <small style={{ color: 'red', marginTop: 0, fontSize: 13 }}>Campo obrigatorio!</small>}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: 0,
              padding: 0,
            }}
          >
            <Row style={{ marginLeft: 2, display: "flex" }}>
              <input
                className="p-inputtext p-component"
                value={marca}
                onChange={(e) =>
                  validarCaracterEspecialCadastro(e.target.value)
                }
                style={{
                  borderColor: validated && marca === '' || marca === undefined  ? '#dc3545' : '' 
                }}
              />
              <div
                className="btn-create"
                onClick={cadastrarMarca}
                style={{cursor: "pointer", marginLeft: 10, borderColor: validated && marca === '' || marca === undefined  ? '#dc3545' : ''  }}
              >
                <i
                  style={{ fontSize: "1em", color: "#000" }}
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
                style={{ width: "240px" }}
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
              />
              <i className="pi pi-search"></i>
            </span>
          </div>
          <Dialog
            header="Esta Marca foi excluído anteriormente. Tem certeza que deseja reativar o cadastro dele?"
            footer={
              <>
                <Button
                  label="Não"
                  onClick={() => setIsDialogVisiblerecuperarMarca(false)}
                />
                <Button
                  label="Sim"
                  onClick={() => {
                    setIsDialogVisiblerecuperarMarca(false);
                    recuperarMarca();
                  }}
                />
              </>
            }
            visible={isDialogVisiblerecuperarMarca}
            style={{ width: "50vw" }}
            modal
            onHide={() => setIsDialogVisiblerecuperarMarca(false)}
          />
          <Dialog
            header={`Marca foi Cadastrada com sucesso!`}
            footer={
              <>
                <Button
                  label="OK"
                  onClick={() => setIsDialogVisibleCadEfetuado(false)}
                />
              </>
            }
            visible={isDialogVisibleCadEfetuado}
            style={{ width: "50vw" }}
            modal
            onHide={() => setIsDialogVisibleCadEfetuado(false)}
          />
          <Dialog
            header={`Marca foi Atualizada com sucesso!`}
            footer={
              <>
                <Button
                  label="OK"
                  onClick={() =>  setIsDialogVisibleUpdateEfetuado(false)}
                />
              </>
            }
            visible={isDialogVisibleUpdateEfetuado}
            style={{ width: "50vw" }}
            modal
            onHide={() => setIsDialogVisibleUpdateEfetuado(false)}
          />
          <Dialog
            header="Marca já cadastrado!"
            footer={
              <>
                <Button
                  label="OK"
                  onClick={() => setIsDialogVisibleMarcaExistente(false)}
                />
              </>
            }
            visible={isDialogVisiblemarcaExistente}
            style={{ width: "50vw" }}
            modal
            onHide={() => setIsDialogVisibleMarcaExistente(false)}
          />
          <Dialog
            header="Marca deletado com sucesso !"
            footer={
              <>
                <Button
                  label="OK"
                  onClick={() => setIsDialogVisibleDelet(false)}
                />
              </>
            }
            visible={isDialogVisibleDelet}
            style={{ width: "50vw" }}
            modal
            onHide={() => setIsDialogVisibleDelet(false)}
          />
          <Dialog
            header="Erro ao cadastrar, verifique os campos!"
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
          <div className="painel">
            <div className="table-responsive">
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
                <table className="table">
                  <thead className="thead">
                    <tr>
                      <th></th>
                      <th></th>
                      <th>ID</th>
                      <th>Nome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((marcaMap, index) => (
                      <tr key={index}>
                        <td style={{ width: "40px" }}>
                          <button
                            style={{
                              backgroundColor: "transparent",
                              borderColor: "transparent",
                              width: 20,
                              height: 20,
                              padding: 0,
                              marginRight: 15,
                              marginBottom: 2,
                            }}
                          >
                            <i
                              onClick={() => habitarEdicao(marcaMap, index)}
                              className="pi pi-pencil"
                              title="Editar Marca "
                            ></i>
                          </button>
                        </td>
                        <td style={{ width: "90px" }}>
                          <DeleteModal
                            registro={marcaMap.marca}
                            onPress={() => deletarMarca(marcaMap.id)}
                          >
                            <i
                              className="pi pi-trash"
                              title="Deletar Marca"
                              style={{ fontSize: "1em", color: "#000" }}
                            >
                              {" "}
                            </i>
                          </DeleteModal>
                        </td>
                        <td style={{ width: "90px" }}>{marcaMap.id}</td>
                        {edicaoIndex === index ? (
                          <td>
                            <input
                              value={edicaoMarca}
                              onChange={(e) =>
                                validarCaracterEspecialEdicao(e.target.value)
                              }
                              onKeyPress={(e) => salvarAlteraçoes(e)}
                            />
                            {hasErrorEdit && (
                              <small
                                style={{
                                  color: "red",
                                  marginTop: 0,
                                  fontSize: 13,
                                }}
                              >
                                {" "}
                                Não permitido caracteres especiais!!
                              </small>
                            )}
                          </td>
                        ) : (
                          <td>{marcaMap.marca}</td>
                        )}
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

export default ListagemMarca;
