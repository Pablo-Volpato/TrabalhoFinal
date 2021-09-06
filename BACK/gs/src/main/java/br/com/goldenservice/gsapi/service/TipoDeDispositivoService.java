package br.com.goldenservice.gsapi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.goldenservice.gsapi.entities.TipoDeDispositivo;
import br.com.goldenservice.gsapi.exception.TipoDeDispositivoException;
import br.com.goldenservice.gsapi.repository.TipoDeDispositivoRepository;
import br.com.goldenservice.gsapi.vo.TipoDeDispositivoVO;

@Service
public class TipoDeDispositivoService {
	
	@Autowired
	TipoDeDispositivoRepository tipoDeDispositivoRepository;
	
	// Listar Todos
		public List<TipoDeDispositivoVO> findAll(Integer idUsuario) throws TipoDeDispositivoException {
			 
			try {
				List<TipoDeDispositivo> tipoDeDispositivos = tipoDeDispositivoRepository.findAll();
				List<TipoDeDispositivoVO> tipoDeDispositivosVO = new ArrayList<TipoDeDispositivoVO>();
				for (TipoDeDispositivo tipoDeDispositivo : tipoDeDispositivos) {
					tipoDeDispositivosVO.add(converteEntidadeParaVO(tipoDeDispositivo));
				}
				return tipoDeDispositivosVO;
			} catch (Exception e) {
				throw new TipoDeDispositivoException("Erro ao listar tipo de dispositivo");
			}
		}

		// Listar por Id
		public TipoDeDispositivoVO findById(Integer id) throws TipoDeDispositivoException {
			try {
				return converteEntidadeParaVO(tipoDeDispositivoRepository.findById(id).get());
			} catch (Exception e) {
				throw new TipoDeDispositivoException("Id não encontrado");
			}
		}

		// Paginacao
		public List<TipoDeDispositivoVO> findAllVO(Integer pagina, Integer qtdRegistros, Integer id) throws Exception {
			Pageable page = null;
			List<TipoDeDispositivo> listTipoDeDispositivo = null;
			List<TipoDeDispositivo> listTipoDeDispositivoPaginacao = null;
			List<TipoDeDispositivoVO> listTipoDeDispositivoVO = new ArrayList<>();

			try {
				if (null != pagina && null != qtdRegistros) {

					page = PageRequest.of(pagina, qtdRegistros);
					listTipoDeDispositivoPaginacao = tipoDeDispositivoRepository.findAllByAtivoTrueOrderById(page).getContent();

					for (TipoDeDispositivo lTipoDeDispositivo : listTipoDeDispositivoPaginacao) {
						listTipoDeDispositivoVO.add(converteEntidadeParaVO(lTipoDeDispositivo));
					}

				} else {
					listTipoDeDispositivo = tipoDeDispositivoRepository.findAll();

					for (TipoDeDispositivo lTipoDeDispositivo : listTipoDeDispositivo) {
						listTipoDeDispositivoVO.add(converteEntidadeParaVO(lTipoDeDispositivo));
					}

				}
			} catch (Exception e) {
				throw new Exception("Não foi possível recuperar a lista de tipos de dispositivos ::" + e.getMessage());
			}

			return listTipoDeDispositivoVO;
		}

		// Número de elementos
		public Integer numeroElementos() {
			List<TipoDeDispositivo> tipoDeDispositivos = tipoDeDispositivoRepository.findAllByAtivoTrue();
			return tipoDeDispositivos.size();
		}
		
