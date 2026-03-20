import { Solar, Lunar } from 'lunar-javascript';

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

const BRANCHES = {
    '子': { name: 'Rat', nameTH: 'ชวด (หนู)', element: 'Water', elementTH: 'น้ำ', hidden: ['癸'] },
    '丑': { name: 'Ox', nameTH: 'ฉลู (วัว)', element: 'Earth', elementTH: 'ดิน', hidden: ['己', '癸', '辛'] },
    '寅': { name: 'Tiger', nameTH: 'ขาล (เสือ)', element: 'Wood', elementTH: 'ไม้', hidden: ['甲', '丙', '戊'] },
    '卯': { name: 'Rabbit', nameTH: 'เถาะ (กระต่าย)', element: 'Wood', elementTH: 'ไม้', hidden: ['乙'] },
    '辰': { name: 'Dragon', nameTH: 'มะโรง (มังกร)', element: 'Earth', elementTH: 'ดิน', hidden: ['戊', '乙', '癸'] },
    '巳': { name: 'Snake', nameTH: 'มะเส็ง (งู)', element: 'Fire', elementTH: 'ไฟ', hidden: ['丙', '庚', '戊'] },
    '午': { name: 'Horse', nameTH: 'มะเมีย (ม้า)', element: 'Fire', elementTH: 'ไฟ', hidden: ['丁', '己'] },
    '未': { name: 'Goat', nameTH: 'มะแม (แพะ)', element: 'Earth', elementTH: 'ดิน', hidden: ['己', '丁', '乙'] },
    '申': { name: 'Monkey', nameTH: 'วอก (ลิง)', element: 'Metal', elementTH: 'ทอง', hidden: ['庚', '壬', '戊'] },
    '酉': { name: 'Rooster', nameTH: 'ระกา (ไก่)', element: 'Metal', elementTH: 'ทอง', hidden: ['辛'] },
    '戌': { name: 'Dog', nameTH: 'จอ (หมา)', element: 'Earth', elementTH: 'ดิน', hidden: ['戊', '辛', '丁'] },
    '亥': { name: 'Pig', nameTH: 'กุน (หมู)', element: 'Water', elementTH: 'น้ำ', hidden: ['壬', '甲'] },
};

const GODS = {
    'Friend': { name: 'Friend', short: 'FR', chinese: '比' },
    'RobWealth': { name: 'Rob Wealth', short: 'RW', chinese: '劫' },
    'EatingGod': { name: 'Eating God', short: 'EG', chinese: '食' },
    'HurtingOfficer': { name: 'Hurting Officer', short: 'HO', chinese: '伤' },
    'DirectWealth': { name: 'Direct Wealth', short: 'DW', chinese: '财' },
    'IndirectWealth': { name: 'Indirect Wealth', short: 'IW', chinese: '才' },
    'DirectOfficer': { name: 'Direct Officer', short: 'DO', chinese: '官' },
    'SevenKillings': { name: 'Seven Killings', short: '7K', chinese: '杀' },
    'DirectResource': { name: 'Direct Resource', short: 'DR', chinese: '印' },
    'IndirectResource': { name: 'Indirect Resource', short: 'IR', chinese: '枭' },
};

const RELATIONSHIPS = {
    STEM: {
        HA: { '甲': '己', '己': '甲', '乙': '庚', '庚': '乙', '丙': '辛', '辛': '丙', '丁': '壬', '壬': '丁', '戊': '癸', '癸': '戊' },
        CHONG: { '甲': '庚', '庚': '甲', '乙': '辛', '辛': '乙', '丙': '壬', '壬': '丙', '丁': '癸', '癸': '丁' }
    },
    BRANCH: {
        HA: { '子': '丑', '丑': '子', '寅': '亥', '亥': '寅', '卯': '戌', '戌': '卯', '辰': '酉', '酉': '辰', '巳': '申', '申': '巳', '午': '未', '未': '午' },
        CHONG: { '子': '午', '午': '子', '丑': '未', '未': '丑', '寅': '申', '申': '寅', '卯': '酉', '酉': '卯', '辰': '戌', '戌': '辰', '巳': '亥', '亥': '巳' },
        HAI: { '子': '未', '未': '子', '丑': '午', '午': '丑', '寅': '巳', '巳': '寅', '卯': '辰', '辰': '卯', '申': '亥', '亥': '申', '酉': '戌', '戌': '酉' },
        PO: { '子': '酉', '酉': '子', '卯': '午', '午': '卯', '寅': '亥', '亥': '寅', '巳': '申', '申': '巳', '辰': '丑', '丑': '辰', '未': '戌', '戌': '未' }
    }
};

function getRelationalStatus(char, type, pool, dmChar) {
    if (!char) return 'Normal';
    const c = char;
    const table = RELATIONSHIPS[type];

    // Priority 1: Ha with Day Master → Normal (Blue)
    if (type === 'STEM' && dmChar && table.HA[c] === dmChar) return 'Normal';

    // System C: Stem Clashes (天干冲) are NOT counted for color display.
    // Only Branch clashes (地支冲/害/破) trigger Red.
    if (type === 'BRANCH') {
        if (table.CHONG && table.CHONG[c] && pool.includes(table.CHONG[c])) return 'Clash';
        if (table.HAI  && table.HAI[c]  && pool.includes(table.HAI[c]))  return 'Clash';
        if (table.PO   && table.PO[c]   && pool.includes(table.PO[c]))   return 'Clash';
    }

    // Priority 3: Ha combination → Green
    if (table.HA && table.HA[c] && pool.includes(table.HA[c])) return 'Ha';

    return 'Normal';
}

const ELEMENTS = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];

