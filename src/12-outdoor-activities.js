/* ---------- activity scenes (360 x 300) ---------- */
const ACT = {
  read:{pose:"bench", arms:"book", prop:"bench", verb:"reading on a bench"},
  move:{pose:"stand", arms:"runarms", legs:"run", prop:"track", verb:"out for a run"},
  run:{pose:"stand", arms:"runarms", legs:"run", prop:"track", verb:"out for a run"},
  walk:{pose:"stand", arms:"walkarms", legs:"walk", prop:"leash", verb:"out for a walk"},
  cycle:{pose:"bench", arms:"bars", legs:"cycle", prop:"bike", verb:"cycling through the city"},
  yoga:{pose:"stand", arms:"yoga", prop:"mat", verb:"flowing through yoga"},
  dance:{pose:"stand", arms:"dance", legs:"walk", prop:"dance", verb:"dancing in the street"},
  jacks:{pose:"stand", arms:"jack", legs:"jack", prop:"mat", verb:"working up a sweat"},
  sleep:{pose:"cross", arms:"sleep", prop:"night", verb:"tucked in for the night"},
  wake:{pose:"stand", arms:"stretch", prop:"sunrise", verb:"stretching at sunrise"},
  mindful:{pose:"cross", arms:"meditate", prop:"picnic", verb:"meditating"},
  journal:{pose:"cross", arms:"write", prop:"picnic", verb:"journaling on a picnic blanket"},
  study:{pose:"bench", arms:"laptop", prop:"desk", verb:"deep in focus"},
  language:{pose:"stand", arms:"talk", prop:"local", verb:"chatting with a local"},
  nourish:{pose:"stand", arms:"stir", prop:"stall", verb:"cooking at a market stall"},
  hydrate:{pose:"stand", arms:"drink", prop:"stall", verb:"topping up on water"},
  unplug:{pose:"stand", arms:"kite", prop:"phonebox", verb:"phone locked away, flying a kite"},
  connect:{pose:"bench", arms:"phone", prop:"hearts", verb:"calling someone they love"}
};
const actFor = h => { if (!h) return "read";
  if (h.style) return h.style;
  if (h.cat==="connect") { const n = h.name.toLowerCase(); if (/date|dinner|romant/.test(n)) return "social_date"; if (/movie|cinema|film/.test(n)) return "social_cinema"; if (/coffee|catch|brunch|tea with/.test(n)) return "social_coffee"; if (/call|phone|text|facetime|ring/.test(n)) return "connect"; return "social_picnic"; }
  if (h.cat==="move") { const n = h.name.toLowerCase(); if (/bike|cycl/.test(n)) return "cycle"; if (/yoga|stretch|pilates/.test(n)) return "yoga"; if (/ballet/.test(n)) return "sport_ballet"; if (/badminton/.test(n)) return "sport_badminton"; if (/tennis/.test(n)) return "sport_tennis"; if (/cricket/.test(n)) return "sport_cricket"; if (/swim|lap|pool/.test(n)) return "sport_swimming"; if (/basketball|hoops/.test(n)) return "sport_basketball"; if (/football|soccer/.test(n)) return "sport_football"; if (/baseball/.test(n)) return "sport_baseball"; if (/run|jog|marathon/.test(n)) return "run"; if (/danc|salsa|zumba|tango|hip ?hop|swing/.test(n)) return "dance"; if (/walk|step|hike|stroll/.test(n)) return "walk"; if (/gym|workout|lift|jump|hiit|strength/.test(n)) return "jacks"; return "move"; } if (h.cat==="sleep" && /wake|morning|rise/i.test(h.name)) return "wake"; if (h.cat==="nourish" && /water|drink|hydrat/i.test(h.name)) return "hydrate"; return h.cat; };
