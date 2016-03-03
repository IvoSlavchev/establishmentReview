$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/establishmentReview/api/establishment/signup";
	
	$("button").click(function() {
		var establishment = {
			username: $("[name='username']").val(),
			password: $("[name='password']").val(),
			email: $("[name='email']").val(),
			name: $("[name='name']").val(),
			telephone: $("[name='telephone']").val(),
			address: $("[name='address']").val(),
			type: $("select").val(),
			description: $("[name='description']").val()
		};
		
		if (!isEmpty(establishment)) {
			if (isEmail(establishment.email)) {	
				$.ajax(ENDPOINT, {
					method: "POST",
					dataType: "json",
					data: JSON.stringify(establishment),
					contentType: "application/json; charset=utf-8",
					error: function() {
						listError(establishment.username + " is already taken!");
					},
					success: function() {
						window.location='http://localhost:8080/establishmentReview';
					}
				});
			} else {
				listError(establishment.email + " is not a valid email!");
			}
		} else {
			listError("Username and password fields are required!");
		}
	});
});