function getElementResult(me, other) {
    if (!me || !other) return 'Unknown';
    const meIdx = ELEMENTS.indexOf(me.element);
    const otherIdx = ELEMENTS.indexOf(other.element);
    if (meIdx === -1 || otherIdx === -1) return null;

    if (meIdx === otherIdx) return me.polarity === other.polarity ? 'Friend' : 'RobWealth';
    if ((meIdx + 1) % 5 === otherIdx) return me.polarity === other.polarity ? 'EatingGod' : 'HurtingOfficer';
    if ((meIdx + 2) % 5 === otherIdx) return me.polarity === other.polarity ? 'IndirectWealth' : 'DirectWealth';
    if ((otherIdx + 2) % 5 === meIdx) return me.polarity === other.polarity ? 'SevenKillings' : 'DirectOfficer';
    if ((otherIdx + 1) % 5 === meIdx) return me.polarity === other.polarity ? 'IndirectResource' : 'DirectResource';
    return 'Unknown';
}

export function calculateBazi(dateString, timeString, gender = 'Male') {
    const [year, month, day] = dateString.split('-').map(Number);
    const [hour, minute] = timeString.split(':').map(Number);
    const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
    const eightChar = solar.getLunar().getEightChar();
    eightChar.setSect(2);

    const yearGan = eightChar.getYearGan();
    const yearZhi = eightChar.getYearZhi();
    const monthGan = eightChar.getMonthGan();
    const monthZhi = eightChar.getMonthZhi();
    const dayGan = eightChar.getDayGan();
    const dayZhi = eightChar.getDayZhi();
    const hourGan = eightChar.getTimeGan();
    const hourZhi = eightChar.getTimeZhi();

    const dm = STEMS[dayGan];
    const chartStems = [yearGan, monthGan, hourGan];
    const chartBranches = [yearZhi, monthZhi, dayZhi, hourZhi];

    const processLP = (lGan, lZhi, startAge, startYear) => {
        const annualPillars = [];
        // Annual Stems: System C — no Stem clash, compare only for Ha detection
        const annualStemPool = [lGan];
        // Annual Branches: compare against birth chart via CHONG (冲) only
        // Po/Hai are weaker and not counted for color display — gives balanced Red/Blue
        const annualBranchChong = RELATIONSHIPS.BRANCH.CHONG;
        const getAnnualZhiStatus = (zhi) => {
            if (!zhi) return 'Normal';
            if (annualBranchChong[zhi] && chartBranches.includes(annualBranchChong[zhi])) return 'Clash';
            // Ha check: branch combines with luck pillar branch
            if (RELATIONSHIPS.BRANCH.HA?.[zhi] && RELATIONSHIPS.BRANCH.HA[zhi] === lZhi) return 'Ha';
            return 'Normal';
        };

        for (let j = 0; j < 10; j++) {
            const aYear = startYear + j;
            const aSolar = Solar.fromYmdHms(aYear, 6, 15, 12, 0, 0);
            const aGZ = aSolar.getLunar().getYearInGanZhi();
            const aGan = aGZ.charAt(0);
            const aZhi = aGZ.charAt(1);

            annualPillars.push({
                year: aYear,
                gan: { char: aGan, ...STEMS[aGan], god: GODS[getElementResult(dm, STEMS[aGan])], status: getRelationalStatus(aGan, 'STEM', annualStemPool, dayGan) },
                zhi: { char: aZhi, ...BRANCHES[aZhi], god: GODS[getElementResult(dm, BRANCHES[aZhi])], status: getAnnualZhiStatus(aZhi) }
            });
        }
        return {
            startAge, startYear,
            gan: { char: lGan, ...STEMS[lGan], god: GODS[getElementResult(dm, STEMS[lGan])], status: getRelationalStatus(lGan, 'STEM', chartStems, dayGan) },
            zhi: { char: lZhi, ...BRANCHES[lZhi], god: GODS[getElementResult(dm, BRANCHES[lZhi])], status: getRelationalStatus(lZhi, 'BRANCH', chartBranches, null) },
            annualPillars
        };
    };

    const luckPillars = [];
    const daYunArr = eightChar.getYun(gender === 'Male' ? 1 : 0).getDaYun();
    for (let i = 0; i < 10; i++) {
        const dy = daYunArr[i];
        if (dy) {
            luckPillars.push(processLP(dy.getGanZhi().charAt(0), dy.getGanZhi().charAt(1), dy.getStartAge(), dy.getStartYear()));
        }
    }

    const processPillar = (gan, zhi, name) => {
        const hS = BRANCHES[zhi].hidden.map(h => ({ char: h, ...STEMS[h], god: GODS[getElementResult(dm, STEMS[h])] }));
        return {
            name,
            gan: {
                char: gan,
                ...STEMS[gan],
                god: GODS[getElementResult(dm, STEMS[gan])],
                status: getRelationalStatus(gan, 'STEM', chartStems, dayGan)
            },
            zhi: {
                char: zhi,
                ...BRANCHES[zhi],
                hiddenStems: hS,
                god: GODS[getElementResult(dm, BRANCHES[zhi])],
                status: getRelationalStatus(zhi, 'BRANCH', chartBranches, null)
            }
        };
    };

    const stats = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };
    [yearGan, monthGan, dayGan, hourGan].forEach(g => stats[STEMS[g].element]++);
    [yearZhi, monthZhi, dayZhi, hourZhi].forEach(z => stats[BRANCHES[z].element]++);

    return {
        dayMaster: { ...dm, char: dayGan },
        pillars: { year: processPillar(yearGan, yearZhi, 'Year'), month: processPillar(monthGan, monthZhi, 'Month'), day: processPillar(dayGan, dayZhi, 'Day'), hour: processPillar(hourGan, hourZhi, 'Hour') },
        luckPillars, stats, gender
    };
}
