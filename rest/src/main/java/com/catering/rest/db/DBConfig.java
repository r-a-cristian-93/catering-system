package com.catering.rest.db;

import static com.catering.rest.Constants.DB_DRIVER;
import static com.catering.rest.Constants.DB_PASSWORD;
import static com.catering.rest.Constants.DB_URL;
import static com.catering.rest.Constants.DB_USERNAME;

import javax.sql.DataSource;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class DBConfig {
	@Bean
	public DataSource getDataSource() {
		return DataSourceBuilder.create()
				.driverClassName(DB_DRIVER)
				.url(DB_URL)
				.username(DB_USERNAME)
				.password(DB_PASSWORD)
				.build();			
	}
}
