import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Stack } from 'expo-router'
import React from 'react'

export default function TabLayout() {
	const colorScheme = useColorScheme()

	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: Colors[colorScheme ?? 'light'].background,
				},
				headerTintColor: Colors[colorScheme ?? 'light'].text,
			}}
		>
			<Stack.Screen
				name='index'
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	)
}
