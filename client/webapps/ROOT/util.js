var REST_URL = "http://localhost:8888"
var CLIENT_URL = "http://localhost:8080"

/* ************* TABLE ************* */

function newRow(arrayVal, editable) {
	var tr = $("<tr>").attr({"id": arrayVal[0]});
	var index = 0;
	for(val of arrayVal) {
		if(editable && editable[index]!=0) {
			tr.append($("<td contenteditable>").append(val));
		}
		else {
			tr.append($("<td>").append(val));
		}
		index++
	}
	return tr;
}

function newHeader(arrayVal){
	var tr = $("<tr>");
	for(val of arrayVal) {
		tr.append($("<th>").text(val));
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
		this.form = newForm("form-modal", "form-big");
		this.content = $("<div>").addClass("modal-content").append(this.form);
		this.title = $("<h2>").addClass("modal-title").text(title);
		this.modalContainer = $("<div>").addClass("modal-container").append(
				$("<div>").addClass("modal-box")
					.append(
						$("<div>").addClass("modal-top")
							.append(
								$("<span>").addClass("modal-close").html("&times;").attr({"onclick": "deleteModal('"+divId+"')"}))
							.append(this.title)
					)
					.append(
						this.content
					)
				);
		this.modal = $("<div>").addClass("modal").attr({"id": divId}).append(this.modalContainer);			
	}
	addLabel(text) {
		this.form.append(newLabel(text));
	}
	addField(name, value) {
		this.form.append(newField(name, value));
	}
	addButton(name, action) {
		this.form.append(newButton(name, action));
	}
	addSelect(name) {
		this.form.append(newSelect(name));
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
