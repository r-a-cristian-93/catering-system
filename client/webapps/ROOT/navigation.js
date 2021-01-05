$(document).ready(function(){
	$.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: REST_URL + '/employees/1',
		success: function(data, status, xhr) {
			console.log(data);
		},
		error: function() {
			window.location = CLIENT_URL + '/login.html';
		}
	});
});
