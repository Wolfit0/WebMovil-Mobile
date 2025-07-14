import { useAuth } from '@/contexts/AuthContext'
import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'

const LoginScreen = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { login } = useAuth()

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<View style={styles.content}>
				{/* Header */}
				<View style={styles.header}>
					<View style={styles.logoContainer}>
						<Feather name='shopping-bag' size={48} color='#B076FF' />
						<Text style={styles.logoText}>MiBarrio</Text>
					</View>
					<Text style={styles.subtitleText}>Inicia sesión para continuar</Text>
				</View>

				{/* Login Form */}
				<View style={styles.formContainer}>
					<TouchableOpacity
						style={[
							styles.loginButton,
							isLoading && styles.loginButtonDisabled,
						]}
						onPress={() => {
							setIsLoading(true)
							login('token')
							setIsLoading(false)
						}}
						disabled={isLoading}
					>
						{isLoading ? (
							<ActivityIndicator color='#FFFFFF' />
						) : (
							<>
								<Feather name='log-in' size={20} color='#FFFFFF' />
								<Text style={styles.loginButtonText}>
									Iniciar Sesión Repartidor
								</Text>
							</>
						)}
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.loginButton,
							isLoading && styles.loginButtonDisabled,
						]}
						onPress={() => {
							setIsLoading(true)
							login('token')
							setIsLoading(false)
						}}
						disabled={isLoading}
					>
						{isLoading ? (
							<ActivityIndicator color='#FFFFFF' />
						) : (
							<>
								<Feather name='log-in' size={20} color='#FFFFFF' />
								<Text style={styles.loginButtonText}>
									Iniciar Sesión Presidente
								</Text>
							</>
						)}
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#121212',
	},
	content: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 100,
	},
	header: {
		alignItems: 'center',
		marginBottom: 48,
	},
	logoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 16,
	},
	logoText: {
		color: '#FFFFFF',
		fontSize: 32,
		fontWeight: '700',
		marginLeft: 12,
	},
	subtitleText: {
		color: '#CCC',
		fontSize: 16,
		textAlign: 'center',
	},
	formContainer: {
		marginBottom: 32,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#1E1E1E',
		borderRadius: 12,
		marginBottom: 16,
		paddingHorizontal: 16,
		borderWidth: 1,
		borderColor: '#2D2D2D',
	},
	inputIcon: {
		marginRight: 12,
	},
	input: {
		flex: 1,
		color: '#FFFFFF',
		fontSize: 16,
		paddingVertical: 16,
	},
	eyeButton: {
		padding: 8,
	},
	loginButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#5E4B8B',
		borderRadius: 12,
		paddingVertical: 16,
		marginTop: 8,
	},
	loginButtonDisabled: {
		opacity: 0.6,
	},
	loginButtonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '600',
		marginLeft: 8,
	},
	demoContainer: {
		backgroundColor: '#1E1E1E',
		borderRadius: 12,
		padding: 16,
		borderWidth: 1,
		borderColor: '#2D2D2D',
	},
	demoTitle: {
		color: '#FFFFFF',
		fontSize: 14,
		fontWeight: '600',
		marginBottom: 8,
	},
	demoText: {
		color: '#CCC',
		fontSize: 12,
		marginBottom: 4,
	},
})

export default LoginScreen
