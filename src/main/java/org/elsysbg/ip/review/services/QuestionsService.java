package org.elsysbg.ip.review.services;

import java.util.Date;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;

import org.elsysbg.ip.review.entities.Establishment;
import org.elsysbg.ip.review.entities.Question;

@Singleton
public class QuestionsService {
	private final EntityManagerService entityManagerService;
	
	@Inject
	public QuestionsService(EntityManagerService entityManagerService) {
		this.entityManagerService = entityManagerService;
	}

	public Question createQuestion(Question question, long establishment) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			question.setCreatedOn(new Date());
			question.setEstablishment(em.getReference(Establishment.class, establishment));
			em.persist(question);
			em.getTransaction().commit();
			return question;
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
}