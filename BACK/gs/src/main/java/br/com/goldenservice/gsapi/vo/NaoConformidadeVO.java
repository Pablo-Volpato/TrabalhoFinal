package br.com.goldenservice.gsapi.vo;

public class NaoConformidadeVO {
    private Integer id;
    private String naturezaDoEvento;
    private String causaRaiz;
    private String processoMacro;
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
