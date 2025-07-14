import { Feather } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DeliveryData from '../../domain/DispatchMethod/DeliveryData/DeliveryData'
import { SaleSummary } from '../../services/sale_service/types/SaleSummary'

type Props = {
	delivery: SaleSummary
	onAccept: () => void
}

const DeliveryRequestCard = ({ delivery, onAccept }: Props) => {
	const dispatch = delivery.dispatchMethod as DeliveryData | undefined

	return (
		<View style={styles.card}>
			{/* Header */}
			<View style={styles.header}>
				<View style={styles.codeSection}>
					<Text style={styles.codeTitle}>Pedido {delivery.code}</Text>
					<Text style={styles.status}>{delivery.status}</Text>
				</View>
				<Text style={styles.total}>
					CLP {delivery.total.toLocaleString('es-CL')}
				</Text>
			</View>

			{/* Info rows */}
			<View style={styles.info}>
				<View style={styles.infoRow}>
					<Feather
						name='map-pin'
						size={16}
						color='#B076FF'
						style={styles.icon}
					/>
					<View style={styles.infoContent}>
						<Text style={styles.label}>Tienda</Text>
						<Text style={styles.value}>{delivery.storeName}</Text>
					</View>
				</View>

				{dispatch && (
					<View style={styles.infoRow}>
						<Feather
							name='navigation'
							size={16}
							color='#B076FF'
							style={styles.icon}
						/>
						<View style={styles.infoContent}>
							<Text style={styles.label}>Dirección de Entrega</Text>
							<Text style={styles.value}>
								{dispatch.getStreet()} {dispatch.getNumber()}
							</Text>
							{dispatch.getCustomerInstructions() && (
								<Text style={styles.instructions}>
									{dispatch.getCustomerInstructions()}
								</Text>
							)}
						</View>
					</View>
				)}

				<View style={styles.infoRow}>
					<Feather
						name='calendar'
						size={16}
						color='#B076FF'
						style={styles.icon}
					/>
					<View style={styles.infoContent}>
						<Text style={styles.label}>Fecha</Text>
						<Text style={styles.value}>
							{delivery.date.toLocaleDateString('es-CL')}
						</Text>
					</View>
				</View>
			</View>

			{/* Accept button */}
			<TouchableOpacity style={styles.button} onPress={onAccept}>
				<Text style={styles.buttonText}>Aceptar Entrega</Text>
			</TouchableOpacity>
		</View>
	)
}

export default DeliveryRequestCard

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#1E1E1E',
		borderRadius: 10,
		padding: 16,
		marginBottom: 16,
		gap: 12,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	codeSection: {
		flex: 1,
		gap: 4,
	},
	codeTitle: {
		color: '#FFF',
		fontSize: 16,
		fontWeight: '600',
	},
	status: {
		backgroundColor: '#3E3E3E',
		alignSelf: 'flex-start',
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 4,
		color: '#FFF',
		fontSize: 12,
		fontWeight: '500',
	},
	total: {
		color: '#B076FF',
		fontSize: 18,
		fontWeight: 'bold',
		marginLeft: 8,
	},
	info: {
		gap: 12,
	},
	infoRow: {
		flexDirection: 'row',
		gap: 8,
		alignItems: 'flex-start',
	},
	icon: {
		marginTop: 2,
	},
	infoContent: {
		flex: 1,
		gap: 2,
	},
	label: {
		color: '#999',
		fontSize: 12,
	},
	value: {
		color: '#FFF',
		fontSize: 14,
	},
	instructions: {
		fontStyle: 'italic',
		fontSize: 12,
		color: '#CCC',
		marginTop: 2,
	},
	button: {
		backgroundColor: '#5E4B8B',
		paddingVertical: 12,
		borderRadius: 6,
		alignItems: 'center',
		marginTop: 8,
	},
	buttonText: {
		color: '#FFF',
		fontWeight: '600',
		fontSize: 14,
	},
})
