export type VeiculosTypesGryd = {
    index: number | string;
    id?: number | string;
    nome: string;
    descricao?: string;
    ativo?: boolean;
    grupoMacroDeVeiculos:[
        {
            nome:string;
            id: number;
        }
    ]

}