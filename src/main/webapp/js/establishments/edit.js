$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/establishmentReview/api/establishments";
	
	function updateEstablishment(establishment, establishmentId) {
		$.ajax(getEndpoint(ENDPOINT, establishmentId), {
			method: "PUT",
			dataType: "json",
			data: JSON.stringify(establishment),
			contentType: "application/json; charset=utf-8",
			success: function() {
				window.location = 
					'http://localhost:8080/establishmentReview/establishments/dashboard.html';
			}
		});
	}
	
	function populateForm(establishment) {
		$("[name='name']").val(establishment.name);
		$("[name='email']").val(establishment.email);
		$("[name='telephone']").val(establishment.telephone);
		$("[name='address']").val(establishment.address);
		$("select option[value=" + establishment.type + "]").prop("selected", "selected");
		$("[name='description']").val(establishment.description);
	}
	
	var currId = 0;
	getCurrentlyLoggedInEstablishment().success(function(establishment) {
		  populateForm(establishment);
		  currId = establishment.id;
	});
	
	$("#save").click(function() {		
		var establishment = {
			name: $("[name='name']").val(),
			email: $("[name='email']").val(),
			telephone: $("[name='telephone']").val(),
			address: $("[name='address']").val(),
			type: $("select").val(),
			description: $("[name='description']").val()
		};
		
		if (isEmail(establishment.email)) {	
			updateEstablishment(establishment, currId);
		} else {
			listError(establishment.email + " is not a valid email!");
		}
	});
});