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

import br.com.goldenservice.gsapi.exception.GrupoDeVeiculosException;
import br.com.goldenservice.gsapi.service.GrupoDeVeiculosService;
import br.com.goldenservice.gsapi.vo.GrupoDeVeiculosVO;

@RestController
@RequestMapping("/grupoVeiculos")
public class GrupoDeVeiculosController {

	@Autowired
	GrupoDeVeiculosService grupoDeVeiculosService;
	
	@GetMapping
	public ResponseEntity<List<GrupoDeVeiculosVO>> obterTodos(@RequestParam (required = false) Integer idUsuario) throws GrupoDeVeiculosException {
		return new ResponseEntity<>(this.grupoDeVeiculosService.obterTodos(idUsuario), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<GrupoDeVeiculosVO> obterPorId(@PathVariable Integer id) throws GrupoDeVeiculosException{
			GrupoDeVeiculosVO grupoDeVeiculos =  grupoDeVeiculosService.obterPorId(id);
			return ResponseEntity.ok(grupoDeVeiculos);
	}

	@GetMapping("/listaDadosGrid")
	public ResponseEntity<List<GrupoDeVeiculosVO>> findAllVO(
			@RequestParam(required = false) Integer pagina,
			@RequestParam(required = false) Integer qtdRegistros,
			@RequestParam (required = false) Integer id)
			throws Exception {

		HttpHeaders headers = new HttpHeaders();
		return new ResponseEntity<List<GrupoDeVeiculosVO>>(this.grupoDeVeiculosService.findAllVO(pagina,
				qtdRegistros,id), headers, HttpStatus.OK);
	}
	
	@GetMapping("/listaDadosGrid/count")
	public ResponseEntity<Integer> numeroElementos() throws Exception{
		return ResponseEntity.ok(grupoDeVeiculosService.numeroElementos());
	}
	@GetMapping("/search")
	public ResponseEntity<List<GrupoDeVeiculosVO>> pesquisar(@RequestParam String keyword) throws GrupoDeVeiculosException{
		return ResponseEntity.ok(grupoDeVeiculosService.pesquisa(keyword));
	}
	
	@PostMapping
	public ResponseEntity<GrupoDeVeiculosVO> adicionar(@RequestBody GrupoDeVeiculosVO grupoDeVeiculosVo) throws GrupoDeVeiculosException {
		return new ResponseEntity<>(this.grupoDeVeiculosService.adicionar(grupoDeVeiculosVo), HttpStatus.CREATED);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<GrupoDeVeiculosVO> atualizar(@PathVariable(value = "id") Integer id, @RequestBody GrupoDeVeiculosVO grupoDeVeiculosVo) throws GrupoDeVeiculosException {
		return new ResponseEntity<>(this.grupoDeVeiculosService.atualizar(id, grupoDeVeiculosVo), HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/{id}")
	public String deletar(@PathVariable(value = "id") Integer id) throws GrupoDeVeiculosException {
		 return this.grupoDeVeiculosService.deletar(id);
	}
}


