import { Solar, Lunar } from 'lunar-javascript';

// Translation map for Stems (Tian Gan)
const STEMS = {
    '甲': { name: 'Jia Wood', nameTH: 'ไม้กะ (Jia)', element: 'Wood', elementTH: 'ไม้', polarity: '+' },
    '乙': { name: 'Yi Wood', nameTH: 'ไม้อี้ (Yi)', element: 'Wood', elementTH: 'ไม้', polarity: '-' },
    '丙': { name: 'Bing Fire', nameTH: 'ไฟเปี้ย (Bing)', element: 'Fire', elementTH: 'ไฟ', polarity: '+' },
    '丁': { name: 'Ding Fire', nameTH: 'ไฟเต็ง (Ding)', element: 'Fire', elementTH: 'ไฟ', polarity: '-' },
    '戊': { name: 'Wu Earth', nameTH: 'ดินโป่ว (Wu)', element: 'Earth', elementTH: 'ดิน', polarity: '+' },
    '己': { name: 'Ji Earth', nameTH: 'ดินกี้ (Ji)', element: 'Earth', elementTH: 'ดิน', polarity: '-' },
    '庚': { name: 'Geng Metal', nameTH: 'ทองแก (Geng)', element: 'Metal', elementTH: 'ทอง', polarity: '+' },
    '辛': { name: 'Xin Metal', nameTH: 'ทองซิน (Xin)', element: 'Metal', elementTH: 'ทอง', polarity: '-' },
    '壬': { name: 'Ren Water', nameTH: 'น้ำหยิม (Ren)', element: 'Water', elementTH: 'น้ำ', polarity: '+' },
    '癸': { name: 'Gui Water', nameTH: 'น้ำกุ่ย (Gui)', element: 'Water', elementTH: 'น้ำ', polarity: '-' },
};

// Translation map for Branches (Di Zhi)
const BRANCHES = {
    '子': { name: 'Rat', nameTH: 'ชวด (หนู)', element: 'Water', elementTH: 'น้ำ', yinYang: '+', hidden: ['癸'] },
    '丑': { name: 'Ox', nameTH: 'ฉลู (วัว)', element: 'Earth', elementTH: 'ดิน', yinYang: '-', hidden: ['己', '癸', '辛'] },
    '寅': { name: 'Tiger', nameTH: 'ขาล (เสือ)', element: 'Wood', elementTH: 'ไม้', yinYang: '+', hidden: ['甲', '丙', '戊'] },
    '卯': { name: 'Rabbit', nameTH: 'เถาะ (กระต่าย)', element: 'Wood', elementTH: 'ไม้', yinYang: '-', hidden: ['乙'] },
    '辰': { name: 'Dragon', nameTH: 'มะโรง (มังกร)', element: 'Earth', elementTH: 'ดิน', yinYang: '+', hidden: ['戊', '乙', '癸'] },
    '巳': { name: 'Snake', nameTH: 'มะเส็ง (งู)', element: 'Fire', elementTH: 'ไฟ', yinYang: '-', hidden: ['丙', '庚', '戊'] },
    '午': { name: 'Horse', nameTH: 'มะเมีย (ม้า)', element: 'Fire', elementTH: 'ไฟ', yinYang: '+', hidden: ['丁', '己'] },
    '未': { name: 'Goat', nameTH: 'มะแม (แพะ)', element: 'Earth', elementTH: 'ดิน', yinYang: '-', hidden: ['己', '丁', '乙'] },
    '申': { name: 'Monkey', nameTH: 'วอก (ลิง)', element: 'Metal', elementTH: 'ทอง', yinYang: '+', hidden: ['庚', '壬', '戊'] },
    '酉': { name: 'Rooster', nameTH: 'ระกา (ไก่)', element: 'Metal', elementTH: 'ทอง', yinYang: '-', hidden: ['辛'] },
    '戌': { name: 'Dog', nameTH: 'จอ (หมา)', element: 'Earth', elementTH: 'ดิน', yinYang: '+', hidden: ['戊', '辛', '丁'] },
    '亥': { name: 'Pig', nameTH: 'กุน (หมู)', element: 'Water', elementTH: 'น้ำ', yinYang: '-', hidden: ['壬', '甲'] },
};

