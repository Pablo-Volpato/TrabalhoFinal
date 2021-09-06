package br.com.goldenservice.gsapi.controller;


import br.com.goldenservice.gsapi.exception.NaoConformidadeException;
import br.com.goldenservice.gsapi.service.NaoConformidadeService;
import br.com.goldenservice.gsapi.vo.NaoConformidadeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/naoConformidade")
public class NaoConformidadeController {

    @Autowired
    NaoConformidadeService naoConformidadeService;

    @GetMapping
    public ResponseEntity<List<NaoConformidadeVO>> obterTodos(@RequestParam (required = false) Integer idUsuario) throws NaoConformidadeException {
        return new ResponseEntity<>(this.naoConformidadeService.findAll(idUsuario), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NaoConformidadeVO> ProcurarPorId(@PathVariable Integer id) throws NaoConformidadeException {
        return new ResponseEntity<>(this.naoConformidadeService.findById(id),HttpStatus.OK);
    }


    @GetMapping("/listaDadosGrid")
    public ResponseEntity<List<NaoConformidadeVO>> findAllVO(
            @RequestParam(required = false) Integer pagina,
            @RequestParam(required = false) Integer qtdRegistros,
            @RequestParam (required = false) Integer id)
            throws Exception {

        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<>(naoConformidadeService.findAllVO(pagina,
                qtdRegistros,id), headers, HttpStatus.OK);
    }


    @GetMapping("/listaDadosGrid/count")
    public ResponseEntity<Integer> numeroElementos() throws Exception{
        return ResponseEntity.ok(naoConformidadeService.numeroElementos());
    }

    @GetMapping("/search")
    public ResponseEntity<List<NaoConformidadeVO>> pesquisar (@RequestParam String keyword) throws NaoConformidadeException{
        return new ResponseEntity<>(this.naoConformidadeService.pesquisar(keyword),HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<NaoConformidadeVO> adicionar(@RequestBody NaoConformidadeVO naoConformidadeVO) throws NaoConformidadeException {
        return new ResponseEntity<>(this.naoConformidadeService.inserir(naoConformidadeVO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NaoConformidadeVO> atualizar(@PathVariable(value = "id") Integer id,
                                             @RequestBody NaoConformidadeVO naoConformidadeVO) throws NaoConformidadeException {
        return new ResponseEntity<>(this.naoConformidadeService.updateMarca(id, naoConformidadeVO), HttpStatus.OK);
    }


    @DeleteMapping(value = "/{id}")
    public String deletar(@PathVariable(value = "id")Integer id) throws NaoConformidadeException {
        return this.naoConformidadeService.deletar(id);
    }


}
