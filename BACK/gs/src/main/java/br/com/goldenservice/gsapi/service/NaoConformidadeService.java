package br.com.goldenservice.gsapi.service;


import br.com.goldenservice.gsapi.entities.NaoConformidade;
import br.com.goldenservice.gsapi.exception.NaoConformidadeException;
import br.com.goldenservice.gsapi.repository.NaoConformidadeRepository;
import br.com.goldenservice.gsapi.vo.NaoConformidadeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NaoConformidadeService {

    @Autowired
    NaoConformidadeRepository naoConformidadeRepository;

    // Listar Todos
    public List<NaoConformidadeVO> findAll(Integer idUsuario) throws NaoConformidadeException {
        try {
            List<NaoConformidade> naoConformidades =  naoConformidadeRepository.findAll();
            List<NaoConformidadeVO> naoConformidadeVO = new ArrayList<NaoConformidadeVO>();
            for (NaoConformidade naoConformidade : naoConformidades) {
                naoConformidadeVO.add(convertEntidadeParaVO(naoConformidade));
            }
            return naoConformidadeVO;
        } catch (Exception e) {
            throw new NaoConformidadeException("Erro ao listar não conformidades");
        }
    }


    // Listar por Id
    public NaoConformidadeVO findById(Integer id) throws NaoConformidadeException {
        try {
            return convertEntidadeParaVO( naoConformidadeRepository.findById(id).get());
        } catch (Exception e) {
            throw new NaoConformidadeException("Id não encontrado");
        }
    }


    // Paginacao
    public List<NaoConformidadeVO> findAllVO(Integer pagina, Integer qtdRegistros, Integer id) throws Exception {
        Pageable page = null;
        List<NaoConformidade> listNaoConformidade = null;
        List<NaoConformidade> listNaoConformidadePaginacao = null;
        List<NaoConformidadeVO> listNaoConformidadeVO = new ArrayList<>();

        try {
            if (null != pagina && null != qtdRegistros) {

                page = PageRequest.of(pagina, qtdRegistros);
                listNaoConformidadePaginacao = naoConformidadeRepository.findAllByAtivoTrueOrderById(page).getContent();

                for (NaoConformidade lNaoConformidade : listNaoConformidadePaginacao) {
                    listNaoConformidadeVO.add(convertEntidadeParaVO(lNaoConformidade));
                }

            } else {
                listNaoConformidade = naoConformidadeRepository.findAll();

                for (NaoConformidade lNaoConformidade : listNaoConformidade) {
                    listNaoConformidadeVO.add(convertEntidadeParaVO(lNaoConformidade));
                }

            }
        } catch (Exception e) {
            throw new Exception("Não foi possível recuperar a lista de não conformidades ::" + e.getMessage());
        }

        return listNaoConformidadeVO;
    }

    // Número de elementos
    public Integer numeroElementos() {
        List<NaoConformidade> naoConformidades = naoConformidadeRepository.findAllByAtivoTrue();
        return naoConformidades.size();
    }

    // Atualizar
    public NaoConformidadeVO updateMarca(Integer id, NaoConformidadeVO naoConformidadeVO) throws NaoConformidadeException {
        NaoConformidade naoConformidade = converteVOParaEntidade(naoConformidadeVO);
        try {
            naoConformidade.setId(id);
            return convertEntidadeParaVO( naoConformidadeRepository.save(naoConformidade));
        } catch (Exception e) {
            throw new NaoConformidadeException("Id não encontrado");
        }
    }

    // Deletar
    public String deletar(Integer id) throws NaoConformidadeException {
        Optional<NaoConformidade> tecOptional = naoConformidadeRepository.findById(id);
        try {
            if (tecOptional.isPresent()) {
                tecOptional.get().setAtivo(false);
                naoConformidadeRepository.save(tecOptional.get());
            }
        } catch (Exception e) {
            throw new NaoConformidadeException("Id não encontrado");
        }
        return "Não conformidade deletada";
    }


    // Inserir
    public NaoConformidadeVO inserir(NaoConformidadeVO naoConformidadeVO) throws NaoConformidadeException {
        NaoConformidade naoConformidade = new NaoConformidade();
        naoConformidade = converteVOParaEntidade(naoConformidadeVO);
        try {
            naoConformidadeRepository.save(naoConformidade);
        } catch (Exception e) {
            throw new NaoConformidadeException("Erro ao adicionar não conformidade");
        }
        return convertEntidadeParaVO(naoConformidade);

    }

    // Pesquisar
    public List<NaoConformidadeVO> pesquisar(String keyword) throws NaoConformidadeException {
        List<NaoConformidade> naoConformidades = new ArrayList<NaoConformidade>();
        List<NaoConformidadeVO> naoConformidadeVO = new ArrayList<NaoConformidadeVO>();
        try {
        	if(testeNumero(keyword)) {
				naoConformidades = naoConformidadeRepository.findAllByIdAndAtivoTrue(Integer.parseInt(keyword));
			}else {
				naoConformidades = naoConformidadeRepository.findAllByNaturezaDoEventoContainingIgnoreCaseAndAtivoTrue(keyword);	
			}
            for (NaoConformidade naoConformidade : naoConformidades) {
                naoConformidadeVO.add(convertEntidadeParaVO(naoConformidade));
            }

        } catch (Exception e) {
            throw new NaoConformidadeException("Id não encontrado");
        }
        return naoConformidadeVO;
    }


    // Converte Entidade para VO
    private NaoConformidadeVO convertEntidadeParaVO(NaoConformidade naoConformidade) {
        NaoConformidadeVO naoConformidadeVO = new NaoConformidadeVO();

        naoConformidadeVO.setId(naoConformidade.getId());
        naoConformidadeVO.setNaturezaDoEvento(naoConformidade.getNaturezaDoEvento());
        naoConformidadeVO.setAtivo(naoConformidade.getAtivo());
        naoConformidadeVO.setIdUsuario(naoConformidade.getIdUsuario());
        naoConformidadeVO.setCausaRaiz(naoConformidade.getCausaRaiz());
        naoConformidadeVO.setProcessoMacro(naoConformidade.getProcessoMacro());



        return naoConformidadeVO;
    }


    // Converte VO para Entidade
    private NaoConformidade converteVOParaEntidade(NaoConformidadeVO naoConformidadeVO) {
        NaoConformidade naoConformidade = new NaoConformidade();

        naoConformidade.setId(naoConformidadeVO.getId());
        naoConformidade.setNaturezaDoEvento(naoConformidadeVO.getNaturezaDoEvento());
        naoConformidade.setAtivo(naoConformidadeVO.getAtivo());
        naoConformidade.setIdUsuario(naoConformidadeVO.getIdUsuario());
        naoConformidade.setCausaRaiz(naoConformidadeVO.getCausaRaiz());
        naoConformidade.setProcessoMacro(naoConformidadeVO.getProcessoMacro());



        return naoConformidade;
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
