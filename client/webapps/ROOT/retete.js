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
	var name = $("form")[0].name.value;
	var category = $("form")[0].category.value;
	var quantity = $("form")[0].quantity.value;;
	var unit = $("form")[0].unit.value;
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
			recipeTabRefreshRow(data);
			deleteModal("edit-recipe-modal");
		}
	});	
}	

function addNewRecipe() {
	var name = $("form")[0].name.value;
	var category = $("form")[0].category.value;
	var quantity = $("form")[0].quantity.value;;
	var unit = $("form")[0].unit.value;
	$.ajax({
		method: 'POST',		
		xhrFields: { withCredentials: true },
		url: REST_URL + '/recipes',
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify({
			'name': name,
			'quantity': quantity,
			'unit': {'name': unit}
		}),
		success: function(data, status, xhr) {
			console.log(data);
			recipeTabAddRow(data);
			deleteModal("add-recipe-modal");
		}
	});
}

function recipeTabRefreshRow(data) {
	var id = data.id;
	$("#" + id + " td:eq(1)").text(data.name);
	//$("#" + id + " td:eq(2)").text(data.name);
	$("#" + id + " td:eq(3)").text(data.quantity + " " + data.unit.name);
}

function recipesTabDeleteRow(id) {
	$("#" + id).remove();
}

function recipeTabAddRow(recipe) {
	click = 'buildEditRecipeModal("' +recipe.id+ '");';
	$("table").append(newRow([recipe.id, recipe.name, "recipe.category.name", recipe.quantity + " " + recipe.unit.name + ""]).attr({"onclick": click}));
}	

function buildRecipesTable(data) {
	var table = $("<table>");
	table.append(newHeader(["ID", "Denumire", "Categorie", "Portie"]));
		
	for(recipe of data) {
		click = 'buildEditRecipeModal("' +recipe.id+ '");';
		var row = newRow([recipe.id, recipe.name, "recipe.category.name", recipe.quantity + " " + recipe.unit.name + ""]).attr({"onclick": click});
		table.append(row);
	}
	
	$("#table").append($("<h2>").text("Tabel retete"));
	$("#table").append(
		$("<button>")
			.addClass("button fr")
			.attr({"onclick": "buildAddRecipeModal()"})
			.html("+ Reteta noua"));			
	$("#table").append(table);			
}

function buildRecipeModal(id, divId) {
	var name = $("#" + id + " td:eq(1)").text();
	var category = $("#" + id + " td:eq(2)").text();
	var quantity = $("#" + id + " td:eq(3)").text().split(" ")[0];
	var unit = $("#" + id + " td:eq(3)").text().split(" ")[1];
	var title = '#' + id + " " + name;
	
	var modal = new ModalBuilder(title, divId);
	modal.addLabel("Denumire:");
	modal.addField("name", name);
	modal.addLabel("Categorie:");
	modal.addField("category", category);
	modal.addLabel("Cantitate:");
	modal.addField("quantity", quantity);
	modal.addLabel("U/M:");
	modal.addField("unit", unit);
	return modal;
}

function buildEditRecipeModal(id) {
	modal = buildRecipeModal(id, "edit-recipe-modal");	
	modal.addButton("Modifica reteta", "updateRecipe("+id+")");
	modal.addButton("Sterge reteta", "deleteRecipe("+id+")");
	modal.addExtraBox("Ingrediente");
	$("body").append(modal.modal);
	
	$.ajax({
		method: 'GET',
		xhrFields: { withCredentials:true },
		url: REST_URL + '/recipes/'+id+'/details',
		dataType: 'json',
		success: function(data, status, xhr) {
						console.log(data);
			buildIngListTable(data);
		},
		error: function() {
			console.log("RECIPE DETAILS ERROR")
		}
	});
}

function buildAddRecipeModal() {
	modal = buildRecipeModal(0,"add-recipe-modal");
	modal.title.text("Reteta noua");
	modal.addButton("Adauga reteta", "addNewRecipe()");
	$("body").append(modal.modal);
}

function buildIngListTable(ingredients) {	
	var table = $("<table>");
	table.append(newHeader(["ID", "Denumire", "Cantitate"]));
		
	for(ing of ingredients) {
		click = 'buildEditIngModal("' +ing.id+ '");';
		var row = newRow([ing.ingredient.id, ing.ingredient.name, ing.quantity + " " +ing.ingredient.unit.name]);
		table.append(row);
	}
	
	$("#extra").html(table);
}

