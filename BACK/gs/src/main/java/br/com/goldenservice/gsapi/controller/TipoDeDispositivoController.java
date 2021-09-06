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

import br.com.goldenservice.gsapi.exception.TipoDeDispositivoException;
import br.com.goldenservice.gsapi.service.TipoDeDispositivoService;
import br.com.goldenservice.gsapi.vo.TipoDeDispositivoVO;

@RestController
@RequestMapping("/tiposDeDispositivos")
public class TipoDeDispositivoController {
	
	@Autowired
	TipoDeDispositivoService tipoDeDispositivoService;
	
	@GetMapping
	public ResponseEntity<List<TipoDeDispositivoVO>> obterTodos(@RequestParam (required = false) Integer idUsuario) throws TipoDeDispositivoException {
		return new ResponseEntity<>(this.tipoDeDispositivoService.findAll(idUsuario), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<TipoDeDispositivoVO> ProcurarPorId(@PathVariable Integer id) throws TipoDeDispositivoException {
		return new ResponseEntity<>(this.tipoDeDispositivoService.findById(id),HttpStatus.OK);
	}

	@GetMapping("/listaDadosGrid")
	public ResponseEntity<List<TipoDeDispositivoVO>> findAllVO(
			@RequestParam(required = false) Integer pagina,
			@RequestParam(required = false) Integer qtdRegistros,
			@RequestParam (required = false) Integer id)
			throws Exception {

		HttpHeaders headers = new HttpHeaders();
		return new ResponseEntity<>(tipoDeDispositivoService.findAllVO(pagina,
				qtdRegistros,id), headers, HttpStatus.OK);
	}

	@GetMapping("/listaDadosGrid/count")
	public ResponseEntity<Integer> numeroElementos() throws Exception{
		return ResponseEntity.ok(tipoDeDispositivoService.numeroElementos());
	}
	
	@GetMapping("/search")
	public ResponseEntity<List<TipoDeDispositivoVO>> pesquisar(@RequestParam String keyword) throws TipoDeDispositivoException{
		return ResponseEntity.ok(tipoDeDispositivoService.pesquisa(keyword));
	}

	@PostMapping
	public ResponseEntity<TipoDeDispositivoVO> adicionar(@RequestBody TipoDeDispositivoVO tipoDeDispositivoVO) throws TipoDeDispositivoException {
		return new ResponseEntity<>(this.tipoDeDispositivoService.inserir(tipoDeDispositivoVO), HttpStatus.CREATED);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<TipoDeDispositivoVO> atualizar(@PathVariable(value = "id") Integer id, 
			@RequestBody TipoDeDispositivoVO tipoDeDispositivoVO) throws TipoDeDispositivoException {
		return new ResponseEntity<>(this.tipoDeDispositivoService.updateTipoDeDispositivo(id, tipoDeDispositivoVO), HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/{id}")
	public String deletar(@PathVariable(value = "id")Integer id) throws TipoDeDispositivoException {
		return this.tipoDeDispositivoService.deletar(id);
	}

}
