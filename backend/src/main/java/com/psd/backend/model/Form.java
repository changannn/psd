package com.psd.backend.model;

import java.sql.Date;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
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
    @Column(name = "id")
    private Integer id;

    @Column(name = "username")
    private String username;

    @Column(name = "user_mode")
    private String userMode;

    @Column(name = "project_type")
    private String projectType;

    @Column(name = "processors")
    private String processors;

    @Column(name = "materials")
    private String materials;

    @Column(name = "rgb_value")
    private String rgbValue;

    @Column(name = "city_location")
    private String cityLocation;

    @Column(name = "mesh_resolution_solar")
    private String meshResolutionSolar;

    @Column(name = "mesh_offset")
    private String meshOffset;
    
    @Column(name = "simulation_types")
    private String simulationTypes;
   
    @Column(name = "selected_simulation_type")
    private String selectedSimulationType;
    
    @Column(name = "solar_irradiation_checkbox")
    private Boolean solarIrradiationCheckbox;
    
    @Column(name = "absorbed_solar_energy_checkbox")
    private Boolean absorbedSolarEnergyCheckbox;
    
    @Column(name = "solar_shading_checkbox")
    private Boolean solarShadingCheckbox;
    
    @Column(name = "daylight_illuminance_checkbox")
    private Boolean daylightIlluminanceCheckbox;
    
    @Column(name = "absorbed_heat_flux_checkbox")
    private Boolean absorbedHeatFluxCheckbox;
    
    @Column(name = "sky_view_factor_checkbox")
    private Boolean skyViewFactorCheckbox;    
    
    @Column(name = "start_date")
    private Date startDate;
    
    @Column(name = "end_date")
    private Date endDate;
    
    @Column(name = "num_of_reflections")
    private String numOfReflections;
    
    @Column(name = "num_of_sampling_rays")
    private String numOfSamplingRays;
    
    @Column(name = "sun_inclusion")
    private String sunInclusion;
    
    @Column(name = "multiband")
    private String multiband;

    @Column(name = "receiver_grid")
    private String receiverGrid;
    
    @Column(name = "receiver_offset")
    private String receiverOffset;
    
    @Column(name = "mesh_resolution_noise")
    private String meshResolutionNoise;
    
    @Column(name = "road_category")
    private String roadCategory;

    @Column(name = "input_types")
    private String inputTypes;
    
    @Column(name = "selected_input_type")
    private String selectedInputType;
    
    @Column(name = "input_value")
    private String inputValue;
    
    @Column(name = "material_absorption")
    private String materialAbsorption;
    
    @Column(name = "num_of_vehicle")
    private String numOfVehicle;
    
    @Column(name = "vehicle_speed")
    private String vehicleSpeed;
    
    @Column(name = "heavy_vehicle")
    private String heavyVehicle;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;


}
