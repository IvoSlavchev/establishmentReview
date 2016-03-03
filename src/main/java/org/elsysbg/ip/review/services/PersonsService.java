package main.java.org.elsysbg.ip.review.services;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;

import main.java.org.elsysbg.ip.review.entities.Person;

@Singleton
public class PersonsService {
	private final EntityManagerService entityManagerService;
	
	@Inject
	public PersonsService(EntityManagerService entityManagerService) {
		this.entityManagerService = entityManagerService;
	}

	public Person createTask(Person person) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			em.persist(person);
			em.getTransaction().commit();
			return person;
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
}