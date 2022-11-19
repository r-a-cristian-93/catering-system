package com.catering.rest.db.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.catering.rest.db.models.UnitModel;
import com.catering.rest.db.repositories.UnitsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UnitsService {
    @Autowired
    private final UnitsRepository unitsRepo;

    public List<UnitModel> getUnits() {
        return unitsRepo.findAll();
    }
}