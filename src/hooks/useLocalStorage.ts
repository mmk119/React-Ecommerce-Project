import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  // Load the saved value before the first render so the initial save preserves it.
  const [value, setValue] = useState<T>(() => {
    try {
      const savedValue = window.localStorage.getItem(key)
      return savedValue === null ? initialValue : (JSON.parse(savedValue) as T)
    } catch {
      return initialValue
    }
  })

  // Save committed state whenever the key or value changes.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Keep the current session usable when storage is blocked or full.
    }
  }, [key, value])

  return [value, setValue]
}
