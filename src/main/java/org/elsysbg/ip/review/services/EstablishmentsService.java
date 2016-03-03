package main.java.org.elsysbg.ip.review.services;

import java.security.NoSuchAlgorithmException;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;

import main.java.org.elsysbg.ip.review.entities.Establishment;
import main.java.org.elsysbg.ip.review.helpers.PasswordHasher;

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
}