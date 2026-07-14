import { useEffect } from 'react'
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow'
import { UnlistenFn } from '@tauri-apps/api/event'

export function useConfirmExit(shouldConfirm: boolean) {
	useEffect(() => {
		let unlistenFn: UnlistenFn | null = null
		const currentWindow = getCurrentWebviewWindow()
		currentWindow
			.onCloseRequested(async (event) => {
				event.preventDefault()
				await currentWindow.hide()
			})
			.then((unlisten) => {
				unlistenFn = unlisten
			})
		return () => unlistenFn?.()
	}, [shouldConfirm])
}
