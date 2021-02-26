/* *************** RECIPE ****************/

$(document).ready(function(){
	var args = {
		page: 0,
		size: localStorage.PAGE_SIZE
	}
	recipeBuildTableAll(args);
});

// http requests

function getRecipes(args) {
	return $.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: DEFAULTS.REST_URL + '/recipes/allPageable',
		data: { "page": args.page, "size": args.size }
	});	
}

function getRecipe(id) {
	return 	$.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		url: DEFAULTS.REST_URL + '/recipes/'+id		
	});	
}

function deleteRecipe(id) {
	return $.ajax({
		method: 'DELETE',
		xhrFields: { withCredentials: true },
		url: DEFAULTS.REST_URL + '/recipes/' + id,
	});
}

function updateRecipe(recipe) {
	return $.ajax({
		method: 'PUT',		
		xhrFields: { withCredentials: true },
		url: DEFAULTS.REST_URL + '/recipes/'+recipe.id,
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify(recipe)
	});	
}

function addRecipe(recipe) {
	return $.ajax({
		method: 'POST',		
		xhrFields: { withCredentials: true },
		url: DEFAULTS.REST_URL + '/recipes',
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify(recipe),
	});
}

// ui operations

function recipeAdd(){	
	var recipe = {
		"name": "[reteta noua]",
		"quantity": 0,
		"unit": { "name": "g" }
	};	
	
	$.when(addRecipe(recipe)).then(function(data){
		$("#table > table").append(newRecipeRow(data));	
	});	
}		

function recipeUpdate(id) {	
	var recipe = {
		'id': id,
		'name': $("#" + id + " td:eq(1)").text(),
		'quantity': $("#" + id + " td:eq(3)").text(),
		'unit': {'name': $("#" + id + " td:eq(4)").text()}
	};
	
	$.when(updateRecipe(recipe)).then(function(data){
		$("#" + data.id).replaceWith(newRecipeRow(data));
	});		
}

function recipeDelete(id) {
	$.when(deleteRecipe(id)).then(function(){
		$("#" + id).remove();
	});
}

function recipeBuildTable(args) {
	$.when(args.getFunction(args)).then(function(recipes) {
		args.currentPage = recipes.pageable.pageNumber;
		args.totalPages = recipes.totalPages;
		
		var table = $("<table>")
			.addClass('full')
			.append(newHeader(["ID", "Denumire", "Categorie", "Portie", "Cost ingrediente"], [0, 0, 0, 2, 0]));
			
		for(recipe of recipes.content) {
			table.append(newRecipeRow(recipe));
		}
		
		$("#table").html("")
			.append(table)
			.append(
				$("<button>")
					.addClass("button")
					.attr({"onclick": "recipeAdd()"})
					.html("+ Reteta noua"))
			.append(newPager(args));
	});			
}

function newRecipeRow(recipe) {		
	var saveButton = $("<img>")
		.addClass("inactive")
		.attr({"src": "/img/save.png"});
	var editButton = $("<img>")
		.addClass("active")
		.attr({"src": "/img/edit.png"})
		.attr({"onclick": "buildRecipeEditModal("+recipe.id+")"});		
	var deleteButton = $("<img>")
		.addClass("active")
		.attr({"src": "/img/delete.png"})
		.attr({"onclick": "recipeDelete("+recipe.id+")"});
	
	return newRow([
		recipe.id, 
		recipe.name, 
		"recipe.category.name", 
		recipe.quantity,
		recipe.unit.name, 
		recipe.ingCost.toFixed(2) + " Lei",
		saveButton,
		editButton,
		deleteButton
	], [0, 1, 1, 1, 1, 0, 0])
		.on("input", function() {				
			enableSaveRecipe(this.id)});
}

function enableSaveRecipe(id) {
	$("#" + id + " td:eq(6) > img")
		.attr({"class":"active"})
		.attr({"onclick": "recipeUpdate("+id+")"});	
}

function disableSaveRecipe(id) {
	$("#" + id + " td:eq(6) > img")
		.attr({"onclick": ""})
		.attr({"class":"inactive"});
}


/* ************* RECIPE DETAILS *************/

// http requests

