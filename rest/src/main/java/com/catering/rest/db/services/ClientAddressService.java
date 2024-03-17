package com.catering.rest.db.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.catering.rest.db.models.ClientAddressModel;
import com.catering.rest.db.repositories.ClientsAddressesRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClientAddressService {
    private final ClientsAddressesRepository addressesRepo;

    public List<ClientAddressModel> getClientAddresses() {
        return addressesRepo.findAll();
    }

    public ClientAddressModel getClientAddress(Integer id) {
        return addressesRepo.findById(id).get();
    }

    public ClientAddressModel addClientAddress(ClientAddressModel address) {
        return addressesRepo.save(address);
    }

    public void deleteClientAddress(Integer id) {
        addressesRepo.deleteById(id);
    }

    public ClientAddressModel updateClientAddress(Integer id, ClientAddressModel address) {
        String value = address.getValue();
        Float latitude = address.getLatitude();
        Float longitude = address.getLongitude();

        address = addressesRepo.findById(id).get();

        if (value != null) {
            address.setValue(value);
        }

        if (latitude != null) {
            address.setLatitude(latitude);
        }

        if (longitude != null) {
            address.setLongitude(longitude);
        }

        return addressesRepo.save(address);
    }
}