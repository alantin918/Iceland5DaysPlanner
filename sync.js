// ============================================================
// sync.js — 將 plan.js 資料同步到 index.html DOM
//
// 使用方式：修改 plan.js 的值，重新整理頁面即自動套用。
// 不需要改 index.html 的 HTML 結構。
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const P = PLAN;
  const fmt = n => (n != null ? n.toLocaleString() : '—');
  const set = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };

  // ── 版本資訊：最後更新時間 ──────────────────────────────────
  set('last-updated-time', P.lastUpdated || '—');


  const t = P.plans.seoul.ticket;
  set('seoul-ticket-hero',
      `NT$${fmt(t.price)}`);
  set('seoul-ticket-route',
      `最便宜方案 NT$${fmt(t.price)}・轉機 ${t.stops} 次・${t.duration}`);
  set('seoul-ticket-compare',
      `NT$${fmt(t.price)} ✅<br><span class="text-xs font-normal text-gray-500">轉機 ${t.stops} 次・${t.duration}</span>`);

  // ── 首爾方案：阿聯酋哩程標籤（支援充裕 / 缺口兩種模式）──────
  const s = P.plans.seoul;
  const emLabel = s.emiratesGap > 0
    ? `${fmt(s.emiratesMiles)} 哩 + NT$${fmt(s.emiratesCash)}（差 ${fmt(s.emiratesGap)} 哩）`
    : `${fmt(s.emiratesMiles)} 哩 + NT$${fmt(s.emiratesCash)} ✅`;
  set('seoul-emirates-label', emLabel);


  // ── 華航哩程：進度條與數值 ───────────────────────────────
  const ci = P.miles.ci;
  const ciTotalFmt = fmt(ci.total);
  const ciRemFmt   = fmt(ci.total - ci.target25k);
  const ciGapBFmt  = fmt(ci.gap50k);

  set('eva-miles-total',   `${ciTotalFmt} <span class="text-xl font-normal opacity-80">哩</span>`);
  set('eva-miles-target',  `${fmt(ci.target25k)} 哩`);
  set('eva-miles-gap',     `升單程豪華經濟後剩 ${ciRemFmt} 哩`);
  set('eva-miles-percent', `${ci.progress25k}% 完成（單程升艙目標）`);
  document.querySelectorAll('.eva-progress-bar')
    .forEach(el => { el.style.width = ci.progress25k + '%'; });

  // ── 華航哩程：ciSources 動態表格 ─────────────────────────
  set('ci-sources-subtitle',     `Dynasty Flyer ${ciTotalFmt} 哩 累積方式`);
  set('ci-sources-header-total', `${ciTotalFmt} <span class="text-base font-normal opacity-80">哩</span>`);

  const colorMap = {
    red: 'bg-red-100 text-red-600', blue: 'bg-sky-100 text-sky-600',
    purple: 'bg-purple-100 text-purple-600', green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
  };
  set('ci-sources-body',
    P.miles.ciSources.map(s => `
      <div class="grid grid-cols-3 px-4 sm:px-6 py-3.5 items-center hover:bg-gray-50 dark:hover:bg-slate-800/50">
        <div class="flex items-center gap-2">
          <span class="w-7 h-7 ${colorMap[s.color] || 'bg-gray-100 text-gray-600'} rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">${s.short}</span>
          <span class="text-sm font-medium text-gray-700 dark:text-slate-300">${s.label}</span>
        </div>
        <span class="text-center text-xs text-gray-400 dark:text-slate-500">${s.points != null ? fmt(s.points) + ' pt・' : ''}${s.rate}</span>
        <span class="text-right font-bold text-gray-800 dark:text-slate-100">${fmt(s.miles)} 哩</span>
      </div>
    `).join('') + `
      <div class="grid grid-cols-3 px-4 sm:px-6 py-4 bg-sky-50 dark:bg-sky-900/30">
        <span class="font-black text-gray-800 dark:text-slate-100 col-span-2">合計</span>
        <span class="text-right font-black text-sky-600 text-lg sm:text-xl">${ciTotalFmt} 哩</span>
      </div>
    `
  );

  const cardCount = P.miles.ciSources.filter(s => s.points != null).length;
  const hasExisting = P.miles.ciSources.some(s => s.points == null);
  set('ci-sources-footer', hasExisting
    ? `✅ ${cardCount} 張卡 + 帳戶現有，合計 ${ciTotalFmt} 哩`
    : `✅ ${cardCount} 張卡哩程明細確認，合計 ${ciTotalFmt} 哩`);

  // ── 通用 data-val 同步（CI 哩程數字散落各 tab）─────────────
  const dataValMap = {
    'ci-total':         ciTotalFmt + ' 哩',
    'ci-total-num':     ciTotalFmt,
    'ci-remaining':     ciRemFmt + ' 哩',
    'ci-remaining-num': ciRemFmt,
    'ci-gap-b':         ciGapBFmt + ' 哩',
    'ci-gap-b-num':     ciGapBFmt,
  };
  document.querySelectorAll('[data-val]').forEach(el => {
    const v = dataValMap[el.dataset.val];
    if (v !== undefined) el.textContent = v;
  });

  // ── 阿聯酋哩程：總哩程 ──────────────────────────────────
  set('emirates-total', fmt(P.miles.emirates.total));

  // ── easyJet 最佳組合：總哩程 / 剩餘 ────────────────────
  const best = P.easyjet.best;
  set('easyjet-best-total',     fmt(best.totalMiles) + ' 哩');
  set('easyjet-best-remaining', fmt(best.remaining)  + ' 哩');
  set('easyjet-out-miles',      fmt(best.out.miles));
  set('easyjet-ret-miles',      fmt(best.ret.miles));

  // ── 倫敦方案：Alan / Anne 機票金額 ─────────────────────
  const lon = P.plans.london;
  set('london-anne-cash', `NT$${fmt(lon.anneCashSpend)} <span class="text-xs font-normal opacity-80">CI 直購</span>`);

  // ── 升艙基礎票價（多處共用）─────────────────────────────
  const price = P.ciBaseTicket.price;
  document.querySelectorAll('.base-ticket-price')
    .forEach(el => { el.textContent = 'NT$' + fmt(price); });

  // ── 值得嗎？分析 ───────────────────────────────────────────
  const wa = P.worthItAnalysis;
  if (wa) {
    let pointsHtml = wa.points.map(p => `<li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">✓</span><span>${p}</span></li>`).join('');
    set('worth-it-analysis-container', `
        <div class="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center text-xl shadow-sm">🤔</div>
                <h3 class="font-black text-lg text-emerald-900 dark:text-emerald-300">${wa.title}</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-3">
                    ${wa.options.map((opt, i) => `
                    <div class="bg-white/70 dark:bg-slate-800/70 rounded-xl p-3 border ${i === 0 ? 'border-emerald-400 dark:border-emerald-500 shadow-sm' : 'border-white dark:border-slate-700'}">
                        <div class="flex justify-between items-center mb-1">
                            <span class="font-bold text-gray-800 dark:text-slate-100 text-sm">${opt.name}</span>
                            <span class="text-xs font-bold px-2 py-0.5 rounded-full ${i === 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400' : (i === 1 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400' : 'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-400')}">${opt.tag}</span>
                        </div>
                        <div class="flex justify-between text-xs text-gray-500 dark:text-slate-400 mb-1">
                            <span>${opt.desc}</span>
                        </div>
                        <div class="flex justify-between items-end mt-2 pt-2 border-t border-gray-100 dark:border-slate-700">
                            <span class="text-xs text-gray-500">總成本</span>
                            <span class="font-black ${i === 0 ? 'text-emerald-600 dark:text-emerald-400 text-lg' : 'text-gray-800 dark:text-slate-200'}">NT$${fmt(opt.total)}</span>
                        </div>
                    </div>
                    `).join('')}
                    <div class="text-center pt-1 text-sm font-bold text-emerald-700 dark:text-emerald-400">
                        ${wa.savingsText}
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="p-4 bg-emerald-500 text-white rounded-xl shadow-md">
                        <p class="font-black text-lg mb-1">結論：${wa.conclusion.split('！')[0]}！</p>
                        <p class="text-sm opacity-90">${wa.conclusion.split('！')[1] || ''}</p>
                    </div>
                    <ul class="space-y-3 text-sm text-emerald-900/80 dark:text-emerald-300/80 mt-2">
                        ${pointsHtml}
                    </ul>
                </div>
            </div>
        </div>
    `);
  }

  // ── 旅費估算 ──────────────────────────────────────────────
  const B = P.budget;
  if (B) {
    const fmtNT = n => 'NT$' + fmt(n);

    // 機票列
    const flightColorMap = { sky:'bg-sky-100 text-sky-700', blue:'bg-blue-100 text-blue-700', amber:'bg-amber-100 text-amber-700' };
    let flightsCash = 0;
    set('budget-flights-rows', B.flights.map(f => {
      flightsCash += f.cash;
      return `
        <div class="grid grid-cols-1 sm:grid-cols-3 px-4 sm:px-6 py-3.5 gap-1 sm:gap-0 items-center hover:bg-gray-50 dark:hover:bg-slate-800/50">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold px-2 py-0.5 rounded-full ${flightColorMap[f.color] || 'bg-gray-100 text-gray-600'}">${f.who}</span>
            <span class="text-sm font-medium text-gray-700 dark:text-slate-300">${f.route}</span>
          </div>
          <span class="text-xs text-gray-400 dark:text-slate-500 sm:text-center">${f.type}${f.miles ? ' ＋ ' + f.miles : ''}</span>
          <span class="text-right font-bold text-gray-800 dark:text-slate-100">${fmtNT(f.cash)}</span>
        </div>
      `;
    }).join('') + `
      <div class="grid grid-cols-3 px-4 sm:px-6 py-4 bg-sky-50 dark:bg-sky-900/30">
        <span class="font-black text-gray-800 dark:text-slate-100 col-span-2">機票現金合計</span>
        <span class="text-right font-black text-sky-600 text-lg sm:text-xl">${fmtNT(flightsCash)}</span>
      </div>
    `);
    set('budget-flights-total', fmtNT(flightsCash));

    // sections 結構渲染（含分類小標題）
    const renderSections = (sections) => {
      return sections.map(sec => {
        const secTotal = sec.items.reduce((s, i) => s + i.amount, 0);
        return `
          <div class="border-t border-gray-100 dark:border-slate-700">
            <div class="flex items-center justify-between px-4 sm:px-6 py-2 bg-gray-50 dark:bg-slate-800/50">
              <span class="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">${sec.title}</span>
              <span class="text-xs font-bold text-gray-600 dark:text-slate-300">${fmtNT(secTotal)}</span>
            </div>
            ${sec.items.map(item => `
              <div class="grid grid-cols-3 px-4 sm:px-6 py-3 items-center hover:bg-gray-50 dark:hover:bg-slate-800/50">
                <div class="col-span-2">
                  <p class="text-sm font-medium text-gray-700 dark:text-slate-300">${item.label}</p>
                  <p class="text-xs text-gray-400 dark:text-slate-500 mt-0.5">${item.note}</p>
                </div>
                <span class="text-right font-bold text-gray-800 dark:text-slate-100">${fmtNT(item.amount)}</span>
              </div>
            `).join('')}
          </div>
        `;
      }).join('');
    };

    // 英國
    const ukAllItems = B.uk.sections.flatMap(s => s.items);
    const ukTotal = ukAllItems.reduce((s, i) => s + i.amount, 0);
    set('budget-uk-note', B.uk.note);
    set('budget-uk-total-badge', fmtNT(ukTotal));
    set('budget-uk-rows', renderSections(B.uk.sections));
    set('budget-uk-subtotal', fmtNT(ukTotal));
    set('budget-uk-total', fmtNT(ukTotal));

    // 冰島
    const icAllItems = B.iceland.sections.flatMap(s => s.items);
    const icTotal = icAllItems.reduce((s, i) => s + i.amount, 0);
    set('budget-iceland-note', B.iceland.note);
    set('budget-iceland-total-badge', fmtNT(icTotal));
    set('budget-iceland-rows', renderSections(B.iceland.sections));
    set('budget-iceland-subtotal', fmtNT(icTotal));
    set('budget-iceland-total', fmtNT(icTotal));

    // 其他
    const renderExtras = (items) => items.map(item => `
      <div class="grid grid-cols-3 px-4 sm:px-6 py-3.5 items-center hover:bg-gray-50 dark:hover:bg-slate-800/50">
        <div class="flex items-center gap-2 col-span-2">
          <span class="text-base flex-shrink-0">${item.icon}</span>
          <div>
            <p class="text-sm font-medium text-gray-700 dark:text-slate-300">${item.label}</p>
            <p class="text-xs text-gray-400 dark:text-slate-500">${item.note}</p>
          </div>
        </div>
        <span class="text-right font-bold text-gray-800 dark:text-slate-100">${fmtNT(item.amount)}</span>
      </div>
    `).join('');
    const exTotal = B.extras.reduce((s, i) => s + i.amount, 0);
    set('budget-extras-rows', renderExtras(B.extras));
    set('budget-extras-subtotal', fmtNT(exTotal));

    // 大總計
    const grandTotal = flightsCash + ukTotal + icTotal + exTotal;
    const perPerson = Math.round(grandTotal / B.people);
    set('budget-grand-total', fmtNT(grandTotal));
    set('budget-per-person', fmtNT(perPerson));

    set('budget-summary-container', `
      <div class="bg-gradient-to-br from-slate-700 to-gray-900 rounded-2xl p-5 sm:p-6 text-white shadow-lg">
        <h3 class="font-black text-base sm:text-lg mb-4">📊 費用總結（2 人）</h3>
        <div class="space-y-2 text-sm mb-5">
          <div class="flex justify-between"><span class="opacity-70">✈️ 機票</span><span class="font-bold">${fmtNT(flightsCash)}</span></div>
          <div class="flex justify-between"><span class="opacity-70">🇬🇧 英國</span><span class="font-bold">${fmtNT(ukTotal)}</span></div>
          <div class="flex justify-between"><span class="opacity-70">🇮🇸 冰島</span><span class="font-bold">${fmtNT(icTotal)}</span></div>
          <div class="flex justify-between"><span class="opacity-70">🎒 其他</span><span class="font-bold">${fmtNT(exTotal)}</span></div>
          <div class="border-t border-white/20 pt-2 flex justify-between text-lg font-black">
            <span>總計</span><span class="text-emerald-400">${fmtNT(grandTotal)}</span>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-white/10 rounded-xl p-3 text-center">
            <p class="text-xs opacity-60 mb-1">每人平均</p>
            <p class="text-xl font-black text-emerald-300">${fmtNT(perPerson)}</p>
          </div>
          <div class="bg-white/10 rounded-xl p-3 text-center">
            <p class="text-xs opacity-60 mb-1">另計哩程價值</p>
            <p class="text-sm font-bold text-amber-300">CI 25,000 哩<br>Emirates 23,446 哩</p>
          </div>
        </div>
        <p class="text-xs opacity-50 mt-3">※ 住宿、餐費、活動為估算值，實際費用依訂房與消費而定</p>
      </div>
    `);
  }

  // ── 🐾 吉依卡娃主題切換邏輯 ─────────────────────────────────
  const chiikawaToggleBtn = document.getElementById('chiikawa-toggle');
  if (chiikawaToggleBtn) {
    chiikawaToggleBtn.addEventListener('click', () => {
      const html = document.documentElement;
      const isOn = html.classList.toggle('chiikawa');

      if (isOn) {
        localStorage.chiikawa = '1';
        // 記住原本主題，然後無條件強制亮色
        localStorage.cwPrevTheme = localStorage.theme || '';
        html.classList.remove('dark');
        localStorage.theme = 'light';
        // 同步更新暗黑模式按鈕圖示
        const di = document.getElementById('theme-toggle-dark-icon');
        const li = document.getElementById('theme-toggle-light-icon');
        if (di) di.classList.remove('hidden');
        if (li) li.classList.add('hidden');
      } else {
        localStorage.removeItem('chiikawa');
        // 還原原本主題
        const prev = localStorage.cwPrevTheme;
        localStorage.removeItem('cwPrevTheme');
        if (prev === 'dark') {
          html.classList.add('dark');
          localStorage.theme = 'dark';
          const di = document.getElementById('theme-toggle-dark-icon');
          const li = document.getElementById('theme-toggle-light-icon');
          if (di) di.classList.add('hidden');
          if (li) li.classList.remove('hidden');
        } else if (prev === '') {
          // 原本跟著系統，還原
          localStorage.removeItem('theme');
        }
      }
    });
  }

  // ── 暗黑模式切換邏輯 ─────────────────────────────────────
  const themeToggleBtn = document.getElementById('theme-toggle');
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  const lightIcon = document.getElementById('theme-toggle-light-icon');

  if (themeToggleBtn) {
    // 初始狀態圖示
    if (document.documentElement.classList.contains('dark')) {
      lightIcon.classList.remove('hidden');
    } else {
      darkIcon.classList.remove('hidden');
    }

    themeToggleBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      if (document.documentElement.classList.contains('dark')) {
        localStorage.theme = 'dark';
        darkIcon.classList.add('hidden');
        lightIcon.classList.remove('hidden');
      } else {
        localStorage.theme = 'light';
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
      }
    });
  }
});
