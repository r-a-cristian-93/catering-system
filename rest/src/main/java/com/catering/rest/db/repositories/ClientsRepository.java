package com.catering.rest.db.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.catering.rest.db.models.ClientModel;

public interface ClientsRepository extends JpaRepository<ClientModel, Integer>{

}
