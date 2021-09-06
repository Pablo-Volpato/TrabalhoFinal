import React, { useState } from 'react';
import { ContainerNavegacao, NavCustom, LinkCustom } from './styles'
import{CgMenu} from "react-icons/cg"

function Navegacao() {
    const [hidde, setHidde] = useState(true);
    return (
        <ContainerNavegacao style={{ width: hidde ? '60px' : '' }} >
            <CgMenu className="botao" onClick={() => setHidde(!hidde)} size={26}/>
            <NavCustom
                defaultActiveKey="/"
                style={{ left: hidde ? '-550px' : '', padding:10 }}
                className="flex-column"
            >
                 <LinkCustom to="/analista-de-perfil/1" >Analistas de Perfil</ LinkCustom>
                 <LinkCustom to="/cor/1" >Cor</ LinkCustom>
                 <LinkCustom to="/corretora/1" >Corretora</ LinkCustom>
                 <LinkCustom to="/dispositivos/1">Dispositivos</ LinkCustom>
                <LinkCustom to="/grupo-de-veiculos/1" >Grupo de Veículos</ LinkCustom>
                <LinkCustom to="/grupo-macro/1" >Grupo Macro de Veículos </ LinkCustom>
                <LinkCustom to="/marca/1">Marca</ LinkCustom>
                <LinkCustom to="/nao-conformidade/1" >Não Conformidades</ LinkCustom>
                <LinkCustom to="/seguradora/1" >Seguradora</ LinkCustom>
                <LinkCustom to="/tecnologia/1" > Tecnologia </ LinkCustom>
                <LinkCustom to="/tipo-de-comunicacao/1" >Tipos de comunicação</ LinkCustom>
                <LinkCustom to="/tipo-de-veiculo/1" >Tipos de Veículos</ LinkCustom>
                <LinkCustom to="/tipos-de-dispositivos/1" >Tipos de Dispositivos</ LinkCustom>
                <LinkCustom to="/" >Sair</ LinkCustom>
            </NavCustom>
        </ContainerNavegacao>
    )
}

export default Navegacao;
