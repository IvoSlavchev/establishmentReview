var ENDPOINT_PER = "http://localhost:8080/establishmentReview/api/persons";
var ENDPOINT_EST = "http://localhost:8080/establishmentReview/api/establishments";
var ENDPOINT_AUTH = "http://localhost:8080/establishmentReview/api/authentication";
var ENDPOINT_QUEST = "http://localhost:8080/establishmentReview/api/questions";
var ENDPOINT_FAV = "http://localhost:8080/establishmentReview/api/persons/favourites"

function isEmail(email) {
    var regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regExp.test(email);
}

function isEmpty(obj) {
	return obj.username == "" || obj.password == "";
}

function listError(text) {
	$("#errors").empty();
	var newError = $("<li />");
	var newText = $("<h4 />");
	newText.addClass("text text-danger");
	newText.text(text);
	newError.append(newText);
	$("#errors").append(newError);
}

function getEndpoint(ENDPOINT, suffix) {
	return ENDPOINT + "/" + suffix;
}

function getCurrentlyLoggedInPerson() {
	return $.ajax(getEndpoint(ENDPOINT_AUTH, "persons"), {
		method: "GET",
		dataType: "json",
		error: function(xhr) {
			if (xhr.status == 401 || xhr.status == 403) {
				window.location = 'http://localhost:8080/establishmentReview';
			}
		}
	});
}

function getCurrentlyLoggedInEstablishment() {
	return $.ajax(getEndpoint(ENDPOINT_AUTH, "establishments"), {
		method: "GET",
		dataType: "json",
		error: function(xhr) {
			if (xhr.status == 401 || xhr.status == 403) {
				window.location = 'http://localhost:8080/establishmentReview';
			}
		}	
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
				error: function(xhr) {
					if (xhr.status == 409) {
						listError("Username " + obj.username + " is already taken!");
					}
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
		error: function(xhr) {
			if (xhr.status == 500) {
				window.location = 'http://localhost:8080/establishmentReview/persons/search.html';
			}
		},
	});
}

function addEstablishment(item) {
	var newItem = $("<div />");
	newItem.addClass("panel panel-warning");
	var newHeading = $("<div />");
	newHeading.addClass("panel-heading");
	var newLink = $("<a />")
	newLink.attr("href", "view.html?=" + item.id);
	newLink.addClass("btn-block");
	newLink.text(item.name);
	newHeading.append(newLink);
	var newBody = $("<div />");
	newBody.addClass("panel-body");
	var newAddress = $("<p />");
	newAddress.text(item.address);
	var newType = $("<p />");
	newType.text(item.type);
	var newRating = $("<p />");
	if (item.reviewsCount == 0) {
		newRating.text("No reviews given")
	} else {
		newRating.text("Rated " + (item.allRatings / item.reviewsCount).toFixed(2) + " out of 5 from " +
				item.reviewsCount + " reviews");
	}
	newBody.append(newAddress, newType, newRating);
	newItem.append(newHeading, newBody);
	return newItem;
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
	showOnMap(establishment.address);
}

function showOnMap(address) {
	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 17,
		center: {lat: 0, lng: 0}
	});
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({"address": address}, function(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location
			});
		} else {
			alert("Geocode error: " + status);
		}
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
	newRating.text(review.author.username + " rated " + review.rating + " out of 5");
	var newBody = $("<div />");
	newBody.addClass("panel-body");
	var newOpinion = $("<p />");
	newOpinion.text(review.opinion);
	var newDate = $("<i />");
	var date = new Date(review.createdOn);
	newDate.text("Posted at " + date.toString().slice(0, 21));
	newBody.append(newOpinion, newDate);
	newItem.append(newRating, newBody);
	$("#reviews").append(newItem);
}

function getReviews(establishmentId) {
	return getReviewsByEstablishment(establishmentId).then(function(response) {
		$("#reviews").html("");
		_.forEach(response.reverse(), addReview);
	});
}

function addAnswer(answer) {
	var newStatus = $("<p />");
	var newAnswerHeading = $("<h4 />");
	newAnswerHeading.text("Answer:").css({"color": "#a94442"});
	var newAnswerText = $("<p />");
	newAnswerText.text(answer.answer);
	var newAnswerDate = $("<i />");
	var date = new Date(answer.createdOn);
	newAnswerDate.text("Answered at " + date.toString().slice(0, 21));
	newStatus.append(newAnswerHeading, newAnswerText, newAnswerDate);
	return newStatus;
}

function logout() {
	$.ajax(ENDPOINT_AUTH, {
		method: "DELETE"
	});
}

$(document).ready(function() {
	"use strict";
	
	$("#logout").click(function() {
		logout();
	});
});