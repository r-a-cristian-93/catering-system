package com.catering.rest.db.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.catering.rest.db.models.EmployeeModel;
import com.catering.rest.db.models.RoleModel;
import com.catering.rest.db.repositories.EmployeesRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeesService {
    @Autowired
    private final EmployeesRepository employeesRepo;
    @Autowired
    private final BCryptPasswordEncoder pwdEncoder;

	public EmployeeModel getMyInfo() {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return employeesRepo.findByUsername(username);
	}

	@PreAuthorize("hasAuthority('admin')")
	public List<EmployeeModel> getEmployees() {
		return employeesRepo.findAll();
	}

	@PreAuthorize("hasAuthority('admin')")
	public EmployeeModel addEmployee(EmployeeModel employee) {
		String password = pwdEncoder.encode(employee.getPassword());
		employee.setPassword(password);
		return employeesRepo.save(employee);
	}

	@PreAuthorize("hasAuthority('admin')")
	public EmployeeModel getEmployee(Integer id) {
		return employeesRepo.findById(id).get();
	}

	@PreAuthorize("hasAuthority('admin')")
	public void deleteEmployee(Integer id) {
		employeesRepo.deleteById(id);
	}

	@PreAuthorize("hasAuthority('admin')")
	public EmployeeModel updateEmployee(Integer id, EmployeeModel employee){
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
