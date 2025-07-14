import { Feather } from '@expo/vector-icons'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import {
	ActivityIndicator,
	Alert,
	FlatList,
	StyleSheet,
	Text,
	View,
} from 'react-native'

import DeliveryRequestCard from '@/components/DeliveryRequestCard/DeliveryRequestCard'
import ProtectedRoute from '@/components/ProtectedRoute'
import useAppState from '@/global_states/appState'
import useDeliveryManState from '@/global_states/delivery_man/deliveryManState'
import { SaleSummary } from '../../services/sale_service/types/SaleSummary'

const HomeScreen = () => {
	const { basicUserInfo } = useAppState()
	const { deliveryService, deliveryServiceSocket, registerToSocket } =
		useDeliveryManState()
	const queryClient = useQueryClient()

	const {
		data: deliveries,
		isLoading,
		refetch,
	} = useQuery<SaleSummary[]>({
		queryKey: ['availableDeliveries', basicUserInfo],
		queryFn: async () => await deliveryService.getAvailableDeliveries(),
		enabled: !!basicUserInfo,
	})

	useEffect(() => {
		registerToSocket()
	}, [registerToSocket])

	useEffect(() => {
		const handleDeliveryRequested = () => {
			console.log('delivery requested')
			refetch()
		}

		deliveryServiceSocket.on('shipping-requested', handleDeliveryRequested)
		return () => {
			deliveryServiceSocket.off('shipping-requested', handleDeliveryRequested)
		}
	}, [deliveryServiceSocket, refetch])

	const handleAcceptDelivery = async (saleCode: string) => {
		try {
			await deliveryService.acceptDelivery(saleCode)
			await queryClient.invalidateQueries({ queryKey: ['availableDeliveries'] })
		} catch (error) {
			Alert.alert('Error', 'No se pudo aceptar la entrega')
			console.error('Error accepting delivery:', error)
		}
	}

	return (
		<ProtectedRoute allowedRoles={['delivery-man']}>
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<Feather name='truck' size={24} color='#B076FF' />
					<Text style={styles.titleText}> Entregas Disponibles</Text>
				</View>

				{!isLoading && deliveries?.length === 0 && (
					<View style={styles.noDeliveries}>
						<Feather name='truck' size={48} color='#B076FF' />
						<Text style={styles.noDeliveriesText}>
							No hay entregas disponibles en este momento
						</Text>
					</View>
				)}

				{isLoading && (
					<ActivityIndicator
						size='large'
						color='#B076FF'
						style={{ marginTop: 20 }}
					/>
				)}

				<FlatList
					data={deliveries}
					keyExtractor={item => item.code}
					contentContainerStyle={{ paddingBottom: 16 }}
					renderItem={({ item }) => (
						<DeliveryRequestCard
							delivery={item}
							onAccept={() => handleAcceptDelivery(item.code)}
						/>
					)}
				/>
			</View>
		</ProtectedRoute>
	)
}

export default HomeScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#121212',
		paddingHorizontal: 16,
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 16,
		marginBottom: 16,
	},
	titleText: {
		color: '#FFFFFF',
		fontSize: 20,
		fontWeight: '600',
		marginLeft: 8,
	},
	noDeliveries: {
		alignItems: 'center',
		marginTop: 40,
	},
	noDeliveriesText: {
		marginTop: 12,
		color: '#CCC',
		fontSize: 14,
		textAlign: 'center',
		paddingHorizontal: 16,
	},
})
