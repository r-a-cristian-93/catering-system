package com.catering.rest.db.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.catering.rest.db.models.AddressModel;
import com.catering.rest.db.models.ClientModel;
import com.catering.rest.db.repositories.AddressesRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AddressesService {
    private final AddressesRepository addressesRepo;

    public List<AddressModel> getAddresses() {
        return addressesRepo.findAll();
    }

    public AddressModel getAddress(Integer id) {
        return addressesRepo.findById(id).get();
    }

    public AddressModel addAddress(AddressModel address) {
        return addressesRepo.save(address);
    }

    public void deleteAddress(Integer id) {
        addressesRepo.deleteById(id);
    }

    public AddressModel updateAddress(Integer id, AddressModel address) {
        String value = address.getValue();
        address = addressesRepo.findById(id).get();

        if (value != null) {
            address.setValue(value);
        }

        return addressesRepo.save(address);
    }

    //PAGEABLE

	public Page<AddressModel> getAddressesByValueContainingPageable(
			String value,
			Integer page,
			Integer size,
			String prop,
			String dir) 	{
		Sort sort = AddressModel.sortBy(prop, dir);
		return addressesRepo.findByValueContaining(value, PageRequest.of(page, size, sort));
	}
}