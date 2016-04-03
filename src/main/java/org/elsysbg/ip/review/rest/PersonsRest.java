package org.elsysbg.ip.review.rest;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.shiro.authz.annotation.RequiresGuest;
import org.apache.shiro.subject.Subject;
import org.elsysbg.ip.review.entities.Establishment;
import org.elsysbg.ip.review.entities.Person;
import org.elsysbg.ip.review.entities.Question;
import org.elsysbg.ip.review.services.AuthenticationService;
import org.elsysbg.ip.review.services.EstablishmentsService;
import org.elsysbg.ip.review.services.PersonsService;
import org.elsysbg.ip.review.services.QuestionsService;
import org.secnod.shiro.jaxrs.Auth;

@Path("/persons")
public class PersonsRest {
	private final PersonsService personsService;
	private final EstablishmentsService establishmentsService;
	private final AuthenticationService authenticationService;
	private final QuestionsService questionsService;

	@Inject
	public PersonsRest(PersonsService personsService, EstablishmentsService establishmentsService,
			AuthenticationService authenticationService, QuestionsService questionsService) {
		this.personsService = personsService;
		this.establishmentsService = establishmentsService;
		this.authenticationService = authenticationService;
		this.questionsService = questionsService;
	}
	
	@POST
	@RequiresGuest
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Person createPerson(Person person) {
		return personsService.createPerson(person);
	}
	
	@PUT
	@Path("/favourites/{establishmentId}")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Person addFavourite(@Auth Subject subject, @PathParam("establishmentId") long establishmentId) {
		final Person person = authenticationService.getCurrentlyLoggedInPerson(subject);
		final Establishment establishment = establishmentsService.getEstablishment(establishmentId);
		final List<Establishment> favourites = person.getFavourites();
		favourites.add(establishment);
		person.setFavourites(favourites);
		return personsService.updatePerson(person);
	}
	
	@GET
	@Path("/questions")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Question> getAuthorQuestions(@Auth Subject subject) {
		final Person author = authenticationService.getCurrentlyLoggedInPerson(subject);
		return questionsService.getQuestionsByAuthor(author);
	}
	
	@GET
	@Path("/questions/{establishmentId}")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Question> getQuestionsByAuthorAndEstablishment(@Auth Subject subject, @PathParam("establishmentId") long establishmentId) {
		final Person author = authenticationService.getCurrentlyLoggedInPerson(subject);
		final Establishment establishment = establishmentsService.getEstablishment(establishmentId);
		return questionsService.getQuestionsByAuthorAndEstablishment(author, establishment);
	}
}