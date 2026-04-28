import { Component, inject } from '@angular/core';
import { Navbar } from './shared/components/navbar/navbar';
import { InterfacesNavbar } from './shared/components/navbar/interfaces/interfaces-navbar';
import { RouterOutlet } from '@angular/router';
import { AuthStoreService } from './shared/services/auth-store-service';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, Navbar],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  private authStoreService = inject(AuthStoreService)
  InterfacesNavbar: InterfacesNavbar[] = [
    {
      name: 'Produtos',
      way: '#',
      children: [
        {
          name: 'Categoria',
          way: this.makeUrlExternalPartner("https://vendor-app-angular-ypmd.onrender.com","/category/list"),
          children: [],
          external: true,
        },
        {
          name: 'Grupo',
          way: '/group/list',
          children: [],
        },
        {
          name: 'Moeda',
          way: this.makeUrlExternalPartner("https://vendor-app-angular-ypmd.onrender.com","/coin/list"),
          children: [],
          external: true,
        },
      ],
    },
  ];
  private makeUrlExternalPartner(basePath : string, url : string) {
    return `${basePath}/externalPartner?redirect=${url}&secret=${this.authStoreService.getToken()}&exp=3600`
  }
}
