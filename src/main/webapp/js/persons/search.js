$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/establishmentReview/api/establishments";
	
	var name = "";
	var address = "";
	var type = "All";
	var rating = 0;
	
	function contains(string, substring) {
		return string.toUpperCase().indexOf(substring.toUpperCase()) > -1;
	}
	
	function getInput() {
		name = $("[name='name']").val();
		address = $("[name='address']").val();
		type = $("[name='type']").val();
		rating = $("[name='rating']").val();
	}
	
	function getEstablishments() {
		return $.ajax(ENDPOINT, {
			method: "GET",
			dataType: "json"
		});
	}
	
	function filterItems(item) {
		if ((name === "" || contains(item.name, name)) &&
			(address === "" || contains(item.address, address)) &&
			(type === "All" || contains(item.type, type)) &&
			(rating == 0 ||(item.allRatings / item.reviewsCount) >= rating)) {
			addItemToList(item);
		}
	}
	
	function addItemToList(item) {
		var newItem = addEstablishment(item);
		$("#establishments").append(newItem);
	}
		
	function reloadList() {
		return getEstablishments().then(function(response) {
			$("#establishments").html("");
			_.forEach(response.reverse(), filterItems);
			if (!$("#establishments a").length) {
				var newItem = $("<li />");
				var newText = $("<h4 />");
				newText.addClass("text text-center");
				newText.text("No establishments found!");
				newItem.append(newText);
				$("#establishments").append(newItem);
			}
		});
	}

	reloadList();
	
	$("#search").click(function() {
		getInput();
		reloadList();	
	});
});