// 10 Gods (Shi Shen) Lookup
const GODS = {
    'Friend': { name: 'Friend', nameTH: 'เพื่อน', short: 'FR', chinese: '比肩' },
    'RobWealth': { name: 'Rob Wealth', nameTH: 'แย่งลาภ', short: 'RW', chinese: '劫財' },
    'EatingGod': { name: 'Eating God', nameTH: 'กิน', short: 'EG', chinese: '食神' },
    'HurtingOfficer': { name: 'Hurting Officer', nameTH: 'ทำลายยศ', short: 'HO', chinese: '傷官' },
    'DirectWealth': { name: 'Direct Wealth', nameTH: 'ลาภตรง', short: 'DW', chinese: '正財' },
    'IndirectWealth': { name: 'Indirect Wealth', nameTH: 'ลาภลอย', short: 'IW', chinese: '偏財' },
    'DirectOfficer': { name: 'Direct Officer', nameTH: 'ขุนนาง', short: 'DO', chinese: '正官' },
    'SevenKillings': { name: 'Seven Killings', nameTH: 'เจ็ดอสูร', short: '7K', chinese: '七殺' },
    'DirectResource': { name: 'Direct Resource', nameTH: 'คุณธรรม', short: 'DR', chinese: '正印' },
    'IndirectResource': { name: 'Indirect Resource', nameTH: 'ก้าวหน้า', short: 'IR', chinese: '偏印' },
};

const ELEMENTS = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];

function getElementResult(me, other) {
    const meIdx = ELEMENTS.indexOf(me.element);
    const otherIdx = ELEMENTS.indexOf(other.element);

    if (meIdx === -1 || otherIdx === -1) return null;

    // Same
    if (meIdx === otherIdx) {
        return me.polarity === other.polarity ? 'Friend' : 'RobWealth';
    }

    // Me Generates Other (Output)
    if ((meIdx + 1) % 5 === otherIdx) {
        return me.polarity === other.polarity ? 'EatingGod' : 'HurtingOfficer';
    }

    // Me Controls Other (Wealth)
    // Wood(0) -> Earth(2). (0+2)%5 = 2.
    if ((meIdx + 2) % 5 === otherIdx) {
        return me.polarity === other.polarity ? 'IndirectWealth' : 'DirectWealth';
    }

    // Other Controls Me (Influence/Power)
    // Metal(3) -> Wood(0). (3+2)%5 = 0. OR (0-2+5)%5 = 3
    if ((otherIdx + 2) % 5 === meIdx) {
        return me.polarity === other.polarity ? 'SevenKillings' : 'DirectOfficer';
    }

    // Other Generates Me (Resource)
    if ((otherIdx + 1) % 5 === meIdx) {
        return me.polarity === other.polarity ? 'IndirectResource' : 'DirectResource';
    }

    return 'Unknown';
}


