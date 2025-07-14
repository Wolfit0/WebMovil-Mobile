import { Feather } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface StoreAnalyticsCardProps {
	store: {
		store_id: string
		store_name: string
		total_sales: number
		sales_count: number
	}
	rank: number
	isBestSeller?: boolean
}

const StoreAnalyticsCard: React.FC<StoreAnalyticsCardProps> = ({
	store,
	rank,
	isBestSeller = true,
}) => {
	const getRankColor = (rank: number) => {
		if (rank === 1) return '#FFD700' // Gold
		if (rank === 2) return '#C0C0C0' // Silver
		if (rank === 3) return '#CD7F32' // Bronze
		return '#B076FF'
	}

	const getRankIcon = (rank: number) => {
		if (rank === 1) return 'award'
		if (rank === 2) return 'award'
		if (rank === 3) return 'award'
		return isBestSeller ? 'trending-up' : 'trending-down'
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.rankContainer}>
					<View
						style={[styles.rankBadge, { backgroundColor: getRankColor(rank) }]}
					>
						<Feather name={getRankIcon(rank) as any} size={16} color='white' />
						<Text style={styles.rankText}>{rank}</Text>
					</View>
				</View>
				<View style={styles.storeInfo}>
					<Text style={styles.storeName}>{store.store_name}</Text>
				</View>
			</View>

			<View style={styles.statsContainer}>
				<View style={styles.statItem}>
					<Feather name='shopping-bag' size={16} color='#B076FF' />
					<Text style={styles.statLabel}>Pedidos</Text>
					<Text style={styles.statValue}>{store.sales_count}</Text>
				</View>

				<View style={styles.statItem}>
					<Feather name='dollar-sign' size={16} color='#4CAF50' />
					<Text style={styles.statLabel}>Ventas</Text>
					<Text style={styles.statValue}>
						{store.total_sales.toLocaleString()}
					</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#1E1E1E',
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
		borderLeftWidth: 4,
		borderLeftColor: '#B076FF',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 12,
	},
	rankContainer: {
		marginRight: 12,
	},
	rankBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
		minWidth: 32,
		justifyContent: 'center',
	},
	rankText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 12,
		marginLeft: 2,
	},
	storeInfo: {
		flex: 1,
	},
	storeName: {
		color: 'white',
		fontSize: 16,
		fontWeight: '600',
		marginBottom: 2,
	},
	ratingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	ratingText: {
		color: '#FFD700',
		fontSize: 12,
		marginLeft: 4,
		fontWeight: '500',
	},
	statsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 12,
	},
	statItem: {
		alignItems: 'center',
		flex: 1,
	},
	statLabel: {
		color: '#CCC',
		fontSize: 10,
		marginTop: 4,
		marginBottom: 2,
	},
	statValue: {
		color: 'white',
		fontSize: 14,
		fontWeight: '600',
	},
	progressContainer: {
		marginTop: 8,
	},
	progressBar: {
		height: 6,
		backgroundColor: '#2D2D2D',
		borderRadius: 3,
		overflow: 'hidden',
		marginBottom: 4,
	},
	progressFill: {
		height: '100%',
		borderRadius: 3,
	},
	progressText: {
		color: '#CCC',
		fontSize: 10,
		textAlign: 'center',
	},
})

export default StoreAnalyticsCard
