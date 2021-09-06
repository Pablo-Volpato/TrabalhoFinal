package br.com.goldenservice.gsapi.entities;

import javax.persistence.*;

@Entity
@Table(name = "cor")
public class Cor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cor_cd_id")
    public Integer id;
    
    @Column(name = "cor_tx_cor",unique = true, nullable = false)
    public String cor;

	@Column(name = "cor_bl_ativo")
    private Boolean ativo = true;
	
	@Column(name = "usu_cd_id")
	private Integer idUsuario;
	
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public boolean getAtivo() {
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
