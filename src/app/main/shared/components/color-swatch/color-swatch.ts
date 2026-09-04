import { Component, input } from '@angular/core';

@Component({
  selector: 'app-color-swatch',
  imports: [],
  templateUrl: './color-swatch.html',
  styleUrl: './color-swatch.scss',
})
export class ColorSwatch {
  color = input.required<string>();
}
