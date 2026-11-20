// Builds a sized URL for a free Unsplash photo from its id (the part after "photo-")
export function unsplash(id: string, width = 800): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`
}
