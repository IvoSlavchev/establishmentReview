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
import org.elsysbg.ip.review.entities.Question;
import org.elsysbg.ip.review.entities.Review;
import org.elsysbg.ip.review.services.AuthenticationService;
import org.elsysbg.ip.review.services.EstablishmentsService;
import org.elsysbg.ip.review.services.QuestionsService;
import org.elsysbg.ip.review.services.ReviewsService;
import org.secnod.shiro.jaxrs.Auth;

@Path("/establishments")
public class EstablishmentsRest {
	private final EstablishmentsService establishmentsService;
	private final AuthenticationService authenticationService;
	private final ReviewsService reviewsService;
	private final QuestionsService questionsService;

	@Inject
	public EstablishmentsRest(EstablishmentsService establishmentsService, AuthenticationService authenticationService,
			ReviewsService reviewsService, QuestionsService questionsService) {
		this.establishmentsService = establishmentsService;
		this.authenticationService = authenticationService;
		this.reviewsService = reviewsService;
		this.questionsService = questionsService;
	}

	@POST
	@RequiresGuest
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Establishment createEstablishment(Establishment establishment) {
		return establishmentsService.createEstablishment(establishment);
	}

	@GET
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Establishment> getEstablishments() {
		return establishmentsService.getEstablishments();
	}

	@GET
	@Path("/{establishmentId}")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Establishment getEstablishment(@PathParam("establishmentId") long establishmentId) {
		return establishmentsService.getEstablishment(establishmentId);
	}

	@PUT
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Establishment updateEstablishment(@Auth Subject subject,
			Establishment establishment) {
		final Establishment fromDb = authenticationService.getCurrentlyLoggedInEstablishment(subject);
		fromDb.setName(establishment.getName());
		fromDb.setEmail(establishment.getEmail());
		fromDb.setTelephone(establishment.getTelephone());
		fromDb.setAddress(establishment.getAddress());
		fromDb.setType(establishment.getType());
		fromDb.setDescription(establishment.getDescription());
		return establishmentsService.updateEstablishment(fromDb);
	}

	@GET
	@Path("/{establishmentId}/reviews")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Review> getEstablishmentReviews(@PathParam("establishmentId") long establishmentId) {
		final Establishment establishment = establishmentsService.getEstablishment(establishmentId);
		return reviewsService.getReviewsByEstablishment(establishment);
	}
	
	@GET
	@Path("/questions")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Question> getEstablishmentQuestions(@Auth Subject subject) {
		final Establishment establishment = authenticationService.getCurrentlyLoggedInEstablishment(subject);
		return questionsService.getQuestionsByEstablishment(establishment);
	}
}