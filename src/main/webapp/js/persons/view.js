$(document).ready(function() {
	"use strict";
	
	var ENDPOINT_REV = "http://localhost:8080/establishmentReview/api/reviews";
	
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
			opinion: $("[name='opinion']").val(),
			createdOn: new Date()
		};
		
		$.ajax(getEndpoint(ENDPOINT_REV, getQueryId()), {
			method: "POST",
			dataType: "json",
			data: JSON.stringify(review),
			contentType: "application/json; charset=utf-8",
			success: function() {
				getEstablishment(getQueryId()).then(showEstablishment);
				getReviews(getQueryId());
			}
		});
	}
	
	function attachHandlers() {
		$("#addReview").click(function() {
			clearInput();
			$("#addReviewPanel").show();
			$("#addReview, #askQuestion, #reviews").hide();
		})
		
		$("#askQuestion").click(function() {
			clearInput();
			$("#askQuestionPanel").show();
			$("#addReview, #askQuestion, #reviews").hide();
		})
		
		$(".cancel").click(function() {
			$("#addReviewPanel, #askQuestionPanel").hide();
			$("#addReview, #askQuestion, #reviews").show();
		});
		
		$("#saveReview").click(function() {
			createReview();
			$("#addReviewPanel").hide();
			$("#addReview, #askQuestion, #reviews").show();
		});
		
		$("#saveQuestion").click(function() {
			$("#askQuestionPanel").hide();
			$("#addReview, #askQuestion, #reviews").show();
		});
	}
	
	getEstablishment(getQueryId()).then(showEstablishment);
	attachHandlers();
});