import { useState } from 'react';

export default function BaziForm({ onCalculate }) {
    const [formData, setFormData] = useState({
        name: '',
        birthDate: new Date().toISOString().split('T')[0],
        birthTimeStart: new Date().toTimeString().split(' ')[0].substring(0, 5),
        birthTimeEnd: new Date().toTimeString().split(' ')[0].substring(0, 5),
        gender: 'Male',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Calculate average time for Bazi engine
        const [h1, m1] = formData.birthTimeStart.split(':').map(Number);
        const [h2, m2] = formData.birthTimeEnd.split(':').map(Number);
        
        let mins1 = h1 * 60 + m1;
        let mins2 = h2 * 60 + m2;
        
        if (mins2 < mins1) {
            mins2 += 24 * 60; // Crosses midnight
        }
        
        let avgMins = Math.round((mins1 + mins2) / 2) % (24 * 60);
        const avgH = Math.floor(avgMins / 60);
        const avgM = avgMins % 60;
        const computedTime = `${String(avgH).padStart(2, '0')}:${String(avgM).padStart(2, '0')}`;

        onCalculate({
            ...formData,
            birthTime: computedTime
        });
    };

    return (
        <div className="bg-white border border-stone-100 rounded-xl p-8 shadow-md shadow-stone-200/40 transition-shadow duration-300 hover:shadow-lg w-full">
            <div className="flex items-center justify-between mb-8 border-b border-stone-100 pb-4">
                <h2 className="text-lg font-serif font-bold text-stone-800 tracking-wide flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    คำนวณดวงชะตา <span className="text-stone-400 font-light text-xs ml-1">(Calculate)</span>
                </h2>
                <span className="text-xs text-stone-400 tracking-wider">กรอกข้อมูลให้ครบถ้วน</span>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                {/* Name */}
                <div className="md:col-span-1">
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">ชื่อ (Name)</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-stone-50 border border-stone-200 hover:border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10 focus:outline-none rounded-lg px-3 py-2 transition-all duration-200 text-stone-800 placeholder-stone-300 text-sm"
                        placeholder="ระบุชื่อ"
                    />
                </div>

                {/* Date */}
                <div className="md:col-span-1">
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">วันเกิด (Date)</label>
                    <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className="w-full bg-stone-50 border border-stone-200 hover:border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10 focus:outline-none rounded-lg px-3 py-2 transition-all duration-200 text-stone-800 text-sm"
                    />
                </div>

                {/* Time Range */}
                <div className="md:col-span-1">
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">เวลาเกิด (Time Range)</label>
                    <div className="flex items-center gap-1.5 bg-stone-50 rounded-lg border border-stone-200 p-1">
                        <input
                            type="time"
                            name="birthTimeStart"
                            value={formData.birthTimeStart}
                            onChange={handleChange}
                            className="bg-transparent border-none focus:outline-none text-stone-800 text-xs w-full px-1 min-w-[65px]"
                        />
                        <span className="text-stone-400 text-xs px-0.5">ถึง</span>
                        <input
                            type="time"
                            name="birthTimeEnd"
                            value={formData.birthTimeEnd}
                            onChange={handleChange}
                            className="bg-transparent border-none focus:outline-none text-stone-800 text-xs w-full px-1 min-w-[65px]"
                        />
                    </div>
                </div>

                {/* Gender */}
                <div className="md:col-span-1">
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">เพศ (Gender)</label>
                    <div className="flex bg-stone-50 rounded-lg p-1 border border-stone-200">
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, gender: 'Male' }))}
                            className={`flex-1 py-1.5 text-xs rounded-md transition-all duration-200 ${formData.gender === 'Male' ? 'bg-white shadow-sm text-stone-800 font-bold border border-stone-200/60' : 'text-stone-400 hover:text-stone-600'}`}
                        >
                            ชาย
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, gender: 'Female' }))}
                            className={`flex-1 py-1.5 text-xs rounded-md transition-all duration-200 ${formData.gender === 'Female' ? 'bg-white shadow-sm text-stone-800 font-bold border border-stone-200/60' : 'text-stone-400 hover:text-stone-600'}`}
                        >
                            หญิง
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <div className="md:col-span-4 flex justify-end mt-4">
                    <button
                        type="submit"
                        className="bg-stone-800 hover:bg-stone-700 text-stone-50 px-8 py-2 rounded-lg font-bold tracking-wider transition-all duration-200 shadow-md active:scale-95 text-sm"
                    >
                        คำนวณ
                    </button>
                </div>
            </form>
        </div>
    );
}
