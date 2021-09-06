package br.com.goldenservice.gsapi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.goldenservice.gsapi.entities.Tecnologia;
import br.com.goldenservice.gsapi.entities.TiposDeComunicacao;
import br.com.goldenservice.gsapi.exception.TecnologiaRastreamentoException;
import br.com.goldenservice.gsapi.repository.TecnologiaRepository;
import br.com.goldenservice.gsapi.repository.TiposDeComunicacaoRepository;
import br.com.goldenservice.gsapi.vo.TecnologiaVO;

@Service
public class TecnologiaService {

	@Autowired
	TecnologiaRepository tecnologiaRepository;

	@Autowired
	TiposDeComunicacaoRepository tiposDeComunicacaoRepository;

	@Autowired
	ArquivoService arquivoService;


	// Listar todos
	public List<TecnologiaVO> obterTodos(Integer idUsuario) throws TecnologiaRastreamentoException {
		try {
			List<Tecnologia> tecs = tecnologiaRepository.findAll();
			List<TecnologiaVO> tecsVO = new ArrayList<TecnologiaVO>();
			for (Tecnologia tec : tecs) {
				tecsVO.add(converterEntidadeParaVO(tec));
			}
			return tecsVO;
		} catch (Exception e) {
			throw new TecnologiaRastreamentoException("Falha ao listar tecnologias");
		}
	}

	// Listar por Id
	public TecnologiaVO obterPorId(Integer id) throws TecnologiaRastreamentoException {
		try {
			Optional<Tecnologia> tecnologia = tecnologiaRepository.findById(id);
			return converterEntidadeParaVO(tecnologia.get());
		} catch (Exception e) {
			throw new TecnologiaRastreamentoException("Id não encontrado!");
		}
	}

	// Pesquisa por letras e Palavras
	public List<TecnologiaVO> pesquisa(String keyword) throws TecnologiaRastreamentoException {
		try {
			List<Tecnologia> tecs = new ArrayList<Tecnologia>();
			List<TecnologiaVO> tecsVO = new ArrayList<TecnologiaVO>();
			if(testeNumero(keyword)) {
				tecs = tecnologiaRepository.findAllByIdAndAtivoTrue(Integer.parseInt(keyword));
			}else {
				tecs = tecnologiaRepository.findAllByNomeContainingIgnoreCaseAndAtivoTrue(keyword);
			}
			for (Tecnologia tecnologia : tecs) {
				tecsVO.add(converterEntidadeParaVO(tecnologia));
			}
			return tecsVO;

		} catch (Exception e) {
			throw new TecnologiaRastreamentoException("Não foi possível recuperar a lista de Tecnologia");
		}
	}
	
	// Paginação
	public List<TecnologiaVO> findAllVO(Integer pagina, Integer qtdRegistros, Integer id) throws Exception {
		Pageable pageable = PageRequest.of(pagina, qtdRegistros);
		Page<Tecnologia> tecnologia = tecnologiaRepository.findAllByAtivoTrueOrderById(pageable);
		System.out.println(tecnologia);
		List<TecnologiaVO> tecnologiaVO = new ArrayList<TecnologiaVO>();
		try {
			for (Tecnologia tec : tecnologia) {

				tecnologiaVO.add(converterEntidadeParaVO(tec));
			}
		} catch (Exception e) {
			throw new TecnologiaRastreamentoException("Não foi possível recuperar a lista de Tecnologia");
		}
		return tecnologiaVO;
	}

	//Save com imagem
	public TecnologiaVO saveVO(TecnologiaVO tecnologiaVo) {
		Tecnologia novoTEC = converterVOParaEntidade(tecnologiaVo);
		Tecnologia tecnologia = tecnologiaRepository.save(novoTEC);

		//Salva a imagem na pasta usando o id do produto e o nome da imagem
		String fileName = arquivoService.storeFile(tecnologiaVo.getImagemUpload());

		//Atualiza o nome da imagem do produto no banco
		tecnologia.setImagem(fileName);
		tecnologia = tecnologiaRepository.save(tecnologia);

		return converterEntidadeParaVO(tecnologia);
	}



	// Inserir
	public TecnologiaVO adicionar(TecnologiaVO tecnologiaVO) throws TecnologiaRastreamentoException {
		Tecnologia tecnologia = converterVOParaEntidade(tecnologiaVO);
		try {
			tecnologia = this.tecnologiaRepository.save(tecnologia);
			return converterEntidadeParaVO(tecnologia);
		} catch (Exception e) {
			throw new TecnologiaRastreamentoException("Erro ao adicionar Tecnologia");
		}
	}

	// Atualizar
	public TecnologiaVO atualizar(Integer id, TecnologiaVO tecnologiaVO) throws TecnologiaRastreamentoException {
		Tecnologia tecnologia = converterVOParaEntidade(tecnologiaVO);
		try {
			tecnologia.setId(id);
			return converterEntidadeParaVO(this.tecnologiaRepository.save(tecnologia));
		} catch (Exception e) {
			throw new TecnologiaRastreamentoException("Id não encontrado");
		}
	}

	// Deletar
	public String deletar(Integer id) throws TecnologiaRastreamentoException {
		Optional<Tecnologia> tecOptional = tecnologiaRepository.findById(id);
		try {
			if (tecOptional.isPresent()) {
				tecOptional.get().setAtivo(false);
				tecnologiaRepository.save(tecOptional.get());
			}
		} catch (Exception e) {
			throw new TecnologiaRastreamentoException("Id não encontrado");
		}
		return "Tecnologia deletada";
	}

	// Número de elementos
	public Integer numeroElementos() {
		List<Tecnologia> tecnologias = tecnologiaRepository.findAllByAtivoTrue();
		return tecnologias.size();
	}
	
	// Converter vo
	private Tecnologia converterVOParaEntidade(TecnologiaVO tecnologiaVO) {
		Tecnologia tecnologia = new Tecnologia();
		tecnologia.setId(tecnologiaVO.getId());
		tecnologia.setNome(tecnologiaVO.getNome());
		tecnologia.setDescricao(tecnologiaVO.getDescricao());
		tecnologia.setImagem(tecnologiaVO.getImagem());
		tecnologia.setAtivo(tecnologiaVO.getAtivo());
		tecnologia.setIdUsuario(tecnologiaVO.getIdUsuario());
		
		tecnologiaVO.getTipo_de_comunicacao().forEach(id -> {
			Optional<TiposDeComunicacao> t = tiposDeComunicacaoRepository.findById(id);
			System.out.println("teste" + t.get());
			if (t.isPresent()) {
				tecnologia.getTipo_de_comunicacao().add(t.get());
			}
		});
		return tecnologia;
	}

	private TecnologiaVO converterEntidadeParaVO(Tecnologia tecnologia) {
		TecnologiaVO tecnologiaVo = new TecnologiaVO();
		tecnologiaVo.setId(tecnologia.getId());
		tecnologiaVo.setNome(tecnologia.getNome());
		tecnologiaVo.setDescricao(tecnologia.getDescricao());
		tecnologiaVo.setImagem(tecnologia.getImagem());
		tecnologiaVo.setAtivo(tecnologia.getAtivo());
		tecnologiaVo.setTiposDeComunicacao(tecnologia.getTipo_de_comunicacao());
		tecnologiaVo.setIdUsuario(tecnologia.getId());
		return tecnologiaVo;
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
