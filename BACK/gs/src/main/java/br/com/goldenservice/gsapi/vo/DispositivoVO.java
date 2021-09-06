package br.com.goldenservice.gsapi.vo;

import br.com.goldenservice.gsapi.entities.GrupoDeVeiculos;
import br.com.goldenservice.gsapi.entities.TipoDeDispositivo;

import java.util.List;

public class DispositivoVO {

    private Integer id;
    private String nome;
    private String descricao;
    private Boolean ativo = true;
    private Integer idUsuario;
    private Integer tipoDispositivoId;

    private TipoDeDispositivo tipoDeDispositivo;
    private List<Integer> grupo_de_veiculos;
    private List<GrupoDeVeiculos> grupoDeVeiculos;


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

    public TipoDeDispositivo getTipoDeDispositivo() {
		return tipoDeDispositivo;
	}

	public void setTipoDeDispositivo(TipoDeDispositivo tipoDeDispositivo) {
		this.tipoDeDispositivo = tipoDeDispositivo;
	}

	public List<Integer> getGrupo_de_veiculos() {
        return grupo_de_veiculos;
    }

    public void setGrupo_de_veiculos(List<Integer> grupo_de_veiculos) {
        this.grupo_de_veiculos = grupo_de_veiculos;
    }

    public List<GrupoDeVeiculos> getGrupoDeVeiculos() {
        return grupoDeVeiculos;
    }

    public void setGrupoDeVeiculos(List<GrupoDeVeiculos> grupoDeVeiculos) {
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

	public Integer getTipoDispositivoId() {
		return tipoDispositivoId;
	}

	public void setTipoDispositivoId(Integer tipoDispositivoId) {
		this.tipoDispositivoId = tipoDispositivoId;
	}
    
}
