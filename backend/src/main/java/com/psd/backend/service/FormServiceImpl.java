package com.psd.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.psd.backend.model.Form;
import com.psd.backend.respository.FormRepository;

@Service
public class FormServiceImpl implements FormService {

    @Autowired
    FormRepository formRepository;

    @Override
    public Form saveForm(Form form) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Form newform = Form.builder()
        .username(username)
        .userMode(form.getUserMode())
        .projectType(form.getProjectType())
        .processors(form.getProcessors())
        .materials(form.getMaterials())
        .rgbValue(form.getRgbValue())
        .cityLocation(form.getCityLocation())
        .meshResolutionSolar(form.getMeshResolutionSolar())
        .meshOffset(form.getMeshOffset())
        .simulationTypes(form.getSimulationTypes())
        .selectedSimulationType(form.getSelectedSimulationType())
        .solarIrradiationCheckbox(form.getSolarIrradiationCheckbox())
        .absorbedSolarEnergyCheckbox(form.getAbsorbedSolarEnergyCheckbox())
        .solarShadingCheckbox(form.getSolarShadingCheckbox())
        .daylightIlluminanceCheckbox(form.getDaylightIlluminanceCheckbox())
        .absorbedHeatFluxCheckbox(form.getAbsorbedHeatFluxCheckbox())
        .skyViewFactorCheckbox(form.getSkyViewFactorCheckbox())
        .startDate(form.getStartDate())
        .endDate(form.getEndDate())
        .numOfReflections(form.getNumOfReflections())
        .numOfSamplingRays(form.getNumOfSamplingRays())
        .sunInclusion(form.getSunInclusion())
        .multiband(form.getMultiband())
        .receiverGrid(form.getReceiverGrid())
        .receiverOffset(form.getReceiverOffset())
        .meshResolutionNoise(form.getMeshResolutionNoise())
        .roadCategory(form.getRoadCategory())
        .inputTypes(form.getInputTypes())
        .selectedInputType(form.getSelectedInputType())
        .inputValue(form.getInputValue())
        .materialAbsorption(form.getMaterialAbsorption())
        .numOfVehicle(form.getNumOfVehicle())
        .vehicleSpeed(form.getVehicleSpeed())
        .heavyVehicle(form.getHeavyVehicle())
        .build();
        return formRepository.save(newform);
    }

    @Override
    public Form getForm() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return formRepository.findByUsername(username);
    }
    
}
