package com.catering.rest.db.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.catering.rest.db.models.StatusModel;
import com.catering.rest.db.repositories.StatusRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatusService {
    @Autowired
    private final StatusRepository statusRepo;

    public List<StatusModel> getStatus() {
        return statusRepo.findAll();
    }

}
