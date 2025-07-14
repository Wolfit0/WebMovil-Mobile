export default class User {
	private email: string
	private fullName: string
	private phone: string
	private profilePicture: string

	constructor(
		email: string,
		fullName: string,
		phone: string,
		profilePicture: string
	) {
		this.email = email
		this.fullName = fullName
		this.phone = phone
		this.profilePicture = profilePicture
	}

	getEmail(): string {
		return this.email
	}

	getFullName(): string {
		return this.fullName
	}

	getPhone(): string {
		return this.phone
	}

	getProfilePicture(): string {
		return this.profilePicture
	}
}
