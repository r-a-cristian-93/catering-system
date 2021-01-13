var dummy;

$(document).ready(function(){
	$.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		url: REST_URL + '/recipes',
		success: function(data, status, xhr) {
			buildRecipesTable(data);
		},
		error: function() {
			console.log("RECIPES ERROR");
		}
	});	
});

function deleteRecipe(id) {
	$.ajax({
		method: 'DELETE',
		xhrFields: { withCredentials: true },
		url: REST_URL + '/recipes/' + id,
		success: function(data, status, xhr) {
			recipesTabDeleteRow(id);
			deleteModal("edit-recipe-modal");
		}
	});
}

function updateRecipe(id) {
	var name = $("#" + id + " td:eq(1)").text();
	var category = $("#" + id + " td:eq(2)").text();
	var quantity = $("#" + id + " td:eq(3)").text().split(" ")[0];
	var unit = $("#" + id + " td:eq(3)").text().split(" ")[1];

	$.ajax({
		method: 'PUT',		
		xhrFields: { withCredentials: true },
		url: REST_URL + '/recipes/'+id,
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify({
			'name': name,
			'quantity': quantity,
			'unit': {'name': unit}
		}),
		success: function(data, status, xhr) {
			recipesTabRefreshRow(data);
			disableSaveRecipe(data.id);
		}
	});	
}	

function addNewRecipe() {
	var recipe = {
		"name": "[reteta noua]",
		"quantity": 0,
		"unit": { "name": "g" }
	};	
	$.ajax({
		method: 'POST',		
		xhrFields: { withCredentials: true },
		url: REST_URL + '/recipes',
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify(recipe),
		success: function(data, status, xhr) {
			recipesTabAddRow(data);
		}
	});
}

function updateRecipeDetails(recipeId, ingId) {
	var quantity = $("#det_" + ingId + " td:eq(2)").text().split(" ")[0];
	$.ajax({
		method: 'PUT',		
		xhrFields: { withCredentials: true },
		url: REST_URL + '/recipes/'+recipeId+'/details',
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify({
			'ingredient': { 'id': ingId },
			'quantity': quantity
		}),
		success: function(data, status, xhr) {
			recipeDetailsRefreshRow(data);
			disableSaveDetails(data.ingredient.id);
		}
	});	
}	

function deleteRecipeDetails(recipeId, ingId) {

	$.ajax({
		method: 'DELETE',		
		xhrFields: { withCredentials: true },
		url: REST_URL + '/recipes/'+recipeId+'/details',
		contentType: "application/json",
		data: JSON.stringify({
			'ingredient': { 'id': ingId }
		}),
		success: function(data, status, xhr) {
			recipeDetailsDeleteRow(ingId);
		}
	});	
}

function addRecipeDetails(recipeId, ingId) {
	var details = {
		'ingredient': { 'id': ingId },
		'quantity': 0
	};
	$.ajax({
		method: 'POST',		
		xhrFields: { withCredentials: true },
		url: REST_URL + '/recipes/'+recipeId+'/details',
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify(details),
		success: function(data, status, xhr) {
			recipeDetailsAddRow(data);
		}
	});	
}

function recipesTabAddRow(data){
	$("#table > table").append(newRecipeRow(data));
}

function recipesTabDeleteRow(id) {
	$("#" + id).remove();
}

function recipesTabRefreshRow(data) {
	var id = data.id;
	$("#" + id + " td:eq(1)").text(data.name);
	//$("#" + id + " td:eq(2)").text(data.name);
	$("#" + id + " td:eq(3)").text(data.quantity + " " + data.unit.name);
}

function recipeDetailsRefreshRow(data) {	
	var id = data.ingredient.id;
	$("#det_" + id + " td:eq(2)").text(data.quantity);
}

function recipeDetailsDeleteRow(ingId) {
	$("#det_" + ingId).remove();
}

function recipeDetailsAddRow(details) {
	$("#recipe-details-table").append(newRecipeDetailsRow(details));
}

function newRecipeRow(recipe) {		
	var saveButton = $("<img>")
		.addClass("inactive")
		.attr({"src": "/img/save.png"});
	var editButton = $("<img>")
		.addClass("active")
		.attr({"src": "/img/edit.png"})
		.attr({"onclick": "buildEditRecipeModal("+recipe.id+")"});		
	var deleteButton = $("<img>")
		.addClass("active")
		.attr({"src": "/img/delete.png"})
		.attr({"onclick": "deleteRecipe("+recipe.id+")"});
	
	return newRow([
		recipe.id, 
		recipe.name, 
		"recipe.category.name", 
		recipe.quantity + " " + recipe.unit.name + "", 
		saveButton,
		editButton,
		deleteButton
	], [0, 1, 1, 1, 0, 0])
		.on("input", function() {				
			activateSaveRecipe(this.id)});
}	

