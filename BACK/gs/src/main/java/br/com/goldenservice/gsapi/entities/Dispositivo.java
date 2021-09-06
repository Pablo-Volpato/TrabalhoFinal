package br.com.goldenservice.gsapi.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="dispositivo")
public class Dispositivo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dis_cd_id")
    private Integer id;

    @Column(name = "dis_tx_nome", nullable = false,unique = true)
    private String nome;

    @Column(name = "dis_tx_descricao")
    private String descricao;

    @Column(name = "usu_cd_id")
    private Integer idUsuario;

    @Column(name = "dis_bl_ativo")
    private Boolean ativo = true;

    @ManyToOne
    @JoinColumn(name = "tdd_cd_id")
    private TipoDeDispositivo TipoDeDispositivo;

    @Column(nullable = false)
    @ManyToMany
    @JoinTable( name = "dispositivo_rel_grupo_de_veiculos", joinColumns = @JoinColumn(name = "dis_cd_id"), inverseJoinColumns = @JoinColumn(name = "gdv_cd_id"))
    private List<GrupoDeVeiculos> grupo_de_veiculos = new ArrayList<GrupoDeVeiculos>();



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

    public List<GrupoDeVeiculos> getGrupo_de_veiculos() {
        return grupo_de_veiculos;
    }

    public void setGrupo_de_veiculos(List<GrupoDeVeiculos> grupo_de_veiculos) {
        this.grupo_de_veiculos = grupo_de_veiculos;
    }

    public TipoDeDispositivo getTipoDeDispositivo() {
		return TipoDeDispositivo;
	}

	public void setTipoDeDispositivo(TipoDeDispositivo tipoDeDispositivo) {
		TipoDeDispositivo = tipoDeDispositivo;
	}

	public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }
}
