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

function updateOrder(order) {
	return $.ajax({
		method: 'PUT',
		xhrFields: { withCredentials:true },
		url: DEFAULTS.REST_URL + '/orders/'+order.id,
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(order)
	});
}

function updateOrderNextStep(order) {
	return $.ajax({
		method: 'PUT',
		xhrFields: { withCredentials:true },
		url: DEFAULTS.REST_URL + '/orders/'+order.id+'/nextstep',
		dataType: 'json',
		contentType: 'application/json',
	});
}

function getShoppingList(order_id) {
	return $.ajax({
		method: 'GET',
		xhrFields: {withCredentials:true },
		url: DEFAULTS.REST_URL + '/shoppingList/byOrderId/'+order_id,
		dataType: 'json'
	});
}


/* ORDER CARDS */

function newStatusCard(order) {
	var statusDate;

	switch (order.status.name) {
		case "preluata":
			statusDate = order.placementDate;
		break;
		case "aprovizionata":
			statusDate = order.supplyDate;
		break;
		case "preparata":
			statusDate = order.productionDate;
		break;
		case "pregatita":
			statusDate = order.preparingDate;
		break;
		case "expediata":
			statusDate = order.shippingDate;
		break;
		case "anulata":
			statusDate = order.cancelDate;
		break;
	}

	statusDate = cardDateTime(statusDate);

	var cardStatus = $("<div>").addClass("card").attr({"id": "card-status"})
		.append($("<div>").addClass("card-icon")
			.append($("<div>").addClass("card-bg " + order.status.name.replace(/ /g, "-"))))
		.append($("<div>").addClass("card-details")
			.append($("<div>").addClass("card-title").html("Stare"))
			.append($("<div>").addClass("card-text-big first-big").html(order.status.name))
			.append($("<div>").addClass("card-text-medium").html(statusDate.date + " / " + statusDate.time))
		);
	return cardStatus;
}

function newCards(order) {
	var cardStatus = newStatusCard(order);

	var cardClient = $("<div>").addClass("card").attr({"id": "card-client"})
		.append($("<div>").addClass("card-icon")
			.append($("<div>").addClass("card-bg profil")))
		.append($("<div>").addClass("card-details")
			.append($("<div>").addClass("card-title").html("Client"))
			.append($("<div>").addClass("card-text-big first-big").html(order.client.name))
			.append($("<div>").addClass("card-text-medium").html(order.client.phone))
		);

	var cardAddress = $("<div>").addClass("card").attr({"id": "card-address"})
		.append($("<div>").addClass("card-icon")
			.append($("<div>").addClass("card-bg img-pinlocation")))
		.append($("<div>").addClass("card-details")
			.append($("<div>").addClass("card-title").html("Adresa livrare"))
			.append($("<div>").addClass("card-text-medium").html(order.deliveryAddress.value))
		);

	var dueDate = cardDateTime(order.dueDate);
	var cardDeadline = $("<div>").addClass("card").attr({"id": "card-deadline"})
		.append($("<div>").addClass("card-icon")
			.append($("<div>").addClass("card-bg img-hourglass")))
		.append($("<div>").addClass("card-details")
			.append($("<div>").addClass("card-title").html("Termen livrare"))
			.append($("<div>").addClass("card-text-medium").html(dueDate.date))
			.append($("<div>").addClass("card-text-big").html(dueDate.time))
		);

	var cards = $("<div>").attr({"id": "cards"})
		.append(cardStatus)
		.append(cardDeadline)
		.append(cardClient)
		.append(cardAddress);

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
			.append(newActionsBar(order_id));
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
		})
		.html(detail.servings);

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


/* ORDER PROGRESS BAR */

function newStepperItem(order, text, propName) {
	var item = $("<div>").addClass("stepper-item")
		.append($("<div>").addClass("step-counter"))
		.append($("<div>").addClass("step-name").html(text));

	if (order[propName] != null) {
		item.append($("<div>").addClass("step-date").html(cardDateTime(order[propName]).getDateTime()));
		if (order.status.name != "anulata") {
			item.addClass("completed");
		}
	}
	else {
		if (order.status.name != "anulata") {
			item.on("click", function() {
				$.when(updateOrderNextStep(order)).then(function(updated_order) {
					$('#card-status').replaceWith(newStatusCard(updated_order));
					$('.stepper-wrapper').replaceWith(newStepperBar(updated_order));
				});
			});
		}
	}

	return item;
}

