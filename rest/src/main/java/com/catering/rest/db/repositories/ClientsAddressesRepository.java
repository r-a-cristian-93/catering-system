package com.catering.rest.db.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.catering.rest.db.models.ClientAddressModel;

public interface ClientsAddressesRepository extends JpaRepository<ClientAddressModel, Integer> {
	List<ClientAddressModel> findByClientId(Integer clientId);
	// ClientAddressModel findByClientIdAndAddress(Integer clientId, AddressModel address);
}
