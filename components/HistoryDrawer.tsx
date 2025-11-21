import React from 'react';
import { SavedPlan } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: SavedPlan[];
  onLoad: (plan: SavedPlan) => void;
  onDelete: (id: string) => void;
}

const HistoryDrawer: React.FC<HistoryDrawerProps> = ({ isOpen, onClose, history, onLoad, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end no-print">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-slate-900 h-full shadow-2xl border-l border-slate-700 flex flex-col transform transition-transform duration-300">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between bg-slate-800/50">
          <h2 className="text-xl font-display font-bold text-white">Plan History</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-3 opacity-50">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>No saved plans yet.</p>
              <p className="text-xs mt-1">Generate a plan to see it here.</p>
            </div>
          ) : (
            history.map((item) => (
              <div 
                key={item.id} 
                className="bg-cardbg border border-slate-700 rounded-lg p-4 hover:border-robo-500 transition-all group relative"
              >
                <div onClick={() => { onLoad(item); onClose(); }} className="cursor-pointer">
                  <h3 className="font-bold text-white group-hover:text-robo-300 transition-colors mb-1">{item.businessName}</h3>
                  <p className="text-xs text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString()} • {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                  className="absolute top-4 right-4 text-slate-600 hover:text-red-400 transition-colors p-1"
                  title="Delete Plan"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
        
        <div className="p-4 border-t border-slate-700 bg-slate-900 text-center text-xs text-slate-500">
          History is saved to your browser's local storage.
        </div>
      </div>
    </div>
  );
};

export default HistoryDrawer;