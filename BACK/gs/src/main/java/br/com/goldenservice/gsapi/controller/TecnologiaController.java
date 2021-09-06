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

import br.com.goldenservice.gsapi.exception.TecnologiaRastreamentoException;
import br.com.goldenservice.gsapi.service.TecnologiaService;
import br.com.goldenservice.gsapi.vo.TecnologiaVO;

@RestController
@RequestMapping(value = "/tecnologia")
public class TecnologiaController {
	
	@Autowired
	TecnologiaService tecnologiaService;
	
	@GetMapping
	public ResponseEntity<List<TecnologiaVO>> obterTodos(@RequestParam (required = false) Integer idUsuario) throws TecnologiaRastreamentoException {
		return new ResponseEntity<>(this.tecnologiaService.obterTodos(idUsuario), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<TecnologiaVO> obterPorId(@PathVariable Integer id) throws TecnologiaRastreamentoException{
			TecnologiaVO tecnologia =  tecnologiaService.obterPorId(id);
			return ResponseEntity.ok(tecnologia);
	}

	@GetMapping("/listaDadosGrid")
	public ResponseEntity<List<TecnologiaVO>> findAllVO(
			@RequestParam(required = false) Integer pagina,
			@RequestParam(required = false) Integer qtdRegistros,
			@RequestParam (required = false) Integer id)
			throws Exception {

		HttpHeaders headers = new HttpHeaders();
		return new ResponseEntity<List<TecnologiaVO>>(this.tecnologiaService.findAllVO(pagina,
				qtdRegistros,id), headers, HttpStatus.OK);
	}
	
	@GetMapping("/listaDadosGrid/count")
	public ResponseEntity<Integer> numeroElementos() throws Exception{
		return ResponseEntity.ok(tecnologiaService.numeroElementos());
	}
	@GetMapping("/search")
	public ResponseEntity<List<TecnologiaVO>> pesquisar(@RequestParam String keyword) throws TecnologiaRastreamentoException{
		return ResponseEntity.ok(tecnologiaService.pesquisa(keyword));
	}
	
	@PostMapping
	public ResponseEntity<TecnologiaVO> adicionar(@RequestBody TecnologiaVO tecnologiaVO) throws TecnologiaRastreamentoException {
		return new ResponseEntity<>(this.tecnologiaService.adicionar(tecnologiaVO), HttpStatus.CREATED);
	}

	//Save com imagens
	@PostMapping("/save")
	public ResponseEntity<TecnologiaVO> save( TecnologiaVO tecnologiaVo) {
		HttpHeaders headers = new HttpHeaders();
		TecnologiaVO novoTEC = tecnologiaService.saveVO(tecnologiaVo);

		if (null != novoTEC)
			return new ResponseEntity<>(novoTEC, headers, HttpStatus.OK);
		else
			return new ResponseEntity<>(null, headers, HttpStatus.BAD_REQUEST);
	}



	@PutMapping(value = "/{id}")
	public ResponseEntity<TecnologiaVO> atualizar(@PathVariable(value = "id") Integer id, @RequestBody TecnologiaVO tecnologiaVO) throws TecnologiaRastreamentoException {
		return new ResponseEntity<>(this.tecnologiaService.atualizar(id, tecnologiaVO), HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/{id}")
	public String deletar(@PathVariable(value = "id") Integer id) throws TecnologiaRastreamentoException {
		 return this.tecnologiaService.deletar(id);
	}
}
