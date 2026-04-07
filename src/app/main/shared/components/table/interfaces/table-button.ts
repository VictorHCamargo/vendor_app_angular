export interface ITableButton<MODEL> {
    name: string,
    action: (data : MODEL) => void,
    show: () => boolean,
    style: string
}
