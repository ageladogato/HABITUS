/* ---------- setup wizard ---------- */
const wiz = document.getElementById("wizard");
const LOOK_MINI = [
  {keys:["body","skin"], q:n=>`Pick ${n}’s build and skin tone`},
  {keys:["face","eyes"], q:n=>`What about ${n}’s face?`},
  {keys:["hair","hc"], q:n=>`What hair does ${n} have?`},
  {keys:["top","topc"], q:n=>`What’s ${n} wearing on top?`},
  {keys:["bottom","shoes"], q:n=>`And on the bottom?`},
  {keys:["head","glasses"], q:n=>`Any hat or glasses for ${n}?`}
];
function stepList(editing){
  if (editing) return [
    {id:"names", label:"Names and pronouns", r:wNames}, {id:"pets", label:"Sidekicks", r:wPets}, {id:"lookA", label:"look a", r:()=>wLook("a")}, {id:"lookB", label:"look b", r:()=>wLook("b")},
    {id:"goals", label:"Daily goals", r:wGoals}, {id:"tune", label:"Fine-tune goals", r:wTune}, {id:"big", label:"Big goal", r:wBig}, {id:"places", label:"Cities and season", r:wPlaces}, {id:"prefs", label:"Preferences", r:wPrefs}
  ];
  const L = [{id:"welcome", r:wWelcome}, {id:"names", r:wNamesOnly}, {id:"prons", r:wProns}, {id:"pets", r:wPets}];
  for (const p of P) LOOK_MINI.forEach((m,k) => L.push({id:`look-${p}-${k}`, r:()=>wLookMini(p,k)}));
  L.push({id:"goals", r:wGoals}, {id:"who", r:wWho}, {id:"bigtext", r:wBigText}, {id:"biglen", r:wBigLen}, {id:"place-a", r:()=>wPlaceOne("a")}, {id:"place-b", r:()=>wPlaceOne("b")}, {id:"checkin", r:wCheckin}, {id:"done", r:wDone});
  return L;
}
const WZ = {i:0, dir:1, editing:false, d:null, cat:{a:"face",b:"face"}, anim:true, overridden:false};
const newId = () => "h"+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const steps = () => stepList(WZ.editing);
const DRAFTKEY = "habitus-setup-draft";
function persistDraft(){ try { localStorage.setItem(DRAFTKEY, JSON.stringify({d:WZ.d, i:WZ.i, editing:WZ.editing, ownType:WZ.ownType, whoMode:WZ.whoMode, t:Date.now()})); } catch {} }
function clearDraft(){ try { localStorage.removeItem(DRAFTKEY); } catch {} }
function openWizard(stepId){
  if (S.readOnly) return;
  const c = S.config;
  WZ.editing = !!c;
  const people = {};
  P.forEach(p => people[p] = {name: c?.people?.[p]?.name || "", pron: c?.people?.[p]?.pron || "they", pet: PETS[c?.people?.[p]?.pet] ? c.people[p].pet : "cat", avatar: migrateAv(c?.people?.[p]?.avatar, p)});
  const t = today(), g = c?.goal || {};
  WZ.d = {
    people,
    habits: habits().map(h => ({...h})),
    goal: {text:g.text||"", why:g.why||"", start:g.start||t, end:g.end||addDays(t,29), habitIds:g.habitIds||[], count:g.count||0, ambition:g.ambition||80, len:g.len||(g.end?"custom":"1m")},
    season: c?.season || "auto",
    prefs: {...PREF_DEFAULTS, ...(c?.prefs||{})},
    places: {a:placeOf("a"), b:placeOf("b")},
    motion: S.motion
  };
  if (g.count && !g.ambition) { const poss = possibleCount(WZ.d.habits.filter(h => !g.habitIds?.length || g.habitIds.includes(h.id)), WZ.d.goal.start, WZ.d.goal.end); if (poss) WZ.d.goal.ambition = Math.max(50, Math.min(100, Math.round(g.count/poss*20)*5)); }
  let resumed = false;
  try { const saved = JSON.parse(localStorage.getItem(DRAFTKEY)||"null"); if (saved && !WZ.editing && !saved.editing && saved.d && Date.now()-saved.t < 14*864e5) { WZ.d = saved.d; WZ.ownType = saved.ownType; WZ.whoMode = saved.whoMode; resumed = saved.i; } } catch {}
  const list = steps(); WZ.i = resumed !== false ? Math.min(resumed, list.length-1) : Math.max(0, list.findIndex(s => s.id===(stepId||list[0].id))); WZ.dir = 1; WZ.anim = true;
  drawWizard(); if (!wiz.open) wiz.showModal();
}
const D = () => WZ.d;
const nm = p => (D().people[p].name||"").trim() || (p==="a" ? "Buddy one" : "Buddy two");
function pills(attr, opts, cur, extra=""){ return `<div class="pills">${opts.map(([v,l])=>`<button type="button" class="pill2" ${attr} data-v="${esc(v)}" aria-pressed="${String(cur)===String(v)}" ${extra}>${esc(l)}</button>`).join("")}</div>`; }
function drawWizard(){
  const list = steps(), st = list[WZ.i], pct = Math.round((WZ.i)/(list.length-1)*100);
  const body = st.r();
  const last = WZ.i === list.length-1;
  const nextLabel = st.id==="welcome" ? "Let’s go" : st.id==="done" ? "Open Habitus" : st.id==="checkin" ? "Finish" : "Next";
  wiz.innerHTML = `<div class="wtop"><div class="wprog"><i style="width:${pct}%"></i></div>
      ${WZ.editing ? `<div class="wnav">${list.map((s,i)=>`<button type="button" data-w="goto" data-i="${i}" ${i===WZ.i?'aria-current="step"':""}>${esc(s.id==="lookA"?`${nm("a")}’s look`:s.id==="lookB"?`${nm("b")}’s look`:s.label||"")}</button>`).join("")}</div>` : ""}</div>
    <div class="wbody"><div class="wstep wiz anim ${WZ.anim?(WZ.dir<0?"back":""):""}" style="${WZ.anim?"":"animation:none"}">${body}</div></div>
    <div class="wfoot"><button type="button" class="ghost" data-w="${WZ.editing?"save":"back"}" ${!WZ.editing && (WZ.i===0 || st.id==="done") ? "hidden" : ""}>${WZ.editing?"Close":"Back"}</button>
      <div class="right">${WZ.editing ? `<span class="savehint">Changes save as you move between sections.</span><button type="button" class="primary" data-w="save">Save and close</button>` : `${st.id.startsWith("look-") ? `<button type="button" class="ghost" data-w="skiplooks">Skip the looks</button>` : ""}<button type="button" class="primary" data-w="${last?"close":st.id==="checkin"?"finish":"next"}">${nextLabel}</button>`}</div></div>`;
  WZ.anim = false;
  wiz.classList.toggle("editing", WZ.editing);
  if (!WZ.editing && st.id!=="done") persistDraft();
  const f = wiz.querySelector("[data-autofocus]"); if (f && !f._done) { f._done = true; setTimeout(()=>f.focus(), 60); }
}
function wHero(frac, w){
  return `<div class="hero">${P.map(p => sceneSVG(p, today(), {empty:true, av:D().people[p].avatar, pet:D().people[p].pet, place:D().places[p], w:w||"sunny", frac, act:p==="a"?"language":"read", uid:"hero"+p, label:`${nm(p)} out in ${PLACES[D().places[p]].city}`})).join("")}</div>`;
}
function wWelcome(){
  let resume = ""; try { const sv = JSON.parse(localStorage.getItem(DRAFTKEY)||"null"); if (sv && sv.i > 0) resume = `<p class="small">Picking up where you left off. <button type="button" class="linkbtn" data-w="startover">Start over</button></p>`; } catch {}
  return resume + `${wHero(1,"breezy")}<h2>Welcome to Habitus</h2><p class="lede">An accountability buddy, a city to live your habits in, and a little daily nudge. Setup takes about two minutes, one or two taps at a time.</p>`;
}
function wNames(){
  return `<h2>Who are the two buddies?</h2><p class="lede">Just first names are perfect.</p><div class="namecards">${P.map((p,i)=>`<div class="namecard" style="--pc:var(--${p})">${avatarSVG(D().people[p].avatar,p,"av")}
    <input class="bigin" data-wf="name" data-p="${p}" maxlength="24" placeholder="${i?"Your buddy’s name":"Your name"}" value="${esc(D().people[p].name)}" ${i===0?"data-autofocus":""} aria-label="${i?"Second":"First"} buddy’s name">
    ${pills(`data-w="pron" data-p="${p}"`, Object.entries(PRONOUNS).map(([k,v])=>[k,v.label]), D().people[p].pron, `style="--pc:var(--${p})"`)}</div>`).join("")}</div>`;
}
const LOOKCATS = {face:"Face", hair:"Hair", outfit:"Outfit", extras:"Extras"};
const CATGROUPS = {face:[["body","Build"],["skin","Skin tone"],["face","Face shape"],["eyes","Eyes"],["brows","Brows"],["details","Cheeks"],["facial","Facial hair"]], hair:[["hair","Hairstyle"],["hc","Hair colour"]], outfit:[["top","Top"],["topc","Top colour"],["bottom","Bottoms"],["botc","Bottoms colour"],["shoes","Shoes"]], extras:[["head","On your head"],["glasses","Glasses"],["ears","Earrings"],["neck","Around the neck"]]};
const SWATCH_KEYS = new Set(["skin","hc","topc","botc"]);
function optPreview(p, key, v){
  const av = {...D().people[p].avatar, [key]:v};
  if (key==="bottom" || key==="shoes") return `<svg viewBox="-34 -40 68 90" aria-hidden="true">${figureSVG(av,"stand")}</svg>`;
  return avatarSVG(av, p, "").replace('viewBox="0 0 64 64"', key==="top"||key==="topc"||key==="neck" ? 'viewBox="6 14 52 52"' : 'viewBox="11 4 42 42"');
}
function wLook(p){
  const av = D().people[p].avatar, cat = WZ.cat[p];
  let groups = "";
  for (const [key,label] of CATGROUPS[cat]) {
    groups += `<div class="optgroup"><h4>${esc(label)}</h4>`;
    if (SWATCH_KEYS.has(key)) groups += `<div class="swatches">${AV_OPTS[key].map(([v,l])=>`<button type="button" class="sw" style="background:${v};--pc:var(--${p})" data-w="av" data-p="${p}" data-k="${key}" data-v="${v}" aria-pressed="${av[key]===v}" aria-label="${esc(l)}" title="${esc(l)}"></button>`).join("")}</div>`;
    else groups += `<div class="tiles">${AV_OPTS[key].map(([v,l])=>`<button type="button" class="tile" style="--pc:var(--${p})" data-w="av" data-p="${p}" data-k="${key}" data-v="${v}" aria-pressed="${av[key]===v}">${optPreview(p,key,v)}<span>${esc(l)}</span></button>`).join("")}</div>`;
    groups += `</div>`;
  }
  return `<h2>How does ${esc(nm(p))} look?</h2><p class="lede">Tap anything to try it on. This is how ${esc(nm(p))} will look out in the city.</p>
    <div class="builder"><div class="preview"><svg class="figbig anim" viewBox="-70 -140 140 192" role="img" aria-label="${esc(nm(p))}, full figure"><ellipse cx="0" cy="44" rx="46" ry="8" fill="var(--${p}-soft)" opacity=".7"/>${figureSVG(av,"stand",false,"wave")}</svg>${sceneSVG(p, today(), {empty:true, av, pet:D().people[p].pet, place:D().places[p], w:"sunny", frac:1, uid:"look"+p, act:"language", label:`Preview of ${nm(p)} out in the city`})}<button type="button" class="ghost dice" data-w="surprise" data-p="${p}">Surprise me</button></div>
    <div><div class="cattabs" role="tablist">${Object.entries(LOOKCATS).map(([k,l])=>`<button type="button" role="tab" style="--pc:var(--${p})" data-w="cat" data-p="${p}" data-v="${k}" aria-selected="${cat===k}">${l}</button>`).join("")}</div>${groups}</div></div>`;
}
const typeTag = h => h.type==="check" ? "Yes or no" : h.type==="duration" ? `How long, ${targetText({...h,target:Number(h.target)})}` : `What time, ${targetText({...h,target:Number(h.target)})}`;
function wGoals(){
  const chosen = new Set(D().habits.map(h => h.name.toLowerCase()));
  const customs = D().habits.filter(h => !SUGGESTIONS.some(s => s.name.toLowerCase()===h.name.toLowerCase()));
  const card = (h, idx, custom) => `<button type="button" class="scard" data-w="${custom?"rmgoal":"pick"}" data-i="${idx}" aria-pressed="${custom || chosen.has(h.name.toLowerCase())}"><svg viewBox="-24 -24 48 48" aria-hidden="true">${itemSVG(CATS[h.cat||guessCat(h.name)].icon)}</svg><strong>${esc(h.name)}</strong><small>${esc(CATS[h.cat||guessCat(h.name)].label)}, ${esc(typeTag(h).toLowerCase())}</small></button>`;
  return `<h2>What will you hold each other to?</h2><p class="lede">Tap a few to start. You can change everything later.</p>
    <div class="sugg">${SUGGESTIONS.map((h,i)=>card(h,i,false)).join("")}${customs.map(h=>card(h, D().habits.indexOf(h), true)).join("")}</div>
    <div class="addown"><input id="ownName" maxlength="60" placeholder="Or add your own, e.g. Practise piano" aria-label="Your own goal">
      ${pills('data-w="owntype"', [["check","Yes or no"],["duration","How long"],["clock","What time"]], WZ.ownType||"check")}<button type="button" class="primary" data-w="addown">Add</button></div>
    <p class="small" style="margin-top:10px">${D().habits.length} chosen.</p>`;
}
function wTune(){
  const hs = D().habits;
  if (!hs.length) return `<h2>Fine-tune</h2><p class="lede">Pick a goal or two first, then come back here.</p>`;
  return `<h2>Fine-tune your goals</h2><p class="lede">Who does each goal, how shared goals count, targets, and what each one shows in the scene.</p><div class="tune">${hs.map((h,i)=>{
    let tgt = "";
    if (h.type==="duration") tgt = `<div class="rowx">${pills(`data-w="dir" data-i="${i}"`, [["max","At most"],["min","At least"]], h.dir)}<span class="stepper"><button type="button" data-w="step" data-i="${i}" data-v="-15" aria-label="Less">−</button><span>${esc(fmtDur(Number(h.target)||0))}</span><button type="button" data-w="step" data-i="${i}" data-v="15" aria-label="More">+</button></span></div>`;
    if (h.type==="clock") tgt = `<div class="rowx">${pills(`data-w="dir" data-i="${i}"`, [["max","By"],["min","After"]], h.dir)}<input type="time" data-wf="clock" data-i="${i}" value="${clockStr(Number(h.target)||0)}" aria-label="${esc(h.name)} time"></div>`;
    const shareOpts = [["each","Separately"],["both","Only if we both do"]].concat(h.type==="duration" ? [["combined","Combined total"]] : []);
    return `<div class="tunecard"><button type="button" class="ico" data-w="icon" data-i="${i}" title="Tap to change the category" aria-label="Change category for ${esc(h.name)}, now ${esc(CATS[h.cat||"study"].label)}"><svg viewBox="-24 -24 48 48">${itemSVG(CATS[h.cat||guessCat(h.name)].icon)}</svg></button><div style="display:grid;gap:8px">
      <input class="nm" data-wf="hname" data-i="${i}" value="${esc(h.name)}" maxlength="60" aria-label="Goal name">
      <div class="rowx"><span>Who:</span>${pills(`data-w="who" data-i="${i}"`, [["both","Both of us"],["a",nm("a")],["b",nm("b")]], h.who)}</div>
      ${STYLE_OPTS[h.cat||guessCat(h.name)] ? `<div class="rowx"><span>Show as:</span><select data-wf="style" data-i="${i}" aria-label="How ${esc(h.name)} is shown">${STYLE_OPTS[h.cat||guessCat(h.name)].map(([v,l])=>`<option value="${v}" ${(h.style||"")===v?"selected":""}>${l}</option>`).join("")}</select></div>` : ""}
      ${h.who==="both" ? `<div class="rowx"><span>Counts:</span>${pills(`data-w="share" data-i="${i}"`, shareOpts, h.share||"each")}</div>` : ""}${tgt}</div></div>`;
  }).join("")}</div>`;
}
const STYLE_OPTS = {
  move:[["","Automatic (by name or city sport)"],["sport_ballet","Ballet"],["sport_badminton","Badminton"],["sport_cricket","Cricket"],["sport_swimming","Swimming"],["sport_tennis","Tennis"],["sport_basketball","Basketball"],["sport_football","Football"],["sport_baseball","Baseball"],["run","Running"],["cycle","Cycling"],["yoga","Yoga"],["dance","Dance"],["walk","Walking"],["jacks","Workout"]],
  connect:[["","Automatic (by name)"],["social_picnic","Picnic with friends"],["social_coffee","Coffee with a friend"],["social_cinema","Cinema"],["social_date","Date night"],["connect","Phone call"]]
};
const LENS = [["2w","2 weeks",13],["1m","1 month",29],["2m","2 months",59],["3m","3 months",89],["custom","Pick a date",null]];
function goalCount(){ const g = D().goal, hs = D().habits.filter(h => !g.habitIds?.length || g.habitIds.includes(h.id)); return Math.max(1, Math.round(possibleCount(hs, g.start, g.end) * g.ambition/100)); }
function wBig(){
  const g = D().goal;
  const ideas = ["A calmer, more offline season","Healthier routines together","Finish what we start","Sleep like grown-ups","Read more than we scroll"];
  return `<h2>One big goal to grow toward</h2><p class="lede">Every daily goal either of you meets helps a little tree grow toward it.</p>
    <input class="bigin" data-wf="gtext" maxlength="90" value="${esc(g.text)}" placeholder="What are you working toward?" data-autofocus aria-label="Big goal">
    <div class="pills" style="margin-top:8px">${ideas.map(t=>`<button type="button" class="pill2" data-w="idea" data-v="${esc(t)}" aria-pressed="${g.text===t}">${esc(t)}</button>`).join("")}</div>
    <div class="optgroup" style="margin-top:18px"><h4>For how long?</h4>${pills('data-w="len"', LENS.map(([v,l])=>[v,l]), g.len)}${g.len==="custom"?`<div class="rowx" style="margin-top:8px"><span>Until</span><input type="date" data-wf="gend" value="${g.end}" min="${g.start}"></div>`:""}</div>
    <div class="rangewrap"><h4 style="margin:0;font-size:.85rem;color:var(--ink-soft)">How ambitious?</h4><input type="range" min="50" max="100" step="5" data-wf="amb" value="${g.ambition}" aria-label="Ambition"><span class="small" id="ambtxt">${g.ambition}% of everything possible, which is <b>${goalCount()}</b> daily goals met together by ${esc(shortDate(g.end))}.</span></div>
    <div class="field" style="margin-top:16px"><label for="wwhy">Why it matters (optional)</label><input id="wwhy" data-wf="gwhy" maxlength="140" value="${esc(g.why)}" placeholder="e.g. More evenings in the park, fewer evenings scrolling"></div>`;
}
function wPlaces(){
  return `<h2>Where do you two live your days?</h2><p class="lede">Each of you picks a city. The weather there will follow how you’re doing.</p>
    <div class="citygrid">${P.map(p => { const sp = D().places[p], c = cityOf(sp); return `<div class="citycol" style="--pc:var(--${p})"><h3>${esc(nm(p))}</h3>
      ${pills(`data-w="city" data-p="${p}"`, Object.entries(CITIES).map(([k,v])=>[k,v.name]), c, `style="--pc:var(--${p})"`)}
      ${CITIES[c].spots.length>1 ? `<div style="margin-top:8px">${pills(`data-w="spot" data-p="${p}"`, CITIES[c].spots.map(s=>[s,PLACES[s].name]), sp, `style="--pc:var(--${p})"`)}</div>` : ""}
      <div style="margin-top:10px">${sceneSVG(p, today(), {empty:true, av:D().people[p].avatar, pet:D().people[p].pet, place:sp, w:"breezy", frac:.5, act:"language", uid:"pl"+p, season:D().season==="auto"?seasonFor(today()):D().season, label:`${PLACES[sp].name}, ${PLACES[sp].city}`})}</div></div>`; }).join("")}</div>
    <div class="optgroup" style="margin-top:18px"><h4>Season</h4>${pills('data-w="season"', [["auto","Follow the calendar"],["spring","Spring"],["summer","Summer"],["fall","Fall"],["winter","Winter"]], D().season)}</div>`;
}
function wPrefs(){
  const pr = D().prefs;
  const row = (title, sub, ctrl) => `<div class="prefrow"><div><b>${title}</b><small>${sub}</small></div>${ctrl}</div>`;
  return `<h2>A few preferences</h2><p class="lede">All optional. The defaults work well.</p><div class="prefs">
    ${row("Check in by", "After this time, a missing check-in shows up for your buddy.", `<input type="time" data-wf="checkinBy" value="${clockStr(pr.checkinBy)}" aria-label="Check in by">`)}
    ${row("Ask for a reason when a goal is missed", "Your buddy sees what got in the way.", pills('data-w="pref" data-k="askWhy"', [["true","On"],["false","Off"]], String(pr.askWhy)))}
    ${row("Weather", "Should the sky follow how you’re doing?", pills('data-w="pref" data-k="weatherMode"', [["progress","Follow progress"],["fair","Always fair"]], pr.weatherMode))}
    ${row("Week starts on", "For the calendar.", pills('data-w="pref" data-k="weekStart"', [["mon","Monday"],["sun","Sunday"]], pr.weekStart))}
    ${row("Clock", "How times are shown.", pills('data-w="pref" data-k="clock24"', [["false","12-hour"],["true","24-hour"]], String(pr.clock24)))}
    ${row("Motion on this device", "Calm or Still if the animation is too much.", pills('data-w="motion"', [["lively","Lively"],["calm","Calm"],["still","Still"]], D().motion))}
  </div>`;
}
function wDone(){
  const cols = ["#E07A5F","#F2C14E","#9BC27A","#7FAED0","#9A86C2","#D88C98"];
  return `<div class="confetti">${Array.from({length:40},(_,i)=>`<i style="left:${(i*2.5)%100}%;background:${cols[i%6]};animation-delay:${(i%10)*.08}s"></i>`).join("")}</div>${wHero(1,"sunny")}<h2>You’re all set</h2><p class="lede">${esc(nm("a"))} and ${esc(nm("b"))}: check in each day, cheer each other on, and watch yourselves out living your goals.</p>`;
}

