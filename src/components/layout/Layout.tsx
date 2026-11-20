import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import BackToTop from './BackToTop'

// Shared page frame: header + current page + footer
export default function Layout() {
  const { pathname } = useLocation()

  // Start every new page at the top
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

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
