package com.psd.backend.model;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "form_table")
@Getter
@Setter
@Builder
public class Form {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String userMode;

    private String projectType;

    private String processors;

    private String materials;

    private String rgbValue;

    private String cityLocation;

    private String meshResolutionSolar;

    private String meshOffset;
    
    private String simulationTypes;
   
    private String selectedSimulationType;
    
    private Boolean solarIrradiationCheckbox;
    
    private Boolean absorbedSolarEnergyCheckbox;
    
    private Boolean solarShadingCheckbox;
    
    private Boolean daylightIlluminanceCheckbox;
    
    private Boolean absorbedHeatFluxCheckbox;
    
    private Boolean skyViewFactorCheckbox;    
    
    private Date startDate;
    
    private Date endDate;
    
    private String numOfReflections;
    
    private String numOfSamplingRays;
    
    private String sunInclusion;
    
    private String multiband;

    private String receiverGrid;
    
    private String receiverOffset;
    
    private String meshResolutionNoise;
    
    private String roadCategory;

    private String inputTypes;
    
    private String selectedInputType;
    
    private String inputValue;
    
    private String materialAbsorption;
    
    private String numOfVehicle;
    
    private String vehicleSpeed;
    
    private String heavyVehicle;


}
