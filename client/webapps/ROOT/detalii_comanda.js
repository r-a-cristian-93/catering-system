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

function deleteOrderDetails(details) {
	return $.ajax({
		method: 'DELETE',
		xhrFields: { withCredentials: true },
		contentType: 'application/json',
		data: JSON.stringify(details),
		url: DEFAULTS.REST_URL + '/orders/'+details.order.id+'/details'
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
		case "livrata": // "expediere"
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
			.append(newCards(order))
			.append(newStepperBar(order));

		buildOrderDetailsTable(args.order_id);
    });
}


function buildOrderDetailsTable(order_id) {
	$.when(getOrderDetails(order_id)).then(function(details){
		$("#order-details")
			.append(newOrderDetailsTable(details))
			.append(newAddButton("Adauga articol", null)
				.attr({"onclick": "buildAddItemsModal("+order_id+")"}))
	});
}

function newOrderDetailsTable(details) {
	var table = $("<table>")
		.attr({"id": "order-details-table"})
		.addClass("full")
		.append(newHeader(["Articol", "Portii", "Cost unitar", "Cost total"],[]).addClass("font-size-120"));
	for(detail of details) {
		table.append(newOrderDetailRow(detail));
	}

	table.append(newHeader([,,"Total:",details[0].order.ingCost.toFixed(2) + " Lei"]).attr({"id":"det_total"}).addClass("font-size-140"));

	return table;
}

function selectContentOf(node) {
	var range = document.createRange();
	range.selectNodeContents(node);
	var sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange(range);
}

function newOrderDetailRow(detail) {
	var deleteButton = $("<img>")
		.addClass("active")
		.attr({"src": "/img/delete.png"})
		.attr({"onclick": "orderDetailsDelete("+detail.order.id+","+detail.recipe.id+");"});
	var divServings = $("<div>")
		.attr({"contenteditable":true})
		.keypress(function(event) {
			inputIntegers(event);
			var keyCode = event.keyCode || event.which;

			if (keyCode === 13) {
				$(this).focusout(); // when pressing ENTER
			}
		})
		.on("focusout", function() {
			if ($(this).attr("mustsave") == "true") {
				orderDetailsUpdate(detail.order.id, detail.recipe.id)
				$(this).attr("mustsave", false);
			}
		})
		.on("focus", function() {
			selectContentOf($(this).get(0))
		});
	divServings.html(detail.servings);

	return newRow([
		detail.recipe.name,
		divServings,
		detail.recipe.ingCost.toFixed(2) + " Lei",
		(detail.servings * detail.recipe.ingCost).toFixed(2) + " Lei",
		deleteButton
	], [0, 0, 0], [])
		.addClass("font-size-120")
		.attr({"id": "det_" + detail.recipe.id})
		.on("input", function() {
			divServings.attr("mustsave", "true");
			orderId = $(".modal-title").text().split(" ")[0].substring(1);
			recipeId = this.id.split("_")[1];});
}

function newStepperBar(order) {
	var sPlacement = $("<div>").addClass("stepper-item")
		.append($("<div>").addClass("step-counter"))
		.append($("<div>").addClass("step-name").html("Preluare"))
	if (order.orderDate != null) {
		sPlacement.addClass("completed").append($("<div>").addClass("step-date").html(cardDateTime(order.orderDate)));
	}

	var sSupply = $("<div>").addClass("stepper-item")
		.append($("<div>").addClass("step-counter"))
		.append($("<div>").addClass("step-name").html("Aprovizionare"));
	if (order.supplyDate != null) {
		sSupply.addClass("completed").append($("<div>").addClass("step-date").html(cardDateTime(order.supplyDate)));
	}

	var sProduction = $("<div>").addClass("stepper-item")
		.append($("<div>").addClass("step-counter"))
		.append($("<div>").addClass("step-name").html("Preparare"));
	if (order.productionDate != null) {
		sProduction.addClass("completed").append($("<div>").addClass("step-date").html(cardDateTime(order.productionDate)));
	}

	var sPreparing = $("<div>").addClass("stepper-item")
		.append($("<div>").addClass("step-counter"))
		.append($("<div>").addClass("step-name").html("Pregatire"));
	if (order.preparingDate != null) {
		sPreparing.addClass("completed").append($("<div>").addClass("step-date").html(cardDateTime(order.preparingDate)));
	}

	var sShipping = $("<div>").addClass("stepper-item")
		.append($("<div>").addClass("step-counter"))
		.append($("<div>").addClass("step-name").html("Expediere"));
	if(order.deliveryDate != null) {
		sShipping.addClass("completed").append($("<div>").addClass("step-date").html(cardDateTime(order.deliveryDate)));
	}

	var stepperBar = $("<div>").addClass("stepper-wrapper")
		.append(sPlacement)
		.append(sSupply)
		.append(sProduction)
		.append(sPreparing)
		.append(sShipping);

	return stepperBar;
}

