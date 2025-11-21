import React, { useState } from 'react';
import { BusinessInputData } from '../types';

interface InputFormProps {
  onSubmit: (data: BusinessInputData) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<BusinessInputData>({
    businessName: '',
    industry: '',
    description: '',
    targetMarket: '',
    productsServices: '',
    usp: '',
    fundingRequest: '',
    teamExperience: '',
    visionMission: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="bg-cardbg border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-slate-700 bg-slate-800/50">
          <h2 className="text-2xl font-display font-bold text-white mb-2">Configure Your Business</h2>
          <p className="text-slate-400 text-sm">Provide the core details so Robo AI can construct your roadmap.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Section 1: The Basics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-robo-300 uppercase tracking-wider">Business Name</label>
              <input
                required
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="e.g. Quantum Coffee"
                className="w-full bg-slate-900/50 border border-slate-600 text-white rounded-lg px-4 py-3 focus:border-robo-500 focus:ring-1 focus:ring-robo-500 outline-none transition-all placeholder-slate-600"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-robo-300 uppercase tracking-wider">Industry</label>
              <input
                required
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="e.g. Hospitality / Tech"
                className="w-full bg-slate-900/50 border border-slate-600 text-white rounded-lg px-4 py-3 focus:border-robo-500 focus:ring-1 focus:ring-robo-500 outline-none transition-all placeholder-slate-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-robo-300 uppercase tracking-wider">Business Idea & Description</label>
            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your business in detail. What is it? How does it work?"
              className="w-full bg-slate-900/50 border border-slate-600 text-white rounded-lg px-4 py-3 focus:border-robo-500 focus:ring-1 focus:ring-robo-500 outline-none transition-all placeholder-slate-600"
            />
          </div>

          {/* Section 2: Market & Product */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
              <label className="block text-xs font-semibold text-robo-300 uppercase tracking-wider">Target Market</label>
              <textarea
                required
                name="targetMarket"
                value={formData.targetMarket}
                onChange={handleChange}
                rows={3}
                placeholder="Who are your customers? Demographics? Interests?"
                className="w-full bg-slate-900/50 border border-slate-600 text-white rounded-lg px-4 py-3 focus:border-robo-500 focus:ring-1 focus:ring-robo-500 outline-none transition-all placeholder-slate-600"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-robo-300 uppercase tracking-wider">Products / Services</label>
              <textarea
                required
                name="productsServices"
                value={formData.productsServices}
                onChange={handleChange}
                rows={3}
                placeholder="List your key offerings."
                className="w-full bg-slate-900/50 border border-slate-600 text-white rounded-lg px-4 py-3 focus:border-robo-500 focus:ring-1 focus:ring-robo-500 outline-none transition-all placeholder-slate-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-robo-300 uppercase tracking-wider">Unique Selling Proposition (USP)</label>
            <input
              required
              name="usp"
              value={formData.usp}
              onChange={handleChange}
              placeholder="What makes you different from competitors?"
              className="w-full bg-slate-900/50 border border-slate-600 text-white rounded-lg px-4 py-3 focus:border-robo-500 focus:ring-1 focus:ring-robo-500 outline-none transition-all placeholder-slate-600"
            />
          </div>

          {/* Section 3: Optional Details */}
          <div className="pt-4 border-t border-slate-700">
            <h3 className="text-sm font-semibold text-white mb-4">Optional Details (Recommended for better results)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Funding Request ($)</label>
                    <input
                        name="fundingRequest"
                        value={formData.fundingRequest}
                        onChange={handleChange}
                        placeholder="e.g. $500,000 for equity"
                        className="w-full bg-slate-900/50 border border-slate-600 text-white rounded-lg px-4 py-3 focus:border-robo-500 focus:ring-1 focus:ring-robo-500 outline-none transition-all placeholder-slate-600"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Mission / Vision</label>
                    <input
                        name="visionMission"
                        value={formData.visionMission}
                        onChange={handleChange}
                        placeholder="Short tagline or mission statement"
                        className="w-full bg-slate-900/50 border border-slate-600 text-white rounded-lg px-4 py-3 focus:border-robo-500 focus:ring-1 focus:ring-robo-500 outline-none transition-all placeholder-slate-600"
                    />
                </div>
            </div>
            <div className="space-y-2 mt-4">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Founder/Team Experience</label>
                <textarea
                    name="teamExperience"
                    value={formData.teamExperience}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Briefly describe key team members and relevant experience."
                    className="w-full bg-slate-900/50 border border-slate-600 text-white rounded-lg px-4 py-3 focus:border-robo-500 focus:ring-1 focus:ring-robo-500 outline-none transition-all placeholder-slate-600"
                />
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-lg font-display font-bold text-lg tracking-wide uppercase transition-all shadow-lg ${
                isLoading
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-robo-600 to-robo-500 hover:from-robo-500 hover:to-robo-400 text-white shadow-robo-500/20 hover:shadow-robo-500/40'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Business Logic...
                </span>
              ) : (
                'Generate Business Plan'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
