export interface StoreAnalytics {
	store_id: string
	store_name: string
	total_sales: number
	sales_count: number
}

export default interface IAnalyticsService {
	getBestSellerStores(): Promise<StoreAnalytics[]>
	getWorstSellerStores(): Promise<StoreAnalytics[]>
}
