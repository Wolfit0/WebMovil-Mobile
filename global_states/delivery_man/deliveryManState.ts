import DeliveryService from '@/services/delivery_service/DeliveryService'
import IDeliveryService from '@/services/delivery_service/IDeliveryService.interface'
import { CONSTANTS } from '@/utils/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { io, Socket } from 'socket.io-client'
import { create } from 'zustand'

type DeliveryManState = {
	deliveryService: IDeliveryService
	deliveryServiceSocket: Socket
	registerToSocket: () => Promise<void>
}

const socket = io(`http://${CONSTANTS.HOST_IP}:3002`, {
	autoConnect: false, // evita conexión automática
})

const useDeliveryManState = create<DeliveryManState>(() => {
	return {
		deliveryService: new DeliveryService(),
		deliveryServiceSocket: socket,
		registerToSocket: async () => {
			const email = await AsyncStorage.getItem('user_email')
			const userType = await AsyncStorage.getItem('user_type')

			if (email && userType) {
				if (!socket.connected) socket.connect()

				socket.emit('register', {
					email,
					user_type: userType,
				})
				console.log('Socket registered with email:', email)
			} else {
				console.warn('No email/userType found to register socket')
			}
		},
	}
})

export default useDeliveryManState
