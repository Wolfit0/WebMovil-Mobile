import { Feather } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'

import ProtectedRoute from '@/components/ProtectedRoute'
import StoreAnalyticsCard from '@/components/StoreAnalyticsCard/StoreAnalyticsCard'
import useAnalyticsState from '@/global_states/analytics/analyticsState'
import useAppState from '@/global_states/appState'
import { StoreAnalytics } from '@/services/analytics_service/IAnalyticsService.interface'

type TabType = 'best' | 'worst'

const AdminProfileScreen = () => {
	const [activeTab, setActiveTab] = useState<TabType>('best')
	const { analyticsService } = useAnalyticsState()
	const { basicUserInfo } = useAppState()

	const {
		data: bestStores,
		isLoading: isLoadingBest,
		error: errorBest,
	} = useQuery<StoreAnalytics[]>({
		queryKey: ['bestSellerStores', basicUserInfo],
		queryFn: () => analyticsService.getBestSellerStores(),
		enabled: !!basicUserInfo,
	})

	const {
		data: worstStores,
		isLoading: isLoadingWorst,
		error: errorWorst,
	} = useQuery<StoreAnalytics[]>({
		queryKey: ['worstSellerStores'],
		queryFn: () => analyticsService.getWorstSellerStores(),
	})

	const handleTabPress = (tab: TabType) => {
		setActiveTab(tab)
	}

	const renderTabButton = (tab: TabType, title: string, icon: string) => (
		<TouchableOpacity
			style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
			onPress={() => handleTabPress(tab)}
		>
			<Feather
				name={icon as any}
				size={20}
				color={activeTab === tab ? '#B076FF' : '#CCC'}
			/>
			<Text
				style={[
					styles.tabButtonText,
					activeTab === tab && styles.activeTabButtonText,
				]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	)

	const renderStoreItem = ({
		item,
		index,
	}: {
		item: StoreAnalytics
		index: number
	}) => (
		<StoreAnalyticsCard
			store={item}
			rank={index + 1}
			isBestSeller={activeTab === 'best'}
		/>
	)

	const renderContent = () => {
		if (activeTab === 'best') {
			if (isLoadingBest) {
				return (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size='large' color='#B076FF' />
						<Text style={styles.loadingText}>
							Cargando mejores vendedores...
						</Text>
					</View>
				)
			}

			if (errorBest) {
				return (
					<View style={styles.errorContainer}>
						<Feather name='alert-circle' size={48} color='#FF5722' />
						<Text style={styles.errorText}>
							Error al cargar los mejores vendedores
						</Text>
					</View>
				)
			}

			if (!bestStores || bestStores.length === 0) {
				return (
					<View style={styles.emptyContainer}>
						<Feather name='award' size={48} color='#B076FF' />
						<Text style={styles.emptyText}>
							No hay datos de mejores vendedores disponibles
						</Text>
					</View>
				)
			}

			return (
				<FlatList
					data={bestStores}
					keyExtractor={item => item.store_id}
					renderItem={renderStoreItem}
					contentContainerStyle={styles.listContainer}
					showsVerticalScrollIndicator={false}
				/>
			)
		} else {
			if (isLoadingWorst) {
				return (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size='large' color='#B076FF' />
						<Text style={styles.loadingText}>
							Cargando peores vendedores...
						</Text>
					</View>
				)
			}

			if (errorWorst) {
				return (
					<View style={styles.errorContainer}>
						<Feather name='alert-circle' size={48} color='#FF5722' />
						<Text style={styles.errorText}>
							Error al cargar los peores vendedores
						</Text>
					</View>
				)
			}

			if (!worstStores || worstStores.length === 0) {
				return (
					<View style={styles.emptyContainer}>
						<Feather name='trending-down' size={48} color='#B076FF' />
						<Text style={styles.emptyText}>
							No hay datos de peores vendedores disponibles
						</Text>
					</View>
				)
			}

			return (
				<FlatList
					data={worstStores}
					keyExtractor={item => item.store_id}
					renderItem={renderStoreItem}
					contentContainerStyle={styles.listContainer}
					showsVerticalScrollIndicator={false}
				/>
			)
		}
	}

	return (
		<ProtectedRoute allowedRoles={['admin']}>
			<View style={styles.container}>
				{/* Content */}
				<View style={styles.content}>
					<View style={styles.analyticsHeader}>
						<View style={styles.analyticsTitleContainer}>
							<Feather name='bar-chart-2' size={24} color='#B076FF' />
							<Text style={styles.analyticsTitleText}>Estadísticas</Text>
						</View>
						<Text style={styles.analyticsSubtitleText}>
							Análisis de rendimiento de tiendas
						</Text>
					</View>

					<View style={styles.tabContainer}>
						{renderTabButton('best', 'Mejores', 'trending-up')}
						{renderTabButton('worst', 'Peores', 'trending-down')}
					</View>

					<View style={styles.contentContainer}>{renderContent()}</View>
				</View>
			</View>
		</ProtectedRoute>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#121212',
	},
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: '#121212',
		borderBottomWidth: 1,
		borderBottomColor: '#2D2D2D',
		paddingTop: 50, // Account for status bar
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
	content: {
		flex: 1,
		paddingHorizontal: 16,
	},
	analyticsHeader: {
		marginTop: 24,
		marginBottom: 24,
	},
	analyticsTitleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	analyticsTitleText: {
		color: '#FFFFFF',
		fontSize: 24,
		fontWeight: '700',
		marginLeft: 8,
	},
	analyticsSubtitleText: {
		color: '#CCC',
		fontSize: 14,
	},
	tabContainer: {
		flexDirection: 'row',
		backgroundColor: '#1E1E1E',
		borderRadius: 12,
		padding: 4,
		marginBottom: 20,
	},
	tabButton: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 8,
	},
	activeTabButton: {
		backgroundColor: '#2D2D2D',
	},
	tabButtonText: {
		color: '#CCC',
		fontSize: 14,
		fontWeight: '600',
		marginLeft: 6,
	},
	activeTabButtonText: {
		color: '#B076FF',
	},
	contentContainer: {
		flex: 1,
	},
	listContainer: {
		paddingBottom: 20,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
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
	},
	errorText: {
		color: '#FF5722',
		fontSize: 16,
		marginTop: 16,
		textAlign: 'center',
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyText: {
		color: '#CCC',
		fontSize: 16,
		marginTop: 16,
		textAlign: 'center',
		paddingHorizontal: 32,
	},
})

export default AdminProfileScreen
