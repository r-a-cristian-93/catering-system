var DEFAULTS = Object.freeze({
	REST_URL: "http://localhost:8888",
	CLIENT_URL: "http://localhost:8080",
});

var DEFAULT_PREFERENCES = {
	PAGE_SIZE: 10,
	SORT_DIRECTION: "ASC",
	ORDERS_SORT_BY: "deliveryDate",
	UNITS: [],
	CATEGORIES: [],
};


$(document).ready(function() {
	$.when(getUnits()).then(function(unitsList){

		var unitsArray = [];
		for(unit of unitsList) {
			unitsArray.push(unit.name);
		}

		DEFAULT_PREFERENCES.UNITS = JSON.stringify(unitsArray);

		Object.keys(DEFAULT_PREFERENCES).forEach(function(key) {
			localStorage.setItem(key, DEFAULT_PREFERENCES[key]);
		});
	});

	$.when(getCategories()).then(function(categoriesList){

		var categoriesArray = [];
		for(categories of categoriesList) {
			categoriesArray.push(categories.name);
		}

		DEFAULT_PREFERENCES.CATEGORIES = JSON.stringify(categoriesArray);

		Object.keys(DEFAULT_PREFERENCES).forEach(function(key) {
			localStorage.setItem(key, DEFAULT_PREFERENCES[key]);
		});
	});
});


/* ************* TABLE ************* */

function newRow(arrayVal, editable, attrList, classList) {
	var tr = $("<tr>").attr({"id": arrayVal[0]});
	var index = 0;
	for(val of arrayVal) {
		var td = $("<td>").html(val);
		if(editable && editable[index]==1) {
			td.attr({"contenteditable": true});
		}
		if(attrList && attrList[index]!=null) {
			td.attr(attrList[index]);
		}
		if(classList && classList[index]!=null) {
			for (cls of classList[index]) {
				td.addClass(cls);
			}
		}
		tr.append(td);
		index++
	}
	return tr;
}

function newHeader(arrayVal, colspan, classList){
	var tr = $("<tr>");
	var index = 0;
	for(val of arrayVal) {
		var th = $("<th>");
		if(colspan && colspan[index]!=0) {
			th.text(val).attr({"colspan": colspan[index]});
		}
		else {
			th.text(val);
		}
		if(classList && classList[index]!=null) {
			for (cls of classList[index]) {
				th.addClass(cls);
			}
		}
		tr.append(th)
		index++;
	}
	return tr;
}



/* ******************* MODAL ****************** */

function newLabel(text) {
	return $("<label>").append($("<b>").html(text));
}
function newField(name, value) {
	return $("<input>").attr({"name": name, "value": value});
}
function newButton(name, action) {
	return $("<button>").addClass("button").attr({"type": "button", "onclick": action}).html(name);
}
function newForm(name, attrClass) {
	return $("<form>").addClass(attrClass).attr({"name": name});
}
function newSelect(name) {
	return $("<select>").attr({"name": name});
}
function newOption(value, text) {
	return $("<option>").attr({"value": value}).text(text);
}


function deleteModal(divId) {
	$("#"+divId).remove();
}

class ModalBuilder {
	constructor(title, divId) {
		this.extraBox = [];
		this.content = $("<div>").addClass("modal-content");
		this.title = $("<h2>").addClass("modal-title").html(title);
		this.modalContainer = $("<div>").addClass("modal-container").append(
				$("<div>").addClass("modal-box")
					.append(
						$("<div>").addClass("modal-top")
							.append(
								$("<span>").addClass("modal-close no-print").html("&times;").attr({"onclick": "deleteModal('"+divId+"')"}))
							.append(this.title)
					)
					.append(
						this.content
					)
				);
		this.modal = $("<div>").addClass("modal").attr({"id": divId}).append(this.modalContainer);
	}
	addExtraBox(title){
		var index = this.extraBox.length;
		if(this.extraBox[index] != null) {
			index++;
		}
		this.extraBox[index] = new ExtraBox(title, index);
		this.modalContainer.append(this.extraBox[index].box);
	}
}

class ExtraBox {
	constructor(title, index) {
		this.content = $("<div>").addClass("modal-content").attr({"id": "extra-" + index});
		this.box = $("<div>").addClass("modal-box")
					.append(
						$("<div>").addClass("modal-top")
							.append(
								$("<h2>").addClass("modal-title").text(title)
							)
					)
					.append(this.content);
	}
}


/* ******************* INPUT FILTERING ****************** */

function inputOnlyNumbers(e) {
	if (String.fromCharCode(e.which) != ".") {
		if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
	}
}

/* ******************* API CALLS ****************** */

function getUnits() {
	return $.ajax({
		method: 'GET',
		xhrFields: {withCredentials: true },
		url: DEFAULTS.REST_URL + '/units',
	});
}

function getCategories() {
	return $.ajax({
		method: 'GET',
		xhrFields: {withCredentials: true },
		url: DEFAULTS.REST_URL + '/categories',
	});
}
