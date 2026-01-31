import { useState } from 'react';

export default function BaziForm({ onCalculate }) {
    const [formData, setFormData] = useState({
        name: '',
        birthDate: new Date().toISOString().split('T')[0],
        birthTime: new Date().toTimeString().split(' ')[0].substring(0, 5),
        gender: 'Male',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCalculate(formData);
    };

    return (
        <div className="bg-white p-8 rounded shadow-sm border border-stone-200 max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-between mb-8 border-b border-stone-100 pb-4">
                <h2 className="text-xl font-serif font-bold text-stone-800 tracking-wide">
                    คำนวณดวงชะตา (Calculate)
                </h2>
                <span className="text-xs text-stone-400">กรอกข้อมูลให้ครบถ้วน</span>
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
                        className="w-full bg-stone-50 border-b-2 border-stone-200 focus:border-stone-500 focus:outline-none px-2 py-2 transition-colors text-stone-800"
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
                        className="w-full bg-stone-50 border-b-2 border-stone-200 focus:border-stone-500 focus:outline-none px-2 py-2 transition-colors text-stone-800"
                    />
                </div>

                {/* Time */}
                <div className="md:col-span-1">
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">เวลาเกิด (Time)</label>
                    <input
                        type="time"
                        name="birthTime"
                        value={formData.birthTime}
                        onChange={handleChange}
                        className="w-full bg-stone-50 border-b-2 border-stone-200 focus:border-stone-500 focus:outline-none px-2 py-2 transition-colors text-stone-800"
                    />
                </div>

                {/* Gender */}
                <div className="md:col-span-1">
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">เพศ (Gender)</label>
                    <div className="flex bg-stone-50 rounded p-1 border border-stone-200">
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, gender: 'Male' }))}
                            className={`flex-1 py-1 text-sm rounded transition-all ${formData.gender === 'Male' ? 'bg-white shadow text-stone-800 font-bold' : 'text-stone-400'}`}
                        >
                            ชาย (Male)
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, gender: 'Female' }))}
                            className={`flex-1 py-1 text-sm rounded transition-all ${formData.gender === 'Female' ? 'bg-white shadow text-stone-800 font-bold' : 'text-stone-400'}`}
                        >
                            หญิง (Female)
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <div className="md:col-span-4 flex justify-end mt-4">
                    <button
                        type="submit"
                        className="bg-stone-800 text-stone-50 px-8 py-3 rounded-sm font-bold tracking-widest hover:bg-stone-700 transition shadow-lg active:scale-95"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}
