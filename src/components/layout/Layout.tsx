import { useEffect } from 'react'
import { Outlet, useLocation, useNavigationType } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import BackToTop from './BackToTop'

// Shared page frame: header + current page + footer
export default function Layout() {
  const { pathname, key } = useLocation()
  const navigationType = useNavigationType()

  // Every link click (a PUSH navigation) starts at the top of the page, even when only
  // the ?category= part changes or the same link is clicked again (each click gets a new key).
  // Typing in the product filters uses REPLACE and the Back button uses POP, so those
  // keep the current scroll position.
  useEffect(() => {
    if (navigationType === 'PUSH') window.scrollTo({ top: 0 })
  }, [key, navigationType])

  // The home hero sits under the transparent header; other pages start below it
  const isHome = pathname === '/'

  return (
    <>
      <Header />
      <main className={`main ${isHome ? '' : 'main--offset'}`}>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
