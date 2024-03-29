package com.catering.rest.db.controllers;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.catering.rest.db.models.ClientModel;
import com.catering.rest.db.models.ClientAddressModel;
import com.catering.rest.db.services.ClientsService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("clients")
public class ClientsController {
	private final ClientsService clientsService;

	@ResponseBody
	@GetMapping
	public List<ClientModel> getClients() {
		return clientsService.getClients();
	}

	@ResponseBody
	@PostMapping
	public ClientModel addClient(@RequestBody ClientModel client) {
		return clientsService.addClient(client);
	}

	@ResponseBody
	@GetMapping("/{id}")
	public ClientModel getClient(@PathVariable Integer id) {
		return clientsService.getClient(id);
	}

	@ResponseBody
	@DeleteMapping("/{id}")
	public void deleteClient(@PathVariable Integer id) {
		clientsService.deleteClient(id);
	}

	@ResponseBody
	@PutMapping
	public ClientModel updateClient(@RequestBody ClientModel client) {
		return clientsService.updateClient(client);
	}

		//PAGEABLE

	@ResponseBody
	@GetMapping("/allPageable")
	public Page<ClientModel> getClientsPageable(
			@RequestParam Integer page,
			@RequestParam Integer size,
			@RequestParam String prop,
			@RequestParam String dir) {
		return clientsService.getClientsPageable(page, size, prop, dir);
	}

	@ResponseBody
	@GetMapping("/byNameContainginPageable")
	public Page<ClientModel> getClientsByNameContainingPageable(
			@RequestParam String name,
			@RequestParam Integer page,
			@RequestParam Integer size,
			@RequestParam String prop,
			@RequestParam String dir) {
		return clientsService.getClientsByNameContainingPageable(name, page, size, prop, dir);
	}


	// CLIENTS ADDRESSES

	// @ResponseBody
	// @GetMapping("/{clientId}/addresses")
	// public List<ClientAddressModel> getAddresses(@PathVariable Integer clientId) {
	// 	return clientsService.getAddresses(clientId);
	// }
}
