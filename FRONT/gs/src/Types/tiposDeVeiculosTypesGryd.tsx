export type TiposDeVeiculosTypesGryd = {
    index?: number | string;
    id?: number | string;
    nome: string;
    ativo?: boolean;
    grupo_de_veiculo: [
        {
            id?: number | string;
            nome?: string;
            descricao?: string;
            grupo_macro_de_veiculos?:[
                {
                    nome?:string;
                    id?: number|string;
                }
            ]
        }
    ]
}


