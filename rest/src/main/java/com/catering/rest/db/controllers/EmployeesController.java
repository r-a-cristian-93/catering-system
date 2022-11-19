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

import com.catering.rest.db.models.EmployeeModel;
import com.catering.rest.db.services.EmployeesService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("employees")
public class EmployeesController {
	@Autowired
	private final EmployeesService employeesService;

	@ResponseBody
	@GetMapping("/myinfo")
	public EmployeeModel getMyInfo() {
		return employeesService.getMyInfo();
	}

	@ResponseBody
	@GetMapping
	public List<EmployeeModel> getEmployees() {
		return employeesService.getEmployees();
	}

	@ResponseBody
	@PostMapping
	public EmployeeModel addEmployee(@RequestBody EmployeeModel employee) {
		return employeesService.addEmployee(employee);
	}

	@ResponseBody
	@GetMapping("/{id}")
	public EmployeeModel getEmployee(@PathVariable Integer id) {
		return employeesService.getEmployee(id);
	}

	@ResponseBody
	@DeleteMapping("/{id}")
	public void deleteEmployee(@PathVariable Integer id) {
		employeesService.deleteEmployee(id);
	}

	@ResponseBody
	@PutMapping("/{id}")
	public EmployeeModel updateEmployee(@PathVariable Integer id, @RequestBody EmployeeModel employee){
		return employeesService.updateEmployee(id, employee);
	}
}
