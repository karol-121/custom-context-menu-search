const list = {
	ul: document.getElementById("list"),
	selected: null,
	onSelection: null,
	messageSpan: null,

	getSelectionId() {

		if (!this.selected) {

			return -1;

		}

		return this.selected.getAttribute("data-id");

	},

	resetList() {

		while (this.ul.firstChild) {

    	this.ul.removeChild(this.ul.lastChild);

  	}

  	this.selected = null;
  	this.messageSpan = null;
  	this.onSelection();

	},

	printEmpty() {

		const span = document.createElement('span');
			span.className = "txt-secondary";
			span.innerText = "The list is empty";

		this.ul.appendChild(span);
		this.messageSpan = span;

	},

	createListItem(item) {

		const li = document.createElement('li');
			li.className = "margin-03";

		const button = document.createElement('button');
			button.setAttribute("data-id", item.id);
			button.className = ("flex-element width-100 btn-small btn-secondary btn-hover")
			button.onclick = (e) => {

				let target = e.target;

				while (!target.getAttribute("data-id")) {

					target = target.parentElement;

				}

				if (this.selected === target) {

					this.selected.classList.remove("highlight-selected");
					this.selected = null;
					this.onSelection();
					return;

				}
				
				if (this.selected) {

					this.selected.classList.remove("highlight-selected");

				}

				this.selected = target;
				this.selected.classList.add("highlight-selected");
				this.onSelection();
				
			}

		if (item.type === "separator") {
			const hr = document.createElement('hr');
			
			const div = document.createElement('div');
				div.className = "flex-grow-1";
				div.appendChild(hr);
			
			button.appendChild(div);

		}

		if (item.type === "normal" || !item.type) {

			const title_div = document.createElement('div');
				title_div.className = "flex-grow-1 no-wrap width-30";
				title_div.innerText = item.title;

			const url_div = document.createElement('div');
				url_div.className = "flex-grow-1 txt-secondary no-wrap width-60";
				url_div.innerText = item.action;

			button.appendChild(title_div);
			button.appendChild(url_div);
		}


		li.appendChild(button);
		this.ul.appendChild(li);

		if (this.messageSpan) {

			this.ul.removeChild(this.messageSpan);

		}

	},

	moveSelectedUp() {

		if (!this.selected) {

			return;

		}

		if (this.selected.parentElement.previousSibling) {
			
			this.ul.insertBefore(this.selected.parentElement, this.selected.parentElement.previousSibling);

		} 

	},

	moveSelectedDown() {

		if (!this.selected) {

			return;
			
		}

		if (this.selected.parentElement.nextSibling) {

			this.ul.insertBefore(this.selected.parentElement.nextSibling, this.selected.parentElement);
			
		} 

	}
}