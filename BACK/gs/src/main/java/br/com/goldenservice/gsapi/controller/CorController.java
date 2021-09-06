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

import br.com.goldenservice.gsapi.exception.CorException;
import br.com.goldenservice.gsapi.service.CorService;
import br.com.goldenservice.gsapi.vo.CorVO;

@RestController
@RequestMapping(value = "/cor")
public class CorController {

    @Autowired
    CorService corService;

    @GetMapping
    public ResponseEntity<List<CorVO>> obterTodos(@RequestParam (required = false) Integer idUsuario) throws CorException {
        return new ResponseEntity<>(this.corService.findAll(idUsuario), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CorVO> ListarPorId(@PathVariable Integer id) throws CorException {
    	try {
    		return new ResponseEntity<>(this.corService.findById(id), HttpStatus.OK);			
		} catch (Exception e) {
			throw new CorException("Id não encontrado!");
		}
    }

    //COM VO
    @GetMapping("/listaDadosGrid")
    public ResponseEntity<List<CorVO>> findAllVO(
            @RequestParam(required = false) Integer pagina,
            @RequestParam(required = false) Integer qtdRegistros)
            throws Exception {

        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<>(corService.findAllVO(pagina,
                qtdRegistros), headers, HttpStatus.OK);
    }
    
    @GetMapping("/search")
	public ResponseEntity<List<CorVO>> pesquisar(@RequestParam String keyword) throws CorException{
		return ResponseEntity.ok(corService.pesquisa(keyword));
	}

    @PostMapping
    public ResponseEntity<CorVO> adicionar(@RequestBody CorVO corVO) throws CorException {
        return new ResponseEntity<>(this.corService.createNewCor(corVO), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<CorVO> atualizar(@PathVariable(value = "id") Integer id, @RequestBody CorVO corVO) throws CorException {
        return new ResponseEntity<>(this.corService.updateCor(id, corVO), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public String deletar(@PathVariable(value = "id") Integer id) throws CorException {
        return this.corService.deletar(id);
    }

    @GetMapping("/listaDadosGrid/count")
    public ResponseEntity<Integer> numeroElementos() throws Exception{
        return ResponseEntity.ok(corService.numeroElementos());
    }


}


