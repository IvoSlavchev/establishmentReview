$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/users/signup";
	
	$("button").click(function() {
		var user = {
			username: $("[name='username']").val(),
			password: $("[name='password']").val(),
			email: $("[name='email']").val()
		};
		
		$.ajax(ENDPOINT, {
			method: "POST",
			dataType: "json",
			data: JSON.stringify(user),
			contentType: "application/json; charset=utf-8"
		});
	});
});