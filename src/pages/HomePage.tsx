import HeroSlider from '../components/home/HeroSlider'
import CategoryCarousel from '../components/home/CategoryCarousel'
import WelcomeSection from '../components/home/WelcomeSection'
import CollectionBanners from '../components/home/CollectionBanners'
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
      <StatsBand />
      <InspirationSection />
    </>
  )
}
