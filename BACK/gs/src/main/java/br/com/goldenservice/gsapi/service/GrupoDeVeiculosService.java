package br.com.goldenservice.gsapi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.goldenservice.gsapi.entities.Dispositivo;
import br.com.goldenservice.gsapi.entities.GrupoDeVeiculos;
import br.com.goldenservice.gsapi.entities.GrupoMacroDeVeiculos;
import br.com.goldenservice.gsapi.exception.GrupoDeVeiculosException;
import br.com.goldenservice.gsapi.exception.GrupoMacroDeVeiculosException;
import br.com.goldenservice.gsapi.repository.DispositivoRepository;
import br.com.goldenservice.gsapi.repository.GrupoDeVeiculosRepository;
import br.com.goldenservice.gsapi.repository.GrupoMacroDeVeiculosRepository;
import br.com.goldenservice.gsapi.vo.GrupoDeVeiculosVO;

@Service
public class GrupoDeVeiculosService {

	@Autowired
	GrupoDeVeiculosRepository grupoDeVeiculosRepository;
	
	@Autowired
	GrupoMacroDeVeiculosRepository grupoMacroDeVeiculosRepository;

	@Autowired
	DispositivoRepository dispositivoRepository;
	
	// Listar todos
		public List<GrupoDeVeiculosVO> obterTodos(Integer idUsuario) throws GrupoDeVeiculosException {
			try {
				List<GrupoDeVeiculos> gpvs = grupoDeVeiculosRepository.findAll();
				List<GrupoDeVeiculosVO> gpvsVO = new ArrayList<GrupoDeVeiculosVO>();
				for (GrupoDeVeiculos gpv : gpvs) {
					gpvsVO.add(converterEntidadeParaVO(gpv));
				}
				return gpvsVO;
			} catch (Exception e) {
				throw new GrupoDeVeiculosException("Falha ao listar grupo de veiculos");
			}
		}

		// Listar por Id
		public GrupoDeVeiculosVO obterPorId(Integer id) throws GrupoDeVeiculosException {
			try {
				Optional<GrupoDeVeiculos> grupoDeVeiculos = grupoDeVeiculosRepository.findById(id);
				return converterEntidadeParaVO(grupoDeVeiculos.get());
			} catch (Exception e) {
				throw new GrupoDeVeiculosException("Id não encontrado!");
			}
		}

//		// Pesquisa por letras e Palavras
//		public List<GrupoDeVeiculosVO> pesquisa(String keyword) throws GrupoDeVeiculosException {
//			try {
//				List<GrupoDeVeiculos> gruposDeVeiculos = grupoDeVeiculosRepository.findAllByNomeContainingIgnoreCaseAndAtivoTrue(keyword);
//				List<GrupoDeVeiculosVO> gpvVO = new ArrayList<GrupoDeVeiculosVO>();
//				for (GrupoDeVeiculos grupoDeVeiculo : gruposDeVeiculos) {
//					gpvVO.add(converterEntidadeParaVO(grupoDeVeiculo));
//				}
//				return gpvVO;
//			} catch (Exception e) {
//				throw new GrupoDeVeiculosException("Não foi possível recuperar a lista de Grupo de veiculos");
//			}
//		}

	public List<GrupoDeVeiculosVO> pesquisa(String keyword) throws GrupoDeVeiculosException {
		List<GrupoDeVeiculos> grupoDeVeiculos = new ArrayList<GrupoDeVeiculos>();

		List<GrupoDeVeiculosVO> grupoDeVeiculosVOS = new ArrayList<GrupoDeVeiculosVO>();
		try {
			if(testeNumero(keyword)) {
				grupoDeVeiculos = grupoDeVeiculosRepository.findAllByIdAndAtivoTrue(Integer.parseInt(keyword));
			}else {
				grupoDeVeiculos = grupoDeVeiculosRepository.findAllByNomeContainingIgnoreCaseAndAtivoTrue(keyword);

			}
			for (GrupoDeVeiculos g : grupoDeVeiculos) {
				grupoDeVeiculosVOS.add(converterEntidadeParaVO(g));
			}

		} catch (Exception e) {
			throw new GrupoDeVeiculosException("Id não encontrado");
		}
		return grupoDeVeiculosVOS;
	}





