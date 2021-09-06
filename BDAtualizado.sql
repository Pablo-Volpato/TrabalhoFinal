CREATE SCHEMA IF NOT EXISTS information_schema;

CREATE  TABLE information_schema.analistas_de_perfil ( 
	adp_cd_id            integer  NOT NULL ,
	adp_tx_nome          varchar(100)  NOT NULL ,
	CONSTRAINT pk_adp_cd_id PRIMARY KEY ( adp_cd_id )
 );

COMMENT ON TABLE information_schema.analistas_de_perfil IS '''Armazena os dados na tabela Analistas de Perfil.''';

COMMENT ON COLUMN information_schema.analistas_de_perfil.adp_cd_id IS '''Armazena a chave primÃ¡ria na tabela Analistas de Perfil.''';

COMMENT ON COLUMN information_schema.analistas_de_perfil.adp_tx_nome IS '''Armazena o nome do Analista de Perfil.''';

CREATE  TABLE information_schema.cor ( 
	cor_cd_id            integer  NOT NULL ,
	cor_tx_cor           varchar(50)  NOT NULL ,
	CONSTRAINT pk_cor_cor_cd_id PRIMARY KEY ( cor_cd_id )
 );

COMMENT ON TABLE information_schema.cor IS '''Armazena os dados da tabela cor.''';

COMMENT ON COLUMN information_schema.cor.cor_cd_id IS '''Armazena a chave primÃ¡ria da tabela Cor.''';

COMMENT ON COLUMN information_schema.cor.cor_tx_cor IS '''Armazena a cor do veiculo na tabela Cor.''';

CREATE  TABLE information_schema.corretora ( 
	corr_cd_id           integer  NOT NULL ,
	corr_tx_nome         varchar(100)  NOT NULL ,
	corr_tx_descricao    varchar   ,
	corr_bl_ativo        boolean   ,
	CONSTRAINT pk_corretora_cor_cd_id PRIMARY KEY ( corr_cd_id )
 );

COMMENT ON TABLE information_schema.corretora IS '''Armazena os dados na tabela Corretora.''';

COMMENT ON COLUMN information_schema.corretora.corr_cd_id IS '''Armazena a chave primÃ¡ria na tabela Corretora.''';

COMMENT ON COLUMN information_schema.corretora.corr_tx_nome IS '''Armazena o nome da Corretora.''';

COMMENT ON COLUMN information_schema.corretora.corr_tx_descricao IS '''Armazena a descriÃ§Ã£o na tabela Corretora.''';

COMMENT ON COLUMN information_schema.corretora.corr_bl_ativo IS '''Informa se a entidade estÃ¡ ativa ou nÃ£o.''';

CREATE  TABLE information_schema.dispositivo_rel_grupo_de_veiculos ( 
	dgv_cd_id            integer  NOT NULL ,
	gdv_cd_id            integer  NOT NULL ,
	dis_cd_id            integer  NOT NULL ,
	CONSTRAINT pk_dispositivo_rel_grupo_de_veiculos_dgv_cd_id PRIMARY KEY ( dgv_cd_id ),
	CONSTRAINT unq_dispositivo_rel_grupo_de_veiculos_dis_cd_id UNIQUE ( dis_cd_id ) ,
	CONSTRAINT unq_dispositivo_rel_grupo_de_veiculos_gdv_cd_id UNIQUE ( gdv_cd_id ) 
 );

COMMENT ON TABLE information_schema.dispositivo_rel_grupo_de_veiculos IS 'Armazena as chaves estrangeiras entre a tabela relacional Dispositivo e Grupo de Veículos.';

COMMENT ON COLUMN information_schema.dispositivo_rel_grupo_de_veiculos.dgv_cd_id IS 'Armazena a chave primária da tabela relacional Dispositivo e Grupo de Veículos.';

COMMENT ON COLUMN information_schema.dispositivo_rel_grupo_de_veiculos.gdv_cd_id IS 'Armazena a chave estrangeira da tabela Grupo de Veiculos.';

