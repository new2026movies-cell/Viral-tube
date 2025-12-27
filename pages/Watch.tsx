
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share2, Bookmark } from 'lucide-react';
import { getVideos } from '../services/videoService';
import { Video } from '../types';
import AdLoader from '../components/AdLoader';

const Watch: React.FC = () => {
  const { id } = useParams();
  const [video, setVideo] = useState<Video | undefined>();
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);

  useEffect(() => {
    const all = getVideos();
    const found = all.find(v => v.id === id);
    setVideo(found);
    setRelatedVideos(all.filter(v => v.id !== id).slice(0, 8));
    setIsLoaderVisible(true);
    window.scrollTo(0, 0);
  }, [id]);

  if (!video) return <div className="p-10 text-center text-zinc-500 font-bold uppercase tracking-widest">Stream not found in database.</div>;

  // Helper to determine if we should use iframe or native video tag
  const isEmbed = (url?: string) => {
    if (!url) return false;
    return url.includes('jumpshare.com') || url.includes('youtube.com') || url.includes('vimeo.com');
  };

  return (
    <>
      {isLoaderVisible && <AdLoader onFinish={() => setIsLoaderVisible(false)} />}
      
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-24">
        <div className="max-w-[1700px] mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl group relative border border-white/5 shadow-red-600/5">
              {video.url ? (
                isEmbed(video.url) ? (
                  <iframe 
                    src={video.url} 
                    className="w-full h-full border-none" 
                    allowFullScreen 
                    title={video.title}
                  />
                ) : (
                  <video 
                    src={video.url} 
                    className="w-full h-full object-contain" 
                    controls 
                    autoPlay 
                    poster={video.thumbnail}
                  />
                )
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[#050505]">
                  <img src={video.thumbnail} className="w-full h-full object-cover opacity-40 blur-[2px]" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <div className="bg-red-600 p-6 rounded-full mb-4 shadow-xl shadow-red-600/40 cursor-pointer hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-t-[18px] border-t-transparent border-l-[30px] border-l-white border-b-[18px] border-b-transparent ml-2"></div>
                    </div>
                    <p className="text-xl font-black tracking-tighter uppercase italic">{video.title}</p>
                    <p className="text-zinc-500 font-mono text-xs mt-2">ENCRYPTED STREAM {video.id}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-black leading-tight tracking-tight uppercase italic">{video.title}</h1>
              </div>
              
              <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                <div className="flex items-center gap-4 bg-white/5 p-2 pr-6 rounded-full border border-white/5">
                  <img src={video.avatar} className="w-10 h-10 rounded-full bg-zinc-800" />
                  <div>
                    <h3 className="font-black text-sm uppercase tracking-tight">{video.channelName}</h3>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold">1.2M Pro Members</p>
                  </div>
                  <button className="ml-4 bg-red-600 text-white px-5 py-2 rounded-full text-xs font-black uppercase hover:bg-red-700 transition-all active:scale-95">
                    Subscribe
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-white/5 rounded-full border border-white/10 overflow-hidden">
                    <button className="flex items-center gap-2 px-5 py-2 hover:bg-white/10 border-r border-white/10 transition-colors">
                      <ThumbsUp size={18} className="text-red-600" /> <span className="text-xs font-black">12K</span>
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2 hover:bg-white/10 transition-colors">
                      <ThumbsDown size={18} />
                    </button>
                  </div>
                  <button className="flex items-center gap-2 px-5 py-2 bg-white/5 hover:bg-white/10 rounded-full text-xs font-black uppercase border border-white/10 transition-colors">
                    <Bookmark size={16} /> Save
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2 bg-white/5 hover:bg-white/10 rounded-full text-xs font-black uppercase border border-white/10 transition-colors">
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>

              <div className="mt-6 bg-[#1a1a1a] rounded-2xl p-6 border border-white/5">
                <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">{video.views} • {video.postedAt}</p>
                <p className="text-sm text-zinc-300 leading-relaxed">{video.description}</p>
                {video.meta && <p className="text-xs font-bold text-red-500 mt-4 uppercase">#{video.meta.replace(/\s+/g, '')}</p>}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="font-black italic text-xs uppercase tracking-widest text-zinc-500 px-1">Recommendations</h3>
            {relatedVideos.map(v => (
              <Link to={`/watch/${v.id}`} key={v.id} className="flex gap-3 group">
                <div className="relative w-44 h-24 flex-shrink-0 bg-zinc-900 rounded-xl overflow-hidden border border-white/5">
                  <img src={v.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80" />
                  <span className="absolute bottom-1 right-1 bg-red-600 px-1.5 py-0.5 text-[8px] font-black rounded uppercase">{v.duration}</span>
                </div>
                <div className="flex flex-col py-1">
                  <h4 className="text-xs font-black uppercase tracking-tight line-clamp-2 leading-tight group-hover:text-red-600 transition-colors">{v.title}</h4>
                  <p className="text-[10px] text-zinc-500 mt-1 uppercase font-bold">{v.channelName}</p>
                  <p className="text-[10px] text-zinc-600 uppercase font-bold mt-0.5">{v.views}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Watch;
