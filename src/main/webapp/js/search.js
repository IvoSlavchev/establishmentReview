$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/establishmentReview/api/establishments";
	var name = "";
	var address = "";
	
	function getEstablishments() {
		return $.ajax(ENDPOINT, {
			method: "GET",
			dataType: "json"
		});
	}
	
	function filterEstablishments(establishment) {
		if ((name === "" || establishment[1].toUpperCase().indexOf(name.toUpperCase()) > -1) &&
			(address === "" || establishment[2].toUpperCase().indexOf(address.toUpperCase()) > -1)) {
			addItemToList(establishment);
		}
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
	
	
	function reloadList() {
		return getEstablishments().then(function(response) {
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
		name = $("[name='name']").val();
		address = $("[name='address']").val();
		reloadList();	
	});
});