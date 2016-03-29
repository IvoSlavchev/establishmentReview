package org.elsysbg.ip.review.services;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.elsysbg.ip.review.entities.Establishment;

@Singleton
public class EstablishmentsService {
	private final EntityManagerService entityManagerService;
	private final AuthenticationService authenticationService;
	
	@Inject
	public EstablishmentsService(EntityManagerService entityManagerService,
			AuthenticationService authenticationService) {
		this.entityManagerService = entityManagerService;
		this.authenticationService = authenticationService;
	}

	public Establishment createEstablishment(Establishment establishment) {
		establishment.setPassword(authenticationService.encryptPassword(establishment.getPassword()));
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			em.persist(establishment);
			em.getTransaction().commit();
			return establishment;
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
	public List<Establishment> getEstablishments() {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			final TypedQuery<Establishment> query =
				em.createNamedQuery(Establishment.QUERY_ALL, Establishment.class);
			return query.getResultList();
		} finally {
			em.close();
		}
	}
	
	public Establishment getEstablishment(long establishmentId) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			final Establishment result = em.find(Establishment.class, establishmentId);
			if (result == null) {
				throw new IllegalArgumentException("No establishment with id: " + establishmentId);
			}
			return result;
		} finally {
			em.close();
		}
	}
	
	public Establishment updateEstablishment(Establishment establishment) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			final Establishment result = em.merge(establishment);
			em.getTransaction().commit();
			return result;
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
	public void updateEstablishmentReviewsCountAndRatings(long establishmentId, int newRating) {
		final Establishment fromDb = getEstablishment(establishmentId);
		fromDb.setReviewsCount(fromDb.getReviewsCount() + 1);
		fromDb.setAllRatings(fromDb.getAllRatings() + newRating);
		updateEstablishment(fromDb);
	}
	
	public Establishment getEstablishmentByUsername(String username) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			final TypedQuery<Establishment> query =
					em.createNamedQuery(Establishment.QUERY_BY_USERNAME, Establishment.class);
			query.setParameter("username", username);
			return query.getSingleResult();
		} finally {
			em.close();
		}
	}
}