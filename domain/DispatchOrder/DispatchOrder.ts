export default class DispatchOrder {
	protected id: string | undefined

	constructor(id: string | undefined) {
		this.id = id
	}

	getId(): string | undefined {
		return this.id
	}

	setId(id: string) {
		this.id = id
	}
}