		// Paginação
		public List<GrupoDeVeiculosVO> findAllVO(Integer pagina, Integer qtdRegistros, Integer id) throws Exception {
			Pageable pageable = PageRequest.of(pagina, qtdRegistros);
			Page<GrupoDeVeiculos> grupoDeVeiculos = grupoDeVeiculosRepository.findAllByAtivoTrueOrderById(pageable);
			List<GrupoDeVeiculosVO> grupoDeVeiculosVO = new ArrayList<GrupoDeVeiculosVO>();
			try {
				for (GrupoDeVeiculos tec : grupoDeVeiculos) {
					grupoDeVeiculosVO.add(converterEntidadeParaVO(tec));
				}
			} catch (Exception e) {
				throw new GrupoMacroDeVeiculosException("Não foi possível recuperar a lista de Grupo de veiculos");
			}

			return grupoDeVeiculosVO;
		}

		// Inserir
		public GrupoDeVeiculosVO adicionar(GrupoDeVeiculosVO grupoDeVeiculosVO) throws GrupoDeVeiculosException {
			GrupoDeVeiculos grupoDeVeiculos = converterVOparaEntidade(grupoDeVeiculosVO);
			try {
				return converterEntidadeParaVO(grupoDeVeiculosRepository.save(grupoDeVeiculos));
			} catch (Exception e) {
				throw new GrupoDeVeiculosException("Erro ao adicionar Grupo de veiculos");
			}
		}

		// Atualizar
		public GrupoDeVeiculosVO atualizar(Integer id, GrupoDeVeiculosVO grupoDeVeiculosVO) throws GrupoDeVeiculosException {
			try {
				GrupoDeVeiculos grupoDeVeiculos = converterVOparaEntidade(grupoDeVeiculosVO);
				grupoDeVeiculos.setId(id);
				return converterEntidadeParaVO(grupoDeVeiculosRepository.save(grupoDeVeiculos));
			} catch (Exception e) {
				throw new GrupoDeVeiculosException("Id não encontrado");
			}
		}

		// Deletar
		public String deletar(Integer id) throws GrupoDeVeiculosException {
			Optional<GrupoDeVeiculos> tecOptional = grupoDeVeiculosRepository.findById(id);
			try {
				if (tecOptional.isPresent()) {
					tecOptional.get().setAtivo(false);
					grupoDeVeiculosRepository.save(tecOptional.get());
				}
			} catch (Exception e) {
				throw new GrupoDeVeiculosException("Id não encontrado");
			}
			return "GrupoDeVeiculos deletada";
		}

		// Número de elementos
		public Integer numeroElementos() {
			List<GrupoDeVeiculos> grupoDeVeiculos = grupoDeVeiculosRepository.findAllByAtivoTrue();
			return grupoDeVeiculos.size();
		}
		//converter entidade para vo
		private GrupoDeVeiculosVO converterEntidadeParaVO (GrupoDeVeiculos gpv) {
			GrupoDeVeiculosVO gpvVO = new GrupoDeVeiculosVO();
			gpvVO.setId(gpv.getId());
			gpvVO.setNome(gpv.getNome());
			gpvVO.setGrupoMacro(gpv.getGrupoMacroDeVeiculos());
			gpvVO.setAtivo(gpv.getAtivo());
			gpvVO.setIdUsuario(gpv.getIdUsuario());
			gpvVO.setDispositivo(gpv.getDispositivos());
			return gpvVO;
		}
		
		// Converter vo para entidade
		private GrupoDeVeiculos converterVOparaEntidade(GrupoDeVeiculosVO grupoDeVeiculosVO) {
			GrupoDeVeiculos grupoDeVeiculos = new GrupoDeVeiculos();
			grupoDeVeiculos.setId(grupoDeVeiculosVO.getId());
			grupoDeVeiculos.setNome(grupoDeVeiculosVO.getNome());
			grupoDeVeiculos.setAtivo(grupoDeVeiculosVO.getAtivo());
			grupoDeVeiculos.setIdUsuario(grupoDeVeiculosVO.getIdUsuario());
			
			Optional<GrupoMacroDeVeiculos> gmdv = grupoMacroDeVeiculosRepository.findById(grupoDeVeiculosVO.getGrupoMacroId());
				grupoDeVeiculos.setGrupoMacroDeVeiculos(gmdv.get());

			grupoDeVeiculosVO.getDispositivoId().forEach(id -> {
				Optional<Dispositivo> t = dispositivoRepository.findById(id);
				System.out.println("teste" + t.get());
				if (t.isPresent()) {
					grupoDeVeiculos.getDispositivos().add(t.get());
				}
			});

				return grupoDeVeiculos;
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
