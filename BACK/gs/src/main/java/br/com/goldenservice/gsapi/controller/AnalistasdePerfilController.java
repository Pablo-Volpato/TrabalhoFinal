package br.com.goldenservice.gsapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import br.com.goldenservice.gsapi.exception.AnalistaPerfilException;
import br.com.goldenservice.gsapi.service.AnalistasdePerfilService;
import br.com.goldenservice.gsapi.vo.AnalistasdePerfilVO;

@RestController
@RequestMapping(value = "/analista_de_perfil")
public class AnalistasdePerfilController {
	
	@Autowired
	AnalistasdePerfilService analistaDePerfilService;
	
	@GetMapping
	public ResponseEntity<List<AnalistasdePerfilVO>> obterTodos(@RequestParam (required = false) Integer idUsuario) throws AnalistaPerfilException {
		return new ResponseEntity<>(this.analistaDePerfilService.obterTodos(idUsuario), HttpStatus.OK);
	}
	
	@GetMapping("/search")
	public ResponseEntity<List<AnalistasdePerfilVO>> pesquisar(@RequestParam String keyword) throws AnalistaPerfilException{
		return ResponseEntity.ok(analistaDePerfilService.pesquisa(keyword));
	}
	
	@GetMapping("/listaDadosGrid")
	public ResponseEntity<List<AnalistasdePerfilVO>> obterTodos(@RequestParam Integer pagina,@RequestParam Integer qtdRegistros ) throws AnalistaPerfilException {
		return new ResponseEntity<>(this.analistaDePerfilService.obterTodos(pagina,qtdRegistros), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<AnalistasdePerfilVO> obterPorId(@PathVariable Integer id) throws AnalistaPerfilException{
			AnalistasdePerfilVO analista =  analistaDePerfilService.obterPorId(id);
			return ResponseEntity.ok(analista);
	}
			
	@PostMapping
	public ResponseEntity<AnalistasdePerfilVO> adicionar(@RequestBody AnalistasdePerfilVO analistasdePerfilVO) throws AnalistaPerfilException {
		return new ResponseEntity<>(this.analistaDePerfilService.adicionar(analistasdePerfilVO), HttpStatus.CREATED);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<AnalistasdePerfilVO> atualizar(@PathVariable(value = "id") Integer id, @RequestBody AnalistasdePerfilVO analistasdePerfilVO) throws AnalistaPerfilException {
		return new ResponseEntity<>(this.analistaDePerfilService.atualizar(id, analistasdePerfilVO), HttpStatus.OK);
	}

	@GetMapping("/listaDadosGrid/count")
	public ResponseEntity<Integer> numeroElementos() throws Exception{
		return ResponseEntity.ok(analistaDePerfilService.numeroElementos());
	}



	@DeleteMapping(value = "/{id}")
	public String deletar(@PathVariable(value = "id") Integer id) throws AnalistaPerfilException {
		return this.analistaDePerfilService.deletar(id);
	}
}
