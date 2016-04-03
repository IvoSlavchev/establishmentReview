$(document).ready(function() {
	"use strict";
	
	var ENDPOINT_FAV = "http://localhost:8080/establishmentReview/api/persons/favourites"
	var ENDPOINT_REV = "http://localhost:8080/establishmentReview/api/reviews";
	var ENDPOINT_QUEST = "http://localhost:8080/establishmentReview/api/questions";
	
	function getQueryId() {
		var query = window.location.search.substring(1);
		var pair = query.split("=");
		return Number(pair[1]);
	}
	
	function clearInput() {
		$("select option:first").prop("selected", "selected");
		$("[name='opinion']").val("");
		$("[name='question']").val("");
	}

	function createReview() {
		var review = {
			rating: $("select").val(),
			opinion: $("[name='opinion']").val()
		};
		
		$.ajax(getEndpoint(ENDPOINT_REV, establishmentId), {
			method: "POST",
			dataType: "json",
			data: JSON.stringify(review),
			contentType: "application/json; charset=utf-8",
			success: function() {
				reloadReviewsAndQuestions();
			}
		});
	}
	
	function createQuestion() {
		var question = {
			question: $("[name='question']").val()
		};
		
		$.ajax(getEndpoint(ENDPOINT_QUEST, establishmentId), {
			method: "POST",
			dataType: "json",
			data: JSON.stringify(question),
			contentType: "application/json; charset=utf-8",
			success: function() {
				reloadReviewsAndQuestions();
			}
		});
	}
	
	function getQuestionsByAuthorAndEstablishment() {
		return $.ajax(getEndpoint(ENDPOINT_PER, "questions/") + establishmentId, {
			method: "GET",
			dataType: "json"
		});
	}

	function getQuestions() {
		return getQuestionsByAuthorAndEstablishment().then(function(response) {
			$("#questions").html("");
			_.forEach(response, addQuestion);
		});
	}
	
	function reloadReviewsAndQuestions() {
		getReviews(establishmentId);
		getQuestions();
	}
	
	function attachHandlers() {
		$("#addReview").click(function() {
			clearInput();
			$("#addReviewPanel").show();
			$("#addReview, #askQuestion, #reviews, #questions, #infoHeaders").hide();
		})
		
		$("#askQuestion").click(function() {
			clearInput();
			$("#askQuestionPanel").show();
			$("#addReview, #askQuestion, #reviews, #questions, #infoHeaders").hide();
		})
		
		$(".cancel").click(function() {
			$("#addReviewPanel, #askQuestionPanel").hide();
			$("#addReview, #askQuestion, #reviews, #questions, #infoHeaders").show();
		});
		
		$("#saveReview").click(function() {
			createReview();
			$("#addReviewPanel").hide();
			$("#addReview, #askQuestion, #reviews, #questions, #infoHeaders").show();
		});
		
		$("#saveQuestion").click(function() {
			createQuestion();
			$("#askQuestionPanel").hide();
			$("#addReview, #askQuestion, #reviews, #questions, #infoHeaders").show();
		});
	}
	
	var personId = 0;
	var establishmentId = getQueryId();
	getEstablishment(establishmentId).then(showEstablishment);
	getCurrentlyLoggedInPerson().success(function(person) {
		personId = person.id;
		reloadReviewsAndQuestions();
		attachHandlers();
	});
});