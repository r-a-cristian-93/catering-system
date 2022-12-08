$(document).ready(function() {
	buildFilters();
	var args = {
		page: 0,
		size: localStorage.PAGE_SIZE,
		prop: localStorage.ORDERS_SORT_BY,
		dir: localStorage.SORT_DIRECTION
	};
	orderBuildTableAll(args);
});

// http requests

function getOrder(id) {
	return $.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: DEFAULTS.REST_URL + '/orders/'+id,
	});
}

function getOrders(args) {
	return $.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: DEFAULTS.REST_URL + '/orders/allPageable',
		data: {
			"page": args.page,
			"size":args.size,
			"prop": args.prop,
			"dir": args.dir
		}
	});
}

function getOrdersByStatus(args) {
	return $.ajax({
		method: 'POST',
		xhrFields: { withCredentials: true },
		url: DEFAULTS.REST_URL + '/orders/byStatusPageable?page=' + args.page + '&size=' + args.size + '&prop=' + args.prop + '&dir=' + args.dir,
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(args.data)
	});
}

function getOrdersByOrderDate(args) {
	return $.ajax({
		method: 'POST',
		xhrFields: { withCredentials: true },
		url: DEFAULTS.REST_URL + '/orders/betweenOrderDatesPageable?page=' + args.page + '&size=' + args.size + '&prop=' + args.prop + '&dir=' + args.dir,
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(args.data)
	});
}

function getOrdersByDueDate(args) {
	return $.ajax({
		method: 'POST',
		xhrFields: { withCredentials: true },
		url: DEFAULTS.REST_URL + '/orders/betweenDeliveryDatesPageable?page=' + args.page + '&size=' + args.size + '&prop=' + args.prop + '&dir=' + args.dir,
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(args.data)
	});
}

function addOrder(order){
	return $.ajax({
		method: 'POST',
		xhrFields: { withCredentials: true },
		url: DEFAULTS.REST_URL + '/orders',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(order)
	});
}

// ui operations

function newFilterContainer(name) {
	return $("<div>").addClass("filter-container")
		.append($("<div>").addClass("filter-name").text(name));
}

function newStatusFilter(text, status) {
	return $("<a>").text(text).on("click", function() {
		var args = {
			page: 0,
			size: localStorage.PAGE_SIZE,
			data:{name: status},
			prop: localStorage.ORDERS_SORT_BY,
			dir: localStorage.SORT_DIRECTION
		};
		orderBuildTableByStatus(args);
	});
}

function newOrderDateFilter(days) {
	return $("<a>").text("Ultimele "+days+" zile").on("click", function() {
		var last = new Date(Date.now());
		var first = last.addDays(-days);
		var args = {
			page: 0,
			size: localStorage.PAGE_SIZE,
			data:{first: first.getTime(), last: last.getTime()},
			prop: localStorage.ORDERS_SORT_BY,
			dir: localStorage.SORT_DIRECTION
		};
		orderBuildTableByOrderDate(args);
	});
}

function newDueDateFilter(days) {
	return $("<a>").text("Urmatoarele "+days+" zile").on("click", function() {
		var first = new Date(Date.now());
		first.setHours(0);
		first.setMinutes(0);
		first.setSeconds(0);
		var last = first.addDays(days);
		var args = {
			page: 0,
			size: localStorage.PAGE_SIZE,
			data: { first: first.getTime(), last: last.getTime() },
			prop: localStorage.ORDERS_SORT_BY,
			dir: localStorage.SORT_DIRECTION
		};
		orderBuildTableByDueDate(args);
	});
}

function buildFilters() {
	var f1 = newFilterContainer("Toate")
		.on("click", function() {
			var args = {
				page: 0,
				size: localStorage.PAGE_SIZE,
				prop: localStorage.ORDERS_SORT_BY,
				dir: localStorage.SORT_DIRECTION
			};
			orderBuildTableAll(args);
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
			newDueDateFilter(1).text("Azi"),
			newDueDateFilter(7),
			newDueDateFilter(14),
			newDueDateFilter(30)
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

function orderBuildTable(args) {
	$.when(args.getFunction(args)).then(function(ordersList) {
		args.currentPage = ordersList.pageable.pageNumber;
		args.totalPages = ordersList.totalPages;
		var pager = newPager(args);

		var table = $("<table>")
			.addClass("full")
			.append(newHeader(["ID", "Stare", "Client", "Data preluare", "Termen limita", "Cost ingrediente"]));
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
	console.log(order);
	var clientName = $("<div>")
		.append($("<div>").text(order.client.name))
		.append($("<h5>").text(order.client.phone));
	var statusImage = $("<div>").addClass(order.status.name.replace(/ /g, "-"));

	var order_row = newRow([
		order.id,
		statusImage,
		clientName,
		toLocalDateTime(order.placementDate).date,
		toLocalDateTime(order.dueDate).date,
		order.ingCost.toFixed(2) + ' Lei',
		],[],[]);

		order_row.click(function() {
			window.location = DEFAULTS.CLIENT_URL+"/detalii_comanda.html?id=" + order.id;
		});

		return order_row;
}

// ui operations

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
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

function orderBuildTableByDueDate(args) {
	args.buildFunction = orderBuildTableByDueDate;
	args.getFunction = getOrdersByDueDate;
	orderBuildTable(args);
}
