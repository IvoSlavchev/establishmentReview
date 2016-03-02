package main.java.org.elsysbg.ip.review.services;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;

import main.java.org.elsysbg.ip.review.entities.User;

@Singleton
public class UsersService {
	private final EntityManagerService entityManagerService;
	
	@Inject
	public UsersService(EntityManagerService entityManagerService) {
		this.entityManagerService = entityManagerService;
	}

	public User createTask(User user) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			em.persist(user);
			em.getTransaction().commit();
			return user;
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
}