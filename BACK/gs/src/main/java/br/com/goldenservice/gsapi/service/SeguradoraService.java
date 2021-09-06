package br.com.goldenservice.gsapi.service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.goldenservice.gsapi.entities.Seguradora;
import br.com.goldenservice.gsapi.exception.SeguradoraException;
import br.com.goldenservice.gsapi.repository.SeguradoRepository;
import br.com.goldenservice.gsapi.vo.SeguradoraVO;

@Service
public class SeguradoraService {

    @Autowired
    public SeguradoRepository seguradoRepository;

    // com paginacao
    public List<SeguradoraVO> findAllVO(Integer pagina, Integer qtdRegistros, Integer id) throws Exception {
        Pageable page = null;
        List<Seguradora> listSeguradora = null;
        List<Seguradora> listSeguradoPaginacao = null;
        List<SeguradoraVO> listSeguradoraVO = new ArrayList<>();

        try {
            if (null != pagina && null != qtdRegistros) {

                page = PageRequest.of(pagina, qtdRegistros);
                listSeguradoPaginacao = seguradoRepository.findAllByAtivoTrueOrderById(page).getContent();

                for (Seguradora lSeguradora : listSeguradoPaginacao) {
                    listSeguradoraVO.add(convertEntidadeParaVO(lSeguradora));
                }

            } else {
                listSeguradora = seguradoRepository.findAll();

                for (Seguradora lSeguradora : listSeguradora) {
                    listSeguradoraVO.add(convertEntidadeParaVO(lSeguradora));
                }

            }
        } catch (Exception e) {
            throw new Exception("Não foi possível recuperar a lista de seguradora ::" + e.getMessage());
        }

        return listSeguradoraVO;
    }
    
 // Listar todos
 	public List<SeguradoraVO> obterTodos(Integer idUsuario) throws SeguradoraException {
 		try {
 			List<Seguradora> seguradoras = seguradoRepository.findAll();
 			List<SeguradoraVO> seguradorasVO = new ArrayList<SeguradoraVO>();
 			for (Seguradora seguradora : seguradoras) {
				seguradorasVO.add(convertEntidadeParaVO(seguradora));
			}
 			return seguradorasVO;
 		} catch (Exception e) {
 			throw new SeguradoraException("Falha ao listar tecnologias");
 		}
 	}

    // Listar por Id
    public SeguradoraVO obterPorId(Integer id) throws SeguradoraException {
        try {
            Optional<Seguradora> seguradora = seguradoRepository.findById(id);
            return convertEntidadeParaVO(seguradora.get());
        } catch (Exception e) {
            throw new SeguradoraException("Id não encontrado!");
        }
    }

    // Inserir
    public SeguradoraVO adicionar(SeguradoraVO seguradoraVO) throws SeguradoraException {
        Seguradora seguradora = new Seguradora();
        seguradora = converteVOParaEntidade(seguradoraVO);
        try {
            seguradoRepository.save(seguradora);
        } catch (Exception e) {
            throw new SeguradoraException("Erro ao adicionar seguradora");
        }
        return convertEntidadeParaVO(seguradora);

    }

    // Atualizar
    public SeguradoraVO atualizar(Integer id, SeguradoraVO seguradoraVO) throws SeguradoraException {
        Seguradora seguradora = converteVOParaEntidade(seguradoraVO);
        try {
            seguradora.setId(id);
            return convertEntidadeParaVO(this.seguradoRepository.save(seguradora));
        } catch (Exception e) {
            throw new SeguradoraException("Id não encontrado");
        }
    }

    // Deletar
    public String deletar(Integer id) throws SeguradoraException {
        Optional<Seguradora> seguradoraOptionalOptional = seguradoRepository.findById(id);
        try {
            if (seguradoraOptionalOptional.isPresent()) {
                seguradoraOptionalOptional.get().setAtivo(false);
                seguradoRepository.save(seguradoraOptionalOptional.get());
            }
        } catch (Exception e) {
            throw new SeguradoraException("Id não encontrado");
        }
        return "Seguradorada deletada";
    }

    // Número de elementos
    public Integer numeroElementos() {
        List<Seguradora> seguradoras = seguradoRepository.findAllByAtivoTrue();
        return seguradoras.size();
    }
    
    // Pesquisa por letras e Palavras
 	public List<SeguradoraVO> pesquisa(String keyword) throws SeguradoraException {
 		try {
 			List<Seguradora> segs = new ArrayList<Seguradora>();
 			List<SeguradoraVO> segsVO = new ArrayList<SeguradoraVO>();
 			if(testeNumero(keyword)) {
				segs = seguradoRepository.findAllByIdAndAtivoTrue(Integer.parseInt(keyword));
			}else {
				segs = seguradoRepository.findAllByNomeContainingIgnoreCaseAndAtivoTrue(keyword);
			}
 			for (Seguradora seguradora : segs) {
				segsVO.add(convertEntidadeParaVO(seguradora));
			}
 			return segsVO;
 		} catch (Exception e) {
			throw new SeguradoraException("Não foi possível recuperar a lista de Seguradoras");
		}
	}
    
    	// Converter VO
    	Seguradora converteVOParaEntidade(SeguradoraVO seguradoraVO) {
        Seguradora seguradora = new Seguradora();
        seguradora.setId(seguradoraVO.getId());
        seguradora.setNome(seguradoraVO.getNome());
        seguradora.setDescricao(seguradoraVO.getDescricao());
        seguradora.setAtivo(seguradoraVO.getAtivo());
        seguradora.setIdUsuario(seguradoraVO.getIdUsuario());

        return seguradora;
    }

    	// Converter entidade
    private SeguradoraVO convertEntidadeParaVO(Seguradora seguradora) {
        SeguradoraVO seguradoraVO = new SeguradoraVO();
        seguradoraVO.setId(seguradora.getId());
        seguradoraVO.setNome(seguradora.getNome());
        seguradoraVO.setDescricao(seguradora.getDescricao());
        seguradoraVO.setAtivo(seguradora.getAtivo());
        seguradoraVO.setIdUsuario(seguradora.getIdUsuario());

        return seguradoraVO;
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
