const testData = {

	storage_empty: {
		items: []
	},

	storage_v2: {
		items: [
			{
				id: "17319286330290",
				title: "Example",
				contexts: ["selection"],
				action: "www.example.com/?search="
			},
			{
				id: "17319286330310",
				title: "Example Foo",
				contexts: ["selection"],
				action: "www.example.com/?search=%s&foo=bar"
			},
			{
				id: "17319286330320",
				title: "Example https",
				contexts: ["selection"],
				action: "https://www.example.com/?search=%s"
			},
		]
	},

	storage_def: {
		items: [
			{
				id: "17319286340290",
				title: "Soundcloud",
				contexts: ["selection"],
				action: "https://soundcloud.com/search?q="
			},
			{
				id: "17319286340291",
				title: "Bandcamp",
				contexts: ["selection"],
				action: "https://bandcamp.com/search?q=%s&item_type"
			}
		]
	}

}


