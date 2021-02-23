var defaultPageSize = 10;

$(document).ready(function() {
	buildFilters();
	var args = {
		page: 0,
		size: defaultPageSize,
	};
	orderBuildTableAll(args);	
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

function getOrders(args) {
	return $.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: REST_URL + '/orders/allPageable',
		data: { "page": args.page, "size":args.size }
	});	
}

function getOrdersByStatus(args) {
	return $.ajax({
		method: 'POST',
		xhrFields: { withCredentials: true },
		url: REST_URL + '/orders/byStatusPageable?page=' + args.page + '&size=' + args.size,
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(args.data)
	});	
}

function getOrdersByOrderDate(args) {
	return $.ajax({
		method: 'POST',
		xhrFields: { withCredentials: true },
		url: REST_URL + '/orders/betweenOrderDatesPageable?page=' + args.page + '&size=' + args.size,
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(args.data)
	});
}	

function getOrdersByDeliveryDate(args) {
	return $.ajax({
		method: 'POST',
		xhrFields: { withCredentials: true },
		url: REST_URL + '/orders/betweenDeliveryDatesPageable?page=' + args.page + '&size=' + args.size,
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(args.data)
	});
}	


function getOrdersByShoppingListId(shoppingListId) {
	return $.ajax({
		method: 'POST',
		xhrFields: { withCredentials: true },
		url: REST_URL + '/orders/byShoppingListId',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(shoppingListId)
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

// ui operations

function newFilterDiv() {}

function newFilterContainer(name) {
	return $("<div>").addClass("filter-container")
		.append($("<div>").addClass("filter-name").text(name));
}

function newStatusFilter(text, status) {
	return $("<a>").text(text).on("click", function() {
		var args = {
			page: 0, 
			size: defaultPageSize, 
			currentPage: 0, 
			data:{name: status}};
		orderBuildTableByStatus(args);
	});
}

function newOrderDateFilter(days) {
	return $("<a>").text("Ultimele "+days+" zile").on("click", function() {
		var last = new Date(Date.now());
		var first = last.addDays(-days);
		var args = {
			page: 0, 
			size: defaultPageSize, 
			currentPage:0, 
			data:{first: first.getTime(), last: last.getTime()}};
		orderBuildTableByOrderDate(args);
	});
}

function newDeliveryDateFilter(days) {
	return $("<a>").text("Urmatoarele "+days+" zile").on("click", function() {
		var first = new Date(Date.now());
		first.setHours(0);
		first.setMinutes(0);
		first.setSeconds(0);
		var last = first.addDays(days);
		var args = {
			page: 0, 
			size: defaultPageSize, 
			currentPage:0, 
			data:{first: first.getTime(), last: last.getTime()}};
		orderBuildTableByDeliveryDate(args);
	});
}

function buildFilters() {
	var f1 = newFilterContainer("Toate")
		.on("click", function() {
			orderBuildTableAll({page: 0, size: defaultPageSize, currentPage: 0});
		});	
	var f2 = newFilterContainer("Stare").addClass("dropdown")
		.append(newDivDDC([
			newStatusFilter("Preluate", "preluata"),
			newStatusFilter("In lucru", "in lucru"),
			newStatusFilter("Livrate", "livrata"),
			newStatusFilter("Anulate", "anulata")
		]));
	var f5 = newFilterContainer("Data primire").addClass("dropdown")
		.append(newDivDDC([
			newOrderDateFilter(7),
			newOrderDateFilter(14),
			newOrderDateFilter(30)			
		]));
	var f6 = newFilterContainer("Data livrare").addClass("dropdown")
		.append(newDivDDC([
			newDeliveryDateFilter(1).text("Azi"),
			newDeliveryDateFilter(7),
			newDeliveryDateFilter(14),
			newDeliveryDateFilter(30)	
		]));	
	$("div .box").prepend(
		$("<div>").addClass("filter-menu")
			.append(f1)
			.append(f2)
			.append(f5)
			.append(f6)
		);
}

function orderAdd() {
	var emptyOrder = {};
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

function orderUpdateDeliveryDate(id, deliveryDate) {
	info = {"deliveryDate": deliveryDate};
	$.when(updateOrder(id, info)).then(function(order) {
		$("#"+order.id).replaceWith(newOrderRow(order));
	});		
}

function orderDelete(id) {
	$.when(deleteOrder(id)).then(function(){
		$("#"+id).remove();
	});
}

function orderBuildTable(args) {
	$.when(args.getFunction(args)).then(function(ordersList) {
		args.currentPage = ordersList.pageable.pageNumber;
		args.totalPages = ordersList.totalPages;		
		var pager = newPager(args);
		
		var table = $("<table>")
			.addClass("full")
			.append(newHeader(["ID", "Stare", "Client", "Data preluare", "Data livrare", "Cost ingrediente"]));	
		for(order of ordersList.content) {
			table.append(newOrderRow(order));
		}			
		$("#order-table").html("")
			.append(table)
			.append(newButton("+ Adauga comanda noua", "orderAdd()"))
			.append(pager);
	});
}	

function newOrderRow(order) {
	var clientName = $("<div>")
		.append($("<div>").text(order.client.name))
		.append($("<h5>").text(order.client.phone));	
	var statusImage = $("<div>").addClass(order.status.name.replace(/ /g, "-"));
	var shoppingListButton = $("<img>")
		.attr({"onclick": "buildShoppingListModal("+order.id+","+order.shoppingListId+")"});
	if(order.shoppingListId == 0 || !order.shoppingListId) {
		shoppingListButton.attr({"src": "/img/cart.png"});
	}
	else {
		shoppingListButton.attr({"src": "/img/cart_shared.png"});
	}
	var editButton = $("<img>")
		.addClass("active")
		.attr({"src": "/img/edit.png"})
		.attr({"onclick": "buildOrderDetailsEditModal("+order.id+")"});
	var saveButton = $("<img>")
		.addClass("inactive")
		.attr({"src": "/img/save.png"});
	var deleteButton = $("<img>")
		.addClass("active")
		.attr({"src": "/img/delete.png"})
		.attr({"onclick": "orderDelete("+order.id+")"});
	return newRow([
		order.id,		
		statusImage,
		clientName,
		toLocalDateTime(order.orderDate).date,
		newDeliveryDateDiv(order),		
		order.ingCost.toFixed(2) + ' Lei',
		shoppingListButton,
		saveButton,
		editButton,
		deleteButton
		],[],[
			null,
			{"class": "clickable", "onclick": "buildOrderEditStatusModal("+order.id+")"},
			{"class": "clickable", "onclick": "buildOrderEditClientModal("+order.id+")"},
		])
			.on("input", function() {
				enableSaveOrder(order.id)
			});
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

function enableSaveOrder(id) {	
	var date = $("#"+id+">td:eq(4)>div>input")[0].value;
	var time = $("#"+id+">td:eq(4)>div>input")[1].value;
	var dateTime = new Date(date + " " +time);
	console.log(dateTime);
	var deliveryDate = dateTime.toISOString();
	console.log(deliveryDate);
	$("#" + id + " td:eq(7) > img")
		.attr({"class":"active"})
		.attr({'onclick': 'orderUpdateDeliveryDate('+id+',"'+deliveryDate+'")'});	
}
	
function disableSaveOrder(id) {
	$("#" + id + " td:eq(7) > img")
		.attr({"class":"inactive"})
		.attr({"onclick": ""});	
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
		.addClass("full")
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

function toLocalDateTime(dateTimeString) {
	var dateObj = new Date(dateTimeString)
	return {
		date: dateObj.toLocaleDateString('ro-RO'),
		time: dateObj.toLocaleTimeString('ro-RO')
	}
}

function newDeliveryDateDiv(order) {
	var date = order.deliveryDate.split('T')[0];
	var time = toLocalDateTime(order.deliveryDate).time;
	var div =  $("<div>")
		.append($("<input>").attr({"type": "date", "class": "date", "value": date}))
		.append($("<input>").attr({"type": "time", "class": "date", "value": time}));
	
	dateDelivery = new Date(date).setHours(0,0,0,0);
	dateNow = new Date(Date.now()).setHours(0,0,0,0);

	if (order.status.name == 'preluata' || order.status.name == 'in lucru') {
		if (dateDelivery == dateNow) {
			div.addClass("due-today");
		}
		else if (dateDelivery < dateNow) {
			div.addClass("overdue");
		}
	}
	return div;
}
	
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
	
	
	
/* ******************* SHOPPING LIST ******************* */

function getShoppingListById(shoppingListId) {
	return $.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: REST_URL + '/shoppingList/' + shoppingListId
	});
}

function getShoppingListByOrderId(orderId) {
	return $.ajax({
		method: 'POST',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: REST_URL + '/shoppingList/byOrderId',
		contentType: 'application/json',
		data: JSON.stringify(orderId)
	});
}

function mergeShoppingList(orderIds) {
	return $.ajax({
		method: 'POST',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: REST_URL + '/shoppingList/merge',
		contentType: 'application/json',
		data: JSON.stringify(orderIds)
	});
}

function removeShoppingList(orderId) {
	return $.ajax({
		method: 'POST',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: REST_URL + '/shoppingList/remove',
		contentType: 'application/json',
		data: JSON.stringify(orderId)
	});
}

function buildShoppingListModal(orderId) {
	var dataSet = {};
	$.when(getOrder(orderId), getShoppingListByOrderId(orderId)).then(function(order, shoppingList) {
		dataSet["order"] = order[0];
		dataSet["shoppingList"] = shoppingList[0];		
		$.when(getOrdersByShoppingListId(dataSet.order.shoppingListId), getOrdersByShoppingListId(0))
			.then(function(sharingOrders, nonSharingOrders) {
				dataSet["sharingOrders"] = sharingOrders[0];
				dataSet["nonSharingOrders"] = nonSharingOrders[0];
				var modal = newShoppingListModal(dataSet);
				
				if ($("#edit-shopping-list-modal")[0]) { 
					$("#edit-shopping-list-modal").replaceWith(modal);
				}
				else {					
					$("body").append(modal);
				}
			});		
	});	
}

function newShoppingListModal(dataSet) {
	var modal = new ModalBuilder("#" + dataSet.order.id +" - Lista cumparaturi" , "edit-shopping-list-modal");
	modal.content.append(newShoppingListTable(dataSet.shoppingList));
	
	//manager div
	var manager = $("<div>")
		.attr({'id': 'shopping-list-manager'})
		.append('Aceasta lista de cumparaturi este comuna pentru urmatoarele comenzi:');
	if(dataSet.order.shoppingListId==0) {
		manager.append(newOrdersDivBoxRemove(dataSet.order.id, [{id: dataSet.order.id}]));
	}
	else {
		manager.append(newOrdersDivBoxRemove(dataSet.order.id, dataSet.sharingOrders));
	}
	manager
		.append($("<p>").addClass("no-print").html('Adauga si alte comenzi:'))
		.append(newOrdersDivBoxMerge(dataSet.order.id, ordersListDiff(dataSet.nonSharingOrders, [{id: dataSet.order.id}])));
	// end manager div
	
	var validOrders;
	if (dataSet.order.shoppingListId == 0) {
		validOrders = [dataSet.order];
	}
	else { 
		validOrders = dataSet.sharingOrders;
	}
	
	var costPerOrder = $("<div>")
		.append(newCostPerOrderTable(validOrders));
	var rightColumn = $('<div>').addClass('modal-fixed ibt')
		.append(manager)
		.append(costPerOrder);
	modal.content
		.append(rightColumn)
		.append($("<img>").addClass("printer no-print").attr({"src": "/img/print.png", "onclick": "printShoppingList()"}));
	modal.modal.find('.modal-top').addClass("no-print");
	return modal.modal;
}

function ordersListDiff(arrayA, arrayB) {
	var arrayC = [];
	arrayA.forEach(function(orderA) {
		var skip = false;
		arrayB.forEach(function(orderB) {			
			if(orderA.id == orderB.id) {
				skip = true;
			}
		});
		if(!skip) {
			arrayC.push(orderA);
		}
	});
	return arrayC;
}

function newOrdersDivBox(orders, action) {	
	var ordersDiv = $("<div>").addClass('orders-list');
	orders.forEach(function(order) {
		ordersDiv.append(
			newButton(+order.id, action)
		)
	});
	return ordersDiv;
}	
function newOrdersDivBoxMerge(orderIdA, orders) {	
	var ordersDiv = $("<div>").addClass('orders-list no-print');
	orders.forEach(function(order) {
		if(order.status.name!='anulata' && order.status.name!='livrata') {
			ordersDiv.append(
				newButton(+order.id).attr('ondblclick', 'shoppingListMerge('+orderIdA+','+order.id+')')
			);
		}
	});
	return ordersDiv;
}	

function newOrdersDivBoxRemove(orderIdA, orders) {	
	var ordersDiv = $("<div>").addClass('orders-list');
	orders.forEach(function(orderB) {
		ordersDiv.append(
			newButton(+orderB.id).attr('ondblclick', 'shoppingListRemove('+orderIdA+','+orderB.id+')')
		);
	});
	return ordersDiv;
}	

function newShoppingListTable(shoppingList) {
	var table = $("<table>")
		.attr({"id": "shopping-list-table"})
		.addClass("ibt")
		.append(newHeader(["Ingredient", "Cantitate"], [0, 2]));
	for(el of shoppingList) {
		table.append(newShoppingListRow(el));
	}
	return table;
}

function newShoppingListRow(el) {
	if(el.ingredient) {
		return newRow([el.ingredient.name, el.quantity.toFixed(2), el.ingredient.unit.name],[],[]);
	}
}

function newCostPerOrderTable(orders){
	var totalCost = 0;
	var table = $('<table>')
		.attr({'id': 'cost-per-order-table'})
		.addClass('full')
		.append(newHeader(['Comanda', 'Cost ingrediente'], [0, 2]));
	for(o of orders) {
		table.append(newRow([o.id, o.ingCost.toFixed(2), 'Lei']));
		totalCost += o.ingCost;
	}
	table.append(newRow(['Total', totalCost.toFixed(2), ' Lei']));
	return table;
}

function shoppingListMerge(orderIdA, orderIdB) {
	var orderIds = [orderIdA, orderIdB];
	$.when(mergeShoppingList(orderIds)).then(function(){		
		buildShoppingListModal(orderIdA);	
	});
}

function shoppingListRemove(orderIdA, orderIdB) {
	$.when(removeShoppingList(orderIdB)).then(function(){	
		buildShoppingListModal(orderIdA);
	});
}

function printShoppingList() {
	var shoppingList = $("#edit-shopping-list-modal").clone();
	shoppingList.find(".orders-list button").after('<span>, </span>');
	shoppingList.find(".orders-list span:last-child").html('.');
	var header = $("<div>").addClass("doc-header")
		.append('Lista de cumparaturi')
		.append($('<span>').addClass('fr').html('Tiparit la: ' + new Date(Date.now()).toLocaleString()))
		.append("<hr/>");
	shoppingList.prepend(header);	
	shoppingList.printThis({importCSS: false, loadCSS: "print.css", importStyle: true});
}

function orderBuildTableAll(args) {
	args.buildFunction = orderBuildTableAll;
	args.getFunction = getOrders;
	orderBuildTable(args);	
}

function orderBuildTableByStatus(args) {
	args.buildFunction = orderBuildTableByStatus;
	args.getFunction = getOrdersByStatus;
	orderBuildTable(args);	
}

function orderBuildTableByOrderDate(args) {
	args.buildFunction = orderBuildTableByOrderDate;
	args.getFunction = getOrdersByOrderDate;
	orderBuildTable(args);	
}

function orderBuildTableByDeliveryDate(args) {
	args.buildFunction = orderBuildTableByDeliveryDate;
	args.getFunction = getOrdersByDeliveryDate;
	orderBuildTable(args);	
}


