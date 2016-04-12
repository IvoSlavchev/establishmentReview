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
import org.apache.shiro.authz.annotation.RequiresPermissions;
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
	
	@POST
	@Path("/favourites/{establishmentId}")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@RequiresPermissions("persons:addFavourite")
	public Person addFavourite(@Auth Subject subject, @PathParam("establishmentId") long establishmentId) {
		final Person person = authenticationService.getCurrentlyLoggedInPerson(subject);
		final Establishment establishment = establishmentsService.getEstablishment(establishmentId);
		return personsService.addFavourite(person, establishment);
	}
	
	@GET
	@Path("/favourites")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@RequiresPermissions("persons:getFavourites")
	public List<Establishment> getFavourites(@Auth Subject subject) {
		final Person person = authenticationService.getCurrentlyLoggedInPerson(subject);
		return person.getFavourites();
	}
	
	@GET
	@Path("/favourites/{establishmentId}")
	@RequiresPermissions("persons:getFavourites")
	public boolean checkFavourite(@Auth Subject subject, @PathParam("establishmentId") long establishmentId) {
		final Person person = authenticationService.getCurrentlyLoggedInPerson(subject);
		for (Establishment est : person.getFavourites()) {
			if (est.getId() == establishmentId) {
				return true;
			}
		}
		return false;
	}
	
	@GET
	@Path("/questions")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@RequiresPermissions("persons:getQuestionsByAuthor")
	public List<Question> getAuthorQuestions(@Auth Subject subject) {
		final Person author = authenticationService.getCurrentlyLoggedInPerson(subject);
		return questionsService.getQuestionsByAuthor(author);
	}
	
	@GET
	@Path("/questions/{establishmentId}")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@RequiresPermissions("persons:getQuestionsByAuthorAndEstablishment")
	public List<Question> getQuestionsByAuthorAndEstablishment(@Auth Subject subject,
			@PathParam("establishmentId") long establishmentId) {
		final Person author = authenticationService.getCurrentlyLoggedInPerson(subject);
		final Establishment establishment = establishmentsService.getEstablishment(establishmentId);
		return questionsService.getQuestionsByAuthorAndEstablishment(author, establishment);
	}
}