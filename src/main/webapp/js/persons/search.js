$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/establishmentReview/api/establishments";
	
	var name = "";
	var address = "";
	var type = "All";
	var rating = 0;
	
	function contains(string, substring) {
		return string.toUpperCase().indexOf(substring.toUpperCase()) > -1
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
			(item.allRatings / item.reviewsCount) >= rating) {
			addItemToList(item);
		}
	}
	
	function addItemToList(item) {
		var newItem = $("<a />");
		newItem.attr("href", "/establishmentReview/persons/view.html?id=" + item.id);
		newItem.addClass("list-group-item list-group-item-warning");
		var newHeading = $("<h4 />");
		newHeading.addClass("list-group-item-heading");
		newHeading.text(item.name);
		var newAddress = $("<p />");
		newAddress.addClass("list-group-item-description");
		newAddress.text(item.address);
		var newType = $("<p />");
		newType.addClass("list-group-item-description");
		newType.text(item.type);
		var newRating = $("<p />");
		newRating.addClass("list-group-item-description");
		if (item.reviewsCount == 0) {
			newRating.text("No reviews given")
		} else {
			newRating.text("Rated " + (item.allRatings / item.reviewsCount).toFixed(2) + " out of 5 from " +
					item.reviewsCount + " reviews");
		}
		newItem.append(newHeading, newAddress, newType, newRating);
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

	reloadList();
	
	$("#search").click(function() {
		getInput();
		reloadList();	
	});
});