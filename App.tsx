
import React from 'react';
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
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
};

export default App;
