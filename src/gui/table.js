const table = {
	table_body: document.getElementById("table_body"),
	onEditButton: null,
	onDeleteButton: null,

	createRow(id, title, url, type) {
		
		const row = document.createElement('tr');

		if (type === "separator") {

			const cell_title = document.createElement('td');
				cell_title.className = "width-35";

			const title_text = document.createElement('hr');
			
			cell_title.appendChild(title_text);
			
			row.appendChild(cell_title);
		}

		if (type != "separator") {

			const cell_title = document.createElement('td');
				cell_title.className = "width-30";

			const title_span = document.createElement('span');
				title_span.innerText = title;

			const cell_url = document.createElement('td');
				cell_url.className = "width-30";

			const url_span = document.createElement('span');
				url_span.innerText = url;

			const cell_manage = document.createElement('td');
				cell_manage.className = "width-40";

			const edit_button = document.createElement('button');
				edit_button.className = "btn btn-primary";
				edit_button.innerText = "Edit";
				edit_button.item_id = id;
				edit_button.onclick = this.onEditButton;

			const delete_button = document.createElement('button');
				delete_button.className = "btn btn-primary";
				delete_button.innerText = "Delete";
				delete_button.item_id = id;
				delete_button.onclick = this.onDeleteButton;

			cell_title.appendChild(title_span);
			cell_url.appendChild(url_span);
			cell_manage.appendChild(edit_button);
			cell_manage.appendChild(delete_button);

			row.appendChild(cell_title);
			row.appendChild(cell_url);
			row.appendChild(cell_manage);
		}
		
		this.table_body.appendChild(row);

	},

	resetTable() {

		while (this.table_body.firstChild) {

    	this.table_body.removeChild(this.table_body.lastChild);

  	}

	},

}