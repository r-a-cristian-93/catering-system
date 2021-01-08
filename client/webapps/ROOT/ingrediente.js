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
			deleteModal();
		}
	});
}

function updateIngredient(id) {
	var name = $("form")[0].name.value;
	var price = $("form")[0].price.value.split(" ")[0];
	var unit = $("form")[0].unit.value;;
	$.ajax({
		method: 'PUT',		
		xhrFields: { withCredentials: true },
		url: REST_URL + '/ingredients/'+id,
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify({
			'name': name,
			'price': price,
			'unit': {'name': unit}
		}),
		success: function(data, status, xhr) {
			ingTabRefreshRow(data);
			deleteModal();
		}
	});	
}	

function addNewIngredient() {
	var name = $("form")[0].name.value;
	var price = $("form")[0].price.value.split(" ")[0];
	var unit = $("form")[0].unit.value;;
	$.ajax({
		method: 'POST',		
		xhrFields: { withCredentials: true },
		url: REST_URL + '/ingredients',
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify({
			'name': name,
			'price': price,
			'unit': {'name': unit}
		}),
		success: function(data, status, xhr) {
			ingTabAddRow(data);
			deleteModal();
		}
	});
}

function ingTabRefreshRow(data) {
	var id = data.id;
	$("#" + id + " td:eq(1)").text(data.name);
	$("#" + id + " td:eq(2)").text(data.price + ' Lei');
	$("#" + id + " td:eq(3)").text(data.unit.name);
}

function ingTabDeleteRow(id) {
	$("#" + id).remove();
}

function ingTabAddRow(ing) {
	click = 'buildEditIngModal("' +ing.id+ '");';
	$("table").append(newRow([ing.id, ing.name, ing.price + " Lei", ing.unit.name]).attr({"onclick": click}));
}	

function buildIngTable(data) {	
	var table = $("<table>");
	table.append(newHeader(["ID", "Denumire", "Pret", "Unitate"]));
		
	for(ing of data) {
		click = 'buildEditIngModal("' +ing.id+ '");';
		var row = newRow([ing.id, ing.name, ing.price + " Lei", ing.unit.name]).attr({"onclick": click});
		table.append(row);
	}
	
	$("#ing-table").append($("<h2>").text("Tabel ingrediente"));
	$("#ing-table").append(
		$("<button>")
			.addClass("button fr")
			.attr({"onclick": "buildAddIngModal()"})
			.html("+ Adauga ingredient nou"));			
	$("#ing-table").append(table);			
}

function buildIngModal(id) {
	var denumire = $("#" + id + " td:eq(1)").text();
	var pret = $("#" + id + " td:eq(2)").text().split(" ")[0];
	var unitate = $("#" + id + " td:eq(3)").text();
	var title = '#' + id + " " + denumire;
	
	var modal = new ModalBuilder(title);
	modal.addLabel("Denumire:");
	modal.addField("name", denumire);
	modal.addLabel("Pret");
	modal.addField("price", pret);
	modal.addLabel("Unitate");
	modal.addField("unit", unitate);
	return modal;
}

function buildEditIngModal(id) {
	modal = buildIngModal(id);	
	modal.addButton("Modifica ingredient", "updateIngredient("+id+")");
	modal.addButton("Sterge ingredient", "deleteIngredient("+id+")");
	$("body").append(modal.modal);
}

function buildAddIngModal() {
	modal = buildIngModal();
	modal.title.text("Ingredient nou");
	modal.addButton("Adauga ingredient", "addNewIngredient()");
	$("body").append(modal.modal);
}
