$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/establishmentReview/api/establishments";
	
	var name = "";
	var address = "";
	var type = "All";
	var rating = 0;
	var reviewsCount = 0;
	
	function contains(string, substring) {
		return string.toUpperCase().indexOf(substring.toUpperCase()) > -1
	}
	
	function getInput() {
		name = $("[name='name']").val();
		address = $("[name='address']").val();
		type = $("select").val();
		rating = $("[name='rating']").val();
		reviewsCount = $("[name='reviewsCount']").val();
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
			item.averageRating >= rating && item.reviewsCount >= reviewsCount) {
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
		newRating.text("Average rating of " + item.averageRating);
		var newReviewCount = $("<p />");
		newReviewCount.addClass("list-group-item-description");
		newReviewCount.text(item.reviewsCount + " given reviews");
		newItem.append(newHeading, newAddress, newType, newRating, newReviewCount);
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