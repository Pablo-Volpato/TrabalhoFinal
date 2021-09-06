package br.com.goldenservice.gsapi.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.goldenservice.gsapi.service.ArquivoService;


@RestController
@RequestMapping(value = "/foto")
public class ArquivoController {

	@Autowired
	ArquivoService arquivoService;
	
	@PostMapping("/uploadFile")
	public String adicionar( @RequestBody MultipartFile file)  {
		return this.arquivoService.storeFiletes(file);
	}
}
