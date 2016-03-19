$(document).ready(function() {
	"use strict";
	
	var establishmentId = getCookie("session");
	
	getEstablishment(establishmentId).then(showEstablishment);
	getReviews(establishmentId);
});