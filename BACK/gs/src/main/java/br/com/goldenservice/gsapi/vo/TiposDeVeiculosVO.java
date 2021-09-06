package br.com.goldenservice.gsapi.vo;

import br.com.goldenservice.gsapi.entities.GrupoDeVeiculos;

public class TiposDeVeiculosVO {

	private Integer id;
	private String nome;
	private Integer grupoVeiculosId;
	private GrupoDeVeiculos grupoDeVeiculos;
	private Boolean ativo =true;
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

	public Integer getGrupoVeiculosId() {
		return grupoVeiculosId;
	}
	public void setGrupoVeiculosId(Integer grupoVeiculosId) {
		this.grupoVeiculosId = grupoVeiculosId;
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
		TiposDeVeiculosVO other = (TiposDeVeiculosVO) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
	
	
}