COMMENT ON COLUMN information_schema.dispositivo_rel_grupo_de_veiculos.dis_cd_id IS 'Armazena a chave estrangeira da tabela Dispositivo.';

CREATE  TABLE information_schema.marca ( 
	mrc_cd_id            integer  NOT NULL ,
	mrc_tx_marca         varchar  NOT NULL ,
	CONSTRAINT pk_mrc_cd_id PRIMARY KEY ( mrc_cd_id )
 );

COMMENT ON TABLE information_schema.marca IS '''Armazena os dados da tabela Marca.''';

COMMENT ON COLUMN information_schema.marca.mrc_cd_id IS '''Armazena a chave primÃ¡ria da tabela marca.''';

COMMENT ON COLUMN information_schema.marca.mrc_tx_marca IS '''Armazena a marca do veiculo na tabela Marca.''';

CREATE  TABLE information_schema.nao_conformidade ( 
	nc_cd_id             integer  NOT NULL ,
	nc_tx_natureza_do_evento varchar(200)  NOT NULL ,
	nc_tx_causa_raiz     varchar(200)   ,
	nc_tx_processo_macro varchar(200)   ,
	CONSTRAINT pk_nao_conformidade_nc_cd_id PRIMARY KEY ( nc_cd_id )
 );

COMMENT ON TABLE information_schema.nao_conformidade IS '''Armazena os dados na tabela NÃ£o-Conformidade.''';

COMMENT ON COLUMN information_schema.nao_conformidade.nc_cd_id IS '''Armazena a chave primÃ¡ria da tabela Nao-Conformidades.''';

COMMENT ON COLUMN information_schema.nao_conformidade.nc_tx_natureza_do_evento IS '''Armazena os dados da natureza do evento na tabela NÃ£o Conformidade.''';

COMMENT ON COLUMN information_schema.nao_conformidade.nc_tx_causa_raiz IS '''Armazena os dados da causa raÃ­z na tabela NÃ£o Conformidade.''';

COMMENT ON COLUMN information_schema.nao_conformidade.nc_tx_processo_macro IS '''Armazena os dados do processo macro na tabela NÃ£o Conformidade.''';

CREATE  TABLE information_schema.seguradora ( 
	seg_cd_id            integer  NOT NULL ,
	seg_tx_nome          bigint  NOT NULL ,
	seg_tx_descricao     varchar(200)   ,
	seg_bl_ativo         boolean   ,
	CONSTRAINT pk_seguradora_seg_cd_id PRIMARY KEY ( seg_cd_id )
 );

COMMENT ON TABLE information_schema.seguradora IS '''Armazena os dados na tabela Seguradora.''';

COMMENT ON COLUMN information_schema.seguradora.seg_cd_id IS '''Armazena a chave primÃ¡ria na tabela Seguradora.''';

COMMENT ON COLUMN information_schema.seguradora.seg_tx_nome IS '''Armazena o nome da Seguradora.''';

COMMENT ON COLUMN information_schema.seguradora.seg_tx_descricao IS '''Armazena a descriÃ§Ã£o na tabela Seguradora.''';

COMMENT ON COLUMN information_schema.seguradora.seg_bl_ativo IS '''Infroma se a entidade estÃ¡ ativa ou nÃ£o.''';

CREATE  TABLE information_schema.tecnologia_rastreamento_rel_tipo_comunicacao ( 
	trtc_cd_id           integer  NOT NULL ,
	tcc_cd_id            integer  NOT NULL ,
	ter_cd_id            integer  NOT NULL ,
	CONSTRAINT pk_tecnologia_rastreamento_rel_tipo_comunicacao_trtc_cd_id PRIMARY KEY ( trtc_cd_id ),
	CONSTRAINT unq_tecnologia_rastreamento_rel_tipo_comunicacao_tcc_cd_id UNIQUE ( tcc_cd_id ) ,
	CONSTRAINT unq_tecnologia_rastreamento_rel_tipo_comunicacao_ter_cd_id UNIQUE ( ter_cd_id ) 
 );

