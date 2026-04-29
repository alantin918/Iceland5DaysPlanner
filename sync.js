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

  // ── 首爾方案：機票資料（3 個顯示位置）────────────────────
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


  // ── 長榮哩程：進度條與數值 ───────────────────────────────
  const eva = P.miles.eva;
  set('eva-miles-total',   `${fmt(eva.total)} <span class="text-xl font-normal opacity-80">哩</span>`);
  set('eva-miles-target',  `${fmt(eva.target)} 哩`);
  set('eva-miles-gap',     `距目標僅差 ${fmt(eva.gap)} 哩`);
  set('eva-miles-percent', `${eva.progress}% 完成`);
  document.querySelectorAll('.eva-progress-bar')
    .forEach(el => { el.style.width = eva.progress + '%'; });

  // ── 阿聯酋哩程：總哩程 ──────────────────────────────────
  set('emirates-total', fmt(P.miles.emirates.total));

  // ── easyJet 最佳組合：總哩程 / 剩餘 ────────────────────
  const best = P.easyjet.best;
  set('easyjet-best-total',     fmt(best.totalMiles) + ' 哩');
  set('easyjet-best-remaining', fmt(best.remaining)  + ' 哩');
  set('easyjet-out-miles',      fmt(best.out.miles));
  set('easyjet-ret-miles',      fmt(best.ret.miles));

  // ── 升艙基礎票價（多處共用）─────────────────────────────
  const price = P.baseTicket.price;
  document.querySelectorAll('.base-ticket-price')
    .forEach(el => { el.textContent = 'NT$' + fmt(price); });
});
