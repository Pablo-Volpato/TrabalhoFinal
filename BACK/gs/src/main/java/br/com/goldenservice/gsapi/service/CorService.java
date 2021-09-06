package br.com.goldenservice.gsapi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.goldenservice.gsapi.entities.Cor;
import br.com.goldenservice.gsapi.exception.CorException;
import br.com.goldenservice.gsapi.repository.CorRepository;
import br.com.goldenservice.gsapi.vo.CorVO;

@Service
public class CorService {

	@Autowired
	public CorRepository corRepository;

	// Listar por Id
	public CorVO findById(Integer id) throws CorException {
		try {
			return converteEntidadeParaVO(corRepository.findById(id).get());
		} catch (Exception e) {
			throw new CorException("Id não encontrado");
		}
	}

	// Listar
	public List<CorVO> findAll(Integer idUsuario) throws CorException {
		try {
			List<Cor> cores = corRepository.findAll();
			List<CorVO> coresVO = new ArrayList<CorVO>();
			for (Cor cor : cores) {
				coresVO.add(converteEntidadeParaVO(cor));
			}
			return coresVO;
		} catch (Exception e) {
			throw new CorException("Não foi possível listar as cores selecionadas");
		}
	}

	// Paginação
	public List<CorVO> findAllVO(Integer pagina, Integer qtdRegistros) throws Exception {
		Pageable page = null;
		List<Cor> listCor = null;
		List<Cor> listCorPaginacao = null;
		List<CorVO> listCorVO = new ArrayList<>();

		try {
			if (null != pagina && null != qtdRegistros) {

				page = PageRequest.of(pagina, qtdRegistros);
				listCorPaginacao = corRepository.findAllByAtivoTrueOrderById(page).getContent();

				for (Cor lCor : listCorPaginacao) {
					listCorVO.add(converteEntidadeParaVO(lCor));
				}

			} else {
				listCor = corRepository.findAll();

				for (Cor lCor : listCor) {
					listCorVO.add(converteEntidadeParaVO(lCor));
				}
			}
		} catch (Exception e) {
			throw new Exception("Não foi possível recuperar a lista de marcas! ::" + e.getMessage());
		}
		return listCorVO;
	}

	// Inserir
	public CorVO createNewCor(CorVO corVO) throws CorException {
		Cor cor = new Cor();
		cor = converteVOParaEntidade(corVO);
		try {
			corRepository.save(cor);
		} catch (Exception e) {
			throw new CorException("Não foi possível adicionar as cores solicitadas!");
		}
		return converteEntidadeParaVO(cor);
	}

	// Atualizar
	public CorVO updateCor(Integer id, CorVO corVO) throws CorException {
		Cor cor = new Cor();
		cor = converteVOParaEntidade(corVO);
		try {
			cor.setId(id);
			corRepository.save(cor);
		} catch (Exception e) {
			throw new CorException("Id não encontrado!");
		}
		return converteEntidadeParaVO(cor);
	}

	// Deletar
	public String deletar(Integer id) throws CorException {
		Optional<Cor> tecOptional = corRepository.findById(id);
		try {
			if (tecOptional.isPresent()) {
				tecOptional.get().setAtivo(false);
				corRepository.save(tecOptional.get());
			}
		} catch (Exception e) {
			throw new CorException("Id não encontrado!");
		}
		return "Cor deletada com sucesso!";
	}

	// Número de elementos
	public Integer numeroElementos() {
		List<Cor> cores = corRepository.findAllByAtivoTrue();
		return cores.size();
	}

	// Pesquisa por letras e Palavras
//	public List<Cor> pesquisa(String keyword) throws CorException {
//		try {
//			List<Cor> tecnologia = corRepository.findAllByCorContainingIgnoreCaseAndAtivoTrue(keyword);
//			return tecnologia;
//		} catch (Exception e) {
//			throw new CorException("Não foi possível recuperar a lista de Cores");
//		}
//	}

	public List<CorVO> pesquisa(String keyword) throws CorException {
		List<Cor> cors = new ArrayList<Cor>();

		List<CorVO> corVOS = new ArrayList<CorVO>();
		try {
			if(testeNumero(keyword)) {
				cors = corRepository.findAllByIdAndAtivoTrue(Integer.parseInt(keyword));
			}else {
				cors = corRepository.findAllByCorContainingIgnoreCaseAndAtivoTrue(keyword);

			}
			for (Cor c : cors) {
				corVOS.add(converteEntidadeParaVO(c));
			}

		} catch (Exception e) {
			throw new CorException("Id não encontrado");
		}
		return corVOS;
	}


	// Converter Entidade
	private Cor converteVOParaEntidade(CorVO corVO) throws CorException {
		Cor cor = new Cor();
		cor.setCor(RegexCor(corVO.getCor()));
		cor.setId(corVO.getId());
		cor.setAtivo(cor.getAtivo());
		cor.setIdUsuario(corVO.getIdUsuario());
		return cor;
	}

	// Converter vo
	private CorVO converteEntidadeParaVO(Cor cor) {
		CorVO corVO = new CorVO();
		corVO.setCor(cor.getCor());
		corVO.setId(cor.getId());
		corVO.setAtivo(cor.getAtivo());
		corVO.setIdUsuario(cor.getIdUsuario());
		return corVO;
	}

	// impossibilitando caracteres especiais
	private String RegexCor(String s) throws CorException {
		Pattern p = Pattern.compile("[-a-zA-Z\\s]{1,50}");
		Matcher m = p.matcher(s);
		Boolean b = m.matches();
		if (b) {
			return s;
		} else {
			throw new CorException("Caracter invalido");
		}
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
