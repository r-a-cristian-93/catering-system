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
		data: info
	});
}	

function buildOrdersTable() {
	$.when(getOrders())
		.then(function(ordersList) {
			var table = $("<table>").append(newHeader(["ID", "Stare", "Client", "Adresa"]));	
			for(order of ordersList) {
				table.append(newOrderRow(order));
			}			
			$("#order-table").append(table);
		});
}	

function newOrderRow(order) {	
	var editButton = $("<img>")
		.addClass("active")
		.attr({"src": "/img/edit.png"});
	var deleteButton = $("<img>")
		.addClass("active")
		.attr({"src": "/img/delete.png"});

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
		]);
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
	info = JSON.stringify({"status": {"name": status}});
	$.when(updateOrder(id, info)).then(function(order) {
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
	info = JSON.stringify({"client": {"name": client}});
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
