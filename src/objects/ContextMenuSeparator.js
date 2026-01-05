class ContextMenuSeparator {

	constructor() {
    this.id = randomId.generateNewId();
    this.type = "separator";
  }

  export() {
    return {
      id: this.id,
      type: this.type,
    }
  }
}