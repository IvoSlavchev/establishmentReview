$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/establishmentReview/api/establishment/signup";
	
	$("button").click(function() {
		var establishment = {
			username: $("[name='username']").val(),
			password: $("[name='password']").val(),
			name: $("[name='name']").val(),
			email: $("[name='email']").val(),
			telephone: $("[name='telephone']").val(),
			address: $("[name='address']").val(),
			type: $("select").val(),
			description: $("[name='description']").val()
		};
		
		$.ajax(ENDPOINT, {
			method: "POST",
			dataType: "json",
			data: JSON.stringify(establishment),
			contentType: "application/json; charset=utf-8"
		});
	});
});