
import React from 'react';
import { Video } from '../types';
import { Link } from 'react-router-dom';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Link to={`/watch/${video.id}`} className="group flex flex-col gap-3">
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-white/5">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-xl shadow-red-600/40">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
            </div>
        </div>
        <span className="absolute bottom-3 right-3 bg-red-600 px-2 py-0.5 text-[10px] font-black rounded uppercase shadow-lg">
          {video.duration}
        </span>
      </div>
      <div className="flex gap-3 px-1">
        <div className="flex-shrink-0">
          <img src={video.avatar} alt="" className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10" />
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="font-black text-sm leading-tight tracking-tight uppercase line-clamp-2 italic group-hover:text-red-500 transition-colors">
            {video.title}
          </h3>
          <p className="text-[10px] text-zinc-500 mt-1 uppercase font-bold hover:text-white transition-colors">
            {video.channelName}
          </p>
          <div className="flex text-[10px] text-zinc-600 items-center uppercase font-bold">
            <span>{video.views}</span>
            <span className="mx-1.5 opacity-50">•</span>
            <span>{video.postedAt}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
