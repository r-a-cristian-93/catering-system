package com.catering.rest.db.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.catering.rest.db.models.ClientAddressesModel;
import com.catering.rest.db.models.AddressModel;

public interface ClientsAddressesRepository extends JpaRepository<ClientAddressesModel, Integer> {
	List<ClientAddressesModel> findByClientId(Integer clientId);
	ClientAddressesModel findByClientIdAndAddress(Integer clientId, AddressModel address);
}