COMMENT ON TABLE information_schema.tecnologia_rastreamento_rel_tipo_comunicacao IS 'Armazena as chaves estrnageira da tabela relacional de Tecnologia e Tipos de Comunicação.';

COMMENT ON COLUMN information_schema.tecnologia_rastreamento_rel_tipo_comunicacao.trtc_cd_id IS 'Armazena a chave primária da tabela relacional entre Tecnologia e Tipo de Comunicação.';

COMMENT ON COLUMN information_schema.tecnologia_rastreamento_rel_tipo_comunicacao.tcc_cd_id IS 'Armazena a chave estrageira da tabela Tipos de Comunicação.';

COMMENT ON COLUMN information_schema.tecnologia_rastreamento_rel_tipo_comunicacao.ter_cd_id IS 'Armazena a chave estrangeira da tabela Tecnologia.';

CREATE  TABLE information_schema.tecnologia_tipo_comunicacao ( 
	ttc_cd_id            integer  NOT NULL ,
	ttdc_tx_nome         varchar(100)  NOT NULL ,
	ttc_tx_descricao     varchar   ,
	ttc_tx_imagem        varchar   ,
	CONSTRAINT pk_tdc_cd_id PRIMARY KEY ( ttc_cd_id )
 );

COMMENT ON TABLE information_schema.tecnologia_tipo_comunicacao IS '''Armazena as informações da Tabela Tipos De Comunicação.''';

COMMENT ON COLUMN information_schema.tecnologia_tipo_comunicacao.ttc_cd_id IS '''Armazena a chave primÃ¡ria da tabela Tipos De ComunicaÃ§Ã£o.''';

COMMENT ON COLUMN information_schema.tecnologia_tipo_comunicacao.ttdc_tx_nome IS '''Armazena o nome da tabela Tipos de ComunicaÃ§Ã£o.''';

COMMENT ON COLUMN information_schema.tecnologia_tipo_comunicacao.ttc_tx_descricao IS '''Armazena a descrição do Tipo de Dispositivo.''';

COMMENT ON COLUMN information_schema.tecnologia_tipo_comunicacao.ttc_tx_imagem IS '''Armazena o nome da imagem que serÃ¡ inserida na tabela.''';

CREATE  TABLE information_schema.dispositivo ( 
	dis_cd_id            integer  NOT NULL ,
	dis_tx_nome          varchar(100)  NOT NULL ,
	dis_tx_descricao     varchar(200)   ,
	tdd_cd_id            integer  NOT NULL ,
	CONSTRAINT pk_dis_cd_id PRIMARY KEY ( dis_cd_id ),
	CONSTRAINT unq_dispositivo_tdd_cd_id UNIQUE ( tdd_cd_id ) 
 );

COMMENT ON TABLE information_schema.dispositivo IS '''''''Tabela para receber os atributos de Dispositivos.''''''';

COMMENT ON COLUMN information_schema.dispositivo.dis_cd_id IS '''''''Armazena o id da tabela Dispositivo.''''''';

COMMENT ON COLUMN information_schema.dispositivo.dis_tx_nome IS '''''''Armazena o nome da tabela Dispositivo.''''''';

COMMENT ON COLUMN information_schema.dispositivo.dis_tx_descricao IS '''''''Armazena a descricao da tabela Dispositivo.''''''';

COMMENT ON COLUMN information_schema.dispositivo.tdd_cd_id IS '''''''Armazena a chave estrangeira da tabela Tipo de Dispositivo.''';

CREATE  TABLE information_schema.tecnologia_rastreamento ( 
	ter_cd_id            integer  NOT NULL ,
	ter_tx_nome          varchar(100)  NOT NULL ,
	ter_tx_descricao     varchar(200)   ,
	ter_tx_imagem        varchar   ,
	CONSTRAINT pk_ter_cd_id PRIMARY KEY ( ter_cd_id )
 );

