const table = {
	table_body: document.getElementById("table_body"),

	deleteRow(row) {

		this.table_body.removeChild(row);

	},

	createRow(title, url) {
		
		const row = document.createElement('tr');

		const cell_title = document.createElement('td');
			cell_title.className = "width-30";
		const title_input = document.createElement('input');
			title_input.type = "text";
			title_input.placeholder = "example search";
			title_input.value = title;
		cell_title.appendChild(title_input);
	
		const cell_url = document.createElement('td');
			cell_url.className = "width-50";
		const url_input = document.createElement('input');
			url_input.type = "text";
			url_input.placeholder = "www.example.com/?q=%s";
			url_input.value = url;
		cell_url.appendChild(url_input);

		const cell_manage = document.createElement('td');
			cell_manage.className = "width-20";
		const del_button = document.createElement('button');
			del_button.className = "btn-primary";
			del_button.parentRow = row;
			del_button.addEventListener('click', function (e) {
				table.deleteRow(e.target.parentRow);
			});
			del_button.append("Delete item");
		cell_manage.appendChild(del_button);
	
		row.appendChild(cell_title);
		row.appendChild(cell_url);
		row.appendChild(cell_manage);

		this.table_body.appendChild(row);

	},

	resetTable() {

		while (this.table_body.firstChild) {

    	this.table_body.removeChild(this.table_body.lastChild);

  	}

	},

	getUserItems() {

		const userItems = {
			items: []
		}

		if (this.table_body.rows.length < 1) {

			userItems.error = true;
			userItems.errorMessage = MESSAGE_INVALID_EMPTY;
			return userItems;

		}
	
		for (row of this.table_body.rows) {

			let userItem = this.getUserItem(row);

			if (userItem.error) {

				userItems.error = true
				userItems.errorMessage = userItem.errorMessage;
				return userItems;

			}

			userItems.items.push(userItem);

		}

		return userItems;

	},

	getUserItem(row) {

		const userItem = {};

		let title_field = row.cells[0].children[0];
		let url_field = row.cells[1].children[0];

		let title = title_field.value;
		let url = url_field.value;

		title = title.trim();
		url = url.trim();

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

		return new contextMenuItem(title, url);

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

	},

	reset() {

		this.suggestions_box.innerHTML = "";

	}

}

const add_row_button = document.getElementById("add_new_row");
const search_suggestions = document.getElementById("search_suggestions");
const save_button = document.getElementById("save");
const file_export = document.getElementById("file_export");
const file_import = document.getElementById("file_import");