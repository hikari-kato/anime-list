export interface AnimeImage {
  image_url: string;
  small_image_url?: string;
  large_image_url?: string;
}

export interface AnimeImages {
  jpg: AnimeImage;
  webp?: AnimeImage;
}

export interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Studio {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Broadcast {
  day: string;
  time: string;
  timezone: string;
  string: string;
}

export interface AnimeData {
  mal_id: number;
  url: string;
  images: AnimeImages;
  title: string;
  title_english?: string;
  title_japanese?: string;
  title_synonyms?: string[];
  type?: string;
  source?: string;
  episodes?: number;
  status?: string;
  airing?: boolean;
  aired?: {
    from?: string;
    to?: string;
  };
  duration?: string;
  rating?: string;
  score?: number;
  scored_by?: number;
  rank?: number;
  popularity?: number;
  members?: number;
  favorites?: number;
  synopsis?: string;
  background?: string;
  season?: string;
  year?: number;
  broadcast?: Broadcast;
  producers?: Studio[];
  licensors?: Studio[];
  studios?: Studio[];
  genres?: Genre[];
  explicit_genres?: Genre[];
  themes?: Genre[];
  demographics?: Genre[];
}

export interface JikanResponse {
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
  data: AnimeData[];
}