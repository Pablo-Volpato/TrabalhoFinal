package br.com.goldenservice.gsapi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.goldenservice.gsapi.entities.Corretora;
import br.com.goldenservice.gsapi.exception.CorretoraException;
import br.com.goldenservice.gsapi.repository.CorretoraRepository;
import br.com.goldenservice.gsapi.vo.CorretoraVO;

@Service
public class CorretoraService {

	@Autowired
	public CorretoraRepository corretoraRepository;
	
	// Listar Todos
	public List<CorretoraVO> findAll(Integer idUsuario) throws CorretoraException {
		 
		try {
			List<Corretora> corretoras = corretoraRepository.findAll();
			List<CorretoraVO> corretorasVO = new ArrayList<CorretoraVO>();
			for (Corretora corretora : corretoras) {
				corretorasVO.add(converteEntidadeParaVO(corretora));
			}
			return corretorasVO;
		} catch (Exception e) {
			throw new CorretoraException("Erro ao listar corretoras");
		}
	}

	// Listar por Id
	public CorretoraVO findById(Integer id) throws CorretoraException {
		try {
			return converteEntidadeParaVO(corretoraRepository.findById(id).get());
		} catch (Exception e) {
			throw new CorretoraException("Id não encontrado");
		}
	}

	// Paginacao
	public List<CorretoraVO> findAllVO(Integer pagina, Integer qtdRegistros, Integer id) throws Exception {
		Pageable page = null;
		List<Corretora> listCorretora = null;
		List<Corretora> listCorretoraPaginacao = null;
		List<CorretoraVO> listCorretoraVO = new ArrayList<>();

		try {
			if (null != pagina && null != qtdRegistros) {

				page = PageRequest.of(pagina, qtdRegistros);
				listCorretoraPaginacao = corretoraRepository.findAllByAtivoTrueOrderById(page).getContent();

				for (Corretora lCorretora : listCorretoraPaginacao) {
					listCorretoraVO.add(converteEntidadeParaVO(lCorretora));
				}

			} else {
				listCorretora = corretoraRepository.findAll();

				for (Corretora lCorretora : listCorretora) {
					listCorretoraVO.add(converteEntidadeParaVO(lCorretora));
				}
			}
		} catch (Exception e) {
			throw new Exception("Não foi possível recuperar a lista de Corretoras ::" + e.getMessage());
		}

		return listCorretoraVO;
	}

	// Número de elementos
	public Integer numeroElementos() {
		List<Corretora> corretoras = corretoraRepository.findAllByAtivoTrue();
		return corretoras.size();
	}
	
	// Pesquisa por letras e Palavras
	public List<CorretoraVO> pesquisa(String keyword) throws CorretoraException {
		List<Corretora> corretoras = new ArrayList<Corretora>();

		List<CorretoraVO> corretoraVOS = new ArrayList<CorretoraVO>();
		try {
			if(testeNumero(keyword)) {
				corretoras = corretoraRepository.findAllByIdAndAtivoTrue(Integer.parseInt(keyword));
			}else {
				corretoras = corretoraRepository.findAllByNomeContainingIgnoreCaseAndAtivoTrue(keyword);

			}
			for (Corretora c : corretoras) {
				corretoraVOS.add(converteEntidadeParaVO(c));
			}

		} catch (Exception e) {
			throw new CorretoraException("Id não encontrado");
		}
		return corretoraVOS;
	}
	
	// Atualizar
	public CorretoraVO updateCorretora(Integer id, CorretoraVO corretoraVO) throws CorretoraException {
		Corretora corretora = converteVOParaEntidade(corretoraVO);
		try {
			corretora.setId(id);
			return converteEntidadeParaVO(corretoraRepository.save(corretora));
		} catch (Exception e) {
			throw new CorretoraException("Id não encontrado");
		}
	}

	// Deletar
	public String deletar(Integer id) throws CorretoraException {
		Optional<Corretora> tecOptional = corretoraRepository.findById(id);
		try {
			if (tecOptional.isPresent()) {
				tecOptional.get().setAtivo(false);
				corretoraRepository.save(tecOptional.get());
			}
		} catch (Exception e) {
			throw new CorretoraException("Id não encontrado");
		}
		return "Corretora deletada";
	}

	// Inserir
	public CorretoraVO inserir(CorretoraVO corretoraVO) throws CorretoraException {
		try {
			Corretora corretora = new Corretora();
			corretora = converteVOParaEntidade(corretoraVO);
			corretoraRepository.save(corretora);			
			return converteEntidadeParaVO(corretora);
		} catch (Exception e) {
			throw new CorretoraException("Erro ao adicionar Corretora");
		}
	}
		

	// Converte VO para Entidade
	private CorretoraVO converteEntidadeParaVO(Corretora corretora) {
		CorretoraVO corretoraVO = new CorretoraVO();
		
		corretoraVO.setId(corretora.getId());
		corretoraVO.setNome(corretora.getNome());
		corretoraVO.setDescricao(corretora.getDescricao());
		corretoraVO.setAtivo(corretora.getAtivo());
		corretoraVO.setIdUsuario(corretora.getIdUsuario());
		
		return corretoraVO;
	}

	// Converte Entidade para VO
	private Corretora converteVOParaEntidade(CorretoraVO corretoraVO) {
		Corretora corretora = new Corretora();
		corretora.setId(corretoraVO.getId());
		corretora.setNome(corretoraVO.getNome());
		corretora.setAtivo(corretoraVO.getAtivo());
		corretora.setDescricao(corretoraVO.getDescricao());
		corretora.setIdUsuario(corretoraVO.getIdUsuario());

		return corretora;
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
