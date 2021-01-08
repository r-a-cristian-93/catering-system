var REST_URL = "http://localhost:8888"
var CLIENT_URL = "http://localhost:8080"

/* ************* TABLE ************* */

function newRow(arrayVal) {
	var tr = $("<tr>").attr({"id": arrayVal[0]});
	for(val of arrayVal) {
		tr.append($("<td>").text(val));
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

function deleteModal(divId) {
	$("#"+divId).remove();
}

class ModalBuilder {
	constructor(title, divId) {
		this.form = newForm("form-modal", "form-big");
		this.title = $("<h2>").addClass("modal-title").text(title)
		this.modalContainer = $("<div>").addClass("modal-container").append(
				$("<div>").addClass("modal-box")
					.append(
						$("<div>").addClass("modal-top")
							.append(
								$("<span>").addClass("modal-close").html("&times;").attr({"onclick": "deleteModal('"+divId+"')"}))
							.append(this.title)
					)
					.append(
						$("<div>").addClass("modal-content").append(this.form)
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
	addExtraBox(title){
		this.modalContainer.append(
			$("<div>").addClass("modal-box")
					.append(
						$("<div>").addClass("modal-top")
							.append(
								$("<h2>").addClass("modal-title").text(title)
							)
					)
					.append(
						$("<div>").addClass("modal-content").attr({"id": "extra"})
					)
				);
		}
}
