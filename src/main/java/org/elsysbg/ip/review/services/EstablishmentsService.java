package org.elsysbg.ip.review.services;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.elsysbg.ip.review.entities.Establishment;
import org.elsysbg.ip.review.helpers.PasswordHasher;

@Singleton
public class EstablishmentsService {
	private final EntityManagerService entityManagerService;
	
	@Inject
	public EstablishmentsService(EntityManagerService entityManagerService) {
		this.entityManagerService = entityManagerService;
	}

	public Establishment createEstablishment(Establishment establishment) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			final PasswordHasher ph = new PasswordHasher();
			try {
				establishment.setSalt(ph.getSalt());
				establishment.setPassword(ph.getSecurePassword(establishment.getPassword(),
						establishment.getSalt()));
			} catch (NoSuchAlgorithmException e) {
	        	e.printStackTrace();
	        }
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
	
	public void loginEstablishment(Establishment establishment) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			final Establishment fromDb = (Establishment) em.createNamedQuery("Establishment.findByUsername")
					.setParameter("username", establishment.getUsername()).getSingleResult();
			final PasswordHasher ph = new PasswordHasher();
			try {
				final String enteredPassword = ph.getSecurePassword(establishment.getPassword(), fromDb.getSalt());
				if (!enteredPassword.equals(fromDb.getPassword())) {
					throw new SecurityException();
				}
			} catch (NoSuchAlgorithmException e) {
	        	e.printStackTrace();
	        }
		} finally {
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
}