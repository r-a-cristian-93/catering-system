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


function orderDetailsBuildView(args) {
    $.when(args.getFunction(args.order_id)).then(function(order) {
        console.log(order);

        $("#order-details").html(args.order_id);
    });
}

function orderDetailsView(args) {
	args.buildFunction = orderDetailsView;
	args.getFunction = getOrderDetails;
	orderDetailsBuildView(args);
}