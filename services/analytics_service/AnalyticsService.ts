import apiClient from '../../utils/axios_client'
import IAnalyticsService, {
	StoreAnalytics,
} from './IAnalyticsService.interface'

export default class AnalyticsService implements IAnalyticsService {
	async getBestSellerStores(): Promise<StoreAnalytics[]> {
		const { data } = await apiClient.get('/analytics/stores/best')
		return data
	}

	async getWorstSellerStores(): Promise<StoreAnalytics[]> {
		const { data } = await apiClient.get('/analytics/stores/worst')
		return data
	}
}
