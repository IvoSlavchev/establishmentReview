$(document).ready(function() {
	"use strict";
	
	var ENDPOINT_EST = "http://localhost:8080/establishmentReview/api/establishments";
	var ENDPOINT_REV = "http://localhost:8080/establishmentReview/api/reviews";
	
	function getQueryId() {
		var query = window.location.search.substring(1);
		var pair = query.split("=");
		return Number(pair[1]);
	}
	
	function getEstablishment(establishmentId) {
		return $.ajax(getEndpoint(ENDPOINT_EST, establishmentId), {
			method: "GET",
			dataType: "json",
			error: function() {
				listError("No establishment found!");
			},
		});
	}
	
	function showEstablishment(establishment) {
		$("#name").text(establishment.name);
		$("#address").text(establishment.address);
		$("#type").text(establishment.type);
		$("#email").text(establishment.email);
		$("#telephone").text(establishment.telephone);
		$("#description").text(establishment.description);
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
			contentType: "application/json; charset=utf-8"
		});
	}
	
	function showReviews() {
		var newItem = $("<div />");
		newItem.addClass("panel panel-warning col-md-6");
		var newRating = $("<div />");
		newRating.addClass("panel-heading");
		newRating.text("3/5");
		var newBody = $("<div />");
		newBody.addClass("panel-body");
		var newOpinion = $("<p />");
		newOpinion.text("Decent place. Nice atmosphere, but long waiting times.");
		var newAuthor = $("<i />");
		newAuthor.text("Pesho");
		newBody.append(newOpinion, newAuthor);
		newItem.append(newRating, newBody);
		$("#reviews").append(newItem);
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
	showReviews();
	attachHandlers();
});