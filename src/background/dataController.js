const dataController = {

	async addItem(item) {

		let data = await storageController.getData();

		if (!data.items) {

			data.items = [];

		}

		data.items.push(item);

		return await storageController.setData(data);


	}

}