package com.catering.rest.db.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.catering.rest.db.models.ClientAddressModel;
import com.catering.rest.db.services.ClientAddressService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("addresses")
public class ClientAddressController {
    @Autowired
    private final ClientAddressService addressesService;

    @ResponseBody
    @GetMapping
    public List<ClientAddressModel> getClientAddresses() {
        return addressesService.getClientAddresses();
    }

    @ResponseBody
    @GetMapping("/{id}")
    public ClientAddressModel getClientAddress(@PathVariable Integer id) {
        return addressesService.getClientAddress(id);
    }

    @ResponseBody
    @PostMapping
    public ClientAddressModel addClientAddress(@RequestBody ClientAddressModel address) {
        return addressesService.addClientAddress(address);
    }

    @ResponseBody
    @PutMapping("/{id}")
    public ClientAddressModel updateClientAddress(@PathVariable Integer id, @RequestBody ClientAddressModel address) {
        return addressesService.updateClientAddress(id, address);
    }

    @ResponseBody
    @DeleteMapping("/{id}")
    public void deleteClientAddress(@PathVariable Integer id) {
        addressesService.deleteClientAddress(id);
    }
}
