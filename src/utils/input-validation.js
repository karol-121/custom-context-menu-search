//global regex values
const title_regex = /[\w]{1,30}/gm;
const action_regex = /[\w]{1,30}/gm;

const selection_regex = /[\w]{1,30}/gm;


function validateRowValues(row) {
	const title = row.cells[0].children[0].value;
	const action = row.cells[2].children[0].value;

	if (!title_regex.test(title)) {
		return false;
	}

	if (!action_regex.test(action)) {
		return false;
	}

	return true;
}

function validateSelection(selection) {
	return selection_regex.test(selection);
}