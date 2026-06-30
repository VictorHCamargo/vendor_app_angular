import { Component, inject } from '@angular/core';
import { Navbar } from './shared/components/navbar/navbar';
import { INavbarConfig } from './shared/components/navbar/interfaces/navbar-config';
import { RouterOutlet } from '@angular/router';
import { AuthStoreService } from './shared/services/auth-store-service';
import { ILanguagesConfig } from './shared/components/navbar/interfaces/languages-config';
import { LoadingComponents } from './shared/components/loading-components/loading-components';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, Navbar,LoadingComponents],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  private authStoreService = inject(AuthStoreService);
  navbarConfig: INavbarConfig[] = [
    {
      name: 'MAIN.SHARED.NAVBAR.PRODUCTS.NAME',
      way: '#',
      children: [
        {
          name: 'MAIN.SHARED.NAVBAR.PRODUCTS.CATEGORY',
          way: this.makeUrlExternalPartner(
            'https://vendor-app-angular-ypmd.onrender.com',
            '/category/list',
          ),
          children: [],
          external: true,
        },
        {
          name: 'MAIN.SHARED.NAVBAR.PRODUCTS.GROUP',
          way: '/group/list',
          children: [],
        },
        {
          name: 'MAIN.SHARED.NAVBAR.PRODUCTS.COIN',
          way: this.makeUrlExternalPartner(
            'https://vendor-app-angular-ypmd.onrender.com',
            '/coin/list',
          ),
          children: [],
          external: true,
        },
        {
          name: 'MAIN.SHARED.NAVBAR.PRODUCTS.MEASURE',
          way: this.makeUrlExternalPartner('https://vendor-angular.onrender.com', '/measure/list'),
          children: [],
          external: true,
        },
      ],
    },
    {
      name: 'MAIN.SHARED.NAVBAR.PEOPLE.NAME',
      way: '#',
      children: [
        {
          name: 'MAIN.SHARED.NAVBAR.PEOPLE.NATURAL',
          way: '/people/list/naturalPerson',
          children: [],
        },
        {
          name: 'MAIN.SHARED.NAVBAR.PEOPLE.LEGAL',
          way: '/people/list/legalPerson',
          children: [],
        },
      ],
    },
  ];

  languagesConfig : ILanguagesConfig[] = [
    {
      acronym : 'pt-BR',
      name : 'Português (Brasil)'
    },
    {
      acronym : 'en',
      name : 'English'
    },
    {
      acronym : 'es',
      name : 'Español'
    }
  ]
  private makeUrlExternalPartner(basePath: string, url: string) {
    return `${basePath}/externalPartner?redirect=${url}&secret=${this.authStoreService.getToken()}&exp=3600`;
  }
}
