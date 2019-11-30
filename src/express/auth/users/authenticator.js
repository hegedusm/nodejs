import users from "./users";

export default function authenticate(userName, password) {
	return users.users.filter(user => user.userName === userName && user.password === password).length > 0;
}