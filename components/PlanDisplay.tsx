import React, { useState, useRef } from 'react';
import { BusinessPlan } from '../types';

interface PlanDisplayProps {
  plan: BusinessPlan;
  businessName: string;
  onReset: () => void;
}

const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan, businessName, onReset }) => {
  const [activeSection, setActiveSection] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Simple copy to clipboard function
  const handleCopy = () => {
    if (plan[activeSection]) {
      navigator.clipboard.writeText(plan[activeSection].content);
      alert('Section content copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    const content = plan.map(section => `# ${section.title}\n\n${section.content}\n\n`).join('---\n\n');
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${businessName.replace(/\s+/g, '_')}_Business_Plan.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-darkbg text-slate-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-cardbg no-print sticky top-0 z-20 shadow-lg">
        <h2 className="text-xl font-display font-bold text-robo-400 truncate max-w-md">
          {businessName} <span className="text-slate-500 text-sm font-sans font-normal">| Business Plan</span>
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onReset}
            className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            New Plan
          </button>
          <button
            onClick={handleDownloadMarkdown}
            className="hidden sm:flex px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded shadow-lg transition-all items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Save MD
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-robo-600 hover:bg-robo-500 text-white text-sm font-bold rounded shadow-lg transition-all flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
            </svg>
            Export PDF
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-slate-900 border-r border-slate-700 overflow-y-auto hidden md:block no-print shrink-0">
          <div className="p-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Table of Contents</h3>
            <nav className="space-y-1">
              {plan.map((section, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSection(index)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === index
                      ? 'bg-robo-900/50 text-robo-300 border-l-2 border-robo-400'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile Nav */}
        <div className="md:hidden p-4 border-b border-slate-700 bg-slate-800 no-print">
            <select 
                className="w-full bg-slate-900 text-white p-2 rounded border border-slate-600 focus:border-robo-500 outline-none"
                value={activeSection}
                onChange={(e) => setActiveSection(Number(e.target.value))}
            >
                {plan.map((section, index) => (
                    <option key={index} value={index}>{section.title}</option>
                ))}
            </select>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-darkbg p-6 md:p-12 relative print:overflow-visible print:h-auto print:block">
          
          {/* Print Only Header */}
          <div className="hidden print-only mb-8 border-b border-black pb-4">
            <h1 className="text-4xl font-bold text-black mb-2">{businessName}</h1>
            <p className="text-gray-600">Generated by Robo AI</p>
            <p className="text-xs text-gray-400 mt-2">Generated on {new Date().toLocaleDateString()}</p>
          </div>

          <div className="max-w-4xl mx-auto bg-cardbg md:p-10 p-6 rounded-lg shadow-xl border border-slate-700 print:shadow-none print:border-none print:bg-white print:p-0 print:text-black">
            
            {/* Header for the current section */}
            <div className="flex justify-between items-start mb-6 border-b border-slate-700 pb-4 print:hidden">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                {plan[activeSection].title}
              </h2>
              <button onClick={handleCopy} className="text-slate-400 hover:text-robo-300 transition-colors p-2" title="Copy Section">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
              </button>
            </div>

            {/* Display Content - Simple markdown-like rendering */}
            <div ref={contentRef} className="prose prose-invert prose-lg max-w-none print:prose-black">
                {/* Print View Loop - Shows ALL sections for PDF export */}
                <div className="hidden print-only space-y-8">
                     {plan.map((section, idx) => (
                        <div key={idx} className="break-inside-avoid page-break-after-auto">
                            <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide border-b border-gray-300 pb-2 mt-8">{section.title}</h2>
                            <div className="whitespace-pre-wrap font-serif leading-relaxed text-justify text-sm">
                                {section.content}
                            </div>
                        </div>
                     ))}
                </div>

                {/* Interactive View - Shows ONLY active section */}
                <div className="print:hidden whitespace-pre-wrap leading-relaxed text-slate-300 font-sans">
                     {plan[activeSection].content}
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PlanDisplay;