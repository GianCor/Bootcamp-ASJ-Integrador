package com.abmApi.abmApi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abmApi.abmApi.entities.BridgeStats;
import com.abmApi.abmApi.services.BridgeService;

@RestController
@RequestMapping("/bridge")
public class BridgeController {

    @Autowired
    private BridgeService bridgeService;

    @GetMapping
    public BridgeStats getStats() {
        return bridgeService.getBridgeStats();
    }
}