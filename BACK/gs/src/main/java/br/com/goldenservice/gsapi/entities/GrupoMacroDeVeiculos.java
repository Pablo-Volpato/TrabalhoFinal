package br.com.goldenservice.gsapi.entities;

import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "grupo_macro_veiculos")
public class GrupoMacroDeVeiculos {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "gmv_cd_id")
	private Integer id;

	@Column(length = 60, nullable = false, name = "gmv_tx_nome")
	private String nome;

	@OneToMany(mappedBy = "grupoMacroDeVeiculos")
	private List<GrupoDeVeiculos> grupoDeVeiculo;

	@Column(name = "gmv_bl_ativo")
	private boolean ativo = true;

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

	public boolean getAtivo() {
		return ativo;
	}

	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
	}

	public void setGrupoDeVeiculo(List<GrupoDeVeiculos> grupoDeVeiculo) {
		this.grupoDeVeiculo = grupoDeVeiculo;
	}

	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}
}
