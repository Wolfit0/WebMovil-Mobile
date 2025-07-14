import DispatchMethod from '../../../domain/DispatchMethod/DispatchMethod'

export type SaleSummary = {
	code: string
	userName: string
	storeId: string
	storeName: string
	total: number
	date: Date
	dispatchMethod: DispatchMethod
	status: string
	deliveryAddress?: {
		street: string
		number: string
		instructions?: string
	}
}
