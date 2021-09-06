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
import br.com.goldenservice.gsapi.entities.TipoDeDispositivo;
import br.com.goldenservice.gsapi.exception.DispositivoException;
import br.com.goldenservice.gsapi.repository.DispositivoRepository;
import br.com.goldenservice.gsapi.repository.GrupoDeVeiculosRepository;
import br.com.goldenservice.gsapi.repository.TipoDeDispositivoRepository;
import br.com.goldenservice.gsapi.vo.DispositivoVO;

@Service
public class DispositivoService {

    @Autowired
    DispositivoRepository dispositivoRepository;


    @Autowired
    GrupoDeVeiculosRepository grupoDeVeiculosRepository;
    
    @Autowired
    TipoDeDispositivoRepository tipoDeDispositivoRepository;


    public List<DispositivoVO> obterTodos(Integer idUsuario) throws DispositivoException {
        try {
            List<Dispositivo> dispositivos = dispositivoRepository.findAll();
            List<DispositivoVO> dispositivoVOS = new ArrayList<DispositivoVO>();
            for (Dispositivo dis : dispositivos) {
                dispositivoVOS.add(converterEntidadeParaVO(dis));
            }
            return dispositivoVOS;
        } catch (Exception e) {
            throw new DispositivoException("Falha ao listar Dispositivos");
        }
    }


    public DispositivoVO obterPorId(Integer id) throws DispositivoException {
        try {
            Optional<Dispositivo> dispositivo = dispositivoRepository.findById(id);
            return converterEntidadeParaVO(dispositivo.get());
        } catch (Exception e) {
            throw new DispositivoException("Id não encontrado!");
        }
    }


//    public List<DispositivoVO> pesquisa(String keyword) throws DispositivoException {
//        try {
//            List<Dispositivo> dispositivos = dispositivoRepository.findAllByNomeContainingIgnoreCaseAndAtivoTrue(keyword);
//            List<DispositivoVO> dispositivoVOS = new ArrayList<DispositivoVO>();
//            for (Dispositivo dis : dispositivos) {
//                dispositivoVOS.add(converterEntidadeParaVO(dis));
//            }
//            return dispositivoVOS;
//
//        } catch (Exception e) {
//            throw new DispositivoException("Não foi possível recuperar a lista de Dispositivos");
//        }
//    }

    public List<DispositivoVO> pesquisa(String keyword) throws DispositivoException {
        List<Dispositivo> dispositivos = new ArrayList<Dispositivo>();

        List<DispositivoVO> dispositivoVOS = new ArrayList<DispositivoVO>();
        try {
            if(testeNumero(keyword)) {
                dispositivos = dispositivoRepository.findAllByIdAndAtivoTrue(Integer.parseInt(keyword));
            }else {
                dispositivos = dispositivoRepository.findAllByNomeContainingIgnoreCaseAndAtivoTrue(keyword);

            }
            for (Dispositivo d : dispositivos) {
                dispositivoVOS.add(converterEntidadeParaVO(d));
            }

        } catch (Exception e) {
            throw new DispositivoException("Id não encontrado");
        }
        return dispositivoVOS;
    }


    // Paginação
    public List<DispositivoVO> findAllVO(Integer pagina, Integer qtdRegistros, Integer id) throws Exception {
        Pageable pageable = PageRequest.of(pagina, qtdRegistros);
        Page<Dispositivo> dispositivos = dispositivoRepository.findAllByAtivoTrueOrderById(pageable);
        System.out.println(dispositivos);
        List<DispositivoVO> dispositivoVOS = new ArrayList<DispositivoVO>();
        try {
            for (Dispositivo dis : dispositivos) {

                dispositivoVOS.add(converterEntidadeParaVO(dis));
            }
        } catch (Exception e) {
            throw new DispositivoException("Não foi possível recuperar a lista de Tecnologia");
        }
        return dispositivoVOS;
    }




    // Inserir
    public DispositivoVO adicionar(DispositivoVO dispositivoVO) throws DispositivoException {
        Dispositivo dispositivo = converterVOParaEntidade(dispositivoVO);
        try {
            dispositivo = this.dispositivoRepository.save(dispositivo);
            return converterEntidadeParaVO(dispositivo);
        } catch (Exception e) {
            throw new DispositivoException("Erro ao adicionar Dispositivo");
        }
    }

    // Atualizar
    public DispositivoVO atualizar(Integer id, DispositivoVO dispositivoVO) throws DispositivoException {
        Dispositivo dispositivo = converterVOParaEntidade(dispositivoVO);
        try {
            dispositivo.setId(id);
            return converterEntidadeParaVO(this.dispositivoRepository.save(dispositivo));
        } catch (Exception e) {
            throw new DispositivoException("Id não encontrado");
        }
    }

    // Deletar
    public String deletar(Integer id) throws DispositivoException {
        Optional<Dispositivo> disOptional = dispositivoRepository.findById(id);
        try {
            if (disOptional.isPresent()) {
                disOptional.get().setAtivo(false);
                dispositivoRepository.save(disOptional.get());
            }
        } catch (Exception e) {
            throw new DispositivoException("Id não encontrado");
        }
        return "Dispositivo deletado";
    }

    public Integer numeroElementos() {
        List<Dispositivo> dispositivos = dispositivoRepository.findAllByAtivoTrue();
        return dispositivos.size();
    }




    private Dispositivo converterVOParaEntidade(DispositivoVO dispositivoVO) {
        Dispositivo dispositivo = new Dispositivo();
        dispositivo.setId(dispositivoVO.getId());
        dispositivo.setNome(dispositivoVO.getNome());
        dispositivo.setDescricao(dispositivoVO.getDescricao());
        dispositivo.setAtivo(dispositivoVO.getAtivo());
        dispositivo.setIdUsuario(dispositivoVO.getIdUsuario());
        
        Optional<TipoDeDispositivo> gmdv = tipoDeDispositivoRepository.findById(dispositivoVO.getTipoDispositivoId());
		dispositivo.setTipoDeDispositivo(gmdv.get());

        dispositivoVO.getGrupo_de_veiculos().forEach(id -> {
            Optional<GrupoDeVeiculos> t = grupoDeVeiculosRepository.findById(id);
            if (t.isPresent()) {
                dispositivo.getGrupo_de_veiculos().add(t.get());
            }
        });
        return dispositivo;
    }



    private DispositivoVO converterEntidadeParaVO(Dispositivo dispositivo) {
        DispositivoVO dispositivoVO = new DispositivoVO();
        dispositivoVO.setId(dispositivo.getId());
        dispositivoVO.setNome(dispositivo.getNome());
        dispositivoVO.setDescricao(dispositivo.getDescricao());
        dispositivoVO.setAtivo(dispositivo.getAtivo());
        dispositivoVO.setGrupoDeVeiculos(dispositivo.getGrupo_de_veiculos());
        dispositivoVO.setIdUsuario(dispositivo.getIdUsuario());
        dispositivoVO.setTipoDeDispositivo(dispositivo.getTipoDeDispositivo());
        return dispositivoVO;
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
