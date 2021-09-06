package br.com.goldenservice.gsapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.goldenservice.gsapi.exception.GrupoMacroDeVeiculosException;
import br.com.goldenservice.gsapi.service.GrupoMacroDeVeiculosService;
import br.com.goldenservice.gsapi.vo.GrupoMacroDeVeiculosVO;

@RestController
@RequestMapping(value = "/grupoMacroDeVeiculos")
public class GrupoMacroDeVeiculosController {

    @Autowired
    GrupoMacroDeVeiculosService grupoMacroDeVeiculosService;


    @GetMapping
    public ResponseEntity<List<GrupoMacroDeVeiculosVO>> obterTodos(@RequestParam (required = false) Integer idUsuario) throws GrupoMacroDeVeiculosException {
        return new ResponseEntity<>(this.grupoMacroDeVeiculosService.obterTodos(idUsuario), HttpStatus.OK);
    }



    @GetMapping("/listaDadosGrid")
    public ResponseEntity<List<GrupoMacroDeVeiculosVO>> findAllVO(
            @RequestParam(required = false) Integer pagina,
            @RequestParam(required = false) Integer qtdRegistros,
            @RequestParam(required = false) Integer id)
            throws Exception {

        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<>(grupoMacroDeVeiculosService.findAllVO(pagina, qtdRegistros,id), headers, HttpStatus.OK);
    }

    @GetMapping("/listaDadosGrid/count")
    public ResponseEntity<Integer> numeroElementos() throws Exception{
        return ResponseEntity.ok(grupoMacroDeVeiculosService.numeroElementos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GrupoMacroDeVeiculosVO> ProcurarPorId(@PathVariable Integer id) throws GrupoMacroDeVeiculosException {
        return new ResponseEntity<>(this.grupoMacroDeVeiculosService.obterPorId(id),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<GrupoMacroDeVeiculosVO> adicionar(@RequestBody GrupoMacroDeVeiculosVO grupoMacroDeVeiculosVO) throws GrupoMacroDeVeiculosException {
        return new ResponseEntity<>(this.grupoMacroDeVeiculosService.adicionar(grupoMacroDeVeiculosVO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GrupoMacroDeVeiculosVO> atualizar(@PathVariable(value = "id") Integer id,
                                                @RequestBody GrupoMacroDeVeiculosVO grupoMacroDeVeiculosVO) throws GrupoMacroDeVeiculosException {
        return new ResponseEntity<>(this.grupoMacroDeVeiculosService.atualizar(id, grupoMacroDeVeiculosVO), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public String deletar(@PathVariable(value = "id")Integer id) throws GrupoMacroDeVeiculosException {
        return this.grupoMacroDeVeiculosService.deletar(id);
    }

    @GetMapping("/search")
    public ResponseEntity<List<GrupoMacroDeVeiculosVO>> pesquisar(@RequestParam String keyword) throws GrupoMacroDeVeiculosException {
        return ResponseEntity.ok(grupoMacroDeVeiculosService.pesquisa(keyword));
    }
}
