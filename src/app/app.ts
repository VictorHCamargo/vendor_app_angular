import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/components/navbar/navbar";
import { InterfacesNavbar } from './shared/components/navbar/interfaces/interfaces-navbar';
import { ToastMessages } from './shared/components/toast-messages/toast-messages';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, ToastMessages],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular');

  InterfacesNavbar :  InterfacesNavbar[] = [
      {
        name : "produtos",
        way : "#",
        children : [
          {
            name : "categoria",
            way : "/category/list",
            children : []
          },
          {
            name : "grupos",
            way : "/group/list",
            children : []
          }
        ]
    }
  ]
}
