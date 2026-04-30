const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'index.html');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Inject Tab Button
const tabVersionHtml = `<button onclick="switchTab('version')" id="tab-version"
                    class="tab-btn flex-shrink-0 flex items-center gap-1.5 px-3 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-gray-500 dark:text-slate-400 whitespace-nowrap">
                    <span>📋</span><span>行程版本</span>
                </button>`;

const newTabHtml = `
                <button onclick="switchTab('uk-itinerary')" id="tab-uk-itinerary"
                    class="tab-btn flex-shrink-0 flex items-center gap-1.5 px-3 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-gray-500 dark:text-slate-400 whitespace-nowrap">
                    <span>🇬🇧</span><span>英國行程</span>
                </button>`;

if (content.includes(tabVersionHtml) && !content.includes('tab-uk-itinerary')) {
    content = content.replace(tabVersionHtml, tabVersionHtml + newTabHtml);
} else {
    // Try a more flexible regex if exact match fails
    const btnRegex = /<button onclick="switchTab\('version'\)" id="tab-version"[\s\S]*?<\/button>/;
    const match = content.match(btnRegex);
    if (match && !content.includes('tab-uk-itinerary')) {
        content = content.replace(match[0], match[0] + newTabHtml);
    }
}

// 2. Inject Section Content
const newSectionHtml = `
        <!-- ═══════════════════════════════ TAB：英國行程規劃 ═══════════════════════════════ -->
        <div id="section-uk-itinerary" class="section-content space-y-6 sm:space-y-8">
            <div class="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-5 sm:p-6 text-white shadow-lg">
                <h2 class="text-xl sm:text-2xl font-black mb-2 flex items-center gap-2"><span>🇬🇧</span>英國天數分配與建議行程</h2>
                <p class="text-sm opacity-80 mb-4">以華航 CI82 (10/28 出發) 與 CI81 (返程，週日不飛) 為基準，推算冰島停留天數對英國行程的影響。</p>
            </div>

            <!-- 天數對比表 -->
            <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm whitespace-nowrap">
                        <thead class="bg-gray-50 dark:bg-slate-900/50 text-gray-600 dark:text-slate-300 font-bold border-b border-gray-100 dark:border-slate-700">
                            <tr>
                                <th class="px-4 py-3">冰島天數</th>
                                <th class="px-4 py-3">去程英國 (調時差)</th>
                                <th class="px-4 py-3">回程英國 (購物)</th>
                                <th class="px-4 py-3">預計返台日</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 dark:divide-slate-700">
                            <tr class="hover:bg-gray-50 dark:hover:bg-slate-800/50">
                                <td class="px-4 py-3 font-bold text-gray-800 dark:text-slate-100">5 天 4 夜</td>
                                <td class="px-4 py-3 text-red-500 font-bold">1 天 (偏累)</td>
                                <td class="px-4 py-3 text-gray-600 dark:text-slate-300">2 天</td>
                                <td class="px-4 py-3 text-gray-500 dark:text-slate-400">11/5 (四)</td>
                            </tr>
                            <tr class="bg-emerald-50/50 dark:bg-emerald-900/20 hover:bg-emerald-50 dark:hover:bg-emerald-900/40">
                                <td class="px-4 py-3 font-bold text-emerald-700 dark:text-emerald-400">6 天 5 夜 ⭐ 最推薦</td>
                                <td class="px-4 py-3 text-emerald-600 dark:text-emerald-300 font-bold">2.5 天 (充足)</td>
                                <td class="px-4 py-3 text-emerald-600 dark:text-emerald-300 font-bold">2.5 天 (完整週末)</td>
                                <td class="px-4 py-3 text-emerald-600 dark:text-emerald-300">11/9 (一)</td>
                            </tr>
                            <tr class="hover:bg-gray-50 dark:hover:bg-slate-800/50">
                                <td class="px-4 py-3 font-bold text-gray-800 dark:text-slate-100">7 天 6 夜</td>
                                <td class="px-4 py-3 text-emerald-600 dark:text-emerald-300 font-bold">2.5 天 (充足)</td>
                                <td class="px-4 py-3 text-amber-500 font-bold">1.5 天 (略趕)</td>
                                <td class="px-4 py-3 text-gray-500 dark:text-slate-400">11/9 (一)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- 推薦行程細節 -->
            <div>
                <h3 class="text-lg font-black text-gray-800 dark:text-slate-100 mb-4 px-1">⭐ 6天版 (英國前2.5+後2.5) 推薦行程安排</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- 去程 -->
                    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
                        <div class="flex items-center gap-2 mb-4">
                            <span class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold">前</span>
                            <h4 class="font-bold text-gray-800 dark:text-slate-100 text-lg">去程：調時差與經典觀光</h4>
                        </div>
                        <ul class="space-y-4 relative before:absolute before:inset-y-2 before:left-2.5 before:w-0.5 before:bg-gray-100 dark:before:bg-slate-700">
                            <li class="relative pl-8">
                                <span class="absolute left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white dark:ring-slate-800"></span>
                                <p class="font-bold text-gray-800 dark:text-slate-100 text-sm">10/29 (四) 抵達與漫步</p>
                                <p class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">清晨抵達，建議安排輕鬆的戶外行程如泰晤士河畔漫步、西敏寺、大笨鐘，避免室內容易打瞌睡。</p>
                            </li>
                            <li class="relative pl-8">
                                <span class="absolute left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white dark:ring-slate-800"></span>
                                <p class="font-bold text-gray-800 dark:text-slate-100 text-sm">10/30 (五) 知性與藝文</p>
                                <p class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">白天參觀大英博物館或國家美術館。晚上安排倫敦西區 (West End) 看場經典音樂劇 (如歌劇魅影、獅子王)。</p>
                            </li>
                            <li class="relative pl-8">
                                <span class="absolute left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white dark:ring-slate-800"></span>
                                <p class="font-bold text-gray-800 dark:text-slate-100 text-sm">10/31 (六) 市集與準備出發</p>
                                <p class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">上午逛柯芬園 (Covent Garden) 吃午餐，下午前往 LGW 機場準備飛往冰島。</p>
                            </li>
                        </ul>
                    </div>
                    <!-- 回程 -->
                    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
                        <div class="flex items-center gap-2 mb-4">
                            <span class="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-300 flex items-center justify-center font-bold">後</span>
                            <h4 class="font-bold text-gray-800 dark:text-slate-100 text-lg">回程：週末採買與美食</h4>
                        </div>
                        <ul class="space-y-4 relative before:absolute before:inset-y-2 before:left-2.5 before:w-0.5 before:bg-gray-100 dark:before:bg-slate-700">
                            <li class="relative pl-8">
                                <span class="absolute left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-white dark:ring-slate-800"></span>
                                <p class="font-bold text-gray-800 dark:text-slate-100 text-sm">11/6 (五) 回到倫敦</p>
                                <p class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">從冰島飛抵倫敦，晚上去 SOHO 區吃頓好吃的暖胃 (如 Flat Iron 牛排或熱呼呼的湯麵)，結束冰島的疲勞。</p>
                            </li>
                            <li class="relative pl-8">
                                <span class="absolute left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-white dark:ring-slate-800"></span>
                                <p class="font-bold text-gray-800 dark:text-slate-100 text-sm">11/7-8 (週末) 血拼大採購</p>
                                <p class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">週末強烈推薦波羅市場 (Borough Market) 吃美食。下午主攻牛津街 (Oxford St.) 與攝政街 (Regent St.) 買精品服飾，或安排 Bicester Village 凹泰城一日遊。</p>
                            </li>
                            <li class="relative pl-8">
                                <span class="absolute left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-white dark:ring-slate-800"></span>
                                <p class="font-bold text-gray-800 dark:text-slate-100 text-sm">11/9 (一) 紀念品與返台</p>
                                <p class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">上午超市採買伴手禮 (英國紅茶、餅乾)，打包行李，下午前往 LHR 機場搭乘 CI81 返回台灣。</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
`;

// Find where to inject section
const compareSectionMatch = content.match(/<div id="section-compare" class="section-content.*?>/);
if (compareSectionMatch && !content.includes('id="section-uk-itinerary"')) {
    content = content.replace(compareSectionMatch[0], newSectionHtml + '\n' + compareSectionMatch[0]);
    console.log('Successfully injected section-uk-itinerary');
} else {
    console.log('Could not find injection point or section already exists');
}

fs.writeFileSync(targetFile, content, 'utf8');
