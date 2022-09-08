package com.catering.rest.db.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catering.rest.db.models.UnitModel;
import com.catering.rest.db.repositories.UnitsRepository;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("units")
public class UnitsController{
    UnitsRepository unitsRepo;

    @GetMapping
    public List<UnitModel> getUnits() {
        return unitsRepo.findAll();
    }
}