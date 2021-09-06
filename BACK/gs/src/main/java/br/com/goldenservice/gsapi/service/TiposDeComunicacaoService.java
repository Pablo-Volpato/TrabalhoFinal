package br.com.goldenservice.gsapi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.goldenservice.gsapi.entities.TiposDeComunicacao;
import br.com.goldenservice.gsapi.exception.TiposDeComunicacaoException;
import br.com.goldenservice.gsapi.repository.TiposDeComunicacaoRepository;
import br.com.goldenservice.gsapi.vo.TiposDeComunicacaoVO;

@Service
public class TiposDeComunicacaoService {

	@Autowired
	public TiposDeComunicacaoRepository tiposDeComunicacaoRepository;

	@Autowired
	public ArquivoService arquivoService;


	// Find by Id
	public TiposDeComunicacaoVO findById(Integer id) throws TiposDeComunicacaoException {
		try {
			return convertEntidadeParaVO( tiposDeComunicacaoRepository.findById(id).get());
		} catch (Exception e) {
			throw new TiposDeComunicacaoException("Id não encontrado");
		}
	}


	// Find All
	public List<TiposDeComunicacaoVO> findAll(Integer idUsuario) throws TiposDeComunicacaoException {
		try {
			List<TiposDeComunicacao>tdcs = tiposDeComunicacaoRepository.findAll();
			List<TiposDeComunicacaoVO> tdcsVO = new ArrayList<TiposDeComunicacaoVO>();
			for (TiposDeComunicacao tiposDeComunicacao : tdcs) {
				tdcsVO.add(convertEntidadeParaVO(tiposDeComunicacao));
			}
			return tdcsVO;
		} catch (Exception e) {
			throw new TiposDeComunicacaoException("Erro ao listar tipos de comunicação");
		}
	}




	// com paginacao
	public List<TiposDeComunicacaoVO> findAllVO(Integer pagina, Integer qtdRegistros, Integer id) throws Exception {
		Pageable page = null;
		List<TiposDeComunicacao> listTiposDeComunicacao = null;
		List<TiposDeComunicacao> listTiposDeComunicacaoPaginacao = null;
		List<TiposDeComunicacaoVO> listTiposDeComunicacaoVO = new ArrayList<>();

		try {
			if (null != pagina && null != qtdRegistros) {

				page = PageRequest.of(pagina, qtdRegistros);
				listTiposDeComunicacaoPaginacao = tiposDeComunicacaoRepository.findAllByAtivoTrueOrderById(page).getContent();

				for (TiposDeComunicacao lTiposDeComunicacao : listTiposDeComunicacaoPaginacao) {
					listTiposDeComunicacaoVO.add(convertEntidadeParaVO(lTiposDeComunicacao));
				}

			} else {
				listTiposDeComunicacao = tiposDeComunicacaoRepository.findAll();

				for (TiposDeComunicacao lTiposDeComunicacao : listTiposDeComunicacao) {
					listTiposDeComunicacaoVO.add(convertEntidadeParaVO(lTiposDeComunicacao));
				}

			}
		} catch (Exception e) {
			throw new Exception("Não foi possível recuperar a lista de Tipos de comunicação ::" + e.getMessage());
		}

		return listTiposDeComunicacaoVO;
	}



	// Delete by Id
	public String deleteTiposDeComunicacao(Integer id) throws TiposDeComunicacaoException {
		Optional<TiposDeComunicacao> tecOptional = tiposDeComunicacaoRepository.findById(id);
		try {
			if (tecOptional.isPresent()) {
				tecOptional.get().setAtivo(false);
				tiposDeComunicacaoRepository.save(tecOptional.get());
			}
		} catch (Exception e) {
			throw new TiposDeComunicacaoException("Id não encontrado");
		}
		return "Tipo de comunicação  deletada";
	}


	//Save com imagem
	public TiposDeComunicacaoVO saveVO(TiposDeComunicacaoVO tiposDeComunicacaoVO) {
		TiposDeComunicacao novoTDC = converteVOParaEntidade(tiposDeComunicacaoVO);
		TiposDeComunicacao tiposDeComunicacao = tiposDeComunicacaoRepository.save(novoTDC);

		//Salva a imagem na pasta usando o id do produto e o nome da imagem
		String fileName = arquivoService.storeFile(tiposDeComunicacaoVO.getImagemUpload());

		//Atualiza o nome da imagem do produto no banco
		tiposDeComunicacao.setImagem(fileName);
		tiposDeComunicacao = tiposDeComunicacaoRepository.save(tiposDeComunicacao);

		return convertEntidadeParaVO(tiposDeComunicacao);
	}

