import useAppState from '@/global_states/appState'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface ProtectedRouteProps {
	children: React.ReactNode
	allowedRoles: string[]
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	children,
	allowedRoles,
}) => {
	const { basicUserInfo } = useAppState()

	if (!basicUserInfo || !allowedRoles.includes(basicUserInfo.userType)) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorTitle}>Acceso Denegado</Text>
				<Text style={styles.errorText}>
					No tienes permisos para acceder a esta sección.
				</Text>
			</View>
		)
	}

	return <>{children}</>
}

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#121212',
	},
	loadingText: {
		color: '#CCC',
		fontSize: 16,
		marginTop: 16,
	},
	errorContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#121212',
		paddingHorizontal: 32,
	},
	errorTitle: {
		color: '#FF5722',
		fontSize: 24,
		fontWeight: '700',
		marginBottom: 16,
	},
	errorText: {
		color: '#CCC',
		fontSize: 16,
		textAlign: 'center',
		lineHeight: 24,
	},
})

export default ProtectedRoute
