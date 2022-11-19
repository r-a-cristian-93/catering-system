package com.catering.rest.db.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catering.rest.db.models.UnitModel;
import com.catering.rest.db.services.UnitsService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("units")
public class UnitsController{
    @Autowired
    private final UnitsService unitsService;

    @GetMapping
    public List<UnitModel> getUnits() {
        return unitsService.getUnits();
    }
}