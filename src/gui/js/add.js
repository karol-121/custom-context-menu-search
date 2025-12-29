const titleField = document.getElementById("title-field");
const urlField = document.getElementById("url-field");
const submitButton = document.getElementById("submit-button");
const cancelButton = document.getElementById("cancel-button");

async function addItem(e) {

	e.preventDefault();

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

	const item = new contextMenuItem(titleField.value, urlField.value, "normal");

	let success = await browser.runtime.sendMessage({action: "addItem", payload: item});

	if (success) {

		window.location.replace("manage.html");
		return;
		
	}

	admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");

}

function cancel(e) {

	e.preventDefault();

	window.location.replace("manage.html");

}

submitButton.onclick = addItem;
cancelButton.onclick = cancel;