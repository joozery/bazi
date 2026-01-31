import React from 'react';

const ELEMENT_COLORS = {
    Wood: 'text-emerald-800',
    Fire: 'text-rose-800',
    Earth: 'text-amber-800',
    Metal: 'text-slate-700',
    Water: 'text-sky-800',
};

const ELEMENT_BG = {
    Wood: 'bg-emerald-50',
    Fire: 'bg-rose-50',
    Earth: 'bg-amber-50',
    Metal: 'bg-slate-50',
    Water: 'bg-sky-50',
};

const ELEMENT_TH = {
    Wood: 'ไม้',
    Fire: 'ไฟ',
    Earth: 'ดิน',
    Metal: 'ทอง',
    Water: 'น้ำ'
};

const GOD_COLORS = {
    'Friend': 'bg-teal-600 text-white',
    'RobWealth': 'bg-pink-600 text-white',
    'EatingGod': 'bg-emerald-600 text-white',
    'HurtingOfficer': 'bg-orange-600 text-white',
    'DirectWealth': 'bg-indigo-600 text-white',
    'IndirectWealth': 'bg-violet-600 text-white',
    'DirectOfficer': 'bg-sky-700 text-white',
    'SevenKillings': 'bg-red-700 text-white',
    'DirectResource': 'bg-amber-600 text-white',
    'IndirectResource': 'bg-stone-600 text-white',
};

// Chinese Calligraphy Block
const CharBlock = ({ char, element, subText, size = 'md' }) => {
    const textSize = size === 'lg' ? 'text-4xl' : 'text-xl';
    return (
        <div className="flex flex-col items-center justify-center p-1">
            <span className={`font-serif font-bold ${textSize} ${ELEMENT_COLORS[element]}`}>
                {char}
            </span>
            {subText && <span className="text-[10px] text-stone-500 transform scale-90">{subText}</span>}
        </div>
    );
};

const GodBadge = ({ god }) => {
    if (!god) return <div className="h-4 w-8"></div>; // Placeholder
    return (
        <div className={`text-[9px] px-1 py-0.5 rounded-sm shadow-sm w-full text-center truncate ${GOD_COLORS[god.name.replace(/\s/g, '')] || 'bg-stone-400'}`}>
            {god.nameTH}
        </div>
    );
};

