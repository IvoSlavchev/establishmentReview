$(document).ready(function() {
	"use strict";
	
	function getQuestionsByEstablishment() {
		return $.ajax(getEndpoint(ENDPOINT_EST, "questions"), {
			method: "GET",
			dataType: "json"
		});
	}

	function getQuestions() {
		return getQuestionsByEstablishment().then(function(response) {
			$("#questions").html("");
			_.forEach(response.reverse(), addQuestion);
		});
	}
	
	function clearInput() {
		$("[name='answer']").val("");
	}
	
	function populateFields(questionId) {
		$("#questionText").text($("#questions p#" + questionId).text());
		$("#questionDate").text($("#questions i#" + questionId).text());
		$("#saveAnswer").attr("question-id", questionId);
	}
	
	function createAnswer(questionId) {
		var answer = {
			answer: $("[name='answer']").val()
		};
		
		$.ajax(getEndpoint(ENDPOINT_QUEST, questionId) + "/answer", {
			method: "POST",
			dataType: "json",
			data: JSON.stringify(answer),
			contentType: "application/json; charset=utf-8",
			success: function() {
				reloadReviewsAndQuestions();
			}
		});
	}
	
	function addQuestion(question) {
		var newItem = $("<div />");
		newItem.addClass("panel panel-danger");
		var newHeading = $("<div />");
		newHeading.addClass("panel-heading");
		newHeading.text("Asked by " + question.author.username);
		var newBody = $("<div />");
		newBody.addClass("panel-body");
		var newQuestion = $("<p />");
		newQuestion.attr("id", question.id);
		newQuestion.text(question.question);
		var newDate = $("<i />");
		var date = new Date(question.createdOn);
		newDate.attr("id", question.id);
		newDate.text("Asked at " + date.toString().slice(0, 21));
		var newAnswer = $("<p />");
		if (question.answer) {
			newAnswer = addAnswer(question.answer);
		} else {
			var newButton = $("<button />");
			newButton.addClass("btn btn-danger addAnswer");
			newButton.attr("id", question.id);
			newButton.text("Answer");
			newAnswer.append(newButton);
		}
		newBody.append(newQuestion, newDate, newAnswer);
		newItem.append(newHeading, newBody);
		$("#questions").append(newItem);
	}
	
	function reloadReviewsAndQuestions() {
		getReviews(establishmentId);
		getQuestions();
	}
	
	function attachHandlers() {
		$("#questions").on("click", ".addAnswer", function() {
			populateFields(this.id);
		    $("#edit, #reviews, #questions").hide();
		    $("#addAnswerPanel").show();
		});
		
		$(".cancel").click(function() {
			clearInput();
			$("#addAnswerPanel").hide();
			$("#edit, #reviews, #questions").show();
		});
		
		$("#saveAnswer").click(function() {
			createAnswer($("#saveAnswer").attr("question-id"));
			clearInput();
			$("#addAnswerPanel").hide();
			$("#edit, #reviews, #questions").show();
		});
	}
	
	var establishmentId = 0;
	getCurrentlyLoggedInEstablishment().success(function(establishment) {
		showEstablishment(establishment);
		establishmentId = establishment.id;
		reloadReviewsAndQuestions();
		attachHandlers();
	});
	
});