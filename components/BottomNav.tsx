
import React, { useState } from 'react';
import { Home, Plus, User, Compass } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleAdminClick = () => {
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthOpen(false);
    navigate('/admin');
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#0f0f0f] border-t border-white/10 flex justify-around items-center px-2 z-40 lg:hidden">
        <Link to="/" className={`flex flex-col items-center gap-1 ${location.pathname === '/' ? 'text-white' : 'text-zinc-500'}`}>
          <Home size={22} />
          <span className="text-[10px]">Home</span>
        </Link>
        <Link to="/" className="flex flex-col items-center gap-1 text-zinc-500">
          <Compass size={22} />
          <span className="text-[10px]">Shorts</span>
        </Link>
        
        <button 
          onClick={handleAdminClick}
          className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center -mt-8 border-4 border-[#0f0f0f] shadow-lg shadow-red-600/20 active:scale-95 transition-transform"
        >
          <Plus size={24} strokeWidth={3} />
        </button>

        <Link to="/" className="flex flex-col items-center gap-1 text-zinc-500">
          <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center overflow-hidden">
            <User size={14} />
          </div>
          <span className="text-[10px]">You</span>
        </Link>
      </nav>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onSuccess={handleAuthSuccess} 
      />
    </>
  );
};

export default BottomNav;
