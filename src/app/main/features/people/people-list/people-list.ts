import { Component, computed, inject, signal } from '@angular/core';
import { BaseList } from '../../../shared/class/base-list';
import { Table } from '../../../shared/components/table/table';
import { IPersonWebListConfig } from '../interfaces/person-web-config';
import { PeopleService } from '../services/people-service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ILegalPerson, INaturalPerson, TPersonModel } from '../interfaces/person-model';
import { ENTITIES_PERSON_LIST, NATURAL_PERSON_LIST } from '../tools/person-setup';
import { ITableTitle } from '../../../shared/components/table/interfaces/table-title';
import { ITableButton } from '../../../shared/components/table/interfaces/table-button';
import { Modal } from '../../../shared/components/modal/modal';
import { ModalView } from './components/modal-view/modal-view';

@Component({
  selector: 'app-people-list',
  imports: [Table, Modal, ModalView],
  templateUrl: './people-list.html',
  styleUrl: './people-list.scss',
})
export class PeopleList extends BaseList<TPersonModel> {
  peopleService = inject(PeopleService);

  router = inject(Router);

  route = inject(ActivatedRoute);

  html!: IPersonWebListConfig;

  titles!: ITableTitle<any>[];

  buttons!: ITableButton<any>[];

  isOpen = computed(() => this._isOpen());

  havePerson = computed(() => this._person());

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
  }

  openModal(model: TPersonModel) {
    this._isOpen.set(true);
    this._person.set(model);
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
      { name: 'MAIN.FEATURES.PEOPLE.STATEDOCUMENTJ', dataField: 'stateDocument' },
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
    ];
  }
}
