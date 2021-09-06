export type DispositivosTypesGryd = {
  index?: number | string;
  id?: number | string;
  nome: string;
  descricao?: string;
  tipo_de_veiculos:[
      {
          id?: number | string;
          descricao?: string;
          nome?: string;
       
      }
  ];
  tipoDeDispositivo:{
    id?: number | string;
    descricao?: string;
    nome?: string;
  }
  ativo?: boolean

}