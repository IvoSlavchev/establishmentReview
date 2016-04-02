$(document).ready(function() {
	"use strict";
	
	function getQuestionsByEstablishment() {
		return $.ajax(getEndpoint(ENDPOINT_EST, "questions"), {
			method: "GET",
			dataType: "json"
		});
	}

	function getQuestions() {
		return getQuestionsByEstablishment().then(function(response) {
			$("#questions").html("");
			_.forEach(response, addQuestion);
		});
	}
	
	getCurrentlyLoggedInEstablishment().success(function(establishment) {
		showEstablishment(establishment);
		getReviews(establishment.id);
		getQuestions();
	});
});