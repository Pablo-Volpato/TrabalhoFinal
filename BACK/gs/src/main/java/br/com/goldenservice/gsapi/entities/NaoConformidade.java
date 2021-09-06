package br.com.goldenservice.gsapi.entities;

import javax.persistence.*;

@Entity
@Table(name = "nao_conformidades")
public class NaoConformidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nc_cd_id")
    private Integer id;

    @Column(name = "nc_tx_natureza_do_evento", nullable = false)
    private String naturezaDoEvento;

    @Column(name = "nc_tx_causa_raiz")
    private String causaRaiz;

    @Column(name = "nc_tx_processo_macro")
    private String processoMacro;

    @Column(name = "usu_cd_id")
    private Integer idUsuario;

    private Boolean ativo = true;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNaturezaDoEvento() {
        return naturezaDoEvento;
    }

    public void setNaturezaDoEvento(String naturezaDoEvento) {
        this.naturezaDoEvento = naturezaDoEvento;
    }

    public String getCausaRaiz() {
        return causaRaiz;
    }

    public void setCausaRaiz(String causaRaiz) {
        this.causaRaiz = causaRaiz;
    }

    public String getProcessoMacro() {
        return processoMacro;
    }

    public void setProcessoMacro(String processoMacro) {
        this.processoMacro = processoMacro;
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
