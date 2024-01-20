package com.catering.rest.db.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.catering.rest.db.models.AddressModel;

public interface AddressesRepository extends JpaRepository<AddressModel, Integer> {
    	Page<AddressModel> findByValueContaining(String value, Pageable pageable);
}
