//constants
const SELECTION_TEXT_MAXLENGTH = 200; //maximum length for selection text
const PROTOCOL_REGEX = /^\S{1,5}:\/\//; //match values that begins with protocol
const DEF_PROTOCOL = "https://"; //protocol to append if url does not contain such

//function that prepends protocol to url if missing. Otherwise returns copy of url
function prependProtocol(url, protocol) {
	if (!PROTOCOL_REGEX.test(url)) {
		return protocol + url;
	}

	return url;
}

//function that inserts text to url marked with wildcard "%s".
//if no wildcard is found, appends text at the end.
function insertSelectionText(url, text) {
	if (url.search(/%s/gm) === -1) {
    return url + text;
  }

  return url.replaceAll(/%s/gm, text);
}

//function that creates functional url with selection text inserted
function composeURL(url, selection_text) {

  //trim start and end
  selection_text = selection_text.trim();
	
	//trim selection_text length
  selection_text = selection_text.substring(0,SELECTION_TEXT_MAXLENGTH);

  //fix potentially wrongly formatted string to avoid error while uri encoding
  selection_text = selection_text.toWellFormed();

  //uri encode selection_text
  selection_text = encodeURIComponent(selection_text);

  //ensure url does include protocol, otherwise the url will be treated as local
  url = prependProtocol(url, DEF_PROTOCOL);

  //insert selection text to the url
  url = insertSelectionText(url, selection_text);
 	
 	return url;
}