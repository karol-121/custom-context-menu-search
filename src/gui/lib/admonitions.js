const admonitions = {

	admonitionBody: document.getElementById("admonition"),
	admonitionContent: document.getElementById("admonition-content"),
	admonitionTitle: document.getElementById("admonition-title"),
	admonitionText: document.getElementById("admonition-text"),
	admonitionDuration: undefined,

	//function shows admonition to the user
	showAdmonition(message, type, duration) {
		
		clearTimeout(this.admonitionDuration);
		
		if (duration) {

			this.admonitionDuration = setTimeout(() => {

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

		this.admonitionTitle.innerText = titles[type];
		this.admonitionText.innerText = message;
		this.admonitionContent.className = types[type];
		this.admonitionBody.className = "admonition-visible";

	},

	hideAdmonition() {

		this.admonitionBody.className = "admonition-hidden";

	}

}