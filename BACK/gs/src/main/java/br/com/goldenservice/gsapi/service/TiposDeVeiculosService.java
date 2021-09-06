package br.com.goldenservice.gsapi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.goldenservice.gsapi.entities.GrupoDeVeiculos;
import br.com.goldenservice.gsapi.entities.TiposDeVeiculos;
import br.com.goldenservice.gsapi.exception.GrupoDeVeiculosException;
import br.com.goldenservice.gsapi.exception.TiposDeVeiculosException;
import br.com.goldenservice.gsapi.repository.GrupoDeVeiculosRepository;
import br.com.goldenservice.gsapi.repository.TiposDeVeiculoRepository;
import br.com.goldenservice.gsapi.vo.TiposDeVeiculosVO;

@Service
public class TiposDeVeiculosService {

	@Autowired
	TiposDeVeiculoRepository tiposDeVeiculosRepository;
	
	@Autowired
	GrupoDeVeiculosRepository grupoDeVeiculosRepository;
	
	
	// Listar todos
			public List<TiposDeVeiculosVO> obterTodos(Integer idUsuario) throws TiposDeVeiculosException {
				try {
					List<TiposDeVeiculos> tdv = tiposDeVeiculosRepository.findAll();
					List<TiposDeVeiculosVO> tdvVO = new ArrayList<TiposDeVeiculosVO>();
					for (TiposDeVeiculos tdvs : tdv) {
						tdvVO.add(converterEntidadeParaVO(tdvs));
					}
					return tdvVO;
				} catch (Exception e) {
					throw new TiposDeVeiculosException("Falha ao listar tipos de veiculos");
				}
			}

			// Listar por Id
			public TiposDeVeiculosVO obterPorId(Integer id) throws TiposDeVeiculosException {
				try {
					Optional<TiposDeVeiculos> tiposDeVeiculos = tiposDeVeiculosRepository.findById(id);
					return converterEntidadeParaVO(tiposDeVeiculos.get());
				} catch (Exception e) {
					throw new TiposDeVeiculosException("Id não encontrado!");
				}
			}

			// Pesquisa por letras e Palavras
			public List<TiposDeVeiculosVO> pesquisa(String keyword) throws TiposDeVeiculosException {
				try {
					List<TiposDeVeiculos> gruposDeVeiculos = new ArrayList<TiposDeVeiculos>();
					List<TiposDeVeiculosVO> gpvVO = new ArrayList<TiposDeVeiculosVO>();
					if(testeNumero(keyword)) {
						gruposDeVeiculos = tiposDeVeiculosRepository.findAllByIdAndAtivoTrue(Integer.parseInt(keyword));
					}else {
						gruposDeVeiculos = tiposDeVeiculosRepository.findAllByNomeContainingIgnoreCaseAndAtivoTrue(keyword);
					}
					for (TiposDeVeiculos grupoDeVeiculo : gruposDeVeiculos) {
						gpvVO.add(converterEntidadeParaVO(grupoDeVeiculo));
					}
					return gpvVO;				
				} catch (Exception e) {
					throw new TiposDeVeiculosException("Não foi possível recuperar a lista de tipos de veiculos");
				}
			}
			
			// Paginação
			public List<TiposDeVeiculosVO> findAllVO(Integer pagina, Integer qtdRegistros, Integer id) throws Exception {
				Pageable pageable = PageRequest.of(pagina, qtdRegistros);
				Page<TiposDeVeiculos> tiposDeVeiculos = tiposDeVeiculosRepository.findAllByAtivoTrueOrderById(pageable);
				List<TiposDeVeiculosVO> tiposDeVeiculosVO = new ArrayList<TiposDeVeiculosVO>();
				try {
					for (TiposDeVeiculos tec : tiposDeVeiculos) {
						tiposDeVeiculosVO.add(converterEntidadeParaVO(tec));
					}
				} catch (Exception e) {
					throw new GrupoDeVeiculosException("Não foi possível recuperar a lista de tipos de veiculos");
				}
				return tiposDeVeiculosVO;
			}

			// Inserir
			public TiposDeVeiculosVO adicionar(TiposDeVeiculosVO tiposDeVeiculosVO) throws TiposDeVeiculosException {
				TiposDeVeiculos tiposDeVeiculos = converterVOparaEntidade(tiposDeVeiculosVO);
				try {
					TiposDeVeiculos test = tiposDeVeiculosRepository.save(tiposDeVeiculos);
					return converterEntidadeParaVO(test);
				} catch (Exception e) {
					throw new TiposDeVeiculosException("Erro ao adicionar tipos de veiculos" + e.getMessage());
				}
			}

			// Atualizar
			public TiposDeVeiculosVO atualizar(Integer id, TiposDeVeiculosVO tiposDeVeiculosVO) throws TiposDeVeiculosException {
				TiposDeVeiculos tiposDeVeiculos = converterVOparaEntidade(tiposDeVeiculosVO);
				try {
					tiposDeVeiculos.setId(id);
					return converterEntidadeParaVO(tiposDeVeiculosRepository.save(tiposDeVeiculos));
				} catch (Exception e) {
					throw new TiposDeVeiculosException("Id não encontrado");
				}
			}

			// Deletar
			public String deletar(Integer id) throws TiposDeVeiculosException {
				Optional<TiposDeVeiculos> tecOptional = tiposDeVeiculosRepository.findById(id);
				try {
					if (tecOptional.isPresent()) {
						tecOptional.get().setAtivo(false);
						tiposDeVeiculosRepository.save(tecOptional.get());
					}
				} catch (Exception e) {
					throw new TiposDeVeiculosException("Id não encontrado");
				}
				return "Tipos de Veiculos deletados";
			}

			// Número de elementos
			public Integer numeroElementos() {
				List<TiposDeVeiculos> tiposDeVeiculos = tiposDeVeiculosRepository.findAllByAtivoTrue();
				return tiposDeVeiculos.size();
			}
			//converter entidade para vo
			private TiposDeVeiculosVO converterEntidadeParaVO (TiposDeVeiculos tdv) {
				TiposDeVeiculosVO tdvVO = new TiposDeVeiculosVO();
				tdvVO.setId(tdv.getId());
				tdvVO.setNome(tdv.getNome());
				tdvVO.setGrupoDeVeiculos(tdv.getGrupoDeVeiculos());
				tdvVO.setAtivo(tdv.getAtivo());
				tdvVO.setIdUsuario(tdv.getIdUsuario());
				return tdvVO;
			}
			
			// Converter vo para entidade
			private TiposDeVeiculos converterVOparaEntidade(TiposDeVeiculosVO tiposDeVeiculosVO) {
				TiposDeVeiculos tiposDeVeiculos = new TiposDeVeiculos();
				tiposDeVeiculos.setId(tiposDeVeiculosVO.getId());
				tiposDeVeiculos.setNome(tiposDeVeiculosVO.getNome());
				tiposDeVeiculos.setAtivo(tiposDeVeiculosVO.getAtivo());
				tiposDeVeiculos.setIdUsuario(tiposDeVeiculosVO.getIdUsuario());
				
				Optional<GrupoDeVeiculos> gmdv = grupoDeVeiculosRepository.findById(tiposDeVeiculosVO.getGrupoVeiculosId());
					tiposDeVeiculos.setGrupoDeVeiculos(gmdv.get());			
					
					return tiposDeVeiculos;
			}
			private Boolean testeNumero (String s) {
				try {
					Integer.parseInt(s);
				}catch (NumberFormatException nfe) {
					return false;
				}
				return true;
			}
		}

