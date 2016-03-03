package main.java.org.elsysbg.ip.review.services;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;

import main.java.org.elsysbg.ip.review.entities.Establishment;

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