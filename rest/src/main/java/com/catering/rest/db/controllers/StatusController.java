package com.catering.rest.db.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catering.rest.db.models.StatusModel;
import com.catering.rest.db.services.StatusService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("status")
public class StatusController {
	private final StatusService statusService;

	@GetMapping
	public List<StatusModel> getStatus() {
		return statusService.getStatus();
	}

}
