export default class Product {
	private code: string
	private name: string
	private description: string
	private price: number
	private storeId: string
	private storeName: string
	private picture: string
	private stock: number

	constructor(
		code: string,
		name: string,
		description: string,
		price: number,
		storeId: string,
		storeName: string,
		picture: string,
		stock: number
	) {
		this.code = code
		this.name = name
		this.price = price
		this.description = description
		this.storeId = storeId
		this.storeName = storeName
		this.picture = picture
		this.stock = stock
	}

	public getCode(): string {
		return this.code
	}

	public getName(): string {
		return this.name
	}

	public getDescription(): string {
		return this.description
	}

	public getPrice(): number {
		return this.price
	}

	public getStoreId(): string {
		return this.storeId
	}

	public getStoreName(): string {
		return this.storeName
	}

	public getPicture(): string {
		return this.picture
	}

	public getStock(): number {
		return this.stock
	}
}
