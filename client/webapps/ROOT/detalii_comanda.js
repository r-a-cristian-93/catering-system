$(document).ready(function() {
    search_params = new URLSearchParams(window.location.search);

    var args = {
		order_id: search_params.get("id")
	};

    orderDetailsView(args);
});


function getOrderDetails(id) {
	return $.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: DEFAULTS.REST_URL + '/orders/'+id,
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
    });
}

function orderDetailsView(args) {
	args.buildFunction = orderDetailsView;
	args.getFunction = getOrderDetails;
	orderDetailsBuildView(args);
}
