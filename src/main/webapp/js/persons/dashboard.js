$(document).ready(function() {
	"use strict";
	
	function getQuestionsByAuthor() {
		return $.ajax(getEndpoint(ENDPOINT_PER, "questions"), {
			method: "GET",
			dataType: "json"
		});
	}

	function getQuestions() {
		return getQuestionsByAuthor().then(function(response) {
			$("#questions").html("");
			_.forEach(response.reverse(), addQuestion);
		});
	}
	
	function addQuestion(question) {
		var newItem = $("<div />");
		newItem.addClass("panel panel-danger");
		var newHeading = $("<div />");
		newHeading.addClass("panel-heading");
		var newLink = $("<a />")
		newLink.attr("href", "view.html?=" + question.establishment.id);
		newLink.text("Question for " + question.establishment.name);
		newHeading.append(newLink);
		var newBody = $("<div />");
		newBody.addClass("panel-body");
		var newQuestion = $("<p />");
		newQuestion.text(question.question);
		var newAnswer = $("<p />");
		if (question.answer) {
			newAnswer = addAnswer(question.answer);
		} else {
			newAnswer.text("Unanswered");
		}
		var newDate = $("<i />");
		var date = new Date(question.createdOn);
		newDate.text("Asked at " + date.toString().slice(0, 21));
		newBody.append(newQuestion, newDate, newAnswer);
		newItem.append(newHeading, newBody);
		$("#questions").append(newItem);
	}
	
	getCurrentlyLoggedInPerson().success(function(person) {
		$("#welcome").text("Welcome, " + person.username);
		getQuestions();
	});
});