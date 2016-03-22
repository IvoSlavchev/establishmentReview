$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/establishmentReview/api/persons";
	
	$("#signup").click(function() {
		var person = {
			username: $("[name='username']").val(),
			password: $("[name='password']").val(),
			email: $("[name='email']").val()
		};
		var password2 = $("[name='password2']").val();
		
		if (person.password == password2) {
			sendSignup(person, ENDPOINT)
		} else {
			listError("Passwords don't match!");
		}
	});
});