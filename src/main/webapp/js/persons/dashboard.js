$(document).ready(function() {
	"use strict";
	
	function getQuestionsByAuthor(personId) {
		return $.ajax(getEndpoint(ENDPOINT_PER, personId) + "/questions", {
			method: "GET",
			dataType: "json"
		});
	}

	function getQuestions(personId) {
		return getQuestionsByAuthor(personId).then(function(response) {
			$("#questions").html("");
			_.forEach(response, addQuestion);
		});
	}
	
	getCurrentlyLoggedInPerson().success(function(person) {
		$("#welcome").text("Welcome, " + person.username);
		getQuestions(person.id);
	});
});