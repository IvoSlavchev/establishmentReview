$(document).ready(function() {
	"use strict";
	
	function getQuestionsByEstablishment(establishmentId) {
		return $.ajax(getEndpoint(ENDPOINT_EST, establishmentId) + "/questions", {
			method: "GET",
			dataType: "json"
		});
	}

	function getQuestions(establishmentId) {
		return getQuestionsByEstablishment(establishmentId).then(function(response) {
			$("#questions").html("");
			_.forEach(response, addQuestion);
		});
	}
	
	getCurrentlyLoggedInEstablishment().success(function(establishment) {
		showEstablishment(establishment);
		getQuestions(establishment.id);
	});
});