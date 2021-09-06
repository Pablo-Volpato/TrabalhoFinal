package br.com.goldenservice.gsapi.vo;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import br.com.goldenservice.gsapi.entities.TiposDeComunicacao;

public class TecnologiaVO {
	

	private Integer id;
	private String nome;
	private String descricao;
	private String imagem;
	private Boolean ativo = true;
	private Integer idUsuario;
	private MultipartFile imagemUpload;
	
	private List<Integer> tipo_de_comunicacao;
	private List<TiposDeComunicacao> tiposDeComunicacao;
	
	
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Boolean getAtivo() {
		return ativo;
	}
	public void setAtivo(Boolean ativo) {
		this.ativo = ativo;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public String getImagem() {
		return imagem;
	}
	public void setImagem(String imagem) {
		this.imagem = imagem;
	}
	public List<Integer> getTipo_de_comunicacao() {
		return tipo_de_comunicacao;
	}
	public void setTipo_de_comunicacao(List<Integer> tipo_de_comunicacao) {
		this.tipo_de_comunicacao = tipo_de_comunicacao;
	}

	public MultipartFile getImagemUpload() {
		return imagemUpload;
	}

	public void setImagemUpload(MultipartFile imagemUpload) {
		this.imagemUpload = imagemUpload;
	}
	
	public List<TiposDeComunicacao> getTiposDeComunicacao() {
		return tiposDeComunicacao;
	}
	public void setTiposDeComunicacao(List<TiposDeComunicacao> tiposDeComunicacao) {
		this.tiposDeComunicacao = tiposDeComunicacao;
	}


	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}

}
