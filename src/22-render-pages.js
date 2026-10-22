/* ---------- render ---------- */
function box(id){ const e = document.getElementById(id); return { set innerHTML(h){ if (e._h !== h) { e._h = h; e.innerHTML = h; } } }; }
function setStatus(cls,text){ const el = document.getElementById("status"); el.className = "status "+cls; el.querySelector("span").textContent = text; }
function render(){
  const act = document.activeElement;
  const fid = act?.id, fv = act?.value, ss = act?.selectionStart, se = act?.selectionEnd;
  box("sub").innerHTML = S.config
    ? `<span class="pa">${esc(name("a"))}</span> and <span class="pb">${esc(name("b"))}</span>, keeping each other honest.`
    : "Two accountability buddies, one garden.";
  if (S.readOnly) setStatus("ro","View only");
  else if (S.mode==="db") setStatus("","Shared between you both");
  else if (S.mode==="local") setStatus("local","Saved on this device only");
  document.getElementById("openSettings").hidden = S.readOnly;
  renderBanner(); renderGoal(); renderDay(); renderCal(); renderGarden();
  if (shop.open) drawShop();
  updateClocks();
  S.pop.clear();
  if (fid) { const el = document.getElementById(fid); if (el && el.closest("#p-day,#p-cal,#p-garden,#goal")) { if (el!==document.activeElement) el.focus(); if (typeof fv==="string" && "value" in el && el.type!=="time") el.value = fv; try { el.setSelectionRange(ss,se); } catch {} } }
}
function updateClocks(){
  document.querySelectorAll(".cityclock").forEach(el => { const c = el.dataset.city; const t = cityClock(c); el.textContent = el.dataset.mode==="full" ? `${t}, ${PHASE_LABEL[phaseFor(c)]}` : t; });
}
setInterval(() => { const key = Object.keys(CITIES).map(phaseFor).join(); if (key !== S.phaseKey) { S.phaseKey = key; render(); } else updateClocks(); }, 30000);
function renderBanner(){
  const b = bannerSVG();
  box("banner").innerHTML = `${b.svg}<div class="cap"><span>Right now in ten cities</span><span>Your shared sky today: ${esc(WX[b.w].label.toLowerCase())}</span></div>`;
}
function renderGoal(){
  const el = box("goal");
  if (!S.config) { el.innerHTML = ""; return; }
  const G = goalStats();
  if (!G) { el.innerHTML = S.readOnly ? "" : `<div class="goal compact">${treeSVG(.1,0)}<div><h2>Add a big goal you’re both growing toward</h2><p class="line"><button class="linkbtn" data-act="wiz" data-step="big">Set it up</button></p></div></div>`; return; }
  const f = G.got/G.count, blooms = [.25,.5,.75,1].filter(m => f >= m).length, ahead = G.got - G.pace;
  const pace = !G.started ? `Starts ${shortDate(G.start)}` : G.ended ? (G.got>=G.count ? "You made it" : "Ended") : G.got>=G.count ? "Reached early" : ahead>=0 ? `${ahead} ahead of pace` : `${-ahead} behind pace`;
  const pa = Math.min(100, G.ma/G.count*100), pb = Math.min(100-pa, G.mb/G.count*100);
  el.innerHTML = `<div class="goal compact">${treeSVG(Math.min(1,f), blooms)}<div>
    <h2>${esc(G.g.text)}</h2>${G.g.why?`<p class="why">${esc(G.g.why)}</p>`:""}
    <div class="vinewrap">
      ${[.25,.5,.75,1].map(m => `<svg class="ms anim" style="left:${m*100}%" viewBox="0 0 22 22" aria-hidden="true">${f>=m?`<g class="bob">${[0,72,144,216,288].map(r=>`<ellipse cx="11" cy="6" rx="3.2" ry="5" transform="rotate(${r} 11 11)" fill="var(--bloom)"/>`).join("")}<circle cx="11" cy="11" r="2.8" fill="var(--ochre)"/></g>`:`<circle cx="11" cy="13" r="4" fill="var(--leaf-2)"/><path d="M11 17 v4" stroke="var(--moss)" stroke-width="1.5"/>`}</svg>`).join("")}
      <div class="vine" role="progressbar" aria-valuemin="0" aria-valuemax="${G.count}" aria-valuenow="${G.got}" aria-label="Goals met toward the big goal"><i class="va" style="width:${pa}%"></i><i class="vb" style="width:${pb}%"></i></div>
      ${G.started && !G.ended ? `<div class="pace" style="left:${Math.min(100,G.pace/G.count*100)}%"><span>pace</span></div>` : ""}
    </div>
    <div class="chips2"><span><b>${G.got}</b> of ${G.count}</span><span>${esc(pace)}</span>${!G.ended?`<span><b>${G.left}</b> ${G.left===1?"day":"days"} left</span>`:""}<span class="pa"><b>${G.ma}</b> ${esc(name("a"))}</span><span class="pb"><b>${G.mb}</b> ${esc(name("b"))}</span></div>
  </div></div>`;
}
function welcome(){
  if (!S.loaded) return `<p class="empty">Loading…</p>`;
  if (S.readOnly) return `<div class="welcome"><h2>Nothing planted yet</h2><p>Once it’s set up, it’ll appear here.</p></div>`;
  return `<div class="welcome"><h2>Find your accountability buddy</h2><p>A two-minute setup, one small step at a time.</p><button class="primary" data-act="wiz" data-step="welcome">Start setting up</button></div>`;
}
function lateFor(p){
  const t = today(); if (checkedIn(t,p)) return false;
  const now = new Date(), mins = now.getHours()*60 + now.getMinutes();
  return mins >= pref("checkinBy");
}
function renderAcct(){
  const t = today(), y = addDays(t,-1);
  let h = `<div class="acct"><div class="accthead"><h2>Accountability</h2>`;
  if (!S.readOnly) h += `<div class="youare"><span>I’m</span><div class="seg" role="group" aria-label="Which buddy are you">${P.map(p=>`<button style="--pc:var(--${p})" data-act="me" data-p="${p}" aria-pressed="${S.me===p}">${esc(name(p))}</button>`).join("")}</div></div>`;
  h += `</div><div class="buddies">`;
  for (const p of P) {
    const r = weekRate(p,t), w = wxFor(r,t,p), hs = habits().filter(x=>applies(x,p)), n = hs.filter(x=>met(t,p,x)).length;
    const l = S.logs[key(t,p)], ci = checkedIn(t,p), late = lateFor(p);
    const missed = hs.filter(x => !met(y,p,x));
    let yest;
    if (!checkedIn(y,p)) yest = `No check-in yesterday`;
    else if (!missed.length) yest = `Met everything yesterday`;
    else { const given = missed.filter(x => S.logs[key(y,p)]?.why?.[x.id]).length; yest = `<details><summary>Missed ${missed.length} yesterday${pref("askWhy")?`, ${given} explained`:""}</summary><ul>${missed.map(x => { const why = S.logs[key(y,p)]?.why?.[x.id]; return `<li>${esc(x.name)}${why?`: <q>${esc(why)}</q>`:""}</li>`; }).join("")}</ul></details>`; }
    h += `<div class="buddy" style="--pc:var(--${p})">${avatarSVG(avatarOf(p),p,"av")}
      <h3>${esc(name(p))}${S.me===p?"<em>you</em>":""}</h3>${wxSVG(w)}
      <div><p class="meta"><span class="dot ${ci?"on":"off"}"></span>${ci ? `Checked in${l?.at?` at ${esc(timeAt(l.at))}`:""}` : late ? `<span class="late">No check-in by ${esc(fmtClock(pref("checkinBy")))}</span>` : "Not checked in yet"}</p>
      <p class="meta"><strong>${n}/${hs.length}</strong> today, <strong>${checkinStreak(p)}</strong>-day streak</p></div>
      <div class="yline">${yest}</div></div>`;
  }
  h += `</div>`;
  const all = [...S.messages].sort((x,y)=>y.ts-x.ts), msgs = all.slice(0, S.showAllMsgs ? 12 : 3).reverse();
  h += `<div class="thread" id="thread" aria-live="polite">${all.length>3 && !S.showAllMsgs ? `<button class="linkbtn" data-act="moremsgs">Show earlier messages</button>` : ""}${msgs.length ? msgs.map(m => {
      const f = m.from==="b" ? "b" : "a", k = QUICK[m.kind];
      return `<div class="msg ${S.me===f?"me":""}" style="--pc:var(--${f})">${avatarSVG(avatarOf(f),f,"av")}<div class="bub">${k?`<span class="kind">${esc(k.label)}. </span>`:""}${esc(m.text)}<small>${esc(name(f))}, ${esc(relTime(m.ts))}${m._pending?" (sending)":""}</small></div></div>`;
    }).join("") : `<p class="empty">Send a cheer or a gentle nudge to get things going.</p>`}</div>`;
  if (!S.readOnly) {
    if (!S.me) h += `<div class="pickme">Tap your name above to send cheers and nudges.</div>`;
    else { const b = name(other(S.me)); h += `<div class="composer"><div class="quick">${Object.entries(QUICK).map(([k,v])=>`<button class="ghost" data-act="quick" data-kind="${k}">${esc(v.label)}</button>`).join("")}</div>
      <input id="msgText" maxlength="280" value="${esc((()=>{ try { return localStorage.getItem("habitus-msg-draft")||""; } catch { return ""; } })())}" placeholder="Write to ${esc(b)}…" aria-label="Message to ${esc(b)}"><button class="primary" data-act="send">Send</button></div>`; }
  }
  return h + `</div>`;
}
function focusOf(p, d){
  const hs = habits().filter(h=>applies(h,p)); if (!hs.length) return null;
  const pick = S.focus?.[p] && hs.find(h => h.id===S.focus[p]);
  if (pick) return pick;
  const m = hs.filter(h => met(d,p,h)); return m.length ? m[m.length-1] : hs[0];
}
function renderDay(){
  const el = box("p-day");
  if (!S.config || !habits().length) { el.innerHTML = welcome(); return; }
  const d = S.day, t = today();
  let html = `<div class="daybar"><button class="iconbtn" data-act="prevday" aria-label="Previous day">‹</button><h2>${esc(prettyDay(d))}</h2>
    <button class="iconbtn" data-act="nextday" aria-label="Next day" ${d>=t?"disabled":""}>›</button>${d!==t?`<button class="linkbtn" data-act="gotoday">Back to today</button>`:""}</div><div class="gardeners">`;
  for (const p of P) {
    const hs = habits().filter(h=>applies(h,p)), n = hs.filter(h=>met(d,p,h)).length, log = S.logs[key(d,p)], pl = placeOf(p), noteOpen = S.noteOpen?.[p] || (log?.note||"").trim();
    html += `<div class="gcard" style="--pc:var(--${p})"><div class="ghead">${avatarSVG(avatarOf(p),p,"av")}<div><h3>${esc(name(p))}</h3><small>${hs.length?`${n} of ${hs.length} met`:"No goals"}</small><small class="clockline">${esc(PLACES[pl].city)}, <span class="cityclock" data-city="${cityOf(pl)}" data-mode="full"></span></small></div>
      <button class="acorns coinbtn" data-act="shop" data-p="${p}" title="Coins to spend in the shop">${coinSVG}${coins(p)}</button></div>
      ${(() => { const fh = focusOf(p,d); return `<div class="stage">${sceneSVG(p,d,{habit:fh})}${fh?`<span class="stagepill ${met(d,p,fh)?"ok":""}">${met(d,p,fh)?"✓ Done today":"Not yet today"}</span>`:""}<p class="stagecap">${esc(sceneCaption(p,d,fh))}</p></div>
      <div class="focusbar" role="tablist" aria-label="Show ${esc(name(p))} doing">${hs.map(h=>`<button role="tab" class="fchip ${met(d,p,h)?"ok":""}" data-act="focus" data-p="${p}" data-h="${esc(h.id)}" aria-selected="${fh&&fh.id===h.id}" title="${esc(h.name)}"><svg viewBox="-24 -24 48 48" aria-hidden="true">${itemSVG(h.item)}</svg><span>${esc(CATS[h.cat].label)}</span></button>`).join("")}</div>`; })()}
      <div class="rows">${hs.map(h=>habitRow(d,p,h)).join("")}</div>
      ${noteOpen ? `<div class="note"><label for="note-${p}">A line for ${esc(name(other(p)))}</label><textarea id="note-${p}" data-note data-d="${d}" data-p="${p}" ${S.readOnly?"readonly":""} placeholder="How did it go?">${esc(log?.note||"")}</textarea></div>` : ""}
      <div class="foot"><span class="placetag">${esc(PLACES[pl].name)}, ${esc(PLACES[pl].city)}</span><span>${S.readOnly?"":`${noteOpen?"":`<button class="ghost notebtn" data-act="note" data-p="${p}">Add a note</button> `}<button class="ghost" data-act="shop" data-p="${p}">Shop</button>`}</span></div></div>`;
  }
  el.innerHTML = html + `</div>` + renderAcct();
  const th = document.getElementById("thread"); if (th) th.scrollTop = th.scrollHeight;
}
function relTime(ts){
  const d = new Date(ts), now = Date.now(), mins = Math.round((now-ts)/60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  if (fmt(d) === today()) return d.toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit"});
  return d.toLocaleDateString(undefined,{month:"short",day:"numeric"}) + ", " + d.toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit"});
}
function durInputs(d,p,h){
  const v = val(d,p,h.id), dis = S.readOnly || d > today() ? "disabled" : "";
  const hh = v===null ? "" : Math.floor(v/60), mm = v===null ? "" : v%60;
  return `<span class="durin"><input id="dh-${p}-${esc(h.id)}" type="number" inputmode="numeric" min="0" max="24" value="${hh}" data-dur="h" data-d="${d}" data-p="${p}" data-h="${esc(h.id)}" aria-label="${esc(h.name)} hours" ${dis}><span>h</span>
    <input id="dm-${p}-${esc(h.id)}" type="number" inputmode="numeric" min="0" max="59" value="${mm}" data-dur="m" data-d="${d}" data-p="${p}" data-h="${esc(h.id)}" aria-label="${esc(h.name)} minutes" ${dis}><span>min</span></span>`;
}
function habitRow(d,p,h){
  const own = mine(d,p,h), ok = met(d,p,h), cs = curStreak(p,h), o = other(p), t = today();
  const mini = `<svg class="mini" viewBox="-24 -24 48 48" aria-hidden="true" opacity="${ok?1:.45}">${itemSVG(h.item)}</svg>`;
  const notes = [];
  if (h.type!=="check") notes.push(h.share==="combined" ? `Together ${targetText(h)}` : `Goal ${targetText(h)}`);
  if (h.share==="both") notes.push(ok ? "Both of you did it" : own ? `Waiting on ${name(o)}` : indiv(d,o,h) ? `${name(o)} did ${pronOf(o).pos}` : "Counts when you both do it");
  if (h.share==="combined") { const vo = val(d,o,h.id), vm = val(d,p,h.id); if (vm!==null && vo!==null) notes.push(`${fmtVal(h,vm+vo)} together so far`); else if (vm!==null) notes.push(`Waiting on ${name(o)}`); }
  if (h.type==="duration" || h.type==="number") {
    const base = h.baseline?.[p], v = val(d,p,h.id);
    if (base!=="" && base!=null && !isNaN(Number(base))) { const b = Number(base); if (v===null) notes.push(`Started at ${fmtVal(h,b)}`); else { const dl = v-b; notes.push(dl===0 ? `Same as your ${fmtVal(h,b)} start` : `${dl<0?"↓":"↑"} ${fmtVal(h,Math.abs(dl))} from your ${fmtVal(h,b)} start`); } }
  }
  if (cs>1) notes.push(`${cs}-day streak`);
  const sub = notes.length ? `<span class="hs">${esc(notes.join(". "))}</span>` : "";
  let row;
  if (h.type==="check") {
    row = `<button class="hrow ${own?"mine":""} ${ok?"met":""}" data-act="toggle" data-d="${d}" data-p="${p}" data-h="${esc(h.id)}" aria-pressed="${own}" ${S.readOnly?"disabled":""}>${mini}<span class="hn">${esc(h.name)}${sub}</span><span class="check"></span></button>`;
  } else {
    let input;
    if (h.type==="duration") input = durInputs(d,p,h);
    else if (h.type==="clock") input = `<span class="clockin"><input id="ck-${p}-${esc(h.id)}" type="time" value="${clockStr(val(d,p,h.id))}" data-clock data-d="${d}" data-p="${p}" data-h="${esc(h.id)}" aria-label="${esc(h.name)} time" ${S.readOnly||d>t?"disabled":""}></span>`;
    else input = `<span class="numin"><input id="num-${p}-${esc(h.id)}" type="number" inputmode="decimal" min="0" step="any" value="${val(d,p,h.id)??""}" data-num data-d="${d}" data-p="${p}" data-h="${esc(h.id)}" aria-label="${esc(h.name)}" ${S.readOnly||d>t?"disabled":""}><span class="u">${esc(h.unit||"")}</span></span>`;
    row = `<div class="hrow ${own?"mine":""} ${ok?"met":""}">${mini}<span class="hn">${esc(h.name)}${sub}</span>${input}<span class="check" role="img" aria-label="${ok?"Goal met":"Not met yet"}"></span></div>`;
  }
  let why = "";
  if (d < t && !ok && pref("askWhy")) { const w = S.logs[key(d,p)]?.why?.[h.id] || ""; why = `<input class="whyin" id="why-${p}-${esc(h.id)}" data-why data-d="${d}" data-p="${p}" data-h="${esc(h.id)}" maxlength="160" value="${esc(w)}" placeholder="What got in the way? ${esc(name(o))} will see this." aria-label="Reason for missing ${esc(h.name)}" ${S.readOnly?"readonly":""}>`; }
  return `<div class="hwrap">${row}${why}</div>`;
}
function renderCal(){
  const el = box("p-cal");
  if (!S.config || !habits().length) { el.innerHTML = welcome(); return; }
  const [y,m] = S.month.split("-").map(Number);
  const days = new Date(y,m,0).getDate(), t = today(), off = pref("weekStart")==="sun" ? new Date(y,m-1,1).getDay() : (new Date(y,m-1,1).getDay()+6)%7;
  const label = new Date(y,m-1,1).toLocaleDateString(undefined,{month:"long",year:"numeric"});
  let grid = (pref("weekStart")==="sun" ? ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"] : ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]).map(w=>`<div class="wd">${w}</div>`).join("");
  for (let i=0;i<off;i++) grid += `<div class="day blank"></div>`;
  for (let i=1;i<=days;i++){
    const ds = `${y}-${pad(m)}-${pad(i)}`, fut = ds > t;
    const fa = fut?0:dayFrac(ds,"a"), fb = fut?0:dayFrac(ds,"b");
    const wa = !fut && checkedIn(ds,"a") ? wxFor(fa,ds,"a") : null, wb = !fut && checkedIn(ds,"b") ? wxFor(fb,ds,"b") : null;
    grid += `<button class="day ${fut?"future":""} ${ds===t?"today":""} ${ds===S.day?"sel":""}" data-act="openday" data-d="${ds}" ${fut?"disabled":""}
      aria-label="${esc(parse(ds).toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"}))}: ${esc(name("a"))} ${Math.round(fa*100)}%, ${esc(name("b"))} ${Math.round(fb*100)}%">
      <span class="dn">${i}</span>${wa||wb?`<span class="wxs">${[wa,wb].filter(Boolean).map(w=>`<svg viewBox="0 0 40 40" aria-hidden="true">${weatherIcon(w)}</svg>`).join("")}</span>`:""}
      <span class="bars"><span class="bar"><i style="width:${fa*100}%;--c:var(--a)"></i></span><span class="bar"><i style="width:${fb*100}%;--c:var(--b)"></i></span></span></button>`;
  }
  let charts = "";
  for (const h of habits().filter(h=>h.type!=="check")) {
    const ps = P.filter(p=>applies(h,p)), comb = h.share==="combined", clock = h.type==="clock";
    const vals = []; for (let i=1;i<=days;i++){ const ds = `${y}-${pad(m)}-${pad(i)}`; for (const p of ps){ const v = val(ds,p,h.id); if (v!==null) vals.push(adj(v,h)); } if (comb) { const a = val(ds,"a",h.id), b = val(ds,"b",h.id); if (a!==null||b!==null) vals.push((a||0)+(b||0)); } }
    let lo = 0, hi = Math.max(h.target||1, ...vals, 1);
    if (clock) { const all = [...vals, h.target]; lo = Math.max(0, Math.min(...all) - 60); hi = Math.max(...all) + 60; }
    for (const p of ps){ const b = h.baseline?.[p]; if (!comb && !clock && b!==""&&b!=null&&!isNaN(Number(b))) hi = Math.max(hi, Number(b)); }
    if (!clock) hi *= 1.15;
    const W=700, H=150, x0=54, x1=690, yT=12, yB=118, gw=(x1-x0)/days, bw = comb ? gw-3 : Math.max(2,(gw-3)/ps.length);
    const Y = v => yB - ((v-lo)/(hi-lo||1))*(yB-yT);
    const lab = v => h.type==="duration" ? fmtDur(v) : clock ? fmtClock(v) : fmtNum(v);
    let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(h.name)} by day this month"><line x1="${x0}" x2="${x1}" y1="${yB}" y2="${yB}" stroke="var(--line-strong)"/><text x="${x0-6}" y="${yB+4}" text-anchor="end" font-size="11" fill="var(--ink-soft)">${esc(lab(lo))}</text>`;
    for (let i=1;i<=days;i++){
      const ds = `${y}-${pad(m)}-${pad(i)}`;
      if (clock) ps.forEach((p,j) => { const v = val(ds,p,h.id); if (v!==null) svg += `<circle cx="${x0+(i-.5)*gw+(j?2:-2)}" cy="${Y(adj(v,h))}" r="4.5" fill="var(--${p})" opacity="${met(ds,p,h)?1:.45}"><title>${esc(name(p))}, ${i}: ${esc(fmtClock(v))}</title></circle>`; });
      else if (comb) { let base = 0; ps.forEach(p => { const v = val(ds,p,h.id); if (v!==null){ svg += `<rect x="${x0+(i-1)*gw+1.5}" y="${Y(base+v)}" width="${bw}" height="${Y(base)-Y(base+v)}" fill="var(--${p})" opacity="${met(ds,p,h)?1:.45}"><title>${esc(name(p))}, ${i}: ${esc(fmtVal(h,v))}</title></rect>`; base += v; } }); }
      else ps.forEach((p,j) => { const v = val(ds,p,h.id); if (v!==null) svg += `<rect x="${x0+(i-1)*gw+1.5+j*bw}" y="${Y(v)}" width="${bw-.5}" height="${yB-Y(v)}" rx="1.5" fill="var(--${p})" opacity="${met(ds,p,h)?1:.45}"><title>${esc(name(p))}, ${i}: ${esc(fmtVal(h,v))}</title></rect>`; });
      if (i===1||i%5===0) svg += `<text x="${x0+(i-.5)*gw}" y="${yB+16}" text-anchor="middle" font-size="11" fill="var(--ink-soft)">${i}</text>`;
    }
    const ty = Y(h.target);
    svg += `<line x1="${x0}" x2="${x1}" y1="${ty}" y2="${ty}" stroke="var(--moss)" stroke-dasharray="5 4" stroke-width="1.5"/><text x="${x0-6}" y="${ty+4}" text-anchor="end" font-size="11" fill="var(--moss)">${esc(lab(h.target))}</text>`;
    if (!comb && !clock) ps.forEach(p => { const b = h.baseline?.[p]; if (b!==""&&b!=null&&!isNaN(Number(b))) { const by = Y(Number(b)); svg += `<line x1="${x0}" x2="${x1}" y1="${by}" y2="${by}" stroke="var(--${p})" stroke-dasharray="2 4" stroke-width="1.5" opacity=".8"/>`; } });
    svg += `</svg>`;
    const avgs = ps.map(p => { let s=0,n=0; for(let i=1;i<=days;i++){const v=val(`${y}-${pad(m)}-${pad(i)}`,p,h.id); if(v!==null){s+=adj(v,h);n++;}} return n?`${esc(name(p))} averaged ${esc(fmtVal(h,s/n))}`:`${esc(name(p))} hasn’t logged this month`; });
    const hasBase = !comb && !clock && ps.some(p => h.baseline?.[p]!==""&&h.baseline?.[p]!=null);
    charts += `<div class="chart"><h3>${esc(h.name)}</h3><p>${comb?`Your combined total, stacked, against a shared goal of ${esc(targetText(h))}.`:clock?`What time it happened each day. Goal ${esc(targetText(h))}.`:`Goal ${esc(targetText(h))} a day.`} Dashed green is the goal${hasBase?", dotted lines are your starting points":""}. ${avgs.join("; ")}.</p>${svg}</div>`;
  }
  el.innerHTML = `<div class="monthbar"><button class="iconbtn" data-act="prevmonth" aria-label="Previous month">‹</button><h2>${esc(label)}</h2>
    <button class="iconbtn" data-act="nextmonth" aria-label="Next month" ${S.month>=t.slice(0,7)?"disabled":""}>›</button></div>
    <div class="cal">${grid}</div>
    <div class="legend"><span><i style="background:var(--a)"></i>${esc(name("a"))}</span><span><i style="background:var(--b)"></i>${esc(name("b"))}</span><span>Each little sky shows how that day went for each of you. Tap a day to open it.</span></div>
    ${charts?`<details class="more"><summary>Time charts for this month</summary><div class="charts">${charts}</div></details>`:""}`;
}
function renderGarden(){
  const el = box("p-garden");
  if (!S.config || !habits().length) { el.innerHTML = welcome(); return; }
  const hs = habits(), W = 150, G = 300, H = 360, width = Math.max(hs.length*W+140, 640), fills = ["--b1","--b2","--b3","--b4","--b5"];
  let svg = `<svg class="anim" viewBox="0 0 ${width} ${H}" width="${width}" height="${H}" role="img" aria-label="A street with one building per goal; plants grow with the last 30 days">
    <rect width="${width}" height="${H}" fill="var(--sky)"/>
    <g fill="var(--shade)"><ellipse cx="${width*.25}" cy="70" rx="160" ry="40"/><ellipse cx="${width*.7}" cy="50" rx="200" ry="34"/></g>
    <g class="fall" style="--dur:14s"><ellipse cx="${width*.4}" cy="0" rx="7" ry="3" fill="var(--bloom)"/></g><g class="fall" style="--dur:17s;--del:-8s"><ellipse cx="${width*.75}" cy="0" rx="7" ry="3" fill="var(--ochre)"/></g>
    <g class="sway"><path d="M58 ${G} C60 ${G-60} 52 ${G-100} 60 ${G-140}" stroke="var(--pot-rim)" stroke-width="7" fill="none" stroke-linecap="round"/>
    <g fill="var(--leaf)"><circle cx="60" cy="${G-160}" r="38"/><circle cx="35" cy="${G-130}" r="26"/><circle cx="88" cy="${G-128}" r="26" fill="var(--leaf-2)"/></g>
    <g fill="var(--ochre)"><circle cx="48" cy="${G-170}" r="5"/><circle cx="76" cy="${G-150}" r="4"/></g></g>`;
  hs.forEach((h,i) => {
    const x = 120+i*W, w = 120, cx = x+w/2;
    svg += cityBuilding(i, x, w, G);
    const ps = P.filter(p=>applies(h,p)), slots = ps.length===2 ? [x+30, x+w-30] : [cx];
    ps.forEach((p,j) => {
      const bx = slots[j], by = G-62, n = count30(p,h), s = n ? .55+(n/30)*1.55 : 1;
      svg += `<g transform="translate(${bx-20*s} ${by-40*s}) scale(${s})"><g class="sway">${n?plantBody(h.plant):sprout}</g></g>
        <rect x="${bx-22}" y="${by-2}" width="44" height="12" rx="2" fill="var(--${p})"/>
        <text x="${bx}" y="${G+20}" text-anchor="middle" font-size="12" font-weight="600" fill="var(--${p})" font-family="Instrument Sans, sans-serif">${n}</text>`;
    });
    svg += `<text x="${cx}" y="${G+42}" text-anchor="middle" font-size="13" fill="var(--ink)" font-family="Instrument Sans, sans-serif">${esc(h.name.length>20?h.name.slice(0,19)+"…":h.name)}</text>`;
  });
  svg += `<rect x="0" y="${G}" width="${width}" height="6" fill="var(--ground)"/></svg>`;
  let summ = "";
  for (const p of P) {
    const hs2 = hs.filter(h=>applies(h,p)); if (!hs2.length) continue;
    const pct = Math.round(hs2.reduce((a,h)=>a+count30(p,h),0)/(hs2.length*30)*100);
    let top=null, topN=-1; hs2.forEach(h => { const c = curStreak(p,h); if (c>topN){ topN=c; top=h; } });
    summ += `<div style="--pc:var(--${p})"><h3>${esc(name(p))}</h3><p><strong>${pct}%</strong> of goals met over the last 30 days. ${topN>0?`Longest running streak: <strong>${topN} ${topN===1?"day":"days"}</strong> on ${esc(top.name)}.`:"No streak running right now."}</p></div>`;
  }
  let rows = "";
  for (const h of hs) for (const p of P) if (applies(h,p)) {
    const a = h.type!=="check" ? avg30(p,h) : null;
    rows += `<tr><td>${esc(h.name)}</td><td class="p${p}" style="text-align:left">${esc(name(p))}</td><td>${count30(p,h)}</td><td>${h.type==="check"?"–":(a===null?"–":esc(fmtVal(h,a)))}</td><td>${curStreak(p,h)}</td><td>${bestStreak(p,h)}</td></tr>`;
  }
  el.innerHTML = `<p class="gardenintro">Each goal is a building on a street borrowed from seven cities. Your window-box plant grows with every day you met it this month.</p>
    <div class="city">${svg}</div><div class="summ">${summ}</div>
    <details class="more"><summary>Every goal, in numbers</summary><div class="stats"><table class="st"><thead><tr><th>Goal</th><th style="text-align:left">Who</th><th>Days met (30)</th><th>Average (30)</th><th>Current streak</th><th>Best streak</th></tr></thead><tbody>${rows}</tbody></table></div></details>`;
}

/* ---------- shop ---------- */
const shop = document.getElementById("shop");
let shopP = "a", shopTab = "wardrobe";
function shopCard(p, id, kind){
  const pk = S.picnic[p] || {}, owned = new Set(pk.owned||[]), bal = coins(p);
  const own = owned.has(id), price = priceOf(id);
  const meta = OUTFITS[id] || ACCESSORIES[id] || TREATS[id] || CATSHOP[id];
  let on = false, preview = "", act = "";
  if (kind==="wardrobe") {
    on = pk.outfit===id;
    const av = {...avatarOf(p)}; av._look = {outfit:id, wear:{}};
    preview = `<svg viewBox="-56 -132 112 140" aria-hidden="true" class="anim">${figureSVG(av,"read")}</svg>`;
    act = own ? `<button class="${on?"primary":"ghost"}" data-shop="${on?"undress":"dress"}" data-id="${id}" aria-pressed="${on}">${on?"Wearing":"Wear"}</button>` : "";
  } else if (kind==="accessories") {
    const a = ACCESSORIES[id]; on = (pk.wear||[]).includes(id);
    const av = {...avatarOf(p)}; const L = lookOf(p); av._look = {outfit:L.outfit, wear:{[a.slot]:id}};
    preview = a.slot==="hand"||a.slot==="wrist"||a.slot==="bag" ? `<svg viewBox="-56 -132 112 140" aria-hidden="true" class="anim">${figureSVG(av,"read")}${a.slot==="bag"?`<g transform="translate(36 -10)">${toteSVG}</g>`:""}</svg>` : avatarSVG(av, p, "");
    act = own ? `<button class="${on?"primary":"ghost"}" data-shop="${on?"unwear":"wear"}" data-id="${id}" aria-pressed="${on}">${on?"Wearing":"Wear"}</button>` : "";
  } else {
    on = (pk.shown||[]).includes(id);
    const cat = kind==="cat";
    preview = `<svg viewBox="-36 -36 72 72" aria-hidden="true" class="anim">${["bow","scarf","hat","catcrown","bandana","bell"].includes(id) ? `<g transform="scale(.9)">${petSVG(petOf(p), false, {[id==="catcrown"?"crown":id]:true})}</g>` : id==="kitten" ? `<g transform="scale(.7)">${petSVG(petOf(p), true)}</g>` : id==="cushion" ? `<g transform="scale(.9)">${treatSVG("cushion")}</g>` : `<g transform="scale(${id==="butterfly"?2.4:1.3})">${cat?treatSVG(id):treatSVG2(id)}</g>`}</svg>`;
    act = own ? `<button class="${on?"primary":"ghost"}" data-shop="toggle" data-id="${id}" aria-pressed="${on}">${on?"Out on the blanket":"Put out"}</button>` : "";
  }
  if (!own) act = `<span class="price">${coinSVG}${price}</span><button class="primary" data-shop="buy" data-kind="${kind}" data-id="${id}" ${bal<price?"disabled":""}>Buy</button>`;
  return `<div class="si ${on?"on":""}">${preview}<strong>${esc(meta.name)}</strong>${meta.city?`<small class="from">From ${esc(meta.city)}</small>`:""}${act}</div>`;
}
function drawShop(){
  const p = shopP, bal = coins(p);
  const lists = {wardrobe:Object.keys(OUTFITS), accessories:Object.keys(ACCESSORIES), picnic:Object.keys(TREATS), cat:Object.keys(CATSHOP)};
  const note = {wardrobe:"Buy an outfit once, then wear it whenever you like. Take it off to go back to your everyday clothes.", accessories:"One per spot: head, face, neck, wrist, hand and bag. Wearing a new one swaps it in.", picnic:"Dishes appear on the market stall when you cook or eat well. The basket, lantern, radio and butterflies follow you to every scene.", cat:"Little luxuries for your sidekick, who follows you to every scene."}[shopTab];
  document.getElementById("shopBody").innerHTML = `
    <div class="shophead" style="--pc:var(--${p})">${avatarSVG(avatarOf(p),p,"av")}<div><h2>${esc(name(p))}’s shop</h2><p class="small">Everyone starts with ${START_COINS} coins, and each goal met earns one more.</p></div><span class="bal">${coinSVG}${bal}</span></div>
    <div class="cattabs" role="tablist">${SHOPCATS.map(([k,l])=>`<button type="button" role="tab" style="--pc:var(--${p})" data-shop="tab" data-id="${k}" aria-selected="${shopTab===k}">${l}</button>`).join("")}</div>
    <p class="small">${esc(note)}</p>
    <div class="shopgrid" style="--pc:var(--${p})">${lists[shopTab].map(id => shopCard(p, id, shopTab)).join("")}</div>
    <div class="dlgfoot"><span></span><button class="ghost" data-shop="close">Done</button></div>`;
}
document.getElementById("shopBody").addEventListener("click", e => {
  const b = e.target.closest("[data-shop]"); if (!b) return;
  const a = b.dataset.shop, p = shopP, id = b.dataset.id;
  if (a==="close") { shop.close(); return; }
  if (a==="tab") { shopTab = id; drawShop(); return; }
  if (S.readOnly) return;
  const pk = JSON.parse(JSON.stringify(S.picnic[p] || {})); pk.owned = pk.owned||[]; pk.shown = pk.shown||[]; pk.wear = pk.wear||[]; pk.spent = pk.spent||0;
  const wearIt = id => { const slot = ACCESSORIES[id].slot; pk.wear = pk.wear.filter(x => ACCESSORIES[x]?.slot !== slot); pk.wear.push(id); };
  if (a==="buy") {
    const price = priceOf(id); if (pk.owned.includes(id) || coins(p) < price) return;
    pk.owned.push(id); pk.spent += price;
    if (OUTFITS[id]) pk.outfit = id; else if (ACCESSORIES[id]) wearIt(id); else pk.shown.push(id);
  }
  else if (a==="dress") pk.outfit = id;
  else if (a==="undress") pk.outfit = null;
  else if (a==="wear") wearIt(id);
  else if (a==="unwear") pk.wear = pk.wear.filter(x => x!==id);
  else if (a==="toggle") pk.shown = pk.shown.includes(id) ? pk.shown.filter(x=>x!==id) : [...pk.shown, id];
  else return;
  S.picnic[p] = pk; render(); queuePicnic(p);
});
