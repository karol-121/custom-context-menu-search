const suggestions = {

	suggestionsBox: document.getElementById("suggestions-box"),
	onSuggestionClicked: undefined,

	populate(suggestions) {

		this.reset();

		if (!suggestions || suggestions.length === 0) {

			const infoSpan = document.createElement("span");
				infoSpan.className = "txt-secondary"
				infoSpan.innerText = MESSAGE_NOTHING_FOUND;

				this.suggestionsBox.append(infoSpan);
				return;
		}

		for (suggestion of suggestions) {
			
			const suggestionButton = document.createElement("button");
				suggestionButton.className = "btn btn-hover btn-secondary";
				suggestionButton.innerText = suggestion.title;
				suggestionButton.onclick = (e) => {

					this.onSuggestionClicked(e.target.innerText);

				}

				this.suggestionsBox.append(suggestionButton);
		}

		if (suggestions.length > 4) {

			const moreSpan = document.createElement("span");
				moreSpan.innerText = "...";

			this.suggestionsBox.append(moreSpan);

		}

	},

	reset() {

		this.suggestionsBox.innerHTML = "";

	}

}