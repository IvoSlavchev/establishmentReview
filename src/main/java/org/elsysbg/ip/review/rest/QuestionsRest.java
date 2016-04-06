package org.elsysbg.ip.review.rest;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.elsysbg.ip.review.entities.Answer;
import org.elsysbg.ip.review.entities.Question;
import org.elsysbg.ip.review.services.AnswersService;
import org.elsysbg.ip.review.services.AuthenticationService;
import org.elsysbg.ip.review.services.QuestionsService;
import org.secnod.shiro.jaxrs.Auth;

@Path("/questions")
public class QuestionsRest {
	private final QuestionsService questionsService;
	private final AuthenticationService authenticationService;
	private final AnswersService answersService;

	@Inject
	public QuestionsRest(QuestionsService questionsService, AuthenticationService authenticationService,
			AnswersService answersService) {
		this.questionsService = questionsService;
		this.authenticationService = authenticationService;
		this.answersService = answersService;
	}
	
	@POST
	@Path("/{establishmentId}")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@RequiresPermissions("persons:createQuestions")
	public Question createQuestion(@Auth Subject subject, Question question,
			@PathParam("establishmentId") long establishmentId) {
		question.setAuthor(authenticationService.getCurrentlyLoggedInPerson(subject));
		return questionsService.createQuestion(question, establishmentId);
	}
	
	@POST
	@Path("/{questionId}/answer")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@RequiresPermissions("establishments:answerQuestions")
	public Answer createAnswer(Answer answer,
			@PathParam("questionId") long questionId) {
		return answersService.createAnswer(answer, questionId);
	}
}