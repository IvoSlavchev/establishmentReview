$(document).ready(function() {
	"use strict";
	
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
		
		$.ajax(getEndpoint(ENDPOINT_REV, getQueryId()), {
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
		
		$.ajax(getEndpoint(ENDPOINT_QUEST, getQueryId()), {
			method: "POST",
			dataType: "json",
			data: JSON.stringify(question),
			contentType: "application/json; charset=utf-8",
			success: function() {
				reloadReviewsAndQuestions();
			}
		});
	}
	
	function getQuestionsByAuthorAndEstablishment(personId, establishmentId) {
		return $.ajax(getEndpoint(ENDPOINT_PER, personId) + "/questions/" + establishmentId, {
			method: "GET",
			dataType: "json"
		});
	}

	function getQuestions(personId, establishmentId) {
		return getQuestionsByAuthorAndEstablishment(personId, establishmentId).then(function(response) {
			$("#questions").html("");
			_.forEach(response, addQuestion);
		});
	}
	
	function reloadReviewsAndQuestions() {
		getEstablishment(getQueryId()).then(showEstablishment);
		getCurrentlyLoggedInPerson().success(function(person) {
			getQuestions(person.id, getQueryId());
		});
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
	
	reloadReviewsAndQuestions();
	attachHandlers();
});