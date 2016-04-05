package org.elsysbg.ip.review.services;

import java.util.Date;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;

import org.elsysbg.ip.review.entities.Question;
import org.elsysbg.ip.review.entities.Answer;

@Singleton
public class AnswersService {
	private final EntityManagerService entityManagerService;
	
	@Inject
	public AnswersService(EntityManagerService entityManagerService) {
		this.entityManagerService = entityManagerService;
	}
	
	public Answer createAnswer(Answer answer, long questionId) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			answer.setCreatedOn(new Date());
			final Question question = em.find(Question.class, questionId);
			if (question == null) {
				throw new IllegalArgumentException("No question with id: " + questionId);
			}
			question.setAnswer(answer);
			em.persist(answer);
			em.getTransaction().commit();
			return answer;
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
}