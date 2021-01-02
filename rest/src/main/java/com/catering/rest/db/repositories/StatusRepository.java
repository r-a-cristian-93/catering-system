package com.catering.rest.db.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.catering.rest.db.models.StatusModel;

public interface StatusRepository extends JpaRepository<StatusModel, Integer> {
	StatusModel findByName(String name);
}