function buildRecipesTable(data) {
	var table = $("<table>");
	table.append(newHeader(["ID", "Denumire", "Categorie", "Portie"]));
		
	for(recipe of data) {
		table.append(newRecipeRow(recipe));
	}
	
	$("#table").append($("<h2>").text("Tabel retete"));
				
	$("#table").append(table);
	$("#table").append(
		$("<button>")
			.addClass("button")
			.attr({"onclick": "addNewRecipe()"})
			.html("+ Reteta noua"));			
}

function activateSaveRecipe(id) {
	$("#" + id + " td:eq(4) > img")
		.attr({"class":"active"})
		.attr({"onclick": "updateRecipe("+id+")"});	
}

function disableSaveRecipe(id) {
	$("#" + id + " td:eq(4) > img")
		.attr({"onclick": ""})
		.attr({"class":"inactive"});
}

function buildEditRecipeModal(id) {
	var name = $("#" + id + " td:eq(1)").text();
	var title = '#' + id + " " + name;
	
	modal = new ModalBuilder(title, "edit-recipe-modal");				
	modal.addExtraBox("Ingrediente disponibile");
	$("body").append(modal.modal);
	
	$.ajax({
		method: 'GET',
		xhrFields: { withCredentials:true },
		url: REST_URL + '/recipes/'+id+'/details',
		dataType: 'json',
		success: function(data, status, xhr) {
			modal.content.append(buildRecipeDetailsTable(data, id));
		},
		error: function() {
			console.log("RECIPE DETAILS ERROR")
		}
	});
	
	$.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		url: REST_URL + '/ingredients',
		success: function(data, status, xhr) {
			$("#extra-0").append(newStaticIngTable(data));
		},
		error: function() {
			console.log("ING ERROR");
		}
	});
}

function activateSaveDetails(recipeId, ingId) {
	console.log(recipeId + "  " + ingId);
	$("#det_"+ingId + " td:eq(4) > img")
		.attr({"class":"active"})
		.attr({"onclick": "updateRecipeDetails("+recipeId+", "+ingId+")"});	
}

function disableSaveDetails(id) {
	$("#det_" + id + " td:eq(4) > img")
		.attr({"onclick": ""})
		.attr({"class":"inactive"});
}

function newStaticIngTable(data) {
	var table = $("<table>");
	table.append(newHeader(["ID", "Denumire"]));
		
	for(ing of data) {
		click = 'buildEditIngModal("' +ing.id+ '");';
		var row = newStaticIngRow(ing);
		table.append(row);
	}	
	return table;
}

function newStaticIngRow(ing) {	
	return newRow([
		ing.id, 
		ing.name, 
	], [0, 0])
		.on("dblclick", function() {
			addRecipeDetails($(".modal-title").text().split(" ")[0].substring(1), this.id);
		});
}	

function buildRecipeDetailsTable(ingredients, recipeId) {	
	var table = $("<table>");
	table
		.attr({"id": "recipe-details-table"})
		.append(newHeader(["ID", "Denumire", "Cantitate"], [0, 0, 2, 0]));
		
	for(ing of ingredients) {		
		table.append(newRecipeDetailsRow(ing));
	}
	return table;
}

function newRecipeDetailsRow(det) {
	var saveButton = $("<img>")
		.addClass("inactive")
		.attr({"src": "/img/save.png"});	
	var deleteButton = $("<img>")
		.addClass("active")
		.attr({"src": "/img/delete.png"})
		.attr({"onclick": "deleteRecipeDetails("+det.recipe.id+", "+det.ingredient.id+")"});
		
	return newRow([
		det.ingredient.id, 
		det.ingredient.name, 
		det.quantity,
		det.ingredient.unit.name,
		saveButton,
		deleteButton
	], [0, 0, 1, 0, 0, 0])
		.attr({"id": "det_"+det.ingredient.id})
		.on("input", function() {
			recipeId = $(".modal-title").text().split(" ")[0].substring(1);
			activateSaveDetails(recipeId, this.id.split("_")[1])
		});
}