	// Inserir
	public TiposDeComunicacaoVO createNewTipoDeComunicacao(TiposDeComunicacaoVO tiposDeComunicacaoVO) throws TiposDeComunicacaoException {
		TiposDeComunicacao tiposDeComunicacao = new TiposDeComunicacao();
		tiposDeComunicacao = converteVOParaEntidade(tiposDeComunicacaoVO);
		try {
			tiposDeComunicacaoRepository.save(tiposDeComunicacao);			
		} catch (Exception e) {
			throw new TiposDeComunicacaoException("Erro ao adicionar dispositivo de comunicação");
		}
		return convertEntidadeParaVO(tiposDeComunicacao);

	}



	// Update
	public TiposDeComunicacaoVO updateTiposDeComunicacao(Integer id, TiposDeComunicacaoVO tiposDeComunicacaoVO) throws TiposDeComunicacaoException {
		TiposDeComunicacao tiposDeComunicacao = converteVOParaEntidade(tiposDeComunicacaoVO);
		try {
			tiposDeComunicacao.setId(id);
			return convertEntidadeParaVO(tiposDeComunicacaoRepository.save(tiposDeComunicacao));
		} catch (Exception e) {
			throw new TiposDeComunicacaoException("Id não encontrado");
		}
	}







	// Número de elementos
	public Integer numeroElementos() {
		List<TiposDeComunicacao> tiposDeComunicacaos = tiposDeComunicacaoRepository.findAllByAtivoTrue();
		return tiposDeComunicacaos.size();
	}




	// Pesquisa por letras e Palavras
	public List<TiposDeComunicacaoVO> pesquisa(String keyword) throws TiposDeComunicacaoException {
			try {
				List<TiposDeComunicacao> tipoCom = new ArrayList<TiposDeComunicacao>();
				List<TiposDeComunicacaoVO> tipoComVO = new ArrayList<TiposDeComunicacaoVO>();
				if(testeNumero(keyword)) {
					tipoCom = tiposDeComunicacaoRepository.findAllByIdAndAtivoTrue(Integer.parseInt(keyword));
				}else {
					tipoCom = tiposDeComunicacaoRepository.findAllByNomeContainingIgnoreCaseAndAtivoTrue(keyword);	
				}
				for (TiposDeComunicacao tiposDeComunicacao : tipoCom) {
					tipoComVO.add(convertEntidadeParaVO(tiposDeComunicacao));
				}
				return tipoComVO;

			} catch (Exception e) {
				throw new TiposDeComunicacaoException("Não foi possível recuperar a lista de Tipos de comunicação");
			}

		}

	private TiposDeComunicacaoVO convertEntidadeParaVO(TiposDeComunicacao tiposDeComunicacao) {
		TiposDeComunicacaoVO tiposDeComunicacaoVO = new TiposDeComunicacaoVO();
		tiposDeComunicacaoVO.setId(tiposDeComunicacao.getId());
		tiposDeComunicacaoVO.setNome(tiposDeComunicacao.getNome());
		tiposDeComunicacaoVO.setDescricao(tiposDeComunicacao.getDescricao());
		tiposDeComunicacaoVO.setImagem(tiposDeComunicacao.getImagem());
		tiposDeComunicacaoVO.setAtivo(tiposDeComunicacao.getAtivo());
		tiposDeComunicacaoVO.setIdUsuario(tiposDeComunicacao.getIdUsuario());

		return tiposDeComunicacaoVO;
	}




	// Converte VO para Entidade
	private TiposDeComunicacao converteVOParaEntidade(TiposDeComunicacaoVO tiposDeComunicacaoVO) {
		TiposDeComunicacao tiposDeComunicacao = new TiposDeComunicacao();
		tiposDeComunicacao.setId(tiposDeComunicacaoVO.getId());
		tiposDeComunicacao.setNome(tiposDeComunicacaoVO.getNome());
		tiposDeComunicacao.setDescricao(tiposDeComunicacaoVO.getDescricao());
		tiposDeComunicacao.setAtivo(tiposDeComunicacaoVO.getAtivo());
		tiposDeComunicacao.setImagem(tiposDeComunicacaoVO.getImagem());
		tiposDeComunicacao.setIdUsuario(tiposDeComunicacaoVO.getIdUsuario());

		return tiposDeComunicacao;
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
