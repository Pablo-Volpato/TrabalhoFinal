package br.com.goldenservice.gsapi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.goldenservice.gsapi.entities.GrupoDeVeiculos;
import br.com.goldenservice.gsapi.entities.GrupoMacroDeVeiculos;
import br.com.goldenservice.gsapi.exception.GrupoMacroDeVeiculosException;
import br.com.goldenservice.gsapi.repository.GrupoDeVeiculosRepository;
import br.com.goldenservice.gsapi.repository.GrupoMacroDeVeiculosRepository;
import br.com.goldenservice.gsapi.vo.GrupoMacroDeVeiculosVO;

@Service
public class GrupoMacroDeVeiculosService {

    @Autowired
    public GrupoMacroDeVeiculosRepository grupoMacroDeVeiculosRepository;

    @Autowired
    GrupoDeVeiculosRepository grupoDeVeiculosRepository;


    // Listar todos
    public List<GrupoMacroDeVeiculosVO> obterTodos(Integer idUsuario) throws GrupoMacroDeVeiculosException {
        try {
            List<GrupoMacroDeVeiculos> gmdvs = grupoMacroDeVeiculosRepository.findAll();
            List<GrupoMacroDeVeiculosVO> gmdvsVO = new ArrayList<GrupoMacroDeVeiculosVO>();
            for (GrupoMacroDeVeiculos gpv : gmdvs) {
                gmdvsVO.add(convertEntidadeParaVO(gpv));
            }
            return gmdvsVO;
        } catch (Exception e) {
            throw new GrupoMacroDeVeiculosException("Falha ao listar grupo de veiculos");
        }
    }


    //paginacao
    public List<GrupoMacroDeVeiculosVO> findAllVO(Integer pagina, Integer qtdRegistros, Integer id) throws Exception {
        Pageable page = null;
        List<GrupoMacroDeVeiculos> listGrupoMacroDeVeiculos = null;
        List<GrupoMacroDeVeiculos> listGrupoMacroDeVeiculosPaginacao = null;
        List<GrupoMacroDeVeiculosVO> listGrupoMacroDeVeiculosVO = new ArrayList<>();

        try {
            if (null != pagina && null != qtdRegistros) {

                page = PageRequest.of(pagina, qtdRegistros);
                listGrupoMacroDeVeiculosPaginacao = grupoMacroDeVeiculosRepository.findAllByAtivoTrueOrderById(page).getContent();

                for (GrupoMacroDeVeiculos lGrupoMacroDeVeiculos : listGrupoMacroDeVeiculosPaginacao) {
                    listGrupoMacroDeVeiculosVO.add(convertEntidadeParaVO(lGrupoMacroDeVeiculos));
                }

            } else {
                listGrupoMacroDeVeiculos = grupoMacroDeVeiculosRepository.findAll();

                for (GrupoMacroDeVeiculos lGrupoMacroDeVeiculos : listGrupoMacroDeVeiculos) {
                    listGrupoMacroDeVeiculosVO.add(convertEntidadeParaVO(lGrupoMacroDeVeiculos));
                }

            }
        } catch (Exception e) {
            throw new Exception("Não foi possível recuperar a lista de seguradora ::" + e.getMessage());
        }

        return listGrupoMacroDeVeiculosVO;
    }


    //find by id
    public GrupoMacroDeVeiculosVO obterPorId(Integer id) throws GrupoMacroDeVeiculosException {
        try {
            Optional<GrupoMacroDeVeiculos> grupoMacroDeVeiculos = grupoMacroDeVeiculosRepository.findById(id);
            return convertEntidadeParaVO(grupoMacroDeVeiculos.get());
        } catch (Exception e) {
            throw new GrupoMacroDeVeiculosException("Id não encontrado!");
        }
    }


    //inserir
    public GrupoMacroDeVeiculosVO adicionar(GrupoMacroDeVeiculosVO grupoMacroDeVeiculosVO) throws GrupoMacroDeVeiculosException {
        GrupoMacroDeVeiculos grupoMacroDeVeiculos = new GrupoMacroDeVeiculos();
        grupoMacroDeVeiculos = converteVOParaEntidade(grupoMacroDeVeiculosVO);
        try {
            grupoMacroDeVeiculosRepository.save(grupoMacroDeVeiculos);
        } catch (Exception e) {
            throw new GrupoMacroDeVeiculosException("Erro ao adicionar seguradora");
        }
        return convertEntidadeParaVO(grupoMacroDeVeiculos);

    }


    //atualizar
    public GrupoMacroDeVeiculosVO atualizar(Integer id, GrupoMacroDeVeiculosVO grupoMacroDeVeiculosVO) throws GrupoMacroDeVeiculosException {
        GrupoMacroDeVeiculos grupoMacroDeVeiculos = converteVOParaEntidade(grupoMacroDeVeiculosVO);
        try {
            grupoMacroDeVeiculos.setId(id);
            return convertEntidadeParaVO(this.grupoMacroDeVeiculosRepository.save(grupoMacroDeVeiculos));
        } catch (Exception e) {
            throw new GrupoMacroDeVeiculosException("Id não encontrado");
        }
    }


