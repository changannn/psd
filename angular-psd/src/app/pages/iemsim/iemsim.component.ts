import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Form } from 'src/app/models/form';
import { AuthService } from 'src/app/services/auth.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-iemsim',
  templateUrl: './iemsim.component.html',
  styleUrls: ['./iemsim.component.css']
})
export class IemsimComponent {

  forms: Form[] = [];

  showSubmitSuccessToast = false;
  showSubmitErrorToast = false;
  formResponseData: any;
  role: any;

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
  meshResolutionSolar: string = '';
  meshOffset: string = '';
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
  receiverOffset: string = '';
  meshResolutionNoise: string = '';
  roadCategory: string[] = [
    'category 1', 
    'category 2', 
    'category 3', 
    'category 4', 
    'category 5'];
  inputTypes: string[] = ['default', 'user-defined', 'traffic']
  selectedInputType: string = 'default';
  inputValue: string = '';
  materialAbsorption: string[] = ['0', '1'];
  numOfVehicle: string = '';
  vehicleSpeed: string = '';
  heavyVehicle: string = '';

  formData = this.formbuilder.group({

    // project - 5
    userMode: [this.userMode[0]],
    processors: [this.processors[0]],
    projectType: [this.projectType[0]],
    materials: [this.materials[0]],
    rgbValue: [this.rgbValue],
    // solar - 16
    cityLocation: [this.cityLocation[0]],
    meshResolutionSolar: [this.meshResolutionSolar],
    meshOffset: [this.meshOffset],
    simulationTypes: [this.simulationTypes[0]],
    solarIrradiationCheckbox: [this.solarIrradiationCheckbox],
    absorbedSolarEnergyCheckbox: [this.absorbedSolarEnergyCheckbox],
    solarShadingCheckbox: [this.solarShadingCheckbox],
    daylightIlluminanceCheckbox: [this.daylightIlluminanceCheckbox],
    absorbedHeatFluxCheckbox: [this.absorbedHeatFluxCheckbox],
    skyViewFactorCheckbox: [this.skyViewFactorCheckbox],
    startDate: [''],
    endDate: [''],
    numOfReflections: [this.numOfReflections[0]],
    numOfSamplingRays: [this.numOfSamplingRays[0]],
    sunInclusion: [this.sunInclusion[0]],
    multiband: [this.multiband[0]],
    // noise - 10
    receiverGrid: [this.receiverGrid[0]],
    receiverOffset: [this.receiverOffset],
    meshResolutionNoise: [this.meshResolutionNoise],
    roadCategory: [this.roadCategory[0]],
    inputTypes: [this.inputTypes[0]],
    inputValue: [this.heavyVehicle],
    materialAbsorption: [this.materialAbsorption[0]],
    numOfVehicle: [this.numOfVehicle],
    vehicleSpeed: [this.vehicleSpeed],
    heavyVehicle: [this.heavyVehicle],
  });

  constructor(private formbuilder: FormBuilder, private formService: FormService, private authService: AuthService) { 
    console.log(this.authService.getRole())
    this.role = this.authService.getRole();
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

  ngOnInit() {
    this.getFormsHistory();
  }

  onSubmit(): void {
    const jsonForm = JSON.stringify(this.formData.value);
    // console.log("submitting form", JSON.stringify(this.formData.value)); // inspect element in browser to check
    this.formService.sendToBackend(jsonForm).subscribe(
      response => {
        console.log('submit success', response);
        this.showSubmitSuccessToast = true;
        setTimeout(()=>{this.showSubmitSuccessToast=false;}, 2000);
        this.showSubmitErrorToast = false;
        this.getFormsHistory();
      },
      error => {
        console.error('error when submitting', error);
        this.showSubmitErrorToast = true;
        setTimeout(()=>{this.showSubmitErrorToast=false;}, 2000);
        this.showSubmitSuccessToast = false;
      }
    );
  }
  getFormsHistory() {
    this.formService.fromBackend().subscribe(
      data => {
        console.log('get form success');
        this.forms = data;
      },
      error => {
        console.log('error getting form');
      }
    )
  }
}
