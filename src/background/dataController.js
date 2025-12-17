const dataController = {

	async getItem(id) {

		let data = await storageController.getData();

		for (item of data.items) {

			if (item.id === id) {

				return item;
				
			}

		}

		return false;

	},

	async addItem(item) {

		let data = await storageController.getData();

		if (!data.items) {

			data.items = [];

		}

		data.items.push(item);

		return await storageController.setData(data);


	},

	async editItem(itemEdited) {

		let data = await storageController.getData();

		data.items.forEach((element, index) => {

    	if(element.id === itemEdited.id) {

        data.items[index] = itemEdited;
        return; //use break or something that stops forEach 

    	}

		});

		return await storageController.setData(data);


	},

	async deleteItem(item) {

	}



}