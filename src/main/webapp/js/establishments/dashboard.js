$(document).ready(function() {
	"use strict";
	
	getCurrentlyLoggedInEstablishment().then(showEstablishment);
});