function wPets(){
  return `<h2>Pick your sidekicks</h2><p class="lede">They tag along everywhere you go, and you can dress them up from the shop.</p><div class="wq">${P.map(p=>`<div style="--pc:var(--${p})"><h3 style="color:var(--${p})">${esc(nm(p))}’s sidekick</h3><div class="tiles">${Object.entries(PETS).map(([k,l])=>`<button type="button" class="tile" style="--pc:var(--${p})" data-w="pet" data-p="${p}" data-v="${k}" aria-pressed="${D().people[p].pet===k}"><svg viewBox="-42 -34 84 56" aria-hidden="true" class="anim">${petSVG(k,false)}</svg><span>${esc(l)}</span></button>`).join("")}</div></div>`).join("")}</div>`;
}
function wNamesOnly(){
  return `<h2>What are your names?</h2><p class="lede">Yours first, then your buddy’s.</p><div class="wq">${P.map((p,i)=>`<div style="display:flex;gap:12px;align-items:center;--pc:var(--${p})">${avatarSVG(D().people[p].avatar,p,"av")}<input class="bigin" data-wf="name" data-p="${p}" maxlength="24" placeholder="${i?"Your buddy’s name":"Your name"}" value="${esc(D().people[p].name)}" ${i===0?"data-autofocus":""} aria-label="${i?"Second":"First"} buddy’s name" style="max-width:420px"></div>`).join("")}</div>`;
}
function wProns(){
  return `<h2>Which pronouns?</h2><p class="lede">So Habitus talks about you the right way.</p><div class="wq">${P.map(p=>`<div style="--pc:var(--${p})"><h3 style="color:var(--${p})">${esc(nm(p))}</h3>${pills(`data-w="pron" data-p="${p}"`, Object.entries(PRONOUNS).map(([k,v])=>[k,v.label]), D().people[p].pron, `style="--pc:var(--${p})"`)}</div>`).join("")}</div>`;
}
function optGroup(p, key, label){
  const av = D().people[p].avatar;
  if (SWATCH_KEYS.has(key)) return `<div class="optgroup"><h4>${esc(label)}</h4><div class="swatches">${AV_OPTS[key].map(([v,l])=>`<button type="button" class="sw" style="background:${v};--pc:var(--${p})" data-w="av" data-p="${p}" data-k="${key}" data-v="${v}" aria-pressed="${av[key]===v}" aria-label="${esc(l)}" title="${esc(l)}"></button>`).join("")}</div></div>`;
  return `<div class="optgroup"><h4>${esc(label)}</h4><div class="tiles">${AV_OPTS[key].map(([v,l])=>`<button type="button" class="tile" style="--pc:var(--${p})" data-w="av" data-p="${p}" data-k="${key}" data-v="${v}" aria-pressed="${av[key]===v}">${optPreview(p,key,v)}<span>${esc(l)}</span></button>`).join("")}</div></div>`;
}
const KEYLABEL = {body:"Build", eyes:"Eyes", skin:"Skin tone", face:"Face shape", hair:"Hairstyle", hc:"Hair colour", top:"Top", topc:"Colour", bottom:"Bottoms", shoes:"Shoes", head:"Hat", glasses:"Glasses"};
function wLookMini(p, k){
  const m = LOOK_MINI[k], av = D().people[p].avatar;
  return `<h2>${esc(m.q(nm(p)))}</h2><p class="lede">Tap to try things on. You can buy more outfits in the shop later.</p>
    <div class="minilook" style="--pc:var(--${p})"><div class="preview"><svg class="figbig anim" viewBox="-70 -140 140 192" role="img" aria-label="${esc(nm(p))}, full figure"><ellipse cx="0" cy="44" rx="46" ry="8" fill="var(--${p}-soft)" opacity=".7"/>${figureSVG(av,"stand",false,"wave")}</svg><button type="button" class="ghost dice" data-w="surprise" data-p="${p}">Surprise me</button></div>
    <div>${m.keys.map(key => optGroup(p, key, KEYLABEL[key])).join("")}</div></div>`;
}
function wWho(){
  const hs = D().habits, mode = WZ.whoMode || (hs.some(h => h.who!=="both") ? "some" : "all");
  return `<h2>Do you both want to do all of these?</h2><p class="lede">Doing them together is the whole point of an accountability buddy, but it’s up to you.</p>
    ${pills('data-w="whomode"', [["all","Yes, all of them together"],["some","Some are just for one of us"]], mode)}
    ${mode==="some" ? `<div class="tune" style="margin-top:16px">${hs.map((h,i)=>`<div class="tunecard"><span class="ico"><svg viewBox="-24 -24 48 48">${itemSVG(h.item)}</svg></span><div style="display:grid;gap:6px"><strong>${esc(h.name)}</strong>${pills(`data-w="who" data-i="${i}"`, [["both","Both of us"],["a",nm("a")],["b",nm("b")]], h.who)}</div></div>`).join("")}</div>` : ""}`;
}
function wBigText(){
  const g = D().goal, ideas = ["A calmer, more offline season","Healthier routines together","Finish what we start","Sleep like grown-ups","Read more than we scroll"];
  return `<h2>What’s your big goal?</h2><p class="lede">One thing you’re growing toward together. Tap an idea or write your own.</p>
    <input class="bigin" data-wf="gtext" maxlength="90" value="${esc(g.text)}" placeholder="What are you working toward?" data-autofocus aria-label="Big goal">
    <div class="pills" style="margin-top:10px">${ideas.map(t=>`<button type="button" class="pill2" data-w="idea" data-v="${esc(t)}" aria-pressed="${g.text===t}">${esc(t)}</button>`).join("")}</div>`;
}
function wBigLen(){
  const g = D().goal;
  if (!g.text.trim()) return `<h2>No big goal for now</h2><p class="lede">That’s fine. You can add one any time from Settings.</p>`;
  return `<h2>For how long, and how ambitious?</h2><p class="lede">“${esc(g.text)}”</p>
    <div class="optgroup"><h4>For how long?</h4>${pills('data-w="len"', LENS.map(([v,l])=>[v,l]), g.len)}${g.len==="custom"?`<div class="rowx" style="margin-top:8px"><span>Until</span><input type="date" data-wf="gend" value="${g.end}" min="${g.start}"></div>`:""}</div>
    <div class="rangewrap"><h4 style="margin:0;font-size:.85rem;color:var(--ink-soft)">How ambitious?</h4><input type="range" min="50" max="100" step="5" data-wf="amb" value="${g.ambition}" aria-label="Ambition"><span class="small" id="ambtxt">${g.ambition}% of everything possible, which is <b>${goalCount()}</b> daily goals met together by ${esc(shortDate(g.end))}.</span></div>`;
}
function wPlaceOne(p){
  const sp = D().places[p], c = cityOf(sp);
  return `<h2>Which city is ${esc(nm(p))} in?</h2><p class="lede">Pick a city${CITIES[c].spots.length>1?", then a spot":""}.</p>
    <div style="--pc:var(--${p})">${pills(`data-w="city" data-p="${p}"`, Object.entries(CITIES).map(([k,v])=>[k,v.name]), c, `style="--pc:var(--${p})"`)}
    ${CITIES[c].spots.length>1 ? `<div style="margin-top:8px">${pills(`data-w="spot" data-p="${p}"`, CITIES[c].spots.map(s=>[s,PLACES[s].name]), sp, `style="--pc:var(--${p})"`)}</div>` : ""}
    <div style="margin-top:12px;max-width:520px">${sceneSVG(p, today(), {empty:true, av:D().people[p].avatar, pet:D().people[p].pet, place:sp, w:"breezy", frac:.5, act:"language", uid:"po"+p, season:D().season==="auto"?seasonFor(today()):D().season, label:`${PLACES[sp].name}, ${PLACES[sp].city}`})}</div></div>`;
}
function wCheckin(){
  const pr = D().prefs;
  return `<h2>Two last things</h2><div class="wq">
    <div><h3>When should you both have checked in by each day?</h3><input class="bigin" style="max-width:220px" type="time" data-wf="checkinBy" value="${clockStr(pr.checkinBy)}" aria-label="Check in by"></div>
    <div><h3>Which season should the cities show?</h3>${pills('data-w="season"', [["auto","Follow the calendar"],["spring","Spring"],["summer","Summer"],["fall","Fall"],["winter","Winter"]], D().season)}</div></div>`;
}
function buildConfig(){
  const d = D(), g = d.goal;
  const habitsOut = d.habits.filter(h => String(h.name).trim()).map((h,i) => {
    const cat = CATS[h.cat] ? h.cat : guessCat(h.name);
    const o = {id:h.id, name:String(h.name).trim(), type:h.type, cat, item:CATS[cat].icon, plant:h.plant||PLANT_KINDS[i%6], who:h.who||"both"};
    if (h.style) o.style = h.style;
    if (o.who==="both") o.share = h.share==="both" ? "both" : (h.share==="combined" && (h.type==="duration"||h.type==="number")) ? "combined" : "each";
    if (h.type!=="check") { o.dir = h.dir==="min"?"min":"max"; o.target = Number(h.target)||0; if (h.unit) o.unit = h.unit; if (h.baseline && Object.keys(h.baseline).length) o.baseline = h.baseline; }
    return o;
  });
  const keep = new Set(habitsOut.map(h=>h.id));
  return {
    people: Object.fromEntries(P.map(p => [p, {name:(d.people[p].name||"").trim(), pron:d.people[p].pron, pet:d.people[p].pet||"cat", avatar:d.people[p].avatar}])),
    season: d.season, prefs: d.prefs,
    goal: g.text.trim() ? {text:g.text.trim(), why:(g.why||"").trim(), start:g.start, end:g.end, len:g.len, ambition:g.ambition, count:goalCount(), habitIds:(g.habitIds||[]).filter(id=>keep.has(id))} : null,
    habits: habitsOut
  };
}
async function saveWizard(){
  const cfg = buildConfig(); if (!cfg.goal) delete cfg.goal;
  clearDraft();
  if (WZ.d.motion !== S.motion) setMotion(WZ.d.motion);
  P.forEach(p => { if (WZ.d.places[p] !== placeOf(p)) { S.picnic[p] = {...(S.picnic[p]||{}), place:WZ.d.places[p]}; queuePicnic(p); } });
  S.config = cfg; widenForGoal(); render();
  markSaving();
  try { await store.setConfig(cfg); markSaved(); } catch (e) { markSaved(false); handleWriteError(e); }
}
function go(n){ if (WZ.editing) saveWizard(); const list = steps(); const j = Math.max(0, Math.min(list.length-1, n)); WZ.dir = j >= WZ.i ? 1 : -1; WZ.i = j; WZ.anim = true; drawWizard(); wiz.querySelector(".wbody").scrollTop = 0; }
wiz.addEventListener("click", e => {
  const b = e.target.closest("[data-w]"); if (!b) return;
  const a = b.dataset.w, d = D(), i = +b.dataset.i, p = b.dataset.p, v = b.dataset.v;
  switch(a){
    case "next": go(WZ.i+1); return;
    case "back": go(WZ.i-1); return;
    case "goto": go(i); return;
    case "cancel": wiz.close(); return;
    case "save": saveWizard(); wiz.close(); return;
    case "startover": clearDraft(); WZ.d = null; wiz.close(); openWizard("welcome"); return;
    case "finish": saveWizard(); go(WZ.i+1); return;
    case "close": wiz.close(); return;
    case "pron": d.people[p].pron = v; break;
    case "pet": d.people[p].pet = v; break;
    case "skiplooks": go(steps().findIndex(s => s.id==="goals")); return;
    case "whomode": WZ.whoMode = v; if (v==="all") d.habits.forEach(h => h.who = "both"); break;
    case "cat": WZ.cat[p] = v; break;
    case "av": d.people[p].avatar = {...d.people[p].avatar, [b.dataset.k]:v}; break;
    case "surprise": d.people[p].avatar = randomAvatar(); break;
    case "pick": { const sug = SUGGESTIONS[i], ix = d.habits.findIndex(h => h.name.toLowerCase()===sug.name.toLowerCase()); if (ix>=0) d.habits.splice(ix,1); else d.habits.push({...sug, item:CATS[sug.cat].icon, id:newId(), who:"both", share:"each", plant:PLANT_KINDS[d.habits.length%6]}); break; }
    case "rmgoal": d.habits.splice(i,1); break;
    case "owntype": WZ.ownType = v; break;
    case "addown": { const inp = document.getElementById("ownName"), n = (inp?.value||"").trim(); if (!n) { inp?.focus(); return; } const tp = WZ.ownType||"check"; d.habits.push({id:newId(), name:n, type:tp, dir:tp==="duration"?"min":"max", target:tp==="duration"?30:tp==="clock"?1380:0, cat:guessCat(n), item:CATS[guessCat(n)].icon, who:"both", share:"each", plant:PLANT_KINDS[d.habits.length%6]}); break; }
    case "who": d.habits[i].who = v; break;
    case "share": d.habits[i].share = v; break;
    case "dir": d.habits[i].dir = v; break;
    case "step": d.habits[i].target = Math.max(5, Math.min(1440, (Number(d.habits[i].target)||0) + Number(v))); break;
    case "icon": { const keys = Object.keys(CATS), k = keys.indexOf(d.habits[i].cat); d.habits[i].cat = keys[(k+1)%keys.length]; d.habits[i].item = CATS[d.habits[i].cat].icon; break; }
    case "idea": d.goal.text = v; break;
    case "len": { d.goal.len = v; const L = LENS.find(x=>x[0]===v); d.goal.start = d.goal.start || today(); if (L && L[2]!=null) d.goal.end = addDays(d.goal.start < today() ? d.goal.start : today(), L[2]); break; }
    case "city": d.places[p] = CITIES[v].spots[0]; break;
    case "spot": d.places[p] = v; break;
    case "season": d.season = v; break;
    case "pref": d.prefs[b.dataset.k] = v==="true" ? true : v==="false" ? false : v; break;
    case "motion": d.motion = v; break;
    default: return;
  }
  drawWizard();
});
wiz.addEventListener("input", e => {
  const t = e.target, f = t.dataset.wf, d = D(); if (!f) return;
  clearTimeout(WZ.dt); WZ.dt = setTimeout(() => { if (!WZ.editing) persistDraft(); }, 400);
  if (f==="name") { d.people[t.dataset.p].name = t.value; return; }
  if (f==="hname") { d.habits[+t.dataset.i].name = t.value; return; }
  if (f==="style") { d.habits[+t.dataset.i].style = t.value; return; }
  if (f==="clock") { const m = parseClock(t.value); if (m!=null) d.habits[+t.dataset.i].target = m; return; }
  if (f==="gtext") { d.goal.text = t.value; wiz.querySelectorAll('[data-w="idea"]').forEach(b => b.setAttribute("aria-pressed", b.dataset.v===t.value)); return; }
  if (f==="gwhy") { d.goal.why = t.value; return; }
  if (f==="gend") { if (t.value) d.goal.end = t.value; const el = document.getElementById("ambtxt"); if (el) el.innerHTML = `${d.goal.ambition}% of everything possible, which is <b>${goalCount()}</b> daily goals met together by ${esc(shortDate(d.goal.end))}.`; return; }
  if (f==="amb") { d.goal.ambition = +t.value; const el = document.getElementById("ambtxt"); if (el) el.innerHTML = `${d.goal.ambition}% of everything possible, which is <b>${goalCount()}</b> daily goals met together by ${esc(shortDate(d.goal.end))}.`; return; }
  if (f==="checkinBy") { const m = parseClock(t.value); if (m!=null) d.prefs.checkinBy = m; return; }
});
wiz.addEventListener("keydown", e => {
  if (e.key==="Enter" && e.target.id==="ownName") { e.preventDefault(); wiz.querySelector('[data-w="addown"]').click(); }
  else if (e.key==="Enter" && e.target.matches("input.bigin")) { e.preventDefault(); const n = wiz.querySelector('[data-w="next"],[data-w="finish"]'); n?.click(); }
});
wiz.addEventListener("cancel", e => { if (!WZ.editing && !S.config) { e.preventDefault(); return; } if (WZ.editing) saveWizard(); });

