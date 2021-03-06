package com.catering.rest.db.controllers;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
import com.catering.rest.db.models.RoleModel;
import com.catering.rest.db.repositories.EmployeesRepository;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("employees")
public class EmployeesController {
	EmployeesRepository employeesRepo;
	BCryptPasswordEncoder pwdEncoder;
	
	@ResponseBody
	@GetMapping("/myinfo")
	public EmployeeModel getMyInfo() {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return employeesRepo.findByUsername(username);
	}
	
	@ResponseBody
	@GetMapping
	@PreAuthorize("hasAuthority('admin')")
	public List<EmployeeModel> getEmployees() {
		return employeesRepo.findAll();
	}
	
	@ResponseBody
	@PostMapping
	@PreAuthorize("hasAuthority('admin')")
	public EmployeeModel addEmployee(@RequestBody EmployeeModel employee) {
		String password = pwdEncoder.encode(employee.getPassword());
		employee.setPassword(password);		
		return employeesRepo.save(employee);
	}
	
	@ResponseBody
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('admin')")
	public EmployeeModel getEmployee(@PathVariable Integer id) {
		return employeesRepo.findById(id).get();
	}
	
	@ResponseBody
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('admin')")
	public void deleteEmployee(@PathVariable Integer id) {
		employeesRepo.deleteById(id);
	}	
	
	@ResponseBody
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('admin')")
	public EmployeeModel updateEmployee(@PathVariable Integer id, @RequestBody EmployeeModel employee){
		String name = employee.getName();
		String email = employee.getEmail();
		String password = pwdEncoder.encode(employee.getPassword());
		RoleModel role = employee.getRole();
		employee = employeesRepo.findById(id).get();
		
		if(name!=null) {
			employee.setName(name);
		}
		if(email!=null) {
			employee.setEmail(email);
		}
		if(password!=null) {
			employee.setPassword(password);
		}
		if(role!=null) {
			employee.setRole(role);
		}
		return employeesRepo.save(employee);		
	}
}
