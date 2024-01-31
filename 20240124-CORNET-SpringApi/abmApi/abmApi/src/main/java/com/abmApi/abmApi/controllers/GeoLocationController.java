package com.abmApi.abmApi.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abmApi.abmApi.services.GeoLocationService;

@RestController
@RequestMapping("/geolocation")
public class GeoLocationController {
	@Autowired
	GeoLocationService geoLocationService;
	
	@GetMapping("/test")
	public ResponseEntity<String> test() {
		return ResponseEntity.ok(null);
	}
	
    @GetMapping
    public List<Map<String, Object>> getSupplier(){
        return geoLocationService.getGeoLocations();
    }
}
