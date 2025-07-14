import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { isAxiosError } from 'axios'
import { clearLocalStorage } from './clear_local_storage'
import { CONSTANTS } from './constants'
import BasicUserInfo from './types/BasicUserInfo'

export const validateAccessToken = async (): Promise<BasicUserInfo | null> => {
	const accessToken = await AsyncStorage.getItem('access_token')

	if (!accessToken) return null

	try {
		const { data } = await axios.get(`${CONSTANTS.API_URL}/auth/validate`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})

		await AsyncStorage.setItem('user_type', data.user_type)
		await AsyncStorage.setItem('user_email', data.user_email)

		return {
			email: data.user_email,
			userType: data.user_type,
		}
	} catch (error) {
		if (isAxiosError(error)) {
			console.error('Validación fallida:', error.response?.data?.error || error)
		} else {
			console.error('Error inesperado:', error)
		}
		clearLocalStorage()

		return null
	}
}

export const registerUser = async (
	accessToken: string,
	fullName: string,
	phone: string,
	profilePicture: string,
	userType: string
): Promise<BasicUserInfo | null> => {
	try {
		const { data } = await axios.post(
			`${CONSTANTS.API_URL}/auth/register`,
			{
				phone,
				full_name: fullName,
				profile_picture: profilePicture,
				user_type: userType,
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
		console.log(data)

		await AsyncStorage.setItem('access_token', accessToken)
		await AsyncStorage.setItem('user_type', data.user_type)
		await AsyncStorage.setItem('user_email', data.email)

		return { userType: data.user_type, email: data.email }
	} catch (error) {
		console.error('Registro fallido:', error)

		return null
	}
}