export function calculateBazi(dateString, timeString, gender = 'Male') {
    // Parsing Input
    // Standard format YYYY-MM-DD, HH:mm
    const [year, month, day] = dateString.split('-').map(Number);
    const [hour, minute] = timeString.split(':').map(Number);

    // 1. Create Solar Object
    const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);

    // 2. Convert to Lunar
    const lunar = solar.getLunar();

    // 3. Get Eight Characters (BaZi)
    // Note: Lunar Javascript handles Start of Spring (Li Chun) automatically for Year Pillar
    const eightChar = lunar.getEightChar();
    eightChar.setSect(2); // Use Mode 2 (Traditional/Standard) usually implies starts year at Li Chun

    // Extract Pillars
    const yearGan = eightChar.getYearGan();
    const yearZhi = eightChar.getYearZhi();
    const monthGan = eightChar.getMonthGan();
    const monthZhi = eightChar.getMonthZhi();
    const dayGan = eightChar.getDayGan();
    const dayZhi = eightChar.getDayZhi();
    const hourGan = eightChar.getTimeGan();
    const hourZhi = eightChar.getTimeZhi();

    const dayMaster = STEMS[dayGan];

    // Helper to structure a pillar
    const processPillar = (gan, zhi, name) => {
        const ganInfo = STEMS[gan];
        const zhiInfo = BRANCHES[zhi];

        // 10 God for Stem
        const stemGodKey = getElementResult(dayMaster, ganInfo);
        const stemGod = GODS[stemGodKey];

        // Hidden Stems & Gods
        const hiddenStems = zhiInfo.hidden.map(h => {
            const hInfo = STEMS[h];
            const hGodKey = getElementResult(dayMaster, hInfo);
            return {
                char: h,
                ...hInfo,
                god: GODS[hGodKey]
            };
        });

        return {
            name,
            gan: { char: gan, ...ganInfo, god: stemGod },
            zhi: { char: zhi, ...zhiInfo, hiddenStems },
        };
    };

    const pillars = {
        year: processPillar(yearGan, yearZhi, 'Year'),
        month: processPillar(monthGan, monthZhi, 'Month'),
        day: processPillar(dayGan, dayZhi, 'Day'),
        hour: processPillar(hourGan, hourZhi, 'Hour'),
    };

    // Luck Pillars (Manual Calculation)
    // Define ordered arrays for calculation
    const STEM_ORDER = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    const BRANCH_ORDER = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

    const genderNum = gender === 'Male' ? 1 : 0;
    const yearGanPol = STEMS[yearGan].polarity;
    const yearIsYang = yearGanPol === '+';
    const genderIsMale = gender === 'Male';

    // Forward if: (Male & Year Yang) OR (Female & Year Yin)
    const forward = (genderIsMale && yearIsYang) || (!genderIsMale && !yearIsYang);
    const direction = forward ? 1 : -1;

    let currentGanIdx = STEM_ORDER.indexOf(monthGan);
    let currentZhiIdx = BRANCH_ORDER.indexOf(monthZhi);

    const yun = eightChar.getYun(genderNum);
    const daYunArr = yun.getDaYun();

    const luckPillars = [];

    for (let i = 0; i < 10; i++) {
        currentGanIdx = (currentGanIdx + direction + 10) % 10;
        currentZhiIdx = (currentZhiIdx + direction + 12) % 12;

        const gan = STEM_ORDER[currentGanIdx];
        const zhi = BRANCH_ORDER[currentZhiIdx];

        // Get Start Age from Library or approximate
        // Library gave 1. Usually valid.
        let startAge = 1 + (i * 10);
        let startYear = year + startAge;

        // Try to use library info if available/valid, otherwise fallback
        if (daYunArr[i] && daYunArr[i].getStartAge()) {
            startAge = daYunArr[i].getStartAge();
            startYear = daYunArr[i].getStartYear();
        }

        const ganInfo = STEMS[gan];
        const zhiInfo = BRANCHES[zhi];
        const godKey = getElementResult(dayMaster, ganInfo);

        // Calculate 10 Annual Pillars (Liu Nian) for this Luck Pillar
        const annualPillars = [];
        for (let j = 0; j < 10; j++) {
            const annualYear = startYear + j;
            const annualSolar = Solar.fromYmdHms(annualYear, 6, 15, 12, 0, 0);
            const annualLunar = annualSolar.getLunar();
            const annualGanZhi = annualLunar.getYearInGanZhi();

            const aGan = annualGanZhi.substring(0, 1);
            const aZhi = annualGanZhi.substring(1, 2);

            const aGanInfo = STEMS[aGan];
            const aZhiInfo = BRANCHES[aZhi];
            const aGodKey = getElementResult(dayMaster, aGanInfo);

            annualPillars.push({
                year: annualYear,
                gan: { char: aGan, ...aGanInfo, god: GODS[aGodKey] },
                zhi: { char: aZhi, ...aZhiInfo }
            });
        }

        luckPillars.push({
            startAge,
            startYear,
            gan: { char: gan, ...ganInfo, god: GODS[godKey] },
            zhi: { char: zhi, ...zhiInfo },
            annualPillars
        });
    }

    // Basic Analysis (Counting Elements)
    const stats = {
        Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0
    };

    // Count Stems
    [yearGan, monthGan, dayGan, hourGan].forEach(g => {
        stats[STEMS[g].element]++;
    });
    // Count Branches (Main Energy)
    [yearZhi, monthZhi, dayZhi, hourZhi].forEach(z => {
        stats[BRANCHES[z].element]++;
    });

    // Transform stats keys to Thai if needed or handle in UI
    // We keep keys as English for logic, but UI will map them.

    return {
        solar: solar.toString(),
        lunar: lunar.toString(),
        dayMaster: { ...dayMaster, char: dayGan }, // Add character explicitly
        pillars,
        luckPillars,
        stats,
        gender
    };
}