export default function BaziChart({ data }) {
    if (!data) return null;

    const { pillars, luckPillars, dayMaster, gender, stats } = data;

    // Pillars to render: Hour -> Day -> Month -> Year (Left to Right visual)
    const pillarOrder = [
        { key: 'hour', label: 'ยาม (Hour)' },
        { key: 'day', label: 'วัน (Day)' },
        { key: 'month', label: 'เดือน (Month)' },
        { key: 'year', label: 'ปี (Year)' },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8 print:space-y-4">

            {/* Basic Info Header */}
            <div className="bg-white rounded border border-stone-200 p-6 flex flex-col md:flex-row justify-between items-center shadow-sm">
                <div className="text-center md:text-left">
                    <div className="text-xs text-stone-400 uppercase tracking-widest mb-1">ดิถีเจ้าชะตา (Day Master)</div>
                    <h3 className="text-2xl font-serif font-bold text-stone-800">{dayMaster.nameTH} ({dayMaster.char})</h3>
                    <p className="text-sm text-stone-500 mt-1">เพศ: {gender === 'Male' ? 'ชาย' : 'หญิง'}</p>
                </div>

                <div className="flex gap-4 mt-4 md:mt-0">
                    {/* Element Summary */}
                    {Object.entries(stats).map(([el, count]) => (
                        <div key={el} className="flex flex-col items-center">
                            <span className={`text-xs font-bold ${ELEMENT_COLORS[el]}`}>{ELEMENT_TH[el]}</span>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${ELEMENT_BG[el]} ${ELEMENT_COLORS[el].replace('text-', 'border-')}`}>
                                {count}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Four Pillars Chart */}
            <div className="bg-white border-2 border-double border-stone-300 shadow-md">
                <div className="grid grid-cols-4 divide-x divide-stone-300">

                    {pillarOrder.map(({ key, label }) => {
                        const p = pillars[key];
                        return (
                            <div key={key} className="flex flex-col">
                                {/* Header */}
                                <div className="bg-stone-100 py-2 text-center text-xs font-bold text-stone-600 uppercase tracking-widest border-b border-stone-300">
                                    {label}
                                </div>

                                {/* Heavenly Stem */}
                                <div className="flex flex-col items-center justify-center p-4 min-h-[110px] border-b border-stone-200">
                                    <div className="w-16 mb-2">
                                        {key !== 'day' ? (
                                            <GodBadge god={p.gan.god} />
                                        ) : (
                                            <div className="text-[9px] px-1 py-0.5 rounded-sm bg-stone-700 text-white text-center">ดิถี</div>
                                        )}
                                    </div>

                                    <CharBlock
                                        char={p.gan.char}
                                        element={p.gan.element}
                                        subText={p.gan.nameTH}
                                        size="lg"
                                    />
                                </div>

                                {/* Earthly Branch */}
                                <div className="flex flex-col items-center justify-center p-4 min-h-[110px] bg-stone-50/30">
                                    <CharBlock
                                        char={p.zhi.char}
                                        element={p.zhi.element}
                                        subText={p.zhi.nameTH}
                                        size="lg"
                                    />
                                </div>

                                {/* Hidden Stems */}
                                <div className="flex flex-col gap-1 p-2 bg-stone-50 text-[10px] border-t border-stone-200 flex-grow">
                                    {p.zhi.hiddenStems.map((hs, idx) => (
                                        <div key={idx} className="flex items-center justify-between px-2 py-1 bg-white rounded-sm border border-stone-100 shadow-sm">
                                            <span className={`font-bold ${ELEMENT_COLORS[hs.element]}`}>{hs.char}</span>
                                            <span className="text-stone-400">{hs.god?.nameTH}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>

            {/* Luck Pillars & Annual Pillars */}
            <div className="bg-white border border-stone-200 shadow-sm p-4 overflow-hidden">
                <h3 className="text-sm font-bold text-stone-700 mb-4 border-b border-stone-100 pb-2 uppercase tracking-wide">
                    วัยจร และ ปีจร (Luck & Annual Pillars)
                </h3>

                <div className="overflow-x-auto pb-4 custom-scrollbar">
                    {/* Use flex-row-reverse to render Right-to-Left (Oldest to Youngest order as per traditional charts) */}
                    <div className="flex flex-row-reverse gap-4 min-w-max px-2">
                        {luckPillars.map((lp, idx) => (
                            <div key={idx} className="flex flex-col gap-3 w-20">

                                {/* Luck Pillar Header (The 10-Year Master) */}
                                <div className="flex flex-col items-center bg-stone-100 rounded border border-stone-300 p-2 shadow-sm">
                                    <div className="flex justify-between w-full text-[9px] text-stone-500 font-mono mb-1">
                                        <span>{lp.startAge}</span>
                                        <span>{lp.startAge + 9}</span>
                                    </div>
                                    <div className="text-[10px] text-stone-400 mb-2">{lp.startYear}</div>

                                    <CharBlock char={lp.gan.char} element={lp.gan.element} size="md" />
                                    <div className="w-full my-1"><GodBadge god={lp.gan.god} /></div>
                                    <div className="w-8 h-px bg-stone-300 my-1"></div>
                                    <CharBlock char={lp.zhi.char} element={lp.zhi.element} subText={lp.zhi.nameTH} size="md" />
                                </div>

                                {/* Annual Pillars (List of 10 Years) */}
                                <div className="flex flex-col gap-1">
                                    {lp.annualPillars && lp.annualPillars.map((ap, apIdx) => (
                                        <div key={apIdx} className="group relative flex flex-col items-center p-1 bg-white border border-stone-100 rounded hover:border-red-200 transition-colors cursor-default">
                                            {/* Tooltip or small year label */}
                                            <div className="text-[8px] text-stone-300 mb-0.5 font-mono group-hover:text-red-400">{ap.year}</div>

                                            <div className="grid grid-cols-1 gap-0.5 w-full text-center">
                                                <span className={`text-sm font-serif font-bold ${ELEMENT_COLORS[ap.gan.element]}`}>{ap.gan.char}</span>
                                                <span className={`text-sm font-serif font-bold ${ELEMENT_COLORS[ap.zhi.element]}`}>{ap.zhi.char}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}
