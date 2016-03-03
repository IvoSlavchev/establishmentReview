package main.java.org.elsysbg.ip.review.services;

import java.security.NoSuchAlgorithmException;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;

import main.java.org.elsysbg.ip.review.entities.Person;
import main.java.org.elsysbg.ip.review.helpers.PasswordHasher;

@Singleton
public class PersonsService {
	private final EntityManagerService entityManagerService;
	
	@Inject
	public PersonsService(EntityManagerService entityManagerService) {
		this.entityManagerService = entityManagerService;
	}

	public Person createPerson(Person person) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			final PasswordHasher ph = new PasswordHasher();
			try {
				person.setSalt(ph.getSalt());
				person.setPassword(ph.getSecurePassword(person.getPassword(), person.getSalt()));
			} catch (NoSuchAlgorithmException e) {
	        	e.printStackTrace();
	        }
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