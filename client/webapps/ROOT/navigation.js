var navigationMenu = null;

$(document).ready(function(){
	$.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: DEFAULTS.REST_URL + '/employees/myinfo',
		success: function(data, status, xhr) {
			navigationMenu = newNavMenu(data);
			setCurrentPage(navigationMenu);
			$("body").prepend(navigationMenu);
		},
		error: function() {
			window.location = DEFAULTS.CLIENT_URL + '/login.html';
		}
	});		
});

/* *****************MENU*******************
 * 
 * Function for building the navigation menu
 * 
 * */

function newNavMenu(user) {	
	var nav = $("<div>")
		.addClass("nav")
		.append(newUserA(user.name, "user.html"))	
		.append(newNavEl("Acasa", "index.html"))
		.append(newNavEl("Comenzi", "comenzi.html"))
		.append(newNavEl("Retete", "retete.html"))
		.append(newNavEl("Ingrediente", "ingrediente.html"));
		
	if(user.role.name=='admin') {
		nav.append(newNavEl("-ADMIN-", "admin.html"));
	}		
	return nav;
}

function newA(text, url) {
	return  $("<a>").text(text)	.attr({"href": url});
}		

function newNavEl(text, url) {
	return  newA(text, url).addClass("nav-el");
}		

function newDivDDC(arrayA) {
	var ddc = $("<div>")
				.attr({"class": "dropdown-content"});
	for(a of arrayA) {
		ddc.append(a);
	}	
	return ddc;
}
			
function newUserA(username, url) {
	return newA(username, url)
		.addClass("profile")
		.prepend($("<img>").attr({"src": "/img/profile.png"}));
}
			
function setCurrentPage(nav) {
	var currentAddress = document.location.href;
	console.log(currentAddress);
	
	var list = nav.find("a");
	for (a of list) {
		if(currentAddress == a.href) {
			$(a).addClass("current-page");
		}
	}	
}

//**************END MENU*****************

