export interface Form {
    id: number;
    username: string;
    userMode: string;
    projectType: string;
    processors: number;
    materials: string;
    rgbValue: string;
    cityLocation: string;
    meshResolutionSolar: string;
    meshOffset: string;
    simulationTypes: string;
    solarIrradiationCheckbox: boolean;
    absorbedSolarEnergyCheckbox: boolean;
    solarShadingCheckbox: boolean;
    daylightIlluminanceCheckbox: boolean;
    absorbedHeatFluxCheckbox: boolean;
    skyViewFactorCheckbox: boolean;
    startDate: Date;
    endDate: Date;
    numOfReflections: number;
    numOfSamplingRays: number;
    sunInclusion: string;
    multiband: string;
    receiverGrid: string;
    receiverOffset: string;
    meshResolutionNoise: string;
    roadCategory: string;
    inputTypes: string;
    inputValue: string;
    materialAbsorption: string;
    numOfVehicle: string;
    vehicleSpeed: string;
    heavyVehicle: string;
    createdAt: Date;
}

