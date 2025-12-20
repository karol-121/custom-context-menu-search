const dataController = {

	async getItem(id) {

		let data = await storageController.getData();

		if (!data.items) {

			return false;

		}

		let index = data.items.findIndex((element) => element.id === id);

		if (index < 0) {

			return false;

		}

		return data.items[index];

	},

	async addItem(item) {

		let data = await storageController.getData();

		if (!data.items) {

			data.items = [];

		}

		data.items.push(item);

		return await storageController.setData(data);


	},

	async editItem(item) {

		let data = await storageController.getData();

		if (!data.items) {

			return false;

		}

		let index = data.items.findIndex((element) => element.id === item.id);

		if (index < 0) {

			return false;

		}

		data.items[index] = item;

		return await storageController.setData(data);


	},

	async deleteItem(id) {

		let data = await storageController.getData();

		if (!data.items) {

			return false;

		}

		let index = data.items.findIndex((element) => element.id === id);

		if (index < 0) {

			return false;

		}

		data.items.splice(index, 1);

		return await storageController.setData(data);

	},

	async moveItemUp(id) {

		let data = await storageController.getData();

		if (!data.items) {

			return false;

		}

		let index = data.items.findIndex((element) => element.id === id);

		if (index < 0) {

			return false;

		}

		if (index === 0) {

			return true; //as item is first, no moving is required

		}

		let temp_item = data.items[index - 1];
		data.items[index - 1] = data.items[index];
		data.items[index] = temp_item;

		return await storageController.setData(data);


	},

	async moveItemDown(id) {

		let data = await storageController.getData();

		if (!data.items) {

			return false;

		}

		let index = data.items.findIndex((element) => element.id === id);

		if (index < 0) {

			return false;

		}

		if (index === (data.items.length - 1)) {

			return true; //as items is last, no moving is required

		}

		let temp_item = data.items[index + 1];
		data.items[index + 1] = data.items[index];
		data.items[index] = temp_item;

		return await storageController.setData(data);
		
	}

}