import { JikanResponse, AnimeData } from '@/types/anime';

const JIKAN_API_BASE_URL = 'https://api.jikan.moe/v4';

export async function getCurrentSeasonAnime(): Promise<AnimeData[]> {
  try {
    const allAnime: AnimeData[] = [];
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage && page <= 5) {
      const response = await fetch(`${JIKAN_API_BASE_URL}/seasons/now?page=${page}`);
      
      if (!response.ok) {
        break;
      }
      
      const data: JikanResponse = await response.json();
      
      if (!data || !Array.isArray(data.data)) {
        break;
      }
      
      allAnime.push(...data.data.filter(anime => anime && anime.mal_id && anime.type !== 'OVA'));
      hasNextPage = data.pagination?.has_next_page || false;
      page++;
    }

    return removeDuplicateAnime(allAnime);
  } catch {
    return [];
  }
}

function removeDuplicateAnime(animeList: AnimeData[]): AnimeData[] {
  const seenTitles = new Set<string>();
  const uniqueAnime: AnimeData[] = [];

  for (const anime of animeList) {
    // 日本語タイトル、英語タイトル、通常タイトルの優先順で確認
    const title = anime.title_japanese || anime.title || anime.title_english || '';
    const normalizedTitle = title.toLowerCase().trim();
    
    if (!seenTitles.has(normalizedTitle) && normalizedTitle) {
      seenTitles.add(normalizedTitle);
      uniqueAnime.push(anime);
    }
  }

  return uniqueAnime;
}

export async function getAnimeById(id: number): Promise<AnimeData | null> {
  try {
    const response = await fetch(`${JIKAN_API_BASE_URL}/anime/${id}`, {
      cache: 'force-cache',
    });
    
    if (!response.ok) {
      console.error(`HTTP error fetching anime ${id}: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    
    if (!data || !data.data) {
      console.error(`Invalid anime data received for ID ${id}`);
      return null;
    }
    
    return data.data;
  } catch (error) {
    console.error(`Error fetching anime with ID ${id}:`, error);
    return null;
  }
}

export async function getAnimeExternalLinks(animeId: number): Promise<string | null> {
  try {
    const response = await fetch(`${JIKAN_API_BASE_URL}/anime/${animeId}/external`, {
      cache: 'force-cache',
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    if (!data || !Array.isArray(data.data)) {
      return null;
    }
    
    // "Official Site"を検索
    const officialSite = data.data.find((link: any) => 
      link.name === 'Official Site' || 
      link.name === 'Official Website' ||
      link.name.toLowerCase().includes('official')
    );
    
    return officialSite ? officialSite.url : null;
  } catch (error) {
    console.error(`Error fetching external links for anime ${animeId}:`, error);
    return null;
  }
}

export function sortAnimeByBroadcastDay(animeList: AnimeData[]): AnimeData[] {
  const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  return animeList.sort((a, b) => {
    const dayA = a.broadcast?.day?.toLowerCase() || 'unknown';
    const dayB = b.broadcast?.day?.toLowerCase() || 'unknown';
    
    const indexA = dayOrder.indexOf(dayA);
    const indexB = dayOrder.indexOf(dayB);
    
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    
    if (indexA !== indexB) {
      return indexA - indexB;
    }
    
    const typeA = a.type?.toLowerCase() === 'tv' ? 0 : 1;
    const typeB = b.type?.toLowerCase() === 'tv' ? 0 : 1;
    
    return typeA - typeB;
  });
}