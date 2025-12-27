
import React, { useState, useEffect } from 'react';
import { Search, Menu, Video, Bell, User, Youtube, X } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const Header: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const navigate = useNavigate();

  // Sync internal search state when URL search params change (e.g., back navigation)
  useEffect(() => {
    setSearch(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?q=${encodeURIComponent(search.trim())}`);
    } else {
      navigate('/');
    }
  };

  const clearSearch = () => {
    setSearch('');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/5 gap-2 sm:gap-4">
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors hidden sm:block text-zinc-400">
          <Menu size={24} />
        </button>
        <Link to="/" className="flex items-center gap-1">
          <div className="text-red-600">
            <Youtube fill="currentColor" size={24} className="sm:w-[28px] sm:h-[28px]" />
          </div>
          <span className="text-lg sm:text-xl font-black tracking-tighter uppercase italic hidden min-[400px]:block">
            Viral tube
          </span>
        </Link>
      </div>

      <form onSubmit={handleSearch} className="flex-1 max-w-xl sm:max-w-2xl flex items-center">
        <div className="flex w-full relative items-center">
          <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-500">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Search viral content..."
            className="w-full bg-[#151515] border border-white/5 rounded-full py-1.5 sm:py-2.5 pl-9 sm:pl-12 pr-10 focus:outline-none focus:border-red-600/50 focus:bg-[#1a1a1a] transition-all text-xs sm:text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button 
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors p-1"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </form>

      <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors hidden md:block text-zinc-400">
          <Video size={20} />
        </button>
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors hidden md:block text-zinc-400">
          <Bell size={20} />
        </button>
        <button className="p-1.5 px-3 sm:px-4 bg-red-600 hover:bg-red-700 rounded-full flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase transition-all shadow-lg shadow-red-600/20 active:scale-95">
          <User size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="hidden sm:inline">Sign In</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
