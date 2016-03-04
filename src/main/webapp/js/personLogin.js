$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/establishmentReview/api/person/login";
	
	$("button").click(function() {
		var person = {
			username: $("[name='username']").val(),
			password: $("[name='password']").val()
		};
		
		$.ajax(ENDPOINT, {
			method: "POST",
			dataType: "json",
			data: JSON.stringify(person),
			contentType: "application/json; charset=utf-8",
			error: function() {
				listError("Username or password incorrect!");
			},
			success: function() {
				var now = new Date();
				now.setTime(now.getTime() + 3600 * 1000);
				document.cookie = "session=" + person.username + "; expires=" + now.toGMTString() + ";";
				window.location = "http://localhost:8080/establishmentReview/person/dashboard.html";
			}
		});
	});
});