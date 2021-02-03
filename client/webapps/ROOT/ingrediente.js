/* ********** INGREDIENT **********/

$(document).ready(function(){
	ingredientBuildTable();
});

// http requests

function getIngredients() {
	return $.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		url: REST_URL + '/ingredients'
	});
}

function addIngredient(ingredient) {
	return $.ajax({
		method: 'POST',
		xhrFields: { withCredentials: true },
		url: REST_URL + '/ingredients',
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify(ingredient),
	});
}

function updateIngredient(ingredient) {
	return $.ajax({
		method: 'PUT',
		xhrFields: { withCredentials: true },
		url: REST_URL + '/ingredients/'+ingredient.id,
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify(ingredient)
	});	
}

function deleteIngredient(id) {
	return $.ajax({
		method: 'DELETE',
		xhrFields: { withCredentials: true },
		url: REST_URL + '/ingredients/' + id
	});
}

// ui operations

function ingredientAdd() {
	var ingredient = {
		"name": "[ingredient nou]",
		"price": 0,
		"unit": {"name":"g"}
	};
	$.when(addIngredient(ingredient)).then(function(data){
		$("table").append(newIngRow(data))
	});	
}

function ingredientUpdate(id) {
	var ingredient = {
		'id': id,
		'name': $("#" + id + " td:eq(1)").text(),
		'price': $("#" + id + " td:eq(2)").text(),
		'unit': {'name': $("#" + id + " td:eq(3)").text()}
	}
	$.when(updateIngredient(ingredient)).then(function(data){
		$("#" + id).replaceWith(newIngRow(data));
	});
}

function ingredientDelete(id) {
	$.when(deleteIngredient(id)).then(function(){
		$("#" + id).remove();
	});
}

function ingredientBuildTable() {
	$.when(getIngredients()).then(function(ingredients){
		var table = $("<table>").append(newHeader(["ID", "Denumire", "Pret [Lei]", "U/M"]));
			
		for(ing of ingredients) {
			table.append(newIngRow(ing));
		}
		
		$("#ing-table")
			.append(table)
			.append(
				$("<button>")
					.addClass("button")
					.attr({"onclick": "ingredientAdd()"})
					.html("+ Adauga ingredient nou"));
		});	
}

function newIngRow(ing) {
	var saveButton = $("<img>")
		.addClass("inactive")
		.attr({"src": "/img/save.png"});
	var deleteButton = $("<img>")
		.addClass("active")
		.attr({"src": "/img/delete.png"})
		.attr({"onclick": "ingredientDelete("+ing.id+")"});
	
	return newRow([
		ing.id, 
		ing.name, 
		ing.price, 
		ing.unit.name,
		saveButton,
		deleteButton
	], [0, 1, 1, 1, 0, 0])
		.on("input", function() {
			enableSaveIngredient(this.id)});
}	

function enableSaveIngredient(id) {
		$("#" + id + " td:eq(4) > img")
		.attr({"class":"active"})
		.attr({"onclick": "ingredientUpdate("+id+")"});	
}

function disableSaveIngredient(id) {
	$("#" + id + " td:eq(4) > img")
		.attr({"onclick": ""})
		.attr({"class":"inactive"});
}