COMMENT ON TABLE information_schema.tecnologia_rastreamento IS '''Armazena os dados da tabela Tecnologia.''';

COMMENT ON COLUMN information_schema.tecnologia_rastreamento.ter_cd_id IS '''Armazena a chave primÃ¡ria da tabela Tecnologia de Rastreamento.''';

COMMENT ON COLUMN information_schema.tecnologia_rastreamento.ter_tx_nome IS '''Armazena o nome da tecnologia.''';

COMMENT ON COLUMN information_schema.tecnologia_rastreamento.ter_tx_descricao IS '''Armazena a descriÃ§Ã£o da tabela tecnologia.''';

COMMENT ON COLUMN information_schema.tecnologia_rastreamento.ter_tx_imagem IS '''Armazena o nome da imagem inserida na tabela tecnolologia.''';

CREATE  TABLE information_schema.tipo_de_dispositivo ( 
	tdd_cd_id            integer  NOT NULL ,
	tdd_tx_nome          varchar(100)  NOT NULL ,
	tdd_tx_descricao     varchar(200)   ,
	CONSTRAINT pk_tipo_de_dispositivo_tdd_cd_id PRIMARY KEY ( tdd_cd_id )
 );

COMMENT ON TABLE information_schema.tipo_de_dispositivo IS 'Armazena os dados da tabela Tipos de Veículos.';

COMMENT ON COLUMN information_schema.tipo_de_dispositivo.tdd_cd_id IS 'Armazena a chave primária da tabela Tipos de Dispositivos.';

COMMENT ON COLUMN information_schema.tipo_de_dispositivo.tdd_tx_nome IS 'Armazena o nome do Tipo de Dispositivo.';

COMMENT ON COLUMN information_schema.tipo_de_dispositivo.tdd_tx_descricao IS 'Armazena a descricao do tipo de dispositivo.';

CREATE  TABLE information_schema.grupo_macro_veiculos ( 
	gmv_cd_id            integer  NOT NULL ,
	gmv_tx_nome          varchar(100)  NOT NULL ,
	"CONSTRAINT"         varchar   ,
	CONSTRAINT pk_grupo_macro_veiculos_gmv_cd_id PRIMARY KEY ( gmv_cd_id )
 );

COMMENT ON TABLE information_schema.grupo_macro_veiculos IS '''Armazena os dados da tabela Grupo Macro de Veiculos.''';

COMMENT ON COLUMN information_schema.grupo_macro_veiculos.gmv_cd_id IS '''Armazena a chave primÃ¡ria da tabela Grupo Macro de VeÃ­culos.''';

COMMENT ON COLUMN information_schema.grupo_macro_veiculos.gmv_tx_nome IS '''Armazena o nome do Grupo Macro de VeÃ­culos.''';

CREATE  TABLE information_schema.grupos_de_veiculo ( 
	gdv_cd_id            integer  NOT NULL ,
	gdv_tx_nome          varchar(100)  NOT NULL ,
	gmv_cd_id            integer  NOT NULL ,
	tdv_cd_id            integer  NOT NULL ,
	CONSTRAINT pk_grupos_gdv_cd_id PRIMARY KEY ( gdv_cd_id ),
	CONSTRAINT unq_grupos_de_veiculo_gmv_cd_id UNIQUE ( gmv_cd_id ) ,
	CONSTRAINT unq_grupos_de_veiculo_tdv_cd_id UNIQUE ( tdv_cd_id ) 
 );

COMMENT ON TABLE information_schema.grupos_de_veiculo IS '''Armazena os dados na tabela Grupos de VeÃ­culo.''';

COMMENT ON COLUMN information_schema.grupos_de_veiculo.gdv_cd_id IS '''Armazena a chave primÃ¡ria da tabela Grupos de VeÃ­culo''';

COMMENT ON COLUMN information_schema.grupos_de_veiculo.gdv_tx_nome IS '''Armazena o nome do Grupo de VeÃ­culo.''';

