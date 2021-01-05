$(document).ready(function(){
	$(document.login).submit(function(event){
		event.preventDefault();
		$.ajax({
			method: 'POST',
			xhrFields: { withCredentials: true },
			url: REST_URL + '/login',
			data: {
				username: document.login.username.value,
				password: document.login.password.value
			},
			success: function(){
				window.location = CLIENT_URL + '/';
			},
			error: function() {
				window.location = CLIENT_URL + '/login.html';
			}
		});
	});
});
	
			
