/* ---------- weather overlay ---------- */
const SWAY = {sunny:[6,1.2], breezy:[3.2,2.4], partly:[5,1.6], windy:[1.6,4], overcast:[6,1.2], fog:[8,.8], drizzle:[5,1.6], rain:[3.6,2.4], snow:[7,1], storm:[1.2,5], blizzard:[1.4,4.5], none:[6,1.2]};
const WTINT = {overcast:["#7E827F",.12], fog:["#E8E5DE",.22], drizzle:["#59656E",.12], rain:["#3F4F60",.2], snow:["#DDE3EA",.1], storm:["#1C2232",.36], blizzard:["#E7EBEF",.28]};
function weatherTint(w, W, H){ const t = WTINT[w]; return t ? `<g opacity="${t[1]}"><rect width="${W}" height="${H}" fill="${t[0]}"${w==="storm"?` class="glow" style="animation-duration:3s"`:""}/></g>` : ""; }
function weatherFX(w, W, H, skyH, R, season, o){
  o = o || {}; const phase = o.phase || "day";
  let s = "";
  const k = S.motion==="calm" ? .45 : 1, per = W/360, dx = `--dx:${W+120}px`;
  const sp = season==="spring";
  const cloud = (c, y, sc, dur, op, layer) => `<g class="drift" style="${dx};--dur:${dur.toFixed(1)}s;--del:-${(R()*dur).toFixed(1)}s"><g transform="translate(0 ${y.toFixed(0)}) scale(${sc.toFixed(2)})" opacity="${op}"><g class="bob" style="animation-duration:${(4+R()*3).toFixed(1)}s"><circle cx="0" cy="10" r="14" fill="${c}"/><circle cx="16" cy="0" r="18" fill="${c}"/><circle cx="34" cy="8" r="14" fill="${c}"/><rect x="0" y="8" width="34" height="16" rx="8" fill="${c}"/>${layer?`<path d="M2 20 Q17 26 32 20" stroke="#FFF" stroke-width="2" opacity=".4" fill="none"/>`:""}</g></g></g>`;
  if (["sunny","breezy","partly"].includes(w) && phase!=="mixed") {
    if (phase==="night" || phase==="dusk") s += `<g transform="translate(${W-46} 34)"><circle r="26" fill="#F4EEC8" opacity=".15" class="pulse"/><circle r="13" fill="#F4EEC8"/><circle cx="-4" cy="-3" r="2.4" fill="#DCD5AE"/><circle cx="4" cy="4" r="1.8" fill="#DCD5AE"/></g>`;
    else if (phase==="dawn" || phase==="golden") s += `<g transform="translate(${phase==="dawn"?W*.88:W*.1} ${skyH-30})"><circle r="40" fill="#F6B66A" opacity=".25" class="pulse"/><circle r="20" fill="#F2A65A"/><circle r="14" fill="#F8C77A"/></g><g opacity=".06"><rect width="${W}" height="${H}" fill="#F2A65A" class="glow"/></g>`;
    else {
      s += `<g transform="translate(${W-42} 32)"><circle r="30" fill="#F6D27A" opacity=".25" class="pulse"/><g class="spin">${Array.from({length:12},(_,i)=>`<rect x="-2" y="-31" width="4" height="10" rx="2" fill="#E8B54F" transform="rotate(${i*30})"/>`).join("")}</g><circle r="16" fill="#E8B54F"/><circle r="11" fill="#F4CE72"/></g>`;
      s += `<g opacity=".07"><rect width="${W}" height="${H}" fill="#F2C76A" class="glow"/></g>`;
      s += `<g opacity=".06"><g class="glow" style="animation-duration:7s">${Array.from({length:3},(_,i)=>`<path d="M${W-60-i*50} 40 L${W-260-i*90} ${H} L${W-200-i*90} ${H}Z" fill="#FFF6DC"/>`).join("")}</g></g>`;
    }
    if (phase==="day" || phase==="golden") for (let i=0;i<Math.max(1,Math.round(3*per*k));i++){ const y = 16+R()*(skyH*.4), d = 16+R()*10; s += `<g class="fly" style="${dx};--dur:${d.toFixed(0)}s;--del:-${(R()*d).toFixed(1)}s"><g transform="translate(-30 ${y.toFixed(0)})">${[0,1,2].map(j=>`<g transform="translate(${j*9} ${j%2*5})"><path class="flap" style="animation-delay:-${(j*.15).toFixed(2)}s" d="M-4 0 q2 -3 4 0 q2 -3 4 0" stroke="#3B3A36" stroke-width="1.2" fill="none"/></g>`).join("")}</g></g>`; }
  }
  const back = {partly:2, windy:3, overcast:4, fog:3, drizzle:3, rain:4, snow:4, storm:4, blizzard:4}[w] || 0;
  const front = {partly:2, windy:3, overcast:3, fog:2, drizzle:3, rain:4, snow:3, storm:5, blizzard:4}[w] || 0;
  const cb = {partly:"#FFFFFF", windy:"#F4F1EA", overcast:"#DADAD5", fog:"#ECE9E3", drizzle:"#C7CBCC", rain:"#ABB3B8", snow:"#E4E7EA", storm:"#6A7280", blizzard:"#DCE0E4"}[w];
  const cf = {partly:"#FBF8F1", windy:"#EDEAE2", overcast:"#C9C9C3", fog:"#E2DFD8", drizzle:"#B2B7B9", rain:"#939DA4", snow:"#D6DADE", storm:"#4E5664", blizzard:"#CDD2D7"}[w];
  const darkK = phase==="night" ? -.6 : phase==="dusk" ? -.35 : 0;
  const CB = cb && darkK ? shade(cb, darkK) : cb, CF = cf && darkK ? shade(cf, darkK) : cf;
  const fast = w==="windy"||w==="storm"||w==="blizzard";
  for (let i=0;i<Math.round(back*per*(W>400?.5:1));i++) s += cloud(CB, R()*skyH*.35, .6+R()*.5, (fast?22:60)+R()*20, .75);
  for (let i=0;i<Math.round(front*per*(W>400?.5:1));i++) s += cloud(CF, 6+R()*skyH*.4, .9+R()*.7, (fast?10:32)+R()*14, .95, true);
  if (!o.noTint) s += weatherTint(w, W, H);
  if ((w==="drizzle" || w==="partly") && R() > .35) s += `<g class="rainbow" transform="translate(${(W*.32).toFixed(0)} ${skyH+10})">${["#E07A5F","#F2C14E","#9BC27A","#7FAED0","#9A86C2"].map((c,i)=>`<path d="M${-110+i*5} 0 A${110-i*5} ${100-i*5} 0 0 1 ${110-i*5} 0" stroke="${c}" stroke-width="5" fill="none"/>`).join("")}</g>`;
  if (w==="fog" || w==="blizzard") for (let i=0;i<Math.round(5*per);i++) s += `<g class="fogd" style="--dur:${(14+R()*14).toFixed(0)}s;--del:-${(R()*20).toFixed(0)}s"><ellipse class="glow" style="animation-duration:${(5+R()*4).toFixed(1)}s" cx="${(R()*W).toFixed(0)}" cy="${(skyH*.5+R()*(H-skyH*.5)).toFixed(0)}" rx="${(W*.45).toFixed(0)}" ry="${(14+R()*16).toFixed(0)}" fill="#F3F1EC" opacity="${w==="fog"?.5:.38}"/></g>`;
  if (isWet(w)) {
    const n = Math.round((w==="drizzle"?30:w==="rain"?70:110) * per * k);
    s += `<g stroke="${w==="storm"?"#C9D3DD":"#C2CFDA"}" stroke-width="${w==="drizzle"?1:1.4}" stroke-linecap="round" opacity=".85">`;
    for (let i=0;i<n;i++){ const x = R()*(W+40), d = (w==="drizzle"?1.1:w==="storm"?.5:.7)+R()*.3; s += `<path class="rainf" style="--dur:${d.toFixed(2)}s;--del:-${(R()*d).toFixed(2)}s" d="M${x.toFixed(0)} -20 l-2.5 ${w==="drizzle"?7:13}"/>`; }
    s += `</g>`;
    if (H > skyH + 40) for (let i=0;i<Math.round((w==="drizzle"?5:12)*per*k);i++){ const x = 10+R()*(W-20), y = skyH+14+R()*(H-skyH-20); s += `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)})"><ellipse class="ripple" style="--del:-${(R()*1.6).toFixed(2)}s" rx="8" ry="3" fill="none" stroke="#DDE6EE" stroke-width="1"/><path class="splash" style="--del:-${(R()*1.2).toFixed(2)}s" d="M-4 -1 l-2 -4 M0 -2 v-5 M4 -1 l2 -4" stroke="#E4ECF2" stroke-width="1" stroke-linecap="round"/></g>`; }
  }
  if (isSnowy(w)) {
    const n = Math.round((w==="snow"?60:110) * per * k);
    if (H > skyH + 20) s += `<rect class="accum" x="0" y="${skyH}" width="${W}" height="${H-skyH}" fill="#FFF"/>` + Array.from({length:Math.round(6*per)},()=>`<ellipse cx="${(R()*W).toFixed(0)}" cy="${(skyH+10+R()*(H-skyH-10)).toFixed(0)}" rx="${(20+R()*30).toFixed(0)}" ry="5" fill="#FFF" opacity=".55"/>`).join("");
    for (let i=0;i<n;i++){ const x = R()*W, big = R(), d = (w==="snow"?6:3)+(1-big)*6; s += `<circle class="snowf" style="--dur:${d.toFixed(1)}s;--del:-${(R()*d).toFixed(1)}s" cx="${x.toFixed(0)}" cy="-8" r="${(1+big*2.4).toFixed(1)}" fill="#FFF" opacity="${(.6+big*.4).toFixed(2)}"/>`; }
    if (w==="blizzard") for (let i=0;i<Math.round(6*per*k);i++) s += `<path class="windl" style="${dx};--dur:${(1.1+R()).toFixed(1)}s;--del:-${R().toFixed(1)}s" d="M0 ${(R()*H).toFixed(0)} q40 -6 80 0" stroke="#FFF" stroke-width="1.6" fill="none" opacity=".8"/>`;
  }
  if (w==="breezy" || w==="windy" || (season==="fall" && (w==="sunny"||w==="partly")) || (season==="spring" && w==="sunny")) {
    const cols = sp ? ["#F2C4CF","#FBE3E8","#EFB3C2"] : season==="fall" ? ["#D2733A","#E3B23C","#B9612C"] : ["#9DBB63","#B6CF7E","#FFFFFF"];
    const n = Math.round((w==="windy"?14:w==="breezy"?9:4)*per*k);
    for (let i=0;i<n;i++){ const d = (w==="windy"?3:w==="breezy"?5.5:9)+R()*3; s += `<g class="blow" style="${dx};--dur:${d.toFixed(1)}s;--del:-${(R()*d).toFixed(1)}s"><ellipse class="tumble" cx="-20" cy="${(R()*H*.9).toFixed(0)}" rx="${sp?3.4:5.5}" ry="${sp?2.4:2.6}" fill="${cols[i%3]}"/></g>`; }
    if (w==="breezy"||w==="windy") for (let i=0;i<Math.round((w==="windy"?7:3)*per*k);i++) s += `<path class="windl" style="${dx};--dur:${(1.6+R()*1.4).toFixed(1)}s;--del:-${(R()*2).toFixed(1)}s" d="M0 ${(R()*H*.8).toFixed(0)} q30 -5 60 0 q10 2 10 -4" stroke="#FFF" stroke-width="1.4" fill="none" opacity=".75"/>`;
  }
  if (w==="storm") {
    s += `<rect width="${W}" height="${H}" fill="#FFF8E6" opacity="0" class="flash"/>`;
    for (let i=0;i<Math.max(1,Math.round(per*2));i++){ const x = 40 + R()*(W-80); s += `<path class="flash" style="--del:-${(R()*6).toFixed(1)}s" d="M${x.toFixed(0)} 0 l-16 ${(skyH*.4).toFixed(0)} h12 l-12 ${(skyH*.35).toFixed(0)} l30 -${(skyH*.45).toFixed(0)} h-13 l12 -${(skyH*.3).toFixed(0)}Z" fill="#F6D27A"/>`; }
  }
  return s;
}

