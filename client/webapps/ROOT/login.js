$(document).ready(function(){
	$(document.login).submit(function(event){
		event.preventDefault();
		$.ajax({
			method: 'POST',
			xhrFields: { withCredentials: true },
			url: DEFAULTS.REST_URL + '/login',
			data: {
				username: document.login.username.value,
				password: document.login.password.value
			},
			success: function(){
				window.location = DEFAULTS.CLIENT_URL + '/';
			},
			error: function() {
				window.location = DEFAULTS.CLIENT_URL + '/login.html';
			}
		});
	});
});
	
			
