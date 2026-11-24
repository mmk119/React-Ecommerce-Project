import HeroSlider from '../components/home/HeroSlider'
import CategoryCarousel from '../components/home/CategoryCarousel'
import WelcomeSection from '../components/home/WelcomeSection'
import CollectionBanners from '../components/home/CollectionBanners'
import ProductTabs from '../components/home/ProductTabs'
import StatsBand from '../components/home/StatsBand'
import InspirationSection from '../components/home/InspirationSection'
import '../components/home/home.css'

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <CategoryCarousel />
      <WelcomeSection />
      <CollectionBanners />
      <ProductTabs />
      <StatsBand />
      <InspirationSection />
    </>
  )
}
