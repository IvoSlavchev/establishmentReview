package org.elsysbg.ip.review.services;

import java.util.Date;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.elsysbg.ip.review.entities.Establishment;
import org.elsysbg.ip.review.entities.Review;

@Singleton
public class ReviewsService {
	private final EntityManagerService entityManagerService;
	
	@Inject
	public ReviewsService(EntityManagerService entityManagerService) {
		this.entityManagerService = entityManagerService;
	}

	public Review createReview(Review review, long establishment) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			review.setCreatedOn(new Date());
			review.setEstablishment(em.find(Establishment.class, establishment));
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
				em.createNamedQuery(Review.QUERY_BY_ESTABLISHMENT, Review.class);
			query.setParameter("establishment", establishment);
			return query.getResultList();
		} finally {
			em.close();
		}
	}
}