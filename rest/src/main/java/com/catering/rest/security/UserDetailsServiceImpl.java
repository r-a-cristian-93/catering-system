package com.catering.rest.security;

import java.util.ArrayList;

import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.catering.rest.db.models.EmployeeModel;
import com.catering.rest.db.repositories.EmployeesRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService{
	private EmployeesRepository employeesRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException, DataAccessException {
		EmployeeModel employee = employeesRepo.findByUsername(username);
		return new User(employee.getUsername(), employee.getPassword(), new ArrayList<>());
	}
}
