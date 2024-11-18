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
				title: "Foo",
				contexts: ["selection"],
				action: "www.example.com/?foo="
			},
			{
				id: "17319286340291",
				title: "Bar",
				contexts: ["selection"],
				action: "www.example.com/?bar=%s&bar=foo"
			}
		]
	}

}


