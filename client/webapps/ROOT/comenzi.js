$(document).ready(function() {
	orderBuildTable();
});

// http requests

function getOrder(id) {
	return $.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: REST_URL + '/orders/'+id,
	});	
}

function getOrders() {
	return $.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: REST_URL + '/orders',
	});	
}

function getStatus() {
	return $.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: REST_URL + '/status'		
	});		
}

function getClients() {
	return $.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: REST_URL + '/clients'
	});
}	

function updateOrder(id, info) {
	return $.ajax({
		method: 'PUT',
		xhrFields: { withCredentials:true },
		url: REST_URL + '/orders/'+id,
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(info)
	});
}	

function addOrder(order){
	return $.ajax({
		method: 'POST',
		xhrFields: { withCredentials: true },
		url: REST_URL + '/orders',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(order)
	});	
}

function deleteOrder(id) {
	return $.ajax({
		method: 'DELETE',
		xhrFields: { withCredentials:true },
		url: REST_URL + '/orders/'+id
	});
}

// ui operations

function orderAdd() {
	var emptyOrder = {"client": {"id": 0}, "status": {"name": "preluata"}};
	$.when(addOrder(emptyOrder)).then(function(data){
		$("#order-table > table").append(newOrderRow(data));
	});
}

function orderUpdateStatus(id, status) {
	status = {"status": {"name": status}};
	$.when(updateOrder(id, status)).then(function(order) {
		$("#"+order.id).replaceWith(newOrderRow(order));
		$("#edit-order-status-modal").remove();		
	});	
}

function orderUpdateClient(id, client) {
	info = {"client": {"name": client}};
	$.when(updateOrder(id, info)).then(function(order) {
		$("#"+order.id).replaceWith(newOrderRow(order));
		$("#edit-order-client-modal").remove();		
	});	
}

function orderDelete(id) {
	$.when(deleteOrder(id)).then(function(){
		$("#"+id).remove();
	});
}

function orderBuildTable() {
	$.when(getOrders()).then(function(ordersList) {
		var table = $("<table>").append(newHeader(["ID", "Stare", "Client", "Adresa", "Cost ingrediente"]));	
		for(order of ordersList) {
			table.append(newOrderRow(order));
		}			
		$("#order-table")
			.append(table)
			.append(newButton("+ Adauga comanda noua", "orderAdd()"))
	});
}	

function newOrderRow(order) {	
	var editButton = $("<img>")
		.addClass("active")
		.attr({"src": "/img/edit.png"})
		.attr({"onclick": "buildOrderDetailsEditModal("+order.id+")"});
	var deleteButton = $("<img>")
		.addClass("active")
		.attr({"src": "/img/delete.png"})
		.attr({"onclick": "orderDelete("+order.id+")"});
	return newRow([
		order.id, 
		order.status.name, 
		order.client.name,
		order.client.address,
		order.ingCost.toFixed(2) + ' Lei',
		editButton,
		deleteButton
		],[],[
			null,
			{"onclick": "buildOrderEditStatusModal("+order.id+")"},
			{"onclick": "buildOrderEditClientModal("+order.id+")"}
		]).addClass(order.status.name.split(" ").join("-"));
}

function buildOrderEditStatusModal(id) {
	var modal = new ModalBuilder("#" + id+ " Modifica starea comenzii", "edit-order-status-modal");
	
	$.when(getStatus()).then(function(statusList) {
		for(st of statusList) {
			modal.content.append(newStatusOption(id, st.name));
		}				
		$("body").append(modal.modal);		
	});
}

function buildOrderEditClientModal(id) {
	var modal = new ModalBuilder("#" + id+ " Modifica client", "edit-order-client-modal");
	
	$.when(getClients()).then(function(clientsList) {
		for(client of clientsList) {
			modal.content.append(newClientOption(id, client.name));
		}				
		$("body").append(modal.modal);		
	});
}

function newStatusOption(orderId, status) {	
	return $("<div>").addClass("modal-option").text(status)
		.attr({"onclick": 'orderUpdateStatus('+orderId+', "'+status+'");'});
}

function newClientOption(orderId, client) {	
	return $("<div>").addClass("modal-option").text(client)
		.attr({"onclick": 'orderUpdateClient('+orderId+', "'+client+'");'});
}


/* ******************* ORDERS DETAILS ******************* */

// http requests

function getOrderDetails(orderId) {
	return $.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: REST_URL + '/orders/'+orderId+'/details'
	});
}

