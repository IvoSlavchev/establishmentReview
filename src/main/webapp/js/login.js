$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/establishmentReview/api/authentication/" + type;
	
	$("#login").click(function() {
		var obj = {
			username: $("[name='username']").val(),
			password: $("[name='password']").val()
		};

		$.ajax(ENDPOINT, {
			method: "POST",
			dataType: "json",
			data: JSON.stringify(obj),
			contentType: "application/json; charset=utf-8",
			error: function(xhr) {
				if (xhr.status == 500) {
					listError("Username or password incorrect!");
				}
			},
			success: function(response) {
				window.location = "http://localhost:8080/establishmentReview/" +
					type + "/dashboard.html";
			}
		});
	});
});