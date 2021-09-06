export type TecnologiaTypesGryd = {
    index?: number | string;
    id?: number | string;
    nome: string;
    descricao?: string;
    imagem?:string;
    tipo_de_comunicacao:[
        {
            id?: number | string;
            descricao?: string;
            nome?: string;
            imagem?: string;
        }
    ];
    ativo?: boolean

}