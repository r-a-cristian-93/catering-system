package com.catering.rest.db.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.catering.rest.db.models.AddressModel;
import com.catering.rest.db.services.AddressesService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("addresses")
public class AddressController {
    @Autowired
    private final AddressesService addressesService;

    @ResponseBody
    @GetMapping
    public List<AddressModel> getAddresses() {
        return addressesService.getAddresses();
    }

    @ResponseBody
    @GetMapping("/{id}")
    public AddressModel getAddress(@PathVariable Integer id) {
        return addressesService.getAddress(id);
    }

    @ResponseBody
    @PostMapping
    public AddressModel addAddress(@RequestBody AddressModel address) {
        return addressesService.addAddress(address);
    }

    @ResponseBody
    @PutMapping("/{id}")
    public AddressModel updateAddress(@PathVariable Integer id, @RequestBody AddressModel address) {
        return addressesService.updateAddress(id, address);
    }

    @ResponseBody
    @DeleteMapping("/{id}")
    public void deleteAddress(@PathVariable Integer id) {
        addressesService.deleteAddress(id);
    }

    //PAGEABLE

    @ResponseBody
	@GetMapping("/byValueContainingPageable")
	public Page<AddressModel> getClientsByNameContainingPageable(
			@RequestParam String value,
			@RequestParam Integer page,
			@RequestParam Integer size,
			@RequestParam String prop,
			@RequestParam String dir) {
		return addressesService.getAddressesByValueContainingPageable(value, page, size, prop, dir);
	}
}
