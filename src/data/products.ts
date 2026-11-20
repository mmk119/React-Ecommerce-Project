import type { Category, Product } from '../types'
import { unsplash } from '../utils/image'

export const categories: { id: Category; label: string; image: string }[] = [
  { id: 'living-room', label: 'Living Rooms', image: unsplash('1704428382813-b6c72be3f6c3', 300) },
  { id: 'bedroom', label: 'Bedrooms', image: unsplash('1698517486200-e89403ea2738', 300) },
  { id: 'dining', label: 'Dining Rooms', image: unsplash('1604578762246-41134e37f9cc', 300) },
  { id: 'carpets', label: 'Carpets', image: unsplash('1660394585016-508f949df960', 300) },
  { id: 'outdoor', label: 'Outdoors', image: unsplash('1623625434531-d130448273c1', 300) },
  { id: 'kids', label: 'Kids Rooms', image: unsplash('1723359724788-677dca927b8d', 300) },
]

export function getCategoryLabel(id: Category): string {
  return categories.find((category) => category.id === id)?.label ?? id
}

export const products: Product[] = [
  // Living room
  { id: 'lr-01', name: 'Oslo 3-Seater Sofa', category: 'living-room', price: 690, oldPrice: 890, image: unsplash('1759722665629-29df6ee4f9a5', 600), description: 'Light grey fabric sofa with solid wood legs and deep, comfortable seats.', featured: true },
  { id: 'lr-02', name: 'Verde Velvet Sofa', category: 'living-room', price: 820, image: unsplash('1590251024078-8a6d9f90b02d', 600), description: 'Dark green textured sofa with two striped cushions included.', featured: true },
  { id: 'lr-03', name: 'Luna Corner Sectional', category: 'living-room', price: 1250, oldPrice: 1590, image: unsplash('1771287490608-adf31ca18f6e', 600), description: 'Large L-shaped sectional that seats six, with removable covers.' },
  { id: 'lr-04', name: 'Nova Accent Armchair', category: 'living-room', price: 240, oldPrice: 320, image: unsplash('1650300636679-b3310a41638d', 600), description: 'Blue upholstered armchair that brightens any reading corner.' },
  { id: 'lr-05', name: 'Halo Round Coffee Table', category: 'living-room', price: 180, image: unsplash('1550581190-9c1c48d21d6c', 600), description: 'Round white coffee table with a smooth lacquered top.' },

  // Bedroom
  { id: 'bd-01', name: 'Serene Upholstered Bed', category: 'bedroom', price: 760, oldPrice: 950, image: unsplash('1560185128-e173042f79dd', 600), description: 'Beige upholstered queen bed with a padded headboard.', featured: true },
  { id: 'bd-02', name: 'Arco Bedroom Set', category: 'bedroom', price: 1890, image: unsplash('1766733041960-0de62f403e7b', 600), description: 'Complete set with arched headboard bed, two nightstands and a dresser.' },
  { id: 'bd-03', name: 'Nordic King Bed', category: 'bedroom', price: 980, oldPrice: 1290, image: unsplash('1698517486200-e89403ea2738', 600), description: 'King-size bed in natural oak finish with slatted base.' },
  { id: 'bd-04', name: 'Mira Bed with Round Mirror', category: 'bedroom', price: 1120, image: unsplash('1678978866819-306ed8608e7f', 600), description: 'Modern bed paired with a matching round wall mirror.' },
  { id: 'bd-05', name: 'Lino Bedside Table', category: 'bedroom', price: 95, oldPrice: 130, image: unsplash('1771287490579-afd6e8d3c09a', 600), description: 'Compact bedside table with an open shelf for books.' },

  // Dining
  { id: 'dn-01', name: 'Rustic Oak Dining Set', category: 'dining', price: 1150, oldPrice: 1450, image: unsplash('1604578762246-41134e37f9cc', 600), description: 'Solid oak table with six matching chairs.', featured: true },
  { id: 'dn-02', name: 'Elm 6-Seat Dining Table', category: 'dining', price: 940, image: unsplash('1758977404039-6e834be8eca8', 600), description: 'Wooden dining table with six upholstered chairs.' },
  { id: 'dn-03', name: 'Monochrome Dining Set', category: 'dining', price: 720, oldPrice: 900, image: unsplash('1616486886892-ff366aa67ba4', 600), description: 'Black and white dining set with a modern minimal look.' },
  { id: 'dn-04', name: 'Sage Garden Dining Set', category: 'dining', price: 680, image: unsplash('1617806118233-18e1de247200', 600), description: 'Painted wooden table and chairs in soft sage green.' },
  { id: 'dn-05', name: 'Heritage Walnut Dining Set', category: 'dining', price: 1390, image: unsplash('1505409628601-edc9af17fda6', 600), description: 'Classic walnut dining set for formal dinners.' },

  // Carpets
  { id: 'cp-01', name: 'Tabriz Red Classic Rug', category: 'carpets', price: 260, oldPrice: 370, image: unsplash('1660394585016-508f949df960', 600), description: 'Red Persian-style rug with intricate geometric patterns, 200 x 300 cm.', featured: true },
  { id: 'cp-02', name: 'Linea Striped Rug', category: 'carpets', price: 140, image: unsplash('1762356317094-5826049a3641', 600), description: 'Modern rug with vertical stripes, 160 x 230 cm.' },
  { id: 'cp-03', name: 'Isfahan Heritage Rug', category: 'carpets', price: 310, oldPrice: 440, image: unsplash('1767159601823-96d0295344ce', 600), description: 'Traditional rug with detailed medallion design, 200 x 290 cm.' },
  { id: 'cp-04', name: 'Mosaic Oriental Rug', category: 'carpets', price: 220, image: unsplash('1774215915840-22cd38b8bd0e', 600), description: 'Colourful oriental rug that adds warmth to any room, 160 x 230 cm.' },
  { id: 'cp-05', name: 'Noir Fringe Rug', category: 'carpets', price: 175, oldPrice: 250, image: unsplash('1765454359095-ed30cd9eb6ea', 600), description: 'Dark patterned rug with hand-knotted fringe, 120 x 180 cm.' },

  // Outdoor
  { id: 'od-01', name: 'Rattan Lounge Set', category: 'outdoor', price: 540, oldPrice: 690, image: unsplash('1623625434531-d130448273c1', 600), description: 'Weather-resistant wicker chairs with a matching coffee table.', featured: true },
  { id: 'od-02', name: 'Riviera Dining Set with Umbrella', category: 'outdoor', price: 870, image: unsplash('1769502963760-ea942f2d1fe7', 600), description: 'Six-seat outdoor dining set with a large sun umbrella.' },
  { id: 'od-03', name: 'Bistro Metal Table Set', category: 'outdoor', price: 260, oldPrice: 340, image: unsplash('1613317447829-eea2ed59640f', 600), description: 'Black metal table and two chairs, ideal for balconies.' },
  { id: 'od-04', name: 'Cedar Adirondack Chair', category: 'outdoor', price: 150, image: unsplash('1778869290979-6f09567a0eee', 600), description: 'Classic slatted garden chair made from treated cedar wood.' },
  { id: 'od-05', name: 'Terrace Lounge Chairs (Pair)', category: 'outdoor', price: 390, image: unsplash('1617887021567-fe8d2480bd96', 600), description: 'Two cushioned lounge chairs with a side table.' },

  // Kids
  { id: 'kd-01', name: 'Sunny Kids Bedroom Set', category: 'kids', price: 990, oldPrice: 1250, image: unsplash('1723359724788-677dca927b8d', 600), description: 'Bright bedroom set with bed, wardrobe and toy storage.', featured: true },
  { id: 'kd-02', name: 'Study & Sleep Kids Set', category: 'kids', price: 860, image: unsplash('1721395288477-b546804ce392', 600), description: 'Bed, desk and shelving designed for school-age kids.' },
  { id: 'kd-03', name: 'Cozy Kids Bed with Desk', category: 'kids', price: 640, oldPrice: 790, image: unsplash('1763478958800-3a2a6321f645', 600), description: 'Single bed with an attached study desk to save space.', featured: true },
  { id: 'kd-04', name: "Blossom Girls' Bedroom Set", category: 'kids', price: 920, image: unsplash('1697162103256-dad37889d979', 600), description: 'Soft pink bedroom set with a white bed and dresser.' },
  { id: 'kd-05', name: 'Explorer Twin Bed', category: 'kids', price: 410, image: unsplash('1771862956412-6ce9a725eb22', 600), description: 'Sturdy twin bed with under-bed drawers for toys.' },
]