function updateOrderDetails(details) {
	return $.ajax({
		method: 'PUT',
		xhrFields: { withCredentials: true },
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(details),
		url: REST_URL + '/orders/'+details.order.id+'/details'
	});
}

function addOrderDetails(details) {
	return $.ajax({
		method: 'POST',
		xhrFields: { withCredentials: true },
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(details),
		url: REST_URL + '/orders/'+details.order.id+'/details'
	});
}

function deleteOrderDetails(details) {
	return $.ajax({
		method: 'DELETE',
		xhrFields: { withCredentials: true },
		contentType: 'application/json',
		data: JSON.stringify(details),
		url: REST_URL + '/orders/'+details.order.id+'/details'
	});
}

function getRecipes() {
	return $.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: REST_URL + '/recipes'
	});
}

// ui operations

function buildOrderDetailsEditModal(id) {
	$.when(getOrderDetails(id), getRecipes()).then(function(details, recipes){			
		var recipesBox = new ExtraBox("Retete disponibile", 0);	
		recipesBox.content.append(newStaticRecipeTable(recipes[0]));
		
		var modal = new ModalBuilder("#" + id+ " Modifica comanda", "edit-order-details-modal");
		modal.content.append(newOrderDetailsTable(details[0]));
		modal.modalContainer.append(recipesBox.box);
		$("body").append(modal.modal);
	});
}

function orderDetailsUpdate(orderId, recipeId) {
	var details = {
		"order": {"id": orderId},
		"recipe": {"id": recipeId}, 
		"servings": $("#det_" + recipeId + " td:eq(2)").text()};
	$.when(updateOrderDetails(details)).then(function(data) {
		$("#det_" + data.recipe.id).replaceWith(newOrderDetailRow(data));
		$.when(getOrder(orderId)).then(function(data) {
			$("#"+data.id).replaceWith(newOrderRow(data));
		});
	});
}

function orderDetailsDelete(orderId, recipeId) {
	var details = {
		"order": {"id": orderId},
		"recipe": {"id": recipeId}
	};
	$.when(deleteOrderDetails(details)).then(function() {
		$("#det_" + details.recipe.id).remove();	
		$.when(getOrder(orderId)).then(function(data) {
			$("#"+data.id).replaceWith(newOrderRow(data));
		});
	});
}

function orderDetailsAdd(orderId, recipeId) {
	var details = {
		"order": {"id": orderId},
		"recipe": {"id": recipeId},
		"servings": 0
	};
	$.when(addOrderDetails(details)).then(function(data) {
		$("#order-details-table").append(newOrderDetailRow(data));	
	});
}

function newOrderDetailsTable(details) {
	var table = $("<table>")
		.attr({"id": "order-details-table"})
		.append(newHeader(["ID", "Reteta", "Portii"],[]));	
	for(detail of details) {
		table.append(newOrderDetailRow(detail));
	}
	return table;
}		
	
function newOrderDetailRow(detail) {
	var saveButton = $("<img>")
		.addClass("inactive")
		.attr({"src": "/img/save.png"});
	var deleteButton = $("<img>")
		.addClass("active")
		.attr({"src": "/img/delete.png"})
		.attr({"onclick": "orderDetailsDelete("+detail.order.id+","+detail.recipe.id+");"});
	return newRow([
		detail.recipe.id,
		detail.recipe.name,
		detail.servings,
		saveButton,
		deleteButton
	], [0, 0, 1], [])
		.attr({"id": "det_" + detail.recipe.id})
		.on("input", function() {
			orderId = $(".modal-title").text().split(" ")[0].substring(1);
			recipeId = this.id.split("_")[1];
			enableSaveOrderDetails(orderId, recipeId)});
}

function newStaticRecipeTable(recipes) {
	var table = $("<table>")
			.append(newHeader(["ID", "Name"]));
	for(recipe of recipes) {
		table.append(newStaticRecipeRow(recipe));
	}
	return table;
}

function newStaticRecipeRow(recipe) {
	return newRow([recipe.id, recipe.name],[],[])
		.on("dblclick", function() {
			var orderId = $(".modal-title").text().split(" ")[0].substring(1);
			orderDetailsAdd(orderId, recipe.id);
		});
}
	
function enableSaveOrderDetails(orderId, recipeId) {
	$("#det_" + recipeId + " td:eq(3) > img")
		.attr({"class":"active"})
		.attr({"onclick": "orderDetailsUpdate("+orderId+ ","+recipeId+ ")"});	
}
	
function disableSaveOrderDetails(id) {
	$("#" + id + " td:eq(3) > img")
		.attr({"class":"inactive"})
		.attr({"onclick": ""});	
}
