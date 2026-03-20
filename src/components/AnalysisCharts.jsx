import React from 'react';

const ELEMENTS = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
const ELEMENTS_TH = { 'Wood': 'ไม้', 'Fire': 'ไฟ', 'Earth': 'ดิน', 'Metal': 'ทอง', 'Water': 'น้ำ' };

const getStructureStats = (dayMasterElement, stats) => {
    const meIdx = ELEMENTS.indexOf(dayMasterElement);

    const getCount = (offset) => {
        const targetIdx = (meIdx + offset) % 5;
        const targetEl = ELEMENTS[targetIdx];
        return stats[targetEl] || 0;
    };

    return [
        { name: 'เพื่อน (Companion)', nameTH: 'เพื่อน/คู่แข่ง', value: getCount(0), element: ELEMENTS[meIdx] }, // Same
        { name: 'ผลงาน (Output)', nameTH: 'ก่อเกิด/ผลงาน', value: getCount(1), element: ELEMENTS[(meIdx + 1) % 5] }, // Produces
        { name: 'โชคลาภ (Wealth)', nameTH: 'โชคลาภ/ทรัพย์สิน', value: getCount(2), element: ELEMENTS[(meIdx + 2) % 5] }, // Controls
        { name: 'อำนาจ (Influence)', nameTH: 'อำนาจ/บารมี', value: getCount(3), element: ELEMENTS[(meIdx + 3) % 5] }, // Controlled By
        { name: 'ปัญญา (Resource)', nameTH: 'ปัญญา/อุปถัมภ์', value: getCount(4), element: ELEMENTS[(meIdx + 4) % 5] }, // Produced By
    ];
};

const PolarGrid = () => (
    <g className="text-stone-200">
        {[20, 40, 60, 80, 100].map(r => (
            <circle key={r} cx="150" cy="150" r={r} fill="none" stroke="currentColor" strokeDasharray="4 4" />
        ))}
        {[0, 72, 144, 216, 288].map(deg => {
            const rad = (deg - 90) * Math.PI / 180;
            const x = 150 + 100 * Math.cos(rad);
            const y = 150 + 100 * Math.sin(rad);
            return <line key={deg} x1="150" y1="150" x2={x} y2={y} stroke="currentColor" />;
        })}
    </g>
);

export default function AnalysisCharts({ data }) {
    if (!data) return null;
    const { dayMaster, stats } = data;
    const structures = getStructureStats(dayMaster.element, stats);

    // Normalize for chart (assuming max count around 5-8 for scaling)
    const maxVal = Math.max(...structures.map(s => s.value), 4);

    const points = structures.map((s, i) => {
        const angle = (i * 72 - 90) * Math.PI / 180; // Start at top (-90 deg), evenly spaced
        const r = (s.value / maxVal) * 100; // Radius up to 100
        const x = 150 + r * Math.cos(angle);
        const y = 150 + r * Math.sin(angle);
        return `${x},${y}`;
    }).join(' ');

    // Labels
    const labels = structures.map((s, i) => {
        const angle = (i * 72 - 90) * Math.PI / 180;
        const r = 130;
        const x = 150 + r * Math.cos(angle);
        const y = 150 + r * Math.sin(angle);
        return (
            <g key={s.name}>
                <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="text-xs font-bold fill-stone-600 font-serif">
                    {s.nameTH.split('/')[0]}
                </text>
                <text x={x} y={y + 12} textAnchor="middle" dominantBaseline="middle" className="text-[9px] fill-stone-400">
                    {s.value} ({ELEMENTS_TH[s.element]})
                </text>
            </g>
        );
    });


    return (
        <div className="bg-white border border-stone-200 rounded-xl p-6 flex flex-col md:flex-row gap-8 w-full shadow-md shadow-stone-200/30">

            {/* Radar Chart */}
            <div className="flex-1 flex flex-col items-center justify-center">
                <h3 className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
                    โครงสร้างดวง (5 Structures)
                </h3>
                <svg width="300" height="300" viewBox="0 0 300 300" className="border border-stone-100 rounded-full bg-stone-50">
                    <g className="text-stone-300">
                        {[20, 40, 60, 80, 100].map(r => (
                            <circle key={r} cx="150" cy="150" r={r} fill="none" stroke="currentColor" strokeDasharray="3 3" />
                        ))}
                        {[0, 72, 144, 216, 288].map(deg => {
                            const rad = (deg - 90) * Math.PI / 180;
                            const x = 150 + 100 * Math.cos(rad);
                            const y = 150 + 100 * Math.sin(rad);
                            return <line key={deg} x1="150" y1="150" x2={x} y2={y} stroke="currentColor" strokeWidth="1" />;
                        })}
                    </g>
                    <polygon points={points} fill="rgba(217, 119, 6, 0.1)" stroke="#d97706" strokeWidth="1.5" />
                    {structures.map((s, i) => {
                        const angle = (i * 72 - 90) * Math.PI / 180;
                        const r = (s.value / maxVal) * 100;
                        const x = 150 + r * Math.cos(angle);
                        const y = 150 + r * Math.sin(angle);
                        return <circle key={i} cx={x} cy={y} r="3.5" fill="#d97706" />;
                    })}
                    {structures.map((s, i) => {
                        const angle = (i * 72 - 90) * Math.PI / 180;
                        const r = 130;
                        const x = 150 + r * Math.cos(angle);
                        const y = 150 + r * Math.sin(angle);
                        return (
                            <g key={s.name}>
                                <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="text-xs font-bold fill-stone-700 font-serif">
                                    {s.nameTH.split('/')[0]}
                                </text>
                                <text x={x} y={y + 12} textAnchor="middle" dominantBaseline="middle" className="text-[9px] fill-stone-400">
                                    {s.value} ({ELEMENTS_TH[s.element]})
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* Simple Stats List */}
            <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
                    กำลังธาตุ (Element Strength)
                </h3>
                <div className="space-y-4">
                    {structures.map((s) => (
                        <div key={s.name} className="group">
                            <div className="flex justify-between text-sm mb-1.5 text-stone-600">
                                <span className="font-serif group-hover:text-amber-700 transition-colors duration-200">{s.nameTH}</span>
                                <span className="font-bold text-stone-500 font-mono text-xs">{s.value}</span>
                            </div>
                            <div className="w-full bg-stone-100 rounded-full h-1.5">
                                <div
                                    className="h-full rounded-full bg-amber-600/80 transition-all duration-300"
                                    style={{ width: `${(s.value / 8) * 100}%` }} // Approximate scale
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
