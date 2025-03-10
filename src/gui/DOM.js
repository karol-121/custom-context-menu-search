const table = {
	table_body: document.getElementById("table_body"),
	selected_row: null,
	onRowSelectionUpdate: null,

	deleteRow(row) {

		this.table_body.removeChild(row);
		this.deselectRow();

	},

	createRow(title, url, type) {
		
		const row = document.createElement('tr');

		const cell_select = document.createElement('td');
			cell_select.className = "width-5";

		const type_input = document.createElement('input');
			type_input.type = "hidden";
			type_input.value = type;
		cell_select.appendChild(type_input);


		const select_input = document.createElement('input');
			select_input.type = "checkbox";
			select_input.parentRow = row;
			select_input.addEventListener('change', function (e) {

				if (this.checked) {
					table.selectRow(e.target.parentRow);
				}

				if (!this.checked) {
					table.deselectRow(e.target.parentRow);
				}

			});

		cell_select.appendChild(select_input);		
	
		row.appendChild(cell_select);

		// todo: try to add second hr tag to the url cell in order to make separator appear on the whole width

		if (type === "separator") {

			const cell_title = document.createElement('td');
				cell_title.className = "width-35";

			const title_text = document.createElement('hr');
			
			cell_title.appendChild(title_text);
			
			row.appendChild(cell_title);
		}

		if (type != "separator") {

			const cell_title = document.createElement('td');
				cell_title.className = "width-35";

			const title_input = document.createElement('input');
				title_input.type = "text";
				title_input.placeholder = "example search";
				title_input.value = title;

			const cell_url = document.createElement('td');
				cell_url.className = "width-60";

			const url_input = document.createElement('input');
				url_input.type = "text";
				url_input.placeholder = "www.example.com/?q=%s";
				url_input.value = url;

			cell_title.appendChild(title_input);
			cell_url.appendChild(url_input);

			row.appendChild(cell_title);
			row.appendChild(cell_url);
		}
		
		this.table_body.appendChild(row);

	},

	deselectRow() {

		if (this.selected_row) {

			this.selected_row.cells[0].children[1].checked = false;

		}

		this.selected_row = null;
		this.onRowSelectionUpdate(true); //check if function is defined

	},

	selectRow(row) {

		if (this.selected_row) {

			this.selected_row.cells[0].children[1].checked = false;

		}

		this.selected_row = row;
		this.onRowSelectionUpdate(false); //check if function is defined
		this.selected_row.cells[0].children[1].checked = true;

	},

	moveRowUp(row) {

		if (row.previousSibling) {
			
			this.table_body.insertBefore(row, row.previousSibling);

		} 

	},

	moveRowDown(row) {

		if (row.nextSibling) {

			this.table_body.insertBefore(row.nextSibling, row);
			
		} 

	},

	resetTable() {

		while (this.table_body.firstChild) {

    	this.table_body.removeChild(this.table_body.lastChild);

  	}

  	this.deselectRow();

	},

	getUserItems() {

		const userItems = {
			items: []
		}
	
		for (row of this.table_body.rows) {

			let userItem = this.getUserItem(row);

			if (userItem.error) {

				userItems.error = true
				userItems.errorMessage = userItem.errorMessage;
				return userItems;

			}

			if (!userItem.empty) {

				userItems.items.push(userItem);

			}

		}

		return userItems;

	},

	getUserItem(row) {

		const userItem = {};

		if (row.cells[0].children[0].value === "separator") {

			// todo do not add separator if previous checked row was also spearator
			// this should ensure that is not possible to save multipe separators in row 
			return new contextMenuItem("", "", "separator");

		}

		let title_field = row.cells[1].children[0];
		let url_field = row.cells[2].children[0];

		let title = title_field.value;
		let url = url_field.value;

		title = title.trim();
		url = url.trim();

		if (title === "" && url === "") {

			userItem.empty = true;
			return userItem;

		}

		if (!validateTitle(title)) {

			title_field.setCustomValidity(MESSAGE_INVALID_TITLE);
			userItem.error = true;
			userItem.errorMessage = MESSAGE_INVALID_TITLE;
			return userItem;

		}

		//reset custom validity, in case the value has been corrected
		title_field.setCustomValidity("");

		if (!validateUrl(url)) {

			url_field.setCustomValidity(MESSAGE_INVALID_URL);
			userItem.error = true;
			userItem.errorMessage = MESSAGE_INVALID_URL;
			return userItem;

		}

		//reset custom validity, in case the value has been corrected
		url_field.setCustomValidity("");

		return new contextMenuItem(title, url, "normal");

	}

}

const admonitions = {

	admonition_body: document.getElementById("admonition"),
	admonition_content: document.getElementById("admonition-content"),
	admonition_title: document.getElementById("admonition-title"),
	admonition_text: document.getElementById("admonition-text"),
	admonition_duration: undefined,

	//function shows admonition to the user
	showAdmonition(message, type, duration) {
		
		clearTimeout(this.admonition_duration);
		
		if (duration) {

			this.admonition_duration = setTimeout(() => {

				this.hideAdmonition();

			}, duration); 

		}

		const types = {
			error: "admonition-error",
			info: "admonition-info"
		}

		const titles = {
			error: "Error: ",
			info: "Success: "
		}

		this.admonition_title.innerText = titles[type];
		this.admonition_text.innerText = message;
		this.admonition_content.className = types[type];
		this.admonition_body.className = "admonition-visible";

	},

	hideAdmonition() {

		this.admonition_body.className = "admonition-hidden";

	}

}

const suggestions = {

	suggestions_box: document.getElementById("suggestions_box"),
	onSuggestionClicked: undefined,

	populate(suggestions) {

		this.reset();

		if (!suggestions || suggestions.length === 0) {

			const info_span = document.createElement("span");
				info_span.className = "txt-secondary"
				info_span.innerText = MESSAGE_NOTHING_FOUND;

				this.suggestions_box.append(info_span);
				return;
		}

		for (suggestion of suggestions) {
			
			const suggestion_button = document.createElement("button");
				suggestion_button.className = "btn-secondary";
				suggestion_button.innerText = suggestion.title;
				suggestion_button.origin = this;
				suggestion_button.addEventListener('click', function (e) {

					this.origin.onSuggestionClicked(this.innerText);

				});

				this.suggestions_box.append(suggestion_button);
		}

		if (suggestions.length > 4) {

			const more_span = document.createElement("span");
				more_span.innerText = "...";

			this.suggestions_box.append(more_span);

		}

	},

	reset() {

		this.suggestions_box.innerHTML = "";

	}

}

const add_row_button = document.getElementById("add_new_row");
const add_separator_button = document.getElementById("add_new_separator");
const remove_row_button = document.getElementById("remove_row");
const move_row_up_button = document.getElementById("move_up_row");
const move_row_down_button = document.getElementById("move_down_row");

const search_suggestions = document.getElementById("search_suggestions");
const save_button = document.getElementById("save");
const file_export = document.getElementById("file_export");
const file_import = document.getElementById("file_import");