package br.com.goldenservice.gsapi.entities;

import javax.persistence.*;

@Entity
@Table(name = "seguradora")
public class Seguradora {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seg_cd_id")
    private Integer id;

    @Column(name = "seg_tx_nome", nullable = false,unique = true)
    private String nome;

    @Column(name = "seg_tx_descricao")
    private String descricao;

	@Column(name = "seg_bl_ativo")
    private Boolean ativo = true;
	
	@Column(name = "usu_cd_id")
	private Integer idUsuario;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

	public Boolean getAtivo() {
		return ativo;
	}

	public void setAtivo(Boolean ativo) {
		this.ativo = ativo;
	}

	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}
	
   
}
