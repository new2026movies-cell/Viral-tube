
import React from 'react';
import { Home, Compass, PlaySquare, Clock, ThumbsUp, ChevronRight, Terminal, Database, Brain, Globe, Gamepad2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const SidebarItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; to: string }> = ({ icon, label, active, to }) => (
  <Link to={to} className={`flex items-center gap-5 px-3 py-2.5 rounded-lg transition-colors ${active ? 'bg-white/10 font-medium' : 'hover:bg-white/10'}`}>
    {icon}
    <span className="text-sm">{label}</span>
  </Link>
);

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col gap-2 p-3 overflow-y-auto h-[calc(100vh-56px)] sticky top-14">
      <SidebarItem icon={<Home size={22} />} label="Home" to="/" active={location.pathname === '/'} />
      <SidebarItem icon={<Terminal size={22} />} label="Python Labs" to="/labs" />
      <SidebarItem icon={<Compass size={22} />} label="Shorts" to="/shorts" />
      <hr className="border-white/10 my-2" />
      <div className="px-3 py-2">
        <h3 className="text-sm font-bold mb-1 flex items-center gap-2">Explore <ChevronRight size={14} /></h3>
      </div>
      <SidebarItem icon={<Brain size={22} />} label="AI & ML" to="/?cat=AI" />
      <SidebarItem icon={<Globe size={22} />} label="Web Dev" to="/?cat=Web" />
      <SidebarItem icon={<Database size={22} />} label="Data Science" to="/?cat=Data" />
      <SidebarItem icon={<Gamepad2 size={22} />} label="Game Dev" to="/?cat=Games" />
      <hr className="border-white/10 my-2" />
      <SidebarItem icon={<PlaySquare size={22} />} label="Library" to="/library" />
      <SidebarItem icon={<Clock size={22} />} label="History" to="/history" />
      <SidebarItem icon={<ThumbsUp size={22} />} label="Liked" to="/liked" />
    </aside>
  );
};

export default Sidebar;
