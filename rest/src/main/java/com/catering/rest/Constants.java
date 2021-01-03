package com.catering.rest;

import com.auth0.jwt.algorithms.Algorithm;

public class Constants {
	public static final String DB_DRIVER = "com.mysql.cj.jdbc.Driver";
	public static final String DB_URL = "jdbc:mysql://localhost:3306/catering";
	public static final String DB_USERNAME = "root";
	public static final String DB_PASSWORD = "root";
	public static final String LOGIN_PARAM_USERNAME = "username";
	public static final String LOGIN_PARAM_PASSWORD = "password";
	public static final Algorithm JWT_ALGORITHM = Algorithm.HMAC256("secret");;
	public static final String JWT_ISSUER = "catering";
	public static final String JWT_CLAIM_ROLES = "roles";
	public static final Integer JWT_AGE = 1;			//hours 
	public static final String COOKIE_NAME = "JWT";
}
