const titleField = document.getElementById("title-field");
const submitButton = document.getElementById("submit-button");
const cancelButton = document.getElementById("cancel-button");

async function addGroup(e) {

	e.preventDefault();

	//add required attribute after submiting to prevent :invalid pseudoclass being applied before user input
	titleField.setAttribute("required", "");

	if (!titleField.checkValidity()) {

		titleField.reportValidity();
		admonitions.showAdmonition(MESSAGE_INVALID_TITLE,"error");
		return;

	}

	const group = new contextMenuItemGroup(titleField.value);

	let success = await browser.runtime.sendMessage({action: "addItem", payload: group});

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

submitButton.onclick = addGroup;
cancelButton.onclick = cancel;