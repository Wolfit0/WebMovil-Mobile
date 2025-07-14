import useAppState from '@/global_states/appState'
import useDeliveryManState from '@/global_states/delivery_man/deliveryManState'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface User {
	email: string
	userType: 'admin' | 'delivery-man'
}

interface AuthContextType {
	user: User | null
	isLoading: boolean
	login: (accessToken: string) => Promise<void>
	logout: () => Promise<void>
	checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const { validateAccessToken, setBasicUserInfo } = useAppState()
	const { registerToSocket } = useDeliveryManState()

	const login = async (accessToken: string) => {
		console.log(accessToken)
		await AsyncStorage.setItem('access_token', accessToken)
		setIsLoading(true)
		await validateAccessToken()
		setIsLoading(false)

		const userType = await AsyncStorage.getItem('user_type')
		const userEmail = await AsyncStorage.getItem('user_email')

		setUser({
			email: userEmail as string,
			userType: userType as 'admin' | 'delivery-man',
		})

		if (userType === 'admin') {
			router.replace('/admin-profile')
		} else if (userType === 'delivery-man') {
			router.replace('/(tabs)')
			registerToSocket()
		}
	}

	const logout = async () => {
		await AsyncStorage.multiRemove(['user_email', 'user_type', 'access_token'])
		setBasicUserInfo(null)
		setUser(null)
		router.replace('/login')
	}

	const checkAuth = async () => {
		const accessToken = await AsyncStorage.getItem('access_token')
		if (!accessToken) {
			router.replace('/login')
		}
	}

	useEffect(() => {
		checkAuth()
	}, [])

	const value = {
		user,
		isLoading,
		login,
		logout,
		checkAuth,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
