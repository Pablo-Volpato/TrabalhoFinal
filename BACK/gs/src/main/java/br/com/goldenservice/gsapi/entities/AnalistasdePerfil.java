package br.com.goldenservice.gsapi.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "analistas_de_perfil ")
public class AnalistasdePerfil {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "adp_cd_id")
	private Integer id;
	
	@Column( length = 60, nullable = false,name = "adp_tx_nome",unique = true )
	private String nome;
	
	@Column(name = "adp_bl_ativo")
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