function getRecipeDetails(recipeId) {
	return $.ajax({
		method: 'GET',
		xhrFields: { withCredentials:true },
		url: DEFAULTS.REST_URL + '/recipes/'+recipeId+'/details',
		dataType: 'json'
	});
}
function getIngredients() {
	return $.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		url: DEFAULTS.REST_URL + '/ingredients'
	});
}

function updateRecipeDetails(details) {
	return $.ajax({
		method: 'PUT',		
		xhrFields: { withCredentials: true },
		url: DEFAULTS.REST_URL + '/recipes/'+details.recipe.id+'/details',
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify(details)
	});	
}	

function deleteRecipeDetails(details) {
	return $.ajax({
		method: 'DELETE',		
		xhrFields: { withCredentials: true },
		url: DEFAULTS.REST_URL + '/recipes/'+details.recipe.id+'/details',
		contentType: "application/json",
		data: JSON.stringify(details),
	});	
}

function addRecipeDetails(details) {
	return $.ajax({
		method: 'POST',		
		xhrFields: { withCredentials: true },
		url: DEFAULTS.REST_URL + '/recipes/'+details.recipe.id+'/details',
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify(details)
	});	
}

// ui operations

function recipeDetailsAdd(recipeId, ingId) {
	var details = {
		'recipe' : { 'id': recipeId },
		'ingredient': { 'id': ingId },
		'quantity': 0
	};
	$.when(addRecipeDetails(details)).then(function(data){
		$("#recipe-details-table").append(newRecipeDetailsRow(data));
		$.when(getRecipe(recipeId)).then(function(data) {
			$("#" + data.id).replaceWith(newRecipeRow(data));	
		});
	});
}

function recipeDetailsUpdate(recipeId, ingId) {	
	var details = {
		'recipe': { 'id': recipeId},
		'ingredient': { 'id': ingId },
		'quantity': $("#det_" + ingId + " td:eq(2)").text()
	};
	$.when(updateRecipeDetails(details)).then(function(data){
		$("#det_" + ingId).replaceWith(newRecipeDetailsRow(data));
		$.when(getRecipe(recipeId)).then(function(data) {
			$("#" + data.id).replaceWith(newRecipeRow(data));	
		});
	});	
}

function recipeDetailsDelete(recipeId, ingId) {
	var details = {
		'recipe': { 'id': recipeId},
		'ingredient': { 'id': ingId },
	};
	$.when(deleteRecipeDetails(details)).then(function() {
		$("#det_" + ingId).remove();
		$.when(getRecipe(recipeId)).then(function(data) {
			$("#" + data.id).replaceWith(newRecipeRow(data));	
		});
	});
}

function buildRecipeEditModal(id) {
	var name = $("#" + id + " td:eq(1)").text();
	var title = '#' + id + " " + name;
	
	modal = new ModalBuilder(title, "edit-recipe-modal");				
	modal.addExtraBox("Ingrediente disponibile");
	$("body").append(modal.modal);
	
	$.when(getRecipeDetails(id), getIngredients()).then(function(recipeDetails, ingredients) {
		modal.content.append(recipeDetailsBuildTable(recipeDetails[0], id));
		$("#extra-0").append(newStaticIngTable(ingredients[0]));
	});
}

function recipeDetailsBuildTable(ingredients, recipeId) {	
	var table = $("<table>")
		.addClass('full')
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
		.attr({"onclick": "recipeDetailsDelete("+det.recipe.id+", "+det.ingredient.id+")"});
		
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
			enableSaveDetails(recipeId, this.id.split("_")[1])
		});
}

function enableSaveDetails(recipeId, ingId) {
	$("#det_"+ingId + " td:eq(4) > img")
		.attr({"class":"active"})
		.attr({"onclick": "recipeDetailsUpdate("+recipeId+", "+ingId+")"});	
}

function disableSaveDetails(id) {
	$("#det_" + id + " td:eq(4) > img")
		.attr({"onclick": ""})
		.attr({"class":"inactive"});
}

function newStaticIngTable(data) {
	var table = $("<table>")
		.addClass('full')
		.append(newHeader(["ID", "Denumire"]));
		
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
			var recipeId = $(".modal-title").text().split(" ")[0].substring(1);
			var ingId = this.id
			recipeDetailsAdd(recipeId, ingId);
		});
}

function recipeBuildTableAll(args) {
	args.buildFunction = recipeBuildTableAll;
	args.getFunction = getRecipes;
	recipeBuildTable(args);
}
	
