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
	
	function attachHandlers() {
		$("#review").click(function() {
			clearInput();
			$("#addReview").show();
			$("#review").hide();
		})
		
		$("#cancel").click(function() {
			$("#addReview").hide();
			$("#review").show();
		});
		
		$("#save").click(function() {
			createReview();
			$("#addReview").hide();
			$("#review").show();
		});
	}
	
	getEstablishment(getQueryId()).then(showEstablishment);
	attachHandlers();
});