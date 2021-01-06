$(document).ready(function(){
	$.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: REST_URL + '/employees/1',
		success: function(data, status, xhr) {
			console.log(data);
			loadMenu(data);
		},
		error: function() {
			window.location = CLIENT_URL + '/login.html';
		}
	});		
});

/* *****************MENU*******************
 * 
 * Function for building the navigation menu
 * 
 * */

function loadMenu(user) {
	var adminMenu=null;
	
	if(user.role.name=='admin') {
		adminMenu = newLiDD("-ADMIN-", [
			newA("Mange", "")]);
	}			
	
	$("body").prepend(
		$("<ul></ul>")
			.append(newDivUsr(user.name, ""))
			.append(newLi().append(newA("Acasa", "index.html")))
			.append(newLiDD("Comenzi", [
						newA("Toate comenzile", ""),
						newA("Comanda Noua", "comanda-noua.html")]))
			.append(newLiDD("Retete", [
						newA("Toate retetele", ""),
						newA("Adauga reteta")]))
			.append(adminMenu)			
	);
}

function newA(text, url) {
	return  $("<a></a>")
				.text(text)
				.attr({"href": url});
			}		

function newDivDDC(arrayA) {
	var ddc = $("<div></div>")
				.attr({"class": "dropdown-content"});
	for(a of arrayA) {
		ddc.append(a);
	}	
	return ddc;
}

function newLi(){
	return $("<li></li>");
}
function newLiDD(text, arrayA){
	return $("<li></li>")
				.attr({"class": "dropdown"})
				.append(newA(text, "javascript:void(0)"))
				.append(newDivDDC(arrayA));
			}
			
function newDivUsr(username, url) {
	return $("<div></div>")
				.attr({"class": "fr"})
				.append(
					newA(username, url)
						.attr({"class": "a-profile"})
						.prepend($("<img>").attr({"src": "/img/profile.png"})));
			}

//**************END MENU*****************

