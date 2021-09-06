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

import br.com.goldenservice.gsapi.exception.MarcaException;
import br.com.goldenservice.gsapi.service.MarcaService;
import br.com.goldenservice.gsapi.vo.MarcaVO;

@RestController
@RequestMapping("/marcas")
public class MarcaController {
	
	@Autowired
	private MarcaService marcaService;
	
	@GetMapping
	public ResponseEntity<List<MarcaVO>> obterTodos(@RequestParam (required = false) Integer idUsuario) throws MarcaException {
		return new ResponseEntity<>(this.marcaService.findAll(idUsuario), HttpStatus.OK);
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<MarcaVO> ProcurarPorId(@PathVariable Integer id) throws MarcaException {
		return new ResponseEntity<>(this.marcaService.findById(id),HttpStatus.OK);
	}

	@GetMapping("/listaDadosGrid")
	public ResponseEntity<List<MarcaVO>> findAllVO(
			@RequestParam(required = false) Integer pagina,
			@RequestParam(required = false) Integer qtdRegistros,
			@RequestParam (required = false) Integer id)
			throws Exception {

		HttpHeaders headers = new HttpHeaders();
		return new ResponseEntity<>(marcaService.findAllVO(pagina,
				qtdRegistros,id), headers, HttpStatus.OK);
	}

	@GetMapping("/listaDadosGrid/count")
	public ResponseEntity<Integer> numeroElementos() throws Exception{
		return ResponseEntity.ok(marcaService.numeroElementos());
	}
	
	@GetMapping("/search")
	public ResponseEntity<List<MarcaVO>> pesquisar (@RequestParam String keyword) throws MarcaException{
		return new ResponseEntity<>(this.marcaService.pesquisar(keyword),HttpStatus.OK);
	}
	
	@GetMapping("/fipe")
	public ResponseEntity<String> fipe () {
		return ResponseEntity.ok(marcaService.fipe());
	}

	@PostMapping
	public ResponseEntity<MarcaVO> adicionar(@RequestBody MarcaVO marcaVO) throws MarcaException {
		return new ResponseEntity<>(this.marcaService.inserir(marcaVO), HttpStatus.CREATED);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<MarcaVO> atualizar(@PathVariable(value = "id") Integer id, 
			@RequestBody MarcaVO marcaVO) throws MarcaException {
		return new ResponseEntity<>(this.marcaService.updateMarca(id, marcaVO), HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/{id}")
	public String deletar(@PathVariable(value = "id")Integer id) throws MarcaException {
		return this.marcaService.deletar(id);
	}
}

