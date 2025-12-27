import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trash2, ArrowUp, Save, Plus, Globe, FileVideo, Settings2, 
  RefreshCw, Upload, CheckCircle2, Code, X, ChevronRight, 
  FileJson, FileCode, FileText, Download 
} from 'lucide-react';
import JSZip from 'jszip';
import { getVideos, deleteVideo, updateVideo, addVideo } from '../services/videoService';
import { Video, Category } from '../types';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [videos, setVideos] = useState<Video[]>([]);
  const [uploadType, setUploadType] = useState<'file' | 'link'>('link');
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [fileData, setFileData] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  
  // App Code Viewer State
  const [showAppCode, setShowAppCode] = useState(false);
  const [selectedFile, setSelectedFile] = useState('App.tsx');
  const [isZipping, setIsZipping] = useState(false);

  useEffect(() => {
    setVideos(getVideos());
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File too large for local storage demo (Max 10MB). Please use a link instead.");
        return;
      }
      
      setFileName(file.name);
      setIsUploading(true);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileData(event.target?.result as string);
        setIsUploading(false);
      };
      reader.onerror = () => {
        alert("Failed to read file.");
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = () => {
    if (!newTitle) return alert("Title required");
    if (uploadType === 'link' && !newUrl) return alert("URL required");
    if (uploadType === 'file' && !fileData) return alert("Please select a video file");

    const id = `user-${Date.now()}`;
    const newVideo: Video = {
      id,
      title: newTitle,
      thumbnail: 'https://picsum.photos/seed/' + id + '/800/450',
      channelName: 'Viral tube',
      views: '0 views',
      postedAt: 'Just now',
      duration: '00:00',
      description: 'User uploaded viral content.',
      codeSnippet: '# Content Published',
      category: Category.ALL,
      avatar: 'https://picsum.photos/seed/admin/100/100',
      url: uploadType === 'link' ? newUrl : fileData!,
      isUserUploaded: true
    };

    try {
      addVideo(newVideo);
      setVideos(getVideos());
      setNewTitle('');
      setNewUrl('');
      setFileData(null);
      setFileName(null);
      alert("Stream Published Successfully!");
    } catch (e) {
      alert("Storage limit reached! Local storage has limits for large file data. Try using a link or a smaller file.");
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this stream permanently?")) {
      deleteVideo(id);
      setVideos(getVideos());
    }
  };

  const handleUpdate = (id: string, updates: Partial<Video>) => {
    const video = videos.find(v => v.id === id);
    if (video) {
      const updated = { ...video, ...updates };
      updateVideo(updated);
      setVideos(getVideos());
    }
  };

  // Full Real Application Source Code for Viewing and Downloading
  const appSourceFiles: Record<string, string> = {
    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Viral tube</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
    .code-font { font-family: 'Fira Code', monospace; }
  </style>
</head>
<body class="bg-[#0f0f0f] text-white overflow-x-hidden">
  <div id="root"></div>
</body>
</html>`,
    'index.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Could not find root element");
const root = ReactDOM.createRoot(rootElement);
root.render(<React.StrictMode><App /></React.StrictMode>);`,
    'App.tsx': `import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Admin from './pages/Admin';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen overflow-hidden bg-[#0f0f0f]">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-[#0f0f0f]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/watch/:id" element={<Watch />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
};

export default App;`,
    'types.ts': `export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  views: string;
  postedAt: string;
  duration: string;
  description: string;
  codeSnippet: string;
  category: string;
  avatar: string;
  url?: string;
  isUserUploaded?: boolean;
  meta?: string;
}

export enum Category {
  ALL = 'All',
  AI = 'AI & Machine Learning',
  WEB = 'Web Development',
  DATA = 'Data Science',
  AUTOMATION = 'Automation',
  GAMES = 'Game Dev',
}`,
    'constants.ts': `import { Video, Category } from './types';

export const MOCK_VIDEOS: Video[] = [
  { 
    id: "5", 
    title: "Payal Gaming Viral video", 
    thumbnail: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af1949360708f7c3ed693f665fc4450351954ad7120bcfb72a2e9d74b0afeeafcf61317e6ef5e1a060830b8e2fbe2ab6c6419eb68be394ae487dbbc9de4ff26ee719b26", 
    url: "https://jumpshare.com/embed/HgJO9OlTf2wF4ZaWjlMw", 
    meta: "New Viral",
    channelName: "Viral tube",
    views: "10M views",
    postedAt: "Just now",
    duration: "05:12",
    description: "The most awaited viral video of Payal Gaming is finally here. Exclusive leak.",
    codeSnippet: "# Payload Extraction\\nimport viral\\nprint('Analyzing Payal Gaming Video...')",
    category: Category.ALL,
    avatar: "https://picsum.photos/seed/pg/100/100"
  }
];

export const CATEGORIES = Object.values(Category);`,
    'videoService.ts': `import { Video } from '../types';
import { MOCK_VIDEOS } from '../constants';

const STORAGE_KEY = 'pytube_library_v5';

export const getVideos = (): Video[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_VIDEOS));
    return MOCK_VIDEOS;
  }
  return JSON.parse(stored);
};

export const saveVideos = (videos: Video[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
};

export const addVideo = (video: Video) => {
  const current = getVideos();
  saveVideos([video, ...current]);
};

export const deleteVideo = (id: string) => {
  const current = getVideos();
  saveVideos(current.filter(v => v.id !== id));
};

export const updateVideo = (updatedVideo: Video) => {
  const current = getVideos();
  saveVideos(current.map(v => v.id === updatedVideo.id ? updatedVideo : v));
};`,
    'Home.tsx': `import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import VideoCard from '../components/VideoCard';
import { getVideos } from '../services/videoService';
import { Video } from '../types';

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [videos, setVideos] = useState<Video[]>([]);
  
  useEffect(() => { setVideos(getVideos()); }, []);

  const filteredVideos = videos.filter(v => {
    const matchesCat = activeCategory === 'All' ? true : v.category === activeCategory;
    return matchesCat;
  });

  return (
    <div className="flex-1 overflow-y-auto px-6 pt-4 pb-32">
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={\`px-4 py-1.5 rounded-full text-sm font-bold \${activeCategory === cat ? 'bg-red-600' : 'bg-white/5'}\`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredVideos.map(video => <VideoCard key={video.id} video={video} />)}
      </div>
    </div>
  );
};

export default Home;`,
    'Watch.tsx': `import React, { useState, useEffect } from 'react';
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

  if (!video) return <div>Stream not found.</div>;

  const isEmbed = (url?: string) => {
    if (!url) return false;
    return url.includes('jumpshare.com') || url.includes('youtube.com') || url.includes('vimeo.com');
  };

  return (
    <>
      {isLoaderVisible && <AdLoader onFinish={() => setIsLoaderVisible(false)} />}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-24">
         {/* Video Player and Meta information rendering */}
      </div>
    </>
  );
};

export default Watch;`,
    'AuthModal.tsx': `import React, { useState } from 'react';
import { Lock } from 'lucide-react';

const AuthModal = ({ isOpen, onSuccess, onClose }) => {
  const [code, setCode] = useState('');
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === '53158') onSuccess();
    else alert('Invalid Code');
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4">
      {/* Auth UI */}
    </div>
  );
};

export default AuthModal;`,
    'BottomNav.tsx': `import React, { useState } from 'react';
import { Home, Plus, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#0f0f0f] border-t border-white/10 flex justify-around items-center">
      <Link to="/"><Home size={22} /></Link>
      <button onClick={() => setIsAuthOpen(true)} className="bg-red-600 w-12 h-12 rounded-full -mt-8 shadow-lg shadow-red-600/20"><Plus /></button>
      <Link to="/"><User size={22} /></Link>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onSuccess={() => { setIsAuthOpen(false); navigate('/admin'); }} />
    </nav>
  );
};

export default BottomNav;`,
    'metadata.json': `{
  "name": "Viral tube",
  "description": "The ultimate destination for viral videos and exclusive leaks.",
  "requestFramePermissions": [
    "camera",
    "microphone"
  ]
}`
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      const srcFolder = zip.folder("src");
      
      Object.entries(appSourceFiles).forEach(([name, content]) => {
        if (name === 'index.html' || name === 'metadata.json') {
          zip.file(name, content);
        } else {
          srcFolder?.file(name, content);
        }
      });

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "viral-tube-source.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Zip generation failed:", err);
      alert("Failed to create ZIP file.");
    } finally {
      setIsZipping(false);
    }
  };

  const filteredVideos = videos.filter(v => v.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto pb-24">
      {/* Header Actions */}
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3">
          <Settings2 className="text-red-600" /> COMMAND CENTER
        </h1>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setShowAppCode(true)}
            className="bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-600/20 px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2"
          >
            <Code size={14} /> View Code
          </button>
          <button 
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="bg-green-600/10 hover:bg-green-600/20 text-green-500 border border-green-600/20 px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isZipping ? <RefreshCw size={14} className="animate-spin" /> : <Download size={14} />} 
            {isZipping ? 'Archiving...' : 'Download ZIP'}
          </button>
          <button 
            onClick={() => navigate('/')}
            className="bg-zinc-800 hover:bg-zinc-700 px-5 py-2 rounded-full text-xs font-bold transition-colors"
          >
            Exit Station
          </button>
        </div>
      </div>

      {/* Deployment Form */}
      <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-green-500/30 mb-8 shadow-2xl shadow-green-500/5">
        <h3 className="text-green-500 font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
          <Plus size={18} /> Deploy New Stream
        </h3>
        
        <div className="flex gap-2 mb-6 bg-black p-1 rounded-xl">
          <button 
            onClick={() => setUploadType('link')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors ${uploadType === 'link' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Globe size={16} /> URL / Link
          </button>
          <button 
            onClick={() => setUploadType('file')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors ${uploadType === 'file' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <FileVideo size={16} /> Direct Upload
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Stream Title</label>
            <input 
              className="w-full bg-black border border-white/10 rounded-xl p-3 focus:border-blue-500 focus:outline-none transition-colors text-sm"
              placeholder="e.g., Viral Leak 2025..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>

          {uploadType === 'link' ? (
            <div>
              <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Paste Stream URL</label>
              <input 
                className="w-full bg-black border border-white/10 rounded-xl p-3 focus:border-blue-500 focus:outline-none transition-colors text-sm"
                placeholder="https://jumpshare.com/..."
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Select Media File</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`w-full bg-black/50 border border-dashed ${fileData ? 'border-green-500/50' : 'border-white/20'} p-8 rounded-xl text-center text-sm cursor-pointer hover:bg-black/70 transition-all flex flex-col items-center justify-center gap-3`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="video/*" 
                  className="hidden" 
                />
                {isUploading ? (
                  <div className="animate-spin text-blue-500">
                    <RefreshCw size={32} />
                  </div>
                ) : fileData ? (
                  <>
                    <CheckCircle2 size={32} className="text-green-500" />
                    <span className="text-zinc-300 font-bold">{fileName}</span>
                  </>
                ) : (
                  <>
                    <Upload size={32} className="text-zinc-600" />
                    <span className="text-zinc-500 font-bold uppercase tracking-tighter">Click to select video file</span>
                  </>
                )}
              </div>
            </div>
          )}

          <button 
            onClick={handlePublish}
            disabled={isUploading}
            className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 ${isUploading ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'}`}
          >
            {isUploading ? 'DECRYPTING FILE...' : 'INITIALIZE PUBLISH'}
          </button>
        </div>
      </div>

      <div className="mb-6 relative">
        <input 
          className="w-full bg-[#111] border border-white/10 rounded-xl p-4 pl-12 focus:outline-none focus:border-red-600 transition-colors"
          placeholder="Filter live streams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Settings2 className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700" size={18} />
      </div>

      <div className="space-y-4">
        <h2 className="text-zinc-400 text-[10px] font-black uppercase tracking-[4px] mb-4 opacity-50">Active Stations ({filteredVideos.length})</h2>
        {filteredVideos.map(v => (
          <AdminVideoItem key={v.id} video={v} onDelete={handleDelete} onUpdate={handleUpdate} />
        ))}
      </div>

      {/* Full App Code Viewer Modal */}
      {showAppCode && (
        <div className="fixed inset-0 z-[2000] bg-black/98 backdrop-blur-2xl flex flex-col p-4 sm:p-8 animate-in fade-in duration-300">
          <div className="max-w-[1300px] w-full mx-auto flex flex-col h-full bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-red-600/10">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 font-black italic tracking-tighter uppercase text-sm flex items-center gap-2">
                   <Code size={16} className="text-red-500" /> VIRAL_TUBE_REPOSITORY_V5.0
                </span>
              </div>
              <button 
                onClick={() => setShowAppCode(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* File Explorer Sidebar */}
              <div className="w-48 sm:w-64 border-r border-white/5 flex flex-col bg-[#050505]">
                <div className="p-4 text-[10px] font-black uppercase tracking-widest text-zinc-600 border-b border-white/5">
                  Development Source
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                  {Object.keys(appSourceFiles).map(fileName => (
                    <button
                      key={fileName}
                      onClick={() => setSelectedFile(fileName)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${selectedFile === fileName ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'}`}
                    >
                      {fileName.endsWith('.html') ? <FileText size={14} /> : fileName.endsWith('.tsx') || fileName.endsWith('.ts') ? <FileCode size={14} /> : <FileJson size={14} />}
                      {fileName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Editor Area */}
              <div className="flex-1 flex flex-col overflow-hidden bg-[#0a0a0a]">
                <div className="px-6 py-2 bg-black/40 text-[10px] font-mono text-zinc-600 flex items-center gap-2">
                  <ChevronRight size={10} /> src/{selectedFile}
                </div>
                <div className="flex-1 overflow-auto p-6">
                  <pre className="code-font text-sm leading-relaxed text-zinc-300/90 whitespace-pre bg-transparent">
                    {appSourceFiles[selectedFile]}
                  </pre>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-black border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-zinc-700">
              <div className="flex gap-4">
                <span className="text-green-500">● LIVE_SERVER_UP</span>
                <span>UTF-8</span>
                <span>TypeScript React</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw size={10} className="animate-spin text-red-600" />
                <span className="uppercase tracking-widest font-black">Syncing Production Environment...</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminVideoItem: React.FC<{ video: Video, onDelete: (id: string) => void, onUpdate: (id: string, updates: Partial<Video>) => void }> = ({ video, onDelete, onUpdate }) => {
  const [title, setTitle] = useState(video.title);
  const [thumb, setThumb] = useState(video.thumbnail);

  const shuffleFrame = () => {
    const newSeed = Math.floor(Math.random() * 100000);
    const newThumb = `https://picsum.photos/seed/${newSeed}/800/450`;
    setThumb(newThumb);
    onUpdate(video.id, { thumbnail: newThumb });
  };

  return (
    <div className="bg-[#1a1a1a] p-5 rounded-2xl border border-white/5 relative group hover:border-white/10 transition-all">
      <div className="absolute top-4 right-4 flex gap-2">
        <button 
          onClick={shuffleFrame}
          className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          title="Shuffle Frame"
        >
          <RefreshCw size={16} />
        </button>
        <button 
          onClick={() => onDelete(video.id)}
          className="w-8 h-8 bg-red-600/20 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex gap-4 items-start mb-4">
        <div className="w-32 aspect-video bg-black rounded-lg overflow-hidden flex-shrink-0 border border-white/10 relative group-hover:border-blue-500 transition-colors">
          <img src={thumb} alt="" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/128x72/000/333?text=NO+IMG')} />
        </div>
        <div className="flex-1 pr-16">
          <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">Stream Title</label>
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-black/50 border-b border-white/10 text-sm py-1 focus:outline-none focus:border-blue-500 font-black uppercase italic"
          />
        </div>
      </div>

      <button 
        onClick={() => onUpdate(video.id, { title, thumbnail: thumb })}
        className="w-full mt-4 bg-zinc-800 hover:bg-blue-600 py-2 rounded-lg text-[10px] font-black uppercase transition-colors flex items-center justify-center gap-2 tracking-widest"
      >
        <Save size={14} /> Commit Changes
      </button>
    </div>
  );
};

export default Admin;