/* ---------- events ---------- */
const tabs = ["day","cal","garden"];
function showTab(t){ S.tab = t; saveUI(); tabs.forEach(x => { const b = document.getElementById("t-"+x); b.setAttribute("aria-selected", x===t); b.tabIndex = x===t?0:-1; document.getElementById("p-"+x).hidden = x!==t; }); }
tabs.forEach((t,i) => {
  const b = document.getElementById("t-"+t);
  b.addEventListener("click", () => showTab(t));
  b.addEventListener("keydown", e => { if (e.key==="ArrowRight"||e.key==="ArrowLeft") { const n = tabs[(i+(e.key==="ArrowRight"?1:2))%3]; showTab(n); document.getElementById("t-"+n).focus(); } });
});
document.getElementById("openSettings").addEventListener("click", () => openWizard(S.config ? "names" : "welcome"));
function shiftMonth(n){ const [y,m] = S.month.split("-").map(Number), d = new Date(y,m-1+n,1); S.month = d.getFullYear()+"-"+pad(d.getMonth()+1); widen(S.month+"-01"); }
document.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if (!b) return;
  const a = b.dataset.act;
  if (a==="toggle") { S.focus = {...(S.focus||{}), [b.dataset.p]:b.dataset.h}; toggle(b.dataset.d, b.dataset.p, b.dataset.h); }
  else if (a==="wiz") openWizard(b.dataset.step);
  else if (a==="shop") { shopP = b.dataset.p; drawShop(); shop.showModal(); }
  else if (a==="me") setMe(b.dataset.p);
  else if (a==="focus") { S.focus = {...(S.focus||{}), [b.dataset.p]:b.dataset.h}; saveUI(); render(); }
  else if (a==="note") { S.noteOpen = {...(S.noteOpen||{}), [b.dataset.p]:true}; saveUI(); render(); document.getElementById("note-"+b.dataset.p)?.focus(); }
  else if (a==="moremsgs") { S.showAllMsgs = true; render(); }
  else if (a==="quick") { const k = QUICK[b.dataset.kind]; if (k && S.me) sendMessage(b.dataset.kind, k.text(name(other(S.me)))); }
  else if (a==="send") { const inp = document.getElementById("msgText"); const v = inp?.value || ""; if (inp) inp.value = ""; sendMessage("note", v); }
  else if (a==="prevday") { S.day = addDays(S.day,-1); widen(S.day); S.month = S.day.slice(0,7); render(); }
  else if (a==="nextday") { if (S.day < today()) S.day = addDays(S.day,1); S.month = S.day.slice(0,7); render(); }
  else if (a==="gotoday") { S.day = today(); S.month = S.day.slice(0,7); render(); }
  else if (a==="prevmonth") { shiftMonth(-1); render(); }
  else if (a==="nextmonth") { shiftMonth(1); render(); }
  else if (a==="openday") { S.day = b.dataset.d; render(); showTab("day"); window.scrollTo({top:document.querySelector("nav.tabs").offsetTop-8, behavior:"smooth"}); }
});
document.addEventListener("input", e => { if (e.target.id==="msgText") { try { localStorage.setItem("habitus-msg-draft", e.target.value); } catch {} } });
document.addEventListener("keydown", e => { if (e.key==="Enter" && e.target.id==="msgText") { e.preventDefault(); const v = e.target.value; e.target.value = ""; sendMessage("note", v); } });
document.addEventListener("input", e => {
  const t = e.target;
  if (t.closest("#wizard")) return;
  if (t.matches("textarea[data-note]")) editText(t.dataset.d, t.dataset.p, "note", null, t.value);
  else if (t.matches("input[data-why]")) editText(t.dataset.d, t.dataset.p, "why", t.dataset.h, t.value);
  else if (t.matches("input[data-num]")) { const n = parseFloat(String(t.value).replace(",",".")); setRaw(t.dataset.d, t.dataset.p, t.dataset.h, t.value===""||isNaN(n) ? null : Math.max(0, Math.min(n,1e5))); }
  else if (t.matches("input[data-clock]")) setRaw(t.dataset.d, t.dataset.p, t.dataset.h, parseClock(t.value));
  else if (t.matches("input[data-dur]")) {
    const wrap = t.closest(".durin"), hh = wrap.querySelector('[data-dur="h"]').value, mm = wrap.querySelector('[data-dur="m"]').value;
    setRaw(t.dataset.d, t.dataset.p, t.dataset.h, hh==="" && mm==="" ? null : Math.min(1440, (Number(hh)||0)*60 + (Number(mm)||0)));
  }
});
loadUI(); applyMotion(); showTab(S.tab||"day"); render(); boot();
})();
