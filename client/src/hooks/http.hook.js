import {useState, useCallback} from 'react'

export const useHttp = () => {
  // загрузка
  const [loading, setLoading] = useState(false)
  // ошибка
  const [error, setError] = useState(null)
 // запрос
 const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
   setLoading(true)
   try {
     // преобразование в строку JSON
     // для корректного чтения body на сервере
     if (body) {
       body = JSON.stringify(body)
       // header для работы с json
       headers['Content-Type'] = 'application/json'
     }
     // запрос на сервер
     const response = await fetch(url, {method, body, headers})
     const data = await response.json()

     if (!response.ok) {
       throw new Error(data.message || 'Что-то пошло не так')
     }

     setLoading(false)

     return data
   } catch (e) {
     setLoading(false)
     setError(e.message)
     throw e
   }
 }, [])

  // очистка ошибок
  const clearError = useCallback(() => setError(null), [])

 return { loading, request, error, clearError}
}