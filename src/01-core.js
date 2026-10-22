(() => {
"use strict";
/* ---------- constants ---------- */
const ITEMS = {book:"Open book", mug:"Coffee", phone:"Phone", bottle:"Water bottle", sneakers:"Sneakers", journal:"Journal", fruit:"Fruit plate", flowers:"Flowers", bread:"Bread board", headphones:"Headphones", pillow:"Pillow", plant:"Potted plant"};
const PLANT_KINDS = ["fern","tulip","sunflower","lavender","monstera","cactus"];
const P = ["a","b"];
const LSKEY = "botanology-city-v1", MEKEY = "botanology-city-me";
const DEFAULT_AV = {
  a:{body:"andro",skin:"#E2B48E",face:"oval",eyes:"smile",brows:"soft",details:"blush",facial:"none",hair:"long",hc:"#5A3A28",head:"flower",glasses:"none",ears:"studs",neck:"none",top:"cardigan",topc:"#C8743E",bottom:"jeans",botc:"#7E97AE",shoes:"loafers"},
  b:{body:"andro",skin:"#F3D3B5",face:"round",eyes:"smile",brows:"soft",details:"blush",facial:"none",hair:"bob",hc:"#A98BCB",head:"none",glasses:"round",ears:"none",neck:"none",top:"sweater",topc:"#4B4038",bottom:"jeans",botc:"#8EA6BE",shoes:"boots"}
};
const PRONOUNS = {she:{label:"she/her", pos:"hers"}, he:{label:"he/him", pos:"his"}, they:{label:"they/them", pos:"theirs"}};
const CITIES = {
  beijing:{name:"Beijing", spots:["hutong","houhai"]}, paris:{name:"Paris", spots:["jardin","seine"]}, rome:{name:"Rome", spots:["borghese"]},
  tokyo:{name:"Tokyo", spots:["ueno"]}, nyc:{name:"New York", spots:["central"]}, sf:{name:"San Francisco", spots:["crissy"]}, athens:{name:"Athens", spots:["philopappou"]},
  london:{name:"London", spots:["southbank"]}, copenhagen:{name:"Copenhagen", spots:["nyhavn"]}, delhi:{name:"Delhi", spots:["lodhi"]}
};
const PLACES = {
  hutong:{name:"Hutong courtyard", city:"Beijing"}, houhai:{name:"Houhai lakeside", city:"Beijing"},
  jardin:{name:"Jardin lawn", city:"Paris"}, seine:{name:"Seine quay", city:"Paris"},
  borghese:{name:"Villa Borghese", city:"Rome"}, ueno:{name:"Ueno Park", city:"Tokyo"},
  central:{name:"Central Park", city:"New York"}, crissy:{name:"Crissy Field", city:"San Francisco"}, philopappou:{name:"Philopappou Hill", city:"Athens"},
  southbank:{name:"South Bank", city:"London"}, nyhavn:{name:"Nyhavn", city:"Copenhagen"}, lodhi:{name:"Lodhi Garden", city:"Delhi"}
};
const cityOf = spot => Object.keys(CITIES).find(c => CITIES[c].spots.includes(spot)) || "beijing";
const DEFAULT_PLACE = {a:"hutong", b:"jardin"};

const WX = {
  sunny:{label:"Sunny", line:"Clear skies"},
  breezy:{label:"Sunny and breezy", line:"Bright and breezy"},
  partly:{label:"Partly cloudy", line:"A few clouds drifting"},
  windy:{label:"Windy", line:"Blustery but bright"},
  overcast:{label:"Overcast", line:"Grey skies"},
  fog:{label:"Foggy", line:"Hazy and still"},
  drizzle:{label:"Drizzle", line:"A light drizzle"},
  rain:{label:"Rainy", line:"Steady rain"},
  snow:{label:"Snowing", line:"Snow drifting down"},
  storm:{label:"Thunderstorm", line:"Thunder overhead"},
  blizzard:{label:"Blizzard", line:"A whiteout"},
  none:{label:"No forecast yet", line:"Check in and the sky will settle"}
};
const BAND_TXT = ["Very few goals met lately.","Fewer goals met lately.","About half the goals met lately.","A good run lately.","Most goals met lately."];

const guessItem = n => {
  n = (n||"").toLowerCase();
  if (/screen|phone|social|scroll/.test(n)) return "phone";
  if (/read|book|page/.test(n)) return "book";
  if (/water|drink|hydrat/.test(n)) return "bottle";
  if (/walk|run|move|step|gym|exercise|workout/.test(n)) return "sneakers";
  if (/journal|write|gratitude/.test(n)) return "journal";
  if (/coffee|caffeine|tea/.test(n)) return "mug";
  if (/fruit|veg|eat|meal|cook/.test(n)) return "fruit";
  if (/music|podcast|listen|language|study/.test(n)) return "headphones";
  if (/sleep|bed|lights|wake/.test(n)) return "pillow";
  return "plant";
};
const CATS = {
  read:{label:"Reading", icon:"book"}, move:{label:"Exercise", icon:"sneakers"}, sleep:{label:"Sleep", icon:"pillow"}, mindful:{label:"Mindfulness", icon:"flowers"},
  journal:{label:"Journaling", icon:"journal"}, study:{label:"Study and focus", icon:"laptop"}, language:{label:"Languages", icon:"speech"},
  nourish:{label:"Food and drink", icon:"bread"}, unplug:{label:"Less screen time", icon:"phone"}, connect:{label:"Connection", icon:"heart"}
};
const guessCat = n => {
  n = (n||"").toLowerCase();
  if (/screen|phone|social|scroll|unplug|offline/.test(n)) return "unplug";
  if (/language|spanish|french|italian|japanese|chinese|mandarin|german|danish|hindi|greek|vocab|duolingo/.test(n)) return "language";
  if (/read|book|page/.test(n)) return "read";
  if (/water|drink|cook|eat|meal|fruit|veg|breakfast|food/.test(n)) return "nourish";
  if (/walk|run|move|step|gym|exercise|workout|yoga|swim|bike|cycl/.test(n)) return "move";
  if (/journal|write|gratitude|diary/.test(n)) return "journal";
  if (/meditat|breath|mindful|pray/.test(n)) return "mindful";
  if (/study|work|focus|code|practi|piano|guitar|homework|learn/.test(n)) return "study";
  if (/sleep|bed|lights|wake|nap/.test(n)) return "sleep";
  if (/call|family|friend|text|mum|mom|dad|connect|letter/.test(n)) return "connect";
  return "study";
};
const ITEM_CAT = {book:"read", sneakers:"move", pillow:"sleep", flowers:"mindful", journal:"journal", headphones:"study", phone:"unplug", bottle:"nourish", bread:"nourish", fruit:"nourish", mug:"sleep", plant:"mindful"};
const SUGGESTIONS = [
  {name:"Screen time", type:"duration", dir:"max", target:180, cat:"unplug"},
  {name:"Read 20 pages", type:"check", cat:"read"},
  {name:"Exercise", type:"duration", dir:"min", target:30, cat:"move"},
  {name:"Lights out", type:"clock", dir:"max", target:1410, cat:"sleep"},
  {name:"Wake up", type:"clock", dir:"max", target:450, cat:"sleep"},
  {name:"Drink 8 glasses of water", type:"check", cat:"nourish"},
  {name:"Meditate", type:"duration", dir:"min", target:10, cat:"mindful"},
  {name:"Journal", type:"check", cat:"journal"},
  {name:"Deep work", type:"duration", dir:"min", target:120, cat:"study"},
  {name:"Practise a language", type:"duration", dir:"min", target:20, cat:"language"},
  {name:"Cook at home", type:"check", cat:"nourish"},
  {name:"Call family", type:"check", cat:"connect"},
  {name:"No social media before noon", type:"check", cat:"unplug"},
  {name:"Walk outside", type:"duration", dir:"min", target:30, cat:"move"}
];
const QUICK = {
  cheer:{label:"Cheer", text: n => `Proud of you, ${n}. Keep going!`},
  nudge:{label:"Nudge", text: n => `Gentle nudge, ${n}: I haven’t seen your check-in yet today.`},
  ask:{label:"Ask", text: n => `How’s today going, ${n}?`}
};
/* ---------- dates & formats ---------- */
const pad = n => String(n).padStart(2,"0");
const fmt = d => d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
const parse = s => { const [y,m,d] = s.split("-").map(Number); return new Date(y,m-1,d); };
const addDays = (s,n) => { const d = parse(s); d.setDate(d.getDate()+n); return fmt(d); };
const diffDays = (a,b) => Math.round((parse(a)-parse(b))/864e5);
const today = () => fmt(new Date());
const shortDate = s => parse(s).toLocaleDateString(undefined,{month:"short", day:"numeric"});
const prettyDay = s => { const t = today(); if (s===t) return "Today"; if (s===addDays(t,-1)) return "Yesterday"; return parse(s).toLocaleDateString(undefined,{weekday:"long",month:"short",day:"numeric"}); };
const fmtNum = v => (Math.round(v*100)/100).toString();
const fmtDur = m => { m = Math.round(m); const h = Math.floor(m/60), r = m%60; return h && r ? `${h} h ${r} min` : h ? `${h} h` : `${r} min`; };
const fmtClock = m => { m = ((Math.round(m)%1440)+1440)%1440; const d = new Date(2000,0,1,Math.floor(m/60),m%60); return d.toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit",hour12:!pref("clock24")}); };
const clockStr = m => m==null||m==="" ? "" : `${pad(Math.floor((m%1440)/60))}:${pad(m%60)}`;
const parseClock = s => { const x = /^(\d{1,2}):(\d{2})/.exec(s||""); return x ? (+x[1])*60 + (+x[2]) : null; };
const timeAt = iso => { try { return new Date(iso).toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit",hour12:!pref("clock24")}); } catch { return ""; } };
const hashF = str => { let h = 2166136261; for (let i=0;i<str.length;i++){ h ^= str.charCodeAt(i); h = Math.imul(h,16777619); } return ((h>>>0)%10000)/10000; };
const rnd = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

/* ---------- state ---------- */
const S = { config:null, logs:{}, picnic:{a:{},b:{}}, messages:[], loaded:false, mode:"loading", readOnly:false,
  tab:"day", day:today(), month:today().slice(0,7), windowStart:addDays(today(),-365), pop:new Set(), me:null };
try { const m = localStorage.getItem(MEKEY); if (m==="a"||m==="b") S.me = m; } catch {}
S.motion = "lively"; try { const mo = localStorage.getItem("botanology-city-motion"); if (["lively","calm","still"].includes(mo)) S.motion = mo; } catch {}
const PREF_DEFAULTS = {checkinBy:1260, weekStart:"mon", clock24:false, weatherMode:"progress", askWhy:true};
const pref = k => (S.config?.prefs && k in S.config.prefs) ? S.config.prefs[k] : PREF_DEFAULTS[k];
const dirty = {}, writing = {}, timers = {};
let store = null;

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const name = p => (S.config?.people?.[p]?.name || "").trim() || (p==="a" ? "Gardener A" : "Gardener B");
const other = p => p==="a" ? "b" : "a";
function migrateAv(av, p){
  const o = {...DEFAULT_AV[p], ...(av||{})};
  if (av && av.acc && !av.head && !av.glasses) { if (av.acc==="glasses") o.glasses = "round"; else if (["beret","headphones","flower"].includes(av.acc)) { o.head = av.acc; o.glasses = "none"; } else { o.head = "none"; o.glasses = "none"; } }
  delete o.acc; return o;
}
const avatarOf = p => ({...migrateAv(S.config?.people?.[p]?.avatar, p), _look: lookOf(p)});
const pronOf = p => PRONOUNS[S.config?.people?.[p]?.pron] || PRONOUNS.they;
const placeOf = p => { const pl = S.picnic[p]?.place === "alamo" ? "crissy" : S.picnic[p]?.place; return PLACES[pl] ? pl : DEFAULT_PLACE[p]; };
const CITY_TZ = {beijing:"Asia/Shanghai", paris:"Europe/Paris", rome:"Europe/Rome", tokyo:"Asia/Tokyo", nyc:"America/New_York", sf:"America/Los_Angeles", athens:"Europe/Athens", london:"Europe/London", copenhagen:"Europe/Copenhagen", delhi:"Asia/Kolkata"};
function cityNow(city){
  try { const parts = new Intl.DateTimeFormat("en-US",{timeZone:CITY_TZ[city]||"UTC", hour:"numeric", minute:"numeric", month:"numeric", hour12:false}).formatToParts(new Date());
    const g = t => +parts.find(x=>x.type===t).value; return {h:g("hour")%24, m:g("minute"), mo:g("month")}; } catch { const d = new Date(); return {h:d.getHours(), m:d.getMinutes(), mo:d.getMonth()+1}; }
}
const PHASE_LABEL = {dawn:"dawn", day:"daytime", golden:"golden hour", dusk:"dusk", night:"night"};
function phaseFor(city){
  const {h, m, mo} = cityNow(city), t = h + m/60;
  const [rise, set] = mo>=5&&mo<=8 ? [5.5,20] : mo>=11||mo<=2 ? [7.5,16.8] : [6.5,18.6];
  if (t < rise-1 || t >= set+1.5) return "night";
  if (t < rise+.6) return "dawn";
  if (t >= set+.4) return "dusk";
  if (t >= set-1) return "golden";
  return "day";
}
function cityClock(city){ try { return new Date().toLocaleTimeString(undefined,{timeZone:CITY_TZ[city], hour:"numeric", minute:"2-digit", hour12:!pref("clock24")}); } catch { return ""; } }
const phaseOfP = (p, d) => d === today() ? phaseFor(cityOf(placeOf(p))) : "day";
const PETS = {cat:"Cat", dog:"Dog", bunny:"Bunny", fox:"Fox", duck:"Duck", hedgehog:"Hedgehog", tortoise:"Tortoise", panda:"Red panda"};
const petOf = p => PETS[S.config?.people?.[p]?.pet] ? S.config.people[p].pet : "cat";
const habits = () => (S.config?.habits || []).map((h,i) => {
  const type = ["check","duration","clock","number"].includes(h.type) ? h.type : "check";
  let share = h.who==="both" ? (h.share || "each") : "each";
  if (share==="combined" && !(type==="duration"||type==="number")) share = "each";
  const cat = CATS[h.cat] ? h.cat : (h.item && ITEM_CAT[h.item] && !/language|call|family/i.test(h.name) ? ITEM_CAT[h.item] : guessCat(h.name));
  return {...h, type, share, cat, item: CATS[cat].icon, plant: h.plant || PLANT_KINDS[i%6], target:Number(h.target)||0};
});
const applies = (h,p) => h.who==="both" || h.who===p;
const key = (d,p) => d+"_"+p;
const val = (d,p,hid) => { const v = S.logs[key(d,p)]?.values?.[hid]; return typeof v==="number" ? v : null; };
const done = (d,p,hid) => !!S.logs[key(d,p)]?.done?.[hid];
const adj = (v,h) => (h.type==="clock" && h.target >= 1080 && v < 360) ? v + 1440 : v;
const cmp = (v,h) => h.dir==="max" ? adj(v,h) <= h.target : adj(v,h) >= h.target;
function indiv(d,p,h){ if (h.type==="check") return done(d,p,h.id); const v = val(d,p,h.id); return v!==null && cmp(v,h); }
function mine(d,p,h){
  if (h.share==="combined") return val(d,p,h.id)!==null;
  return indiv(d,p,h);
}
function met(d,p,h){
  if (h.share==="both") return indiv(d,"a",h) && indiv(d,"b",h);
  if (h.share==="combined") { const va = val(d,"a",h.id), vb = val(d,"b",h.id); return va!==null && vb!==null && (h.dir==="max" ? va+vb <= h.target : va+vb >= h.target); }
  return indiv(d,p,h);
}
const fmtVal = (h,v) => v===null ? "" : h.type==="duration" ? fmtDur(v) : h.type==="clock" ? fmtClock(v) : `${fmtNum(v)} ${h.unit||""}`.trim();
function targetText(h){
  if (h.type==="duration") return `${h.dir==="max"?"at most":"at least"} ${fmtDur(h.target)}`;
  if (h.type==="clock") return `${h.dir==="max"?"by":"after"} ${fmtClock(h.target)}`;
  if (h.type==="number") return `${h.dir==="max"?"at most":"at least"} ${fmtNum(h.target)} ${h.unit||""}`.trim();
  return "";
}
function seasonFor(d){ const s = S.config?.season; if (["spring","summer","fall","winter"].includes(s)) return s; const m = parse(d).getMonth()+1; return m>=3&&m<=5 ? "spring" : m>=6&&m<=8 ? "summer" : m>=9&&m<=11 ? "fall" : "winter"; }

/* ---------- storage ---------- */
function localStore(){
  const read = () => { try { return JSON.parse(localStorage.getItem(LSKEY)) || {}; } catch { return {}; } };
  const write = o => { try { localStorage.setItem(LSKEY, JSON.stringify(o)); } catch {} };
  return { mode:"local",
    start(){ const o = read(); S.config = o.config||null; S.logs = o.logs||{}; S.picnic = o.picnic||{a:{},b:{}}; S.messages = o.messages||[]; S.loaded = true; widenForGoal(); render(); },
    async setConfig(c){ const o = read(); o.config = c; write(o); },
    async setLog(k,v){ const o = read(); o.logs = o.logs||{}; o.logs[k] = v; write(o); },
    async setPicnic(p,v){ const o = read(); o.picnic = o.picnic||{}; o.picnic[p] = v; write(o); },
    async addMessage(id,m){ const o = read(); o.messages = [m, ...(o.messages||[])].slice(0,60); write(o); },
    resub(){} };
}
function dbStore(db){
  let unsub = null;
  function subLogs(){
    if (unsub) unsub();
    unsub = db.collection("logs").where("date", ">=", S.windowStart).onSnapshot(snap => {
      const next = {};
      snap.docs.forEach(d => { if (d.exists) next[d.id] = d.data(); });
      for (const k in dirty) if (S.logs[k]) next[k] = S.logs[k];
      S.logs = next; S.loaded = true; render();
    }, onDbError);
  }
  return { mode:"db",
    start(){
      db.doc("config/main").onSnapshot(s => { S.config = s.exists ? s.data() : null; widenForGoal(); render(); }, onDbError);
      P.forEach(p => db.doc("picnic/"+p).onSnapshot(s => { if (!dirty["picnic-"+p]) { S.picnic[p] = s.exists ? s.data() : {}; render(); } }, onDbError));
      db.collection("messages").orderBy("ts","desc").limit(40).onSnapshot(snap => {
        const pending = S.messages.filter(m => m._pending && !snap.docs.some(d => d.id===m.id));
        S.messages = [...pending, ...snap.docs.filter(d=>d.exists).map(d => ({id:d.id, ...d.data()}))]; render();
      }, onDbError);
      subLogs();
    },
    async setConfig(c){ await db.doc("config/main").set(c); },
    async setLog(k,v){ await db.collection("logs").doc(k).set(v); },
    async setPicnic(p,v){ await db.doc("picnic/"+p).set(v); },
    async addMessage(id,m){ await db.collection("messages").doc(id).set(m); },
    resub: subLogs };
}
function widen(date){ if (date && date < S.windowStart) { S.windowStart = addDays(date,-7); store?.resub(); } }
function widenForGoal(){ widen(S.config?.goal?.start); }
function onDbError(e){ if (e?.code==="revoked") S.readOnly = true; setStatus("ro","Sync paused. Reload to reconnect."); }
function handleWriteError(e){
  if (e?.code==="invalid_argument" || e?.code==="not_granted") { S.readOnly = true; render(); }
  else if (e?.code==="quota_exceeded") setStatus("ro","The garden’s storage is full.");
}
async function boot(){
  let db = null, user = null;
  if (window.claude && typeof window.claude.use==="function") {
    try { db = await window.claude.use("db"); } catch {}
    try { user = await window.claude.use("user"); } catch {}
  }
  if (db) { store = dbStore(db); try { if (await user?.can?.("data.write")===false) S.readOnly = true; } catch {} }
  else store = localStore();
  S.mode = store.mode; store.start();
}
let pendingWrites = 0, lastSaved = 0, saveTimer = null;
function markSaving(){ pendingWrites++; showSave(); }
function markSaved(ok){ pendingWrites = Math.max(0, pendingWrites-1); if (ok !== false) lastSaved = Date.now(); showSave(); }
function showSave(){
  const el = document.getElementById("status"); if (!el || S.readOnly) return;
  clearTimeout(saveTimer);
  if (pendingWrites > 0) { el.className = "status saving"; el.querySelector("span").textContent = "Saving…"; return; }
  if (lastSaved) { el.className = "status saved " + (S.mode==="local"?"local":""); el.querySelector("span").textContent = S.mode==="db" ? "All changes saved for you both" : "Saved on this device"; saveTimer = setTimeout(() => { if (!pendingWrites) setStatus(S.mode==="local"?"local":"", S.mode==="db" ? "Shared between you both" : "Saved on this device only"); }, 3500); }
}
const UIKEY = "habitus-ui";
function saveUI(){ try { localStorage.setItem(UIKEY, JSON.stringify({tab:S.tab, focus:S.focus||{}, noteOpen:S.noteOpen||{}})); } catch {} }
function loadUI(){ try { const u = JSON.parse(localStorage.getItem(UIKEY)||"{}"); if (u.tab) S.tab = u.tab; S.focus = u.focus || {}; S.noteOpen = u.noteOpen || {}; } catch {} }
function chainWrite(k, fn){
  dirty[k] = true;
  const w = writing[k] || (writing[k] = {busy:false, again:false});
  if (w.busy) { w.again = true; return; }
  w.busy = true;
  (async () => {
    do { w.again = false; markSaving(); try { await fn(); markSaved(); } catch (e) { markSaved(false); handleWriteError(e); break; } } while (w.again);
    w.busy = false; delete dirty[k];
  })();
}
const queueWrite = k => chainWrite(k, () => store.setLog(k, JSON.parse(JSON.stringify(S.logs[k]))));
const queuePicnic = p => chainWrite("picnic-"+p, () => store.setPicnic(p, JSON.parse(JSON.stringify(S.picnic[p]))));
function logFor(d,p){
  const l = JSON.parse(JSON.stringify(S.logs[key(d,p)] || {date:d, person:p, done:{}, values:{}, note:""}));
  l.done = l.done||{}; l.values = l.values||{}; l.why = l.why||{};
  const now = new Date().toISOString();
  if (!l.at) l.at = now; l.last = now;
  return l;
}

/* ---------- actions ---------- */
function snapshotMet(d){ const o = {}; for (const p of P) for (const h of habits()) o[p+h.id] = met(d,p,h); return o; }
function markPops(d, before){ for (const p of P) for (const h of habits()) if (applies(h,p) && !before[p+h.id] && met(d,p,h)) S.pop.add(p+"|"+h.id); }
function toggle(d,p,hid){
  if (S.readOnly || d > today()) return;
  const before = snapshotMet(d), l = logFor(d,p);
  if (l.done[hid]) delete l.done[hid]; else l.done[hid] = true;
  S.logs[key(d,p)] = l; markPops(d,before); render(); queueWrite(key(d,p));
}
function setRaw(d,p,hid,v){
  if (S.readOnly) return;
  const before = snapshotMet(d), l = logFor(d,p);
  if (v===null) delete l.values[hid]; else l.values[hid] = v;
  const k = key(d,p); S.logs[k] = l; dirty[k] = true;
  clearTimeout(timers[k]); timers[k] = setTimeout(() => { markPops(d,before); queueWrite(k); render(); }, 650);
}
function editText(d,p,field,hid,v){
  if (S.readOnly) return;
  const l = logFor(d,p);
  if (field==="note") l.note = v.slice(0,500); else { if (v.trim()) l.why[hid] = v.slice(0,160); else delete l.why[hid]; }
  const k = key(d,p); S.logs[k] = l; dirty[k] = true;
  clearTimeout(timers[k]); timers[k] = setTimeout(() => queueWrite(k), 700);
}
async function sendMessage(kind, text){
  if (S.readOnly || !S.me) return;
  try { localStorage.removeItem("habitus-msg-draft"); } catch {}
  text = String(text||"").trim().slice(0,280); if (!text) return;
  const ts = Date.now(), id = ts+"-"+S.me;
  const m = {from:S.me, to:other(S.me), kind, text, ts, date:today()};
  S.messages = [{id, ...m, _pending:true}, ...S.messages]; render();
  markSaving();
  try { await store.addMessage(id, m); markSaved(); S.messages = S.messages.map(x => x.id===id ? {...x, _pending:false} : x); }
  catch (e) { markSaved(false); S.messages = S.messages.filter(x => x.id!==id); handleWriteError(e); render(); }
}
function setMotion(m){ S.motion = m; try { localStorage.setItem("botanology-city-motion", m); } catch {} applyMotion(); render(); }
function applyMotion(){ document.body.classList.toggle("still", S.motion==="still"); document.body.classList.toggle("calm", S.motion==="calm"); }
function setMe(p){ S.me = p; try { localStorage.setItem(MEKEY, p); } catch {} render(); }

/* ---------- stats ---------- */
function count30(p,h){ let n=0,d=today(); for(let i=0;i<30;i++){ if(met(d,p,h)) n++; d=addDays(d,-1);} return n; }
function avg30(p,h){ let s=0,n=0,d=today(); for(let i=0;i<30;i++){ const v=val(d,p,h.id); if(v!==null){s+=adj(v,h);n++;} d=addDays(d,-1);} return n?s/n:null; }
function curStreak(p,h){ let d=today(); if(!met(d,p,h)) d=addDays(d,-1); let n=0; while(d>=S.windowStart && met(d,p,h)){n++; d=addDays(d,-1);} return n; }
function bestStreak(p,h){ let best=0,run=0,d=S.windowStart; const t=today(); while(d<=t){ if(met(d,p,h)){run++; if(run>best)best=run;} else run=0; d=addDays(d,1);} return best; }
function dayFrac(d,p){ const hs = habits().filter(h=>applies(h,p)); if(!hs.length) return 0; return hs.filter(h=>met(d,p,h)).length/hs.length; }
const checkedIn = (d,p) => { const l = S.logs[key(d,p)]; return !!l && (Object.keys(l.done||{}).length || Object.keys(l.values||{}).length || (l.note||"").trim() || Object.keys(l.why||{}).length); };
function checkinStreak(p){ let d = today(); if (!checkedIn(d,p)) d = addDays(d,-1); let n = 0; while (d >= S.windowStart && checkedIn(d,p)) { n++; d = addDays(d,-1); } return n; }
function firstLog(p){ let f = null; for (const k in S.logs) if (k.endsWith("_"+p)) { const d = k.slice(0,10); if (!f || d < f) f = d; } return f; }
function weekRate(p,d){
  const f = firstLog(p); if (!f || f > d) return null;
  let s = 0, n = 0;
  for (let i=0;i<7;i++){ const x = addDays(d,-i); if (x < f) break; s += dayFrac(x,p); n++; }
  return n ? s/n : null;
}
function band(r){ return r>=.8?4 : r>=.6?3 : r>=.4?2 : r>=.2?1 : 0; }
function wxFor(r, d, seed){
  if (r===null || r===undefined) return "none";
  if (pref("weatherMode")==="fair") r = hashF(d+seed) > .5 ? .9 : .7;
  const m = parse(d).getMonth()+1, cold = [10,11,12,1,2,3].includes(m) || seasonFor(d)==="winter";
  const opts = [cold?["storm","blizzard"]:["storm"], cold?["rain","snow"]:["rain","drizzle"], ["overcast","fog","drizzle"], ["partly","windy"], ["sunny","breezy"]][band(r)];
  return opts[Math.floor(hashF(d+"|"+seed)*opts.length)];
}
const wxLine = (w,r) => w==="none" ? WX.none.line+"." : `${WX[w].line}. ${BAND_TXT[band(r)]}`;
function coins(p){
  let earned = 0, d = S.windowStart; const t = today(), hs = habits().filter(h=>applies(h,p));
  while (d <= t) { for (const h of hs) if (met(d,p,h)) earned++; d = addDays(d,1); }
  return Math.max(0, START_COINS + earned - (S.picnic[p]?.spent || 0));
}
function goalHabits(g){ const ids = g?.habitIds; return habits().filter(h => !ids || !ids.length || ids.includes(h.id)); }
function possibleCount(hs, start, end){ const days = Math.max(0, diffDays(end,start)+1); return days * hs.reduce((a,h) => a + (h.who==="both" ? 2 : 1), 0); }
function goalStats(){
  const g = S.config?.goal; if (!g?.text) return null;
  const hs = goalHabits(g), t = today();
  const start = g.start || t, end = g.end && g.end >= start ? g.end : addDays(start,60);
  const possible = possibleCount(hs,start,end);
  const count = Math.max(1, Number(g.count) || Math.round(possible*(Number(g.target)||80)/100) || 1);
  let ma = 0, mb = 0, d = start; const last = end < t ? end : t;
  while (d <= last) { for (const h of hs) { if (applies(h,"a") && met(d,"a",h)) ma++; if (applies(h,"b") && met(d,"b",h)) mb++; } d = addDays(d,1); }
  const got = ma+mb, totalDays = diffDays(end,start)+1;
  const elapsed = t < start ? 0 : Math.min(totalDays, diffDays(t,start)+1);
  const pace = Math.round(count*elapsed/totalDays);
  const left = t > end ? 0 : t < start ? totalDays : diffDays(end,t)+1;
  return {g, hs, start, end, count, ma, mb, got, pace, left, perDay: left ? Math.ceil(Math.max(0,count-got)/left) : 0, started: t >= start, ended: t > end};
}
