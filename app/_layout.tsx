import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { Drawer } from 'expo-router/drawer'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

import CustomHeader from '@/components/CustomHeader/CustomHeader'
import { Colors } from '@/constants/Colors'
import { AuthProvider } from '@/contexts/AuthContext'
import useAppState from '@/global_states/appState'
import { useColorScheme } from '@/hooks/useColorScheme'
import BasicUserInfo from '@/utils/types/BasicUserInfo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'

// Create a client
const queryClient = new QueryClient()

export default function RootLayout() {
	const colorScheme = useColorScheme()
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	})
	const { setBasicUserInfo } = useAppState()

	useEffect(() => {
		const loadInitialBasicUserInfo =
			async (): Promise<BasicUserInfo | null> => {
				const email = await AsyncStorage.getItem('user_email')
				const userType = await AsyncStorage.getItem('user_type')

				if (!email || !userType) {
					return null
				}

				return { email, userType }
			}
		loadInitialBasicUserInfo().then(basicUserInfo => {
			setBasicUserInfo(basicUserInfo)
		})
	}, [setBasicUserInfo])

	if (!loaded) {
		// Async font loading only occurs in development.
		return null
	}

	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider
					value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
				>
					<Drawer
						screenOptions={{
							headerShown: true,
							header: () => <CustomHeader />,
							drawerStyle: {
								backgroundColor: Colors[colorScheme ?? 'light'].background,
							},
							drawerActiveTintColor: Colors[colorScheme ?? 'light'].tint,
							drawerInactiveTintColor: Colors[colorScheme ?? 'light'].text,
						}}
					>
						<Drawer.Screen
							name='login'
							options={{
								title: 'Iniciar Sesión',
								drawerLabel: 'Iniciar Sesión',
							}}
						/>
						<Drawer.Screen
							name='(tabs)'
							options={{
								title: 'Entregas Disponibles',
								drawerLabel: 'Entregas Disponibles',
							}}
						/>
						<Drawer.Screen
							name='admin-profile'
							options={{
								title: 'Estadísticas',
								drawerLabel: 'Estadísticas',
							}}
						/>
					</Drawer>
					<StatusBar style='auto' />
				</ThemeProvider>
			</QueryClientProvider>
		</AuthProvider>
	)
}
