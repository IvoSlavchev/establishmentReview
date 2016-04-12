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
			_.forEach(response.reverse(), addQuestion);
		});
	}
	
	function addQuestion(question) {
		var newItem = $("<div />");
		newItem.addClass("panel panel-danger");
		var newHeading = $("<div />");
		newHeading.addClass("panel-heading");
		var newAnswer = $("<p />");
		if (question.answer) {
			newHeading.text("Answered");
			newAnswer = addAnswer(question.answer);
		} else {
			newHeading.text("Unanswered");
		}
		var newBody = $("<div />");
		newBody.addClass("panel-body");
		var newQuestion = $("<p />");
		newQuestion.text(question.question);
		var newDate = $("<i />");
		var date = new Date(question.createdOn);
		newDate.text("Asked at " + date.toString().slice(0, 21));
		newBody.append(newQuestion, newDate, newAnswer);
		newItem.append(newHeading, newBody);
		$("#questions").append(newItem);
	}
	
	function addFavourite() {
		$.ajax(getEndpoint(ENDPOINT_FAV, establishmentId), {
			method: "POST"
		});
	}
	
	function removeFavourite() {
		$.ajax(getEndpoint(ENDPOINT_FAV, establishmentId), {
			method: "DELETE"
		});
	}
	
	function checkFavourite() {
		return $.ajax(getEndpoint(ENDPOINT_FAV, establishmentId), {
			method: "GET",
			dataType: "json"
		});
	}
	
	function checkFavouriteAdded() {
		checkFavourite().then(function(response) {
			if (response) {
				createRemoveFavouriteButton();
			} else {
				createAddFavouriteButton();
			}
		})
	}
	
	function createAddFavouriteButton() {
		$(".favourites").remove();
		var newButton = $("<button />");
		newButton.addClass("btn btn-warning favourites");
		newButton.attr("id", "addFavourite");
		newButton.attr("type", "button");
		newButton.text("Add to favourites");
		$("#info .panel-body").prepend(newButton);
	}
	
	function createRemoveFavouriteButton() {
		$(".favourites").remove();
		var newButton = $("<button />");
		newButton.addClass("btn btn-danger favourites");
		newButton.attr("id", "removeFavourite");
		newButton.attr("type", "button");
		newButton.text("Remove from favourites");
		$("#info .panel-body").prepend(newButton);
	}
	
	function reloadReviewsAndQuestions() {
		getReviews(establishmentId);
		getQuestions();
	}
	
	function attachHandlers() {	
		$("#addReview").click(function() {
			$("#addReview, #askQuestion, #reviews, #questions").hide();
			$("#addReviewPanel").show();
		})
		
		$("#askQuestion").click(function() {			
			$("#addReview, #askQuestion, #reviews, #questions").hide();
			$("#askQuestionPanel").show();
		})
		
		$(".cancel").click(function() {
			clearInput();
			$("#addReviewPanel, #askQuestionPanel").hide();
			$("#addReview, #askQuestion, #reviews, #questions").show();
		});
		
		$("#saveReview").click(function() {
			createReview();
			clearInput();
			$("#addReviewPanel").hide();
			$("#addReview, #askQuestion, #reviews, #questions").show();
		});
		
		$("#saveQuestion").click(function() {
			createQuestion();
			clearInput();
			$("#askQuestionPanel").hide();
			$("#addReview, #askQuestion, #reviews, #questions").show();
		});
		
		$("#info").on("click", "#addFavourite", function() {
			addFavourite();
			createRemoveFavouriteButton();
			alert("Added to favourites!");
		});
		
		$("#info").on("click", "#removeFavourite", function() {
			removeFavourite();
			createAddFavouriteButton()
			alert("Removed from favourites!");
		});
	}
	
	var personId = 0;
	var establishmentId = getQueryId();
	getEstablishment(establishmentId).then(showEstablishment);
	getCurrentlyLoggedInPerson().success(function(person) {
		personId = person.id;
		checkFavouriteAdded();
		reloadReviewsAndQuestions();
		attachHandlers();
	});
});