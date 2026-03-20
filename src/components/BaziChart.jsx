import React from 'react';

const ELEMENT_COLORS = {
    Wood: 'text-emerald-600',
    Fire: 'text-rose-600',
    Earth: 'text-amber-600',
    Metal: 'text-stone-500',
    Water: 'text-sky-600',
};
const ELEMENT_BG = {
    Wood: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    Fire: 'bg-rose-50 border-rose-200 text-rose-700',
    Earth: 'bg-amber-50 border-amber-200 text-amber-700',
    Metal: 'bg-stone-100 border-stone-200 text-stone-700',
    Water: 'bg-sky-50 border-sky-200 text-sky-700',
};
const ELEMENT_TH = { Wood: 'ไม้', Fire: 'ไฟ', Earth: 'ดิน', Metal: 'ทอง', Water: 'น้ำ' };

const getCharColor = (status) => {
    if (status === 'Clash') return 'text-rose-600 font-bold'; // Branch clash → Red
    if (status === 'Ha')    return 'text-emerald-600 font-bold'; // Ha combination → Green
    return 'text-sky-600';                       // Normal → Blue
};

const CharBlock = ({ char, element, status, god, subText, size = 'md', useElementColor = false }) => {
    const colorClass = useElementColor ? ELEMENT_COLORS[element] : getCharColor(status);
    return (
        <div className="flex flex-col items-center justify-center p-1 group">
            <span className={`font-serif font-bold ${size === 'lg' ? 'text-4xl' : 'text-xl'} ${colorClass} transition-transform duration-200 group-hover:scale-105 cursor-pointer`}>{char}</span>
            {subText && <span className="text-[10px] text-stone-400 group-hover:text-stone-600 transition-colors duration-200">{subText}</span>}
        </div>
    );
};

const GodBadge = ({ god }) => {
    if (!god) return <div className="h-4"></div>;
    return <div className="text-[10px] px-1 bg-stone-700 text-white rounded-sm text-center">{god.chinese}</div>;
};

const Legend = () => (
    <div className="bg-white border border-stone-200 rounded-xl p-4 text-[11px] text-stone-500 mt-6 shadow-sm">
        <h4 className="font-bold mb-3 uppercase text-stone-800 tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-500"></span>
            คำอธิบายระบบสี
        </h4>
        <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-sky-600 rounded-full"></div><span>🔵 น้ำเงิน = ปกติ (官杀印)</span></div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-rose-600 rounded-full"></div><span>🔴 แดง = มีชง (Clash / Chong)</span></div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-emerald-600 rounded-full"></div><span>🟢 เขียว = มีภาคี/ฮะ (Combination)</span></div>
        </div>
    </div>
);

