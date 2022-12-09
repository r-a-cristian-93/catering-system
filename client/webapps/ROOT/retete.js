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
		"unit": { "name": "g" },
		"ingCost": 0
	};

	$.when(addRecipe(recipe)).then(function(data){
		$("#table > table").append(newRecipeRow(data));
	});
}

function recipeUpdate(id) {
	var recipe = {
		'id': id,
		'name': $("#" + id + " td:eq(1) div").text(),
		'quantity': $("#" + id + " td:eq(3) div").text(),
		'unit': {'name': $("#" + id + " td:eq(4) > div > div:eq(0)").text()}
	};

	$.when(updateRecipe(recipe)).then(function(data){
		$("#" + data.id).replaceWith(newRecipeRow(data));
	});
}

function recipeUpdateUnit(id, unit) {
	var recipe = {
		'id': id,
		'unit': {'name': unit}
	};

	$.when(updateRecipe(recipe)).then(function(data){
		$("#" + data.id).replaceWith(newRecipeRow(data));
	});
}

function recipeUpdateCategory(id, category) {
	var recipe = {
		'id': id,
		'category': {'name': category}
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

function newUnitSelectOption(recipe_id, new_unit) {
	return $("<a>").text(new_unit).on("click", function() {
		recipeUpdateUnit(recipe_id, new_unit);
	});
}

function newUnitSelector(recipe_id, current_unit) {
	var unitSelectorDiv =  $("<div>").addClass("select-list-container")
		.append($("<div>").addClass("select-list-current").text(current_unit))
		.on("click", function(e){
			this.classList.add("dropdown");
		})
		.on("mouseleave", function(e){
			this.classList.remove("dropdown");
		});

	var ddc = newDivDDC([]);
	var unitsArray = JSON.parse(localStorage.getItem("UNITS"));
	for (unit of unitsArray) {
		ddc.append(newUnitSelectOption(recipe_id, unit));
	}

	unitSelectorDiv.append(ddc);
	return unitSelectorDiv;
}

function newCategorySelectOption(recipe_id, new_category) {
	return $("<a>").text(new_category).on("click", function() {
		recipeUpdateCategory(recipe_id, new_category);
	});
}

function newCategorySelector(recipe_id, current_category) {
	var categorySelectorDiv =  $("<div>").addClass("select-list-container")
		.append($("<div>").addClass("select-list-current").text(current_category))
		.on("click", function(e){
			this.classList.add("dropdown");
		})
		.on("mouseleave", function(e){
			this.classList.remove("dropdown");
		});

	var ddc = newDivDDC([]);
	var categoriesArray = JSON.parse(localStorage.getItem("CATEGORIES"));
	for (category of categoriesArray) {
		ddc.append(newCategorySelectOption(recipe_id, category));
	}

	categorySelectorDiv.append(ddc);
	return categorySelectorDiv;
}

function newRecipeRow(recipe) {
	var editButton = $("<img>")
		.addClass("active")
		.attr({"src": "/img/edit.png"})
		.attr({"onclick": "buildRecipeEditModal("+recipe.id+")"});
	var deleteButton = $("<img>")
		.addClass("active")
		.attr({"src": "/img/delete.png"})
		.attr({"onclick": "recipeDelete("+recipe.id+")"});
	var divUnit = newUnitSelector(recipe.id, recipe.unit.name);
	var divCategory = newCategorySelector(recipe.id, recipe.category.name);

	var divQuantity = $("<div>").html(recipe.quantity);
	makeContentEditable(divQuantity, inputIntegers, () => recipeUpdate(recipe.id));

	var divRecipeName = $("<div>").html(recipe.name);
	makeContentEditable(divRecipeName, ()=>{}, () => recipeUpdate(recipe.id));

	return newRow([
		recipe.id,
		divRecipeName,
		divCategory,
		divQuantity,
		divUnit,
		recipe.ingCost.toFixed(2) + " Lei",
		editButton,
		deleteButton
	], []);
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
		'quantity': $("#det_" + ingId + " td:eq(2) div").text()
	};
	$.when(updateRecipeDetails(details)).then(function(data){
		$("#det_" + ingId).replaceWith(newRecipeDetailsRow(data));
		$.when(getRecipe(recipeId)).then(function(data) {
			$("#det_total th:eq(5)").html(data.ingCost + " Lei");
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
		.append(newHeader(["ID", "Denumire", "Cantitate", "Cost/UM", "Cost total"], [0, 0, 2, 3]));

	for(ing of ingredients) {
		table.append(newRecipeDetailsRow(ing));
	}

	table.append(newHeader([,,,,"Total:",ingredients[0].recipe.ingCost.toFixed(2) + " Lei"],[,,,,3]).attr({"id":"det_total"}));

	return table;
}

function newRecipeDetailsRow(det) {
	var deleteButton = $("<img>")
		.addClass("active")
		.attr({"src": "/img/delete.png"})
		.attr({"onclick": "recipeDetailsDelete("+det.recipe.id+", "+det.ingredient.id+")"});

	var divQuantity = $("<div>").html(det.quantity);
	makeContentEditable(divQuantity, inputFloats, () => recipeDetailsUpdate(det.recipe.id, det.ingredient.id));

	return newRow([
		det.ingredient.id,
		det.ingredient.name,
		divQuantity,
		det.ingredient.unit.name,
		det.ingredient.price + " Lei",
		"/",
		det.ingredient.unit.name,
		(det.ingredient.price * det.quantity).toFixed(2) + " Lei",
		deleteButton
	], [0, 0, 0, 0, 0, 0],[],[,,,,["align-right", "space-right-0"],,["align-left", "space-left-0"],])
		.attr({"id": "det_"+det.ingredient.id});
}

function newStaticIngTable(data) {
	var table = $("<table>")
		.addClass('full')
		.append(newHeader(["ID", "Denumire", "Cost/UM"],[,,3],[,,["align-center"]]));

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
		ing.price.toFixed(2) + " Lei",
		"/",
		ing.unit.name
	], [0, 0], [],[,,["align-right", "space-right-0"],,["align-left", "space-left-0"]])
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
