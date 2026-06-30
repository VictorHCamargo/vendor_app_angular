import {
  AfterViewInit,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { BaseList } from '../../../shared/class/base-list';
import { Table } from '../../../shared/components/table/table';
import { IPersonWebListConfig } from '../interfaces/person-web-config';
import { PeopleService } from '../services/people-service';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ILegalPerson, INaturalPerson, TPersonModel } from '../interfaces/person-model';
import { ENTITIES_PERSON_LIST, NATURAL_PERSON_LIST } from '../tools/person-setup';
import { ITableTitle } from '../../../shared/components/table/interfaces/table-title';
import { ITableButton } from '../../../shared/components/table/interfaces/table-button';
import { Modal } from '../../../shared/components/modal/modal';
import { ModalView } from './components/modal-view/modal-view';
import { LoadingComponentsService } from '../../../shared/components/loading-components/service/loading-components-service';
import { ModalDeactivate } from './components/modal-deactivate/modal-deactivate';
import { ToastService } from '../../../shared/components/toast-messages/services/toast-service';

@Component({
  selector: 'app-people-list',
  imports: [Table, Modal, ModalView, ModalDeactivate],
  templateUrl: './people-list.html',
  styleUrl: './people-list.scss',
})
export class PeopleList extends BaseList<TPersonModel> {
  peopleService = inject(PeopleService);

  toastService = inject(ToastService);

  router = inject(Router);

  route = inject(ActivatedRoute);

  html!: IPersonWebListConfig;

  titles!: ITableTitle<any>[];

  buttons!: ITableButton<any>[];

  isOpen = computed(() => this._isOpen());

  havePerson = computed(() => this._person());

  isDeactivating = signal<boolean>(false);

  private _isOpen = signal<boolean>(false);

  private _person = signal<TPersonModel | null>(null);

  constructor() {
    super();

    this.createData();
    this.setHtmlConfig();
  }

  isNaturalPerson() {
    return (this.route.snapshot.routeConfig?.path?.includes('naturalPerson') ? 'F' : 'J') == 'F';
  }

  onClosed() {
    this._isOpen.set(false);
    this.isDeactivating.set(false);
  }

  openModal(model: TPersonModel, isDeactivating?: boolean) {
    this._isOpen.set(true);
    if (!isDeactivating) {
      this.isDeactivating.set(false);
      this._person.set(model);
    } else {
      this.isDeactivating.set(true);
      this._person.set(model);
    }
  }

  onDeactivate(event: TPersonModel) {
    this.peopleService.delete(event.id!).subscribe({
      next : (_) => {
        this.reloadData();
        this.onClosed();
      },
      error : (_) => {
        this.onClosed();
      }
    });
    
  }

  override onNewRegister(): void {
    if (this.isNaturalPerson()) {
      this.router.navigate(['people', 'form', 'naturalPerson']);
    } else {
      this.router.navigate(['people', 'form', 'legalPerson']);
    }
  }

  override createData(): void {
    const routeData = toSignal(this.route.data);

    this.setTitlesConfig();
    this.setButtonsConfig();

    this.dataModel.set(routeData()?.['data']);
    this.configTable = computed(() => {
      return {
        data: this.dataModel(),
        titles: this.titles,
        buttons: this.buttons,
      };
    });
  }

  override reloadData() {
    this.toastService.show('As informações foram atualizadas', 'info', 1000);
    if (this.isNaturalPerson()) {
      this.peopleService.searchByQuery('F').subscribe((result) => {
        console.log(result)
        this.dataModel.set(result as TPersonModel[]);
      });
    } else {
      this.peopleService.searchByQuery('J').subscribe((result) => {
        console.log(result)
        this.dataModel.set(result as TPersonModel[]);
      });
    }
  }

  private setHtmlConfig() {
    if (this.isNaturalPerson()) {
      this.html = NATURAL_PERSON_LIST;
    } else {
      this.html = ENTITIES_PERSON_LIST;
    }
  }

  private setTitlesConfig() {
    if (this.isNaturalPerson()) {
      this.titles = this.makeTitlesNaturalPerson();
    } else {
      this.titles = this.makeTitlesLegalPerson();
    }
  }

  private makeTitlesNaturalPerson(): ITableTitle<INaturalPerson>[] {
    return [
      { name: 'MAIN.FEATURES.PEOPLE.NAMEF', dataField: 'name' },
      { name: 'MAIN.FEATURES.PEOPLE.NICKNAMEF', dataField: 'nickname' },
      { name: 'MAIN.FEATURES.PEOPLE.FEDERALDOCUMENTF', dataField: 'federalDocument' },
      { name: 'MAIN.FEATURES.PEOPLE.STATEDOCUMENTF', dataField: 'stateDocument' },
    ];
  }

  private makeTitlesLegalPerson(): ITableTitle<ILegalPerson>[] {
    return [
      { name: 'MAIN.FEATURES.PEOPLE.NAMEJ', dataField: 'name' },
      { name: 'MAIN.FEATURES.PEOPLE.NICKNAMEJ', dataField: 'nickname' },
      { name: 'MAIN.FEATURES.PEOPLE.FEDERALDOCUMENTJ', dataField: 'federalDocument' },
      { name: 'MAIN.FEATURES.PEOPLE.STATEDOCUMENTJ', dataField: 'stateDocument' },
    ];
  }

  private setButtonsConfig() {
    if (this.isNaturalPerson()) {
      this.buttons = this.makeButtonsNaturalPerson();
    } else {
      this.buttons = this.makeButtonsLegalPerson();
    }
  }

  private makeButtonsNaturalPerson(): ITableButton<INaturalPerson>[] {
    return [
      {
        name: 'COMMONS.VIEW',
        style: 'btn btn-primary',
        show: () => true,
        action: (data) => this.openModal(data),
      },
      {
        name: 'COMMONS.DEL',
        style: 'btn btn-danger',
        show: () => true,
        action: (data) => this.openModal(data, true),
      },
    ];
  }

  private makeButtonsLegalPerson(): ITableButton<ILegalPerson>[] {
    return [
      {
        name: 'COMMONS.VIEW',
        style: 'btn btn-primary',
        show: () => true,
        action: (data) => this.openModal(data),
      },
      {
        name: 'COMMONS.DEL',
        style: 'btn btn-danger',
        show: () => true,
        action: (data) => this.openModal(data, true),
      },
    ];
  }
}
