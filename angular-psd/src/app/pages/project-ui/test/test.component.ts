import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  // project
  //projectDir
  //stlFile
  userMode: string[] = ['Basic', 'Advanced'];
  projectType: string[] = ['Solar', 'Wind', 'Noise', 'Wind & Solar', 'Wind & Noise'];
  processors: number[] = Array.from({length:128}, (_, i) => i+1);
  materials: string[] = ['Asphalt_16',
                          'Concrete_2',
                          'Glass_ClearFloat_6',
                          'Grass_24',
                          'Grass_38',
                          'Paint_Beige_51',
                          'Paint_Black_5',
                          'Paint_Brown_9',
                          'Paint_DarkGreen_12',
                          'Paint_DeepOcean_29',
                          'Paint_LightBlue_48',
                          'Paint_LightGreen_24',
                          'Paint_Orange_58',
                          'Paint_Red_39',
                          'Paint_White_63',
                          'TreeCanopy_InvertedCone_9_91_88',
                          'TreeCanopy_Oblong_26_74_95',
                          'TreeCanopy_Round_16_84_89',
                          'TreeCanopy_Umbrella_14_86_95',
                          'TreeLeaf_27',
                          'TreeTrunk_34',
                          'Water_Clear_3',
                          'Water_Muddy_14',
  ];
  rgbValue: string = 'N/A';

  // solar
  cityLocation: string[] = ['Singapore'];
  meshResolutionSolar: string = "";
  meshOffset: string = "";
  simulationTypes: string[] = ['Cumulative Sky', 'point-in-time'];
  selectedSimulationType: string = 'Cumulative Sky';
  solarIrradiationCheckbox: boolean = true;
  absorbedSolarEnergyCheckbox: boolean = true;
  solarShadingCheckbox: boolean = false;
  daylightIlluminanceCheckbox: boolean = false;
  absorbedHeatFluxCheckbox: boolean = false;
  skyViewFactorCheckbox: boolean = false;
  startDate: Date | undefined;
  endDate: Date | undefined;
  numOfReflections: number[] = [0, 1, 2];
  numOfSamplingRays: number[] = [64, 128, 256, 512, 1024, 2048];
  sunInclusion: string[] = ['yes', 'no'];
  multiband: string[] = ['total', 'totalmultiband'];

  
  
  // noise
  receiverGrid: string[] = ['cut-plane', 'facade'];
  receiverOffset: string = "";
  meshResolutionNoise: string = "";
  roadCategory: string[] = [
    'category 1', 
    'category 2', 
    'category 3', 
    'category 4', 
    'category 5'];
  inputTypes: string[] = ['default', 'user-defined', 'traffic']
  selectedInputType: string = "default";
  inputValue: string = "";
  materialAbsorption: string[] = ['0', '1'];
  numOfVehicle: string = "";
  vehicleSpeed: string = "";
  heavyVehicle: string = "";

  formData = new FormGroup({

    // project
    userMode: new FormControl(this.userMode[0]),
    processor: new FormControl(this.processors[0]),
    projectType: new FormControl(this.projectType[0]),
    material: new FormControl(this.materials[0]),
    colourPicker: new FormControl(this.rgbValue),

    // solar
    cityLocation: new FormControl(this.cityLocation[0]),
    meshResolutionSolar: new FormControl(this.meshResolutionSolar),
    meshOffset: new FormControl(this.meshOffset),
    simulationType: new FormControl(this.selectedSimulationType),
    solarIrradiationCheckbox: new FormControl(this.solarIrradiationCheckbox),
    absorbedSolarEnergyCheckbox: new FormControl(this.absorbedSolarEnergyCheckbox),
    solarShadingCheckbox: new FormControl(this.solarShadingCheckbox),
    daylightIlluminanceCheckbox: new FormControl(this.daylightIlluminanceCheckbox),
    absorbedHeatFluxCheckbox: new FormControl(this.absorbedHeatFluxCheckbox),
    skyViewFactorCheckbox: new FormControl(this.skyViewFactorCheckbox),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    numOfReflections: new FormControl(this.numOfReflections[0]),
    numOfSamplingRays: new FormControl(this.numOfSamplingRays[0]),
    sunInclusion: new FormControl(this.sunInclusion[0]),
    multiband: new FormControl(this.multiband[0]),

    // noise
    receiverGrid: new FormControl(this.receiverGrid[0]),
    receiverOffset: new FormControl(this.receiverOffset),
    meshResolutionNoise: new FormControl(this.meshResolutionNoise),
    roadCategory: new FormControl(this.roadCategory[0]),
    inputType: new FormControl(this.selectedInputType),
    inputValue: new FormControl(this.heavyVehicle),
    materialAbsorption: new FormControl(this.materialAbsorption[0]),
    numOfVehicle: new FormControl(this.numOfVehicle),
    vehicleSpeed: new FormControl(this.vehicleSpeed),
    heavyVehicle: new FormControl(this.heavyVehicle),

  });

  constructor(private http: HttpClient, private formbuilder: FormBuilder) {
    }
  

  onColorChange(event: any) {
    const selectedColor = event.target.value;
    this.rgbValue = this.hexToRgb(selectedColor);
  }

  private hexToRgb(hex: string): string {
    // Remove '#' if present
    hex = hex.replace(/^#/, '');

    // Parse hex values
    const bigint = parseInt(hex, 16);

    // Extract RGB components
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `(${r}, ${g}, ${b})`;
  }

  onSubmit() {
    const serializedData = JSON.stringify(this.formData);
    this.http.post<FormData>('http://localhost:8080/test', this.formData).subscribe(
      response => {
        console.log('Data submitted successfully:', response);
      },
      error => {
        console.error('Error submitting data:', error);
      }
    );
    localStorage.removeItem('formDraft')
  }

  saveDraft() {
    localStorage.setItem('formDraft', JSON.stringify(this.formData));
  }

  onFormChange(): void {
    this.saveDraft();
  }

  ngOnInit() {

    const draft = localStorage.getItem('formData');
    if(draft) {
      this.formData = JSON.parse(draft);
    }
  }

}
