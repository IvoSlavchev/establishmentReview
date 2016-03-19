package org.elsysbg.ip.review.services;

import java.util.Date;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.elsysbg.ip.review.entities.Establishment;
import org.elsysbg.ip.review.entities.Person;
import org.elsysbg.ip.review.entities.Review;

@Singleton
public class ReviewsService {
	private final EntityManagerService entityManagerService;
	
	@Inject
	public ReviewsService(EntityManagerService entityManagerService) {
		this.entityManagerService = entityManagerService;
	}

	public Review createReview(Review review, long author, long target) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			review.setCreatedOn(new Date());
			review.setAuthor(em.getReference(Person.class, author));
			review.setTarget(em.getReference(Establishment.class, target));
			em.persist(review);
			em.getTransaction().commit();
			return review;
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
	public List<Review> getReviewsByEstablishment(Establishment establishment) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			final TypedQuery<Review> query =
				em.createNamedQuery(Review.QUERY_BY_TARGET, Review.class);
			query.setParameter("target", establishment);
			return query.getResultList();
		} finally {
			em.close();
		}
	}
}