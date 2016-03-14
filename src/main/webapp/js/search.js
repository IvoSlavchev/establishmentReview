$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/establishmentReview/api/establishments";
	
	function listEstablishments() {
		return $.ajax(ENDPOINT, {
			method: "GET",
			dataType: "json"
		});
	}
	
	function reloadEstablishments() {
		return listEstablishments().then(function(response) {
			function addEstablishmentToList(establishment) {
				var newItem = $("<div /> <br>");
				newItem.addClass("list-group-item");
				var newHeader = $("<h4 />");
				newHeader.text(establishment.name);
				newHeader.addClass("list-group-item-heading");
				newHeader.attr("data-task-id", establishment.id);
				var newAddress = $("<p />");
				newAddress.text(establishment.address);
				newAddress.addClass("list-group-item-description");
				var newType = $("<p />");
				newType.text(establishment.type);
				newType.addClass("list-group-item-description");
				newType.css("text-transform", "capitalize");
				newItem.append(newHeader, newAddress, newType);
				$("#establishmentsList").append(newItem);
			}
			$("#establishmentsList").html("");
			_.forEach(response, addEstablishmentToList);
		});
	}
	
	reloadEstablishments();
});