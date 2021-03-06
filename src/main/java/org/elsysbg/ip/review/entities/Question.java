package org.elsysbg.ip.review.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@Entity
@NamedQueries({
	@NamedQuery(name = Question.QUERY_QUESTION_BY_AUTHOR,
			query = "SELECT q from Question q WHERE q.author=:author"),
	@NamedQuery(name = Question.QUERY_QUESTION_BY_ESTABLISHMENT,
		query = "SELECT q from Question q WHERE q.establishment=:establishment"),
	@NamedQuery(name = Question.QUERY_QUESTION_BY_AUTHOR_AND_ESTABLISHMENT,
		query = "SELECT q from Question q WHERE q.author=:author AND q.establishment=:establishment")
})
public class Question {
	public static final String QUERY_QUESTION_BY_AUTHOR = "queryQuestionByAuthor";
	public static final String QUERY_QUESTION_BY_ESTABLISHMENT = "queryQuestionByEstablishment";
	public static final String QUERY_QUESTION_BY_AUTHOR_AND_ESTABLISHMENT = "queryQuestionByAuthorAndEstablishment";
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private long id;
	
	@Column(nullable = false)
	private String question;
	
	@Column
	private boolean answered = false;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = false)
	private Date createdOn;
	
	@Column(nullable = false)
	@ManyToOne
	private Person author;
	
	@Column(nullable = false)
	@ManyToOne
	private Establishment establishment;
	
	@OneToOne
	@JoinColumn
    private Answer answer;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public boolean getAnswered() {
		return answered;
	}

	public void setAnswered(boolean answered) {
		this.answered = answered;
	}
	
	public Date getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

	public Person getAuthor() {
		return author;
	}

	public void setAuthor(Person author) {
		this.author = author;
	}

	public Establishment getEstablishment() {
		return establishment;
	}

	public void setEstablishment(Establishment establishment) {
		this.establishment = establishment;
	}

	public Answer getAnswer() {
		return answer;
	}

	public void setAnswer(Answer answer) {
		this.answer = answer;
	}
}