function orderDetailsDelete(orderId, recipeId) {
	var details = {
		"order": {"id": orderId},
		"recipe": {"id": recipeId}
	};

	$.when(deleteOrderDetails(details)).then(function() {
		$("#det_" + details.recipe.id).remove();

		$.when(getOrder(orderId)).then(function(order) {
			$("#det_total th:eq(3)").html(order.ingCost.toFixed(2) + " Lei");
		});
	});
}

function orderDetailsView(args) {
	args.buildFunction = orderDetailsView;
	args.getFunction = getOrder;
	orderDetailsBuildView(args);
}





/* ADD NEW ITEM TO THE ORDER MODAL */

function buildAddItemsModal(id) {
	$.when(getOrderDetails(id), getRecipes()).then(function(details, recipes){
		var modal = new ModalBuilder("#" + id+ " Modifica comanda", "edit-order-details-modal");

		modal.content.append(new newStaticRecipeTable(recipes[0]));
		$("body").append(modal.modal);
	});
}

function newStaticRecipeTable(recipes) {
	var table = $("<table>")
		.addClass("full")
		.append(newHeader(["ID", "Reteta", "Gramaj", "Cost unitar"]));
	for(recipe of recipes) {
		table.append(newStaticRecipeRow(recipe));
	}
	return table;
}

function newStaticRecipeRow(recipe) {
	return newRow([
		recipe.id,
		recipe.name,
		recipe.quantity + " " + recipe.unit.name,
		recipe.ingCost.toFixed(2) + " Lei"])
		.on("dblclick", function() {
			var orderId = $(".modal-title").text().split(" ")[0].substring(1);
			orderDetailsAdd(orderId, recipe.id);
		});
}

function orderDetailsAdd(orderId, recipeId) {
	var details = {
		"order": {"id": orderId},
		"recipe": {"id": recipeId},
		"servings": 0
	};
	$.when(addOrderDetails(details)).then(function(data) {
		newOrderDetailRow(data).insertBefore("#order-details-table tr:last");
	});
}

function addOrderDetails(details) {
	return $.ajax({
		method: 'POST',
		xhrFields: { withCredentials: true },
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(details),
		url: DEFAULTS.REST_URL + '/orders/'+details.order.id+'/details'
	});
}

function getRecipes() {
	return $.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'json',
		url: DEFAULTS.REST_URL + '/recipes'
	});
}



/* UPDATE ORDER DETAILS */

function orderDetailsUpdate(orderId, recipeId) {
	var details = {
		"order": {"id": orderId},
		"recipe": {"id": recipeId},
		"servings": $("#det_" + recipeId + " td:eq(1)").text()};
	$.when(updateOrderDetails(details)).then(function(data) {
		$("#det_" + data.recipe.id).replaceWith(newOrderDetailRow(data));

		$.when(getOrder(orderId)).then(function(order) {
			$("#det_total th:eq(3)").html(order.ingCost.toFixed(2) + " Lei");
		});
	});
}

function updateOrderDetails(details) {
	return $.ajax({
		method: 'PUT',
		xhrFields: { withCredentials: true },
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(details),
		url: DEFAULTS.REST_URL + '/orders/'+details.order.id+'/details'
	});
}