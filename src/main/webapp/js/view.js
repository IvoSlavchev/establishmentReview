$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/establishmentReview/api/establishments";
	
	function establishmentEndpoint(establishmentId) {
		return ENDPOINT + "/" + establishmentId;
	}
	
	function getQueryId() {
		var query = window.location.search.substring(1);
		var pair = query.split("=");
		return Number(pair[1]);
	}
	
	function getEstablishment(establishmentId) {
		return $.ajax(establishmentEndpoint(establishmentId), {
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
	
	getEstablishment(getQueryId()).then(showEstablishment);
});