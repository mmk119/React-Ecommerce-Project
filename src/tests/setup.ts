import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// jsdom does not implement scrolling, so replace it with an empty function
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo

// Unmount rendered components and reset storage between tests
afterEach(() => {
  cleanup()
  localStorage.clear()
})
