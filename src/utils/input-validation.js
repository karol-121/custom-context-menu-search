const title_regex = /^.{1,30}$/;
const url_regex = /^\S{3,200}$/;

function validateTitle(title) {
	return title_regex.test(title);
}

function validateUrl(url) {
	return url_regex.test(url);
}