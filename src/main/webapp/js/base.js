var ENDPOINT_PER = "http://localhost:8080/establishmentReview/api/persons";
var ENDPOINT_EST = "http://localhost:8080/establishmentReview/api/establishments";
var ENDPOINT_AUTH = "http://localhost:8080/establishmentReview/api/authentication";

function isEmail(email) {
    var regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regExp.test(email);
}

function isEmpty(obj) {
	return obj.username == "" || obj.password == "";
}

function listError(text) {
	$("#errors").empty();
	$("#errors").append("<li>" + text + "</li>");
}

function getEndpoint(ENDPOINT, suffix) {
	return ENDPOINT + "/" + suffix;
}

function getCurrentlyLoggedInPerson() {
	return $.ajax(getEndpoint(ENDPOINT_AUTH, "persons"), {
		method: "GET",
		dataType: "json"
	});
}

function getCurrentlyLoggedInEstablishment() {
	return $.ajax(getEndpoint(ENDPOINT_AUTH, "establishments"), {
		method: "GET",
		dataType: "json"
	});
}

function sendSignup(obj, ENDPOINT) {
	if (!isEmpty(obj)) {
		if (isEmail(obj.email)) {	
			$.ajax(ENDPOINT, {
				method: "POST",
				dataType: "json",
				data: JSON.stringify(obj),
				contentType: "application/json; charset=utf-8",
				error: function() {
					listError(obj.username + " is already taken!");
				},
				success: function() {
					window.location = 'http://localhost:8080/establishmentReview';
				}
			});
		} else {
			listError(obj.email + " is not a valid email!");
		}
	} else {
		listError("Username, password and email are required!");
	}
}

function getEstablishment(establishmentId) {
	return $.ajax(getEndpoint(ENDPOINT_EST, establishmentId), {
		method: "GET",
		dataType: "json",
		error: function() {
			$("#addReview").hide();
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
	if (establishment.reviewsCount == 0) {
		$("#rating").text("No reviews");
	} else {
		$("#rating").text("Average rating of " + 
				(establishment.allRatings / establishment.reviewsCount).toFixed(2) + " out of 5");
		$("#reviewCount").text(establishment.reviewsCount + " reviews");
	}
	getReviews(establishment.id);
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

function getReviews(establishmentId) {
	return getReviewsByEstablishment(establishmentId).then(function(response) {
		$("#reviews").html("");
		_.forEach(response, addReview);
	});
}

function addQuestion(question) {
	var newItem = $("<div />");
	newItem.addClass("panel panel-danger");
	var newHeading = $("<div />");
	newHeading.addClass("panel-heading");
	newHeading.text("Question for " + question.establishment.name);
	var newBody = $("<div />");
	newBody.addClass("panel-body");
	var newQuestion = $("<p />");
	newQuestion.text(question.question);
	var newAuthor = $("<i />");
	var date = new Date(question.createdOn);
	newAuthor.text("- " + question.author.username + ", " + date.toString().slice(0, 21));
	var newStatus = $("<br><i />");
	if (question.answered) {
		newStatus.text("Answered");
	} else {
		newStatus.text("Unanswered");
	}
	newStatus.text("Unanswered");
	newBody.append(newQuestion, newAuthor, newStatus);
	newItem.append(newHeading, newBody);
	$("#questions").append(newItem);
}

$(document).ready(function() {
	"use strict";
	
	$("#logout").click(function() {
		$.ajax(ENDPOINT_AUTH, {
			method: "DELETE"
		});
	});
});