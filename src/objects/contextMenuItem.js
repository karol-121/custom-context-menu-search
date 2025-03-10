function contextMenuItem(title, action, type) {
	this.id = randomId.generateNewId();
  this.type = type;
  this.contexts = ["selection"];

  if (type === "separator") {

    return;

  }
  
  this.title = title;
  this.action = action;
}