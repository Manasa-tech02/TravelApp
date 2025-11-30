export interface Place {
  id: string;
  title: string;
  location: string;
  image: any; // Use 'any' for local require() images, or 'string' for URLs
  rating: number;
  description: string;
  price: number;
}



export const CATEGORIES = [
  { id: '1', name: 'Most Viewed' },
  { id: '2', name: 'Nearby' },
  { id: '3', name: 'Latest' },
];

export const PLACES: Place[] = [
  {
    id: '1',
    title: 'Mount Fuji',
    location: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?q=80&w=1000&auto=format&fit=crop', 
    rating: 4.8,
    price: 230,
    description: 'Mount Fuji is an active volcano about 100 kilometers southwest of Tokyo. Commonly called "Fuji-san," it’s the country’s tallest peak, at 3,776 meters.'
  },
  {
    id: '2',
    title: 'Andes Mountain',
    location: 'South America',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop',
    rating: 4.5,
    price: 230,
    description: 'The Andes, running along South America\'s western side, is among the world\'s longest mountain ranges.'
  },
  {
    id: '3',
    title: 'Altay Mountains',
    location: 'Russia',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop',
    rating: 4.5,
    price: 230,
    description: 'The Altay Mountains are a mountain range in Central and East Asia, where Russia, China, Mongolia, and Kazakhstan come together.'
  },
];   