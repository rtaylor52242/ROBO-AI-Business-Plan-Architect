import React, { useState, useEffect } from 'react';
import { AppStatus, BusinessInputData, BusinessPlan, SavedPlan } from './types';
import { generateBusinessPlan } from './services/geminiService';
import InputForm from './components/InputForm';
import PlanDisplay from './components/PlanDisplay';
import HistoryDrawer from './components/HistoryDrawer';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.INPUT);
  const [plan, setPlan] = useState<BusinessPlan | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [businessName, setBusinessName] = useState<string>('');
  
  // History State
  const [history, setHistory] = useState<SavedPlan[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('robo_ai_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const saveToHistory = (name: string, newPlan: BusinessPlan) => {
    const newItem: SavedPlan = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      businessName: name,
      plan: newPlan
    };
    const updatedHistory = [newItem, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('robo_ai_history', JSON.stringify(updatedHistory));
  };

  const handleDeleteHistory = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('robo_ai_history', JSON.stringify(updatedHistory));
  };

  const handleLoadHistory = (savedItem: SavedPlan) => {
    setPlan(savedItem.plan);
    setBusinessName(savedItem.businessName);
    setStatus(AppStatus.COMPLETE);
  };

  const handleFormSubmit = async (data: BusinessInputData) => {
    setStatus(AppStatus.GENERATING);
    setBusinessName(data.businessName);
    setErrorMsg('');

    try {
      const generatedPlan = await generateBusinessPlan(data);
      setPlan(generatedPlan);
      setStatus(AppStatus.COMPLETE);
      saveToHistory(data.businessName, generatedPlan);
    } catch (err: any) {
      console.error(err);
      setStatus(AppStatus.ERROR);
      setErrorMsg(err.message || "An unexpected error occurred while generating the plan.");
    }
  };

  const handleReset = () => {
    setPlan(null);
    setStatus(AppStatus.INPUT);
    setBusinessName('');
  };

  return (
    <div className="min-h-screen bg-darkbg text-slate-200 flex flex-col font-sans selection:bg-robo-500 selection:text-white">
      
      <HistoryDrawer 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
        history={history}
        onLoad={handleLoadHistory}
        onDelete={handleDeleteHistory}
      />

      {/* Header */}
      <header className="py-6 px-8 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-robo-400 to-robo-600 flex items-center justify-center shadow-lg shadow-robo-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-white tracking-wide cursor-pointer" onClick={handleReset}>ROBO <span className="text-robo-400">AI</span></h1>
              <p className="text-xs text-slate-400 tracking-wider uppercase">Business Plan Architect</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsHistoryOpen(true)}
              className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full border border-slate-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              History
            </button>
            <div className="hidden md:block text-sm text-slate-500">
              Powered by Gemini 2.5
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-robo-500/10 rounded-full blur-3xl pointer-events-none -z-10 mix-blend-screen"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10 mix-blend-screen"></div>

        {status === AppStatus.COMPLETE && plan ? (
          <PlanDisplay plan={plan} businessName={businessName} onReset={handleReset} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
            {status === AppStatus.ERROR && (
              <div className="max-w-xl w-full mb-8 bg-red-900/20 border border-red-500/50 text-red-200 p-4 rounded-lg flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 shrink-0 text-red-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                <div>
                  <h3 className="font-bold">Generation Failed</h3>
                  <p className="text-sm mt-1">{errorMsg}</p>
                  <button onClick={() => setStatus(AppStatus.INPUT)} className="mt-3 text-xs uppercase font-bold tracking-wide hover:underline">Try Again</button>
                </div>
              </div>
            )}

            {status === AppStatus.INPUT && (
              <InputForm onSubmit={handleFormSubmit} isLoading={false} />
            )}

            {status === AppStatus.GENERATING && (
              <div className="flex flex-col items-center text-center space-y-6 max-w-md animate-pulse">
                  <div className="w-24 h-24 relative">
                    <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-robo-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-robo-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                        </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white">Analyzing Data</h3>
                    <p className="text-slate-400 mt-2">Robo AI is constructing your {businessName ? businessName : 'business'} strategy. This usually takes about 10-20 seconds.</p>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-robo-500 w-1/2 animate-[shimmer_2s_infinite_linear]"></div>
                  </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-800 text-center text-slate-600 text-sm no-print">
        <p>&copy; {new Date().getFullYear()} Robo AI Generator. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;