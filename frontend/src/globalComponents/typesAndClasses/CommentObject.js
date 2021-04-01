class CommentObject {
	username: string;
    text: String;
	rating: number;
	time: date;

	constructor(username: string, text: String, rating: number, time: date) {
		this.username = username;
		this.text = text;
		this.rating = rating;
		this.time = time;
	}
}

export default CommentObject;