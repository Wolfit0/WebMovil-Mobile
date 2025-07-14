import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { clearLocalStorage } from './clear_local_storage'
import { CONSTANTS } from './constants'

const apiClient = axios.create({
	baseURL: CONSTANTS.API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

// Add request interceptor to inject token
apiClient.interceptors.request.use(
	async config => {
		const token = await AsyncStorage.getItem('access_token')
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => Promise.reject(error)
)

// Add response interceptor for auth errors
apiClient.interceptors.response.use(
	response => response,
	async error => {
		if (
			error.response &&
			(error.response.status === 401 || error.response.status === 403)
		) {
			await clearLocalStorage()
			// Optionally trigger navigation to login screen here (see note below)
			console.warn('Unauthorized - token cleared')
		}
		return Promise.reject(error)
	}
)

export default apiClient
