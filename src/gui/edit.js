const add_new_item = document.getElementById("add_new_item");
const title_field = document.getElementById("title_field");
const url_field = document.getElementById("url_field");

let item;

async function getItem() {

	let params = new URLSearchParams(document.location.search);
	let id = params.get("item_id");

	if (!id) {
		// print error message
	}

	item = await browser.runtime.sendMessage({action: "getItem", payload: id});

	if (!item) {
		// print error message
	}

	title_field.value = item.title;
	url_field.value = item.action;

}

add_new_item.addEventListener("submit", async function(e) {

	// consider using html5 form input validation instead

	if (!item) {
		return;
	}

	item.title = title_field.value;
	item.action = url_field.value;

	let success = await browser.runtime.sendMessage({action: "editItem", payload: item});


});


getItem();