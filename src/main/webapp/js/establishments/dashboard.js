function getQuestionsByEstablishment(establishmentId) {
	return $.ajax(getEndpoint(ENDPOINT_EST, establishmentId) + "/questions", {
		method: "GET",
		dataType: "json"
	});
}

function addQuestion(question) {
	var newItem = $("<div />");
	newItem.addClass("panel panel-danger");
	var newHeading = $("<div />");
	newHeading.addClass("panel-heading");
	newHeading.text("Question for " + question.establishment.name);
	var newBody = $("<div />");
	newBody.addClass("panel-body");
	var newQuestion = $("<p />");
	newQuestion.text(question.question);
	var newAuthor = $("<i />");
	var date = new Date(question.createdOn);
	newAuthor.text("- " + question.author.username + ", " + date.toString().slice(0, 21));
	var newStatus = $("<br><i />");
	if (question.answered) {
		newStatus.text("Answered");
	} else {
		newStatus.text("Unanswered");
	}
	newStatus.text("Unanswered");
	newBody.append(newQuestion, newAuthor, newStatus);
	newItem.append(newHeading, newBody);
	$("#questions").append(newItem);
}

function getQuestions(establishmentId) {
	return getQuestionsByEstablishment(establishmentId).then(function(response) {
		$("#questions").html("");
		_.forEach(response, addQuestion);
	});
}

$(document).ready(function() {
	"use strict";

	getCurrentlyLoggedInEstablishment().success(function(establishment) {
		showEstablishment(establishment);
		getQuestions(establishment.id);
	});
});