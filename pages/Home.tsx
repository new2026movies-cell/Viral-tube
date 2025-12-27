
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import VideoCard from '../components/VideoCard';
import { getVideos } from '../services/videoService';
import { Video } from '../types';

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [videos, setVideos] = useState<Video[]>([]);
  
  const query = searchParams.get('q');
  const catFilter = searchParams.get('cat');

  useEffect(() => {
    setVideos(getVideos());
  }, []);

  const filteredVideos = videos.filter(v => {
    const matchesSearch = query ? v.title.toLowerCase().includes(query.toLowerCase()) : true;
    const matchesCat = catFilter ? v.category.toLowerCase().includes(catFilter.toLowerCase()) : 
                        (activeCategory === 'All' ? true : v.category === activeCategory);
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 pt-4 pb-32">
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar mb-4">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-white/5 hover:bg-white/10'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {query && (
        <h2 className="text-xl font-bold mb-6 text-zinc-400">Search results for: <span className="text-white">"{query}"</span></h2>
      )}

      {filteredVideos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
          <p className="text-lg">No streams found matching your criteria.</p>
          <button onClick={() => setActiveCategory('All')} className="mt-4 text-red-500 hover:underline">Clear all filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-5 gap-y-10">
          {filteredVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
