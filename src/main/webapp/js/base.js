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