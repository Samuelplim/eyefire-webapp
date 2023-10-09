// Defina uma interface para os objetos de evento

export interface Data {
  title: string;
  link: string;
  description: string;
  events: Event[];
}
export interface Event {
  id: string;
  title: string;
  description: string | null;
  link: string;
  closed: string | null;
  categories: Category[];
  sources: Source[];
  geometry: Geometry[];
}

// Defina uma interface para as categorias
interface Category {
  id: string;
  title: string;
}

// Defina uma interface para as fontes
interface Source {
  id: string;
  url: string;
}

// Defina uma interface para a geometria
interface Geometry {
  magnitudeValue: number | null;
  magnitudeUnit: string | null;
  date: string;
  type: string;
  coordinates: [number, number];
}
