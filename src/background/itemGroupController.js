const itemGroupController = {

	groupItem: null,

	addUrl(url) {

		if (!this.groupItem || !this.groupItem.actions) {

			return false;

		}

		this.groupItem.actions.push(url);

		return true;

	},

	editUrl(index, url) {

		if (!this.groupItem || !this.groupItem.actions) {

			return false;

		}

		this.groupItem.actions[index] = url;

		return true;

	},

	deleteUrl(index) {

		if (!this.groupItem || !this.groupItem.actions) {

			return false;

		}

		this.groupItem.actions.splice(index, 1);

		return true;

	},

	moveUrlUp(index) {

		if (!this.groupItem || !this.groupItem.actions) {

			return false;

		}

		if (index < 0 && index >= this.groupItem.actions.length) {
		
			return false;

		}

		if (index === 0) {

			return true;

		}

		let temp_url = this.groupItem.actions[index - 1];
		this.groupItem.actions[index - 1] = this.groupItem.actions[index];
		this.groupItem.actions[index] = temp_url;

		return true;

	},

	moveUrlDown(index) {

		if (!this.groupItem || !this.groupItem.actions) {

			return false;

		}

		if (index < 0 && index >= this.groupItem.actions.length) {
		
			return false;

		}

		if (index === (this.groupItem.actions.items.length - 1)) {

			return true;
			
		}

		let temp_url = this.groupItem.actions[index + 1];
		this.groupItem.actions[index + 1] = this.groupItem.actions[index];
		this.groupItem.actions[index] = temp_url;

		return true;

	}
}