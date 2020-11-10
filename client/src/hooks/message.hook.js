import {useCallback} from 'react'

// хук для вывода ошибок
// M.toast - из materialize
export const useMessage = () => {
  return useCallback((text) => {
    if (window.M && text) {
      window.M.toast({html: text})
    }
  }, [])
}