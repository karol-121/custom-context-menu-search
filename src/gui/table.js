const table = {
	table_body: document.getElementById("table_body"),
	onEditButton: null,
	onMoveUpButton: null,
	onMoveDownButton: null,
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

			const move_up_button = document.createElement('button');
				move_up_button.className = "btn btn-secondary";
				move_up_button.innerText = "˄";
				move_up_button.item_id = id;
				move_up_button.onclick = this.onMoveUpButton;

			const move_down_button = document.createElement('button');
				move_down_button.className = "btn btn-secondary";
				move_down_button.innerText = "˅";
				move_down_button.item_id = id;
				move_down_button.onclick = this.onMoveUpButton;

			const edit_button = document.createElement('button');
				edit_button.className = "btn btn-secondary";
				edit_button.innerText = "Edit";
				edit_button.item_id = id;
				edit_button.onclick = this.onEditButton;

			const delete_button = document.createElement('button');
				delete_button.className = "btn btn-secondary";
				delete_button.innerText = "Del";
				delete_button.item_id = id;
				delete_button.onclick = this.onDeleteButton;

			cell_title.appendChild(title_span);
			cell_url.appendChild(url_span);
			cell_manage.appendChild(move_up_button);
			cell_manage.appendChild(move_down_button);
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