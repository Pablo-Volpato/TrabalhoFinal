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

import br.com.goldenservice.gsapi.exception.TiposDeVeiculosException;
import br.com.goldenservice.gsapi.service.TiposDeVeiculosService;
import br.com.goldenservice.gsapi.vo.TiposDeVeiculosVO;

@RestController
@RequestMapping("/tiposDeVeiculos")
public class TiposDeVeiculosController {

	@Autowired
	TiposDeVeiculosService tiposDeVeiculosService;
	
	@GetMapping
	public ResponseEntity<List<TiposDeVeiculosVO>> obterTodos(@RequestParam (required = false) Integer idUsuario) throws TiposDeVeiculosException {
		return new ResponseEntity<>(this.tiposDeVeiculosService.obterTodos(idUsuario), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<TiposDeVeiculosVO> obterPorId(@PathVariable Integer id) throws TiposDeVeiculosException{
			TiposDeVeiculosVO tiposDeVeiculos =  tiposDeVeiculosService.obterPorId(id);
			return ResponseEntity.ok(tiposDeVeiculos);
	}

	@GetMapping("/listaDadosGrid")
	public ResponseEntity<List<TiposDeVeiculosVO>> findAllVO(
			@RequestParam(required = false) Integer pagina,
			@RequestParam(required = false) Integer qtdRegistros,
			@RequestParam (required = false) Integer id)
			throws Exception {

		HttpHeaders headers = new HttpHeaders();
		return new ResponseEntity<List<TiposDeVeiculosVO>>(this.tiposDeVeiculosService.findAllVO(pagina,
				qtdRegistros,id), headers, HttpStatus.OK);
	}
	
	@GetMapping("/listaDadosGrid/count")
	public ResponseEntity<Integer> numeroElementos() throws Exception{
		return ResponseEntity.ok(tiposDeVeiculosService.numeroElementos());
	}
	@GetMapping("/search")
	public ResponseEntity<List<TiposDeVeiculosVO>> pesquisar(@RequestParam String keyword) throws TiposDeVeiculosException{
		return ResponseEntity.ok(tiposDeVeiculosService.pesquisa(keyword));
	}
	
	@PostMapping
	public ResponseEntity<TiposDeVeiculosVO> adicionar(@RequestBody TiposDeVeiculosVO tiposDeVeiculosVo) throws TiposDeVeiculosException {
		return new ResponseEntity<>(this.tiposDeVeiculosService.adicionar(tiposDeVeiculosVo), HttpStatus.CREATED);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<TiposDeVeiculosVO> atualizar(@PathVariable(value = "id") Integer id, @RequestBody TiposDeVeiculosVO tiposDeVeiculosVo) throws TiposDeVeiculosException {
		return new ResponseEntity<>(this.tiposDeVeiculosService.atualizar(id, tiposDeVeiculosVo), HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/{id}")
	public String deletar(@PathVariable(value = "id") Integer id) throws TiposDeVeiculosException {
		 return this.tiposDeVeiculosService.deletar(id);
	}
}
