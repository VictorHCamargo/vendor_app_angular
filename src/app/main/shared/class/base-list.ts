import { signal, Signal, WritableSignal } from "@angular/core";
import { ITableConfig } from "../components/table/interfaces/table-config";

export class BaseList<MODEL> {
    dataModel : WritableSignal<MODEL[]> = signal<MODEL[]>([]);
    configTable! : Signal<ITableConfig<MODEL>>;

    createData() {
        throw Error("method not implemented");
    }

    reloadData() {
        throw Error("method not implemented");
    }

    onNewRegister() {
        throw Error("method not implemented");
    }
}
