import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { GrupoMacroTypesGryd } from "../../../Types/grupoMacroTypesGryd ";
import { Col, Row, Spinner } from "react-bootstrap";
import axios from "../../../config/axiosMaquina";
import Pagination from "../../../components/Pagination/Pagination";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import Navegacao from "../../../components/Navegacao";
import Header from "../../../components/Header";
import "./styles.css";

const ListagemGrupoMacro = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<GrupoMacroTypesGryd[]>([]);
  const [grupoMacroRecuperado, setgrupoMacroRecuperado] =
    useState<any>();
  const [grupoMacro, setGrupoMacro] = useState<GrupoMacroTypesGryd[]>([]);
  const [isDialogVisibleCadEfetuado, setIsDialogVisibleCadEfetuado] =
    useState(false);
  const [isDialogVisibleDelet, setIsDialogVisibleDelet] = useState(false);
  const [isDialogVisibleCadNaoEfetuado, setIsDialogVisibleCadNaoEfetuado] =
    useState(false);
  const [
    isDialogVisibleRecuperarGrupoMacro,
    setIsDialogVisibleRecuperarGrupoMacro,
  ] = useState(false);
  const [
    isDialogVisibleGrupoMacroExistente,
    setisDialogVisibleGrupoMacroExistente,
  ] = useState(false);
  const [isDialogVisibleUpdateEfetuado, setIsDialogVisibleUpdateEfetuado] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState<string>("");
  const [edicaoIndex, setEdicaoIndex] = useState<number>();
  const [edicaoNome, setEdicaoNome] = useState<string>("");
  const [edicaoID, setEdicaoID] = useState<string | number>(0);
  const [itensPerPage, setItensPerPage] = useState("10");
  const [totalPosts, setTotalPosts] = useState(0);
  const [validated, setValidated] = useState(false);
  const [hasError, setHasError] = useState(false);


  const history = useHistory();
  const usuarioId = 2;
  const { page }: any = useParams();

  const paginate = (pageNumber: number) => {
    history.push(`/grupo-macro/${pageNumber}`);
  };

  const habitarEdicao = (grupoMacro: GrupoMacroTypesGryd, index: number) => {
    setEdicaoNome(grupoMacro.nome);
    setEdicaoID(grupoMacro.id);
    setEdicaoIndex(index);
  };

  const salvarAlteraçoes = (event: any) => {
    if (event.key === "Enter") {
      atualizarGrupoMacro();
    }
  };

  const validarGrupoMacro = () => {
    return grupoMacro.filter(
      (grupoMacro: GrupoMacroTypesGryd) =>
        grupoMacro.nome === edicaoNome || grupoMacro.nome === nome
    );
  };

  const recuperargrupoMacroInativo = async () => {
    try {
      grupoMacroRecuperado.ativo = true;
      await axios.put(
        `/grupoMacroDeVeiculos/${grupoMacroRecuperado.id}?idUsuario${usuarioId}`,
        grupoMacroRecuperado
      );
      setIsDialogVisibleUpdateEfetuado(true);
      loadgrupoMacro();
      fetchQtdPosts();
      setEdicaoIndex(-1);
      setNome("");
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true);
    }
  };

  const cadastrargrupoMacro = async (event: any) => {
    try {
      event.preventDefault();
      const novoNome = nome.trim();
      setValidated(true);
      if (novoNome.length <= 0) {
        setNome(novoNome);
        setHasError(true);
        return;
      }
      const grupoMacroEncontrado = validarGrupoMacro();
      if (grupoMacroEncontrado.length <= 0) {
        const dados = {
          idUsuario: usuarioId,
          nome: nome,
          ativo: true,
        };
        await axios.post(`/grupoMacroDeVeiculos?idUsuario${usuarioId}`, dados);
        setIsDialogVisibleCadEfetuado(true);
        loadgrupoMacro();
        fetchQtdPosts();
        setNome("");
        return;
      }
      if (grupoMacroEncontrado[0].ativo === false) {
        setIsDialogVisibleRecuperarGrupoMacro(true);
        setgrupoMacroRecuperado(grupoMacroEncontrado[0]);
      } else {
        setisDialogVisibleGrupoMacroExistente(true);
      }
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true);
    }
  };

  const atualizarGrupoMacro = async () => {
    try {
      const novoNome = edicaoNome.trim();
      if (novoNome.length <= 0) {
        setEdicaoNome(novoNome);
        return;
      }

      const grupoMacroEncontrado = validarGrupoMacro();

      if (grupoMacroEncontrado.length <= 0) {
        const dados = {
          idUsuario: usuarioId,
          nome: edicaoNome,
          ativo: true,
        };
        await axios.put(
          `/grupoMacroDeVeiculos/${edicaoID}?idUsuario${usuarioId}`,
          dados
        );
        setIsDialogVisibleUpdateEfetuado(true);
        loadgrupoMacro();
        fetchQtdPosts();
        setEdicaoIndex(-1);
        return;
      }

      if (grupoMacroEncontrado[0].ativo === false) {
        setIsDialogVisibleRecuperarGrupoMacro(true);
        setgrupoMacroRecuperado(grupoMacroEncontrado[0]);
      } else {
        setisDialogVisibleGrupoMacroExistente(true);
      }
    } catch (error) {
      setIsDialogVisibleCadNaoEfetuado(true);
    }
  };

  const obterTodosgrupoMacro = async () => {
    try {
      const { data } = await axios.get(
        `/grupoMacroDeVeiculos?idUsuario=${usuarioId}`
      );
      setGrupoMacro(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true);
        const response = await axios.get(
          `/grupoMacroDeVeiculos/listaDadosGrid`,
          {
            params: {
              idUsuario: usuarioId,
              qtdRegistros: itensPerPage,
              pagina: page - 1,
            },
          }
        );
        console.log(response.data);
        setSearchResults(response.data);
        setLoading(false);
      };
      obterTodosgrupoMacro();
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [itensPerPage, page]);

  const fetchQtdPosts = async () => {
    try {
      const response = await axios.get(
        `/grupoMacroDeVeiculos/listaDadosGrid/count?idUsuario${usuarioId}`
      );
      setTotalPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQtdPosts();
  }, []);

  const loadgrupoMacro = async () => {
    try {
      const response = await axios.get(`/grupoMacroDeVeiculos/listaDadosGrid`, {
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
          const response = await axios.get(`/grupoMacroDeVeiculos/search`, {
            params: {
              idUsuario: usuarioId,
              keyword: searchTerm,
            },
          });
          setSearchResults(response.data);
        }
        if (searchTerm === "") {
          loadgrupoMacro();
        }
      };
      search();
    } catch (error) {
      console.log(error);
    }
  }, [searchTerm]);

  const deletargrupoMacro = async (id: any) => {
    try {
      setLoading(true);
      await axios.delete(`/grupoMacroDeVeiculos/${id}`);
      obterTodosgrupoMacro();
      loadgrupoMacro();
      setIsDialogVisibleDelet(true);
      fetchQtdPosts();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row>
      <Navegacao />
      <Col>
        <Header />
        <div className="card">
          <div className="titulo-container">
            <h2 className="titulo">Grupo Macro de Veículos</h2>
            <h6 className="subtitulo">
              {"Cadastro > Grupo Macro de Veículos"}
            </h6>
          </div>
          <label style={{ marginLeft: 6, fontSize: 14 }}>
            GRUPO MACRO DE VEÍCULO<b style={{ marginLeft: 0, fontSize: 18, color: "#f00"}}>*</b>
          </label>
          {hasError && <small style={{ color: 'red', marginTop: 0, fontSize: 13 }}>Campo obrigatorio</small>}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Row style={{ marginLeft: 2 }}>
              <input
                className="p-inputtext p-component"
                value={nome}
                style={{
                  borderColor: validated && nome === '' || nome === undefined  ? '#dc3545' : '' 
                }}
                onChange={(e) => setNome(e.target.value)}
              />

              <div
                className="btn-create"
                onClick={cadastrargrupoMacro}
                style={{cursor: "pointer", marginLeft: 10 }}
              >
                <i
                  style={{
                    fontSize: "1em",
                    color: "#000",
                    textDecoration: "none",
                  }}
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
            header="Este Grupo Macro de Veículos foi excluído anteriormente. Tem certeza que deseja reativar o cadastro dele?"
            footer={
              <>
                <Button
                  label="Não"
                  onClick={() => setIsDialogVisibleRecuperarGrupoMacro(false)}
                />
                <Button
                  label="Sim"
                  onClick={() => {
                    setIsDialogVisibleRecuperarGrupoMacro(false);
                    recuperargrupoMacroInativo();
                  }}
                />
              </>
            }
            visible={isDialogVisibleRecuperarGrupoMacro}
            style={{ width: "50vw" }}
            modal
            onHide={() => setIsDialogVisibleRecuperarGrupoMacro(false)}
          />
          <Dialog
            header={`Grupo Macro de Veículos foi cadastrado com sucesso!`}
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
            header={`Grupo Macro de Veículos foi atualizado com sucesso!`}
            footer={
              <>
                <Button
                  label="OK"
                  onClick={() => setIsDialogVisibleUpdateEfetuado(false)}
                />
              </>
            }
            visible={isDialogVisibleUpdateEfetuado}
            style={{ width: "50vw" }}
            modal
            onHide={() => setIsDialogVisibleUpdateEfetuado(false)}
          />
          <Dialog
            header="Grupo Macro de Veículos já cadastrado!"
            footer={
              <>
                <Button
                  label="OK"
                  onClick={() => setisDialogVisibleGrupoMacroExistente(false)}
                />
              </>
            }
            visible={isDialogVisibleGrupoMacroExistente}
            style={{ width: "50vw" }}
            modal
            onHide={() => setisDialogVisibleGrupoMacroExistente(false)}
          />
          <Dialog
            header="Grupo Macro de Veículos deletado com sucesso!"
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
                    {searchResults.map((grupoMacro, index) => (
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
                              onClick={() => habitarEdicao(grupoMacro, index)}
                              className="pi pi-pencil"
                              title="Editar Grupo Macro de Veículos "
                            ></i>
                          </button>
                        </td>
                        <td style={{ width: "90px" }}>
                          <DeleteModal
                            registro={grupoMacro.nome}
                            onPress={() => deletargrupoMacro(grupoMacro.id)}
                          >
                            <i
                              className="pi pi-trash"
                              title="Deletar Grupo Macro de Veículos"
                              style={{
                                fontSize: "1em",
                                color: "#000",
                                textDecoration: "none",
                              }}
                            >
                              {" "}
                            </i>
                          </DeleteModal>
                        </td>
                        <td style={{ width: "90px" }}>{grupoMacro.id}</td>
                        {edicaoIndex == index ? (
                          <td>
                            <input
                              value={edicaoNome}
                              onChange={(e) => setEdicaoNome(e.target.value)}
                              onKeyPress={(e) => salvarAlteraçoes(e)}
                            />
                          </td>
                        ) : (
                          <td>{grupoMacro.nome}</td>
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

export default ListagemGrupoMacro;
