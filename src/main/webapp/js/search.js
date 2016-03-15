$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/establishmentReview/api/establishments";
	
	var name = "";
	var address = "";
	var type = "all";
	
	function contains(string, substring) {
		return string.toUpperCase().indexOf(substring.toUpperCase()) > -1
	}
	
	function getEstablishments() {
		return $.ajax(ENDPOINT, {
			method: "GET",
			dataType: "json"
		});
	}
	
	function filterItems(item) {
		if ((name === "" || contains(item[1], name)) &&
			(address === "" || contains(item[2], address)) && 
			(type === "all" || contains(item[3], type))) {
			addItemToList(item);
		}
	}
	
	function addItemToList(item) {
		var newItem = $("<a />");
		newItem.attr("href", "/establishmentReview/persons/view.html?id=" + item[0]);
		newItem.addClass("list-group-item list-group-item-warning");
		var newHeader = $("<h4 />");
		newHeader.text(item[1]);
		newHeader.addClass("list-group-item-heading");
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
			_.forEach(response, filterItems);
			if (!$("#establishmentsList a").length) {
				var newItem = $("<li />");
				newItem.text("No results found!");
				$("#establishmentsList").append(newItem);
			}
		});
	}

	$("#search").click(function() {
		name = $("[name='name']").val();
		address = $("[name='address']").val();
		type = $("select").val();
		reloadList();	
	});
});