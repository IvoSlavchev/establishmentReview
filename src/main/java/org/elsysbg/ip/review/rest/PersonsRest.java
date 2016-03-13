package org.elsysbg.ip.review.rest;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.elsysbg.ip.review.entities.Person;
import org.elsysbg.ip.review.services.PersonsService;

@Path("/persons")
public class PersonsRest {
	private final PersonsService personsService;

	@Inject
	public PersonsRest(PersonsService personsService) {
		this.personsService = personsService;
	}
	
	@POST
	@Path("/signup")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Person createPerson(Person person) {
		return personsService.createPerson(person);
	}
	
	@POST
	@Path("/login")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public void loginPerson(Person person) {
		personsService.loginPerson(person);
	}
}