package br.com.goldenservice.gsapi.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tipo_dispositivo")
public class TipoDeDispositivo {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="tdd_cd_id")
	private Integer id;
	@Column(name="tdd_tx_nome", nullable = false)
	private String nome;
	@Column(name= "tdd_txdescricao")
	private String descricao;
	@Column(name="ativo")
	private Boolean ativo = true;
	@Column(name="usu_cd_id")
	private Integer idUsuario;
	
	
	public TipoDeDispositivo() {
		// TODO Auto-generated constructor stub
	}
	
	
	public TipoDeDispositivo(Integer id, String nome, String descricao, Boolean ativo) {
		super();
		this.id = id;
		this.nome = nome;
		this.descricao = descricao;
		this.ativo = ativo;
	}
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
	public void setIdUsuario(Integer idusuario) {
		this.idUsuario = idusuario;
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TipoDeDispositivo other = (TipoDeDispositivo) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
