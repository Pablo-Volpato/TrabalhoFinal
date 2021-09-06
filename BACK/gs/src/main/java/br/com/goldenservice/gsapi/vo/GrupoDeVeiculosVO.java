package br.com.goldenservice.gsapi.vo;

import java.util.List;

import br.com.goldenservice.gsapi.entities.Dispositivo;
import br.com.goldenservice.gsapi.entities.GrupoMacroDeVeiculos;

public class GrupoDeVeiculosVO {

	private Integer id;
	private String nome;
	private Boolean ativo = true;
	private Integer grupoMacroId;
	private GrupoMacroDeVeiculos grupoMacro;
	private Integer idUsuario;

	private List<Integer> dispositivoId;
	private List<Dispositivo> dispositivo;
	
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
	public Integer getGrupoMacroId() {
		return grupoMacroId;
	}
	public void setGrupoMacroId(Integer grupoMacroId) {
		this.grupoMacroId = grupoMacroId;
	}
	
	public Boolean getAtivo() {
		return ativo;
	}
	public void setAtivo(Boolean ativo) {
		this.ativo = ativo;
	}
	
	public GrupoMacroDeVeiculos getGrupoMacro() {
		return grupoMacro;
	}
	public void setGrupoMacro(GrupoMacroDeVeiculos grupoMacro) {
		this.grupoMacro = grupoMacro;
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
		GrupoDeVeiculosVO other = (GrupoDeVeiculosVO) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}

	public List<Integer> getDispositivoId() {
		return dispositivoId;
	}

	public void setDispositivoId(List<Integer> dispositivoId) {
		this.dispositivoId = dispositivoId;
	}

	public List<Dispositivo> getDispositivo() {
		return dispositivo;
	}

	public void setDispositivo(List<Dispositivo> dispositivo) {
		this.dispositivo = dispositivo;
	}
}
