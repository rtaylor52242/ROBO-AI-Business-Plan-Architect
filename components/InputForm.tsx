import React, { useState } from 'react';
import { BusinessInputData } from '../types';

const EXAMPLES: BusinessInputData[] = [
  {
    businessName: "Verde Vertical Farms",
    industry: "Agriculture / AgTech",
    description: "A high-tech urban farming initiative utilizing hydroponic vertical towers in repurposed warehouse spaces. We grow leafy greens and herbs year-round with 95% less water than traditional farming, supplying local restaurants and grocery stores within a 10-mile radius to ensure peak freshness and minimal carbon footprint.",
    targetMarket: "Local farm-to-table restaurants, high-end grocery retailers (e.g., Whole Foods), and eco-conscious urban consumers seeking pesticide-free, hyper-local produce.",
    productsServices: "Premium arugula, basil, kale, and microgreens. Subscription boxes for consumers and wholesale contracts for restaurants.",
    usp: "Hyper-local production eliminates shipping costs and spoilage, delivering harvest-day freshness that traditional agriculture cannot match.",
    fundingRequest: "$750,000 for warehouse retrofit and hydroponic equipment",
    teamExperience: "Founders include an agricultural scientist with a PhD in Hydroponics and a former supply chain manager for a major grocery chain.",
    visionMission: "To revolutionize urban food security by growing fresh, sustainable produce exactly where it is consumed."
  },
  {
    businessName: "SilverSurfer Tech Support",
    industry: "Service / Education",
    description: "A personalized, patience-first technical support and education service designed specifically for seniors. We offer in-home visits and secure remote support to help older adults master smartphones, tablets, smart home devices, and avoid online scams.",
    targetMarket: "Adults aged 65+ living independently or in retirement communities, as well as their adult children (aged 40-60) who want peace of mind for their parents.",
    productsServices: "One-on-one tech tutoring, smart home setup (video doorbells, voice assistants), scam prevention workshops, and a monthly 'IT Help Desk' subscription.",
    usp: "We prioritize patience and empowerment over quick fixes, using specialized curriculum designed for non-digital natives.",
    fundingRequest: "$50,000 for marketing and initial staffing",
    teamExperience: "Founded by a former social worker and an IT professional who realized the gap in senior-focused tech care.",
    visionMission: "To bridge the digital divide and ensure no senior feels left behind in a connected world."
  },
  {
    businessName: "SoleCraft 3D",
    industry: "Retail / Fashion Tech",
    description: "A custom footwear company using 3D scanning and printing technology to create perfectly fitted sneakers. Customers scan their feet using our mobile app, customize colors and materials, and receive a pair of shoes printed with an ergonomic lattice sole adapted to their walking pattern.",
    targetMarket: "Sneakerheads, athletes with specific biomechanical needs, and people with difficult-to-fit foot shapes (wide/narrow/flat feet).",
    productsServices: "Custom-fit 3D printed sneakers, app-based foot scanning, and limited edition artist collaboration designs.",
    usp: "The perfect fit, guaranteed. No sizes, just your foot's exact geometry, manufactured on-demand to eliminate inventory waste.",
    fundingRequest: "$1.2M for R&D and 3D printer farm expansion",
    teamExperience: "Team consists of a podiatrist, a 3D printing engineer, and a former Nike footwear designer.",
    visionMission: "To make mass-manufacturing obsolete by putting personalization and comfort first."
  },
  {
    businessName: "Zenith Digital Detox Retreats",
    industry: "Hospitality / Wellness",
    description: "Luxury off-grid cabins located in dead-zone nature reserves, offering structured digital detox programs. Guests surrender their devices upon arrival and engage in nature immersion, meditation, and analog workshops (woodworking, painting, cooking) to reset their dopamine levels.",
    targetMarket: "Burned-out tech executives, creatives, and high-stress professionals seeking to disconnect and recharge.",
    productsServices: "Weekend and week-long all-inclusive stays, guided mindfulness sessions, organic farm-to-table meals, and 'Analog Skills' workshops.",
    usp: "We guarantee zero connectivity. Our locations are physically shielded from cellular signals, providing the only true escape from the notification economy.",
    fundingRequest: "$500,000 for land acquisition and cabin construction",
    teamExperience: "Founded by a former Silicon Valley CEO and a clinical psychologist specializing in tech addiction.",
    visionMission: "To help humanity reconnect with nature and themselves by disconnecting from the cloud."
  }
];

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

  const handleInspireMe = () => {
    const randomExample = EXAMPLES[Math.floor(Math.random() * EXAMPLES.length)];
    setFormData(randomExample);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="bg-cardbg border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-slate-700 bg-slate-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold text-white mb-2">Configure Your Business</h2>
            <p className="text-slate-400 text-sm">Provide the core details so Robo AI can construct your roadmap.</p>
          </div>
          <button
            type="button"
            onClick={handleInspireMe}
            className="px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 text-sm font-medium rounded-lg border border-indigo-500/30 transition-all flex items-center gap-2 w-fit shrink-0"
            title="Fill with example data"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            Inspire Me
          </button>
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