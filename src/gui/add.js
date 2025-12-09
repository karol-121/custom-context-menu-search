
const add_new_item = document.getElementById("add_new_item");

add_new_item.addEventListener("click", async function(e) {
	
	const item = new contextMenuItem("example", "example.com/?=", "normal");

	let success = await browser.runtime.sendMessage({action: "addItem", payload: item});

});