function newStepperBar(order) {
	var sPlacement = newStepperItem(order, "Preluare", "placementDate");
	var sSupply = newStepperItem(order, "Aprovizionare", "supplyDate");
	var sProduction = newStepperItem(order, "Preparare", "productionDate");
	var sPreparing = newStepperItem(order, "Pregatire", "preparingDate");
	var sShipping = newStepperItem(order, "Expediere", "shippingDate");

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

/* ACTIONS BAR */

function newActionsBar(order_id) {
	var closeOrderButton = $("<div>").addClass("action-button")
		.append($("<div>").addClass("action-icon anulata"))
		.append($("<div>").addClass("action-details")
			.append($("<div>").html("Anuleaza"))
			.append($("<div>").html("comanda"))
		)
		.attr({"onclick": null});



	var shoppingListButton = $("<div>").addClass("action-button")
		.append($("<div>").addClass("action-icon img-cart"))
		.append($("<div>").addClass("action-details")
			.append($("<div>").html("Lista"))
			.append($("<div>").html("aprovizionare"))
		)
		.on({"click": () => printShoppingList(order_id)});

	var printReportButton = $("<div>").addClass("action-button")
		.append($("<div>").addClass("action-icon img-cart"))
		.append($("<div>").addClass("action-details")
			.append($("<div>").html("Printare"))
			.append($("<div>").html("raport complet"))
		)
		.on({"click": () => printReport(order_id)});




	return $("<div>").addClass("action-bar")
		.append(closeOrderButton)
		.append(shoppingListButton)
		.append(printReportButton);
}

function newShoppingList(order_id, item_list) {
	var item_table = $("<table>").addClass("shopping-list-table full")
		.append(newHeader(["Ingredient", "Cantitate", "Cost unitar", "Cost total"], [], []).addClass("font-size-120"));

	var total_cost = 0;
	for (item of item_list) {
		total_cost = total_cost + item.quantity * item.ingredient.price;
		item_table.append(newRow([
			item.ingredient.name,
			item.quantity.toFixed(2) + ' ' + item.ingredient.unit.name,
			item.ingredient.price.toFixed(2) + ' Lei',
			(item.quantity * item.ingredient.price).toFixed(2) + ' Lei'
		], [], [], []).addClass("font-size-120"));
	}

	item_table.append(newHeader([,,'Total:',total_cost.toFixed(2) + ' Lei'],[],[]).addClass("font-size-140"));

	return $("<div>")
		.append(item_table);
}

function printShoppingList(order_id) {
	$.when(getShoppingList(order_id).then(function(item_list) {
		var print_date = cardDateTime(new Date().toISOString()).getDateTime();
		var header = $("<div>").addClass("print-header font-size-140")
			.append('Lista aprovizionare pentru comanda #' + order_id)
			.append($('<span>').addClass('fr').html('Tiparit la: ' + print_date))
			.append("<hr/>");

		var shoppingList = newShoppingList(order_id, item_list).addClass("width-print")
			.prepend(header);

		shoppingList.printThis({importCSS: false, loadCSS: "style.css", importStyle: true});
	}));
}

function printReport(order_id) {
	var report = $("#order-details").clone();
	report.addClass("width-print");
	report.find(".order-details-title").remove();
	report.find(".add-button").remove();
	report.find(".action-bar").remove();

	var print_date = cardDateTime(new Date().toISOString()).getDateTime();
	var header = $("<div>").addClass("print-header font-size-140")
		.append('Detalii comanda #' + order_id)
		.append($('<span>').addClass('fr').html('Tiparit la: ' + print_date))
		.append("<hr/>");
	report.prepend(header);


	$.when(getShoppingList(order_id).then(function(item_list) {
		var shoppingList = newShoppingList(order_id, item_list);

		report.append(shoppingList);
		report.printThis({importCSS: false, loadCSS: "style.css", importStyle: true});
	}));
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