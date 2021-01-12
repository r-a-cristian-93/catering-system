$(document).ready(function(){
	$.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		url: REST_URL + '/ingredients',
		success: function(data, status, xhr) {
			buildIngTable(data);
		},
		error: function() {
			console.log("ING ERROR");
		}
	});	
});

function deleteIngredient(id) {
	$.ajax({
		method: 'DELETE',
		xhrFields: { withCredentials: true },
		url: REST_URL + '/ingredients/' + id,
		success: function(data, status, xhr) {
			ingTabDeleteRow(id);
		}
	});
}

function updateIngredient(id) {
	var ingredient = {
		'name': $("#" + id + " td:eq(1)").text(),
		'price': $("#" + id + " td:eq(2)").text(),
		'unit': {'name': $("#" + id + " td:eq(3)").text()}
	}
	
	$.ajax({
		method: 'PUT',		
		xhrFields: { withCredentials: true },
		url: REST_URL + '/ingredients/'+id,
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify(ingredient),
		success: function(data, status, xhr) {
			ingTabRefreshRow(data);
			disableSaveIngredient(data.id);
		}
	});	
}	

function addNewIngredient() {
	var ingredient = {
		"name": "[ingredient nou]",
		"price": 0,
		"unit": {"name":"g"}
	};
	$.ajax({
		method: 'POST',		
		xhrFields: { withCredentials: true },
		url: REST_URL + '/ingredients',
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify(ingredient),
		success: function(data, status, xhr) {
			ingTabAddRow(data);
		}
	});
}

function ingTabAddRow(data) {
	$("table").append(newIngRow(data))
}

function ingTabRefreshRow(data) {
	var id = data.id;
	$("#" + id + " td:eq(1)").text(data.name);
	$("#" + id + " td:eq(2)").text(data.price);
	$("#" + id + " td:eq(3)").text(data.unit.name);
}

function ingTabDeleteRow(id) {
	$("#" + id).remove();
}

function newIngRow(ing) {
	var saveButton = $("<img>")
		.addClass("inactive")
		.attr({"src": "/img/save.png"});
	var deleteButton = $("<img>")
		.addClass("active")
		.attr({"src": "/img/delete.png"})
		.attr({"onclick": "deleteIngredient("+ing.id+")"});
	
	return newRow([
		ing.id, 
		ing.name, 
		ing.price, 
		ing.unit.name,
		saveButton,
		deleteButton
	], [0, 1, 1, 1, 0, 0])
		.on("input", function() {				
			activateSaveIngredient(this.id)});
}	

function activateSaveIngredient(id) {
		$("#" + id + " td:eq(4) > img")
		.attr({"class":"active"})
		.attr({"onclick": "updateIngredient("+id+")"});	
}

function disableSaveIngredient(id) {
	$("#" + id + " td:eq(4) > img")
		.attr({"onclick": ""})
		.attr({"class":"inactive"});
}

function buildIngTable(data) {	
	var table = $("<table>");
	table.append(newHeader(["ID", "Denumire", "Pret [Lei]", "U/M"]));
		
	for(ing of data) {
		click = 'buildEditIngModal("' +ing.id+ '");';
		var row = newIngRow(ing);
		table.append(row);
	}
	
	$("#ing-table")
		.append($("<h2>").text("Tabel ingrediente"))
		.append(table)
		.append(
			$("<button>")
				.addClass("button")
				.attr({"onclick": "addNewIngredient()"})
				.html("+ Adauga ingredient nou"));			
		
}
