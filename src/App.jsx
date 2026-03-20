import { useState } from 'react';
import { calculateBazi } from './utils/bazi';
import BaziForm from './components/BaziForm';
import BaziChart from './components/BaziChart';
import AnalysisCharts from './components/AnalysisCharts';

function App() {
  const [baziData, setBaziData] = useState(null);

  const handleCalculate = (formData) => {
    const result = calculateBazi(formData.birthDate, formData.birthTime, formData.gender);
    // Add name back to result for display
    result.dayMaster.name = formData.name || result.dayMaster.name;
    setBaziData(result);
  };

  return (
    <div 
      className="min-h-screen bg-stone-50 bg-cover bg-center bg-no-repeat bg-fixed text-stone-900 py-16 px-4 font-sans selection:bg-amber-100 selection:text-amber-900 relative"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      
      <header className="mb-16 text-center">
        <div className="inline-block border-b-2 border-amber-500/30 pb-2 mb-4">
          <h1 className="text-4xl font-serif font-bold tracking-wider text-stone-100">
            <span className="text-amber-400 mr-2">八字</span>
            Bazi Calculator
          </h1>
        </div>
        <p className="text-amber-100/70 text-xs tracking-widest uppercase mt-2">Professional Almanac & Celestial Engine</p>
      </header>

      <div className="max-w-5xl mx-auto space-y-12">
        <BaziForm onCalculate={handleCalculate} />

        {baziData && (
          <div className="space-y-12 animate-fade-in">
            <BaziChart data={baziData} />

            <div className="grid grid-cols-1 gap-8 print:grid-cols-2">
              <AnalysisCharts data={baziData} />
            </div>

            <div className="flex justify-center pt-8">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 text-stone-400 hover:text-stone-800 transition-all duration-300 transform hover:scale-105 active:scale-95 bg-white shadow-sm border border-stone-200 px-4 py-2 rounded-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                พิมพ์ดวง (Print)
              </button>
            </div>

            <footer className="text-center text-[10px] text-amber-100/40 border-t border-amber-500/20 pt-8 mt-16">
              <p className="tracking-wide">คำนวณตามหลัก 24 ฤดูกาล (Solar Terms) | Precision Engineering by Celestial Bazi.</p>
            </footer>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;