const LOCAL_TALK = {
  beijing:["Nǐ hǎo!","Nǐ hǎo! Nǐ hǎo ma?"], tokyo:["Konnichiwa!","Konnichiwa! Ogenki desu ka?"], paris:["Bonjour\u202f!","Bonjour\u202f! Ça va\u202f?"], rome:["Ciao!","Ciao! Come stai?"],
  nyc:["Hey, how’s it going?","Not bad, you?"], sf:["Hi there!","Hey! Gorgeous day."], athens:["Yiá sou!","Yiá sou! Ti kánis?"], london:["Hiya!","Alright? Lovely day."],
  copenhagen:["Hej!","Hej! Hvordan går det?"], delhi:["Namaste!","Namaste! Aap kaise hain?"]
};
const CITY_DISH = {beijing:"dumplings", tokyo:"onigiri", paris:"croissants", rome:"pizza", nyc:"bagel", sf:"sourdough", athens:"feta", london:"cake", copenhagen:"croissants", delhi:"teapot"};
function localAvatar(city, k){
  const R = rnd(city.length*131 + city.charCodeAt(0) + (k||0)*977), pick = k => AV_OPTS[k][Math.floor(R()*AV_OPTS[k].length)][0];
  const o = {}; for (const k in AV_OPTS) o[k] = pick(k);
  o.facial = R() < .7 ? "none" : o.facial; o.head = R() < .6 ? "none" : o.head; o.glasses = R() < .6 ? "none" : o.glasses; o.neck = "none";
  if (o.body==="fem") o.facial = "none";
  o._look = {outfit:null, wear:{}};
  return o;
}
function bubble(x, y, text, cls, flip){
  const w = Math.max(44, text.length*6.2 + 18);
  const bx = flip ? x - w + 14 : x - 14;
  return `<g class="${cls}"><rect x="${bx+1.5}" y="${y-20}" width="${w}" height="22" rx="11" fill="#000" opacity=".08"/><rect x="${bx}" y="${y-22}" width="${w}" height="22" rx="11" fill="#FFFDF8"/><path d="M${x-4} ${y-1} L${x+1} ${y+7} L${x+5} ${y-1}Z" fill="#FFFDF8"/><text x="${bx+w/2}" y="${y-7.5}" text-anchor="middle" font-size="10.5" font-weight="500" font-family="Instrument Sans, sans-serif" fill="#3B2E22">${esc(text)}</text></g>`;
}
const POSE_Y = {stand:232, jog:234, bench:254, cross:290};
const POSE_SC = {stand:1.22, jog:1.22, bench:1.18, cross:1.25};
function benchSVG(cx, seatY){ return `<g><ellipse cx="${cx}" cy="${seatY+36}" rx="84" ry="6" fill="#000" opacity=".1"/>${[46,36].map(y=>`<rect x="${cx-72}" y="${seatY-y}" width="144" height="7" rx="3.5" fill="#B07A50"/><path d="M${cx-68} ${seatY-y+2} h136" stroke="#C99468" stroke-width="1" stroke-linecap="round"/>`).join("")}<rect x="${cx-76}" y="${seatY-2}" width="152" height="8" rx="4" fill="#A06C44"/><path d="M${cx-72} ${seatY} h144" stroke="#C99468" stroke-width="1" stroke-linecap="round"/><path d="M${cx-64} ${seatY+6} q-2 14 -4 30 M${cx+64} ${seatY+6} q2 14 4 30 M${cx-66} ${seatY-46} V${seatY} M${cx+66} ${seatY-46} V${seatY}" stroke="#3B3A36" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`; }
function sceneOutdoor(p, d, opts){
  opts = opts || {};
  const hs = opts.empty ? [] : habits().filter(h => applies(h,p));
  const metN = hs.filter(h => met(d,p,h)).length, frac = opts.frac ?? (hs.length ? metN/hs.length : 0);
  const r = opts.empty ? .9 : weekRate(p,d), w = opts.w || wxFor(r, d, p), season = opts.season || seasonFor(d), place = opts.place || placeOf(p), city = cityOf(place);
  const focus = opts.habit || null;
  const actKey = opts.act || actFor(focus), A = ACT[actKey] || ACT.read;
  const doing = opts.doing ?? true;
  const pk = opts.empty ? {} : (S.picnic[p] || {}), shown = new Set(pk.shown || []);
  const av = opts.av || avatarOf(p);
  const R = rnd(p==="a"?11:23), uid = "s"+p+(opts.uid||"");
  const wet = isWet(w) || isSnowy(w);
  const phase = opts.phase || (opts.empty ? "day" : phaseOfP(p, d));
  const sky = skyFor(w, phase), [swd, swa] = SWAY[w] || SWAY.none, petKind = opts.pet || petOf(p);
  const pose = doing ? A.pose : "stand", arms = doing ? A.arms : "rest";
  const sc = actKey==="cycle" && doing ? 1.05 : POSE_SC[pose];
  let fx = 180, fy = actKey==="cycle" && doing ? 232 : POSE_Y[pose];
  if (doing && actKey==="language") fx = 122;
  if (!doing) fx = 150;
  const label = opts.label || `${name(p)} in ${PLACES[place].city}, ${doing ? A.verb : "thinking about " + (focus ? focus.name.toLowerCase() : "today")}. ${WX[w].label}.`;
  let s = `<svg class="scene anim" viewBox="0 0 360 300" style="--swd:${swd}s;--swa:${swa}" role="img" aria-label="${esc(label)}">
    <defs><linearGradient id="sky-${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient><clipPath id="clip-${uid}"><rect width="360" height="300"/></clipPath></defs>
    <g clip-path="url(#clip-${uid})"><rect width="360" height="130" fill="url(#sky-${uid})"/>`;
  if (doing && actKey==="wake") s += `<rect width="360" height="130" fill="#F2A88A" opacity=".35"/><circle cx="270" cy="124" r="34" fill="#F6C46A" class="pulse"/>`;
  s += groundSVG(place, season, 360, 124, 176, R) + BACKDROP[place](season, isSnowy(w), rnd(place.length*7+3)) + passersby(place, rnd(place.length*13+5), wet) + nightLights(rnd(place.length+3), 360, phase);
  if (shown.has("basket")) s += `<g transform="translate(28 214)">${treatSVG("basket")}</g>`;
  if (shown.has("lantern")) s += `<g transform="translate(342 230)">${treatSVG("lantern")}</g>`;
  // props behind the figure
  let back = "", front = "";
  const seatY = fy - 30*sc;
  switch(A.prop){
    case "bench": case "hearts": back += benchSVG(fx, seatY); break;
    case "cafe": back += `<g><rect x="${fx-24}" y="${seatY-38}" width="48" height="6" rx="3" fill="#2F2F2F"/><path d="M${fx-20} ${seatY-34} V${seatY} M${fx+20} ${seatY-34} V${seatY}" stroke="#2F2F2F" stroke-width="2"/><rect x="${fx-24}" y="${seatY}" width="48" height="5" rx="2" fill="#7A4E35"/><path d="M${fx-20} ${seatY+5} L${fx-24} ${seatY+32} M${fx+20} ${seatY+5} L${fx+24} ${seatY+32}" stroke="#2F2F2F" stroke-width="2"/></g>`;
      front += `<g transform="translate(${fx+62} ${seatY+2})"><ellipse rx="22" ry="5" fill="#E9E2D2" stroke="#BDB3A2"/><path d="M0 5 V30 M-10 32 h20" stroke="#2F2F2F" stroke-width="2"/><g transform="translate(-6 -6)"><path d="M-5 -6 h10 l-1.4 8 h-7.2Z" fill="#F4EDE0"/><path class="steam" d="M-1 -9 q2 -3 0 -6" stroke="#FFF" stroke-width="1" fill="none"/></g><g transform="translate(8 -3) scale(.4)">${treatSVG2("croissants")}</g></g>`; break;
    case "desk": {
      const ty = fy - 44*sc;
      back += `<path d="M${fx-24} ${seatY} h48" stroke="#8C5A3C" stroke-width="4" stroke-linecap="round"/>`;
      front += `<g><ellipse cx="${fx}" cy="${fy+40}" rx="80" ry="6" fill="#000" opacity=".1"/><rect x="${fx-70}" y="${ty}" width="140" height="6" rx="3" fill="#C9935F"/><path d="M${fx-66} ${ty+1.5} h132" stroke="#E0B37E" stroke-width="1" stroke-linecap="round"/><path d="M${fx-60} ${ty+6} L${fx-64} ${fy+40} M${fx+60} ${ty+6} L${fx+64} ${fy+40}" stroke="#3B3A36" stroke-width="2.4" stroke-linecap="round"/>
        <g transform="translate(${fx} ${ty})"><path d="M-18 0 L-15 -25 Q-15 -27 -13 -27 L13 -27 Q15 -27 15 -25 L18 0Z" fill="#8E98A2"/><path d="M-3 -15 q3 -4 6 0 q-3 3 -6 0Z" fill="#E6EAEE"/><ellipse cy="-14" rx="22" ry="12" fill="#9CC3E6" opacity=".18" class="glow"/></g>
        <g transform="translate(${fx+46} ${ty})"><path d="M-6 0 h12 l-1 -12 h-10Z" fill="#FBF7EE" stroke="#C2B49C" stroke-width=".6"/><path class="steam" d="M-1 -15 q2 -3 0 -6" stroke="#FFF" stroke-width="1" fill="none"/></g>
        <g transform="translate(${fx-48} ${ty})"><path d="M-6 0 h12 l-2 -9 h-8Z" fill="#C27A52"/>${canopy(0,-14,7,["#7FA35A","#93B862"],rnd(3),5)}</g></g>`;
      break; }
    case "picnic": {
      const pc = p==="a" ? "var(--a-soft)" : "var(--b-soft)", gid = "pg"+uid;
      back += `<defs><pattern id="${gid}" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="var(--window)"/><rect width="20" height="7" fill="${pc}" opacity=".65"/><rect width="7" height="20" fill="${pc}" opacity=".65"/></pattern></defs><polygon points="${fx-92+5},${fy-44} ${fx+92+5},${fy-44} ${fx+124+5},${fy+12} ${fx-124+5},${fy+12}" fill="#000" opacity=".12"/><polygon points="${fx-92},${fy-48} ${fx+92},${fy-48} ${fx+124},${fy+8} ${fx-124},${fy+8}" fill="url(#${gid})" stroke="var(--line)"/>`;
      if (actKey==="mindful") back += `<circle cx="${fx}" cy="${fy-80}" r="66" fill="#FFF6DC" opacity=".22" class="pulse"/>`;
      const foods = [CITY_DISH[city], ...[...shown].filter(id => TREATS[id] && !["basket","lantern","radio","butterfly"].includes(id))].slice(0,4);
      const spots = [[-74,-28],[74,-26],[-100,-4],[100,-2]];
      foods.forEach((id,i) => { front += `<g transform="translate(${fx+spots[i][0]} ${fy+spots[i][1]}) scale(.72)">${treatSVG2(id)}</g>`; });
      if (actKey==="mindful") front += [[-50,-110],[48,-130],[-30,-170],[60,-80]].map(([x,y],i)=>`<g transform="translate(${fx+x} ${fy+y})"><g class="float" style="animation-delay:-${i*1.6}s"><ellipse rx="4" ry="2" fill="#F5C6D3"/></g></g>`).join("");
      break; }
    case "mat": if (actKey==="yoga"||actKey==="jacks") { back += `<ellipse cx="${fx}" cy="${fy+48}" rx="64" ry="9" fill="${p==="a"?"var(--a)":"var(--b)"}" opacity=".85"/><ellipse cx="${fx}" cy="${fy+46}" rx="58" ry="6" fill="#FFF" opacity=".15"/>`; break; }
      back += `<ellipse cx="${fx}" cy="${fy-8}" rx="58" ry="10" fill="${p==="a"?"var(--a)":"var(--b)"}" opacity=".8"/><circle cx="${fx}" cy="${fy-70}" r="64" fill="#FFF6DC" opacity=".22" class="pulse"/>`;
      front += [[-50,-90],[48,-110],[-30,-150],[60,-60]].map(([x,y],i)=>`<g transform="translate(${fx+x} ${fy+y})"><g class="float" style="animation-delay:-${i*1.6}s"><ellipse rx="4" ry="2" fill="#F5C6D3"/></g></g>`).join(""); break;
    case "dance": {
      const lav = localAvatar(city, 3);
      const mv = motionOff() ? "" : `<animateTransform attributeName="transform" type="translate" values="18 0;18 -10;-18 0;-18 -10;18 0" keyTimes="0;.25;.5;.75;1" dur="3.6s" begin="-.9s" repeatCount="indefinite"/>`;
      back += `<g transform="translate(282 ${POSE_Y.stand}) scale(${-sc*.92} ${sc*.92})"><g>${mv}${figureSVG(lav,"stand",isSnowy(w),"dance","walk")}</g></g>`;
      front += `<g transform="translate(${fx+70} ${fy+36}) scale(1.1)">${treatSVG2("radio")}</g>` + [[-40,-150,"♪"],[30,-180,"♫"],[-70,-110,"♪"],[64,-130,"♫"]].map(([x,y,n],i)=>`<g transform="translate(${fx+x} ${fy+y})"><g class="float" style="animation-delay:-${i*1.1}s"><text font-size="18" font-family="Georgia, serif" fill="${p==="a"?"var(--a)":"var(--b)"}">${n}</text></g></g>`).join("");
      break; }
    case "track": back += `<path d="M-10 ${fy+46} Q180 ${fy+30} 370 ${fy+48}" stroke="#FBF8F1" stroke-width="2" stroke-dasharray="10 12" fill="none" opacity=".55"/>`; break;
    case "local": {
      const lav = localAvatar(city), lines = LOCAL_TALK[city] || ["Hello!","Hello!"];
      back += `<g transform="translate(252 ${POSE_Y.stand}) scale(${-sc} ${sc})">${figureSVG(lav,"stand",isSnowy(w),"talk")}</g>`;
      front += bubble(fx+6, 40, lines[0], "bubbleA") + bubble(306, 66, lines[1], "bubbleB", true);
      break; }
    case "stall": {
      const awn = p==="a" ? "var(--a)" : "var(--b)", cy = fy - 30*sc;
      back += `<path d="M${fx-88} 250 V72 M${fx+88} 250 V72" stroke="#8C6A4E" stroke-width="3.4" stroke-linecap="round"/><path d="M${fx-98} 52 h196 l-6 18 h-184Z" fill="#FBF8F1"/>${Array.from({length:7},(_,i)=>`<path d="M${fx-98+i*28} 52 h14 l-1 18 h-13Z" fill="${awn}" opacity=".9"/>`).join("")}<path d="M${fx-92} 70 ${Array.from({length:7},()=>`q13 8 26 0`).join(" ")}" fill="#FBF8F1" stroke="${awn}" stroke-width="1.4"/>`;
      front += `<ellipse cx="${fx}" cy="${fy+44*sc}" rx="104" ry="6" fill="#000" opacity=".1"/><rect x="${fx-96}" y="${cy}" width="192" height="${fy+44*sc-cy}" rx="4" fill="#C9935F"/><rect x="${fx-100}" y="${cy-6}" width="200" height="8" rx="4" fill="#A06C44"/><path d="M${fx-90} ${cy+20} h180 M${fx-90} ${cy+42} h180" stroke="#B9824F" stroke-width="1.2"/>`;
      if (arms==="stir") front += `<g transform="translate(${fx+10*sc} ${cy-4})"><path d="M-16 0 h32 l-2 -14 Q0 -17 -14 -14Z" fill="#5E6872"/><ellipse cy="-14" rx="15" ry="2.6" fill="#D29B5E"/><path class="steam" d="M-6 -18 q3 -5 0 -10 M4 -18 q3 -5 0 -10" stroke="#FFF" stroke-width="1.3" fill="none"/></g>`;
      else front += `<g transform="translate(${fx+30} ${cy-6})">${[0,1,2].map(i=>`<rect x="${i*10-14}" y="-22" width="8" height="22" rx="3" fill="#9CC3E6" stroke="#5E8AA6" stroke-width=".6"/>`).join("")}</g>`;
      const foods = [CITY_DISH[city], ...[...shown].filter(id => TREATS[id] && !["basket","lantern","radio","butterfly"].includes(id))].slice(0,3);
      [-70,-46,62].forEach((dx,i) => { if (foods[i]) front += `<g transform="translate(${fx+dx} ${cy-8}) scale(.62)">${treatSVG2(foods[i])}</g>`; });
      break; }
    case "phonebox": front += `<g transform="translate(${fx+46} ${fy+38})"><rect x="-12" y="-14" width="24" height="16" rx="2" fill="#8C5A3C"/><rect x="-12" y="-17" width="24" height="5" rx="2" fill="#A86E48"/><rect x="-4" y="-22" width="8" height="8" rx="2" fill="none" stroke="#C9A050" stroke-width="1.6"/><rect x="-5" y="-17" width="10" height="7" rx="1" fill="#D9A441"/></g>`; break;
    case "night": front += `<g transform="translate(${fx} ${fy-16})"><path d="M-44 -18 Q0 -34 44 -18 L50 6 Q0 16 -50 6Z" fill="${p==="a"?"var(--a-soft)":"var(--b-soft)"}"/><path d="M-30 -12 v20 M-10 -16 v24 M10 -16 v24 M30 -12 v20" stroke="var(--window)" stroke-width="1" opacity=".6"/></g>`; break;
    case "sunrise": front += `<g transform="translate(${fx+56} ${fy+30})"><rect x="-16" y="-4" width="32" height="5" fill="#8C5A3C"/><path d="M-12 1 V14 M12 1 V14" stroke="#8C5A3C" stroke-width="2"/><path d="M-5 -14 h10 l-1.4 10 h-7.2Z" fill="#F4EDE0"/><path class="steam" d="M-1 -17 q2 -3 0 -6" stroke="#FFF" stroke-width="1" fill="none"/></g>`; break;
  }
  if (!doing) s += `<g opacity=".35">${back}</g>`; else s += back;
  const ptint = PHASE_TINT[phase];
  s += weatherTint(w, 360, 300) + (ptint ? `<rect width="360" height="300" fill="${ptint[0]}" opacity="${ptint[1]}"/>` : "") + `<rect width="360" height="300" fill="#FBF8F1" opacity="${phase==="night"?.04:.1}"/>`;
  if (wet && doing && A.prop!=="desk" && A.prop!=="stall") s += `<g transform="translate(${fx+26} ${fy-196*sc})"><g class="sway" style="--swa:2"><path d="M0 0 V${pose==="stand"||pose==="jog"?150:120}" stroke="#4A3B2E" stroke-width="2.4"/><path d="M-62 18 Q0 -30 62 18 Q53 12 46 20 Q38 12 31 20 Q23 12 15 20 Q8 12 0 20 Q-8 12 -15 20 Q-23 12 -31 20 Q-38 12 -46 20 Q-53 12 -62 18Z" fill="${p==="a"?"var(--a)":"var(--b)"}" opacity=".94"/><circle cy="-9" r="2.5" fill="#4A3B2E"/></g></g>`;
  const LOCO = {move:{range:118, dur:6.4}, run:{range:118, dur:6.4}, walk:{range:100, dur:15}, cycle:{range:120, dur:8}};
  const loco = doing && LOCO[actKey];
  const running = !!loco;
  let inner = "";
  if (actKey==="cycle" && doing) inner += bikeSVG();
  if (actKey==="walk" && doing) inner += `<path d="M-21 -36 Q-40 -10 ${-56/sc} ${(278-fy)/sc - 8}" stroke="#3B3A36" stroke-width=".9" fill="none"/>`;
  inner += `<g class="hero-fig">${figureSVG(av, pose, isSnowy(w), doing ? arms : "rest", doing ? A.legs : null)}</g>`;
  if ((actKey==="move"||actKey==="run") && doing && !motionOff()) inner += [0,1].map(i=>`<circle cx="${i?14:-16}" cy="44" r="3" fill="#E8DCC4"><animate attributeName="r" values="1;7;1" dur=".56s" begin="-${i*.28}s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0;.8" dur=".56s" begin="-${i*.28}s" repeatCount="indefinite"/></circle>`).join("") + [0,1,2].map(i=>`<path class="windl" style="--dx:-46px;--dur:${(.6+i*.12).toFixed(2)}s;--del:-${(i*.2).toFixed(2)}s" d="M-30 ${-74+i*22} h-20" stroke="#FFF" stroke-width="2.2" stroke-linecap="round" opacity=".9"/>`).join("");
  let figMove = "", flip = "", lean = 0;
  if (loco && !motionOff()) {
    figMove = `<animateTransform attributeName="transform" type="translate" values="${-loco.range} 0;${loco.range} 0;${-loco.range} 0" keyTimes="0;.5;1" dur="${loco.dur}s" repeatCount="indefinite"/>`;
    flip = `<animateTransform attributeName="transform" type="scale" values="1 1;-1 1" keyTimes="0;.5" calcMode="discrete" dur="${loco.dur}s" repeatCount="indefinite"/>`;
    lean = (actKey==="move"||actKey==="run") ? 8 : actKey==="cycle" ? 4 : 2;
  } else if (doing && actKey==="dance" && !motionOff()) {
    figMove = `<animateTransform attributeName="transform" type="translate" values="-26 0;-26 -10;26 0;26 -10;-26 0" keyTimes="0;.25;.5;.75;1" dur="3.6s" repeatCount="indefinite"/>`;
    flip = `<animateTransform attributeName="transform" type="scale" values="1 1;-1 1;1 1;-1 1" keyTimes="0;.3;.5;.8" calcMode="discrete" dur="3.6s" repeatCount="indefinite"/>`;
  } else if (doing && actKey==="jacks") figMove = smil("translate", ["0 0","0 -16","0 0"], .8);
  else if (doing && actKey==="yoga") figMove = motionOff() ? "" : `<animateTransform attributeName="transform" type="rotate" values="0 0 40;-7 0 40;0 0 40;7 0 40;0 0 40" dur="9s" repeatCount="indefinite"/>`;
  else figMove = pose==="stand" ? smil("translate", ["0 0","8 0","2 0","-7 0","0 0"], 10) : smil("translate", ["0 0","0 -1.4","0 0"], 4.4);
  const petLocal = actKey==="walk" ? [-64, 278-fy] : [-78, 282-fy];
  const petInMove = running ? `<g transform="translate(${petLocal[0]} ${petLocal[1]}) scale(.78)"><g class="jogbob">${petSVG(petKind, false, {bow:shown.has("bow"), scarf:shown.has("scarf"), hat:shown.has("hat"), crown:shown.has("catcrown"), bandana:shown.has("bandana"), bell:shown.has("bell")})}</g></g>` : "";
  s += `<g transform="translate(${fx} ${fy})"><g>${figMove}<g>${flip}${petInMove}<g transform="scale(${sc}) rotate(${lean} 0 0)">${inner}</g></g></g></g>`;
  if (av._look?.wear?.bag) s += `<g transform="translate(${fx+40} ${pose==="cross"?fy-4:fy+34}) scale(.9)">${toteSVG}</g>`;
  if (!doing) { s += `<g opacity=".35">${front}</g>`; if (focus) s += `<g transform="translate(${fx+72} ${fy-178})"><g class="bob"><circle cx="-26" cy="44" r="3" fill="#FFFDF8"/><circle cx="-18" cy="32" r="5" fill="#FFFDF8"/><ellipse cx="7.5" cy="8" rx="30" ry="22" fill="#000" opacity=".08"/><ellipse cx="6" cy="6" rx="30" ry="22" fill="#FFFDF8"/><g transform="translate(6 6) scale(.9)">${itemSVG(focus.item)}</g></g></g>`; }
  else s += front;
  if (doing && actKey==="sleep") s += `<rect width="360" height="300" fill="#1C2440" opacity="${phase==="night"?.12:.42}"/><g transform="translate(60 40)"><circle r="16" fill="#F4EEC8"/><circle cx="7" cy="-5" r="14" fill="#2A3352" opacity=".9"/></g>${[[120,30],[200,22],[300,50],[250,80],[40,90],[160,70]].map(([x,y],i)=>`<path class="twinkle" style="animation-delay:-${i*.5}s" d="M${x} ${y-3} v6 M${x-3} ${y} h6" stroke="#FFF" stroke-width="1.2"/>`).join("")}${["Z","z","Z"].map((z,i)=>`<g transform="translate(${fx+30+i*12} ${fy-150-i*14})"><g class="float" style="animation-delay:-${i*1.2}s"><text font-size="${16-i*3}" font-family="Young Serif, Georgia, serif" fill="#F4EEE2">${z}</text></g></g>`).join("")}`;
  if (doing && actKey==="connect") s += [[24,-150],[44,-176],[10,-190]].map(([x,y],i)=>`<g transform="translate(${fx+x} ${fy+y})"><g class="float" style="animation-delay:-${i*1.4}s"><path d="M0 6 C-9 0 -7 -6 -3 -6 C-1 -6 0 -4 0 -4 C0 -4 1 -6 3 -6 C7 -6 9 0 0 6Z" fill="#E0567A"/></g></g>`).join("");
  // companions
  const acc = {bow:shown.has("bow"), scarf:shown.has("scarf"), hat:shown.has("hat"), crown:shown.has("catcrown"), bandana:shown.has("bandana"), bell:shown.has("bell")};
  const petBase = running ? [fx-70, 282] : [actKey==="language"&&doing?56:62, 278];
  const petMove = smil("translate", ["0 0","14 0","14 0","-6 0","0 0"], 16);
  if (!running) s += `<g transform="translate(${petBase[0]} ${petBase[1]}) scale(.78)"><g>${petMove}${shown.has("cushion")?treatSVG("cushion"):""}${petSVG(petKind, false, acc)}</g></g>`;
  if (shown.has("yarn")) s += `<g transform="translate(104 286) scale(.7)">${treatSVG("yarn")}</g>`;
  if (shown.has("fish")) s += `<g transform="translate(24 290) scale(.6)">${treatSVG("fish")}</g>`;
  if (frac >= 1) s += `<g transform="translate(306 282) scale(-.7 .7)">${petSVG(petKind, true)}</g>`;
  if (shown.has("kitten")) s += `<g transform="translate(102 272) scale(.45)">${petSVG(petKind, true)}</g>`;
  if (shown.has("radio")) s += `<g transform="translate(330 270) scale(.9)">${treatSVG2("radio")}</g>`;
  if (shown.has("butterfly") && !wet && w!=="storm" && actKey!=="sleep") s += `<g transform="translate(270 150)"><g class="float">${treatSVG("butterfly")}</g></g><g transform="translate(80 150)"><g class="float" style="animation-delay:-3s">${treatSVG("butterfly")}</g></g>`;
  if (phase==="night") s += `<rect width="360" height="300" fill="#0E1430" opacity=".1"/>`;
  s += weatherFX(w, 360, 300, 125, R, season, {phase, noTint:true});
  const LO = lighting(uid, phase, {indoor:false});
  s = s.replace(`<defs>`, `<defs>${LO.defs}`) + LO.s;
  s += `<rect width="360" height="300" fill="#0B0F08" style="opacity:var(--scene-dim)" pointer-events="none"/>`;
  return s + `</g></svg>`;
}
function sceneCaption(p, d, h){
  if (!h) return "";
  const k = actFor(h), A = ACT[k], city = cityOf(placeOf(p)), cn = CITIES[city].name;
  if (k==="nourish") return `${name(p)} is eating at ${RESTO[city].name} in ${cn}.`;
  if (k==="study" && studyCafe(city, {place:"hutong", w:"sunny", season:"fall", phase:"day", uid:"x"})) return `${name(p)} is deep in focus at ${studyCafe(city, {place:placeOf(p), w:"sunny", season:"fall", phase:"day", uid:"x"}).label} in ${cn}.`;
  if (k==="mindful" && ["beijing","athens","delhi"].includes(city)) return `${name(p)} is meditating in ${({beijing:"a Buddhist temple hall", athens:"a Greek Orthodox church", delhi:"a Hindu temple"})[city]} in ${cn}.`;
  if (k==="hydrate") return `${name(p)} is sipping water at ${RESTO[city].name} in ${cn}.`;
  if (k==="study") return `${name(p)} is deep in focus at ${STUDY[city]} in ${cn}.`;
  if (k==="mindful") return `${name(p)} is meditating in ${WORSHIP[city]} in ${cn}.`;
  if (k==="sleep") return `${name(p)} is fast asleep in ${HOME_NAME[city]}.`;
  if (k==="move") return `${name(p)} is ${SPORT_VERB[SPORT[city]]}.`;
  if (k.startsWith("sport_")) return `${name(p)} is ${SPORT_VERB[k.slice(6)]}.`;
  if (k.startsWith("social_")) return `${name(p)} is ${SOCIAL_VERB[k.slice(7)]}.`;
  return `${name(p)} is ${A.verb} in ${cn}.`;
}
