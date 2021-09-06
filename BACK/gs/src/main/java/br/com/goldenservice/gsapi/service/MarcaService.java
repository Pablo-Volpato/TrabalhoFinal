package br.com.goldenservice.gsapi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import br.com.goldenservice.gsapi.entities.Marca;
import br.com.goldenservice.gsapi.exception.MarcaException;
import br.com.goldenservice.gsapi.repository.MarcaRepository;
import br.com.goldenservice.gsapi.vo.MarcaVO;
import br.com.goldenservice.gsapi.vo.FipeMarcaVO;

@Service
public class MarcaService {
	@Autowired
	private MarcaRepository marcaRepository;

	// Listar Todos
	public List<MarcaVO> findAll(Integer idUsuario) throws MarcaException {
		try {
			List<Marca> marcas = marcaRepository.findAll();
			List<MarcaVO> marcasVO = new ArrayList<MarcaVO>();
			for (Marca marca : marcas) {
				marcasVO.add(convertEntidadeParaVO(marca));
			}
			return marcasVO;
		} catch (Exception e) {
			throw new MarcaException("Erro ao listar marcas");
		}
	}

	// Listar por Id
	public MarcaVO findById(Integer id) throws MarcaException {
		try {
			return convertEntidadeParaVO(marcaRepository.findById(id).get());
		} catch (Exception e) {
			throw new MarcaException("Id não encontrado");
		}
	}

	// Paginacao
	public List<MarcaVO> findAllVO(Integer pagina, Integer qtdRegistros, Integer id) throws Exception {
		Pageable page = null;
		List<Marca> listMarca = null;
		List<Marca> listMarcaPaginacao = null;
		List<MarcaVO> listMarcaVO = new ArrayList<>();

		try {
			if (null != pagina && null != qtdRegistros) {

				page = PageRequest.of(pagina, qtdRegistros);
				listMarcaPaginacao = marcaRepository.findAllByAtivoTrueOrderById(page).getContent();

				for (Marca lMarca : listMarcaPaginacao) {
					listMarcaVO.add(convertEntidadeParaVO(lMarca));
				}

			} else {
				listMarca = marcaRepository.findAll();

				for (Marca lMarca : listMarca) {
					listMarcaVO.add(convertEntidadeParaVO(lMarca));
				}

			}
		} catch (Exception e) {
			throw new Exception("Não foi possível recuperar a lista de Marcas ::" + e.getMessage());
		}

		return listMarcaVO;
	}

	// Número de elementos
	public Integer numeroElementos() {
		List<Marca> marcas = marcaRepository.findAllByAtivoTrue();
		return marcas.size();
	}

	// Atualizar
	public MarcaVO updateMarca(Integer id, MarcaVO marcaVO) throws MarcaException {
		Marca marca = converteVOParaEntidade(marcaVO);
		try {
			marca.setId(id);
			return convertEntidadeParaVO(marcaRepository.save(marca));
		} catch (Exception e) {
			throw new MarcaException("Id não encontrado");
		}
	}

	// Deletar
	public String deletar(Integer id) throws MarcaException {
		Optional<Marca> tecOptional = marcaRepository.findById(id);
		try {
			if (tecOptional.isPresent()) {
				tecOptional.get().setAtivo(false);
				marcaRepository.save(tecOptional.get());
			}
		} catch (Exception e) {
			throw new MarcaException("Id não encontrado");
		}
		return "Marca deletada";
	}

	// Inserir
	public MarcaVO inserir(MarcaVO marcaVO) throws MarcaException {
		Marca marca = new Marca();
		marca = converteVOParaEntidade(marcaVO);
		try {
			marcaRepository.save(marca);
		} catch (Exception e) {
			throw new MarcaException("Erro ao adicionar Marca");
		}
		return convertEntidadeParaVO(marca);

	}

	// Pesquisar
	public List<MarcaVO> pesquisar(String keyword) throws MarcaException {
		List<Marca> marcas = new ArrayList<Marca>();

		List<MarcaVO> marcasVO = new ArrayList<MarcaVO>();
		try {
			if (testeNumero(keyword)) {
				marcas = marcaRepository.findAllByIdAndAtivoTrue(Integer.parseInt(keyword));
			} else {
				marcas = marcaRepository.findAllByMarcaContainingIgnoreCaseAndAtivoTrue(keyword);

			}
			System.out.println(marcas);
			for (Marca marca : marcas) {
				marcasVO.add(convertEntidadeParaVO(marca));
			}

		} catch (Exception e) {
			throw new MarcaException("Id não encontrado");
		}
		return marcasVO;
	}

	// Converte Entidade para VO
	private MarcaVO convertEntidadeParaVO(Marca marca) {
		MarcaVO marcaVO = new MarcaVO();
		marcaVO.setId(marca.getId());
		marcaVO.setMarca(marca.getMarca());
		marcaVO.setAtivo(marca.getAtivo());
		marcaVO.setIdUsuario(marca.getIdUsuario());

		return marcaVO;
	}

	// Converte VO para Entidade
	private Marca converteVOParaEntidade(MarcaVO marcaVO) throws MarcaException {
		Marca marca = new Marca();

		marca.setId(marcaVO.getId());
		marca.setMarca(RegexMarca(marcaVO.getMarca()));
		marca.setAtivo(marcaVO.getAtivo());
		marca.setIdUsuario(marcaVO.getIdUsuario());

		return marca;
	}

	// impossibilitando caracteres especiais
	private String RegexMarca(String s) throws MarcaException {
		Pattern p = Pattern.compile("[-a-zA-Z\\s]{1,100}");
		Matcher m = p.matcher(s);
		Boolean b = m.matches();
		if (b) {
			return s;
		} else {
			throw new MarcaException("Caracter invalido");
		}
	}

	private Boolean testeNumero(String s) {
		try {
			Integer.parseInt(s);
		} catch (NumberFormatException nfe) {
			return false;
		}
		return true;
	}

	public String fipe() {

		if (!marcaRepository.existsByMarca("fipe-atualizada")) {
			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<FipeMarcaVO[]> response = restTemplate
					.getForEntity("https://parallelum.com.br/fipe/api/v1/caminhoes/marcas", FipeMarcaVO[].class);
			FipeMarcaVO[] marcasVO = response.getBody();
			for (FipeMarcaVO fipeMarcaVO : marcasVO) {
				Marca marca = new Marca();
				marca.setMarca(fipeMarcaVO.getNome());
				System.out.println(fipeMarcaVO.getNome());
				marcaRepository.save(marca);
			}
			Marca marca = new Marca();
			marca.setMarca("fipe-atualizada");
			marca.setAtivo(false);
			marcaRepository.save(marca);
		}
		return "tabela fipe atualizada";

	}

}
