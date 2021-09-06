package br.com.goldenservice.gsapi.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "grupos_de_veiculos")
public class GrupoDeVeiculos {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name= "gdv_cd_id")
	private Integer id;
	@Column(name= "gdv_tx_nome", nullable = false)
	private String nome;
	@Column(name = "gdv_bl_ativo")
	private Boolean ativo = true;
	@Column(name = "usu_cd_id")
	private Integer idUsuario;
	
	@OneToMany(mappedBy ="grupoDeVeiculos")
	private List<TiposDeVeiculos> tiposDeVeiculos;
	
	@ManyToOne
	@JoinColumn(name = "gmv_cd_id")
	private GrupoMacroDeVeiculos grupoMacroDeVeiculos;

	@ManyToMany(mappedBy = "grupo_de_veiculos")
	private List<Dispositivo> dispositivos = new ArrayList<Dispositivo>() ;



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
	
	public GrupoMacroDeVeiculos getGrupoMacroDeVeiculos() {
		return grupoMacroDeVeiculos;
	}
	
	public Boolean getAtivo() {
		return ativo;
	}
	public void setAtivo(Boolean ativo) {
		this.ativo = ativo;
	}
	
	public void setGrupoMacroDeVeiculos(GrupoMacroDeVeiculos grupoMacroDeVeiculos) {
		this.grupoMacroDeVeiculos = grupoMacroDeVeiculos;
	}
	
	public Integer getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}
	
	public void setTiposDeVeiculos(List<TiposDeVeiculos> tiposDeVeiculos) {
		this.tiposDeVeiculos = tiposDeVeiculos;
	}

	@JsonIgnore
	public List<Dispositivo> getDispositivos() {
		return dispositivos;
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
		GrupoDeVeiculos other = (GrupoDeVeiculos) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}




}