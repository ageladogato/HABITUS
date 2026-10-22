/* ---------- upgraded sports: ballet, badminton & tennis, cricket, swimming ---------- */
function sceneShell(uid, label, body, ctx, o){
  o = o || {};
  const L = lighting(uid, ctx.phase, {indoor:!!o.indoor, windows:o.wins||[], lamps:o.lamps||[]});
  let s = `<svg class="scene anim" viewBox="0 0 360 300" role="img" aria-label="${esc(label)}"><defs>${L.defs}<clipPath id="clip-${uid}"><rect width="360" height="300"/></clipPath></defs><g clip-path="url(#clip-${uid})">${body}`;
  if (!o.indoor) s += weatherFX(ctx.w, 360, 300, 125, rnd(3), ctx.season, {phase:ctx.phase, noTint:true});
  return s + L.s + `<rect width="360" height="300" fill="#0B0F08" style="opacity:var(--scene-dim)" pointer-events="none"/></g></svg>`;
}
const accOf = shown => ({bow:shown.has("bow"), scarf:shown.has("scarf"), hat:shown.has("hat"), crown:shown.has("catcrown"), bandana:shown.has("bandana"), bell:shown.has("bell")});
const petIdle = (kind, acc, x, y) => `<g transform="translate(${x} ${y}) scale(.7)"><g>${smil("translate", ["0 0","10 0","10 0","0 0"], 14)}${petSVG(kind, false, acc)}</g></g>`;
const petChase = (kind, acc, x, y, path, dur, begin) => motionOff() ? petIdle(kind, acc, x, y) : `<g transform="translate(${x} ${y}) scale(.7)"><g><animateTransform attributeName="transform" type="translate" values="${path}" dur="${dur}s" begin="-${begin||0}s" repeatCount="indefinite"/><g class="jogbob">${petSVG(kind, false, acc)}</g></g></g>`;
function sportScene(p, d, opts, ctx){
  const city = cityOf(ctx.place), sport = ctx.sport || SPORT[city] || "stadium";
  if (!["ballet","badminton","tennis","cricket","swimming"].includes(sport)) return sportSceneBase(p, d, opts, ctx);
  const {w, season, place, phase, av, petKind, shown, uid} = ctx, acc = accOf(shown);
  const label = opts.label || `${name(p)} ${SPORT_VERB[sport]} in ${PLACES[place].city}.`;
  const pc = p==="a" ? "var(--a)" : "var(--b)", pcs = p==="a" ? "var(--a-soft)" : "var(--b-soft)";
  let body = "", o = {};
  if (sport==="ballet") {
    const paris = city==="paris";
    body += room3d({wall: paris?"#EFE6D2":"#F4F2EE", floor:"#C9A27A", floorKind:"planks", ceilCol: paris?"#E2D4B4":"#FBFAF6"});
    body += `<rect x="60" y="34" width="240" height="136" fill="#C9D3D8"/><path d="M80 48 l40 40 M160 50 l50 50 M240 46 l30 30" stroke="#FFF" stroke-width="3" opacity=".4"/><rect x="56" y="30" width="248" height="144" fill="none" stroke="${paris?"#C9A050":"#C9A87A"}" stroke-width="${paris?5:4}"/>`;
    if (paris) body += `<g transform="translate(180 0)"><path d="M0 0 V10" stroke="#C9A050"/><path d="M-30 18 Q0 4 30 18" stroke="#C9A050" stroke-width="2" fill="none"/>${[-24,-12,0,12,24].map(x=>`<circle cx="${x}" cy="${20+Math.abs(x)/5}" r="2.6" fill="#FFF6DC"/>`).join("")}</g>`;
    body += windowView(place, w, season, phase, 4, 30, 26, 150, uid+"bw", "pane"); o.wins = [[4,30,26,150]];
    body += `<g opacity=".26" transform="translate(180 166) scale(-.72 .72)">${figureSVG(av,"stand",false,"ballet","battement")}</g>`;
    body += `<path d="M34 150 H326" stroke="#B5925A" stroke-width="4"/>${[60,180,300].map(x=>`<path d="M${x} 150 v12" stroke="#8C6A4E" stroke-width="2"/>`).join("")}`;
    body += `<g transform="translate(304 200)"><rect x="-26" y="-44" width="52" height="44" rx="3" fill="#3A2A22"/><rect x="-24" y="-20" width="48" height="5" fill="#FBF7EE"/>${Array.from({length:8},(_,i)=>`<rect x="${-22+i*6}" y="-20" width="2.4" height="3" fill="#111"/>`).join("")}<path d="M-22 0 v14 M22 0 v14" stroke="#3A2A22" stroke-width="3"/></g><g transform="translate(304 222) scale(.62)">${figureSVG(withLook(localAvatar(city,40),{top:"cardigan"}),"bench",false,"piano")}</g>`;
    body += `<g transform="translate(58 212) scale(.66)">${figureSVG(withLook(localAvatar(city,41),{top:"turtleneck",topc:"#2B2B2B",bottom:"trousers",botc:"#2B2B2B"}),"stand",false,"clap")}</g>`;
    body += `<g transform="translate(108 206) scale(.56)">${figureSVG(localAvatar(city,17),"stand",false,"ballet","battement")}</g><g transform="translate(252 206) scale(-.56 .56)">${figureSVG(localAvatar(city,18),"stand",false,"ballet","battement")}</g>`;
    const piro = motionOff() ? "" : `<animateTransform attributeName="transform" type="scale" values="1 1;-1 1;1 1;-1 1;1 1" keyTimes="0;.86;.89;.92;.95" calcMode="discrete" dur="4s" repeatCount="indefinite"/>`;
    const rise = smil("translate", ["0 0","0 0","0 -4","0 -4","0 -10","0 0"], 4);
    const tutu = av.body==="masc" ? "" : `<ellipse cx="0" cy="-33" rx="30" ry="7" fill="${pcs}" opacity=".7"/><ellipse cx="0" cy="-35" rx="24" ry="5" fill="#FFF" opacity=".35"/>`;
    body += `<g transform="translate(180 236) scale(1.16)"><g>${rise}<g>${piro}<g class="hero-fig">${figureSVG(av,"stand",false,"ballet","battement")}${tutu}</g></g></g></g>`;
    body += [[-40,-120],[44,-150]].map(([x,y],i)=>`<g transform="translate(${180+x} ${236+y})"><g class="float" style="animation-delay:-${i*1.6}s"><text font-size="15" fill="#B5925A" font-family="Georgia, serif">${i?"♫":"♪"}</text></g></g>`).join("");
    body += petIdle(petKind, acc, 60, 284);
    o.indoor = true; o.lamps = [[180,24,150],[304,170,70]];
  }
  else if (sport==="badminton" || sport==="tennis") {
    const big = sport==="tennis", T = big ? 2.2 : 2.6;
    body += outdoorBase(ctx);
    if (big) body += `<path d="M0 196 L360 196 L360 300 L0 300Z" fill="#6E9A45"/>${Array.from({length:6},(_,i)=>`<path d="M0 ${200+i*17} H360" stroke="#7FAA52" stroke-width="8" opacity=".5"/>`).join("")}<path d="M40 200 L320 200 L350 296 L10 296Z" fill="none" stroke="#FBF8F1" stroke-width="2.4"/><path d="M180 200 V296 M24 250 H336" stroke="#FBF8F1" stroke-width="1.6"/>`;
    else body += `<path d="M30 296 L84 200 L276 200 L330 296Z" fill="#9AB89A" opacity=".35"/><path d="M30 296 L84 200 L276 200 L330 296Z" fill="none" stroke="#FBF8F1" stroke-width="2" opacity=".8"/><path d="M180 200 V296" stroke="#FBF8F1" stroke-width="1.4" opacity=".7"/>`;
    const nt = big ? 214 : 178, nh = big ? 20 : 30, nx0 = big ? 50 : 140, nw = big ? 260 : 80;
    body += `<path d="M${nx0} ${nt} V282 M${nx0+nw} ${nt} V282" stroke="#3B3A36" stroke-width="2.6"/><g opacity=".55">${Array.from({length:Math.floor(nw/8)},(_,i)=>`<path d="M${nx0+i*8} ${nt} v${nh}" stroke="#3B3A36" stroke-width=".5"/>`).join("")}${[1,2,3].map(i=>`<path d="M${nx0} ${nt+i*nh/4} h${nw}" stroke="#3B3A36" stroke-width=".5"/>`).join("")}</g><path d="M${nx0} ${nt} h${nw}" stroke="#FBF8F1" stroke-width="2.6"/>`;
    HELD_OVERRIDE.R = `<g transform="translate(32 -88) rotate(-14)"><path d="M0 0 L0 -${big?14:18}" stroke="#3B3A36" stroke-width="1.8"/><ellipse cy="-${big?24:26}" rx="${big?9:6}" ry="${big?11:8}" fill="#F4EEE2" fill-opacity=".2" stroke="${big?"#34476B":"#B8423A"}" stroke-width="1.8"/>${[-3,0,3].map(x=>`<path d="M${x} -${big?33:33} v${big?18:14}" stroke="#9A9A9A" stroke-width=".4"/>`).join("")}</g>`;
    const prevR = ARM_MOTION.racket;
    ARM_MOTION.racket = {R:[[-70,22,0,0,-70],T,0,"0;.08;.2;.9;1"]};
    const jump = motionOff() ? "" : `<animateTransform attributeName="transform" type="translate" values="0 -14;0 0;0 0;0 -14" keyTimes="0;.12;.88;1" dur="${T}s" repeatCount="indefinite" additive="sum"/>`;
    const step = motionOff() ? "" : `<animateTransform attributeName="transform" type="translate" values="-10 0;10 0;-10 0" dur="${T*2}s" repeatCount="indefinite" additive="sum"/>`;
    body += `<g transform="translate(96 236)"><g>${step}<g>${jump}<g transform="scale(1.06)"><g class="hero-fig">${figureSVG(av,"stand",false,"racket")}</g></g></g></g></g>`;
    ARM_MOTION.racket = {R:[[-70,22,0,0,-70],T,T/2,"0;.08;.2;.9;1"]};
    const jump2 = motionOff() ? "" : `<animateTransform attributeName="transform" type="translate" values="0 -10;0 0;0 0;0 -10" keyTimes="0;.12;.88;1" dur="${T}s" begin="-${T/2}s" repeatCount="indefinite" additive="sum"/>`;
    body += `<g transform="translate(272 236)"><g>${jump2}<g transform="scale(-1.02 1.02)">${figureSVG(localAvatar(city,9),"stand",false,"racket")}</g></g></g>`;
    ARM_MOTION.racket = prevR;
    const proj = big ? `<circle r="3.4" fill="#D8E35A" stroke="#A9B43A" stroke-width=".6"/>` : `<g><path d="M-3 0 L3 0 L5 -7 L-5 -7Z" fill="#FBF8F1" stroke="#C9C1B2" stroke-width=".5"/><circle cy="1.2" r="2.4" fill="#E8DCC4"/></g>`;
    body += motionOff() ? `<g transform="translate(180 60)">${proj}</g>` : `<g>${proj}<animateMotion dur="${T}s" repeatCount="indefinite" rotate="auto" keyPoints="0;.5;1" keyTimes="0;.5;1" calcMode="spline" keySplines=".3 0 .7 1;.3 0 .7 1" path="M130 128 Q190 ${big?50:26} 248 128 Q190 ${big?50:26} 130 128"/></g>`;
    body += `<g transform="translate(180 290)"><ellipse rx="6" ry="2" fill="#000" opacity=".15">${motionOff()?"":`<animate attributeName="cx" values="-50;50;-50" dur="${T}s" repeatCount="indefinite"/>`}</ellipse></g>`;
    body += petIdle(petKind, acc, 40, 286);
  }
  else if (sport==="cricket") {
    const T = 3.6;
    body += outdoorBase(ctx) + `<ellipse cx="180" cy="270" rx="230" ry="74" fill="#8FB35A" opacity=".55"/><path d="M70 246 L300 170 L322 178 L92 258Z" fill="#D9C48E" opacity=".85"/><path d="M84 244 l18 -6 M286 176 l18 -6" stroke="#FBF8F1" stroke-width="2"/>`;
    body += `<g transform="translate(66 244)">${[-5,0,5].map(x=>`<path d="M${x} 0 V-30" stroke="#E8D8B0" stroke-width="2.4"/>`).join("")}<path d="M-6 -30 h12" stroke="#C98A4A" stroke-width="1.6"/></g><g transform="translate(304 176) scale(.6)">${[-5,0,5].map(x=>`<path d="M${x} 0 V-30" stroke="#E8D8B0" stroke-width="2.4"/>`).join("")}</g>`;
    HELD_OVERRIDE.R = `<g transform="translate(6 -44) rotate(160)"><rect x="-1.6" y="-10" width="3.2" height="12" fill="#3B3A36"/><rect x="-4" y="2" width="8" height="32" rx="2" fill="#E8D2A0" stroke="#C9A870"/></g>`;
    const prevB = ARM_MOTION.bat;
    ARM_MOTION.bat = {L:[[0,0,-90,30,0],T,0,"0;.46;.56;.68;1"], R:[[0,0,-90,30,0],T,0,"0;.46;.56;.68;1"]};
    body += `<g transform="translate(104 240) scale(1.06)"><g class="hero-fig">${figureSVG(av,"stand",false,"bat")}</g></g>`;
    ARM_MOTION.bat = prevB;
    const run = motionOff() ? "" : `<animateTransform attributeName="transform" type="translate" values="40 -10;0 0;0 0;40 -10" keyTimes="0;.28;.4;1" dur="${T}s" repeatCount="indefinite" additive="sum"/>`;
    body += `<g transform="translate(286 178)"><g>${run}<g transform="scale(-.66 .66)"><g class="hero-fig">${figureSVG(localAvatar(city,11),"stand",false,"bowl","run")}</g></g></g></g>`;
    body += `<g transform="translate(36 160) scale(.46)">${figureSVG(localAvatar(city,13),"stand",false,"clap")}</g><g transform="translate(336 222) scale(.5)">${figureSVG(localAvatar(city,14),"stand",false,"rest")}</g><g transform="translate(200 150) scale(.4)">${figureSVG(localAvatar(city,19),"stand",false,"rest")}</g>`;
    body += motionOff() ? `<circle cx="150" cy="200" r="3.4" fill="#B8423A"/>` : `<g><circle r="3.4" fill="#B8423A" stroke="#8E2F28" stroke-width=".6"/><animateMotion dur="${T}s" repeatCount="indefinite" keyPoints="0;0;.45;.62;1" keyTimes="0;.3;.48;.56;1" calcMode="linear" path="M292 118 L196 232 L128 198 Q90 100 20 20"/></g>`;
    body += petIdle(petKind, acc, 40, 286);
  }
  else if (sport==="swimming") {
    const bay = city==="sf";
    if (bay) body += outdoorBase(ctx) + `<path d="M0 150 H360 V300 H0Z" fill="#5E8AA0"/><path d="M0 150 H360 V172 H0Z" fill="#7FA2B0"/>`;
    else {
      body += outdoorBase(ctx) + `<rect y="150" width="360" height="150" fill="#EDE7DA"/><path d="M0 162 H360" stroke="#D9D2C2" stroke-width="2"/>`;
      body += `<rect x="0" y="170" width="360" height="130" fill="#4FA3C8"/><rect x="0" y="170" width="360" height="12" fill="#3B8BB0"/>${[0,1,2,3].map(i=>`<path d="M0 ${196+i*28} H360" stroke="#F4EEE2" stroke-width="3" stroke-dasharray="6 6"/><path d="M0 ${196+i*28} H360" stroke="#B8423A" stroke-width="3" stroke-dasharray="6 6" stroke-dashoffset="6"/>`).join("")}`;
      body += Array.from({length:10},(_,i)=>`<path class="shimmer" style="--del:-${(i*.37).toFixed(2)}s" d="M${(i*41)%340} ${186+(i*23)%100} q8 -4 16 0 q8 4 16 0" stroke="#BFE3F2" stroke-width="1.4" fill="none"/>`).join("");
      body += [[0,182,9],[1,238,13]].map(([k,y,dur])=>{ const lane = localAvatar(city,90+k); const mv = motionOff()?"":`<animateTransform attributeName="transform" type="translate" values="-160 0;160 0;-160 0" dur="${dur}s" begin="-${k*4}s" repeatCount="indefinite"/>`; return `<g transform="translate(180 ${y})"><g>${mv}<g transform="scale(.8)"><circle r="5" fill="${["#E07A5F","#F2C14E"][k]}"/><path d="M-4 2 l-12 -4" stroke="${lane.skin}" stroke-width="3" stroke-linecap="round"/><ellipse cx="12" cy="3" rx="16" ry="3" fill="${lane.skin}" opacity=".4"/></g></g></g>`; }).join("");
      body += `<g transform="translate(320 162)"><path d="M0 0 V-40 M10 0 V-40 M0 -14 h10 M0 -28 h10" stroke="#C9C9C9" stroke-width="2.4"/></g>`;
    }
    for (let i=0;i<7;i++) if (bay) body += `<path class="shimmer" style="--del:-${i*.4}s" d="M0 ${168+i*18} Q45 ${163+i*18} 90 ${168+i*18} T180 ${168+i*18} T270 ${168+i*18} T360 ${168+i*18}" stroke="#A9C8D4" stroke-width="1.4" fill="none"/>`;
    const cap = p==="a" ? "#B8423A" : "#7B62A3";
    const stroke = (off) => motionOff() ? "" : `<animateTransform attributeName="transform" type="rotate" values="0 0 0;-360 0 0" dur="1.4s" begin="-${off}s" repeatCount="indefinite"/>`;
    const kick = motionOff() ? "" : `<animateTransform attributeName="transform" type="rotate" values="-14 0 0;14 0 0;-14 0 0" dur=".45s" repeatCount="indefinite"/>`;
    const breath = motionOff() ? "" : `<animateTransform attributeName="transform" type="rotate" values="0 0 0;0 0 0;-26 0 0;0 0 0" keyTimes="0;.6;.75;1" dur="2.8s" repeatCount="indefinite" additive="sum"/>`;
    const swimmer = `<g><path d="M-6 0 Q20 -4 46 2 Q20 8 -6 6Z" fill="${av.skin}" opacity=".5"/><path d="M8 -1 Q20 -3 30 0 L30 6 Q20 7 8 6Z" fill="${pc}" opacity=".6"/><g transform="translate(46 2)"><g>${kick}<path d="M0 0 L14 -2" stroke="${av.skin}" stroke-width="3.4" stroke-linecap="round" opacity=".55"/></g></g><g transform="translate(46 5)"><g>${kick.replace('-14 0 0;14 0 0;-14 0 0','14 0 0;-14 0 0;14 0 0')}<path d="M0 0 L14 2" stroke="${av.skin}" stroke-width="3.4" stroke-linecap="round" opacity=".45"/></g></g>${[0,1,2].map(i=>`<circle cx="${58+i*5}" cy="${-1+i}" r="2" fill="#FFF" opacity=".85"><animate attributeName="r" values="1;3.6;1" dur=".45s" begin="-${i*.15}s" repeatCount="indefinite"/></circle>`).join("")}<g transform="translate(-2 -1)"><g>${stroke(0)}<path d="M0 0 L-20 -7" stroke="${av.skin}" stroke-width="3.6" stroke-linecap="round"/></g></g><g transform="translate(6 -1)"><g>${stroke(.7)}<path d="M0 0 L-20 -7" stroke="${av.skin}" stroke-width="3.6" stroke-linecap="round" opacity=".8"/></g></g><g transform="translate(-8 -3)"><g>${breath}<g transform="scale(.36) translate(-32 -30)">${faceShape(av)}<path d="M19 30 Q19 12 32 12 Q45 12 45 30 Q38 22 32 22 Q26 22 19 30Z" fill="${cap}"/><path d="M22 30 h20" stroke="#2B2B2B" stroke-width="3"/><ellipse cx="27" cy="30" rx="4.4" ry="3.4" fill="#7FAED0"/><ellipse cx="37" cy="30" rx="4.4" ry="3.4" fill="#7FAED0"/></g></g></g><ellipse cx="-14" cy="0" rx="10" ry="3" fill="#FFF" opacity=".5"><animate attributeName="rx" values="6;14;6" dur=".7s" repeatCount="indefinite"/></ellipse></g>`;
    const mv = motionOff() ? "" : `<animateTransform attributeName="transform" type="translate" values="-100 0;100 0;-100 0" keyTimes="0;.5;1" dur="12s" repeatCount="indefinite"/>`;
    const fl = motionOff() ? "" : `<animateTransform attributeName="transform" type="scale" values="-1 1;1 1" keyTimes="0;.5" calcMode="discrete" dur="12s" repeatCount="indefinite"/>`;
    body += `<g transform="translate(180 ${bay?222:212})"><g>${mv}<g>${fl}<g transform="scale(1.9)">${swimmer}</g></g></g></g>`;
    body += bay ? `<g transform="translate(300 150)"><g class="bob"><circle r="7" fill="#E07A3A"/><path d="M-7 0 h14" stroke="#FFF" stroke-width="2"/></g></g>` : `<g transform="translate(40 158) scale(.6)">${petSVG(petKind,false,acc)}</g><g transform="translate(90 160) scale(.5)">${figureSVG(localAvatar(city,95),"cross",false,"sip")}</g>`;
  }
  return sceneShell(uid, label, body, ctx, o);
}
