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
			}
		]
	},

	storage_v2_4: {
		items: [
			{
				id:"17678720375300",
				title:"Search all (no groups)",
				handling:"2"
			},
			{
				id:"17678720375301",
				title:"Search all",
				handling:"3"
			},
			{
				id:"17678720375302",
				type:"separator"
			},
			{
				id:"17678720375303",
				title:"Examples https",
				actions:[
					"https://www.example.com/?search=",
					"https://www.example.com/?search=%s&foo=bar"
				]
			},
			{
				id:"17678720375304",
				title:"Example",
				action:"www.example.com/?search="
			},
			{
				id:"17678720375316",
				title:"Example foo",
				action:"www.example.com/?search=%s&foo=bar"
			},
			{
				id:"17678720375317",
				type:"separator"
			},
			{
				id:"17678720375318",
				title:"Options page",
				handling:"1"
			}
		]
	}
}


