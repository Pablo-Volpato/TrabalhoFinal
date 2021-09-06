package br.com.goldenservice.gsapi.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="tipos_de_veiculos")
public class TiposDeVeiculos {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="tdv_cd_id")
	private Integer id;
	
	@Column(name="tdv_tx_nome", nullable = false)
	private String nome;
	
	@ManyToOne
	@JoinColumn(name = "gdv_cd_id")
	private GrupoDeVeiculos grupoDeVeiculos;
	
	@Column(name = "tdv_bl_ativo")
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
	public GrupoDeVeiculos getGrupoDeVeiculos() {
		return grupoDeVeiculos;
	}
	public void setGrupoDeVeiculos(GrupoDeVeiculos grupoDeVeiculos) {
		this.grupoDeVeiculos = grupoDeVeiculos;
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
		TiposDeVeiculos other = (TiposDeVeiculos) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}	
}
