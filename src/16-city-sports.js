/* ---------- a sport for every city ---------- */
const SPORT = {paris:"ballet", copenhagen:"ballet", delhi:"cricket", beijing:"badminton", sf:"swimming", tokyo:"baseball", rome:"football", athens:"stadium", london:"tennis", nyc:"basketball"};
const SPORT_VERB = {ballet:"dancing ballet in a studio", cricket:"batting at cricket on the maidan", badminton:"playing badminton in the hutong", swimming:"swimming in the bay", baseball:"at the plate in a park baseball game", football:"kicking a football around the piazza", stadium:"running laps of the marble stadium", tennis:"rallying on a grass tennis court", basketball:"shooting hoops on a street court"};
function outdoorBase(ctx){
  const {place, w, season, phase, uid} = ctx;
  const sky = skyFor(w, phase), R = rnd(place.length*5+1);
  let s = `<defs><linearGradient id="sky-${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient></defs><rect width="360" height="130" fill="url(#sky-${uid})"/>`;
  s += groundSVG(place, season, 360, 124, 176, R) + BACKDROP[place](season, isSnowy(w), rnd(place.length*7+3)) + passersby(place, rnd(place.length*13+5), isWet(w)) + nightLights(rnd(place.length+3), 360, phase);
  return s;
}
const rally = (path, dur, el) => motionOff() ? `<g transform="translate(${path.match(/M(\S+) (\S+)/).slice(1).join(" ")})">${el}</g>` : `<g>${el}<animateMotion dur="${dur}s" repeatCount="indefinite" path="${path}"/></g>`;
const swingR = (vals, kt, dur, begin) => motionOff() ? "" : `<animateTransform attributeName="transform" type="rotate" values="${vals.map(v=>v+" 0 0").join(";")}" keyTimes="${kt}" dur="${dur}s" begin="-${begin||0}s" repeatCount="indefinite"/>`;
function playerAt(av, x, y, s, arms, legs, mirror, extra){ return `<g transform="translate(${x} ${y}) scale(${mirror?-s:s} ${s})">${extra||""}<g class="hero-fig">${figureSVG(av,"stand",false,arms,legs)}</g></g>`; }
function sportSceneBase(p, d, opts, ctx){
  const {doing, focus, w, season, place, phase, av, petKind, shown, uid} = ctx;
  const city = cityOf(place), sport = ctx.sport || SPORT[city] || "stadium";
  const label = opts.label || `${name(p)} ${doing ? SPORT_VERB[sport] : "thinking about "+(focus?focus.name.toLowerCase():"exercise")} in ${PLACES[place].city}.`;
  let s = `<svg class="scene anim" viewBox="0 0 360 300" role="img" aria-label="${esc(label)}"><defs><clipPath id="clip-${uid}"><rect width="360" height="300"/></clipPath></defs><g clip-path="url(#clip-${uid})">`;
  const lav = localAvatar(city, 9), sc = 1.05;
  let body = "", lamps = [], wins = [], indoor = false;
  HELD_OVERRIDE = {R:"", mid:""};
  if (!doing) {
    body += outdoorBase(ctx) + weatherTint(w,360,300) + `<g transform="translate(160 232) scale(1.18)"><g class="hero-fig">${figureSVG(av,"stand",false,"rest")}</g></g>`;
    if (focus) body += `<g transform="translate(232 54)"><g class="bob"><circle cx="-26" cy="44" r="3" fill="#FFFDF8"/><circle cx="-18" cy="32" r="5" fill="#FFFDF8"/><ellipse cx="7.5" cy="8" rx="30" ry="22" fill="#000" opacity=".08"/><ellipse cx="6" cy="6" rx="30" ry="22" fill="#FFFDF8"/><g transform="translate(6 6) scale(.9)">${itemSVG(focus.item)}</g></g></g>`;
  } else switch(sport){
    case "badminton": case "tennis": {
      const big = sport==="tennis";
      body += outdoorBase(ctx);
      if (big) body += `<path d="M0 200 L360 200 L360 300 L0 300Z" fill="#6E9A45"/><path d="M40 204 L320 204 L350 296 L10 296Z" fill="none" stroke="#FBF8F1" stroke-width="2.4"/><path d="M180 204 V296 M24 250 H336" stroke="#FBF8F1" stroke-width="1.6"/>${Array.from({length:6},(_,i)=>`<path d="M0 ${206+i*16} H360" stroke="#7FAA52" stroke-width="7" opacity=".5"/>`).join("")}`;
      else body += `<path d="M20 290 L80 200 L280 200 L340 290Z" fill="none" stroke="#FBF8F1" stroke-width="1.8" opacity=".7"/>`;
      body += `<path d="M184 ${big?218:176} V282 M186 ${big?218:176} V282" stroke="#3B3A36" stroke-width="2.4"/><rect x="${big?60:150}" y="${big?218:180}" width="${big?250:70}" height="${big?20:28}" fill="none" stroke="#3B3A36" stroke-width="1"/>`;
      body += `<g opacity=".55">${Array.from({length:big?26:8},(_,i)=>`<path d="M${(big?60:150)+i*10} ${big?218:180} v${big?20:28}" stroke="#3B3A36" stroke-width=".5"/>`).join("")}${Array.from({length:3},(_,i)=>`<path d="M${big?60:150} ${(big?222:186)+i*6} h${big?250:70}" stroke="#3B3A36" stroke-width=".5"/>`).join("")}</g><path d="M${big?60:150} ${big?218:180} h${big?250:70}" stroke="#FBF8F1" stroke-width="2.4"/>`;
      const rk = `<g transform="translate(32 -88) rotate(-14)"><path d="M0 0 L0 -${big?14:18}" stroke="#3B3A36" stroke-width="1.8"/><ellipse cy="-${big?24:26}" rx="${big?9:6}" ry="${big?11:8}" fill="${big?"#F4EEE2":"none"}" fill-opacity=".25" stroke="${big?"#34476B":"#B8423A"}" stroke-width="1.8"/>${Array.from({length:3},(_,i)=>`<path d="M${-4+i*4} -${big?32:32} v${big?16:12}" stroke="#9A9A9A" stroke-width=".4"/>`).join("")}</g>`;
      HELD_OVERRIDE.R = rk;
      const T = big ? 2.4 : 2.8;
      const proj = big ? `<circle r="3.4" fill="#D8E35A" stroke="#A9B43A" stroke-width=".6"/>` : `<g><path d="M-3 0 L3 0 L5 -6 L-5 -6Z" fill="#FBF8F1" stroke="#C9C1B2" stroke-width=".5"/><circle cy="1" r="2.4" fill="#F4EEE2"/></g>`;
      body += playerAt(av, 92, 236, sc, "racket", null, false, `<g transform="translate(${18} ${-74})">${swingR([0,-70,16,0,0],"0;.06;.14;.3;1",T,0)}</g>`);
      body += playerAt(lav, 280, 236, sc, "racket", null, true);
      body += rally(`M126 128 Q190 ${big?40:20} 256 128 Q190 ${big?40:20} 126 128`, T, proj);
      break; }
    case "cricket": case "baseball": {
      const cr = sport==="cricket";
      body += outdoorBase(ctx);
      if (cr) body += `<ellipse cx="180" cy="270" rx="220" ry="70" fill="#8FB35A" opacity=".55"/><path d="M60 240 L300 168 L320 176 L80 252Z" fill="#D9C48E" opacity=".8"/><g transform="translate(70 240)">${[-5,0,5].map(x=>`<path d="M${x} 0 V-30" stroke="#E8D8B0" stroke-width="2.4"/>`).join("")}<path d="M-6 -30 h12" stroke="#C98A4A" stroke-width="1.6"/></g>`;
      else body += `<path d="M180 300 L60 230 L180 180 L300 230Z" fill="#C98A5A"/><path d="M180 300 L80 236 L180 196 L280 236Z" fill="#8FB35A"/><circle cx="252" cy="222" r="14" fill="#C98A5A"/><path d="M104 272 l8 -4 l8 4 l-8 4Z" fill="#FBF8F1"/>`;
      const bat = cr ? `<g transform="translate(6 -44) rotate(160)"><rect x="-1.6" y="-10" width="3.2" height="12" fill="#3B3A36"/><rect x="-4" y="2" width="8" height="32" rx="2" fill="#E8D2A0" stroke="#C9A870"/></g>` : `<g transform="translate(14 -70) rotate(-150)"><rect x="-1.6" y="-4" width="3.2" height="10" fill="#3B3A36"/><path d="M-2 6 L-3.6 38 Q0 41 3.6 38 L2 6Z" fill="#C98A4A"/></g>`;
      HELD_OVERRIDE.R = bat;
      const T = 3.4;
      body += playerAt(av, 108, 238, sc, cr?"bat":"bbat", null, false);
      const bowl = localAvatar(city, 11);
      body += `<g transform="translate(${cr?296:252} ${cr?178:206}) scale(${cr?.62:.7} ${cr?.62:.7}) scale(-1 1)"><g class="hero-fig">${figureSVG(bowl,"stand",false,cr?"wave":"racket",cr?"walk":null)}</g></g>`;
      if (!cr) body += `<g transform="translate(70 252) scale(.7)">${figureSVG(localAvatar(city,12),"cross",false,"rest")}</g>`;
      body += `<g transform="translate(40 150) scale(.5)">${figureSVG(localAvatar(city,13),"stand",false,"rest")}</g><g transform="translate(330 200) scale(.5)">${figureSVG(localAvatar(city,14),"stand",false,"rest")}</g>`;
      const path = cr ? "M292 128 L190 236 L132 196 Q100 100 30 30" : "M250 150 Q200 150 136 176 Q240 60 370 20";
      body += rally(path, T, `<circle r="3.4" fill="${cr?"#B8423A":"#FBF8F1"}" stroke="${cr?"#8E2F28":"#B8423A"}" stroke-width=".6"/>`);
      if (!motionOff()) body = body.replace(`<g transform="translate(108 238) scale(${sc} ${sc})">`, `<g transform="translate(108 238) scale(${sc} ${sc})"><animateTransform attributeName="transform" type="rotate" values="0 0 0;0 0 0;-14 0 -40;6 0 -40;0 0 0" keyTimes="0;.42;.5;.62;1" dur="${T}s" repeatCount="indefinite" additive="sum"/>`);
      break; }
    case "football": {
      body += outdoorBase(ctx);
      const T = 2.6;
      body += playerAt(av, 110, 232, sc, "walkarms", "walk", false) + `<g transform="translate(268 238) scale(-.86 .86)"><g class="hero-fig">${figureSVG(lav,"stand",false,"walkarms","walk")}</g></g>`;
      const ball = `<g><circle r="7" fill="#FBF8F1" stroke="#2B2B2B" stroke-width=".8"/><path d="M0 -3 l3 2 l-1 3 h-4 l-1 -3Z" fill="#2B2B2B"/>${motionOff()?"":`<animateTransform attributeName="transform" type="rotate" values="0;360" dur=".8s" repeatCount="indefinite"/>`}</g>`;
      body += rally("M130 276 Q190 250 250 278 Q190 250 130 276", T, ball);
      break; }
    case "basketball": {
      body += outdoorBase(ctx);
      body += `<path d="M0 196 H360 V300 H0Z" fill="#5A5F66"/><path d="M60 300 Q180 220 300 300" stroke="#F4EEE2" stroke-width="2" fill="none"/><path d="M0 214 H360" stroke="#F2C14E" stroke-width="2"/>`;
      body += `<g opacity=".55">${Array.from({length:30},(_,i)=>`<path d="M${i*14-60} 120 L${i*14+20} 196 M${i*14+20} 120 L${i*14-60} 196" stroke="#9AA3A9" stroke-width=".6"/>`).join("")}</g><path d="M0 120 H360" stroke="#7E868C" stroke-width="2"/>`;
      body += `<g transform="translate(306 0)"><path d="M14 300 V120" stroke="#3B3A36" stroke-width="5"/><rect x="-24" y="92" width="44" height="30" fill="#FBF8F1" stroke="#3B3A36" stroke-width="2"/><rect x="-10" y="104" width="16" height="12" fill="none" stroke="#B8423A" stroke-width="1.6"/><ellipse cx="-2" cy="122" rx="12" ry="3" fill="none" stroke="#E07A3A" stroke-width="2"/><path d="M-12 122 L-8 136 M-2 125 V137 M8 122 L4 136" stroke="#F4EEE2" stroke-width=".8"/></g>`;
      const T = 4;
      const mv = motionOff() ? "" : `<animateTransform attributeName="transform" type="translate" values="-40 0;40 0;-40 0" dur="5s" repeatCount="indefinite" additive="sum"/>`;
      body += `<g transform="translate(150 234)"><g>${mv}<g transform="scale(${sc})"><g class="hero-fig">${figureSVG(av,"stand",false,"dribble","walk")}</g><g transform="translate(30 0)">${motionOff()?`<circle cy="0" r="7" fill="#E07A3A"/>`:`<circle r="7" fill="#E07A3A" stroke="#8E4A20" stroke-width=".6"><animate attributeName="cy" values="-36;38;-36" keyTimes="0;.5;1" dur=".5s" repeatCount="indefinite"/></circle>`}</g></g></g></g>`;
      body += `<g transform="translate(50 212) scale(.62)">${figureSVG(localAvatar(city,15),"stand",false,"talk")}</g><g transform="translate(250 214) scale(-.6 .6)">${figureSVG(localAvatar(city,16),"stand",false,"wave")}</g>`;
      break; }
    case "swimming": {
      body += outdoorBase(ctx);
      body += `<path d="M0 150 H360 V300 H0Z" fill="#5E8AA0"/><path d="M0 150 H360 V174 H0Z" fill="#7FA2B0"/>${Array.from({length:7},(_,i)=>`<path class="shimmer" style="--del:-${i*.4}s" d="M0 ${168+i*18} Q45 ${163+i*18} 90 ${168+i*18} T180 ${168+i*18} T270 ${168+i*18} T360 ${168+i*18}" stroke="#A9C8D4" stroke-width="1.4" fill="none"/>`).join("")}`;
      const cap = p==="a" ? "#B8423A" : "#7B62A3";
      const stroke = (off) => motionOff() ? "" : `<animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" dur="1.6s" begin="-${off}s" repeatCount="indefinite"/>`;
      const swimmer = `<g><ellipse cx="16" cy="5" rx="26" ry="5" fill="${av.skin}" opacity=".45"/><ellipse cx="38" cy="8" rx="10" ry="4" fill="${p==="a"?"var(--a)":"var(--b)"}" opacity=".6"/><g transform="translate(-6 -2)"><g>${stroke(0)}<path d="M0 0 L-24 -9" stroke="${av.skin}" stroke-width="3.8" stroke-linecap="round"/></g></g><g transform="translate(6 -2)"><g>${stroke(.8)}<path d="M0 0 L-24 -9" stroke="${av.skin}" stroke-width="3.8" stroke-linecap="round" opacity=".85"/></g></g><g transform="translate(-30 -12) scale(.42) translate(-32 -30)">${faceShape(av)}<path d="M19 30 Q19 12 32 12 Q45 12 45 30 Q38 22 32 22 Q26 22 19 30Z" fill="${cap}"/><path d="M24 30 h16" stroke="#2B2B2B" stroke-width="3"/><ellipse cx="27" cy="30" rx="4" ry="3" fill="#7FAED0" opacity=".8"/><ellipse cx="37" cy="30" rx="4" ry="3" fill="#7FAED0" opacity=".8"/></g>${[0,1,2].map(i=>`<circle cx="${40+i*8}" cy="${2-i}" r="2" fill="#FFF" opacity=".8"><animate attributeName="r" values="1;4;1" dur=".8s" begin="-${i*.25}s" repeatCount="indefinite"/></circle>`).join("")}</g>`;
      const mv = motionOff() ? "" : `<animateTransform attributeName="transform" type="translate" values="-110 0;110 0;-110 0" keyTimes="0;.5;1" dur="14s" repeatCount="indefinite"/>`;
      const fl = motionOff() ? "" : `<animateTransform attributeName="transform" type="scale" values="-1 1;1 1" keyTimes="0;.5" calcMode="discrete" dur="14s" repeatCount="indefinite"/>`;
      body += `<g transform="translate(180 222)"><g>${mv}<g>${fl}<g transform="scale(1.6)">${swimmer}</g></g></g></g>`;
      body += `<path d="M0 222 H360" stroke="#FFF" stroke-width="1" opacity=".25"/>`;
      body += `<g transform="translate(300 150)"><g class="bob"><circle r="7" fill="#E07A3A"/><path d="M-7 0 h14" stroke="#FFF" stroke-width="2"/></g></g>`;
      break; }
    case "stadium": {
      const sky = skyFor(w, phase);
      body += `<defs><linearGradient id="sky-${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient></defs><rect width="360" height="300" fill="url(#sky-${uid})"/>`;
      body += `<path d="M150 70 Q170 40 200 36 L300 32 Q330 36 350 70Z" fill="#C9B38E" opacity=".6"/>`;
      for (let i=0;i<10;i++) body += `<path d="M-20 ${92+i*9} Q180 ${72+i*9} 380 ${92+i*9}" stroke="${i%2?"#EAE4D6":"#F7F4EC"}" stroke-width="9" fill="none"/>`;
      body += `<path d="M-20 92 Q180 72 380 92" stroke="#D9D2C2" stroke-width="2" fill="none"/>${Array.from({length:8},(_,i)=>`<path d="M${20+i*46} 84 L${24+i*46} 182" stroke="#D9D2C2" stroke-width="1.4"/>`).join("")}`;
      body += `<rect y="186" width="360" height="114" fill="#C98A5A"/>${[0,1,2,3].map(i=>`<path d="M0 ${200+i*24} H360" stroke="#F4EEE2" stroke-width="1.6" opacity=".7"/>`).join("")}${passersby("philopappou", rnd(4), isWet(w))}`;
      const run = motionOff() ? "" : `<animateTransform attributeName="transform" type="translate" values="-118 0;118 0;-118 0" keyTimes="0;.5;1" dur="6.4s" repeatCount="indefinite"/>`;
      const fl = motionOff() ? "" : `<animateTransform attributeName="transform" type="scale" values="1 1;-1 1" keyTimes="0;.5" calcMode="discrete" dur="6.4s" repeatCount="indefinite"/>`;
      body += `<g transform="translate(180 232)"><g>${run}<g>${fl}<g transform="scale(${sc*1.1}) rotate(8)"><g class="hero-fig">${figureSVG(av,"stand",false,"runarms","run")}</g></g><g transform="translate(-80 50) scale(.78)"><g class="jogbob">${petSVG(petKind,false)}</g></g></g></g></g>`;
      break; }
    case "ballet": default: {
      indoor = true;
      const paris = city==="paris";
      body += room3d({wall: paris?"#EFE6D2":"#F4F2EE", floor:"#C9A27A", floorKind:"planks", ceilCol: paris?"#E2D4B4":"#FBFAF6"});
      body += `<rect x="60" y="34" width="240" height="140" fill="#C9D3D8"/><path d="M80 48 l40 40 M160 50 l50 50 M240 46 l30 30" stroke="#FFF" stroke-width="3" opacity=".4"/>`;
      body += `<g opacity=".28" transform="translate(180 168) scale(-.7 .7)"><g class="ballet-turn">${figureSVG(av,"stand",false,"ballet")}</g></g>`;
      if (paris) body += `<rect x="56" y="30" width="248" height="148" fill="none" stroke="#C9A050" stroke-width="5"/><g transform="translate(180 0)"><path d="M0 0 V10" stroke="#C9A050"/><path d="M-30 18 Q0 4 30 18" stroke="#C9A050" stroke-width="2" fill="none"/>${[-24,-12,0,12,24].map(x=>`<circle cx="${x}" cy="${20+Math.abs(x)/5}" r="2.6" fill="#FFF6DC"/>`).join("")}</g>`; else body += `<rect x="56" y="30" width="248" height="148" fill="none" stroke="#C9A87A" stroke-width="4"/>${windowView(place, w, season, phase, 316, 40, 10, 120, uid+"bw", "pane")}`;
      if (paris) { body += windowView(place, w, season, phase, 4, 30, 26, 150, uid+"bw", "pane"); wins.push([4,30,26,150]); } else wins.push([316,40,10,120]);
      body += `<path d="M34 150 H326" stroke="#B5925A" stroke-width="4"/>${[60,180,300].map(x=>`<path d="M${x} 150 v12" stroke="#8C6A4E" stroke-width="2"/>`).join("")}`;
      body += `<g transform="translate(70 210) scale(.66)">${figureSVG(localAvatar(city,17),"stand",false,"ballet")}</g><g transform="translate(290 210) scale(-.66 .66)">${figureSVG(localAvatar(city,18),"stand",false,"ballet")}</g>`;
      const piro = motionOff() ? "" : `<animateTransform attributeName="transform" type="scale" values="1 1;1 1;-1 1;1 1;-1 1;1 1" keyTimes="0;.55;.62;.69;.76;.83" calcMode="discrete" dur="4s" repeatCount="indefinite"/>`;
      const rise = smil("translate", ["0 0","0 0","0 -8","0 -8","0 0"], 4);
      body += `<g transform="translate(180 236) scale(1.16)"><g>${rise}<g>${piro}<g class="hero-fig">${figureSVG(av,"stand",false,"ballet")}</g></g></g></g>`;
      body += `<g transform="translate(320 262) scale(.8)">${treatSVG2("radio")}</g>`;
      lamps.push([180,24,140]);
    }
  }
  s += body;
  const acc = {bow:shown.has("bow"), scarf:shown.has("scarf"), hat:shown.has("hat"), crown:shown.has("catcrown"), bandana:shown.has("bandana"), bell:shown.has("bell")};
  if (!(doing && sport==="stadium") && !(doing && sport==="swimming")) s += `<g transform="translate(${doing && ["badminton","tennis"].includes(sport) ? 186 : 52} 284) scale(.7)"><g>${smil("translate", ["0 0","10 0","10 0","0 0"], 14)}${petSVG(petKind, false, acc)}</g></g>`;
  if (!indoor) s += weatherFX(w, 360, 300, 125, rnd(3), season, {phase, noTint:true});
  const L = lighting(uid, phase, {indoor, windows:wins, lamps});
  s = s.replace(`<defs><clipPath id="clip-${uid}">`, `<defs>${L.defs}<clipPath id="clip-${uid}">`) + L.s;
  return s + `<rect width="360" height="300" fill="#0B0F08" style="opacity:var(--scene-dim)" pointer-events="none"/></g></svg>`;
}
