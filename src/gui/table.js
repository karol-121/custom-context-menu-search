const table = {
	table_body: document.getElementById("table_body"),
	onEditButton: null,
	onMoveUpButton: null,
	onMoveDownButton: null,
	onDeleteButton: null,

	printEmpty() {

		const span = document.createElement('span');
			span.className = "txt-secondary";	
			span.innerText = "The list is empty";

		table_body.appendChild(span);
	},

	createRow(id, title, url, type) {
		
		const row = document.createElement('tr');

		// todo redo way the row are created based on type

		if (type === "separator") {

			const cell_title = document.createElement('td');
				cell_title.setAttribute("colspan", "2");

			const title_text = document.createElement('hr');
			
			cell_title.appendChild(title_text);
			
			row.appendChild(cell_title);
		}

		if (type != "separator") {

			const cell_title = document.createElement('td');
				cell_title.className = "width-30";

			const title_span = document.createElement('div');
				title_span.className = "hide-overflow";
				title_span.innerText = title;

			const cell_url = document.createElement('td');
				cell_url.className = "";

			const url_span = document.createElement('div');
				url_span.className = "txt-secondary hide-overflow";
				url_span.innerText = url;	

			cell_title.appendChild(title_span);
			cell_url.appendChild(url_span);

			row.appendChild(cell_title);
			row.appendChild(cell_url);
		}
		
		const cell_manage = document.createElement('td');
			cell_manage.className = "width-30";

		const move_up_button = document.createElement('button');
			move_up_button.className = "btn btn-secondary";
			move_up_button.innerText = "˄";
			move_up_button.item_id = id;
			move_up_button.onclick = this.onMoveUpButton;

		const move_down_button = document.createElement('button');
			move_down_button.className = "btn btn-secondary";
			move_down_button.innerText = "˅";
			move_down_button.item_id = id;
			move_down_button.onclick = this.onMoveDownButton;

		const edit_button = document.createElement('button');
			edit_button.className = "btn btn-secondary";
			edit_button.innerText = "*";
			edit_button.item_id = id;
			edit_button.onclick = this.onEditButton;

		const delete_button = document.createElement('button');
			delete_button.className = "btn btn-secondary";
			delete_button.innerText = "X";
			delete_button.item_id = id;
			delete_button.onclick = this.onDeleteButton;

		cell_manage.appendChild(move_up_button);
		cell_manage.appendChild(move_down_button);
		cell_manage.appendChild(edit_button);
		cell_manage.appendChild(delete_button);

		row.appendChild(cell_manage);
		
		this.table_body.appendChild(row);

	},

	resetTable() {

		while (this.table_body.firstChild) {

    	this.table_body.removeChild(this.table_body.lastChild);

  	}

	},

}