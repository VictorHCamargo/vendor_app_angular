
/* A palavra chave keyof permite apenas os tipos de uma outra interface, ou seja no caso
abaixo a ItableData aceita apenas 'nome', ou seja a unica coisa a ser aceita pelo campo dataField
e 'nome', deixando tudo tipado e anti-DevsJuniors
*/
export interface ITableTitle<MODEL> {
    name: string,
    dataField: keyof MODEL
}
