//upon successful saving to storage
function onSaveSuccess(status) {
	//inform background script about updated storage
	browser.runtime.sendMessage({updated: true});
	
	//inform user about success
	showAdmonition(MESSAGE_SAVE_SUCCESS, "info");

	//hide admonition afterwards
	setTimeout(() => {
		hideAdmonition();
	}, "2000")

	//load newly saved items from storage for user to show
	loadFromStorage();
}

//upon failed reading/saving from/to storage
function onError(error) {
	//todo: show admonition upon error, but firstly redo admonitions
	console.err(error);
}

//upon receiving context menu items from storage
function onReceivied(item) {
	//firstly remove all rows from table
	resetTable(table_body);

	//if items does not exist or there is none of them, print default and return
	if (!item.items || item.items.length === 0) {
		// print first table row as default
		const row = createRow("", "");
		table_body.appendChild(row);
		return;
	}

	//create row for each menu item
	for(item of item.items) {
		const row = createRow(item.title, item.action);
		table_body.appendChild(row);
	}
}

//function that retrives values from rows and convert then into array
function collectItems(table) {
	//if table is empty, return as there is no point of proceeding
	if (table.rows.length < 1) {
		showAdmonition(MESSAGE_INVALID_EMPTY, "error");
		return;
	}

	let items = new Array();
	
	for(row of table.rows) {
		let item = collectItem(row);

		//if item does not exist, return
		if (!item) {
			return;
		}

		//otherwise push item to array
		items.push(item);

	}

	// when all items are collected, return items
	return items;
}

//function that create object from row, returns nothing if any value is invalid
function collectItem(row) {

	//referance to input fields
	let title_field = row.cells[0].children[0];
	let url_field = row.cells[1].children[0];

	//extract values to validaton
	let title = title_field.value;
	let url = url_field.value;

	//prepare values for validation
	title = title.trim();
	url = url.trim();

	//if input is invalid, set invalid validity and return
	if (!validateTitle(title)) {
		title_field.setCustomValidity(MESSAGE_INVALID_TITLE);
		showAdmonition(MESSAGE_INVALID_TITLE, "error");
		return;
	}

	//otherwise set valid validty (needed to remove invalid validity if input has been corrected)
	title_field.setCustomValidity("");

	//do the same as above for the second input
	if (!validateUrl(url)) {
		url_field.setCustomValidity(MESSAGE_INVALID_URL);
		showAdmonition(MESSAGE_INVALID_URL, "error");
		return;
	}

	url_field.setCustomValidity("");

	//when all inputs are valid, create object
	const contextMenuItem = {
		id: generateNewId(),
		title: title,
		contexts: ["selection"],
		action: url
	}

	//return object
	return contextMenuItem;
}

//removes row in table
function deleteRow(row) {
	table_body.removeChild(row);
}

//creates row in table
function createRow(title, url) {
	//row
	const row = document.createElement('tr');

	//title cell
	const cell_title = document.createElement('td');
		cell_title.className = "cell-width-title";
	const title_input = document.createElement('input');
		title_input.type = "text";
		title_input.placeholder = "example search";
		title_input.value = title;
	cell_title.appendChild(title_input);
	
	//url cell
	const cell_url = document.createElement('td');
		cell_url.className = "cell-width-url";
	const url_input = document.createElement('input');
		url_input.type = "text";
		url_input.placeholder = "www.example.com/?q=%s";
		url_input.value = url;
	cell_url.appendChild(url_input);

	//manage cell
	const cell_manage = document.createElement('td');
		cell_manage.className = "cell-width-manage";
	const del_button = document.createElement('button');
		del_button.addEventListener('click', function () { deleteRow(row) }, false);
		del_button.append("Delete item");
	cell_manage.appendChild(del_button);
	
	row.appendChild(cell_title);
	row.appendChild(cell_url);
	row.appendChild(cell_manage);

	return row;
}

//removes all rows from table
function resetTable(table) {

	while (table.firstChild) {
    table.removeChild(table.lastChild);
  }
}

//function shows admonition to the user
//todo: redo admonitions
function showAdmonition(message, type) {
	const types = {
		error: "admonition-error",
		info: "admonition-info"
	}

	const titles = {
		error: "Error: ",
		info: "Success: "
	}

	//set text
	admonition_title.innerText = titles[type];
	admonition_text.innerText = message;

	//set apprioate class
	admonition_content.className = types[type];

	//show
	admonition_body.className = "admonition-visible";
}

//function that hides admonition
function hideAdmonition() {
	admonition_body.className = "admonition-hidden";
}

//get saved items from storage
function loadFromStorage() {
	browser.storage.local.get().then(onReceivied, onError);
}


//entry point
//this is where javaScript start executing code

//admonition
const admonition_body = document.getElementById("admonition");
const admonition_content = document.getElementById("admonition-content");
const admonition_title = document.getElementById("admonition-title")
const admonition_text = document.getElementById("admonition-text");

//table
const table_body = document.getElementById("table_body");
const add_new_row = document.getElementById("add_new_row");
const save = document.getElementById("save");


//load previously defined context menu items from storage
loadFromStorage();

//event listener for "add_new_row" button
add_new_row.addEventListener("click", function(e) {
	//create new row and append it to table
	const row = createRow("","");
	table_body.appendChild(row);
});

//event listener for "save" button
save.addEventListener("click", function(e) {
	//save defined context menu items to storage
	const items = collectItems(table_body);

	//if items has not been collected, then return
	if (!items) {
		return;
	}

	browser.storage.local.set({items}).then(onSaveSuccess, onError);
});






