$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/establishmentReview/api/establishments";
	
	$("#signup").click(function() {
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
		var password2 = $("[name='password2']").val();
		
		if (establishment.password == password2) {
			sendSignup(establishment, ENDPOINT);
		} else {
			listError("Passwords don't match!");
		}
	});
});