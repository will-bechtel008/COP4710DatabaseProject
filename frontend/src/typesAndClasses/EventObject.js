//@flow strict

class EventObject {
	name: string;
    date: String;
	org: string;
	location: string;
	comments: Array<String>;

	constructor(name: string, date: String, org: string, location: string, comments: Array<String>) {
		this.name = name;
		this.date = date;
		this.org = org;
		this.location = location;
		this.comments = comments;
	}
}

export default EventObject;