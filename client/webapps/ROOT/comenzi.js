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

function buildOrdersTable() {
	$.when(getOrders(), getStatus())
		.then(function(ordersList, statusList) {
			var table = $("<table>").append(newHeader(["ID", "Stare", "Client", "Adresa"]));	
			for(order of ordersList[0]) {
				table.append(newOrderRow(order, statusList[0]));
			}			
			$("#order-table").append(table);
		});
}	

function newOrderRow(order, statusJson) {			
	var statusOptions = newTableSelect();	
	for(st of statusJson) {
		statusOptions.append(
			newTableOption(order.id, st.name)
		);
	}

	return newRow([
		order.id, 
		$("<p>").text(order.status.name).prop('outerHTML') + statusOptions.prop('outerHTML'), 
		order.client.name,
		order.client.address],[],[0, 'dropdown']);
}

function newTableSelect() {
	return $("<div>").addClass("dropdown-content");
}

function newTableOption(orderId, status) {
	return $("<div>").text(status)
		.attr({"onclick": 'changeOrderStatus('+orderId+', "'+status+'");'});
}

function changeOrderStatus(orderId, status) {
	$("#"+orderId+" td:eq(1) p").text(status);
}
