$(document).ready(function() {
	buildOrdersTable();
});

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
	$.ajax({
		method: 'DELETE',
		xhrFields: { withCredentials:true },
		url: REST_URL + '/orders/'+id,
		success: function() {
			$("#"+id).remove();
		}
	});
}

function buildOrdersTable() {
	$.when(getOrders()).then(function(ordersList) {
		var table = $("<table>").append(newHeader(["ID", "Stare", "Client", "Adresa"]));	
		for(order of ordersList) {
			table.append(newOrderRow(order));
		}			
		$("#order-table")
			.append(table)
			.append(newButton("+ Adauga comanda noua", "addNewEmptyOrder()"))
	});
}	

function addNewEmptyOrder() {
	var emptyOrder = {"client": {"id": 0}, "status": {"name": "preluata"}};
	$.when(addOrder(emptyOrder)).then(function(newOrder){
		$("#order-table table").append(newOrderRow(newOrder));
	});
}

function newOrderRow(order) {	
	var editButton = $("<img>")
		.addClass("active")
		.attr({"src": "/img/edit.png"})
		.attr({"onclick": "editOrderDetailsModal("+order.id+")"});
	var deleteButton = $("<img>")
		.addClass("active")
		.attr({"src": "/img/delete.png"})
		.attr({"onclick": "deleteOrder("+order.id+")"});
	return newRow([
		order.id, 
		order.status.name, 
		order.client.name,
		order.client.address,
		editButton,
		deleteButton
		],[],[
			null,
			{"onclick": "editOrderStatusModal("+order.id+")"},
			{"onclick": "editOrderClientModal("+order.id+")"}
		]).addClass(order.status.name.split(" ").join("-"));
}

function refreshOrderRow(order) {
	$("#"+order.id).replaceWith(newOrderRow(order));
}

function activateSaveOrder(id) {
	$("#" + id + " td:eq(4) > img")
		.attr({"class":"active"})
		.attr({"onclick": ""});	
}

function updateOrderStatus(id, status) {
	status = {"status": {"name": status}};
	$.when(updateOrder(id, status)).then(function(order) {
		refreshOrderRow(order);
		$("#edit-order-status-modal").remove();		
	});	
}

function newStatusOption(orderId, status) {	
	return $("<div>").addClass("modal-option").text(status)
		.attr({"onclick": 'updateOrderStatus('+orderId+', "'+status+'");'});
}

function editOrderStatusModal(id) {
	var modal = new ModalBuilder("#" + id+ " Modifica starea comenzii", "edit-order-status-modal");
	
	$.when(getStatus()).then(function(statusList) {
		for(st of statusList) {
			modal.content.append(newStatusOption(id, st.name));
		}				
		$("body").append(modal.modal);		
	});
}

function updateOrderClient(id, client) {
	info = {"client": {"name": client}};
	$.when(updateOrder(id, info)).then(function(order) {
		refreshOrderRow(order);
		$("#edit-order-client-modal").remove();		
	});	
}

function newClientOption(orderId, client) {	
	return $("<div>").addClass("modal-option").text(client)
		.attr({"onclick": 'updateOrderClient('+orderId+', "'+client+'");'});
}

function editOrderClientModal(id) {
	var modal = new ModalBuilder("#" + id+ " Modifica client", "edit-order-client-modal");
	
	$.when(getClients()).then(function(clientsList) {
		for(client of clientsList) {
			modal.content.append(newClientOption(id, client.name));
		}				
		$("body").append(modal.modal);		
	});
}


/* ******************* ORDERS DETAILS ******************* */

function getOrderDetails(orderId) {
	return $.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: REST_URL + '/orders/'+orderId+'/details'
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

function updateOrderDetails(orderId, details) {
	return $.ajax({
		method: 'PUT',
		xhrFields: { withCredentials: true },
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(details),
		url: REST_URL + '/orders/'+orderId+'/details'
	});
}

function addOrderDetails(orderId, details) {
	return $.ajax({
		method: 'POST',
		xhrFields: { withCredentials: true },
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(details),
		url: REST_URL + '/orders/'+orderId+'/details'
	});
}

function deleteOrderDetails(orderId, details) {
	return $.ajax({
		method: 'DELETE',
		xhrFields: { withCredentials: true },
		contentType: 'application/json',
		data: JSON.stringify(details),
		url: REST_URL + '/orders/'+orderId+'/details'
	});
}

function editOrderDetailsModal(id) {	
	$.when(getOrderDetails(id), getRecipes()).then(function(details, recipes){
		var recipesTable = $("<table>")
			.append(newHeader(["ID", "Name"]));
		for(recipe of recipes[0]) {
			recipesTable.append(newStaticRecipeRow(recipe));
		}	
		var recipesBox = new ExtraBox("Retete disponibile", 0);	
		recipesBox.content.append(recipesTable);
		
		var modal = new ModalBuilder("#" + id+ " Modifica comanda", "edit-order-details-modal");
		modal.content.append(newOrderDetailsTable(details[0]));
		modal.modalContainer.append(recipesBox.box);
		$("body").append(modal.modal);
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
		.attr({"onclick": "deleteOrderDetailsRecipe("+detail.order.id+","+detail.recipe.id+");"});
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
			activateSaveOrderDetails(orderId, recipeId)});
}

function refreshOrderDetailsRow(detail) {
	$("#det_" + detail.recipe.id).replaceWith(newOrderDetailRow(detail));	
}

function addOrderDetailsRow(detail) {
	$("#order-details-table").append(newOrderDetailRow(detail));	
}

function deleteOrderDetailsRow(detail) {
	$("#det_" + detail.recipe.id).remove();	
}
	
function activateSaveOrderDetails(orderId, recipeId) {
	$("#det_" + recipeId + " td:eq(3) > img")
		.attr({"class":"active"})
		.attr({"onclick": "updateOrderDetailsServings("+orderId+ ","+recipeId+ ")"});	
}
	
function disableSaveOrderDetails(id) {
	$("#" + id + " td:eq(3) > img")
		.attr({"class":"inactive"})
		.attr({"onclick": ""});	
}

function updateOrderDetailsServings(ordeId, recipeId) {		
	var servings = $("#det_" + recipeId + " td:eq(2)").text().split(" ")[0];
	var detail = {"recipe": {"id": recipeId}, "servings": servings};
	$.when(updateOrderDetails(orderId, detail)).then(function(newDetail) {
		refreshOrderDetailsRow(newDetail);	
	});
}

function deleteOrderDetailsRecipe(orderId, recipeId) {
	var detail = {"recipe": {"id": recipeId}};
	$.when(deleteOrderDetails(orderId, detail)).then(function() {
		deleteOrderDetailsRow(detail);
	});
}
	
function newStaticRecipeRow(recipe) {
	return newRow([recipe.id, recipe.name],[],[])
		.on("dblclick", function() {
			console.log("add details " + recipe.id);
			var orderId = $(".modal-title").text().split(" ")[0].substring(1);
			updateOrderDetailsRecipe(orderId, recipe.id);
		});
}

function updateOrderDetailsRecipe(orderId, recipeId) {
	var detail = {"recipe": {"id": recipeId}, "servings": 0};
	$.when(addOrderDetails(orderId, detail)).then(function(newDetail) {
		addOrderDetailsRow(newDetail);
	});
}	
