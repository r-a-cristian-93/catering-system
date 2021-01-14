package com.catering.rest.db.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catering.rest.db.models.StatusModel;
import com.catering.rest.db.repositories.StatusRepository;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("status")
public class StatusController {
	StatusRepository statusRepo;
	
	@GetMapping
	public List<StatusModel> getStatus() {
		return statusRepo.findAll();
	}

}
