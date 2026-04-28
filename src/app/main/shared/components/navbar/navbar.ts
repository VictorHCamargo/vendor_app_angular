import { Component, input } from '@angular/core';
import { InterfacesNavbar } from './interfaces/interfaces-navbar';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  components = input<InterfacesNavbar[]>([]);

  hasExternalRedirect(url : string) : boolean {
    url.includes("");



    return false
  }
}
