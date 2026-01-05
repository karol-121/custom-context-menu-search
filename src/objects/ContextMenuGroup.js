class ContextMenuGroup {
  static titleRegex = /^.{1,30}$/;
  static urlRegex = /^\S{3,200}$/;

  static validateTitle(title) {

    if (!title) {

      return false

    }

    return this.titleRegex.test(title);

  }

  static validateUrls(urls) {

    if (!urls) {

      return false;
      
    }

    for (let url of urls) {

      if (!this.urlRegex.test(url)) {

        return false;

      }

    }

    return true;

  }

  constructor(name, urls) {
    this.id = randomId.generateNewId();
    this.title = name;
    this.actions = urls;
  }

  export() {
    return {
      id: this.id,
      title: this.title,
      actions: this.actions
    }
  }

}
