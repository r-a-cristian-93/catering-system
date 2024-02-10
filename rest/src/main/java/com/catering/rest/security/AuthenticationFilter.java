package com.catering.rest.security;

import static com.catering.rest.Constants.COOKIE_NAME;
import static com.catering.rest.Constants.JWT_AGE;
import static com.catering.rest.Constants.JWT_ALGORITHM;
import static com.catering.rest.Constants.JWT_CLAIM_ROLES;
import static com.catering.rest.Constants.JWT_ISSUER;
import static com.catering.rest.Constants.LOGIN_PARAM_PASSWORD;
import static com.catering.rest.Constants.LOGIN_PARAM_USERNAME;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	private AuthenticationManager auth;

	@Override
	public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res)
			throws AuthenticationException {
		return auth
				.authenticate(
						new UsernamePasswordAuthenticationToken(
								req.getParameter(LOGIN_PARAM_USERNAME),
								req.getParameter(LOGIN_PARAM_PASSWORD),
								new ArrayList<>()));
	}

	@Override
	protected void successfulAuthentication(
			HttpServletRequest req,
			HttpServletResponse res,
			FilterChain chain,
			Authentication auth) {
		try {
			String username = ((User)auth.getPrincipal()).getUsername();
			List<String> roles = auth.getAuthorities()
					.stream()
					.map(a->a.getAuthority())
					.collect(Collectors.toList());
			String token = JWT.create()
					.withIssuer(JWT_ISSUER)
					.withSubject(username)
					.withClaim(JWT_CLAIM_ROLES, roles)
					.withIssuedAt(new Date(System.currentTimeMillis()))
					.withExpiresAt(new Date(System.currentTimeMillis() + 3600000 * JWT_AGE))
					.sign(JWT_ALGORITHM);
			Cookie cookie = new Cookie(COOKIE_NAME, token);
			cookie.setSecure(true);
			cookie.setPath("/");
			cookie.setMaxAge(3600 * JWT_AGE);
			res.addCookie(cookie);
		}
		catch (Exception e) {}
	}

	@Override
	protected void unsuccessfulAuthentication (
			HttpServletRequest req,
			HttpServletResponse res,
			AuthenticationException failed)
					throws IOException, ServletException {
		res.setStatus(401);
	}
}
