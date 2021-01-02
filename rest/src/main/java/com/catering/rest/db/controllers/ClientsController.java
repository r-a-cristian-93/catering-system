package com.catering.rest.db.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.catering.rest.db.models.ClientModel;
import com.catering.rest.db.repositories.ClientsRepository;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("clients")
public class ClientsController {
	ClientsRepository clientsRepo;		
	
	@ResponseBody
	@GetMapping
	public List<ClientModel> getClients() {
		return clientsRepo.findAll();
	}
	
	@ResponseBody
	@PostMapping
	public ClientModel addClient(@RequestBody ClientModel client) {
		return clientsRepo.save(client);		
	}
	
	@ResponseBody
	@GetMapping("/{id}")
	public ClientModel getClient(@PathVariable Integer id) {
		return clientsRepo.findById(id).get();
	}
	
	@ResponseBody
	@DeleteMapping("/{id}")
	public void deleteClient(@PathVariable Integer id) {
		clientsRepo.deleteById(id);		
	}
	
	@ResponseBody
	@PutMapping("/{id}")
	public ClientModel updateClient(@PathVariable Integer id, @RequestBody ClientModel client) {
		String name = client.getName();
		String address = client.getAddress();
		String phone = client.getPhone();
		client = clientsRepo.findById(id).get();
		
		if(name!=null) {
			client.setName(name);
		}
		if(address!=null) {
			client.setAddress(address);
		}
		if(phone!=null) {
			client.setPhone(phone);
		}
		return clientsRepo.save(client);
	}
}
