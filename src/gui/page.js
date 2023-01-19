//upon successful reading from storage
function onSuccess(status) {
	browser.runtime.sendMessage({updated: true});
	console.log(status);
}

//upon failed reading from storage
function onError(error) {
	console.log(error);
}

//upon receiving context menu items from storage
function onReceivied(item) {

	const items = item.items;

	//create row for each menu item
	for(item of items) {
		const row = createRow(item.title, item.contexts, item.action);
		table_body.appendChild(row);
	}

}

//removes row in table
function deleteRow(row) {
	table_body.removeChild(row);
}

//creates row in table
function createRow(title, context, url) {
	//row
	const row = document.createElement('tr');

	//title cell
	const cell_title = document.createElement('td');
	const title_input = document.createElement('input');
		title_input.value = title;
	cell_title.appendChild(title_input);

	//context cell
	const cell_context = document.createElement('td');
	const context_input = document.createElement('input');
		context_input.value = context;
	cell_context.appendChild(context_input);

	//url cell
	const cell_url = document.createElement('td');
	const url_input = document.createElement('input');
		url_input.value = url;
	cell_url.appendChild(url_input);

	//manage cell
	const cell_manage = document.createElement('td');
	const del_button = document.createElement('button');
		del_button.addEventListener('click', function () { deleteRow(row) }, false);
		del_button.append("delete row");
	cell_manage.appendChild(del_button);
	
	row.appendChild(cell_title);
	row.appendChild(cell_context);
	row.appendChild(cell_url);
	row.appendChild(cell_manage);

	return row;
}

//table
const table_body = document.getElementById("table_body");

//add new row button has been clicked
document.getElementById("add_new_row").addEventListener("click", function(e) {

	//create new row and append it to table
	const row = createRow("","","");
	table_body.appendChild(row);

});

document.getElementById("save").addEventListener("click", function(e) {

	console.log(table_body);
	let items = new Array();

	let count = 0;

	//go through all row and create objects from data
	for (row of table_body.rows) {

		const contextMenuItem = {
			id: row.cells[0].children[0].value + count, //TODO: fix id, make it hash or something
			title: row.cells[0].children[0].value,
			contexts: [row.cells[1].children[0].value],
			action: row.cells[2].children[0].value
		}

		count++;

		items.push(contextMenuItem);
	}


	//save defined context menu items to storage 
	browser.storage.local.set({items}).then(onSuccess,onError);

});

//load defined context menu items from storage
browser.storage.local.get().then(onReceivied, onError)

