$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/establishmentReview/api/establishments";
	
	function getQueryId() {
		var query = window.location.search.substring(1);
		var pair = query.split("=");
		return Number(pair[1]);
	}
	
	function getEstablishment(establishmentId) {
		return $.ajax(getEndpoint(ENDPOINT, establishmentId), {
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
		$("[name='reviewText']").val("");
	}
	
	function createReview() {
		console.log($("select").val());
		console.log($("[name='reviewText']").val());
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