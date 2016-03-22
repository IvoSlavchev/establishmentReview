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
	}
	
	function createReview() {
		var review = {
			rating: $("select").val(),
			opinion: $("[name='opinion']").val(),
			createdOn: new Date()
		};
		
		$.ajax(ENDPOINT_REV + "/" + getCookie("session") + "/" + getQueryId(), {
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
			$("#addReview").hide();
			$("#reviews").hide();
		})
		
		$("#cancel").click(function() {
			$("#addReviewPanel").hide();
			$("#addReview").show();
			$("#reviews").show();
		});
		
		$("#save").click(function() {
			createReview();
			$("#addReviewPanel").hide();
			$("#addReview").show();
			$("#reviews").show();
		});
	}
	
	getEstablishment(getQueryId()).then(showEstablishment);
	getReviews(getQueryId());
	attachHandlers();
});