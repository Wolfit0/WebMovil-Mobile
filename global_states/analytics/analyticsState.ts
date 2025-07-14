import { create } from 'zustand'
import AnalyticsService from '../../services/analytics_service/AnalyticsService'

interface AnalyticsState {
	analyticsService: AnalyticsService
}

const useAnalyticsState = create<AnalyticsState>(() => ({
	analyticsService: new AnalyticsService(),
}))

export default useAnalyticsState
