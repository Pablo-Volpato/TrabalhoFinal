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

import br.com.goldenservice.gsapi.exception.TiposDeComunicacaoException;
import br.com.goldenservice.gsapi.service.TiposDeComunicacaoService;
import br.com.goldenservice.gsapi.vo.TiposDeComunicacaoVO;

@RestController
@RequestMapping(value = "/tipoDeComunicacao")
public class TipoDeComunicacaoController {

	@Autowired 
	TiposDeComunicacaoService tiposDeComunicacaoService;
	
	@GetMapping
	public ResponseEntity<List<TiposDeComunicacaoVO>> obterTodos(@RequestParam (required = false) Integer idUsuario) throws TiposDeComunicacaoException {
		return new ResponseEntity<>(this.tiposDeComunicacaoService.findAll(idUsuario), HttpStatus.OK);
	}
	
	@GetMapping("/search")
	public ResponseEntity<List<TiposDeComunicacaoVO>> pesquisar(@RequestParam String keyword) throws TiposDeComunicacaoException{
		return ResponseEntity.ok(tiposDeComunicacaoService.pesquisa(keyword));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<TiposDeComunicacaoVO> ProcurarPorId(@PathVariable Integer id) throws TiposDeComunicacaoException {
		return new ResponseEntity<>(this.tiposDeComunicacaoService.findById(id),HttpStatus.OK);
	}

	@GetMapping("/listaDadosGrid")
	public ResponseEntity<List<TiposDeComunicacaoVO>> findAllVO(
			@RequestParam(required = false) Integer pagina,
			@RequestParam(required = false) Integer qtdRegistros,
			@RequestParam (required = false) Integer id)
			throws Exception {

		HttpHeaders headers = new HttpHeaders();
		return new ResponseEntity<>(tiposDeComunicacaoService.findAllVO(pagina,
				qtdRegistros,id), headers, HttpStatus.OK);
	}

	@GetMapping("/listaDadosGrid/count")
	public ResponseEntity<Integer> numeroElementos() throws Exception{
		return ResponseEntity.ok(tiposDeComunicacaoService.numeroElementos());
	}

	@PostMapping
	public ResponseEntity<TiposDeComunicacaoVO> adicionar(@RequestBody TiposDeComunicacaoVO tiposDeComunicacaoVO) throws TiposDeComunicacaoException {
		return new ResponseEntity<>(this.tiposDeComunicacaoService.createNewTipoDeComunicacao(tiposDeComunicacaoVO), HttpStatus.CREATED);
	}


	@PostMapping("/save")
	public ResponseEntity<TiposDeComunicacaoVO> save(TiposDeComunicacaoVO tiposDeComunicacaoVO) {
		HttpHeaders headers = new HttpHeaders();

		TiposDeComunicacaoVO novoTDCVO = tiposDeComunicacaoService.saveVO(tiposDeComunicacaoVO);

		if (null != novoTDCVO)
			return new ResponseEntity<>(novoTDCVO, headers, HttpStatus.OK);
		else
			return new ResponseEntity<>(null, headers, HttpStatus.BAD_REQUEST);
	}


	
	@PutMapping("/{id}")
	public ResponseEntity<TiposDeComunicacaoVO> atualizar(@PathVariable(value = "id") Integer id, 
			@RequestBody TiposDeComunicacaoVO tiposDeComunicacaoVO) throws TiposDeComunicacaoException {
		return new ResponseEntity<>(this.tiposDeComunicacaoService.updateTiposDeComunicacao(id, tiposDeComunicacaoVO), HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/{id}")
	public String deletar(@PathVariable(value = "id")Integer id) throws TiposDeComunicacaoException {
		return this.tiposDeComunicacaoService.deleteTiposDeComunicacao(id);
	}
}
