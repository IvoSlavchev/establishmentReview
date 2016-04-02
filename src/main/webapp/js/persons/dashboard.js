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
			_.forEach(response, addQuestion);
		});
	}
	
	getCurrentlyLoggedInPerson().success(function(person) {
		$("#welcome").text("Welcome, " + person.username);
		getQuestions();
	});
});