import { validateAccessToken } from '@/utils/auth'
import BasicUserInfo from '@/utils/types/BasicUserInfo'
import { create } from 'zustand'

type AppState = {
	basicUserInfo: BasicUserInfo | null
	setBasicUserInfo: (userInfo: BasicUserInfo | null) => void
	validateAccessToken: () => Promise<void>
}

const useAppState = create<AppState>((set, get) => {
	return {
		// Estados globales
		basicUserInfo: null,
		// Funciones globales
		setBasicUserInfo: (userInfo: BasicUserInfo | null) =>
			set({ basicUserInfo: userInfo }),

		validateAccessToken: async () => {
			const basicUser = await validateAccessToken()
			if (get().basicUserInfo?.email === basicUser?.email) return

			set({ basicUserInfo: basicUser })
		},
	}
})

export default useAppState
