
const add_new_item = document.getElementById("add_new_item");
const title_field = document.getElementById("title_field");
const url_field = document.getElementById("url_field");

add_new_item.addEventListener("submit", async function(e) {

	// consider using html5 form input validation instead
	
	const item = new contextMenuItem(title_field.value, url_field.value, "normal");

	let success = await browser.runtime.sendMessage({action: "addItem", payload: item});


});