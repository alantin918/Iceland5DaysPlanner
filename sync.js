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
  set('eva-miles-total',   `${fmt(ci.total)} <span class="text-xl font-normal opacity-80">哩</span>`);
  set('eva-miles-target',  `${fmt(ci.target25k)} 哩`);
  set('eva-miles-gap',     `升單程豪經後剩 ${fmt(ci.total - ci.target25k)} 哩`);
  set('eva-miles-percent', `${ci.progress25k}% 完成（單程升艙目標）`);
  document.querySelectorAll('.eva-progress-bar')
    .forEach(el => { el.style.width = ci.progress25k + '%'; });

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
                <div class="space-y-4">
                    <div class="bg-white/60 dark:bg-slate-800/60 rounded-xl p-4 border border-white dark:border-slate-700">
                        <p class="text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold">方案對比</p>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between"><span>直接購豪經 (CI)</span><span class="font-bold">NT$${fmt(wa.directPE)}</span></div>
                            <div class="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold"><span>哩程升艙總成本</span><span>NT$${fmt(wa.upgradePath.total)}</span></div>
                            <div class="pt-2 border-t border-emerald-100 dark:border-emerald-800 flex justify-between font-black text-lg">
                                <span>省下金額</span><span class="text-emerald-500">NT$${fmt(wa.savings)}</span>
                            </div>
                        </div>
                    </div>
                    <div class="p-4 bg-emerald-500 text-white rounded-xl shadow-md">
                        <p class="font-black text-lg mb-1">結論：${wa.conclusion.split('！')[0]}！</p>
                        <p class="text-sm opacity-90">${wa.conclusion.split('！')[1]}</p>
                    </div>
                </div>
                <div class="space-y-4">
                    <p class="text-sm font-bold text-emerald-800 dark:text-emerald-400">關鍵點分析：</p>
                    <ul class="space-y-3 text-sm text-emerald-900/80 dark:text-emerald-300/80">
                        ${pointsHtml}
                    </ul>
                </div>
            </div>
        </div>
    `);
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
