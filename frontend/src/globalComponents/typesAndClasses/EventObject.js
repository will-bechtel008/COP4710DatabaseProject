//@flow strict
import Comment from './CommentObject'
class EventObject {
	name: string;
	time: String;
    date: String;
	org: string;
	location: string;
	comments: Array<Comment>;

	constructor(name: string, time: string, date: String, org: string, location: string, comments: Array<String>) {
		this.name = name;
		this.time = time;
		this.date = date;
		this.org = org;
		this.location = location;
		this.comments = comments;
	}
}

export default EventObject;