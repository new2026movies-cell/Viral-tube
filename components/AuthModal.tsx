
import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '53158') {
      onSuccess();
      setCode('');
      setError(false);
    } else {
      setError(true);
      setCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md px-4">
      <div className="bg-[#111] w-full max-w-[350px] p-8 rounded-3xl border border-white/10 text-center shadow-2xl">
        <div className="mx-auto w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
          <Lock className="text-red-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold mb-2">Security Check</h2>
        <p className="text-zinc-400 text-sm mb-6">Enter Admin Code to enter Command Center</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            autoFocus
            className={`w-full bg-black border ${error ? 'border-red-600' : 'border-white/10'} p-4 rounded-xl text-center text-2xl tracking-[10px] font-bold focus:outline-none focus:border-red-600 transition-colors mb-4`}
            placeholder="•••••"
            maxLength={5}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          {error && <p className="text-red-500 text-xs mb-4">Access Denied: Invalid Code</p>}
          
          <div className="flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-zinc-800 rounded-xl font-bold text-zinc-400 hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-2 py-3 bg-red-600 rounded-xl font-bold hover:bg-red-700 transition-colors px-8"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
