'use client';

import { useState } from 'react';
import { AnimeData } from '@/types/anime';
import { getAnimeExternalLinks } from '@/lib/jikan-api';

interface AnimeCardProps {
  anime: AnimeData;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  const [officialSiteUrl, setOfficialSiteUrl] = useState<string | null>(null);
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);
  
  const title = anime.title_japanese || anime.title || anime.title_english || 'タイトル不明';
  
  // 曜日を日本語に変換
  const getDayInJapanese = (day: string | undefined): string => {
    if (!day) return '未定';
    const dayMap: { [key: string]: string } = {
      'monday': '月曜日',
      'tuesday': '火曜日', 
      'wednesday': '水曜日',
      'thursday': '木曜日',
      'friday': '金曜日',
      'saturday': '土曜日',
      'sunday': '日曜日',
      'mondays': '月曜日',
      'tuesdays': '火曜日', 
      'wednesdays': '水曜日',
      'thursdays': '木曜日',
      'fridays': '金曜日',
      'saturdays': '土曜日',
      'sundays': '日曜日'
    };
    return dayMap[day.toLowerCase()] || day;
  };
  
  // 形態を日本語に変換
  const getTypeInJapanese = (type: string | undefined): string => {
    if (!type) return '不明';
    const typeMap: { [key: string]: string } = {
      'Movie': '映画',
      'TV': 'TV',
      'OVA': 'OVA',
      'Special': 'スペシャル',
      'ONA': 'オンライン'
    };
    return typeMap[type] || type;
  };
  
  // ジャンルを日本語に変換
  const getGenreInJapanese = (genreName: string): string => {
    const genreMap: { [key: string]: string } = {
      'Action': 'アクション',
      'Adventure': 'アドベンチャー',
      'Comedy': 'コメディ',
      'Drama': 'ドラマ',
      'Fantasy': 'ファンタジー',
      'Horror': 'ホラー',
      'Mystery': 'ミステリー',
      'Romance': 'ロマンス',
      'Sci-Fi': 'SF',
      'Slice of Life': '日常系',
      'Sports': 'スポーツ',
      'Supernatural': '超自然',
      'Thriller': 'スリラー',
      'Music': '音楽',
      'School': '学園',
      'Military': 'ミリタリー',
      'Historical': '歴史',
      'Mecha': 'メカ',
      'Magic': '魔法',
      'Psychological': 'サイコロジカル',
      'Seinen': '青年',
      'Shoujo': '少女',
      'Shounen': '少年',
      'Josei': '女性',
      'Ecchi': 'エッチ',
      'Harem': 'ハーレム',
      'Isekai': '異世界',
      'Parody': 'パロディ',
      'Samurai': '侍',
      'Space': '宇宙',
      'Vampire': 'バンパイア',
      'Martial Arts': '武術',
      'Game': 'ゲーム',
      'Dementia': 'デメンシア',
      'Demons': '悪魔',
      'Police': '警察',
      'Cars': '車',
      'Kids': '子供向け'
    };
    return genreMap[genreName] || genreName;
  };
  
  const broadcastDay = getDayInJapanese(anime.broadcast?.day);
  const type = getTypeInJapanese(anime.type);
  const imageUrl = anime.images?.jpg?.image_url;

  const handleOfficialSiteClick = async () => {
    if (officialSiteUrl) {
      window.open(officialSiteUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    if (isLoadingUrl) return;

    setIsLoadingUrl(true);
    try {
      const url = await getAnimeExternalLinks(anime.mal_id);
      if (url) {
        setOfficialSiteUrl(url);
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        alert('公式サイトが見つかりませんでした');
      }
    } catch (error) {
      console.error('Error fetching official site:', error);
      alert('公式サイトの取得に失敗しました');
    } finally {
      setIsLoadingUrl(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      <div className="aspect-[3/4] bg-gray-200 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="text-gray-400 text-center p-4">
            <p>画像なし</p>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-2">
          {title}
        </h3>
        <div className="text-sm text-gray-600 space-y-1 flex-1">
          <p>放送曜日: {broadcastDay}</p>
          <p>形態: {type}</p>
          {anime.genres && anime.genres.length > 0 && (
            <p>ジャンル: {anime.genres.slice(0, 2).map(genre => getGenreInJapanese(genre.name)).join(', ')}</p>
          )}
          {anime.score && anime.score > 0 && (
            <p>評価: ⭐ {anime.score.toFixed(1)}</p>
          )}
          {anime.year && (
            <p>年: {anime.year}</p>
          )}
        </div>
        
        <div className="mt-4">
          <button
            onClick={handleOfficialSiteClick}
            disabled={isLoadingUrl}
            className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoadingUrl ? '読み込み中...' : '公式サイト'}
          </button>
        </div>
      </div>
    </div>
  );
}