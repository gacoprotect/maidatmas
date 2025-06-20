// hooks/useRefreshData.ts
import { router } from '@inertiajs/react'
import { useCallback, useEffect, useState } from 'react'

export function useRefreshData<T>(dataKey: string, initialData?: T) {
  const [data, setData] = useState<T | undefined>(initialData)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshData = useCallback(async () => {
    if (isRefreshing) return
    
    setIsRefreshing(true)
    try {
      await router.reload({
        only: [dataKey],
        preserveUrl: true,
      })
    } finally {
      setIsRefreshing(false)
    }
  }, [dataKey, isRefreshing])

  useEffect(() => {
    const cleanup = router.on('success', (event) => {
      const newData = event.detail.page.props[dataKey]
      if (newData !== undefined) {
        setData(newData as T)
      }
    })
    return () => cleanup()
  }, [dataKey])

  return {
    data,
    refreshData,
    isRefreshing,
    setData
  }
}