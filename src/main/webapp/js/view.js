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
	
	function getReviewsByEstablishment(establishmentId) {
		return $.ajax(getEndpoint(ENDPOINT_EST, establishmentId) + "/reviews", {
			method: "GET",
			dataType: "json"
		});
	}
	
	function addReview(review) {
		var newItem = $("<div />");
		newItem.addClass("panel panel-warning");
		var newRating = $("<div />");
		newRating.addClass("panel-heading");
		newRating.text(review.rating + " out of 5");
		var newBody = $("<div />");
		newBody.addClass("panel-body");
		var newOpinion = $("<p />");
		newOpinion.text(review.opinion);
		var newAuthor = $("<i />");
		var date = new Date(review.createdOn);
		newAuthor.text("- " + review.author.username + ", " + date.toString().slice(0, 21));
		newBody.append(newOpinion, newAuthor);
		newItem.append(newRating, newBody);
		$("#reviews").append(newItem);
	}
	
	function getReviews() {
		return getReviewsByEstablishment(getQueryId()).then(function(response) {
			$("#reviews").html("");
			_.forEach(response, addReview);
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
			getReviews();
		});
	}
	
	getEstablishment(getQueryId()).then(showEstablishment);
	getReviews();
	attachHandlers();
});