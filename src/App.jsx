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
    <div className="min-h-screen bg-stone-50 py-12 px-4 font-sans selection:bg-red-100 selection:text-red-900">
      <header className="mb-12 text-center">
        <div className="inline-block border-b-4 border-double border-red-800 pb-2 mb-4">
          <h1 className="text-4xl font-serif font-bold text-stone-800 tracking-wider">
            <span className="text-red-800 mr-2">八字</span>
            Bazi Calculator
          </h1>
        </div>
        <p className="text-stone-500 text-sm tracking-widest uppercase">Professional Bazi Almanac</p>
      </header>

      <div className="max-w-7xl mx-auto space-y-12">
        <BaziForm onCalculate={handleCalculate} />

        {baziData && (
          <div className="space-y-12 animate-fade-in">
            <BaziChart data={baziData} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2">
              <AnalysisCharts data={baziData} />
            </div>

            <div className="flex justify-center pt-8">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 text-stone-500 hover:text-stone-800 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                พิมพ์ดวง (Print)
              </button>
            </div>

            <footer className="text-center text-[10px] text-stone-300 border-t border-stone-200 pt-8 mt-16">
              <p>คำนวณตามหลัก 24 ฤดูกาล (Solar Terms / Jie Qi) | Precision Engineering by Internal Bazi Engine.</p>
            </footer>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;
