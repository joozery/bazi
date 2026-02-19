import React from 'react';

const ELEMENT_COLORS = {
    Wood: 'text-[#008000]', Fire: 'text-[#FF0000]', Earth: 'text-[#FF0000]', Metal: 'text-[#0000FF]', Water: 'text-[#0000FF]',
};
const ELEMENT_BG = {
    Wood: 'bg-emerald-50', Fire: 'bg-rose-50', Earth: 'bg-rose-50', Metal: 'bg-sky-50', Water: 'bg-sky-50',
};
const ELEMENT_TH = { Wood: 'ไม้', Fire: 'ไฟ', Earth: 'ดิน', Metal: 'ทอง', Water: 'น้ำ' };

const getStatusColor = (status) => {
    if (status === 'Clash') return 'text-[#FF1111]'; // Sharp Red
    if (status === 'Ha') return 'text-[#009900]';    // Deep Green
    return 'text-[#1111FF]';                        // Pure Blue
};

const CharBlock = ({ char, element, subText, size = 'md' }) => (
    <div className="flex flex-col items-center justify-center p-1">
        <span className={`font-serif font-bold ${size === 'lg' ? 'text-4xl' : 'text-xl'} ${ELEMENT_COLORS[element]}`}>{char}</span>
        {subText && <span className="text-[10px] text-stone-500">{subText}</span>}
    </div>
);

const GodBadge = ({ god }) => {
    if (!god) return <div className="h-4"></div>;
    return <div className="text-[10px] px-1 bg-stone-700 text-white rounded-sm text-center">{god.chinese}</div>;
};

const Legend = () => (
    <div className="bg-stone-50 border border-stone-200 rounded p-4 text-[11px] text-stone-600">
        <h4 className="font-bold mb-2 uppercase text-stone-800">คำอธิบายระบบสี (Relationship Legend)</h4>
        <div className="flex gap-6">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#1111FF] rounded-sm"></div><span>ปกติ/ส่งเสริม (Normal)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#FF1111] rounded-sm"></div><span>ชง/ทำลาย (Clash/Stress)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#009900] rounded-sm"></div><span>ฮะ/รวมธาตุ (Combination)</span></div>
        </div>
    </div>
);

export default function BaziChart({ data }) {
    if (!data) return null;
    const { pillars, luckPillars, dayMaster, gender, stats } = data;
    const pillarOrder = [{ key: 'hour', label: 'ยาม' }, { key: 'day', label: 'วัน' }, { key: 'month', label: 'เดือน' }, { key: 'year', label: 'ปี' }];

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-white rounded border p-6 flex justify-between items-center shadow-sm">
                <div>
                    <div className="text-[10px] text-stone-400 uppercase mb-1">ดิถีเจ้าชะตา</div>
                    <h3 className="text-xl font-serif font-bold text-stone-800">{dayMaster.nameTH} ({dayMaster.char})</h3>
                    <p className="text-xs text-stone-400 mt-1">เพศ: {gender === 'Male' ? 'ชาย' : 'หญิง'}</p>
                </div>
                <div className="flex gap-3">
                    {Object.entries(stats).map(([el, count]) => (
                        <div key={el} className="flex flex-col items-center">
                            <span className={`text-[10px] font-bold ${ELEMENT_COLORS[el]}`}>{ELEMENT_TH[el]}</span>
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${ELEMENT_BG[el]} ${ELEMENT_COLORS[el].replace('text-', 'border-')}`}>{count}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white border-2 border-double border-stone-300 grid grid-cols-4 divide-x divide-stone-300">
                {pillarOrder.map(({ key, label }) => {
                    const p = pillars[key];
                    return (
                        <div key={key} className="flex flex-col text-center">
                            <div className="bg-stone-100 py-1.5 text-[10px] font-bold text-stone-600 uppercase border-b border-stone-300">{label}</div>
                            <div className="p-4 border-b border-stone-200">
                                <div className="mb-2"><GodBadge god={p.gan.god} /></div>
                                <CharBlock char={p.gan.char} element={p.gan.element} subText={p.gan.nameTH} size="lg" />
                            </div>
                            <div className="p-4 bg-stone-50/20">
                                <CharBlock char={p.zhi.char} element={p.zhi.element} subText={p.zhi.nameTH} size="lg" />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-white border shadow-sm p-4 overflow-hidden">
                <h3 className="text-xs font-bold text-stone-700 mb-4 border-b pb-2 uppercase tracking-wide">วัยจร และ ปีจร (Annual Pillars)</h3>
                <div className="overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex flex-row-reverse gap-3 min-w-max">
                        {luckPillars.map((lp, idx) => (
                            <div key={idx} className="flex flex-col gap-2 w-24">
                                <div className="flex flex-col items-center bg-stone-50 rounded border border-stone-200 p-2 relative">
                                    <div className="absolute top-0 right-1 text-[8px] text-stone-300">{lp.startAge}</div>
                                    <div className={`font-serif font-bold text-2xl ${getStatusColor(lp.gan.status)}`}>{lp.gan.char}</div>
                                    <div className="w-full mt-1 mb-2"><GodBadge god={lp.gan.god} /></div>
                                    <div className={`font-serif font-bold text-2xl ${getStatusColor(lp.zhi.status)}`}>{lp.zhi.char}</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    {lp.annualPillars.map((ap, apIdx) => (
                                        <div key={apIdx} className="bg-white border border-stone-100 rounded p-1 shadow-sm">
                                            <div className="text-[7px] text-stone-300 text-center mb-0.5">{ap.year}</div>
                                            <div className="flex flex-col">
                                                <div className="flex justify-between items-center leading-none">
                                                    <span className={`text-sm font-serif font-bold ${getStatusColor(ap.gan.status)}`}>{ap.gan.char}</span>
                                                    <span className={`text-[9px] font-bold ${getStatusColor(ap.gan.status)} opacity-70`}>{ap.gan.god?.chinese}</span>
                                                </div>
                                                <div className="flex justify-between items-center leading-none mt-0.5">
                                                    <span className={`text-sm font-serif font-bold ${getStatusColor(ap.zhi.status)}`}>{ap.zhi.char}</span>
                                                    <span className={`text-[9px] font-bold ${getStatusColor(ap.zhi.status)} opacity-70`}>{ap.zhi.god?.chinese}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Legend />
        </div>
    );
}
