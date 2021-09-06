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

import br.com.goldenservice.gsapi.exception.CorretoraException;
import br.com.goldenservice.gsapi.service.CorretoraService;
import br.com.goldenservice.gsapi.vo.CorretoraVO;

@RestController
@RequestMapping("/corretora")
public class CorretoraController {

	@Autowired
	CorretoraService corretoraService;
	
	@GetMapping
	public ResponseEntity<List<CorretoraVO>> obterTodos(@RequestParam (required = false) Integer idUsuario) throws CorretoraException {
		return new ResponseEntity<>(this.corretoraService.findAll(idUsuario), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<CorretoraVO> ProcurarPorId(@PathVariable Integer id) throws CorretoraException {
		return new ResponseEntity<>(this.corretoraService.findById(id),HttpStatus.OK);
	}

	@GetMapping("/listaDadosGrid")
	public ResponseEntity<List<CorretoraVO>> findAllVO(
			@RequestParam(required = false) Integer pagina,
			@RequestParam(required = false) Integer qtdRegistros,
			@RequestParam (required = false) Integer id)
			throws Exception {

		HttpHeaders headers = new HttpHeaders();
		return new ResponseEntity<>(corretoraService.findAllVO(pagina,
				qtdRegistros,id), headers, HttpStatus.OK);
	}

	@GetMapping("/listaDadosGrid/count")
	public ResponseEntity<Integer> numeroElementos() throws Exception{
		return ResponseEntity.ok(corretoraService.numeroElementos());
	}
	
	@GetMapping("/search")
	public ResponseEntity<List<CorretoraVO>> pesquisar(@RequestParam String keyword) throws CorretoraException{
		return ResponseEntity.ok(corretoraService.pesquisa(keyword));
	}

	@PostMapping
	public ResponseEntity<CorretoraVO> adicionar(@RequestBody CorretoraVO corretoraVO) throws CorretoraException {
		return new ResponseEntity<>(this.corretoraService.inserir(corretoraVO), HttpStatus.CREATED);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<CorretoraVO> atualizar(@PathVariable(value = "id") Integer id, 
			@RequestBody CorretoraVO corretoraVO) throws CorretoraException {
		return new ResponseEntity<>(this.corretoraService.updateCorretora(id, corretoraVO), HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/{id}")
	public String deletar(@PathVariable(value = "id")Integer id) throws CorretoraException {
		return this.corretoraService.deletar(id);
	}
}
