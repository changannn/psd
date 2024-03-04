import { Component } from '@angular/core';

@Component({
  selector: 'app-noise-select',
  templateUrl: './noise-select.component.html',
  styleUrls: ['./noise-select.component.css']
})
export class NoiseSelectComponent {

inputTypes: string[] = ['default', 'user-defined', 'traffic']
selectedInputType: string = 'default';
}