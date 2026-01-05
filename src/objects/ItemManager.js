class ItemManager {

	static isGroup(item) {

		return !(!item.actions);

	}

	static isItem(item) {

		return !(!item);

	}

	static isSeparator(item) {

		return item.type === "separator";

	}

	constructor(item) {

		this.item = item;

	}

	setItem(item) {

		this.item = item;

	}

	getItem() {

		return this.item;

	}

	getId() {

		return this.item.id;

	}

	setTitle(title) {

		this.item.title = title;

	}

	getTitle() {

		return this.item.title;

	}

	setAction(url) {

		this.item.action = url;

	}

	getAction() {

		return this.item.action;

	}

	getUrls() {

		return this.item.actions;

	}
	
	getUrl(i) {

		return this.item.actions[i];

	}

	addUrl(url) {

		this.item.actions.push(url);

	}

	editUrl(i, url) {

		this.item.actions[i] = url;

	}

	deleteUrl(i) {

		this.item.actions.splice(i, 1);

	}

	moveUrlUp(i) {

		i = +1; //cast to int

		if (i < 1) {
			return;
		}

		let temp_url = this.item.actions[i - 1];
		this.item.actions[i - 1] = this.item.actions[i];
		this.item.actions[i] = temp_url;

	}

	moveUrlDown(i) {

		i = +i; //cast to int

		if (i > (this.item.actions.length - 2)) {
			return;
		}

		let temp_url = this.item.actions[i + 1];
		this.item.actions[i + 1] = this.item.actions[i];
		this.item.actions[i] = temp_url;

	}

	isUrlsEmpty() {

		return (this.item.actions.length === 0);

	}

	isGroup() {

		return ItemManager.isGroup(this.item);

	}

	isItem() {

		return ItemManager.isItem(this.item);		

	}

	isSeparator() {

		return ItemManager.isSeparator(this.item);

	}

}