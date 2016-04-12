package org.elsysbg.ip.review.services;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.elsysbg.ip.review.entities.Establishment;
import org.elsysbg.ip.review.entities.Person;

@Singleton
public class PersonsService {
	private final EntityManagerService entityManagerService;
	private final AuthenticationService authenticationService;
	
	@Inject
	public PersonsService(EntityManagerService entityManagerService,
			AuthenticationService authenticationService) {
		this.entityManagerService = entityManagerService;
		this.authenticationService = authenticationService;
	}

	public Person createPerson(Person person) {
		person.setPassword(authenticationService.encryptPassword(person.getPassword()));
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
	
	public Person getPersonByUsername(String username) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			final TypedQuery<Person> query =
					em.createNamedQuery(Person.QUERY_BY_USERNAME, Person.class);
			query.setParameter("username", username);
			return query.getSingleResult();
		} finally {
			em.close();
		}
	}
	
	public Person addFavourite(Person person, Establishment establishment) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			person.getFavourites().add(establishment);
			em.getTransaction().begin();
			final Person result = em.merge(person);
			em.getTransaction().commit();
			return result;
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
}