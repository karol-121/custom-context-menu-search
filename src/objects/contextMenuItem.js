function contextMenuItem(title, action) {
	this.id = randomId.generateNewId();
  this.title = title;
  this.contexts = ["selection"];
  this.action = action;
}