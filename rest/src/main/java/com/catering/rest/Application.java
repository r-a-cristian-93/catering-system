package com.catering.rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.catering.rest.db.repositories.CustomBaseRepository;

@SpringBootApplication
@EnableJpaRepositories(repositoryBaseClass = CustomBaseRepository.class)
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);		
	}
	
	@Bean
	public BCryptPasswordEncoder pwdEncoder() {		
		return new BCryptPasswordEncoder();
	}
}
