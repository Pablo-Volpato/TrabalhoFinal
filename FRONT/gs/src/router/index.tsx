import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ListagemAnalistaDePerfil from '../pages/AnalistaDePerfil/ListagemAnalistaDePerfil';
import AtualizarTecnologia from '../pages/Tecnologia/AtualizarTecnologia';
import CadastroTecnologia from '../pages/Tecnologia/CadastroTecnologia';
import ListagemTecnologia from '../pages/Tecnologia/ListagemTecnologia';
import ListagemComunicacao from '../pages/TiposdeComunicacao/ListagemComunicacao';
import AtualizarComunicacao from '../pages/TiposdeComunicacao/AtualizarComunicacao';
import CadastroComunicacao from '../pages/TiposdeComunicacao/CadastroComunicacao';
import ListagemMarca from '../pages/Marca/GirdEditavelCor';
import ListagemSeguradora from '../pages/Seguradora/ListagemSeguradora';
import CadastroSeguradora from '../pages/Seguradora/CadastroSegueadora';
import AtualizarSeguradora from '../pages/Seguradora/AtualizarSeguradora';
import ListagemNaoConformidades from '../pages/NaoConformidades/ListagemNaoConformidades';
import CadastroNaoConformidades from '../pages/NaoConformidades/CadastroNaoConformidades';
import AtualizarNaoConformidades from '../pages/NaoConformidades/AtualizarNaoConformidades';
import ListagemCorretora from '../pages/Corretora/ListagemCorretora';
import CadastroCorretora from '../pages/Corretora/CadastroCorretora';
import AtualizarCorretora from '../pages/Corretora/AtualizarCorretora';
import ListagemCor from '../pages/Cor/GirdEditavelCor'
import ListagemGrupoVeiculo from '../pages/GrupodeVeiculos/ListagemVeiculos';
import CadastroGrupoVeiculo from '../pages/GrupodeVeiculos/CadastroVeiculos';
import AtualizarGrupoVeiculo from '../pages/GrupodeVeiculos/AtualizarVeiculos';
import ListagemTiposDeVeiculos from '../pages/TiposDeVeiculos/ListagemTiposDeVeiculos';
import CadastroTiposDeVeiculos from '../pages/TiposDeVeiculos/CadastroTiposDeVeiculos';
import AtualizarTiposDeVeiculos from '../pages/TiposDeVeiculos/AtualizarTiposDeVeiculos';
import Home from '../pages/Home';
import ListagemDispositivos from '../pages/Dispositivos/ListagemDispositivos';
import CadastroDispositivos from '../pages/Dispositivos/CadastroDispositivos';
import AtualizarDispositivos from '../pages/Dispositivos/AtualizarDispositivos';
import ModalCadastro from '../pages/TiposdeComunicacao/Modal/Modal';
import ListagemTiposDeDispositivos from '../pages/TiposDeDispositivos/ListagemTiposDeDispositivos';
import AtualizarTiposDeDispositivos from '../pages/TiposDeDispositivos/AtualizarTiposDeDispositivos';
import CadastroTiposDeDispositivos from '../pages/TiposDeDispositivos/CadastroTiposDeDispositivos';
import ListagemGrupoMacro from '../pages/GrupoMacro/ListagemGrupoMacro';

function Rotas() {
	return (
		<Switch>
			<Route path="/" component={Home} exact/>
			<Route path="/tecnologia/:page" component={ListagemTecnologia} />
			<Route path="/cadastro-tecnologia" component={CadastroTecnologia} exact/>
			<Route path='/atualizar-tecnologia/:id' component={AtualizarTecnologia} exact />
			<Route path="/grupo-macro/:page" component={ListagemGrupoMacro} />
			<Route path="/analista-de-perfil/:page" component={ListagemAnalistaDePerfil} />
			<Route path="/tipo-de-comunicacao/:page" component={ListagemComunicacao} />
			<Route path="/cadastro-tipo-de-comunicacao" component={CadastroComunicacao} exact/>
			<Route path='/atualizar-tipo-de-comunicacao/:id' component={AtualizarComunicacao} exact />
			<Route path="/cor/:page" component={ListagemCor} />
			<Route path="/marca/:page" component={ListagemMarca}/>
			<Route path="/seguradora/:page" component={ListagemSeguradora} />
			<Route path="/cadastro-seguradora" component={CadastroSeguradora} exact/>
			<Route path='/atualizar-seguradora/:id' component={AtualizarSeguradora} exact />
			<Route path="/nao-conformidade/:page" component={ListagemNaoConformidades} />
			<Route path="/cadastro-nao-conformidade" component={CadastroNaoConformidades} exact/>
			<Route path='/atualizar-nao-conformidade/:id' component={AtualizarNaoConformidades} exact />
			<Route path="/corretora/:page" component={ListagemCorretora} />
			<Route path="/cadastro-corretora" component={CadastroCorretora} exact/>
			<Route path='/atualizar-corretora/:id' component={AtualizarCorretora} exact />
			<Route path="/grupo-de-veiculos/:page" component={ListagemGrupoVeiculo} />
			<Route path="/cadastro-grupo-de-veiculo" component={CadastroGrupoVeiculo} exact/>
			<Route path='/atualizar-grupo-de-veiculos/:id' component={AtualizarGrupoVeiculo} exact />
			<Route path="/tipo-de-veiculo/:page" component={ListagemTiposDeVeiculos} />
			<Route path="/cadastro-tipo-de-veiculo" component={CadastroTiposDeVeiculos} exact/>
			<Route path='/atualizar-tipo-de-veiculo/:id' component={AtualizarTiposDeVeiculos} exact />
			<Route path="/dispositivos/:page" component={ListagemDispositivos} />
			<Route path="/cadastro-dispositivos" component={CadastroDispositivos} exact/>
			<Route path='/atualizar-dispositivos/:id' component={AtualizarDispositivos} exact />
			<Route path='/modal-tipo-comunicaca' component={ModalCadastro} exact />
			<Route path="/tipos-de-dispositivos/:page" component={ListagemTiposDeDispositivos} />
			<Route path='/atualizar-tipos-de-dispositivos/:id' component={AtualizarTiposDeDispositivos} exact />
			<Route path="/cadastro-tipos-de-dispositivos" component={CadastroTiposDeDispositivos} exact/>

		
		</Switch>
	)
}

export default Rotas;