$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/establishmentReview/api/person/signup";
	
	function isEmail(email) {
	    var regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	    return regExp.test(email);
	}
	
	function isEmpty(person) {
		return person.username == "" || person.password == "";
	}
	
	function listError(text) {
		$("#errors").empty();
		$("#errors").append("<li>" + text + "</li>");
	}
	
	$("button").click(function() {
		var person = {
			username: $("[name='username']").val(),
			password: $("[name='password']").val(),
			email: $("[name='email']").val()
		};
		
		if (!isEmpty(person)) {
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
			listError("All fields are required!");
		}
	});
});