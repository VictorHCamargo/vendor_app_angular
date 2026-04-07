import { ITableButton } from "./table-button";
import { ITableTitle } from "./table-title";

export interface ITableConfig<MODEL> {
    data : MODEL[];
    
    titles : ITableTitle<MODEL>[];
    
    buttons : ITableButton<MODEL>[];
}
