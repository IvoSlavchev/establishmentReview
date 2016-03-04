$(document).ready(function() {
	"use strict";
	
	$("#logout").click(function() {
		document.cookie = "session=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	});
});