COMMENT ON COLUMN information_schema.grupos_de_veiculo.gmv_cd_id IS '''Armazena a chave estrangeira da tabela Grupo Macro de Veiculos.''';

COMMENT ON COLUMN information_schema.grupos_de_veiculo.tdv_cd_id IS '''Armazena a chave estrangeira da tabela Tipos de VeÃ­culos.''';

CREATE  TABLE information_schema.tipos_de_veiculos ( 
	tdv_cd_id            integer  NOT NULL ,
	tdv_tx_nome          bit(100)  NOT NULL ,
	gdv_cd_id            integer  NOT NULL ,
	"CONSTRAINT"         varchar   ,
	CONSTRAINT pk_tipos_de_veiculos_tdv_cd_id PRIMARY KEY ( tdv_cd_id ),
	CONSTRAINT unq_tipos_de_veiculos_gdv_cd_id UNIQUE ( gdv_cd_id ) 
 );

COMMENT ON TABLE information_schema.tipos_de_veiculos IS '''Armazena os dados na Tabela Tipos De Veiculos.''';

COMMENT ON COLUMN information_schema.tipos_de_veiculos.tdv_cd_id IS '''Armazena a chave primÃ¡ria da tabela Tipos De Veiculos.''';

COMMENT ON COLUMN information_schema.tipos_de_veiculos.tdv_tx_nome IS '''Armazena o nome da tabela Tipos De Veiculos.''';

COMMENT ON COLUMN information_schema.tipos_de_veiculos.gdv_cd_id IS '''Armazena a chave estrangeira da tabela Grupo De Veiculos.''';

ALTER TABLE information_schema.dispositivo ADD CONSTRAINT fk_dispositivo_dispositivo_rel_grupo_de_veiculos FOREIGN KEY ( dis_cd_id ) REFERENCES information_schema.dispositivo_rel_grupo_de_veiculos( dis_cd_id );

ALTER TABLE information_schema.grupo_macro_veiculos ADD CONSTRAINT "Fk" FOREIGN KEY ( "CONSTRAINT" ) REFERENCES information_schema.grupos_de_veiculo( gmv_cd_id );

ALTER TABLE information_schema.grupos_de_veiculo ADD CONSTRAINT "Fk" FOREIGN KEY (  ) REFERENCES information_schema.tipos_de_veiculos(  );

ALTER TABLE information_schema.grupos_de_veiculo ADD CONSTRAINT fk_grupos_de_veiculo_dispositivo_rel_grupo_de_veiculos FOREIGN KEY ( gdv_cd_id ) REFERENCES information_schema.dispositivo_rel_grupo_de_veiculos( gdv_cd_id );

ALTER TABLE information_schema.tecnologia_rastreamento ADD CONSTRAINT fk_tecnologia_rastreamento_tecnologia_rastreamento_rel_tipo_comunicacao FOREIGN KEY ( ter_cd_id ) REFERENCES information_schema.tecnologia_rastreamento_rel_tipo_comunicacao( ter_cd_id );

ALTER TABLE information_schema.tecnologia_tipo_comunicacao ADD CONSTRAINT fk_tecnologia_tipo_comunicacao_tecnologia_rastreamento_rel_tipo_comunicacao FOREIGN KEY ( ttc_cd_id ) REFERENCES information_schema.tecnologia_rastreamento_rel_tipo_comunicacao( tcc_cd_id );

ALTER TABLE information_schema.tipo_de_dispositivo ADD CONSTRAINT fk_tipo_de_dispositivo_dispositivo FOREIGN KEY ( tdd_cd_id ) REFERENCES information_schema.dispositivo( tdd_cd_id );

ALTER TABLE information_schema.tipos_de_veiculos ADD CONSTRAINT "Fk" FOREIGN KEY ( "CONSTRAINT" ) REFERENCES information_schema.grupos_de_veiculo( tdv_cd_id );

