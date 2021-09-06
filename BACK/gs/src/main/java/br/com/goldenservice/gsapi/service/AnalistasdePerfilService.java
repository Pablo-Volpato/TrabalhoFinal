package br.com.goldenservice.gsapi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.goldenservice.gsapi.entities.AnalistasdePerfil;
import br.com.goldenservice.gsapi.exception.AnalistaPerfilException;
import br.com.goldenservice.gsapi.repository.AnalistasdePerfilRepository;
import br.com.goldenservice.gsapi.vo.AnalistasdePerfilVO;

@Service
public class AnalistasdePerfilService {

	@Autowired
	AnalistasdePerfilRepository analistasdePerfilRepository;

	// Paginação
	public List<AnalistasdePerfilVO> obterTodos(Integer pagina, Integer qtdRegistros) throws AnalistaPerfilException {
		Pageable pageable = PageRequest.of(pagina, qtdRegistros);
		try {
			Page<AnalistasdePerfil> analistas = analistasdePerfilRepository.findAllByAtivoTrueOrderById(pageable);
			List<AnalistasdePerfilVO> analistasVO = new ArrayList<AnalistasdePerfilVO>();
			for (AnalistasdePerfil analista : analistas) {
				analistasVO.add(converterEntidade(analista));
			}
			return analistasVO;
		} catch (Exception e) {
			throw new AnalistaPerfilException("Não foi possível obter lista");
		}
	}

	// Listar todos
	public List<AnalistasdePerfilVO> obterTodos(Integer idUsuario) throws AnalistaPerfilException {
		try {
			List<AnalistasdePerfil> analistas = analistasdePerfilRepository.findAll();
			List<AnalistasdePerfilVO> analistasVO = new ArrayList<AnalistasdePerfilVO>();
			for (AnalistasdePerfil analista : analistas) {
				analistasVO.add(converterEntidade(analista));
			}
			return analistasVO;
		} catch (Exception e) {
			throw new AnalistaPerfilException("Falha ao listar analistas!!");
		}
	}

	// Listar por Id
	public AnalistasdePerfilVO obterPorId(Integer id) throws AnalistaPerfilException {
		try {
			Optional<AnalistasdePerfil> analista = analistasdePerfilRepository.findById(id);
			return converterEntidade(analista.get());
		} catch (Exception e) {
			throw new AnalistaPerfilException("Id não encontrado!");
		}
	}

	// Inserir
	public AnalistasdePerfilVO adicionar(AnalistasdePerfilVO analistasdePerfilVO) throws AnalistaPerfilException {
		AnalistasdePerfil analistasdePerfil = converterVo(analistasdePerfilVO);
		try {
			return converterEntidade(analistasdePerfilRepository.save(analistasdePerfil));
		} catch (Exception e) {
			throw new AnalistaPerfilException("Não foi possível adicionar analistas");
		}
	}

	// Atualizar
	public AnalistasdePerfilVO atualizar(Integer id, AnalistasdePerfilVO analistasdePerfilVO)
			throws AnalistaPerfilException {
		AnalistasdePerfil analistasdePerfil = converterVo(analistasdePerfilVO);
		try {
			analistasdePerfil.setId(id);
			return converterEntidade(analistasdePerfilRepository.save(analistasdePerfil));
		} catch (Exception e) {
			throw new AnalistaPerfilException("Id não encontrado!");
		}
	}

	// Deletar
	public String deletar(Integer id) throws AnalistaPerfilException {
		Optional<AnalistasdePerfil> tecOptional = analistasdePerfilRepository.findById(id);
		try {
			if (tecOptional.isPresent()) {
				tecOptional.get().setAtivo(false);
				analistasdePerfilRepository.save(tecOptional.get());
			}
		} catch (Exception e) {
			throw new AnalistaPerfilException("Id não encontrado");
		}
		return "Analista deletado!!";
	}

	// Número de elementos
	public Integer numeroElementos() {
		List<AnalistasdePerfil> analistasdePerfil = analistasdePerfilRepository.findAllByAtivoTrue();
		return analistasdePerfil.size();
	}

//	// Pesquisa por letras e Palavras
//	public List<AnalistasdePerfilVO> pesquisa(String keyword) throws AnalistaPerfilException {
//		try {
//			List<AnalistasdePerfil> analistas = analistasdePerfilRepository
//					.findAllByNomeContainingIgnoreCaseAndAtivoTrue(keyword);
//			List<AnalistasdePerfilVO> analistasVO = new ArrayList<AnalistasdePerfilVO>();
//			for (AnalistasdePerfil analista : analistas) {
//				analistasVO.add(converterEntidade(analista));
//			}
//			return analistasVO;
//
//		} catch (Exception e) {
//			throw new AnalistaPerfilException("Não foi possível recuperar a lista de Analistas de Perfil");
//		}
//	}

	public List<AnalistasdePerfilVO> pesquisa(String keyword) throws AnalistaPerfilException {
		List<AnalistasdePerfil> analistasdePerfils = new ArrayList<AnalistasdePerfil>();

		List<AnalistasdePerfilVO> analistasdePerfilVOS = new ArrayList<AnalistasdePerfilVO>();
		try {
			if(testeNumero(keyword)) {
				analistasdePerfils = analistasdePerfilRepository.findAllByIdAndAtivoTrue(Integer.parseInt(keyword));
			}else {
				analistasdePerfils = analistasdePerfilRepository.findAllByNomeContainingIgnoreCaseAndAtivoTrue(keyword);

			}
			for (AnalistasdePerfil ap : analistasdePerfils) {
				analistasdePerfilVOS.add(converterEntidade(ap));
			}

		} catch (Exception e) {
			throw new AnalistaPerfilException("Id não encontrado");
		}
		return analistasdePerfilVOS;
	}







	// converter entidade
	private AnalistasdePerfilVO converterEntidade (AnalistasdePerfil analista) {
		AnalistasdePerfilVO analistaVO = new AnalistasdePerfilVO();
		analistaVO.setId(analista.getId());
		analistaVO.setNome(analista.getNome());
		analistaVO.setAtivo(analista.getAtivo());
		analistaVO.setIdUsuario(analista.getIdUsuario());
		return analistaVO;
	}
	// Converter vo
	private AnalistasdePerfil converterVo(AnalistasdePerfilVO analistasdePerfilVO) {
		AnalistasdePerfil analistasdePerfil = new AnalistasdePerfil();
		analistasdePerfil.setNome(analistasdePerfilVO.getNome());
		analistasdePerfil.setAtivo(analistasdePerfilVO.getAtivo());
		analistasdePerfil.setId(analistasdePerfilVO.getId());
		analistasdePerfil.setIdUsuario(analistasdePerfilVO.getIdUsuario());

		return analistasdePerfil;
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
