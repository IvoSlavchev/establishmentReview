package org.elsysbg.ip.review.rest;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.shiro.authz.annotation.RequiresGuest;
import org.apache.shiro.subject.Subject;
import org.elsysbg.ip.review.entities.Establishment;
import org.elsysbg.ip.review.entities.Person;
import org.elsysbg.ip.review.services.AuthenticationService;
import org.secnod.shiro.jaxrs.Auth;

@Path("/authentication")
public class AuthenticationRest {

	private final AuthenticationService authenticationService;

	@Inject
	public AuthenticationRest(AuthenticationService authenticationService) {
		this.authenticationService = authenticationService;
	}
	
	@POST
	@RequiresGuest
	@Path("/persons")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Person login(@Auth Subject subject, Person person) {
		authenticationService.login(subject, person.getUsername(), person.getPassword());
		return authenticationService.getCurrentlyLoggedInPerson(subject);
	}
	
	@POST
	@RequiresGuest
	@Path("/establishments")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Establishment login(@Auth Subject subject, Establishment establishment) {
		authenticationService.login(subject, establishment.getUsername(), establishment.getPassword());
		return authenticationService.getCurrentlyLoggedInEstablishment(subject);
	}
	
	@GET
	@Path("/persons")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Person getCurrentlyLoggedInPerson(@Auth Subject subject) {
		return authenticationService.getCurrentlyLoggedInPerson(subject);
	}
	
	@GET
	@Path("/establishments")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Establishment getCurrentlyLoggedInEstablishment(@Auth Subject subject) {
		return authenticationService.getCurrentlyLoggedInEstablishment(subject);
	}
	
	@DELETE
	public void logout(@Auth Subject subject) {
		authenticationService.logout(subject);
	}
}