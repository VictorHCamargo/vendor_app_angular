import { Component,input } from '@angular/core';
import { InterfacesNavbar } from './interfaces/interfaces-navbar';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  components = input<InterfacesNavbar[]>([]);
}
