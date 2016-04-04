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
		var newStatus = $("<br><i />");
		if (question.answered) {
			newStatus.text("Answered");
		} else {
			newStatus.text("Unanswered");
		}
		var newDate = $("<i />");
		var date = new Date(question.createdOn);
		newDate.text("Asked at " + date.toString().slice(0, 21));
		newBody.append(newQuestion, newDate, newStatus);
		newItem.append(newHeading, newBody);
		$("#questions").append(newItem);
	}
	
	getCurrentlyLoggedInPerson().success(function(person) {
		$("#welcome").text("Welcome, " + person.username);
		getQuestions();
	});
});