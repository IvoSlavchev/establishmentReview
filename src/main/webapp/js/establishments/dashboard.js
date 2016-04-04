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
	
	function createAnswer() {
		alert($("[name='answer']").val());
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
		var newStatus = $("<p />");
		if (question.answered) {
			newStatus.text("Answered");
		} else {
			var newButton = $("<button />");
			newButton.addClass("btn btn-danger addAnswer");
			newButton.attr("id", question.id);
			newButton.text("Answer");
			newStatus.append(newButton);
		}
		newBody.append(newQuestion, newDate, newStatus);
		newItem.append(newHeading, newBody);
		$("#questions").append(newItem);
	}
	
	function attachHandlers() {
		$("#questions").on("click", ".addAnswer", function() {
			$("#questionText").text($("#questions p#" + this.id).text());
			$("#questionDate").text($("#questions i#" + this.id).text());
		    $("#edit, #reviews, #questions, #infoHeaders").hide();
		    $("#addAnswerPanel").show();
		});
		
		$(".cancel").click(function() {
			clearInput();
			$("#addAnswerPanel").hide();
			$("#edit, #reviews, #questions, #infoHeaders").show();
		});
		
		$("#saveAnswer").click(function() {
			createAnswer();
			clearInput();
			$("#addAnswerPanel").hide();
			$("#edit, #reviews, #questions, #infoHeaders").show();
		});
	}
	
	getCurrentlyLoggedInEstablishment().success(function(establishment) {
		showEstablishment(establishment);
		getReviews(establishment.id);
		getQuestions();
	});

	attachHandlers();
});