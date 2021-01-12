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
	var quantity = $("form")[1].quantity.value;
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
			deleteModal("edit-recipe-details-modal");
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
			deleteModal("edit-recipe-details-modal");
		}
	});	
}

function addRecipeDetails(recipeId) {
	var quantity = $("form")[1].quantity.value;
	var ingId = $("form")[1].ingredient.value;
	$.ajax({
		method: 'POST',		
		xhrFields: { withCredentials: true },
		url: REST_URL + '/recipes/'+recipeId+'/details',
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify({
			'ingredient': { 'id': ingId },
			'quantity': quantity
		}),
		success: function(data, status, xhr) {
			recipeDetailsAddRow(data);
			deleteModal("add-recipe-details-modal");
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
	var unit = data.ingredient.unit.name;
	$("#ing_" + id + " td:eq(2)").text(data.quantity  + " " + unit);
}

function recipeDetailsDeleteRow(ingId) {
	$("#ing_" + ingId).remove();
}

function recipeDetailsAddRow(details) {
	click = 'buildEditRecipeDetailsModal(' + details.recipe.id + ', ' +details.ingredient.id+ ', "edit-recipe-details-modal");';
	var row = newRow([details.ingredient.id, details.ingredient.name, details.quantity + " " +details.ingredient.unit.name])
		.attr({"id": "ing_"+details.ingredient.id, "onclick": click});
	dummy = row;
	$("#extra table").append(row);
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
	modal.addExtraBox("Depozit");
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
}

function buildRecipeDetailsTable(ingredients, recipeId) {	
	var table = $("<table>");
	table.append(newHeader(["ID", "Denumire", "Cantitate"]));
		
	for(ing of ingredients) {
		click = 'buildEditRecipeDetailsModal(' + recipeId + ', ' +ing.ingredient.id+ ', "edit-recipe-details-modal");';
		var row = newRow([ing.ingredient.id, ing.ingredient.name, ing.quantity + " " +ing.ingredient.unit.name])
			.attr({"id": "ing_"+ing.ingredient.id})
			.attr({"onclick": click});
		table.append(row);
	}
	return table;
}

function buildEditRecipeDetailsModal(recipeId, ingId, divId) {
	var ingName =  $("#ing_" + ingId + " td:eq(1)").text();
	var ingQuantity = $("#ing_" + ingId + " td:eq(2)").text().split(" ")[0];
	var ingUnit = $("#ing_" + ingId + " td:eq(2)").text().split(" ")[1];
	var title = '#' + ingId + " " + ingName;
	
	modal = new ModalBuilder(title, "edit-recipe-details-modal");
	modal.addLabel("Cantitate [" + ingUnit + "]");
	modal.addField("quantity", ingQuantity);
	modal.addButton("Modifica catitatea", "updateRecipeDetails(" +recipeId +", "+ ingId + ")");
	modal.addButton("Sterge ingredient", "deleteRecipeDetails(" +recipeId +", "+ ingId + ")");
	$("body").append(modal.modal);
}

function buildAddRecipeDetailsModal(recipeId, divId) {
	modal = new ModalBuilder("Adauga ingredient", "add-recipe-details-modal");
	modal.addLabel("Ingredient");
	modal.addSelect("ingredient");
	modal.addLabel("Cantitate")
	modal.addField("quantity");
	modal.addButton("Adauga ingredient", "addRecipeDetails(" + recipeId + ")");	
	$("body").append(modal.modal);
	
	$.ajax({
		method: 'GET',
		xhrFields: { withCredentials:true },
		url: REST_URL + '/ingredients',
		dataType: 'json',
		success: function(data, status, xhr) {
			buildAddRecipeDetailsSelect(data);
		},
		error: function() {
			console.log("RECIPE DETAILS ERROR")
		}
	});
}

function buildAddRecipeDetailsSelect(ingredients) {
	for (ing of ingredients) {
		option = newOption(ing.id, ing.name + " [" +ing.unit.name+"]");
		$("select").append(option);
	}
}
