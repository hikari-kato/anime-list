'use client';

import { useState, useEffect } from 'react';
import { getCurrentSeasonAnime, sortAnimeByBroadcastDay } from '@/lib/jikan-api';
import { AnimeData } from '@/types/anime';
import AnimeCard from '@/components/AnimeCard';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const [animeList, setAnimeList] = useState<AnimeData[]>([]);
  const [filteredAnimeList, setFilteredAnimeList] = useState<AnimeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const data = await getCurrentSeasonAnime();
        const sorted = sortAnimeByBroadcastDay(data);
        setAnimeList(sorted);
        setFilteredAnimeList(sorted);
      } catch (error) {
        console.error('Failed to fetch anime:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  const [currentSearchQuery, setCurrentSearchQuery] = useState('');
  const [currentGenreFilter, setCurrentGenreFilter] = useState('');
  const [currentTypeFilter, setCurrentTypeFilter] = useState('');
  const [currentDayFilter, setCurrentDayFilter] = useState('');
  const [currentSort, setCurrentSort] = useState('');

  const handleSearch = (query: string) => {
    setCurrentSearchQuery(query);
    filterAndSortAnime(query, currentGenreFilter, currentTypeFilter, currentDayFilter, currentSort);
  };

  const handleGenreFilter = (genre: string) => {
    setCurrentGenreFilter(genre);
    filterAndSortAnime(currentSearchQuery, genre, currentTypeFilter, currentDayFilter, currentSort);
  };

  const handleTypeFilter = (type: string) => {
    setCurrentTypeFilter(type);
    filterAndSortAnime(currentSearchQuery, currentGenreFilter, type, currentDayFilter, currentSort);
  };

  const handleDayFilter = (day: string) => {
    setCurrentDayFilter(day);
    filterAndSortAnime(currentSearchQuery, currentGenreFilter, currentTypeFilter, day, currentSort);
  };

  const handleSortChange = (sort: string) => {
    setCurrentSort(sort);
    filterAndSortAnime(currentSearchQuery, currentGenreFilter, currentTypeFilter, currentDayFilter, sort);
  };

  const handleClearFilters = () => {
    setCurrentSearchQuery('');
    setCurrentGenreFilter('');
    setCurrentTypeFilter('');
    setCurrentDayFilter('');
    setCurrentSort('');
    filterAndSortAnime('', '', '', '', '');
  };

  const filterAndSortAnime = (searchQuery: string, genreFilter: string, typeFilter: string, dayFilter: string, sortBy: string) => {
    let filtered = [...animeList];

    // タイトル検索
    if (searchQuery) {
      filtered = filtered.filter(anime => {
        const title = anime.title_japanese || anime.title || anime.title_english || '';
        return title.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    // ジャンルフィルター
    if (genreFilter) {
      filtered = filtered.filter(anime => {
        return anime.genres?.some(genre => genre.name === genreFilter);
      });
    }

    // 形態フィルター
    if (typeFilter) {
      filtered = filtered.filter(anime => {
        return anime.type === typeFilter;
      });
    }

    // 放送曜日フィルター
    if (dayFilter) {
      filtered = filtered.filter(anime => {
        const broadcastDay = anime.broadcast?.day?.toLowerCase();
        return broadcastDay === dayFilter;
      });
    }

    // ソート処理
    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'score-desc':
            return (b.score || 0) - (a.score || 0);
          case 'score-asc':
            return (a.score || 0) - (b.score || 0);
          default:
            return 0;
        }
      });
    }

    setFilteredAnimeList(filtered);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-500 mt-12">
            <p>アニメデータを読み込み中...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            <span className="block sm:inline">{new Date().getFullYear()}年</span>
            <span className="block sm:inline">今期アニメ一覧</span>
          </h1>
          <p className="text-gray-600 mb-4">
            現在放送中のアニメ作品を表示
          </p>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-blue-600">
              全{animeList.length}件中 {filteredAnimeList.length}件表示
            </p>
          </div>
        </header>

        <SearchBar 
          onSearch={handleSearch} 
          onGenreFilter={handleGenreFilter}
          onTypeFilter={handleTypeFilter}
          onDayFilter={handleDayFilter}
          onSortChange={handleSortChange}
          onClearFilters={handleClearFilters}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredAnimeList.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>

        {filteredAnimeList.length === 0 && animeList.length > 0 && (
          <div className="text-center text-gray-500 mt-12">
            <p>検索条件に一致するアニメが見つかりませんでした</p>
          </div>
        )}
      </div>
    </main>
  );
}