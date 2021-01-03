package com.catering.rest.db.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.catering.rest.db.models.EmployeeModel;

public interface EmployeesRepository extends JpaRepository<EmployeeModel, Integer> {
	EmployeeModel findByUsername(String username);

}
