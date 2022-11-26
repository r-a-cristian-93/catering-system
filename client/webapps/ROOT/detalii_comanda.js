$(document).ready(function() {
    search_params = new URLSearchParams(window.location.search);

    var args = {
		order_id: search_params.get("id")
	};

    orderDetailsView(args);
});


function getOrder(id) {
	return $.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: DEFAULTS.REST_URL + '/orders/'+id,
	});
}

function getOrderDetails(orderId) {
	return $.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: DEFAULTS.REST_URL + '/orders/'+orderId+'/details'
	});
}

function newCards(order) {
	var statusDate;

	switch (order.status.name) {
		case "preluata": //"preluare"
			statusDate = order.orderDate; // order.placementDate
		break;
		case "aprovizionare":
			statusDate = order.supplyDate;
		break;
		case "in lucru": // "preparare"
			statusDate = order.productionDate; // order.productionDate;
		break;
		case "pregatire":
			statusDate = order.preparingDate;
		break;
		case "livrata": // "livrare"
			statusDate = order.deliveryDate; // order.shipping_date;
		break;
	}

	statusDate = cardDateTime(statusDate);

	var cardStatus = $("<div>").addClass("card").attr({"id": "card-status"})
		.append($("<div>").addClass("card-icon")
			.append($("<div>").addClass("stretch-bg " + order.status.name.replace(/ /g, "-"))))
		.append($("<div>").addClass("card-details")
			.append($("<div>").addClass("card-title").html("Stare"))
			.append($("<div>").addClass("card-text-big first-big").html(order.status.name))
			.append($("<div>").addClass("card-text-medium").html(statusDate))
		);

	var cardClient = $("<div>").addClass("card").attr({"id": "card-client"})
		.append($("<div>").addClass("card-icon")
			.append($("<div>").addClass("stretch-bg profil")))
		.append($("<div>").addClass("card-details")
			.append($("<div>").addClass("card-title").html("Client"))
			.append($("<div>").addClass("card-text-big first-big").html(order.client.name))
			.append($("<div>").addClass("card-text-medium").html(order.client.phone))
		);

	var cardAddress = $("<div>").addClass("card").attr({"id": "card-address"})
		.append($("<div>").addClass("card-icon")
			.append($("<div>").addClass("stretch-bg " + order.status.name.replace(/ /g, "-"))))
		.append($("<div>").addClass("card-details")
			.append($("<div>").addClass("card-title").html("Adresa livrare"))
			.append($("<div>").addClass("card-text-medium").html(order.deliveryAddress.value))
		);

	var cardDeadline = $("<div>").addClass("card").attr({"id": "card-deadline"})
		.append($("<div>").addClass("card-icon")
			.append($("<div>").addClass("stretch-bg " + order.status.name.replace(/ /g, "-"))))
		.append($("<div>").addClass("card-details")
			.append($("<div>").addClass("card-title").html("Termen livrare"))
			.append($("<div>").addClass("card-text-medium").html("10.10.2020"))
			.append($("<div>").addClass("card-text-big").html("12:00"))
		);

	var cards = $("<div>").attr({"id": "cards"})
		.append(cardStatus)
		.append(cardClient)
		.append(cardAddress)
		.append(cardDeadline);


	return cards;
}

function orderDetailsBuildView(args) {
    $.when(args.getFunction(args.order_id)).then(function(order) {
        console.log(order);

        $("#order-details")
			.append($("<div>").addClass("order-details-title").html("Detalii comanda #" + order.id))
			.append(newCards(order));

		buildOrderDetailsTable(args.order_id);
    });
}


function buildOrderDetailsTable(id) {
	$.when(getOrderDetails(id)).then(function(details){
		$("#order-details")
			.append(newOrderDetailsTable(details));
	});
}

function newOrderDetailsTable(details) {
	var table = $("<table>")
		.attr({"id": "order-details-table"})
		.addClass("full")
		.append(newHeader(["Articol", "Portii", "Cost unitar", "Cost total"],[]).addClass("font-size-120"));
	for(detail of details) {
		table.append(newOrderDetailRow(detail).addClass("font-size-120"));
	}

	table.append(newHeader([,,"Total:",details[0].order.ingCost.toFixed(2) + " Lei"]).attr({"id":"det_total"}).addClass("font-size-140"));

	return table;
}

function newOrderDetailRow(detail) {
	var deleteButton = $("<img>")
		.addClass("active")
		.attr({"src": "/img/delete.png"})
		.attr({"onclick": "orderDetailsDelete("+detail.order.id+","+detail.recipe.id+");"});
	var divServings = $("<div>")
		.attr({"contenteditable":true})
		.keypress(inputOnlyNumbers)
		.attr({"oninput": "enableSaveOrderDetails("+detail.order.id+","+detail.recipe.id+");"});
	divServings.html(detail.servings);
	return newRow([
		detail.recipe.name,
		divServings,
		detail.recipe.ingCost.toFixed(2) + " Lei",
		(detail.servings * detail.recipe.ingCost).toFixed(2) + " Lei",
		deleteButton
	], [0, 0, 0], [])
		.attr({"id": "det_" + detail.recipe.id})
		.on("input", function() {
			orderId = $(".modal-title").text().split(" ")[0].substring(1);
			recipeId = this.id.split("_")[1];});
}

function orderDetailsView(args) {
	args.buildFunction = orderDetailsView;
	args.getFunction = getOrder;
	orderDetailsBuildView(args);
}
