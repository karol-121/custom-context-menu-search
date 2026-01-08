const titleField = document.getElementById("title-field");
const urlFieldset = document.getElementById("url-fieldset");
const urlField = document.getElementById("url-field");
const handlingSelect = document.getElementById("handling-select");
const submitButton = document.getElementById("submit-button");
const cancelButton = document.getElementById("cancel-button");

async function addItem() {

	//add required attribute after submiting to prevent :invalid pseudoclass being applied before user input
	titleField.setAttribute("required", "");
	urlField.setAttribute("required", "");

	if (!titleField.checkValidity()) {

		titleField.reportValidity();
		admonitions.showAdmonition(MESSAGE_INVALID_TITLE,"error");
		return;

	}

	if (!urlField.checkValidity()) {

		urlField.reportValidity();
		admonitions.showAdmonition(MESSAGE_INVALID_URL,"error");
		return;

	}

	let item = new ContextMenuItem(titleField.value, urlField.value);
	let success = await browser.runtime.sendMessage({action: "addItem", payload: item.export()});

	if (success) {

		window.location.replace("manage.html");
		return;
		
	}

	admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");

}

async function addHandling() {

	//add required attribute after submiting to prevent :invalid pseudoclass being applied before user input
	titleField.setAttribute("required", "");

	if (!titleField.checkValidity()) {

		titleField.reportValidity();
		admonitions.showAdmonition(MESSAGE_INVALID_TITLE,"error");
		return;

	}

	let handling = new ContextMenuHandling(titleField.value, handlingSelect.value);
	let success = await browser.runtime.sendMessage({action: "addItem", payload: handling.export()});

	if (success) {

		window.location.replace("manage.html");
		return;
		
	}

	admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");

}

function submit() {

	if (handlingSelect.value > 0) {

		addHandling();
		return;

	}

	addItem();

}

function changeHandling() {
	
	
	if (handlingSelect.value > 0) {

		urlFieldset.classList.add("hidden-element");
		return;

	}

	urlFieldset.classList.remove("hidden-element");
	
}

function cancel() {

	window.location.replace("manage.html");

}

submitButton.onclick = submit;
handlingSelect.onchange = changeHandling;
cancelButton.onclick = cancel;