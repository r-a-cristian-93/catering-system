package com.catering.rest.db.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.catering.rest.db.models.UnitModel;

public interface UnitsRepository extends JpaRepository<UnitModel, Integer> {	
	UnitModel findByName(String name);
}
