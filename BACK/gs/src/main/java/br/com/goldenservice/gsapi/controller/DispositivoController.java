package br.com.goldenservice.gsapi.controller;

import br.com.goldenservice.gsapi.exception.DispositivoException;

import br.com.goldenservice.gsapi.service.DispositivoService;
import br.com.goldenservice.gsapi.vo.DispositivoVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/dispositivo")
public class DispositivoController {

    @Autowired
    DispositivoService dispositivoService;

    @GetMapping
    public ResponseEntity<List<DispositivoVO>> obterTodos(@RequestParam (required = false) Integer idUsuario) throws DispositivoException {
        return new ResponseEntity<>(this.dispositivoService.obterTodos(idUsuario), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DispositivoVO> obterPorId(@PathVariable Integer id) throws DispositivoException{
        DispositivoVO dispositivoVO =  dispositivoService.obterPorId(id);
        return ResponseEntity.ok(dispositivoVO);
    }

    @GetMapping("/listaDadosGrid")
    public ResponseEntity<List<DispositivoVO>> findAllVO(
            @RequestParam(required = false) Integer pagina,
            @RequestParam(required = false) Integer qtdRegistros,
            @RequestParam (required = false) Integer id)
            throws Exception {

        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<List<DispositivoVO>>(this.dispositivoService.findAllVO(pagina,
                qtdRegistros,id), headers, HttpStatus.OK);
    }


    @GetMapping("/listaDadosGrid/count")
    public ResponseEntity<Integer> numeroElementos() throws Exception{
        return ResponseEntity.ok(dispositivoService.numeroElementos());
    }


    @GetMapping("/search")
    public ResponseEntity<List<DispositivoVO>> pesquisar(@RequestParam String keyword) throws DispositivoException{
        return ResponseEntity.ok(dispositivoService.pesquisa(keyword));
    }

    @PostMapping
    public ResponseEntity<DispositivoVO> adicionar(@RequestBody DispositivoVO dispositivoVO) throws DispositivoException {
        return new ResponseEntity<>(this.dispositivoService.adicionar(dispositivoVO), HttpStatus.CREATED);
    }


    @PutMapping(value = "/{id}")
    public ResponseEntity<DispositivoVO> atualizar(@PathVariable(value = "id") Integer id, @RequestBody DispositivoVO dispositivoVO) throws DispositivoException {
        return new ResponseEntity<>(this.dispositivoService.atualizar(id, dispositivoVO), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public String deletar(@PathVariable(value = "id") Integer id) throws DispositivoException {
        return this.dispositivoService.deletar(id);
    }



}
