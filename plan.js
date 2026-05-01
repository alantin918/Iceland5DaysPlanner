// ============================================================
// plan.js — 冰島行程所有業務資料（AI 只需改此檔）
// 修改方式：直接改對應屬性值，不需碰 index.html
// ============================================================

const PLAN = {

  // ── 版本資訊（執行 commit.sh 時自動更新）────────────────────
  lastUpdated: "2026-05-01 16:01 (Asia/Taipei)",

  // ── 哩程帳戶 ──────────────────────────────────────────────

  miles: {
    eva: { total: 49812, target: 50000, gap: 188, progress: 99.6 },
    ci:  { total: 34283, target25k: 25000, gap25k: 0, target50k: 50000, gap50k: 15717, progress25k: 100, progress50k: 68.6 },
    emirates: { total: 28600 },

    sources: [
      { label: "台新銀行",      short: "台新", points: 6874,  miles: 8112,  color: "red" },
      { label: "星展銀行",      short: "星展", points: 11866, miles: 23700, color: "blue" },
      { label: "國泰世華 CUBE", short: "CUB",  points: 5655,  miles: 15000, color: "purple" },
      { label: "恢復過期哩程",  short: "補",   points: null,  miles: 3000,  cost: "$30 USD", color: "amber" }
    ],
    // 華航 Dynasty Flyer 34,283 哩來源（信用卡轉換 31,256 + 帳戶現有 3,027）
    ciSources: [
      { label: "台新銀行",      short: "台新", points: 6874,  rate: "11pt→14mi",    miles: 8736,  color: "red" },
      { label: "星展銀行",      short: "星展", points: 11866, rate: "90pt→100mi",   miles: 13100, color: "blue" },
      { label: "國泰世華 CUBE", short: "CUB",  points: 5655,  rate: "840pt→1000mi", miles: 6000,  color: "purple" },
      { label: "玉山銀行",      short: "玉山", points: 3837,  rate: "200pt→180mi",  miles: 3420,  color: "green" },
      { label: "帳戶現有",      short: "現有", points: null,  rate: "—",            miles: 3027,  color: "orange" }
    ]
  },

  // ── 長榮升艙方案 ───────────────────────────────────────────
  upgrades: [
    { id:"A", label:"升艙豪經・單程", tag:"方案 A ✅ 立即可行",  miles:25000, feasible:true,  remaining:24812, color:"emerald",
      note:"49,812 哩充裕，去程 13 小時躺平飛最值得" },
    { id:"B", label:"升艙豪經・來回", tag:"方案 B ⚡ 差 188 哩", miles:50000, feasible:false, gap:188, recommended:true, color:"amber",
      note:"① 長榮官網直接購買 200 哩 ≈ NT$100–200\n② 少量刷卡消費即可累積" },
    { id:"C", label:"升艙商務艙・單程（Q艙）", tag:"方案 C ❌ 差 20,188 哩", miles:70000, feasible:false, gap:20188, color:"blue",
      note:"差距較大，建議繼續累積哩程後再考慮" },
    { id:"D", label:"升艙商務艙・單程（BY艙）", tag:"方案 D ❌ 差 8,688 哩", miles:58500, feasible:false, gap:8688, color:"indigo",
      note:"比 Q 艙升商務少需 11,500 哩，可查詢 BY 艙票價後評估" }
  ],
  baseTicket: { code: "Q", price: 56254, pePrice: 79983 },
  ciBaseTicket: { code: "T", price: 57644, pePrice: 84037 },
  ciUpgrades: [
    { id:"A", label:"升艙豪經・單程", tag:"方案 A ✅ 立即可行",  miles:25000, feasible:true,  remaining:9283, color:"emerald",
      note:"34,283 哩充裕，去程 13h 直飛最舒適" },
    { id:"B", label:"升艙豪經・來回", tag:"方案 B ❌ 差 15,717 哩", miles:50000, feasible:false, gap:15717, color:"red",
      note:"補購 16,000 哩約需 NT$15,600\n總成本 57,644 + 15,600 = 73,244\n比直接買豪經 (84,037) 省 NT$10,793" }
  ],

  milesValue: [
    { label:"換經濟艙",       value:"NT$0.5–1",  unit:"每哩",        color:"gray" },
    { label:"升豪華經濟艙",   value:"NT$1–2",    unit:"每哩 ✅",     color:"emerald", highlight:true },
    { label:"升商務艙",       value:"NT$2–4",    unit:"每哩 ⭐",     color:"blue" },
    { label:"恢復哩程成本",   value:"NT$0.32",   unit:"最便宜取得",  color:"amber" }
  ],

  // ── 哩程分析：機票方案大比拼 ─────────────────────────────
  worthItAnalysis: {
    title: "華航倫敦機票：三種方案終極比拼",
    options: [
      { name: "方案 A：單程升等 (回程豪經)", ticket: 48786, buyMiles: 0, total: 48786, desc: "去程一般經濟 / 回程用現有哩程升豪經", tag: "極致 CP 值" },
      { name: "方案 B：雙程升等 (來回豪經)", ticket: 57644, buyMiles: 15600, total: 73244, desc: "買可升等艙 / 補 1.6 萬哩程升等", tag: "舒適划算" },
      { name: "方案 C：直接買豪經", ticket: 84037, buyMiles: 0, total: 84037, desc: "直接花錢買來回豪華經濟艙", tag: "最貴" }
    ],
    savingsText: "方案 A 比 方案 B 省下 NT$26,858",
    conclusion: "想省錢選【方案 A】，想全程好睡選【方案 B】！",
    points: [
      "【方案 A 最省錢】：總花費不到 4.9 萬，去程坐經濟艙，回程利用現有 3 萬哩升等豪經艙，完全不需額外花錢買哩程，CP 值最高。",
      "【方案 B 的價值】：比 A 多花近 2.7 萬，換來去程 13 小時豪經艙。若去程抵達倫敦需立刻走行程，這筆錢花在「買睡眠與精神」上就很值得。",
      "【絕對不要直接買】：不管選哪種，都比直接買豪經 (8.4 萬) 划算。若要來回豪經，選方案 B 能省下 8,393 元。"
    ]
  },

  // ── LGW ↔ KEF easyJet（阿聯酋哩程兌換）──────────────────
  easyjet: {
    best: {
      label:"10/30 去 + 11/3 回", nights:4, desc:"5 天 4 夜・最省哩程方案",
      out: { date:"10/30", wd:"五", dep:"15:00", arr:"18:20", dur:"3h20m", miles:10234 },
      ret: { date:"11/3",  wd:"一", dep:"12:20", arr:"15:30", dur:"3h10m", miles:13212 },
      totalMiles:23446, remaining:5154
    },
    outbound: [
      { date:"10/28", wd:"三", time:"13:55–17:15", miles:20278, remaining:8322 },
      { date:"10/30", wd:"五", time:"15:00–18:20", miles:10234, remaining:18366, best:true },
      { date:"10/31", wd:"六", time:"14:24–17:45", miles:24166, remaining:4434, expensive:true },
      { date:"11/1",  wd:"日", time:"07:00–10:30", miles:11044, remaining:17556 }
    ],
    inbound: [
      { date:"11/1",  wd:"日", time:"11:20–14:30", miles:23235 },
      { date:"11/2",  wd:"一", time:"12:00–15:10", miles:18517 },
      { date:"11/3",  wd:"二", time:"12:20–15:30", miles:13212, best:true },
      { date:"11/4",  wd:"三", time:"18:05–21:15", miles:27583, expensive:true },
      { date:"11/5",  wd:"四", time:"18:05–21:15", miles:14245 },
      { date:"11/6",  wd:"五", time:"19:15–22:25", miles:14908 },
      { date:"11/7",  wd:"六", time:"18:35–21:45", miles:15718 },
      { date:"11/8",  wd:"日", time:"11:20–14:30", miles:20066 },
      { date:"11/9",  wd:"一", time:"12:00–15:10", miles:15645 },
      { date:"11/10", wd:"二", time:"12:20–15:30", miles:10633, best:true },
      { date:"11/11", wd:"三", time:"18:05–21:15", miles:12844 },
      { date:"11/12", wd:"四", time:"18:05–21:15", miles:11739 }
    ],
    // 所有 28,600 哩以內的可行組合
    combos: [
      { out:"10/30", ret:"11/3",  mOut:10234, mRet:13212, total:23446, left:5154,  nights:4, star:true },
      { out:"11/1",  ret:"11/5",  mOut:11044, mRet:14245, total:25289, left:3311,  nights:4 },
      { out:"10/30", ret:"11/5",  mOut:10234, mRet:14245, total:24479, left:4121,  nights:6 },
      { out:"10/30", ret:"11/6",  mOut:10234, mRet:14908, total:25142, left:3458,  nights:7 },
      { out:"10/30", ret:"11/7",  mOut:10234, mRet:15718, total:25952, left:2648,  nights:8 },
      { out:"10/30", ret:"11/9",  mOut:10234, mRet:15645, total:25879, left:2721,  nights:10 },
      { out:"10/30", ret:"11/10", mOut:10234, mRet:10633, total:20867, left:7733,  nights:11 },
      { out:"10/30", ret:"11/11", mOut:10234, mRet:12844, total:23078, left:5522,  nights:12 },
      { out:"10/30", ret:"11/12", mOut:10234, mRet:11739, total:21973, left:6627,  nights:13 },
      { out:"11/1",  ret:"11/6",  mOut:11044, mRet:14908, total:25952, left:2648,  nights:5 },
      { out:"11/1",  ret:"11/10", mOut:11044, mRet:10633, total:21677, left:6923,  nights:9 }
    ],
    comboNote: "10/28 與 10/31 出發的所有組合皆超出 28,600 哩，故不列入",
    airports: {
      lgw: { name:"LGW 蓋特威克", tag:"推薦", distLhr:"~64 km", bus:"~75 分鐘", season:"10–4 月", freq:"每週 6–7 班", highlight:true },
      ltn: { name:"LTN 盧頓",     tag:"備選", distLhr:"~58 km", bus:"~55 分鐘", season:"較全年",  freq:"每週 2–3 班" }
    },
    airportNote: "LGW 採「冬春季營運」（10–4 月），夏季（5–9 月）完全停飛。LTN 為夏季首選；秋冬出發兩者皆可，LGW 班次更多。",
    transfer: [
      { mode:"National Express 巴士", dur:"~75 分鐘", cost:"£10–16" },
      { mode:"Uber / Taxi",           dur:"~50 分鐘", cost:"£60–100" },
      { mode:"地鐵+火車",             dur:"~2 小時",  cost:"£15–20" }
    ],
    transferNote: "建議預留 3 小時以上 緩衝時間（含過海關、領行李、轉機場）",
    emiratesNote: "動態定價兌換，7,500 哩起兌，每哩 ~0.5p，需另付行李 + 稅 £20–50",
    emiratesWarnings: [
      "兌換後不可更改、不可退款",
      "用哩程兌換的旅程不能再累積 Skywards 哩程",
      "不能與其他航空公司銜接，無法做跨航司連程兌換",
      "每哩價值偏低，但作為「快過期哩程的消耗出口」很合適"
    ],
    // 完整行程串聯（倫敦方案 5天版）
    chain: [
      { icon:"🇹🇼", label:"台北 → 倫敦", note:"華航 T 艙 + 31,256 哩升豪華經濟艙（去程）", price:"NT$57,622", color:"sky" },
      { icon:"🚌", label:"LHR → LGW 轉機", note:"National Express 巴士・約 75 分鐘", price:"£10–16", color:"purple" },
      { icon:"🇬🇧", label:"10/30 LGW → KEF", note:"easyJet・15:00–18:20・阿聯酋哩程兌換", price:"10,234 哩", color:"orange" },
      { icon:"🇮🇸", label:"冰島 5 天 4 夜（10/30–11/3）", note:"雷克雅維克為基地・黃金圈・斯奈山半島", price:"See 行程", color:"blue" },
      { icon:"🛬", label:"11/3 KEF → LGW", note:"easyJet・12:20–15:30・阿聯酋哩程兌換", price:"13,212 哩", color:"rose" }
    ]
  },

  // ── 行程版本（5/6/7天）────────────────────────────────────
  versions: {
    v5: { label:"5天版", sub:"最省哩程", color:"emerald",
          iceland:"10/30–11/3", nights:4,
          out:{ date:"10/30", flight:"LGW→KEF 15:00–18:20", miles:10234 },
          ret:{ date:"11/3",  flight:"KEF→LGW 12:20–15:30", miles:13212 },
          total:23446, remaining:5154, londonBR:"半天", londonCI:"整天" },
    v6: { label:"6天版", sub:"多一天冰島", color:"blue",
          iceland:"11/1–11/6", nights:5,
          out:{ date:"11/1", flight:"LGW→KEF 07:00–10:30", miles:11044 },
          ret:{ date:"11/6", flight:"KEF→LGW 19:15–22:25", miles:14908 },
          total:25952, remaining:2648, londonBR:"2天", londonCI:"2.5天" },
    v7: { label:"7天版", sub:"最長冰島行程", color:"violet",
          iceland:"11/1–11/7", nights:6,
          out:{ date:"11/1", flight:"LGW→KEF 07:00–10:30", miles:11044 },
          ret:{ date:"11/7", flight:"KEF→LGW 18:35–21:45", miles:15718 },
          total:26762, remaining:1838, londonBR:"2天", londonCI:"2.5天" }
  },

  // ── 航空公司比較（台北→倫敦）─────────────────────────────
  airlines: {
    br: { name:"長榮航空", code:"BR67/BR68", route:"TPE → BKK → LHR", type:"⚠️ 曼谷轉機",
          duration:"約 18–20 小時", layover:"約 2–3 小時", freq:"每日一班",
          dep10_28:"✓ 可搭", arr:"約上午 11:00（次日）", color:"green",
          note:"抵達較晚，5天版僅剩半天倫敦時間" },
    ci: { name:"中華航空", code:"CI82/CI81", route:"TPE → LHR 直飛", type:"✅ 直飛，省 5–7 小時",
          duration:"約 13 小時", freq:"週一/二/三/五/六",
          dep10_28:"✓ 可搭（週三）", arr:"約清晨 06:00（次日）", color:"blue",
          note:"抵達最早，5天版仍有幾乎整天倫敦時間" }
  },

  // ── 方案比較（首爾 vs 倫敦）──────────────────────────────
  plans: {
    seoul: {
      label:"首爾方案", emoji:"🇰🇷", route:"台北 → 首爾 → 冰島",
      ticket: { price:33632, stops:1, duration:"25h45m" },
      emiratesMiles:22000, emiratesCash:1013, emiratesGap:0, emiratesSurplus:6600,
      emiratesRoute:"TPE ↔ ICN 來回",
      evaStatus:"保留未用",
      icelandPath:"ICN → KEF（另購票）",
      tpeIcn: { price:33632, stops:1, duration:"25小時45分鐘" },
      icnKef: { note:"另行購票（現金票或其他哩程）" },
      milesNote:"TPE↔ICN 來回，22,000 阿聯酋哩 + NT$1,013",
      returnRoute:"KEF → ICN → TPE",
      returnNote:"KEF→ICN 含在另購票內，ICN→TPE 含在阿聯酋來回哩程內",
      surplus: { need:22000, have:28600, cash:1013, extra:6600 },
      icelandDays:"5–7",
      longFlight:"ICN→CPH 11h（經濟艙）",
      whyChoose: [
        "現金預算有限，希望省下 NT$40,000+ 機票費",
        "這趟想順道遊首爾（韓食・購物・文化）",
        "不在意經濟艙飛 ICN→CPH 11 小時",
        "長榮 49,812 哩之後另有用途（留著）"
      ]
    },
    london: {
      label:"倫敦方案", emoji:"🇬🇧", route:"台北 → 倫敦 → 冰島",
      cashSpend:57644, anneCashSpend:40771,
      emiratesMiles:23446, emiratesLeft:5154,
      ciStatus:"25,000（去程升艙）",
      icelandPath:"LHR → LGW → KEF",
      tpeLhr: { ticket:57644, miles:31256, ci:"直飛 ~13h", br:"轉曼谷 ~18–20h" },
      lgwKef: { miles:10234, note:"10/30 最省班次" },
      kefLgw: { miles:13212, note:"11/3 最省班次" },
      icelandDays:"5–7",
      whyChoose: [
        "重視長途飛行舒適度（升艙才睡得著）",
        "想讓兩個哩程帳戶都發揮最大效益",
        "想順遊倫敦（博物館・美食・建築）",
        "華航直飛省 5–7 小時，哩程充裕去程升艙即可",
        "✅ 補哩程升艙比直接買豪經省 NT$8,393"
      ]
    }
  },
  // 比較表格列定義
  compareRows: [
    { label:"機票現金支出",
      seoul: { text:"NT$33,632 ✅", sub:"轉機 1 次・25h 45m", color:"emerald" },
      london:{ text:"NT$57,644",    color:"red" } },
    { label:"阿聯酋哩程",
      seoul: { text:"22,000 哩 + NT$1,013 ✅", sub:"TPE↔ICN 來回・剩 6,600 哩", color:"emerald" },
      london:{ text:"23,446 哩 ✅", sub:"LGW↔KEF 來回・剩 5,154 哩", color:"blue" } },
    { label:"華航 31,256 哩",
      seoul: { text:"保留（未用）", color:"gray" },
      london:{ text:"去程升艙 ✅（剩 6,256 哩）", color:"emerald" } },
    { label:"長途飛行艙位",
      seoul: { text:"經濟艙（ICN→KEF 另購票）", color:"gray" },
      london:{ text:"豪華經濟（去程升艙）✅", color:"blue" } },
    { label:"冰島飛行路徑",
      seoul: { text:"ICN→KEF（另購票）", sub:"非阿聯酋哩程", color:"gray" },
      london:{ text:"LGW→KEF（阿聯酋哩）", sub:"約 3h 20m ✅", color:"blue" } },
    { label:"中途城市",
      seoul: { text:"首爾", color:"gray" },
      london:{ text:"倫敦", color:"gray" } },
    { label:"哩程整體效益",
      seoul: { text:"華航哩程閒置", color:"gray" },
      london:{ text:"兩帳戶均使用 ✅", color:"emerald" } }
  ],

  // ── 冰島 5 天行程 ─────────────────────────────────────────
  itinerary: [
    { day:1, title:"抵達與藍色療癒", emoji:"♨️", color:"from-blue-600 to-indigo-600", accent:"blue",
      activities:[
        { name:"KEF 機場取車",        note:"抵達後辦理租車" },
        { name:"Blue Lagoon 藍湖溫泉", note:"離機場 20 分鐘" },
        { name:"極光狩獵（夜間）",     note:"極光船 / 極光小巴" }
      ],
      logistics:"總車程約 1 小時・入住雷克雅維克（連住 4 晚）"
    },
    { day:2, title:"黃金圈精華", emoji:"🌋", color:"from-amber-500 to-orange-500", accent:"amber",
      activities:[
        { name:"辛格韋德利 Þingvellir",    note:"歐亞與美洲板塊交界" },
        { name:"蓋錫爾間歇泉 Geysir",      note:"熱水柱噴發奇景" },
        { name:"黃金瀑布 Gullfoss",        note:"觀景台好走不費力" },
        { name:"番茄溫室餐廳 Friðheimar",  note:"黃金圈最療癒一餐" }
      ],
      logistics:"總車程約 3.5 小時・傍晚返回雷克雅維克"
    },
    { day:3, title:"斯奈山半島・冰島縮影", emoji:"🏔️", color:"from-emerald-600 to-teal-600", accent:"emerald",
      activities:[
        { name:"教堂山 Kirkjufell",   note:"《冰與火之歌》箭頭山" },
        { name:"黑教堂 Búðakirkja",   note:"荒野中的極簡教堂" },
        { name:"阿爾納斯塔皮",        note:"漁村 × 海蝕洞地形" }
      ],
      logistics:"總車程約 4.5 小時・本行程最遠的一天，風景最值得"
    },
    { day:4, title:"市區漫步 × Sky Lagoon", emoji:"🌊", color:"from-violet-600 to-purple-600", accent:"violet",
      activities:[
        { name:"哈爾格林姆教堂",      note:"頂樓俯瞰市區彩色屋頂" },
        { name:"Harpa 音樂廳",        note:"玻璃光影建築・免費入內" },
        { name:"Laugavegur 購物街",   note:"冰島設計品・手工咖啡" },
        { name:"Sky Lagoon 天空之潟", note:"無邊際溫泉 × 大西洋海景" }
      ],
      logistics:"幾乎免開車・行程最放鬆的一天"
    },
    { day:5, title:"最後採買・啟程", emoji:"🎁", color:"from-slate-600 to-gray-700", accent:"gray",
      activities:[
        { name:"市區最後採買",        note:"Omnom 巧克力・66°North 保暖衣" },
        { name:"KEF 機場還車離開",    note:"市區→機場約 45 分鐘" }
      ]
    }
  ],

  // ── 旅費估算 ──────────────────────────────────────────────
  budget: {
    people: 2,
    note: "以 Alan + Anne 2 人計算，住宿費用為雙人房共費，餐費交通為 2 人合計",

    flights: [
      { who:"Alan", route:"TPE ↔ LHR（CI82 / CI81）", type:"方案 A 單程升等（回程豪經）", cash:48786, miles:"25,000 CI 哩（去程升艙）", color:"sky" },
      { who:"Anne", route:"TPE ↔ LHR（CI82 / CI81）", type:"CI 直購經濟艙",               cash:40771, miles:null,                    color:"blue" },
      { who:"2 人", route:"LGW ↔ KEF（easyJet 來回）", type:"Emirates 哩程兌換",          cash:1013,  miles:"23,446 Emirates 哩",       color:"amber" }
    ],

    uk: {
      nights: 3,
      days: 3,
      note: "10/29 抵達 1 晚 + 11/3–11/4 回程 2 晚，共 3 晚",
      sections: [
        {
          title: "🏨 住宿",
          items: [
            { label:"飯店 10/29（抵達當晚）", amount:5500, note:"市區 3–4★ 雙人房（估）" },
            { label:"飯店 11/3–11/4（回程 2 晚）", amount:11000, note:"市區 3–4★ 雙人房 NT$5,500/晚（估）" }
          ]
        },
        {
          title: "🚇 交通",
          items: [
            { label:"Heathrow Express 來回", amount:2400, note:"2 人 × 2 趟 × £15 ≈ NT$600/趟" },
            { label:"市區地鐵 Oyster 3 天",  amount:1800, note:"2 人 × 3 天 × NT$300/天" }
          ]
        },
        {
          title: "🍽️ 餐費",
          items: [
            { label:"早餐 3 天", amount:3000, note:"2 人 × 3 天 × NT$500（咖啡館 or 超市）" },
            { label:"午餐 3 天", amount:6000, note:"2 人 × 3 天 × NT$1,000" },
            { label:"晚餐 3 天", amount:9000, note:"2 人 × 3 天 × NT$1,500（餐廳）" }
          ]
        },
        {
          title: "🎟️ 景點門票",
          items: [
            { label:"倫敦塔",          amount:2400, note:"2 人 × £30 ≈ NT$1,200/人" },
            { label:"其他特展 / 小景點", amount:1000, note:"大英博物館・國家畫廊免費，其他酌收（估）" }
          ]
        }
      ]
    },

    iceland: {
      nights: 4,
      days: 5,
      note: "10/30 抵達 – 11/3 離開，共 4 晚 5 天",
      sections: [
        {
          title: "🏨 住宿",
          items: [
            { label:"飯店 4 晚（雷克雅維克）", amount:20000, note:"市區 3★ 雙人房 NT$5,000/晚（估）" }
          ]
        },
        {
          title: "🚗 交通",
          items: [
            { label:"租車 5 天（一般轎車）", amount:13000, note:"含基本保險，10 月非旺季（估）" },
            { label:"油費",               amount:2300,  note:"約 300km 行程估算" },
            { label:"停車費",             amount:2000,  note:"雷克雅維克市區停車 3 天（估）" }
          ]
        },
        {
          title: "🍽️ 餐費",
          items: [
            { label:"早餐 5 天", amount:3000,  note:"2 人 × 5 天 × NT$300（超市購買）" },
            { label:"午餐 5 天", amount:8000,  note:"2 人 × 5 天 × NT$800（超市三明治 / 熱狗）" },
            { label:"晚餐 5 天", amount:15000, note:"2 人 × 5 天 × NT$1,500（餐廳，冰島物價偏高）" }
          ]
        },
        {
          title: "🌌 活動",
          items: [
            { label:"極光追蹤行程",    amount:6000, note:"2 人 × NT$3,000（船上或陸上極光團）" },
            { label:"Sky Lagoon 天空之潟", amount:5000, note:"2 人 × NT$2,500（含更衣儀式）" },
            { label:"金環景點停車費",  amount:1500, note:"辛格韋利爾・蓋錫爾・黃金瀑布（停車費估）" },
            { label:"斯奈山半島停車費", amount:500, note:"景點多為免費，僅停車費（估）" }
          ]
        }
      ]
    },

    extras: [
      { label:"旅遊保險",     amount:4000,  note:"2 人・含冰島戶外活動險（估）", icon:"🛡️" },
      { label:"電話漫遊/SIM", amount:1500,  note:"英國 + 冰島 eSIM 各 1 張（估）", icon:"📱" },
      { label:"購物伴手禮",   amount:10000, note:"冰島設計品・英國紅茶・巧克力等（估）", icon:"🛍️" }
    ]
  }

}; // end PLAN
