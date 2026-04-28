import { Component } from '@angular/core';
import { Navbar } from './shared/components/navbar/navbar';
import { InterfacesNavbar } from './shared/components/navbar/interfaces/interfaces-navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, Navbar],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  InterfacesNavbar: InterfacesNavbar[] = [
    {
      name: 'produtos',
      way: '#',
      children: [
        {
          name: 'categoria',
          way: '/category/list',
          children: [],
        },
        {
          name: 'grupos',
          way: '/group/list',
          children: [],
        },
      ],
    },
  ];
}
