import AsyncStorage from '@react-native-async-storage/async-storage'

export async function clearLocalStorage() {
	await AsyncStorage.multiRemove(['user_email', 'user_type', 'access_token'])
}
