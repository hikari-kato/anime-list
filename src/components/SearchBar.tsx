'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onGenreFilter: (genre: string) => void;
  onTypeFilter: (type: string) => void;
  onDayFilter: (day: string) => void;
  onSortChange: (sortBy: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, onGenreFilter, onTypeFilter, onDayFilter, onSortChange, placeholder = "アニメタイトルを検索..." }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedSort, setSelectedSort] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    onGenreFilter(genre);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setSelectedType(type);
    onTypeFilter(type);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const day = e.target.value;
    setSelectedDay(day);
    onDayFilter(day);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;
    setSelectedSort(sort);
    onSortChange(sort);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenre('');
    setSelectedType('');
    setSelectedDay('');
    setSelectedSort('');
    onSearch('');
    onGenreFilter('');
    onTypeFilter('');
    onDayFilter('');
    onSortChange('');
  };

  const popularGenres = [
    { en: '', jp: 'すべて' },
    { en: 'Action', jp: 'アクション' },
    { en: 'Comedy', jp: 'コメディ' },
    { en: 'Drama', jp: 'ドラマ' },
    { en: 'Fantasy', jp: 'ファンタジー' },
    { en: 'Romance', jp: 'ロマンス' },
    { en: 'Slice of Life', jp: '日常系' },
    { en: 'Sports', jp: 'スポーツ' },
    { en: 'Supernatural', jp: '超自然' },
    { en: 'School', jp: '学園' },
    { en: 'Mystery', jp: 'ミステリー' },
  ];

  const animeTypes = [
    { en: '', jp: 'すべて' },
    { en: 'TV', jp: 'TV' },
    { en: 'Movie', jp: '映画' },
    { en: 'Special', jp: 'スペシャル' },
    { en: 'ONA', jp: 'オンライン' },
  ];

  const broadcastDays = [
    { en: '', jp: 'すべて' },
    { en: 'mondays', jp: '月曜日' },
    { en: 'tuesdays', jp: '火曜日' },
    { en: 'wednesdays', jp: '水曜日' },
    { en: 'thursdays', jp: '木曜日' },
    { en: 'fridays', jp: '金曜日' },
    { en: 'saturdays', jp: '土曜日' },
    { en: 'sundays', jp: '日曜日' },
  ];

  const sortOptions = [
    { value: '', label: 'デフォルト（放送日順）' },
    { value: 'score-desc', label: '評価の高い順' },
    { value: 'score-asc', label: '評価の低い順' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="space-y-4">
        {/* 検索バー */}
        <div className="w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {/* フィルターとソート */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ジャンル</label>
            <select
              value={selectedGenre}
              onChange={handleGenreChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              {popularGenres.map((genre) => (
                <option key={genre.en} value={genre.en}>
                  {genre.jp}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">形態</label>
            <select
              value={selectedType}
              onChange={handleTypeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              {animeTypes.map((type) => (
                <option key={type.en} value={type.en}>
                  {type.jp}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">放送曜日</label>
            <select
              value={selectedDay}
              onChange={handleDayChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              {broadcastDays.map((day) => (
                <option key={day.en} value={day.en}>
                  {day.jp}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">並び順</label>
            <select
              value={selectedSort}
              onChange={handleSortChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            {(searchQuery || selectedGenre || selectedType || selectedDay || selectedSort) && (
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                すべてクリア
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}