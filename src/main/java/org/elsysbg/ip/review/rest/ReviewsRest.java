package org.elsysbg.ip.review.rest;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.elsysbg.ip.review.entities.Review;
import org.elsysbg.ip.review.services.ReviewsService;

@Path("/reviews")
public class ReviewsRest {
	private final ReviewsService reviewsService;

	@Inject
	public ReviewsRest(ReviewsService reviewsService) {
		this.reviewsService = reviewsService;
	}
	
	@POST
	@Path("/{author}/{target}")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Review Review(Review review, @PathParam("author") long author,
			@PathParam("target") long target) {
		return reviewsService.createReview(review, author, target);
	}
}