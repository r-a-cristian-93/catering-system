$(document).ready(function(){
	$.ajax({
		method: 'GET',
		xhrFields: { withCredentials: true },
		url: REST_URL + '/ingredients',
		success: function(data, status, xhr) {
			buildTable(data);
		},
		error: function() {
			console.log("ING ERROR");
		}
	});	
});


function newRow(arrayVal) {
	var tr = $("<tr></tr>");
	for(val of arrayVal) {
		tr.append($("<td></td>").text(val));
	}
	return tr;
}

function newHeader(arrayVal){
	var tr = $("<tr></tr>");
	for(val of arrayVal) {
		tr.append($("<th></th>").text(val));
	}
	return tr;
}	

function buildTable(data) {
	var table = $("<table></table>");
	table.append(newHeader(["Nr", "Denumire", "Pret", "Unitate"]));
		
	for(ing of data) {
		table.append(
			newRow([ing.id, ing.name, ing.price + " Lei", ing.unit.name])
				.attr({"onclick": "alert('asd')"}));
	}
	$("#ing-table").append(table);	
}
