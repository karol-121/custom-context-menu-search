//global regex values
const MESSAGE_INVALID_TITLE = "Provided title is invalid!";
const MESSAGE_INVALID_URL = "Provided url is invalid!";
const MESSAGE_INVALID_EMPTY = "There is nothing to be saved!";

const title_regex = /^.{1,30}$/;
const action_regex = /^\S{3,200}$/;

function validateTitle(title) {
	return title_regex.test(title);
}

function validateAction(action) {
	return action_regex.test(action);
}