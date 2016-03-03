package main.java.org.elsysbg.ip.review.rest;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import main.java.org.elsysbg.ip.review.entities.Person;
import main.java.org.elsysbg.ip.review.services.PersonsService;

@Path("/person")
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
	public Person createTask(Person person) {
		return personsService.createPerson(person);
	}
}