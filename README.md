# 冰島之旅全規劃 — 專案說明

> 台北 → 倫敦 → 雷克雅維克，長榮 + 阿聯酋哩程規劃工具

---

## 檔案結構

```
Iceland5DaysPlanner/
├── index.html   # 頁面 HTML 結構與視覺（盡量不改）
├── plan.js      # ✅ 所有業務資料（AI 日常改這個）
├── sync.js      # 把 plan.js 的資料同步到 index.html DOM
└── README.md    # 本說明文件
```

### 分工原則

| 需求 | 改哪個檔案 |
|------|-----------|
| 更新票價、哩程、日期 | `plan.js` |
| 新增/移除資料欄位 | `plan.js` + `sync.js` |
| 調整版面、顏色、字體 | `index.html` |
| 新增連動元素（DOM 同步） | `sync.js` |

---

## 快速更新指南

### 改首爾方案機票

```js
// plan.js → plans.seoul.ticket
ticket: { price: 33632, stops: 1, duration: "25h45m" },
```
→ 自動更新頁面 3 個位置（Hero 卡、路線說明、比較表格）

---

### 改長榮哩程總數

```js
// plan.js → miles.eva
eva: { total: 49812, target: 50000, gap: 188, progress: 99.6 },
```
→ 自動更新進度條、數值、差距文字

---

### 改阿聯酋哩程總數

```js
// plan.js → miles.emirates
emirates: { total: 28600 },
```

---

### 新增 easyJet 去程班次

```js
// plan.js → easyjet.outbound 陣列新增一筆
{ date:"11/2", wd:"一", time:"08:00–11:30", miles:12500, remaining:16100 },
```

---

### 新增哩程組合

```js
// plan.js → easyjet.combos 陣列新增一筆
{ out:"11/2", ret:"11/7", mOut:12500, mRet:15718, total:28218, left:382, nights:5 },
```
> ⚠️ 確保 total ≤ 28,600（阿聯酋哩程上限）

---

### 修改冰島行程景點

```js
// plan.js → itinerary[1].activities（Day 2 範例）
activities: [
  { name: "新景點名稱", note: "描述說明" },
  ...
]
```

---

## plan.js 資料結構總覽

```
PLAN
├── miles
│   ├── eva          長榮哩程（total, target, gap, progress）
│   ├── emirates     阿聯酋哩程（total）
│   └── sources[]    哩程來源明細
│
├── upgrades[]       長榮升艙方案 A/B/C/D
├── baseTicket       Q艙底票（price）
├── milesValue[]     每哩價值比較
│
├── easyjet
│   ├── best         最佳推薦組合
│   ├── outbound[]   LGW→KEF 去程班次
│   ├── inbound[]    KEF→LGW 回程班次
│   ├── combos[]     所有可行哩程組合
│   ├── airports     LGW / LTN 比較
│   ├── transfer[]   LHR→LGW 交通選項
│   └── chain[]      完整行程串聯（倫敦方案）
│
├── versions
│   ├── v5           5天版（10/30–11/3）
│   ├── v6           6天版（11/1–11/6）
│   └── v7           7天版（11/1–11/7）
│
├── airlines
│   ├── br           長榮 BR67/BR68（TPE→BKK→LHR）
│   └── ci           華航 CI82/CI81（TPE→LHR 直飛）
│
├── plans
│   ├── seoul        首爾方案（ticket, emiratesMiles, 路線...）
│   ├── london       倫敦方案（cashSpend, emiratesMiles...）
│   └── compareRows  比較表格列定義
│
└── itinerary[]      冰島 5 天行程（Day 1–5）
```

---

## sync.js 已連動的 DOM 元素

| `id` | 顯示內容 | 對應 plan.js |
|------|---------|-------------|
| `seoul-ticket-hero` | 首爾 Hero 卡票價 | `plans.seoul.ticket.price` |
| `seoul-ticket-route` | 首爾路線說明票價 | `plans.seoul.ticket` |
| `seoul-ticket-compare` | 比較表格票價欄 | `plans.seoul.ticket` |
| `seoul-emirates-label` | 首爾阿聯酋哩程需求 | `plans.seoul.emiratesMiles/Gap` |
| `eva-miles-total` | 長榮哩程大數字 | `miles.eva.total` |
| `eva-miles-target` | 長榮目標哩程 | `miles.eva.target` |
| `eva-miles-gap` | 長榮哩程缺口 | `miles.eva.gap` |
| `eva-miles-percent` | 進度條百分比文字 | `miles.eva.progress` |
| `.eva-progress-bar` | 進度條填充寬度 | `miles.eva.progress` |
| `emirates-total` | 阿聯酋哩程大數字 | `miles.emirates.total` |
| `easyjet-best-total` | 最佳組合總哩程 | `easyjet.best.totalMiles` |
| `easyjet-best-remaining` | 最佳組合剩餘哩程 | `easyjet.best.remaining` |
| `easyjet-out-miles` | 去程哩程數 | `easyjet.best.out.miles` |
| `easyjet-ret-miles` | 回程哩程數 | `easyjet.best.ret.miles` |
| `.base-ticket-price` | Q艙底票價（多處） | `baseTicket.price` |

> 新增連動元素：在 `index.html` 加 `id`，在 `sync.js` 的 `DOMContentLoaded` 裡加一行 `set()`。

---

## 頁面 Tab 結構

| Tab ID | 說明 |
|--------|------|
| `section-itinerary` | 冰島 5 天行程 |
| `section-tpe-uk` | 台北→英國（長榮哩程升艙） |
| `section-uk-iceland` | 英國→冰島（easyJet 哩程表） |
| `section-version` | 行程版本比較（5/6/7天） |
| `section-compare` | 首爾方案 vs 倫敦方案 |

---

## 注意事項

- 哩程數值以查詢當下為準，票價與哩程隨時可能異動
- easyJet 哩程組合需確保合計 ≤ `miles.emirates.total`（28,600）
- `index.html` 中仍有部分數值未與 plan.js 連動（班次表格、版本比較卡等），修改時需手動同步
