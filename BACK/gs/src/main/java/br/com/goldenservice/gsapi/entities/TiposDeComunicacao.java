package br.com.goldenservice.gsapi.entities;

import javax.persistence.*;

@Entity
@Table(name = "tecnologia_tipo_comunicacao")
public class TiposDeComunicacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ttc_cd_id",nullable = false)
    private Integer id;

    @Column(name = "ttc_tx_descricao")
    private String descricao;

    @Column(name = "ttc_tx_nome" ,nullable = false)
    private String nome;

    @Column(name = "ttc_img_imagem")
    private String imagem;
    
	@Column(name = "ttc_bl_ativo")
    private Boolean ativo = true;
	
	@Column(name = "usu_cd_id")
	private Integer idUsuario;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Boolean getAtivo() {
		return ativo;
	}

	public void setAtivo(Boolean ativo) {
		this.ativo = ativo;
	}

	public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}
    

}
