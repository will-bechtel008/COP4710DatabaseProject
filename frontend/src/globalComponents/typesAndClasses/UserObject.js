class UserObject {
    name: string;
    type: String;
    rso: String;
    uni: String;

    constructor(name: String, type: String, rso: String, uni: string) {
        this.name = name;
		this.type = type;
		this.rso = rso;
		this.uni = uni;
    }
}

export default UserObject;