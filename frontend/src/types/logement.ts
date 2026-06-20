export interface Host {
  id: number;
  name: string;
  picture: string;
}

// Forme retournée par GET /api/properties (liste)
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

// Forme retournée par GET /api/properties/:id (détail)
export interface PropertyDetail extends PropertySummary {
  pictures: string[];
  equipments: string[];
  tags: string[];
}
