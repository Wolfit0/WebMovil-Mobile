import { SaleSummary } from '../sale_service/types/SaleSummary'

export default interface IDeliveryService {
	getAvailableDeliveries(): Promise<SaleSummary[]>
	acceptDelivery(saleCode: string): Promise<void>
}
