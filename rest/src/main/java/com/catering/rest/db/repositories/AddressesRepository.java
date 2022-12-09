package com.catering.rest.db.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.catering.rest.db.models.AddressModel;

public interface AddressesRepository extends JpaRepository<AddressModel, Integer> {

}
