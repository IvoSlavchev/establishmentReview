var ENDPOINT_EST = "http://localhost:8080/establishmentReview/api/establishments";

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

function getEndpoint(ENDPOINT, id) {
	return ENDPOINT + "/" + id;
}

function getCookie(name) {
    var name = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
        	c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        	return c.substring(name.length,c.length);
        }
    }
    return "";
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
					window.location='http://localhost:8080/establishmentReview';
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

$(document).ready(function() {
	"use strict";
	
	$("#logout").click(function() {
		document.cookie = "session=;path=/establishmentReview/;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	});
});