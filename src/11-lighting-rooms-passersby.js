/* ---------- lighting, perspective rooms, varied passers-by, sleeper ---------- */
let SIP_SVG = "";
const VP = [180, 112];
function room3d(o){
  const bx0 = 34, bx1 = 326, by = 196, ceil = o.ceil ?? 14;
  let s = `<rect width="360" height="300" fill="${o.wall}"/>`;
  s += `<path d="M0 0 L${bx0} ${ceil} L${bx0} ${by} L0 300Z" fill="${o.side||shade(o.wall,-.12)}"/><path d="M360 0 L${bx1} ${ceil} L${bx1} ${by} L360 300Z" fill="${o.side||shade(o.wall,-.12)}"/>`;
  if (ceil>0) s += `<path d="M0 0 H360 L${bx1} ${ceil} H${bx0}Z" fill="${o.ceilCol||shade(o.wall,-.06)}"/>`;
  s += `<path d="M${bx0} ${by} H${bx1} L360 300 H0Z" fill="${o.floor}"/>`;
  if (o.floorKind==="planks") for (let i=-8;i<=8;i++) s += `<path d="M${180+i*18} ${by} L${180+i*44} 300" stroke="${shade(o.floor,-.14)}" stroke-width="1"/>`;
  if (o.floorKind==="tiles" || o.floorKind==="check") {
    for (let i=-8;i<=8;i++) s += `<path d="M${180+i*18} ${by} L${180+i*44} 300" stroke="${shade(o.floor,-.16)}" stroke-width="1"/>`;
    for (let j=1;j<7;j++){ const y = by + (300-by)*Math.pow(j/7,1.4); s += `<path d="M0 ${y.toFixed(1)} H360" stroke="${shade(o.floor,-.16)}" stroke-width="1"/>`; }
  }
  if (o.floorKind==="tatami") { for (let j=0;j<3;j++){ const y0 = by + (300-by)*Math.pow(j/3,1.3), y1 = by + (300-by)*Math.pow((j+1)/3,1.3); for (let i=0;i<4;i++){ const x = i*90 + (j%2)*45 - 20; s += `<rect x="${x}" y="${y0.toFixed(1)}" width="88" height="${(y1-y0).toFixed(1)}" fill="none" stroke="#5E5A3A" stroke-width="2.2"/>`; } } }
  if (o.floorKind==="mosaic") { for (let i=0;i<40;i++) for (let j=0;j<6;j++) if ((i+j)%3===0) s += `<rect x="${i*9}" y="${by+6+j*17}" width="6" height="6" fill="${shade(o.floor,-.2)}" opacity=".6"/>`; s += `<path d="M20 ${by+20} H340 L352 ${by+90} H8Z" fill="none" stroke="#2B2B2B" stroke-width="2"/><path d="M28 ${by+26} H332 M24 ${by+82} H336" stroke="${shade(o.floor,-.35)}" stroke-dasharray="6 4" stroke-width="2"/>`; }
  if (o.floorKind==="herring") for (let i=0;i<24;i++) for (let j=0;j<6;j++) s += `<path d="M${i*16-(j%2)*8} ${by+j*18} l8 9 l8 -9" stroke="${shade(o.floor,-.18)}" stroke-width="1" fill="none"/>`;
  s += `<path d="M${bx0} ${by} H${bx1}" stroke="${shade(o.wall,-.3)}" stroke-width="2"/><path d="M${bx0} ${ceil} V${by} M${bx1} ${ceil} V${by}" stroke="${shade(o.wall,-.25)}" stroke-width="1.4"/>`;
  return s;
}
/* lighting: window beams, lamp pools, colour grade, vignette */
function lighting(uid, phase, o){
  o = o || {};
  const beamCol = {day:"#FFF4D6", golden:"#FFC77A", dawn:"#FFC9C0", dusk:"#C9B0E8", night:"#BFD0FF"}[phase] || "#FFF4D6";
  const beamOp = {day:.32, golden:.42, dawn:.3, dusk:.14, night:.1}[phase] ?? .3;
  let defs = `<linearGradient id="bm${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${beamCol}" stop-opacity="${beamOp}"/><stop offset="1" stop-color="${beamCol}" stop-opacity="0"/></linearGradient><radialGradient id="vg${uid}" cx=".5" cy=".46" r=".75"><stop offset=".55" stop-color="#1A1208" stop-opacity="0"/><stop offset="1" stop-color="#1A1208" stop-opacity="${o.indoor?.3:.2}"/></radialGradient><radialGradient id="lp${uid}"><stop offset="0" stop-color="#FFD58A" stop-opacity=".55"/><stop offset="1" stop-color="#FFD58A" stop-opacity="0"/></radialGradient>`;
  let s = "";
  const skew = phase==="golden" ? 90 : phase==="dawn" ? -70 : 40;
  (o.windows||[]).forEach(([x,y,w,h]) => { s += `<path d="M${x} ${y+h} L${x+w} ${y+h} L${x+w+skew+40} 300 L${x+skew-10} 300Z" fill="url(#bm${uid})" class="beam"/>`; });
  const night = phase==="night" || phase==="dusk";
  if (night) s += `<rect width="360" height="300" fill="#140E24" opacity="${o.indoor?.16:.08}"/>`;
  (o.lamps||[]).forEach(([x,y,r]) => { s += `<circle cx="${x}" cy="${y}" r="${(r||70)*(night?1.15:.75)}" fill="url(#lp${uid})" opacity="${night?1:.5}" class="glow" style="animation-duration:6s"/>`; });
  if (phase==="golden") s += `<rect width="360" height="300" fill="#F2A65A" opacity=".1"/>`;
  if (phase==="dawn") s += `<rect width="360" height="300" fill="#F2A8B8" opacity=".08"/>`;
  s += `<rect width="360" height="300" fill="url(#vg${uid})" pointer-events="none"/>`;
  return {defs, s};
}
/* richer passers-by */
const WALK_TYPES = ["walker","walker","jogger","cyclist","stroller","couple","kid","elder","shopper","skater","dog","phone"];
function passersby(place, R, wet, W){
  if (!WALKERS.has(place)) return "";
  W = W || 360;
  const tops = ["#B8423A","#34476B","#D9A441","#4F6B45","#9A86C2","#C8743E","#2B2B2B","#7FAED0","#D88C98","#F4EEE2"], skins = ["#F3D3B5","#E2B48E","#C68B5F","#8D5A3B","#6B4129"], hairs = ["#2A211C","#5A3A28","#D9B56E","#CFCBC4","#B5562C"];
  const person = (top, sk, hc, legCol, extra, kid) => { const k = kid ? .7 : 1; return `<g transform="scale(${k})"><g class="walklegs"><path class="lg1" d="M0 0 l-2 7" stroke="${legCol}" stroke-width="1.7" stroke-linecap="round"/><path class="lg2" d="M0 0 l2 7" stroke="${legCol}" stroke-width="1.7" stroke-linecap="round"/></g><rect x="-2.7" y="-9" width="5.4" height="9.5" rx="2" fill="${top}"/><circle cy="-11.6" r="2.6" fill="${sk}"/><path d="M-2.7 -12.4 q2.7 -3.2 5.4 0" fill="${hc}"/>${extra||""}</g>`; };
  let s = "";
  const n = Math.max(3, Math.round(4*W/360));
  for (let i=0;i<n;i++){
    const type = WALK_TYPES[Math.floor(R()*WALK_TYPES.length)];
    const right = R() > .5, y = 117 + R()*8, sc = .85 + R()*.3;
    const top = tops[Math.floor(R()*tops.length)], sk = skins[Math.floor(R()*skins.length)], hc = hairs[Math.floor(R()*hairs.length)], leg = ["#3B3A36","#34476B","#5A4030"][i%3];
    let dur = 34 + R()*26, fig = "";
    switch(type){
      case "jogger": dur *= .45; fig = `<g class="jogbob">${person(top, sk, hc, leg, `<path d="M-2 -7 l-3 3 M2 -7 l3 -3" stroke="${sk}" stroke-width="1.3"/>`)}</g>`; break;
      case "cyclist": dur *= .4; fig = `<g transform="translate(0 2)"><circle cx="-5" cy="2" r="3.6" fill="none" stroke="#3B3A36" stroke-width="1"/><circle cx="5" cy="2" r="3.6" fill="none" stroke="#3B3A36" stroke-width="1"/><path d="M-5 2 L-1 -3 L4 -3 L5 2 M-1 -3 L0 2" stroke="${tops[(i+4)%10]}" stroke-width="1" fill="none"/><rect x="-2.5" y="-12" width="5" height="8" rx="2" fill="${top}" transform="rotate(12 0 -8)"/><circle cx="1" cy="-14" r="2.4" fill="${sk}"/><path d="M-1.6 -15 q2.6 -3 5.2 0" fill="${hc}"/></g>`; break;
      case "stroller": fig = person(top, sk, hc, leg, `<path d="M3 -5 L9 -5" stroke="#3B3A36" stroke-width=".8"/><g transform="translate(12 -1)"><path d="M-4 0 h9 q0 -8 -9 -8Z" fill="${tops[(i+2)%10]}"/><circle cx="-3" cy="3" r="1.6" fill="#3B3A36"/><circle cx="4" cy="3" r="1.6" fill="#3B3A36"/></g>`); break;
      case "couple": fig = person(top, sk, hc, leg) + `<g transform="translate(7 0)">${person(tops[(i+3)%10], skins[(i+2)%5], hairs[(i+1)%5], leg)}</g><path d="M2 -5 q2 2 4 0" stroke="${sk}" stroke-width="1.2" fill="none"/>`; break;
      case "kid": fig = person(top, sk, hc, leg) + `<g transform="translate(7 2)">${person(tops[(i+5)%10], skins[(i+1)%5], hairs[i%5], leg, `<path d="M2 -8 Q3 -16 2 -22" stroke="#7A6A55" stroke-width=".5" fill="none"/><g class="bob"><ellipse cx="2" cy="-25" rx="3.2" ry="4" fill="${["#E0567A","#F2C14E","#7FAED0"][i%3]}"/></g>`, true)}</g>`; break;
      case "elder": dur *= 1.5; fig = person("#8C8F96", sk, "#E6E3DC", leg, `<path d="M3 -5 L5 7" stroke="#6B4A32" stroke-width="1.1"/>`); break;
      case "shopper": fig = person(top, sk, hc, leg, `<rect x="2.6" y="-5" width="4.6" height="5" rx="1" fill="${tops[(i+6)%10]}"/><rect x="-7" y="-5" width="4.4" height="5" rx="1" fill="#F4EEE2"/>`); break;
      case "skater": dur *= .5; fig = `<g transform="translate(0 -1)">${person(top, sk, hc, leg)}</g><rect x="-6" y="7" width="12" height="2" rx="1" fill="#B8423A"/><circle cx="-4" cy="10" r="1" fill="#3B3A36"/><circle cx="4" cy="10" r="1" fill="#3B3A36"/>`; break;
      case "dog": fig = person(top, sk, hc, leg, `<path d="M-1 -4 L-8 0" stroke="#3B3A36" stroke-width=".5"/>`) + `<g transform="translate(-10 3)"><ellipse rx="4" ry="2.2" fill="${["#C98A4A","#2B2B2B","#F4EEE2"][i%3]}"/><circle cx="4" cy="-1.6" r="1.8" fill="${["#C98A4A","#2B2B2B","#F4EEE2"][i%3]}"/><path d="M-1 2 v2 M2 2 v2" stroke="#3B3A36" stroke-width=".8"/></g>`; break;
      case "phone": fig = person(top, sk, hc, leg, `<rect x="2" y="-13" width="2" height="3.4" rx=".5" fill="#2B2B2B"/>`); break;
      default: fig = person(top, sk, hc, leg);
    }
    if (wet && type!=="cyclist") fig += `<path d="M2 -6 V-18" stroke="#3B3A36" stroke-width=".7"/><path d="M-7 -17 Q2 -25 11 -17Z" fill="${tops[(i+3)%10]}"/>`;
    s += `<g class="walkacross" style="--dx:${right ? W+60 : -(W+60)}px;--dur:${dur.toFixed(0)}s;--del:-${(R()*dur).toFixed(1)}s"><g transform="translate(${right ? -20 : W+20} ${y.toFixed(1)}) scale(${right?sc:-sc} ${sc})">${fig}</g></g>`;
  }
  return s;
}
/* a buddy asleep, lying on a pillow under a blanket; origin = middle of the bed surface */
function sleeperSVG(av, blanket, len){
  len = len || 150;
  const head = `<g transform="translate(${-len/2+20} -26) rotate(-74) scale(.78) translate(-32 -30)">${headBack(av)}${faceShape(av)}${headFront(av)}${faceFeatures({...av, eyes:"sleepy"})}${headAcc({...av, glasses:"none"})}</g>`;
  const breathe = motionOff() ? "" : `<animateTransform attributeName="transform" type="scale" values="1 1;1 1.08;1 1" dur="4.6s" repeatCount="indefinite" additive="sum"/>`;
  return `<ellipse cx="${-len/2+18}" cy="-12" rx="28" ry="12" fill="#FBF8F1" stroke="#E2D9C6"/>${head}<g transform="translate(${len*.12} 0)"><g>${breathe}<path d="M${-len*.42} 0 Q${-len*.42} -34 ${-len*.1} -32 Q${len*.2} -30 ${len*.38} -18 Q${len*.46} -12 ${len*.44} 0Z" fill="${blanket}"/><path d="M${-len*.34} -22 Q${0} -30 ${len*.3} -14" stroke="#FFF" stroke-width="1.2" opacity=".35" fill="none"/></g></g><path d="M${-len/2+34} -16 q10 -6 18 -2" stroke="${av.skin}" stroke-width="6" stroke-linecap="round" fill="none"/>`;
}
