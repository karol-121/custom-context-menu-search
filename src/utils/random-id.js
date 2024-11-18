//functions that creates unique id
//id is a unix epoch that is modified by a count
//this is to prevent conflict with other generators using the same concept &
//to ensure that unix epoch value is unique in case the insturcion is executed on the same time
const randomId = {
	count: 0,

	generateNewId() {
		let id = Date.now();

		id = id.toString();

		id = id + this.count.toString();

		this.count++;
		return id;
	}
}