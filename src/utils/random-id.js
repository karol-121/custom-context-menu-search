//key that modifies generated id
const STATIC_KEY = "0";

//functions that creates unique id
//id is a unix epoch that is modified by a static key
//this is to prevent conflict with other generators using the same concept
function generateNewId() {
	let id = Date.now();

	id = id.toString();

	id = id + STATIC_KEY;

	return id;
}