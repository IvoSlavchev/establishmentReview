$(document).ready(function() {
	"use strict";
	
	$("#logout").click(function() {
		document.cookie = "session=;path=/establishmentReview/;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	});
});