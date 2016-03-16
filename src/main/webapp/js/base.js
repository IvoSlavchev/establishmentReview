function isEmail(email) {
    var regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regExp.test(email);
}

function isEmpty(obj) {
	return obj.username == "" || obj.password == "";
}

function listError(text) {
	$("#errors").empty();
	$("#errors").append("<li>" + text + "</li>");
}

function getEndpoint(ENDPOINT, id) {
	return ENDPOINT + "/" + id;
}

function getCookie(name) {
    var name = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
        	c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        	return c.substring(name.length,c.length);
        }
    }
    return "";
}

function sendSignup(obj, ENDPOINT) {
	if (!isEmpty(obj)) {
		if (isEmail(obj.email)) {	
			$.ajax(ENDPOINT, {
				method: "POST",
				dataType: "json",
				data: JSON.stringify(obj),
				contentType: "application/json; charset=utf-8",
				error: function() {
					listError(obj.username + " is already taken!");
				},
				success: function() {
					window.location='http://localhost:8080/establishmentReview';
				}
			});
		} else {
			listError(obj.email + " is not a valid email!");
		}
	} else {
		listError("Username, password and email are required!");
	}
}