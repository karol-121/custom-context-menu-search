function contextMenuItemGroup(title) {
	this.id = randomId.generateNewId();
  this.type = "normal";
  this.contexts = ["selection"];
  this.title = title;
  this.action = "%group%";
  this.actions = [];
}