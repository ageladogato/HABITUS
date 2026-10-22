/* ---------- posed figure ---------- */
let UTENSIL_SVG = "";
let HELD_OVERRIDE = {R:"", mid:""};
const motionOff = () => S.motion==="still" || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
function smil(type, values, dur, begin, ktx){
  if (motionOff()) return "";
  const n = values.length, kt = ktx || values.map((_,i)=>(i/(n-1)).toFixed(3)).join(";"), ks = values.slice(1).map(()=>".42 0 .58 1").join(";");
  const vals = type==="rotate" ? values.map(v=>`${v} 0 0`).join(";") : values.join(";");
  return `<animateTransform attributeName="transform" type="${type}" values="${vals}" keyTimes="${kt}" calcMode="spline" keySplines="${ks}" dur="${dur}s" begin="${-(begin||0)}s" repeatCount="indefinite" additive="sum"/>`;
}
const ARM_MOTION = {
  jog:{L:[[-32,32,-32],.62], R:[[32,-32,32],.62]},
  runarms:{L:[[-55,55,-55],.56], R:[[55,-55,55],.56]},
  walkarms:{L:[[-20,20,-20],1.1], R:[[20,-20,20],1.1]},
  jack:{L:[[0,148,0],.8], R:[[0,-148,0],.8]},
  yoga:{L:[[0,0,148,148,90,0],7], R:[[0,0,-148,-148,-90,0],7]},
  eat:{R:[[0,0,112,112,0],3.4], L:[[0,2,0],3.4]},
  sip:{R:[[0,0,112,112,0],4.6]},
  tray:{L:[[-18,18,-18],1.1]},
  ballet:{L:[[0,30,150,150,40,0],4], R:[[0,-30,-150,-150,-40,0],4]},
  dribble:{R:[[0,-8,0],.5]},
  bowl:{R:[[0,0,-360,-360],3.6,0,"0;.22;.32;1"], L:[[0,-30,0,0],3.6,0,"0;.22;.32;1"]},
  clap:{L:[[0,8,0],.6], R:[[0,-8,0],.6]},
  racket:{R:[[0,-64,18,0,0,0],2.6]},
  bat:{L:[[0,0,0,-70,24,0],3.4], R:[[0,0,0,-70,24,0],3.4]},
  bbat:{L:[[0,0,0,60,-10,0],3.4], R:[[0,0,0,60,-10,0],3.4]},
  lap:{L:[[0,1.2,0],6], R:[[0,-1.2,0],6]},
  dance:{L:[[0,150,60,150,30,0],1.8], R:[[0,-60,-150,-40,-150,0],1.8]},
  piano:{L:[[0,6,-3,4,0],.7], R:[[0,-4,5,-3,0],.7,.2]},
  pour:{L:[[0,-6,0],2.4], R:[[0,4,0],2.4]},
  talk:{R:[[0,-16,6,-10,0],2.6], L:[[0,4,0],3]},
  wave:{R:[[-10,16,-10],1.1]},
  drink:{R:[[38,38,0,0,38],4.2]},
  stretch:{L:[[0,-14,0],3.2], R:[[0,14,0],3.2]},
  kite:{R:[[0,-9,5,0],2.2]},
  stir:{R:[[0,7,0,-7,0],1.3]},
  write:{R:[[0,4,-2,3,0],.9]},
  laptop:{L:[[0,3,0],.32], R:[[0,3,0],.32,.16]},
  book:{L:[[0,2,0],5], R:[[0,-2,0],5]},
  phone:{R:[[0,-4,0],3.4], L:[[0,2,0],4]},
  meditate:{L:[[0,1.5,0],6], R:[[0,-1.5,0],6]},
  rest:{L:[[0,2.5,0],5.4], R:[[0,-2.5,0],5.4,1.2]},
  sleep:{L:[[0,1.5,0],6], R:[[0,-1.5,0],6]}
};
const TORSO = {
  fem:"M-17 -76 Q-21 -62 -15 -50 Q-15 -42 -18 -34 L18 -34 Q15 -42 15 -50 Q21 -62 17 -76 Q0 -81 -17 -76Z",
  andro:"M-19 -76 Q-23 -56 -19 -34 L19 -34 Q23 -56 19 -76 Q0 -82 -19 -76Z",
  masc:"M-22 -76 Q-24 -58 -19 -34 L19 -34 Q24 -58 22 -76 Q0 -83 -22 -76Z"
};
const SHOULDER = {fem:16, andro:18, masc:21};
const LEGS = {
  cross:{L:[[-9,-34],[-31,-23],[-5,-15]], R:[[9,-34],[31,-23],[5,-18]]},
  stand:{L:[[-8,-34],[-8,4],[-9,40]], R:[[8,-34],[8,4],[9,40]]},
  jog:{L:[[-8,-34],[-15,2],[-25,30]], R:[[8,-34],[15,-8],[11,26]]},
  bench:{L:[[-9,-34],[-12,-24],[-13,10]], R:[[9,-34],[12,-24],[13,10]]}
};
const ARMS = {
  book:[[-24,-56],[-11,-45],[24,-56],[11,-45]], write:[[-24,-56],[-12,-43],[22,-58],[8,-44]], laptop:[[-22,-54],[-10,-40],[22,-54],[10,-40]],
  phone:[[-24,-56],[-11,-46],[28,-66],[14,-92]], talk:[[-22,-56],[-14,-44],[28,-64],[32,-84]], stir:[[-24,-56],[-14,-44],[24,-58],[18,-44]],
  drink:[[-22,-56],[-14,-46],[24,-70],[6,-94]], kite:[[-22,-56],[-14,-46],[28,-84],[34,-108]], stretch:[[-26,-94],[-18,-116],[26,-94],[18,-116]],
  jog:[[-26,-60],[-16,-48],[26,-64],[24,-82]], meditate:[[-28,-52],[-30,-30],[28,-52],[30,-30]], rest:[[-22,-56],[-21,-36],[22,-56],[21,-36]],
  sleep:[[-20,-58],[-6,-50],[20,-58],[6,-50]], wave:[[-24,-56],[-11,-45],[30,-84],[30,-104]],
  runarms:[[-24,-58],[-16,-46],[24,-58],[16,-46]], walkarms:[[-22,-56],[-21,-36],[22,-56],[21,-36]], jack:[[-22,-56],[-21,-36],[22,-56],[21,-36]],
  yoga:[[-22,-56],[-21,-36],[22,-56],[21,-36]], bars:[[-6,-62],[22,-52],[14,-62],[30,-54]], eat:[[-22,-54],[-12,-42],[24,-56],[14,-42]],
  racket:[[-22,-56],[-18,-40],[28,-66],[32,-88]], bowl:[[-22,-56],[-21,-36],[22,-56],[21,-36]], clap:[[-22,-56],[-6,-60],[22,-56],[6,-60]], bat:[[-14,-56],[2,-44],[14,-58],[8,-44]], bbat:[[-16,-62],[8,-66],[20,-66],[14,-70]], dribble:[[-22,-56],[-21,-38],[26,-56],[28,-38]], ballet:[[-22,-56],[-21,-36],[22,-56],[21,-36]],
  tray:[[-22,-56],[-21,-36],[28,-62],[30,-82]], lap:[[-22,-56],[-6,-38],[22,-56],[6,-38]], dance:[[-22,-56],[-21,-36],[22,-56],[21,-36]], piano:[[-22,-54],[-14,-38],[22,-54],[14,-38]], pour:[[-24,-62],[-30,-84],[24,-56],[16,-40]], sip:[[-22,-54],[-12,-42],[24,-56],[14,-42]]
};
const SHOE_COL = {sneakers:"#F4EDE0", boots:"#5A4030", loafers:"#3A2A22", sandals:"#B07A50"};
function lowerSpec(av, O){
  const sk = av.skin;
  if (O) {
    if (O.lower==="pants") return {th:O.lowerCol||O.col, sh:O.lowerCol||O.col, band:O.lowerCol||O.col, shoes:O.shoes};
    if (O.lower==="dress") return {th:sk, sh:sk, g:{len:"short", col:O.col, pattern:O.pattern}, shoes:O.shoes};
    if (O.lower==="pleats") return {th:"#F7F4EC", sh:"#F7F4EC", g:{len:"short", col:"#F7F4EC", pattern:"pleats"}, shoes:O.shoes, pom:true};
    if (O.lower==="gown") return {th:O.col, sh:O.col, g:{len:"long", col:O.col, wide:true, sparkle:O.sparkle}, shoes:O.shoes};
    return {th:O.col, sh:O.col, g:{len:"long", col:O.lowerCol||O.col, hem:O.hem, pattern:O.pattern}, shoes:O.shoes};
  }
  const b = av.bottom, c = av.topc, bc = av.botc;
  if (av.top==="dress") return {th:sk, sh:sk, g:{len:"short", col:c}};
  if (av.top==="overalls") return {th:c, sh:c, band:c};
  if (b==="skirt") return {th:sk, sh:sk, g:{len:"short", col:bc, folds:true}};
  if (b==="shorts") return {th:bc, sh:sk, band:bc};
  return {th:bc, sh:bc, band:bc, seams:b==="jeans"};
}
function garmentPath(pose, len, wide){
  if (pose==="cross") return len==="short" ? "M-19 -40 Q-36 -32 -38 -22 Q0 -14 38 -22 Q36 -32 19 -40Z" : wide ? "M-20 -44 Q-52 -28 -54 -10 Q0 4 54 -10 Q52 -28 20 -44Z" : "M-20 -44 Q-44 -30 -46 -14 Q0 -4 46 -14 Q44 -30 20 -44Z";
  if (pose==="bench") return len==="short" ? "M-19 -38 L-22 -24 L-23 -12 Q0 -8 23 -12 L22 -24 L19 -38Z" : wide ? "M-19 -38 L-26 -20 L-34 12 Q0 18 34 12 L26 -20 L19 -38Z" : "M-19 -38 L-23 -22 L-25 10 Q0 14 25 10 L23 -22 L19 -38Z";
  return len==="short" ? "M-19 -38 L-27 6 Q0 11 27 6 L19 -38Z" : wide ? "M-19 -38 Q-30 0 -44 40 Q0 48 44 40 Q30 0 19 -38Z" : "M-19 -38 L-30 38 Q0 43 30 38 L19 -38Z";
}
const hemLine = (pose, wide) => pose==="cross" ? (wide?"M-52 -11 Q0 3 52 -11":"M-45 -15 Q0 -5 45 -15") : pose==="bench" ? (wide?"M-33 11 Q0 17 33 11":"M-24 9 Q0 13 24 9") : (wide?"M-43 39 Q0 47 43 39":"M-29 37 Q0 42 29 37");
const LEG_MOTION = {
  run:{th:[-46,40,-46], sh:[14,78,14], dur:.56},
  walk:{th:[-20,20,-20], sh:[4,26,4], dur:1.1},
  jack:{th:[0,16,0], sh:[0,0,0], dur:.8, mirror:true},
  cycle:{th:[-70,-20,-70], sh:[70,30,70], dur:1},
  battement:{dur:4, L:{th:[0,0,0,0,0,0,0], sh:[0,0,0,0,0,0,0]}, R:{th:[0,0,0,-82,-82,0,0], sh:[0,0,0,0,0,0,0]}},
  kick:{dur:2.6, L:{th:[0,0,0,0,0], sh:[0,0,0,0,0]}, R:{th:[0,-10,40,0,0], sh:[0,30,0,0,0]}}
};
function lowerSVG(av, O, pose, legMotion){
  const L = lowerSpec(av, O), G = LEGS[pose], sk = av.skin;
  const shoeC = L.shoes || SHOE_COL[av.shoes] || "#3A2A22";
  let s = "";
  const LM = LEG_MOTION[legMotion] || (pose==="jog" ? LEG_MOTION.run : null);
  if (LM && !motionOff()) {
    [[G.L,0,1],[G.R,LM.dur/2,LM.mirror?-1:1]].forEach(([leg,off,sgn],i) => {
      const [hx,hy] = leg[0], ky = 36, fy = 34;
      const per = LM.L ? (i ? LM.R : LM.L) : null;
      const th = per ? per.th : LM.th.map(v=>v*sgn), sh = per ? per.sh : LM.sh.map(v=>v*sgn);
      const shoe = `<ellipse cx="${LM.mirror?(i?2:-2):3}" cy="${fy+3}" rx="7" ry="4.2" fill="${shoeC}"/>`;
      s += `<g transform="translate(${hx} ${hy})"><g>${smil("rotate",th,LM.dur,(LM.mirror||per)?0:off)}<path d="M0 0 L0 ${ky}" stroke="${L.th}" stroke-width="13" stroke-linecap="round"/><g transform="translate(0 ${ky})"><g>${smil("rotate",sh,LM.dur,(LM.mirror||per)?0:off)}<path d="M0 0 L0 ${fy}" stroke="${L.sh}" stroke-width="11" stroke-linecap="round"/>${shoe}</g></g></g></g>`;
    });
  } else for (const leg of [G.L, G.R]) {
    s += `<path d="M${leg[0]} L${leg[1]}" stroke="${L.th}" stroke-width="13" stroke-linecap="round"/><path d="M${leg[1]} L${leg[2]}" stroke="${L.sh}" stroke-width="11" stroke-linecap="round"/>`;
    if (L.seams) s += `<path d="M${leg[1]} L${leg[2]}" stroke="${shade(L.sh,-.2)}" stroke-width="1" opacity=".5" stroke-dasharray="2 2"/>`;
  }
  if (!(LM && !motionOff())) for (const leg of [G.L, G.R]) {
    const [x,y] = leg[2], yy = y + (pose==="cross"?0:3);
    if (av.shoes==="boots" && !L.shoes) s += `<rect x="${x-6.5}" y="${yy-8}" width="13" height="11" rx="4" fill="${shoeC}"/>`;
    else if (av.shoes==="sandals" && !L.shoes) s += `<ellipse cx="${x}" cy="${yy}" rx="6.5" ry="4" fill="${sk}"/><path d="M${x-4.5} ${yy-1} h9" stroke="${shoeC}" stroke-width="2.2"/>`;
    else s += `<ellipse cx="${x}" cy="${yy}" rx="7" ry="4.4" fill="${shoeC}"/>${av.shoes==="sneakers"&&!L.shoes?`<path d="M${x-4.5} ${yy+1.6} h9" stroke="#C8743E" stroke-width="1.1"/>`:""}`;
    if (L.pom) s += `<circle cx="${x+3}" cy="${yy-2}" r="2.6" fill="#2B2B2B"/>`;
  }
  if (L.g) {
    const path = garmentPath(pose, L.g.len, L.g.wide);
    s += `<path d="${path}" fill="${L.g.col}"/>`;
    if (L.g.pattern) s += patternIn(L.g.pattern, path, [-56,-46,112,96]);
    if (L.g.folds) s += `<path d="M-8 -36 L-12 ${pose==="cross"?-20:pose==="bench"?-12:4} M0 -36 V${pose==="cross"?-17:pose==="bench"?-9:8} M8 -36 L12 ${pose==="cross"?-20:pose==="bench"?-12:4}" stroke="${shade(L.g.col,-.2)}" stroke-width=".9" opacity=".6"/>`;
    if (L.g.hem) s += `<path d="${hemLine(pose, L.g.wide)}" stroke="${L.g.hem}" stroke-width="3" fill="none"/>`;
    if (L.g.sparkle) s += [[-20,-10],[14,-2],[-4,-20],[24,16],[-28,22]].map(([x,y],i)=>`<path class="twinkle" style="animation-delay:-${i*.4}s" d="M${x} ${y-2.4} v4.8 M${x-2.4} ${y} h4.8" stroke="#FFF" stroke-width="1.1"/>`).join("");
  }
  if (L.band) s += `<path d="M-19 -38 H19 V-32 H-19Z" fill="${L.band}"/>`;
  return s;
}
function baseTorso(av){
  const c = av.topc, d = shade(c,-.22);
  const col = (av.top==="breton"||av.top==="overalls") ? "#F4EDE0" : c;
  let s = `<path d="${FT}" fill="${col}"/>`;
  switch(av.top){
    case "breton": s += patternIn("breton:"+c, FT, [-24,-84,48,52]); break;
    case "overalls": s += `<rect x="-14" y="-58" width="28" height="26" rx="3" fill="${c}"/><path d="M-12 -58 L-15 -76 M12 -58 L15 -76" stroke="${c}" stroke-width="4"/><circle cx="-10" cy="-55" r="1.4" fill="#D9A441"/><circle cx="10" cy="-55" r="1.4" fill="#D9A441"/>`; break;
    case "cardigan": case "jacket": s += `<path d="M-6 -78 L0 -48 L6 -78Z" fill="#F4EDE0"/><path d="M0 -48 V-34" stroke="${d}" stroke-width="1.2"/>${av.top==="jacket"?`<path d="M-8 -79 L-1 -52 L-12 -64Z M8 -79 L1 -52 L12 -64Z" fill="${d}"/>`:`<circle cx="2" cy="-44" r="1" fill="${shade(c,.3)}"/><circle cx="2" cy="-39" r="1" fill="${shade(c,.3)}"/>`}`; break;
    case "shirt": s += `<path d="M0 -70 V-34" stroke="${d}" stroke-width="1"/><path d="M-6 -79 L0 -72 L-3 -68Z M6 -79 L0 -72 L3 -68Z" fill="${shade(c,.25)}"/>`; break;
    case "hoodie": s += `<path d="M-10 -80 Q0 -88 10 -80 Q0 -76 -10 -80Z" fill="${d}"/><path d="M-3 -76 v10 M3 -76 v10" stroke="#F4EDE0" stroke-width="1"/><path d="M-12 -46 h24 v8 h-24z" fill="${d}" opacity=".5"/>`; break;
    case "turtleneck": s += `<rect x="-6" y="-85" width="12" height="9" rx="3" fill="${d}"/>`; break;
    case "tshirt": s += `<path d="M-6 -80 Q0 -75 6 -80" stroke="${d}" stroke-width="2" fill="none"/>`; break;
    case "dress": s += `<path d="M-7 -79 Q0 -72 7 -79" stroke="${d}" stroke-width="1.6" fill="none"/>`; break;
    default: s += `<path d="M-6 -80 Q0 -74 6 -80" stroke="${d}" stroke-width="2.4" fill="none"/>`;
  }
  return s;
}
function armsSVG(av, O, armPose, W, held){
  const sk = av.skin, sx = SHOULDER[av.body||"andro"], A = ARMS[armPose] || ARMS.rest, M = ARM_MOTION[armPose] || {};
  let upper, fore;
  if (O) { const sc = O.sleeveCol || O.col; upper = O.sleeves==="none" ? sk : sc; fore = (O.sleeves==="none"||O.sleeves==="short") ? sk : sc; }
  else { const c = av.top==="breton"||av.top==="overalls" ? "#F4EDE0" : av.topc; upper = av.top==="dress" ? sk : c; fore = (av.top==="dress"||av.top==="tshirt") ? sk : c; }
  const wide = O && O.sleeves==="wide";
  const arm = (side) => {
    const shx = side<0 ? -sx : sx, e = side<0 ? A[0] : A[2], h = side<0 ? A[1] : A[3];
    const ex = e[0]-shx, ey = e[1]+74, hx = h[0]-shx, hy = h[1]+74;
    let a = "";
    if (wide) a += `<path d="M0 0 L${ex} ${ey} L${hx} ${hy}" stroke="${O.col}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".95"/>`;
    a += `<path d="M0 0 L${ex} ${ey}" stroke="${upper}" stroke-width="8.5" stroke-linecap="round"/><path d="M${ex} ${ey} L${hx} ${hy}" stroke="${fore}" stroke-width="8" stroke-linecap="round"/><circle cx="${hx}" cy="${hy}" r="4.2" fill="${sk}"/>`;
    if (side<0 && W && W.wrist) a += wristSVG(W.wrist, hx, hy-4);
    const extra = side<0 ? held.L : held.R;
    if (extra) a += `<g transform="translate(${-shx} 74)">${extra}</g>`;
    const m = side<0 ? M.L : M.R;
    return `<g transform="translate(${shx} -74)"><g>${m ? smil("rotate", m[0], m[1], m[2], m[3]) : ""}${a}</g></g>`;
  };
  return arm(-1) + arm(1);
}
function heldFor(armPose, W){
  const book = `<g transform="translate(0 -46)"><g class="pageflip"><path d="M-15 -8 L0 -5 L0 8 L-15 5Z" fill="#FBF7EE" stroke="#8C7C66" stroke-width=".7"/><path d="M15 -8 L0 -5 L0 8 L15 5Z" fill="#FBF7EE" stroke="#8C7C66" stroke-width=".7"/><path d="M-12 -3 l9 1.4 M-12 0 l9 1.4 M3 -1.6 l9 -1.4 M3 1.4 l9 -1.4" stroke="#C2B49C" stroke-width=".6"/><path class="pageturn" d="M0 -5 L13 -7 L13 5 L0 8Z" fill="#F4EDE0" stroke="#8C7C66" stroke-width=".5"/></g></g>`;
  const H = {L:"", R:"", mid:""};
  switch(armPose){
    case "book": if (W.hand) H.mid = `<g transform="translate(0 -50)">${heldSVG(W.hand)}</g>`; else H.mid = book; break;
    case "wave": H.L = W.hand ? `<g transform="translate(-12 -48) scale(.8)">${heldSVG(W.hand)}</g>` : `<g transform="translate(-10 2) scale(.7)">${book}</g>`; break;
    case "rest": case "talk": if (W.hand) H.L = `<g transform="translate(-21 -40) scale(.75)">${heldSVG(W.hand)}</g>`; break;
    case "write": H.mid = `<g transform="translate(-2 -40)"><rect x="-13" y="-6" width="22" height="13" rx="1.5" fill="#FBF7EE" stroke="#8C7C66" stroke-width=".6"/>${[-2,1,4].map((y,i)=>`<path class="inkline" style="animation-delay:-${i*.9}s" d="M-10 ${y} h12" stroke="#34476B" stroke-width=".7"/>`).join("")}</g>`; H.R = `<path d="M8 -44 L14 -54" stroke="#34476B" stroke-width="2" stroke-linecap="round"/>`; break;
    case "eat": H.R = UTENSIL_SVG; break;
    case "racket": case "bat": case "bbat": case "dribble": H.R = HELD_OVERRIDE.R || ""; H.mid = HELD_OVERRIDE.mid || ""; break;
    case "sip": if (SIP_SVG) { H.R = SIP_SVG; break; } H.R = `<g transform="translate(14 -48)"><path d="M-4 -10 h8 l-1 12 h-6Z" fill="#DCEBF2" stroke="#9AB8C8" stroke-width=".6"/><path d="M-3.4 -4 h6.8" stroke="#9CC3E6" stroke-width="3"/></g>`; break;
    case "tray": H.R = `<g transform="translate(30 -86)"><ellipse rx="18" ry="3.6" fill="#C9C1B2"/><path d="M-8 -2 h8 l-1 -9 h-6Z" fill="#FBF7EE"/><path d="M4 -2 q4 -8 8 0Z" fill="#E0A045"/></g>`; break;
    case "phone": H.R = `<rect x="9" y="-102" width="9" height="16" rx="2.4" fill="#2B2B2B"/>`; break;
    case "drink": H.R = `<g transform="translate(6 -96) rotate(-140)"><rect x="-4.5" y="-12" width="9" height="22" rx="4" fill="#9CC3E6" stroke="#5E8AA6" stroke-width=".7"/><rect x="-3" y="-15" width="6" height="4" rx="1" fill="#5E6A3E"/></g>`; break;
    case "stir": H.mid = `<g transform="translate(-14 -42)"><path d="M-9 0 h18 q0 8 -9 8 q-9 0 -9 -8Z" fill="#FBF7EE" stroke="#C9B28E" stroke-width=".7"/></g>`; H.R = `<path d="M18 -44 L10 -26" stroke="#8C5A3C" stroke-width="2.2" stroke-linecap="round"/>`; break;
    case "sleep": H.mid = `<g transform="translate(0 -50)"><rect x="-16" y="-8" width="32" height="18" rx="7" fill="#FBF7EE" stroke="#C2B49C" stroke-width=".7"/></g>`; break;
    case "kite": H.R = `<path d="M34 -108 Q70 -150 92 -196" stroke="#3B2E22" stroke-width=".7" fill="none"/><g transform="translate(92 -206)"><g class="kite"><path d="M0 -14 L10 0 L0 14 L-10 0Z" fill="#E07A5F"/><path d="M0 -14 V14 M-10 0 H10" stroke="#FBF7EE" stroke-width=".9"/><path class="kitetail" d="M0 14 q-4 8 2 14 q-5 6 0 12" stroke="#F2C14E" stroke-width="1.6" fill="none"/></g></g>`; break;
  }
  return H;
}
function figureSVG(av, pose, snow, armPose, legMotion){
  if (pose==="read" || pose==="wave") { armPose = pose==="read" ? "book" : "wave"; pose = "cross"; }
  pose = pose || "stand"; armPose = armPose || "rest";
  const O = OUTFITS[av._look?.outfit], W = av._look?.wear || {};
  FT = TORSO[av.body||"andro"];
  let s = `<g class="${pose==="jog"||legMotion==="run"?"jogbob":legMotion==="walk"?"walkbob":"breathe-soft"}">`;
  if (pose!=="stand" && pose!=="jog") s += `<ellipse cx="0" cy="${pose==="bench"?12:-12}" rx="${pose==="bench"?26:42}" ry="6" fill="#000" opacity=".1"/>`;
  else s += `<ellipse cx="0" cy="44" rx="22" ry="5" fill="#000" opacity=".14"/>`;
  s += lowerSVG(av, O, pose, legMotion);
  s += O ? outfitTorsoFig(O, av) : baseTorso(av);
  s += `<rect x="-4.5" y="-86" width="9" height="10" rx="3" fill="${av.skin}"/>`;
  const face = armPose==="sleep" ? {...av, eyes:"sleepy"} : armPose==="meditate" ? {...av, eyes:"smile"} : av;
  s += `<g transform="translate(-26.2 -129) scale(.82)"><g class="headtilt">${headBack(face)}${O && (O.collar==="cross"||O.collar==="high"||O.collar==="hood") ? "" : neckSVG(face, snow)}${faceShape(face)}<path d="M19.6 32 q-2.6 0 -2.2 3 q.4 2.6 2.6 2.2Z M44.4 32 q2.6 0 2.2 3 q-.4 2.6 -2.6 2.2Z" fill="${av.skin}"/>${headFront(face)}${faceFeatures(face, ["wave","talk","stretch"].includes(armPose)?"big":"")}${headAcc(face)}</g></g>`;
  const H = heldFor(armPose, W);
  s += H.mid + armsSVG(av, O, armPose, W, H);
  return s + `</g>`;
}
