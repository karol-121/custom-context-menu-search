//global regex values
const title_regex = /[\w]{1,30}/;
const action_regex = /[\w]{1,30}/; //this need to be changed as this does not allow "?, &" etc.

const protocol_regex = /\S{1,5}:\/\/\S*/; //match values that begins with protocol

const selection_regex = /[\w]{1,30}/;


function validateTitle(title) {
	return title_regex.test(title);
}

function validateAction(action) {
	return true;
	//return action_regex.test(action);
}

function startsWithProtocol(link) {
	return protocol_regex.test(link);
}

function validateSelection(selection) {
	return selection_regex.test(selection);
}