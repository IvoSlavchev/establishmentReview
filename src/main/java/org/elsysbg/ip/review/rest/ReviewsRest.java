package org.elsysbg.ip.review.rest;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.shiro.subject.Subject;
import org.elsysbg.ip.review.entities.Review;
import org.elsysbg.ip.review.services.AuthenticationService;
import org.elsysbg.ip.review.services.EstablishmentsService;
import org.elsysbg.ip.review.services.ReviewsService;
import org.secnod.shiro.jaxrs.Auth;

@Path("/reviews")
public class ReviewsRest {
	private final ReviewsService reviewsService;
	private final EstablishmentsService establishmentsService;
	private final AuthenticationService authenticationService;

	@Inject
	public ReviewsRest(ReviewsService reviewsService, EstablishmentsService establishmentsService,
			AuthenticationService authenticationService) {
		this.reviewsService = reviewsService;
		this.establishmentsService = establishmentsService;
		this.authenticationService = authenticationService;
	}
	
	@POST
	@Path("/{establishment}")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Review createReview(@Auth Subject subject, Review review,
			@PathParam("establishment") long establishment) {
		review.setAuthor(authenticationService.getCurrentlyLoggedInPerson(subject));
		establishmentsService.updateEstablishmentReviewsCountAndRatings(establishment, review.getRating());
		return reviewsService.createReview(review, establishment);
	}
}