    //deletar
    public String deletar(Integer id) throws GrupoMacroDeVeiculosException {
        Optional<GrupoMacroDeVeiculos> gmdvOptional = grupoMacroDeVeiculosRepository.findById(id);
        List<GrupoDeVeiculos> grupoDeVeiculos = grupoDeVeiculosRepository.findAllByGrupoMacroDeVeiculos(gmdvOptional.get());
        try {
            if (gmdvOptional.isPresent()) {

                if(grupoDeVeiculos.isEmpty()){
                gmdvOptional.get().setAtivo(false);
                grupoMacroDeVeiculosRepository.save(gmdvOptional.get());
                    return "Grupo macro de veículos deletado";

                }
            }
        } catch (Exception e) {
            throw new GrupoMacroDeVeiculosException("Id não encontrado");
        }

        return null;
    }



    //num elementos
    public Integer numeroElementos() {
        List<GrupoMacroDeVeiculos> grupoMacroDeVeiculos = grupoMacroDeVeiculosRepository.findAllByAtivoTrue();
        return grupoMacroDeVeiculos.size();
    }


    //pesquisa
//    public List<GrupoMacroDeVeiculosVO> pesquisa(String keyword) throws GrupoMacroDeVeiculosException {
//        try {
//            List<GrupoMacroDeVeiculos> grupoMacroDeVeiculos = grupoMacroDeVeiculosRepository.findAllByNomeContainingIgnoreCaseAndAtivoTrue(keyword);
//            List<GrupoMacroDeVeiculosVO> grupoMacroDeVeiculosVO = new ArrayList<GrupoMacroDeVeiculosVO>();
//            for (GrupoMacroDeVeiculos grupoMacroDeVeiculo : grupoMacroDeVeiculos) {
//				grupoMacroDeVeiculosVO.add(convertEntidadeParaVO(grupoMacroDeVeiculo));
//			}
//            return grupoMacroDeVeiculosVO;
//
//        } catch (Exception e) {
//            throw new GrupoMacroDeVeiculosException("Não foi possível recuperar a lista de Tecnologia");
//        }
//
//    }

    public List<GrupoMacroDeVeiculosVO> pesquisa(String keyword) throws GrupoMacroDeVeiculosException {
        List<GrupoMacroDeVeiculos> grupoMacroDeVeiculos = new ArrayList<GrupoMacroDeVeiculos>();

        List<GrupoMacroDeVeiculosVO> grupoMacroDeVeiculosVOS = new ArrayList<GrupoMacroDeVeiculosVO>();
        try {
            if(testeNumero(keyword)) {
                grupoMacroDeVeiculos = grupoMacroDeVeiculosRepository.findAllByIdAndAtivoTrue(Integer.parseInt(keyword));
            }else {
                grupoMacroDeVeiculos = grupoMacroDeVeiculosRepository.findAllByNomeContainingIgnoreCaseAndAtivoTrue(keyword);

            }
            for (GrupoMacroDeVeiculos g : grupoMacroDeVeiculos) {
                grupoMacroDeVeiculosVOS.add(convertEntidadeParaVO(g));
            }

        } catch (Exception e) {
            throw new GrupoMacroDeVeiculosException("Id não encontrado");
        }
        return grupoMacroDeVeiculosVOS;
    }




    private GrupoMacroDeVeiculos converteVOParaEntidade(GrupoMacroDeVeiculosVO grupoMacroDeVeiculosVO) {
        GrupoMacroDeVeiculos grupoMacroDeVeiculos = new GrupoMacroDeVeiculos();

        grupoMacroDeVeiculos.setId(grupoMacroDeVeiculosVO.getId());
        grupoMacroDeVeiculos.setNome(grupoMacroDeVeiculosVO.getNome());
        grupoMacroDeVeiculos.setAtivo(grupoMacroDeVeiculosVO.getAtivo());
        grupoMacroDeVeiculos.setIdUsuario(grupoMacroDeVeiculosVO.getIdUsuario());

        return grupoMacroDeVeiculos;
    }

    private GrupoMacroDeVeiculosVO convertEntidadeParaVO(GrupoMacroDeVeiculos grupoMacroDeVeiculos) {
        GrupoMacroDeVeiculosVO grupoMacroDeVeiculosVO = new GrupoMacroDeVeiculosVO();

        grupoMacroDeVeiculosVO.setId(grupoMacroDeVeiculos.getId());
        grupoMacroDeVeiculosVO.setNome(grupoMacroDeVeiculos.getNome());
        grupoMacroDeVeiculosVO.setAtivo(grupoMacroDeVeiculos.getAtivo());
        grupoMacroDeVeiculosVO.setIdUsuario(grupoMacroDeVeiculos.getIdUsuario());

        return grupoMacroDeVeiculosVO;
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
