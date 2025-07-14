import AsyncStorage from '@react-native-async-storage/async-storage'
import DeliveryData from '../../domain/DispatchMethod/DeliveryData/DeliveryData'
import apiClient from '../../utils/axios_client'
import { SaleSummary } from '../sale_service/types/SaleSummary'
import IDeliveryService from './IDeliveryService.interface'

export default class DeliveryService implements IDeliveryService {
	async getAvailableDeliveries(): Promise<SaleSummary[]> {
		const { data } = await apiClient.get('/sales?status=Buscando%20repartidor')

		return data
			.filter((saleSummary: SaleSummary) => saleSummary.status !== 'Completada')
			.map((saleSummary: SaleSummary) => ({
				...saleSummary,
				date: new Date(saleSummary.date),
				dispatchMethod: new DeliveryData(
					(saleSummary.dispatchMethod as any).id,
					(saleSummary.dispatchMethod as any).street,
					(saleSummary.dispatchMethod as any).number,
					(saleSummary.dispatchMethod as any).customerInstructions
				),
			}))
	}

	async acceptDelivery(saleCode: string): Promise<void> {
		const email = await AsyncStorage.getItem('user_email')
		await apiClient.post(`/sales/${saleCode}/dispatch`, {
			delivery_man_email: email,
		})
	}
}
