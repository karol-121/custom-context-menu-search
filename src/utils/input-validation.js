const title_regex = /^.{1,30}$/;
const url_regex = /^\S{3,200}$/;

function validateTitle(title) {
	
	if (!title) {

		return false;

	}

	return title_regex.test(title);

}

function validateUrl(url) {

	if (!url) {

		return false;

	}

	return url_regex.test(url);
	
}