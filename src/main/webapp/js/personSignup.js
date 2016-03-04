$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/establishmentReview/api/person/signup";
	
	$("button").click(function() {
		var person = {
			username: $("[name='username']").val(),
			password: $("[name='password']").val(),
			email: $("[name='email']").val()
		};
		var password2 = $("[name='password2']").val();
		
		if (!isEmpty(person)) {
			if (person.password == password2) {
				if (isEmail(person.email)) {	
					$.ajax(ENDPOINT, {
						method: "POST",
						dataType: "json",
						data: JSON.stringify(person),
						contentType: "application/json; charset=utf-8",
						error: function() {
							listError(person.username + " is already taken!");
						},
						success: function() {
							window.location='http://localhost:8080/establishmentReview';
						}
					});
				} else {
					listError(person.email + " is not a valid email!");
				}
			} else {
				listError("Passwords don't match!");
			}
		} else {
			listError("All fields are required!");
		}
	});
});