const suggestions = {

	suggestions_box: document.getElementById("suggestions_box"),
	onSuggestionClicked: undefined,

	populate(suggestions) {

		this.reset();

		if (!suggestions || suggestions.length === 0) {

			const info_span = document.createElement("span");
				info_span.className = "txt-secondary"
				info_span.innerText = MESSAGE_NOTHING_FOUND;

				this.suggestions_box.append(info_span);
				return;
		}

		for (suggestion of suggestions) {
			
			const suggestion_button = document.createElement("button");
				suggestion_button.className = "btn btn-secondary";
				suggestion_button.innerText = suggestion.title;
				suggestion_button.origin = this;
				suggestion_button.addEventListener('click', function (e) {

					this.origin.onSuggestionClicked(this.innerText);

				});

				this.suggestions_box.append(suggestion_button);
		}

		if (suggestions.length > 4) {

			const more_span = document.createElement("span");
				more_span.innerText = "...";

			this.suggestions_box.append(more_span);

		}

	},

	reset() {

		this.suggestions_box.innerHTML = "";

	}

}