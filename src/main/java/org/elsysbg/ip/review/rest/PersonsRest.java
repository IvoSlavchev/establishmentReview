package org.elsysbg.ip.review.rest;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.shiro.authz.annotation.RequiresGuest;
import org.elsysbg.ip.review.entities.Establishment;
import org.elsysbg.ip.review.entities.Person;
import org.elsysbg.ip.review.entities.Question;
import org.elsysbg.ip.review.services.EstablishmentsService;
import org.elsysbg.ip.review.services.PersonsService;
import org.elsysbg.ip.review.services.QuestionsService;

@Path("/persons")
public class PersonsRest {
	private final PersonsService personsService;
	private final EstablishmentsService establishmentsService;
	private final QuestionsService questionsService;

	@Inject
	public PersonsRest(PersonsService personsService, EstablishmentsService establishmentsService,
			QuestionsService questionsService) {
		this.personsService = personsService;
		this.establishmentsService = establishmentsService;
		this.questionsService = questionsService;
	}
	
	@POST
	@RequiresGuest
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Person createPerson(Person person) {
		return personsService.createPerson(person);
	}
	
	@GET
	@Path("/{personId}/questions")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Question> getAuthorQuestions(@PathParam("personId") long personId) {
		final Person person = personsService.getPerson(personId);
		return questionsService.getQuestionsByAuthor(person);
	}
	
	@GET
	@Path("/{personId}/questions/{establishmentId}")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Question> getQuestionsByAuthorAndEstablishment(@PathParam("personId") long personId,
			@PathParam("establishmentId") long establishmentId) {
		final Person person = personsService.getPerson(personId);
		final Establishment establishment = establishmentsService.getEstablishment(establishmentId);
		return questionsService.getQuestionsByAuthorAndEstablishment(person, establishment);
	}
}