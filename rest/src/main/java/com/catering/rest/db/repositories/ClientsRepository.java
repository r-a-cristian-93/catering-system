package com.catering.rest.db.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.catering.rest.db.models.ClientModel;

public interface ClientsRepository extends JpaRepository<ClientModel, Integer>{
	ClientModel findByName(String name);

	Page<ClientModel> findByNameContaining(String name, Pageable pageable);
}
