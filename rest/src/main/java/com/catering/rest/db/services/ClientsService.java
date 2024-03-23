package com.catering.rest.db.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.catering.rest.db.models.ClientModel;
import com.catering.rest.db.models.ClientAddressModel;
import com.catering.rest.db.repositories.ClientsRepository;
import com.catering.rest.db.repositories.ClientsAddressesRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClientsService {
	private final ClientsRepository clientsRepo;
	private final ClientsAddressesRepository clientsAddressesRepo;

	public List<ClientModel> getClients() {
		return clientsRepo.findAll();
	}

	public ClientModel addClient(ClientModel client) {
		return clientsRepo.save(client);
	}

	public ClientModel getClient(Integer id) {
		return clientsRepo.findById(id).get();
	}

	public void deleteClient(Integer id) {
		clientsRepo.deleteById(id);
	}

	public ClientModel updateClient(Integer id, ClientModel client) {
		String name = client.getName();
		String phone = client.getPhone();
		ClientAddressModel address = client.getAddress();
		client = clientsRepo.findById(id).get();

		if(name!=null) {
			client.setName(name);
		}
		if(phone!=null) {
			client.setPhone(phone);
		}
		if(address!=null) {
			client.setAddress(address);
		}
		return clientsRepo.save(client);
	}

		//PAGEABLE

	public Page<ClientModel> getClientsPageable(
			Integer page,
			Integer size,
			String prop,
			String dir) {
		Sort sort = ClientModel.sortBy(prop, dir);
		return clientsRepo.findAll(PageRequest.of(page, size, sort));
	}

	public Page<ClientModel> getClientsByNameContainingPageable(
			String name,
			Integer page,
			Integer size,
			String prop,
			String dir) 	{
		Sort sort = ClientModel.sortBy(prop, dir);
		return clientsRepo.findByNameContaining(name, PageRequest.of(page, size, sort));
	}

	// CLIENTS ADDRESSES

	// public List<ClientAddressModel> getAddresses(Integer clientId) {
	// 	return clientsAddressesRepo.findByClientId(clientId);
	// }
}
