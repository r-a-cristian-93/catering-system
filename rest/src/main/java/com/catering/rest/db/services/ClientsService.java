package com.catering.rest.db.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.catering.rest.db.models.ClientModel;
import com.catering.rest.db.repositories.ClientsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClientsService {
    private final ClientsRepository clientsRepo;

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
		client = clientsRepo.findById(id).get();

		if(name!=null) {
			client.setName(name);
		}
		if(phone!=null) {
			client.setPhone(phone);
		}
		return clientsRepo.save(client);
	}
}
