//global regex values
const MESSAGE_INVALID_TITLE = "Provided title is invalid.";
const MESSAGE_INVALID_URL = "Provided url is invalid."

const title_regex = /^.{1,30}$/;
const action_regex = /^\S{3,200}$/;
const selection_regex = /^.{1,200}$/;

const protocol_regex = /^\S{1,5}:\/\//; //match values that begins with protocol


function validateTitle(title) {
	return title_regex.test(title);
}

function validateAction(action) {
	return action_regex.test(action);
}

function startsWithProtocol(link) {
	return protocol_regex.test(link);
}

function validateSelection(selection) {
	return selection_regex.test(selection);
}