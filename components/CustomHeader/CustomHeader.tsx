import { Colors } from '@/constants/Colors'
import { useAuth } from '@/contexts/AuthContext'
import useAppState from '@/global_states/appState'
import { Feather } from '@expo/vector-icons'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from 'react-native'

type DrawerNavigation = DrawerNavigationProp<any>

const CustomHeader = () => {
	const colorScheme = useColorScheme()
	const navigation = useNavigation<DrawerNavigation>()
	const { logout } = useAuth()
	const { basicUserInfo } = useAppState()

	return (
		<View style={styles.headerContainer}>
			<TouchableOpacity
				style={styles.menuButton}
				onPress={() => navigation.openDrawer()}
			>
				<Feather
					name='menu'
					size={24}
					color={Colors[colorScheme ?? 'light'].text}
				/>
			</TouchableOpacity>

			<View style={styles.headerMain}>
				<View style={styles.titleContainer}>
					<Feather name='shopping-bag' size={24} color='#B076FF' />
					<Text style={styles.titleText}>MiBarrio</Text>
				</View>

				{basicUserInfo && (
					<TouchableOpacity style={styles.logoutButton} onPress={logout}>
						<Feather
							name='log-out'
							size={20}
							color={Colors[colorScheme ?? 'light'].text}
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		gap: 10,
		backgroundColor: '#121212',
		borderBottomWidth: 1,
		borderBottomColor: '#2D2D2D',
		paddingTop: 50, // Account for status bar
	},
	headerMain: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		flex: 1,
	},
	menuButton: {
		padding: 8,
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	titleText: {
		color: '#FFFFFF',
		fontSize: 20,
		fontWeight: '700',
		marginLeft: 8,
	},
	logoutButton: {
		padding: 8,
	},
})

export default CustomHeader
