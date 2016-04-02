package org.elsysbg.ip.review.services;

import java.util.Date;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.elsysbg.ip.review.entities.Establishment;
import org.elsysbg.ip.review.entities.Person;
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
	
	public List<Question> getQuestionsByEstablishment(Establishment establishment) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			final TypedQuery<Question> query =
				em.createNamedQuery(Question.QUERY_QUESTION_BY_ESTABLISHMENT, Question.class);
			query.setParameter("establishment", establishment);
			return query.getResultList();
		} finally {
			em.close();
		}
	}
	
	public List<Question> getQuestionsByAuthorAndEstablishment(Person person, Establishment establishment) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			final TypedQuery<Question> query =
				em.createNamedQuery(Question.QUERY_QUESTION_BY_AUTHOR_AND_ESTABLISHMENT, Question.class);
			query.setParameter("author", person);
			query.setParameter("establishment", establishment);
			return query.getResultList();
		} finally {
			em.close();
		}
	}
}