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

import br.com.goldenservice.gsapi.exception.SeguradoraException;
import br.com.goldenservice.gsapi.service.SeguradoraService;
import br.com.goldenservice.gsapi.vo.SeguradoraVO;

@RestController
@RequestMapping(value = "/seguradora")
public class SeguradoraController {

    @Autowired
    SeguradoraService seguradoraService;
    
    @GetMapping
	public ResponseEntity<List<SeguradoraVO>> obterTodos(@RequestParam (required = false) Integer idUsuario) throws SeguradoraException {
		return new ResponseEntity<>(this.seguradoraService.obterTodos(idUsuario), HttpStatus.OK);
	}

    @GetMapping("/listaDadosGrid")
    public ResponseEntity<List<SeguradoraVO>> findAllVO(
            @RequestParam(required = false) Integer pagina,
            @RequestParam(required = false) Integer qtdRegistros,
            @RequestParam(required = false) Integer id)
            throws Exception {

        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<>(seguradoraService.findAllVO(pagina, qtdRegistros,id), headers, HttpStatus.OK);
    }

    @GetMapping("/listaDadosGrid/count")
    public ResponseEntity<Integer> numeroElementos() throws Exception{
        return ResponseEntity.ok(seguradoraService.numeroElementos());
    }
    
    @GetMapping("/search")
	public ResponseEntity<List<SeguradoraVO>> pesquisar(@RequestParam String keyword) throws SeguradoraException{
		return ResponseEntity.ok(seguradoraService.pesquisa(keyword));
	}

    @GetMapping("/{id}")
    public ResponseEntity<SeguradoraVO> ProcurarPorId(@PathVariable Integer id) throws SeguradoraException {
        return new ResponseEntity<>(this.seguradoraService.obterPorId(id),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<SeguradoraVO> adicionar(@RequestBody SeguradoraVO seguradoraVO) throws SeguradoraException {
        return new ResponseEntity<>(this.seguradoraService.adicionar(seguradoraVO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SeguradoraVO> atualizar(@PathVariable(value = "id") Integer id,
                                                        @RequestBody SeguradoraVO seguradoraVO) throws SeguradoraException {
        return new ResponseEntity<>(this.seguradoraService.atualizar(id, seguradoraVO), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public String deletar(@PathVariable(value = "id")Integer id) throws SeguradoraException {
        return this.seguradoraService.deletar(id);
    }


}
