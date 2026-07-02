// Hôte propriétaire d'un logement
export interface Host {
  id: number;
  name: string;
  picture: string;
}

// Données retournées par GET /api/properties — version allégée sans galerie ni équipements
export interface PropertySummary {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover: string;
  location: string;
  price_per_night: number;
  rating_avg: number;
  ratings_count: number;
  host: Host;
}

// Données retournées par GET /api/properties/:id — étend PropertySummary avec les détails complets
export interface PropertyDetail extends PropertySummary {
  pictures: string[];
  equipments: string[];
  tags: string[];
}
