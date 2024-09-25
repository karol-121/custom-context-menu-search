//upon successful reading from storage
function onSuccess(status) {
	browser.runtime.sendMessage({updated: true});
	window.location.reload();
	console.log(status);
}

//upon failed reading from storage
function onError(error) {
	console.err(error);
}

//upon receiving context menu items from storage
function onReceivied(item) {
	//if items does not exist, return
	if (!item.items) {
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
	let items = new Array();
	
	for(row of table.rows) {
		let item = collectItem(row);

		if (item) {
			items.push(item);
		}
	}

	console.log(items);
	return items;
}

//function that create object from row, returns nothing if values in row are invalid
function collectItem(row) {

	//extract values to validaton
	let title = row.cells[0].children[0].value;
	let action = row.cells[1].children[0].value;

	//prepare values for validation
	title = title.trim();
	action = action.trim();

	//return if any of the following validation fails
	if (!validateTitle(title)) {
		return;
	}

	if (!validateAction(action)) {
		return;
	}

	//if checked values are valid, continue with creation of object
	let random = (Math.random() * 1000); //convert this to int

	const contextMenuItem = {
		id: random.toString(),
		title: title,
		contexts: ["selection"],
		action: action
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
	const title_input = document.createElement('input');
		title_input.placeholder = "example search"
		title_input.value = title;
	cell_title.appendChild(title_input);
	
	//url cell
	const cell_url = document.createElement('td');
	const url_input = document.createElement('input');
		url_input.placeholder = "www.example.com/?q=%s"
		url_input.value = url;
	cell_url.appendChild(url_input);

	//manage cell
	const cell_manage = document.createElement('td');
	const del_button = document.createElement('button');
		del_button.addEventListener('click', function () { deleteRow(row) }, false);
		del_button.className = "btn-danger";
		del_button.append("Delete item");
	cell_manage.appendChild(del_button);
	
	row.appendChild(cell_title);
	row.appendChild(cell_url);
	row.appendChild(cell_manage);

	return row;
}


//entry point
//this is where javaScript start executing code

//table
const table_body = document.getElementById("table_body");
const add_new_row = document.getElementById("add_new_row");
const save = document.getElementById("save");

//load previously defined context menu items from storage
browser.storage.local.get().then(onReceivied, onError);

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

	browser.storage.local.set({items}).then(onSuccess, onError);
});






