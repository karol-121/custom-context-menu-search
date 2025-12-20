const admonitions = {

	admonition_body: document.getElementById("admonition"),
	admonition_content: document.getElementById("admonition-content"),
	admonition_title: document.getElementById("admonition-title"),
	admonition_text: document.getElementById("admonition-text"),
	admonition_duration: undefined,

	//function shows admonition to the user
	showAdmonition(message, type, duration) {
		
		clearTimeout(this.admonition_duration);
		
		if (duration) {

			this.admonition_duration = setTimeout(() => {

				this.hideAdmonition();

			}, duration); 

		}

		const types = {
			error: "admonition-error",
			info: "admonition-info"
		}

		const titles = {
			error: "Error: ",
			info: "Success: "
		}

		this.admonition_title.innerText = titles[type];
		this.admonition_text.innerText = message;
		this.admonition_content.className = types[type];
		this.admonition_body.className = "admonition-visible";

	},

	hideAdmonition() {

		this.admonition_body.className = "admonition-hidden";

	}

}