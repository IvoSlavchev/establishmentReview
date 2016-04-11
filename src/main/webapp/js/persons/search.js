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
		var newItem = $("<div />");
		newItem.addClass("panel panel-warning");
		var newHeading = $("<div />");
		newHeading.addClass("panel-heading");
		var newLink = $("<a />")
		newLink.attr("href", "view.html?=" + item.id);
		newLink.addClass("btn-block");
		newLink.text(item.name);
		newHeading.append(newLink);
		var newBody = $("<div />");
		newBody.addClass("panel-body");
		var newAddress = $("<p />");
		newAddress.text(item.address);
		var newType = $("<p />");
		newType.text(item.type);
		var newRating = $("<p />");
		if (item.reviewsCount == 0) {
			newRating.text("No reviews given")
		} else {
			newRating.text("Rated " + (item.allRatings / item.reviewsCount).toFixed(2) + " out of 5 from " +
					item.reviewsCount + " reviews");
		}
		newBody.append(newAddress, newType, newRating);
		newItem.append(newHeading, newBody);
		$("#establishments").append(newItem);
	}
		
	function reloadList() {
		return getEstablishments().then(function(response) {
			$("#establishments").html("");
			_.forEach(response, filterItems);
			if (!$("#establishments a").length) {
				var newItem = $("<li />");
				newItem.text("No results found!");
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