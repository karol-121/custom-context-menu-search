class ContextMenuHandling {
  static titleRegex = /^.{1,30}$/;
  static handlingRegex = /^[123]{1}$/

  static validateTitle(title) {

    if (!title) {

      return false;

    }

    return this.titleRegex.test(title);

  }

  static validateHandling(handling) {

    if (!handling) {

      return false;

    }

    return this.handlingRegex.test(handling);

  }

  constructor(name, handling) {
    this.id = randomId.generateNewId();
    this.title = name;
    this.handling = handling;
  }

  export() {
    return {
      id: this.id,
      title: this.title,
      handling: this.handling
    }
  }

}