export default function BaziChart({ data }) {
    if (!data) return null;
    const { pillars, luckPillars, dayMaster, gender, stats } = data;
    const pillarOrder = [{ key: 'hour', label: 'ยาม' }, { key: 'day', label: 'วัน' }, { key: 'month', label: 'เดือน' }, { key: 'year', label: 'ปี' }];

    return (
        <div className="w-full space-y-6">
            {/* Day Master Panel */}
            <div className="bg-white rounded-xl border border-stone-200/80 p-6 flex justify-between items-center shadow-md shadow-stone-200/30">
                <div>
                    <div className="text-[10px] text-stone-400 uppercase tracking-widest mb-1 font-semibold">ดิถีเจ้าชะตา (Day Master)</div>
                    <h3 className={`text-2xl font-serif font-bold ${ELEMENT_COLORS[dayMaster.element]}`}>{dayMaster.nameTH} ({dayMaster.char})</h3>
                    <p className="text-xs text-stone-400 mt-1">เพศ: {gender === 'Male' ? 'ชาย' : 'หญิง'}</p>
                </div>
                <div className="flex gap-3">
                    {Object.entries(stats).map(([el, count]) => (
                        <div key={el} className="flex flex-col items-center">
                            <span className={`text-[10px] font-bold ${ELEMENT_COLORS[el]} mb-1`}>{ELEMENT_TH[el]}</span>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border transition-all duration-200 hover:scale-105 ${ELEMENT_BG[el]}`}>{count}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4 Pillars Grid */}
            <div className="bg-white border text-stone-800 border-stone-200 rounded-xl overflow-hidden shadow-md grid grid-cols-4 divide-x divide-stone-200">
                {pillarOrder.map(({ key, label }) => {
                    const p = pillars[key];
                    return (
                        <div key={key} className="flex flex-col text-center">
                            <div className="bg-stone-50 py-2.5 text-[11px] font-bold text-stone-500 uppercase tracking-wider border-b border-stone-200">
                                {label}
                            </div>
                            <div className="p-5 border-b border-stone-100 relative">
                                <div className="mb-2"><GodBadge god={p.gan.god} /></div>
                                <CharBlock char={p.gan.char} element={p.gan.element} status={p.gan.status} god={p.gan.god} subText={p.gan.nameTH} size="lg" />
                                {key === 'day' && <div className="absolute top-1 right-1 text-[8px] px-1 bg-amber-50 text-amber-600 border border-amber-200 rounded">DM</div>}
                            </div>
                            <div className="p-5 bg-stone-50/20">
                                <CharBlock char={p.zhi.char} element={p.zhi.element} status={p.zhi.status} god={p.zhi.god} subText={p.zhi.nameTH} size="lg" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Luck Pillars Panel */}
            <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-md overflow-hidden">
                <h3 className="text-xs font-bold text-stone-700 mb-5 border-b border-stone-100 pb-3 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
                    วัยจร และ ปีจร (Annual Pillars)
                </h3>
                <div className="overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex flex-row-reverse gap-3 min-w-max px-2">
                        {luckPillars.map((lp, idx) => {
                            const isLuckWealth = lp.gan.god?.chinese === '财' || lp.gan.god?.chinese === '才' || lp.zhi.god?.chinese === '财' || lp.zhi.god?.chinese === '才';
                            return (
                                <div key={idx} className="flex flex-col gap-2 w-24 group">
                                    <div className={`flex flex-col items-center bg-stone-50 rounded-lg border p-2 relative group-hover:border-stone-400 transition-all duration-200 ${lp.gan.status === 'Clash' || lp.zhi.status === 'Clash' ? 'border-rose-300 bg-rose-50/20' : lp.gan.status === 'Ha' || lp.zhi.status === 'Ha' ? 'border-emerald-300 bg-emerald-50/20' : 'border-stone-200'}`}>
                                        <div className="absolute top-1 right-2 text-[8px] font-mono text-stone-400 font-bold">{lp.startAge}</div>
                                        <div className={`font-serif font-bold text-xl ${ELEMENT_COLORS[lp.gan.element]}`}>{lp.gan.char}</div>
                                        <div className="w-full mt-1 mb-1"><GodBadge god={lp.gan.god} /></div>
                                        <div className={`font-serif font-bold text-xl ${ELEMENT_COLORS[lp.zhi.element]}`}>{lp.zhi.char}</div>
                                        
                                        {isLuckWealth && <span className="absolute top-1 left-3.5 text-[9px] filter drop-shadow animate-pulse" title="วัยรับทรัพย์">💰</span>}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        {lp.annualPillars.map((ap, apIdx) => {
                                            const isAnnualWealth = ap.gan.god?.chinese === '财' || ap.gan.god?.chinese === '才' || ap.zhi.god?.chinese === '财' || ap.zhi.god?.chinese === '才';
                                            return (
                                                <div key={apIdx} className={`bg-white border rounded p-1 shadow-sm hover:border-stone-300 transition-colors relative ${ap.gan.status === 'Clash' || ap.zhi.status === 'Clash' ? 'border-rose-200 bg-rose-50/40' : ap.gan.status === 'Ha' || ap.zhi.status === 'Ha' ? 'border-emerald-200 bg-emerald-50/40' : 'border-stone-100'}`}>
                                                    <div className="text-[7px] text-stone-400 font-mono text-center mb-0.5">{ap.year}</div>
                                                    {isAnnualWealth && <span className="absolute top-0.5 left-0.5 font-bold text-[7px]" title="ปีรับทรัพย์">💰</span>}
                                                    <div className="flex flex-col">
                                                        <div className="flex justify-between items-center leading-none">
                                                            <span className={`text-sm font-serif font-bold ${ELEMENT_COLORS[ap.gan.element]}`}>
                                                                {ap.gan.char}
                                                            </span>
                                                            <span className={`text-[8px] font-bold ${ELEMENT_COLORS[ap.gan.element]} opacity-60`}>{ap.gan.god?.chinese}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center leading-none mt-0.5">
                                                            <span className={`text-sm font-serif font-bold ${ELEMENT_COLORS[ap.zhi.element]}`}>
                                                                {ap.zhi.char}
                                                            </span>
                                                            <span className={`text-[8px] font-bold ${ELEMENT_COLORS[ap.zhi.element]} opacity-60`}>{ap.zhi.god?.chinese}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Legend />
        </div>
    );
}
