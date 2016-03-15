$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/establishmentReview/api/establishments";
	
	function getEstablishments() {
		return $.ajax(ENDPOINT, {
			method: "GET",
			dataType: "json"
		});
	}
	
	function addItemToList(item) {
		var newItem = $("<div />");
		newItem.addClass("list-group-item");
		var newHeader = $("<h4 />");
		newHeader.text(item[1]);
		newHeader.addClass("list-group-item-heading");
		newHeader.attr("data-task-id", item[0]);
		var newAddress = $("<p />");
		newAddress.text(item[2]);
		newAddress.addClass("list-group-item-description");
		var newType = $("<p />");
		newType.text(item[3]);
		newType.addClass("list-group-item-description");
		newType.css("text-transform", "capitalize");
		newItem.append(newHeader, newAddress, newType);
		$("#establishmentsList").append(newItem);
	}
	
	function reloadList(name) {
		return getEstablishments().then(function(response) {
			function filterEstablishments(establishment) {
				if (name == null || name === "" ||
					establishment[1].toUpperCase().indexOf(name.toUpperCase()) > -1) {
					addItemToList(establishment);				
				}
			}
			$("#establishmentsList").html("");
			_.forEach(response, filterEstablishments);
			if (!$("#establishmentsList div").length) {
				var newItem = $("<li />");
				newItem.text("No results found!");
				$("#establishmentsList").append(newItem);
			}
		});
	}

	$("#search").click(function() {
		var name = $("[name='name']").val();
		reloadList(name);	
	});
});