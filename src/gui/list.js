const list = {
	ul: document.getElementById("list"),
	onEditButton: null,
	onUpButton: null,
	onDownButton: null,

	resetList() {

		while (this.ul.firstChild) {

    	this.ul.removeChild(this.ul.lastChild);

  	}

	},

	printEmpty() {
		const span = document.createElement('span');
			span.className = "txt-secondary";
			span.innerText = "The list is empty";
		this.ul.appendChild(span);
	},

	createListItem(id, title, url, type) {

		const li = document.createElement('li');
			li.className = "flex-element hover-show";

		if (type === "normal") {
			const title_div = document.createElement('div');
			title_div.className = "flex-grow-1 margin-02 no-wrap width-20";
			title_div.innerText = title;

			const url_div = document.createElement('div');
				url_div.className = "flex-grow-1 margin-02 txt-secondary no-wrap width-20";
				url_div.innerText = url;

			li.appendChild(title_div);
			li.appendChild(url_div);
		}

		if (type === "separator") {
			const hr = document.createElement('hr');

			const hr_div = document.createElement('div');
				hr_div.className = "flex-grow-2 margin-04 width-40";
				hr_div.appendChild(hr);
			
			li.appendChild(hr_div);

		}

		const manage_div = document.createElement('div');
			manage_div.className = "flex-grow-1 margin-02 width-20";
			manage_div.setAttribute("data-id", id);
			manage_div.setAttribute("data-type", type);

		const edit_button = document.createElement('button');
			edit_button.className = "btn btn-secondary";
			edit_button.innerText = "⛭";
			edit_button.onclick = (e) => {

				let id = e.target.parentElement.getAttribute("data-id");
				let type = e.target.parentElement.getAttribute("data-type");

				this.onEditButton(id, type);

			}

		const up_button = document.createElement('button');
			up_button.className = "btn btn-secondary";
			up_button.innerText = "🡡";
			up_button.onclick = (e) => {

				let id = e.target.parentElement.getAttribute("data-id");
				this.onUpButton(id);

			}

		const down_button = document.createElement('button');
			down_button.className = "btn btn-secondary";
			down_button.innerText = "🡣";
			down_button.onclick = (e) => {

				let id = e.target.parentElement.getAttribute("data-id");
				this.onDownButton(id);
				
			}


		manage_div.appendChild(edit_button);
		manage_div.appendChild(up_button);
		manage_div.appendChild(down_button);

		li.appendChild(manage_div);
		

		this.ul.appendChild(li);

	}
}