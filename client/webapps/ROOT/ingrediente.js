/* ********** INGREDIENT **********/

$(document).ready(function(){
	var args = {
		page: 0,
		size: localStorage.PAGE_SIZE
	}
	ingredientBuildTableAll(args);
});

// http requests

function getIngredients(args) {
	return $.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: DEFAULTS.REST_URL + '/ingredients/allPageable',
		data: { "page": args.page, "size": args.size }
	});
}

function addIngredient(ingredient) {
	return $.ajax({
		method: 'POST',
		xhrFields: { withCredentials: true },
		url: DEFAULTS.REST_URL + '/ingredients',
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify(ingredient),
	});
}

function updateIngredient(ingredient) {
	return $.ajax({
		method: 'PUT',
		xhrFields: { withCredentials: true },
		url: DEFAULTS.REST_URL + '/ingredients/'+ingredient.id,
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify(ingredient)
	});
}

function deleteIngredient(id) {
	return $.ajax({
		method: 'DELETE',
		xhrFields: { withCredentials: true },
		url: DEFAULTS.REST_URL + '/ingredients/' + id
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
		'unit': {'name': $("#" + id + " td:eq(3) > div > div:eq(0)").text()},
		'price': $("#" + id + " td:eq(2)").text()
	}
	$.when(updateIngredient(ingredient)).then(function(data){
		$("#" + id).replaceWith(newIngRow(data));
	});
}

function ingredientUpdateUnit(id, unit) {
	var ingredient = {
		'id': id,
		'unit': {'name': unit}
	};

	$.when(updateIngredient(ingredient)).then(function(data){
		$("#" + data.id).replaceWith(newIngRow(data));
	});
}

function ingredientDelete(id) {
	$.when(deleteIngredient(id)).then(function(){
		$("#" + id).remove();
	});
}

function ingredientBuildTable(args) {
	$.when(args.getFunction(args)).then(function(ingredients){
		args.currentPage = ingredients.pageable.pageNumber;
		args.totalPages = ingredients.totalPages;

		var table = $("<table>")
			.addClass('full')
			.append(newHeader(["ID", "Denumire", "Pret curent [Lei]", "U/M"]));

		for(ing of ingredients.content) {
			table.append(newIngRow(ing));
		}

		$("#ing-table").html("")
			.append(table)
			.append(
				$("<button>")
					.addClass("button")
					.attr({"onclick": "ingredientAdd()"})
					.html("+ Adauga ingredient nou"))
			.append(newPager(args));
		});
}


function newUnitSelectOption(ing_id, new_unit) {
	return $("<a>").text(new_unit).on("click", function() {
		ingredientUpdateUnit(ing_id, new_unit);
	});
}

function newUnitSelector(ing_id, current_unit) {
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
		ddc.append(newUnitSelectOption(ing_id, unit));
	}

	unitSelectorDiv.append(ddc);
	return unitSelectorDiv;
}


function newIngRow(ing) {
	var deleteButton = $("<img>")
		.addClass("active")
		.attr({"src": "/img/delete.png"})
		.attr({"onclick": "ingredientDelete("+ing.id+")"});

	var divUnit = newUnitSelector(ing.id, ing.unit.name);

	var divName = $("<div>").html(ing.name);
	makeContentEditable(divName, ()=>{}, () => ingredientUpdate(ing.id));

	var divPrice = $("<div>").html(ing.price);
	makeContentEditable(divPrice, inputFloats, () => ingredientUpdate(ing.id));

	return newRow([
		ing.id,
		divName,
		divPrice,
		divUnit,
		deleteButton
	], []);
}

function ingredientBuildTableAll(args) {
	args.buildFunction = ingredientBuildTableAll;
	args.getFunction = getIngredients;
	ingredientBuildTable(args);
}
