import { Component } from '@angular/core';

@Component({
  selector: 'app-solar-select',
  templateUrl: './solar-select.component.html',
  styleUrls: ['./solar-select.component.css']
})
export class SolarSelectComponent {
  simulationTypes: string[] = ['Cumulative Sky', 'point-in-time'];
  selectedSimulationType: string = 'Cumulative Sky';
  numOfReflections: number[] = [0, 1, 2];
  numOfSamplingRays: number[] = [64, 128, 256, 512, 1024, 2048];


}