		// Pesquisa por letras e Palavras
			public List<TipoDeDispositivoVO> pesquisa(String keyword) throws TipoDeDispositivoException {
				try {
					List<TipoDeDispositivo> tipoDeDispositivos = new ArrayList<TipoDeDispositivo>();
					List<TipoDeDispositivoVO> tipoDeDispositivosVO = new ArrayList<TipoDeDispositivoVO>();
					if(testeNumero(keyword)) {
						tipoDeDispositivos = tipoDeDispositivoRepository.findAllByIdAndAtivoTrue(Integer.parseInt(keyword));
					}else {
						tipoDeDispositivos = tipoDeDispositivoRepository.findAllByNomeContainingIgnoreCaseAndAtivoTrue(keyword);	
					}
					for (TipoDeDispositivo tipoDeDispositivo : tipoDeDispositivos) {
						tipoDeDispositivosVO.add(converteEntidadeParaVO(tipoDeDispositivo));
					}
					return tipoDeDispositivosVO;
					
				} catch (Exception e) {
					throw new TipoDeDispositivoException("Não foi possível recuperar a lista de tipos de dispositivo");
				}
			}
		
		// Atualizar
		public TipoDeDispositivoVO updateTipoDeDispositivo(Integer id, TipoDeDispositivoVO tipoDeDispositivoVO) throws TipoDeDispositivoException {
			TipoDeDispositivo tipoDeDispositivo = converteVOParaEntidade(tipoDeDispositivoVO);
			try {
				tipoDeDispositivo.setId(id);
				return converteEntidadeParaVO(tipoDeDispositivoRepository.save(tipoDeDispositivo));
			} catch (Exception e) {
				throw new TipoDeDispositivoException("Id não encontrado");
			}
		}

		// Deletar
		public String deletar(Integer id) throws TipoDeDispositivoException {
			Optional<TipoDeDispositivo> tecOptional = tipoDeDispositivoRepository.findById(id);
			try {
				if (tecOptional.isPresent()) {
					tecOptional.get().setAtivo(false);
					tipoDeDispositivoRepository.save(tecOptional.get());
				}
			} catch (Exception e) {
				throw new TipoDeDispositivoException("Id não encontrado");
			}
			return "tipo de dispositivo deletado";
		}

		// Inserir
		public TipoDeDispositivoVO inserir(TipoDeDispositivoVO tipoDeDispositivoVO) throws TipoDeDispositivoException {
			try {
				TipoDeDispositivo tipoDeDispositivo = new TipoDeDispositivo();
				tipoDeDispositivo = converteVOParaEntidade(tipoDeDispositivoVO);
				tipoDeDispositivoRepository.save(tipoDeDispositivo);			
				return converteEntidadeParaVO(tipoDeDispositivo);
			} catch (Exception e) {
				throw new TipoDeDispositivoException("Erro ao adicionar TipoDeDispositivo");
			}
		}
			

		// Converte VO para Entidade
		private TipoDeDispositivoVO converteEntidadeParaVO(TipoDeDispositivo tipoDeDispositivo) {
			TipoDeDispositivoVO tipoDeDispositivoVO = new TipoDeDispositivoVO();
			
			tipoDeDispositivoVO.setId(tipoDeDispositivo.getId());
			tipoDeDispositivoVO.setNome(tipoDeDispositivo.getNome());
			tipoDeDispositivoVO.setDescricao(tipoDeDispositivo.getDescricao());
			tipoDeDispositivoVO.setAtivo(tipoDeDispositivo.getAtivo());
			tipoDeDispositivoVO.setIdUsuario(tipoDeDispositivo.getIdUsuario());
			

			return tipoDeDispositivoVO;
		}

		// Converte Entidade para VO
		private TipoDeDispositivo converteVOParaEntidade(TipoDeDispositivoVO tipoDeDispositivoVO) {
			TipoDeDispositivo tipoDeDispositivo = new TipoDeDispositivo();
			tipoDeDispositivo.setId(tipoDeDispositivoVO.getId());
			tipoDeDispositivo.setNome(tipoDeDispositivoVO.getNome());
			tipoDeDispositivo.setAtivo(tipoDeDispositivoVO.getAtivo());
			tipoDeDispositivo.setDescricao(tipoDeDispositivoVO.getDescricao());
			tipoDeDispositivo.setIdUsuario(tipoDeDispositivoVO.getIdUsuario());


			return tipoDeDispositivo;
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

