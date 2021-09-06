package br.com.goldenservice.gsapi.vo;

import org.springframework.web.multipart.MultipartFile;

public class TiposDeComunicacaoVO {
	
	private Integer id;
    private String nome;
    private String descricao;
    private String imagem;
	private MultipartFile imagemUpload;
	private Integer idUsuario;
    private Boolean ativo = true;

    
    
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

	public MultipartFile getImagemUpload() {
		return imagemUpload;
	}

	public void setImagemUpload(MultipartFile imagemUpload) {
		this.imagemUpload = imagemUpload;
	}

	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}
}
