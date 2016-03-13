package org.elsysbg.ip.review.services;

import java.security.NoSuchAlgorithmException;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;

import org.elsysbg.ip.review.entities.Person;
import org.elsysbg.ip.review.helpers.PasswordHasher;

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
	
	public void loginPerson(Person person) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			final Person fromDb = (Person) em.createNamedQuery("Person.findByUsername").setParameter("username",
					person.getUsername()).getSingleResult();
			final PasswordHasher ph = new PasswordHasher();
			try {
				final String enteredPassword = ph.getSecurePassword(person.getPassword(), fromDb.getSalt());
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
}