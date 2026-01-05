const titleField = document.getElementById("title-field");
const submitButton = document.getElementById("submit-button");
const cancelButton = document.getElementById("cancel-button");

async function addGroup() {

	//add required attribute after submiting to prevent :invalid pseudoclass being applied before user input
	titleField.setAttribute("required", "");

	if (!titleField.checkValidity()) {

		titleField.reportValidity();
		admonitions.showAdmonition(MESSAGE_INVALID_TITLE,"error");
		return;

	}

	let group = new ContextMenuGroup(titleField.value, []);
	let success = await browser.runtime.sendMessage({action: "addItem", payload: group.export()});

	if (success) {

		window.location.replace("manage.html");
		return;
		
	}

	admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");

}

function cancel() {

	window.location.replace("manage.html");

}

submitButton.onclick = addGroup;
cancelButton.onclick = cancel;