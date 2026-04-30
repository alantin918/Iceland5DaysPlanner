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

  // ── 升艙基礎票價（多處共用）─────────────────────────────
  const price = P.ciBaseTicket.price;
  document.querySelectorAll('.base-ticket-price')
    .forEach(el => { el.textContent = 'NT$' + fmt(price); });

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
