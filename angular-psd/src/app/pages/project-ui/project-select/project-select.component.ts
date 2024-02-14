import { Component } from '@angular/core';

@Component({
  selector: 'app-project-select',
  templateUrl: './project-select.component.html',
  styleUrls: ['./project-select.component.css']
})
export class ProjectSelectComponent {
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

  constructor() {
    }
  
  rgbValue: string = 'N/A';

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
}


