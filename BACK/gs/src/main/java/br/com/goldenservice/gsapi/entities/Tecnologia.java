
package br.com.goldenservice.gsapi.entities;



import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;


@Entity
@Table(name = "tecnologia_rastreamento")
public class Tecnologia {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name= "ter_cd_id")
	private Integer id;
	
	//@Column(name="ter_cd_codigo")
	//private Long codigo;

	@Column(length = 60, nullable = false, name = "ter_tx_nome")
	private String nome;

	@Column(length = 100, name = "ter_tx_descricao")
	private String descricao;

	@Column(name = "ter_tx_imagem")
	private String imagem;
	
	@Column(name = "usu_cd_id")
	private Integer idUsuario;
	

	//trc_cd_id chave primaria da tabela de ligação
	//ttc_cd_id chave estrageira do tipo de comunicação
	//ter_cd_id chave estrangeira de tecnologia 
	@Column(nullable = false)
	@ManyToMany
	@JoinTable( name = "tecnologia_rastreamento_rel_tipo_comunicacao", joinColumns = @JoinColumn(name = "ter_cd_id"), inverseJoinColumns = @JoinColumn(name = "ttc_cd_id"))
	private List<TiposDeComunicacao> tipo_de_comunicacao = new ArrayList<TiposDeComunicacao>();
	
	@Column(name = "ter_bl_ativo")
	private Boolean ativo = true;

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

	public String getImagem() {
		return imagem;
	}

	public void setImagem(String imagem) {
		this.imagem = imagem;
	}

	public List<TiposDeComunicacao> getTipo_de_comunicacao() {
		return tipo_de_comunicacao;
	}

	public void setTipo_de_comunicacao(List<TiposDeComunicacao> tipo_de_comunicacao) {
		this.tipo_de_comunicacao = tipo_de_comunicacao;
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
	
	
}
