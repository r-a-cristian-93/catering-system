package com.catering.rest.security;

import static com.catering.rest.Constants.COOKIE_NAME;
import static com.catering.rest.Constants.JWT_ALGORITHM;
import static com.catering.rest.Constants.JWT_ISSUER;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;

public class AuthorizationFilter extends BasicAuthenticationFilter{
	public AuthorizationFilter(AuthenticationManager auth) {
		super(auth);
	}
	
	@Override
	protected void doFilterInternal(
			HttpServletRequest req,
			HttpServletResponse res,
			FilterChain chain)
					throws IOException, ServletException {
		String jwtToken = getToken(req);
		if(jwtToken!=null) {
			SecurityContextHolder.getContext()
				.setAuthentication(getAuthentication(jwtToken));
		}			
		chain.doFilter(req, res);	
	}
	
	private String getToken(HttpServletRequest req) {
		Cookie cookies[] = req.getCookies();
		for(Cookie c : cookies) {
			if(c.getName().equals(COOKIE_NAME)) {
				return c.getValue();
			}
		}
		return null;
	}
	
	private UsernamePasswordAuthenticationToken getAuthentication(String jwtToken) {
		DecodedJWT jwt = JWT.require(JWT_ALGORITHM)
				.withIssuer(JWT_ISSUER)
				.build()
				.verify(jwtToken);
		String username = jwt.getSubject();
		return new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
	}
}