/*SCENE*/
const PHASE_SKY = {dawn:["#B9A6C9","#F6C9A8"], golden:["#E7B07A","#F6D9A0"], dusk:["#4A4A7A","#E59A7A"], night:["#141B36","#2B3762"]};
const PHASE_TINT = {dawn:["#F2A88A",.14], golden:["#F2A65A",.16], dusk:["#3A2E5E",.32], night:["#0E1430",.48]};
function skyFor(w, phase){
  if (phase==="night") return ["drizzle","rain","storm","overcast","fog","snow","blizzard"].includes(w) ? ["#1A2030","#323A4A"] : PHASE_SKY.night;
  if (phase==="dusk") return ["rain","storm","overcast"].includes(w) ? ["#3A3A52","#7A6A7A"] : PHASE_SKY.dusk;
  if (phase==="dawn"||phase==="golden") return ["rain","storm","overcast","fog","drizzle"].includes(w) ? ["#9A9AA4","#D8C2A8"] : PHASE_SKY[phase];
  return SKY[w];
}
function nightLights(R, W, phase){
  if (phase!=="night" && phase!=="dusk") return "";
  let s = "";
  for (let i=0;i<Math.round(16*W/360);i++) s += `<rect x="${(R()*W).toFixed(0)}" y="${(40+R()*68).toFixed(0)}" width="3" height="4" fill="#F6D27A" opacity="${(.5+R()*.5).toFixed(2)}" class="${R()>.7?"glow":""}"/>`;
  if (phase==="night") for (let i=0;i<Math.round(10*W/360);i++) s += `<path class="twinkle" style="animation-delay:-${(R()*2).toFixed(1)}s" d="M${(R()*W).toFixed(0)} ${(6+R()*40).toFixed(0)} h.1" stroke="#FFF" stroke-width="2" stroke-linecap="round"/>`;
  return s;
}
function bannerSVG(){
  const t = today(), ra = weekRate("a",t), rb = weekRate("b",t);
  const r = ra===null && rb===null ? null : ((ra??rb) + (rb??ra))/2;
  const w = wxFor(r, t, "shared"), season = seasonFor(t), R = rnd(7);
  const order = Object.keys(PLACES), total = order.length*360;
  const [swd, swa] = SWAY[w] || SWAY.none;
  let defs = "", body = "";
  order.forEach((pl,i) => {
    const city = cityOf(pl), ph = phaseFor(city), sky = skyFor(w, ph), tint = PHASE_TINT[ph];
    defs += `<linearGradient id="bsky${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient>`;
    body += `<g transform="translate(${i*360} 0)"><rect width="360" height="160" fill="url(#bsky${i})"/>${groundSVG(pl, season, 360, 124, 36, rnd(i+40))}${BACKDROP[pl](season, isSnowy(w), rnd(pl.length*7+3))}${passersby(pl, rnd(i+90), isWet(w), 360)}${tint?`<rect width="360" height="160" fill="${tint[0]}" opacity="${tint[1]}"/>`:""}${nightLights(rnd(i+9), 360, ph)}<text x="180" y="152" text-anchor="middle" font-size="11" font-family="Instrument Sans, sans-serif" fill="${ph==="night"||ph==="dusk"?"#F4EEE2":"#3B2E22"}" opacity=".85">${esc(PLACES[pl].city)}, <tspan class="cityclock" data-city="${city}"></tspan></text></g>`;
  });
  const s = `<svg class="anim" viewBox="0 0 1440 160" style="--swd:${swd}s;--swa:${swa}" role="img" aria-label="A slow pan across ten cities, each shown at its local time of day."><defs>${defs}<clipPath id="clip-banner"><rect width="1440" height="160"/></clipPath></defs><g clip-path="url(#clip-banner)"><g class="pan" style="--pan:-${total-1440}px">${body}</g>${weatherFX(w, 1440, 160, 125, R, season, {phase:"mixed"})}<rect width="1440" height="160" fill="#0B0F08" style="opacity:var(--scene-dim)"/></g></svg>`;
  return {svg:s, w, season};
}
/* ---------- city street buildings ---------- */
const STREET = ["hutong","paris","rome","tokyo","brownstone","victorian","athens","london","copenhagen","delhi"];
function cityBuilding(i, x, w, G){
  const type = STREET[i % STREET.length], cx = x + w/2;
  let s = "";
  if (type==="hutong") {
    const bh = 150, top = G - bh;
    s += `<rect x="${x}" y="${top}" width="${w}" height="${bh}" fill="#9A9EA3" stroke="var(--line-strong)"/>${Array.from({length:Math.floor(bh/7)},(_,k)=>`<line x1="${x}" x2="${x+w}" y1="${top+5+k*7}" y2="${top+5+k*7}" stroke="#AEB2B6" stroke-width=".7"/>`).join("")}`;
    s += `<path d="M${x-10} ${top+2} Q${x+4} ${top-2} ${x+8} ${top-18} L${x+w-8} ${top-18} Q${x+w-4} ${top-2} ${x+w+10} ${top+2}Z" fill="#525960"/>${Array.from({length:Math.floor((w-16)/8)},(_,k)=>`<line x1="${x+10+k*8}" x2="${x+9+k*8.2}" y1="${top-17}" y2="${top}" stroke="#686F77" stroke-width="1.2"/>`).join("")}<path d="M${x+2} ${top-18} Q${x} ${top-26} ${x-6} ${top-26} L${x+6} ${top-22} L${x+w-6} ${top-22} L${x+w+6} ${top-26} Q${x+w} ${top-26} ${x+w-2} ${top-18}Z" fill="#41474E"/>`;
    s += `<rect x="${x+14}" y="${top+16}" width="26" height="20" fill="#6B5547"/><rect x="${x+w-40}" y="${top+16}" width="26" height="20" fill="#6B5547"/>`;
    s += `<rect x="${cx-15}" y="${G-44}" width="30" height="44" fill="#3E3A36"/><rect x="${cx-12}" y="${G-41}" width="11.5" height="41" fill="#A8322A"/><rect x="${cx+.5}" y="${G-41}" width="11.5" height="41" fill="#A8322A"/>`;
    s += [cx-26,cx+26].map(lx=>`<g transform="translate(${lx} ${G-58})"><g class="swing"><line y2="6" stroke="#3E3A36"/><ellipse cy="12" rx="6" ry="6.5" fill="#C9372C"/><path d="M0 18 v4" stroke="#D9A441" stroke-width="1.4"/></g></g>`).join("");
  } else if (type==="paris") {
    const bh = 220, top = G - bh;
    s += `<path d="M${x-2} ${top} L${x+8} ${top-26} L${x+w-8} ${top-26} L${x+w+2} ${top}Z" fill="#7E8C99"/>${[0,1,2].map(k=>`<rect x="${x+18+k*34}" y="${top-20}" width="14" height="15" rx="7" fill="#EADFC9" stroke="#6F7C88"/>`).join("")}<rect x="${x+12}" y="${top-36}" width="14" height="12" fill="#B9A58A"/><rect x="${x+14}" y="${top-41}" width="4" height="5" fill="#C26B45"/>`;
    s += `<rect x="${x}" y="${top}" width="${w}" height="${bh}" fill="#EADFC9" stroke="var(--line-strong)"/>`;
    for (let r=0; top+12+r*34 < G-150; r++) { for (let c=0;c<3;c++) s += `<rect x="${x+14+c*34}" y="${top+12+r*34}" width="20" height="26" fill="#6E7F8D"/>`; s += `<line x1="${x+6}" x2="${x+w-6}" y1="${top+40+r*34}" y2="${top+40+r*34}" stroke="#2F2F2F" stroke-width="2"/>`; }
    s += `<path d="M${x} ${G-74} h${w} l-6 -10 h-${w-12}Z" fill="#B8423A"/>${Array.from({length:6},(_,k)=>`<path d="M${x+6+k*18} ${G-84} h9 l-1 10 h-7Z" fill="#F4EEE4"/>`).join("")}`;
    s += `<path d="M${cx-16} ${G} V${G-34} a16 16 0 0 1 32 0 V${G}Z" fill="#3F5A4A"/>`;
  } else if (type==="rome") {
    const bh = 180, top = G - bh;
    s += `<rect x="${x}" y="${top}" width="${w}" height="${bh}" fill="#D9A45C" stroke="var(--line-strong)"/><path d="M${x-8} ${top} L${cx} ${top-20} L${x+w+8} ${top}Z" fill="#B5562C"/>${Array.from({length:8},(_,k)=>`<path d="M${x-4+k*17} ${top-1} L${cx} ${top-19}" stroke="#9A4523" stroke-width=".6"/>`).join("")}`;
    for (let r=0; top+16+r*34 < G-150; r++) for (let c=0;c<3;c++){ const wx = x+16+c*34; s += `<rect x="${wx}" y="${top+16+r*34}" width="16" height="24" fill="#6B5547"/><rect x="${wx-6}" y="${top+16+r*34}" width="5" height="24" fill="#4E7A55"/><rect x="${wx+17}" y="${top+16+r*34}" width="5" height="24" fill="#4E7A55"/>`; }
    s += `<path d="M${cx-15} ${G} V${G-36} a15 15 0 0 1 30 0 V${G}Z" fill="#6B4A32"/><rect x="${x}" y="${G-90}" width="${w}" height="3" fill="#C98A4A"/>`;
  } else if (type==="tokyo") {
    const bh = 140, top = G - bh;
    s += `<rect x="${x}" y="${top}" width="${w}" height="${bh}" fill="#6B4E3A" stroke="var(--line-strong)"/>${Array.from({length:Math.floor(w/6)},(_,k)=>`<line x1="${x+3+k*6}" x2="${x+3+k*6}" y1="${top+10}" y2="${G-80}" stroke="#4E3828" stroke-width="1.4"/>`).join("")}`;
    s += `<path d="M${x-12} ${top+4} L${x+4} ${top-16} L${x+w-4} ${top-16} L${x+w+12} ${top+4}Z" fill="#3F3A3A"/><path d="M${x-8} ${G-76} L${x+w+8} ${G-76} L${x+w} ${G-88} L${x} ${G-88}Z" fill="#3F3A3A"/>`;
    s += `<rect x="${cx-22}" y="${G-48}" width="44" height="48" fill="#2E2520"/><path d="M${cx-22} ${G-48} h44 v18 h-44Z" fill="#34476B"/><path d="M${cx-7} ${G-48} v18 M${cx+7} ${G-48} v18" stroke="#2A3A58" stroke-width="1.4"/><text x="${cx}" y="${G-35}" text-anchor="middle" font-size="9" fill="#F4EEE4" font-family="sans-serif">○</text>`;
    s += `<g transform="translate(${x+w-12} ${G-74})"><g class="swing"><line y2="5" stroke="#3E3A36"/><rect x="-5" y="5" width="10" height="13" rx="5" fill="#F4EEE4"/><path d="M-5 11.5 h10" stroke="#C9372C"/></g></g>`;
  } else if (type==="brownstone") {
    const bh = 200, top = G - bh;
    s += `<rect x="${x}" y="${top}" width="${w}" height="${bh}" fill="#8A5A44" stroke="var(--line-strong)"/><rect x="${x-4}" y="${top-10}" width="${w+8}" height="12" fill="#6E4636"/>${Array.from({length:10},(_,k)=>`<rect x="${x+2+k*12}" y="${top-4}" width="6" height="4" fill="#5A3A2C"/>`).join("")}`;
    for (let r=0; top+16+r*36 < G-150; r++) for (let c=0;c<3;c++){ const wx = x+14+c*34; s += `<rect x="${wx}" y="${top+16+r*36}" width="18" height="26" fill="#3F4A55"/><rect x="${wx-2}" y="${top+12+r*36}" width="22" height="4" fill="#B79A80"/>`; }
    s += `<path d="M${x+w-24} ${top+20} v${bh-110} M${x+w-8} ${top+20} v${bh-110}" stroke="#2F2F2F" stroke-width="1.2"/>${Array.from({length:4},(_,k)=>`<path d="M${x+w-26} ${top+40+k*20} h20" stroke="#2F2F2F" stroke-width="1.6"/>`).join("")}`;
    s += `<rect x="${cx-12}" y="${G-58}" width="24" height="36" fill="#3B2A22"/><path d="M${cx-18} ${G} L${cx-14} ${G-22} H${cx+14} L${cx+18} ${G}Z" fill="#7A4E3A"/>${[6,12,18].map(k=>`<path d="M${cx-17} ${G-k} H${cx+17}" stroke="#5E3C2C" stroke-width="1"/>`).join("")}`;
  } else if (type==="victorian") {
    const col = ["#E9C9D2","#BFD8D1","#F1DDB0","#C9D2E8"][Math.floor(i/STREET.length)%4], trim = "#FBF7EE";
    const bh = 170, top = G - bh;
    s += `<rect x="${x}" y="${top}" width="${w}" height="${bh}" fill="${col}" stroke="var(--line-strong)"/><path d="M${x-6} ${top} L${cx} ${top-60} L${x+w+6} ${top}Z" fill="${shade(col,-.12)}"/><path d="M${x+6} ${top} L${cx} ${top-50} L${x+w-6} ${top}" stroke="${trim}" stroke-width="2" fill="none"/><circle cx="${cx}" cy="${top-24}" r="7" fill="#6E7F8D" stroke="${trim}" stroke-width="2"/>`;
    s += `<path d="M${x+10} ${top+14} h${w*.42} v40 h-${w*.42}Z" fill="#6E7F8D" stroke="${trim}" stroke-width="2"/><path d="M${x+w*.6} ${top+14} h${w*.3} v40 h-${w*.3}Z" fill="#6E7F8D" stroke="${trim}" stroke-width="2"/><path d="M${x} ${top+64} h${w}" stroke="${trim}" stroke-width="3"/>`;
    s += `<rect x="${cx-12}" y="${G-50}" width="24" height="50" fill="${shade(col,-.3)}" stroke="${trim}" stroke-width="2"/>`;
  } else if (type==="london") {
    const bh = 190, top = G - bh;
    s += `<rect x="${x}" y="${top}" width="${w}" height="${bh}" fill="#9A5440" stroke="var(--line-strong)"/>${Array.from({length:Math.floor(bh/6)},(_,k)=>`<line x1="${x}" x2="${x+w}" y1="${top+3+k*6}" y2="${top+3+k*6}" stroke="#8A4836" stroke-width=".6"/>`).join("")}<rect x="${x-3}" y="${top-6}" width="${w+6}" height="7" fill="#EFE7D6"/><rect x="${x+w-30}" y="${top-24}" width="18" height="18" fill="#8A4836"/>${[0,1,2].map(k=>`<rect x="${x+w-28+k*6}" y="${top-30}" width="4" height="6" fill="#C26B45"/>`).join("")}`;
    for (let r=0; top+16+r*38 < G-150; r++) for (let c=0;c<3;c++){ const wx = x+14+c*34; s += `<rect x="${wx}" y="${top+16+r*38}" width="18" height="28" fill="#F4EEE2"/><rect x="${wx+2}" y="${top+18+r*38}" width="14" height="11" fill="#5E6A74"/><rect x="${wx+2}" y="${top+31+r*38}" width="14" height="11" fill="#5E6A74"/>`; }
    s += `<path d="M${cx-13} ${G} V${G-38} a13 13 0 0 1 26 0 V${G}Z" fill="#1E1E22"/><path d="M${cx-13} ${G-38} a13 13 0 0 1 26 0Z" fill="#F4EEE2" opacity=".7"/><circle cx="${cx+7}" cy="${G-20}" r="1.4" fill="#D9A441"/>${Array.from({length:8},(_,k)=>`<path d="M${x+4+k*5} ${G} v-12" stroke="#1E1E22" stroke-width="1.2"/>`).join("")}<path d="M${x+2} ${G-12} h40" stroke="#1E1E22" stroke-width="1.2"/>`;
  } else if (type==="copenhagen") {
    const col = ["#E8B04A","#C9452E","#4F7FA8","#E07A3A"][Math.floor(i/STREET.length)%4], bh = 200, top = G - bh;
    s += `<rect x="${x}" y="${top}" width="${w}" height="${bh}" fill="${col}" stroke="var(--line-strong)"/><path d="M${x} ${top} L${x+16} ${top} L${x+16} ${top-14} L${x+32} ${top-14} L${x+32} ${top-28} L${x+w-32} ${top-28} L${x+w-32} ${top-14} L${x+w-16} ${top-14} L${x+w-16} ${top} L${x+w} ${top}Z" fill="${col}" stroke="var(--line-strong)"/><rect x="${cx-6}" y="${top-22}" width="12" height="14" rx="6" fill="#F4EEE2"/>`;
    for (let r=0; top+14+r*34 < G-150; r++) for (let c=0;c<3;c++) s += `<rect x="${x+14+c*34}" y="${top+14+r*34}" width="18" height="24" fill="#F4EEE2" stroke="${shade(col,-.3)}"/><path d="M${x+23+c*34} ${top+14+r*34} v24 M${x+14+c*34} ${top+26+r*34} h18" stroke="${shade(col,-.3)}" stroke-width=".8"/>`;
    s += `<rect x="${cx-12}" y="${G-44}" width="24" height="44" fill="#2F4436"/>`;
  } else if (type==="delhi") {
    const bh = 160, top = G - bh;
    s += `<rect x="${x}" y="${top}" width="${w}" height="${bh}" fill="#D49A68" stroke="var(--line-strong)"/><rect x="${x-3}" y="${top-6}" width="${w+6}" height="7" fill="#B9804E"/>${[x+16, x+w-16].map(dx=>`<rect x="${dx-8}" y="${top-22}" width="16" height="16" fill="#D49A68"/><path d="M${dx-10} ${top-22} Q${dx} ${top-36} ${dx+10} ${top-22}Z" fill="#EFE2C8"/>`).join("")}`;
    s += `<path d="M${x+14} ${top+30} h${w-28} v20 h-${w-28}Z" fill="#B9804E"/>${[0,1,2].map(k=>`<path d="M${x+20+k*30} ${top+50} v-14 a8 8 0 0 1 16 0 v14Z" fill="#6B4A32"/>`).join("")}<path d="M${x+10} ${top+52} h${w-20}" stroke="#8C5A3C" stroke-width="2"/>`;
    s += `<path d="M${cx-16} ${G} V${G-34} Q${cx} ${G-56} ${cx+16} ${G-34} V${G}Z" fill="#6B4A32"/><path d="M${cx-22} ${G} V${G-36} Q${cx} ${G-64} ${cx+22} ${G-36} V${G}" stroke="#EFE2C8" stroke-width="2" fill="none"/>`;
  } else {
    const bh = 130, top = G - bh;
    s += `<rect x="${x}" y="${top}" width="${w}" height="${bh}" fill="#F7F4EC" stroke="var(--line-strong)"/><path d="M${cx-24} ${top} Q${cx} ${top-34} ${cx+24} ${top}Z" fill="#2F6FA8"/><path d="M${cx} ${top-30} v-8 M${cx-3} ${top-35} h6" stroke="#E6E2D8" stroke-width="1.4"/>`;
    s += `<rect x="${x+14}" y="${top+16}" width="20" height="22" fill="#2F6FA8"/><rect x="${x+w-34}" y="${top+16}" width="20" height="22" fill="#2F6FA8"/><rect x="${cx-12}" y="${G-48}" width="24" height="48" rx="12" fill="#2F6FA8"/>`;
    s += [[cx-22,G-54],[cx-14,G-60],[cx-4,G-62],[cx+8,G-60],[cx+18,G-54],[cx+24,G-46]].map(([bx,by])=>`<circle cx="${bx}" cy="${by}" r="4.5" fill="${by%2?"#C2387A":"#D9519A"}"/>`).join("") + `<ellipse cx="${cx-10}" cy="${G-52}" rx="4" ry="2" fill="#6E8A4A"/>`;
  }
  return s;
}
