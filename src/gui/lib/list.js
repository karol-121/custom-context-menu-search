const list = {
	ul: document.getElementById("list"),
	selected: null,
	onSelection: null,
	messageSpan: null,

	onClick(e) {

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

	},

	getSelectionId() {

		if (!this.selected) {

			return -1;

		}

		return this.selected.getAttribute("data-id");

	},

	getSelectionIndex() {

		if (!this.selected) {

			return -1;

		}

		if (this.ul.children.length === 0) {

			return -1;

		}

		let i = 0;

		while (this.ul.children[i].firstChild != this.selected) {

			i++;

		}

		return i;

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

	removeEmpty() {

		if (this.messageSpan) {

			this.ul.removeChild(this.messageSpan);

		}

	},

	printUrl(url) {
		const li = document.createElement('li');
			li.className = "margin-03";

		const button = document.createElement('button');
			button.className = ("flex-element width-100 btn-small btn-secondary btn-hover");
			button.setAttribute("data-id","-1");
			button.onclick = (e) => this.onClick(e);

		const div = document.createElement('div');
			div.className = "flex-grow-1 margin-03-y";
			div.innerText = url;

		button.appendChild(div);
		li.appendChild(button);
		this.ul.appendChild(li);

		this.removeEmpty();

	},

	printSeparator(separator) {

		const li = document.createElement('li');
			li.className = "margin-03";

		const button = document.createElement('button');
			button.setAttribute("data-id", separator.id);
			button.className = ("flex-element width-100 btn-small btn-secondary btn-hover")
			button.onclick = (e) => this.onClick(e);

		const hr = document.createElement('hr');

		button.appendChild(hr);
		li.appendChild(button);
		this.ul.appendChild(li);

		this.removeEmpty();

	},

	printGroup(group) {

		const li = document.createElement('li');
			li.className = "margin-03";

		const button = document.createElement('button');
			button.setAttribute("data-id", group.id);
			button.className = ("flex-element width-100 btn-small btn-secondary btn-hover")
			button.onclick = (e) => this.onClick(e);

		const title_div = document.createElement('div');
			title_div.className = "flex-grow-1 margin-03-y no-wrap width-30";
			title_div.innerText = item.title;

		const url_div = document.createElement('div');
			url_div.className = "flex-grow-1 margin-03-y txt-secondary no-wrap width-60";
			url_div.innerHTML = "<i>Group</i>";

		button.appendChild(title_div);
		button.appendChild(url_div);
		li.appendChild(button);
		this.ul.appendChild(li);

		this.removeEmpty();

	},

	printItem(item) {

		const li = document.createElement('li');
			li.className = "margin-03";

		const button = document.createElement('button');
			button.setAttribute("data-id", item.id);
			button.className = ("flex-element width-100 btn-small btn-secondary btn-hover")
			button.onclick = (e) => this.onClick(e);

		const title_div = document.createElement('div');
			title_div.className = "flex-grow-1 margin-03-y no-wrap width-30";
			title_div.innerText = item.title;

		const url_div = document.createElement('div');
			url_div.className = "flex-grow-1 margin-03-y txt-secondary no-wrap width-60";
			url_div.innerText = item.action;

		button.appendChild(title_div);
		button.appendChild(url_div);
		li.appendChild(button);
		this.ul.appendChild(li);

		this.removeEmpty();

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