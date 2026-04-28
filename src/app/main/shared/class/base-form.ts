import { signal, WritableSignal, Signal } from '@angular/core';
import { FieldTree, FormOptions, SchemaOrSchemaFn, form } from '@angular/forms/signals';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { IToastConfig } from '../components/toast-messages/interfaces/toast-config';

export class BaseForms<MODEL> {
  model!: WritableSignal<MODEL>;
  formData!: FieldTree<MODEL>;
  idHelp!: string;

  saving = signal<boolean>(false);
  styleToast = signal<string | null>(null);

  createForm(model: MODEL, schemaPath: SchemaOrSchemaFn<MODEL> | FormOptions) {
    this.model = signal(model);
    this.formData = form(this.model, schemaPath);
  }

  createModel(model: MODEL, route: ActivatedRoute): MODEL {
    const routeData = toSignal(route.data);
    const data = routeData()?.['data'];
    if (data) {
      return data as MODEL;
    } else {
      return model;
    }
  }

  onSalve() {
    throw new Error('Method not implemented');
  }

  onCancel() {
    throw new Error('Method not implemented');
  }

  get isDisabled(): boolean {
    return this.formData().invalid();
  }
}
