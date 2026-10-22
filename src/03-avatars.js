/* ---------- avatar options ---------- */
const AV_OPTS = {
  body:[["fem","Feminine"],["andro","Androgynous"],["masc","Masculine"]],
  skin:[["#FBE2CC","Porcelain"],["#F3D3B5","Light"],["#E2B48E","Light medium"],["#D19A6E","Medium"],["#B97C52","Tan"],["#8D5A3B","Medium deep"],["#6B4129","Deep"],["#4A2C1C","Very deep"]],
  face:[["round","Round"],["oval","Oval"],["angular","Angular"]],
  eyes:[["smile","Smiling"],["open","Open"],["lashes","Lashes"],["sleepy","Sleepy"]],
  brows:[["soft","Soft"],["bold","Bold"],["none","Faint"]],
  details:[["none","None"],["blush","Blush"],["freckles","Freckles"],["both","Both"]],
  facial:[["none","None"],["stubble","Stubble"],["mustache","Moustache"],["beard","Beard"],["goatee","Goatee"]],
  hair:[["longwaves","Long waves"],["curtain","Curtain bangs"],["long","Long straight"],["wavy","Wavy"],["bob","Bob"],["braid","Braid"],["highpony","High ponytail"],["ponytail","Low ponytail"],["bun","Top bun"],["spacebuns","Space buns"],["curly","Curly"],["afro","Afro"],["pixie","Pixie"],["sidepart","Side part"],["quiff","Quiff"],["undercut","Undercut"],["manbun","Man bun"],["slicked","Slicked back"],["crew","Crew cut"],["short","Short"],["buzz","Buzz cut"],["bald","Bald"]],
  hc:[["#2A211C","Black"],["#5A3A28","Brown"],["#8A5A3B","Chestnut"],["#B5562C","Auburn"],["#D9B56E","Blonde"],["#EBDDB4","Platinum"],["#CFCBC4","Silver"],["#A98BCB","Lavender"],["#D58E9A","Rose"],["#6E9BC8","Blue"],["#8FC1A9","Mint"]],
  top:[["sweater","Sweater"],["cardigan","Cardigan"],["tshirt","T-shirt"],["breton","Striped top"],["hoodie","Hoodie"],["shirt","Button shirt"],["turtleneck","Turtleneck"],["jacket","Jacket"],["overalls","Overalls"],["dress","Dress"]],
  topc:[["#C8743E","Rust"],["#D9A441","Mustard"],["#8FA36A","Sage"],["#4F6B45","Forest"],["#34476B","Navy"],["#9A86C2","Lavender"],["#EFE6D2","Cream"],["#4B4038","Espresso"],["#D88C98","Rose"],["#7FAED0","Sky"],["#B8423A","Red"],["#2B2B2B","Black"]],
  bottom:[["jeans","Jeans"],["trousers","Trousers"],["skirt","Skirt"],["shorts","Shorts"]],
  botc:[["#7E97AE","Light denim"],["#3F5873","Dark denim"],["#C9B28E","Khaki"],["#4B4038","Brown"],["#2B2B2B","Black"],["#8FA36A","Olive"],["#B8423A","Red"],["#EFE6D2","Cream"]],
  shoes:[["sneakers","Sneakers"],["boots","Boots"],["loafers","Loafers"],["sandals","Sandals"]],
  head:[["none","None"],["beret","Beret"],["beanie","Beanie"],["cap","Cap"],["sunhat","Sun hat"],["bucket","Bucket hat"],["crown","Flower crown"],["headband","Headband"],["headphones","Headphones"],["flower","Flower clip"]],
  glasses:[["none","None"],["round","Round"],["square","Square"],["cateye","Cat-eye"],["sun","Sunglasses"]],
  ears:[["none","None"],["studs","Studs"],["hoops","Hoops"]],
  neck:[["none","None"],["scarf","Scarf"],["necklace","Necklace"],["bowtie","Bow tie"]]
};
const INK = "#3B2E22";
const shade = (hex, f) => { const n = parseInt(hex.slice(1),16); let r = n>>16, g = n>>8&255, b = n&255; const t = f<0?0:255, a = Math.abs(f); r = Math.round(r+(t-r)*a); g = Math.round(g+(t-g)*a); b = Math.round(b+(t-b)*a); return "#"+((1<<24)|(r<<16)|(g<<8)|b).toString(16).slice(1); };
/* Head in a 64x64 box, face centred at (32,30) */
function headBack(av){
  const {hair, hc} = av;
  switch(hair){
    case "long": return `<path d="M17 30 Q16 13 32 13 Q48 13 47 30 L50 60 L14 60Z" fill="${hc}"/>`;
    case "wavy": return `<path d="M17 30 Q16 13 32 13 Q48 13 47 30 Q52 38 47 44 Q53 50 48 58 L16 58 Q11 50 17 44 Q12 38 17 30Z" fill="${hc}"/>`;
    case "bob": return `<path d="M17 30 Q16 13 32 13 Q48 13 47 30 L48 43 Q32 47 16 43Z" fill="${hc}"/>`;
    case "braid": return `<path d="M17 30 Q16 13 32 13 Q48 13 47 30 L46 38 L18 38Z" fill="${hc}"/>${[42,48,54].map(y=>`<ellipse cx="46" cy="${y}" rx="3.6" ry="3.8" fill="${hc}"/>`).join("")}`;
    case "ponytail": return `<path d="M44 20 Q56 26 52 46 Q50 54 46 56 Q48 44 44 34Z" fill="${hc}"/>`;
    case "bun": return `<circle cx="32" cy="11" r="7" fill="${hc}"/>`;
    case "spacebuns": return `<circle cx="20" cy="14" r="6.5" fill="${hc}"/><circle cx="44" cy="14" r="6.5" fill="${hc}"/>`;
    case "curly": return [[20,20],[26,14],[34,13],[41,17],[46,24],[18,29],[47,32],[16,37],[48,40]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7" fill="${hc}"/>`).join("");
    case "afro": return `<circle cx="32" cy="24" r="21" fill="${hc}"/>`;
    case "longwaves": return `<path d="M15 30 Q13 11 32 11 Q51 11 49 30 Q55 38 50 46 Q56 54 50 62 L14 62 Q8 54 14 46 Q9 38 15 30Z" fill="${hc}"/><path d="M16 42 q-3 8 1 14 M48 42 q3 8 -1 14" stroke="${shade(hc,.25)}" stroke-width="1.2" fill="none"/>`;
    case "curtain": return `<path d="M16 30 Q15 12 32 12 Q49 12 48 30 L50 58 Q42 60 40 50 L24 50 Q22 60 14 58Z" fill="${hc}"/>`;
    case "highpony": return `<path d="M32 9 Q46 4 50 16 Q54 30 46 44 Q47 30 42 20 Q38 14 32 13Z" fill="${hc}"/><circle cx="34" cy="10" r="3" fill="${shade(hc,-.25)}"/>`;
    case "manbun": return `<circle cx="38" cy="10" r="5.5" fill="${hc}"/>`;
    default: return "";
  }
}
function headFront(av){
  const {hair, hc} = av;
  const bangs = `<path d="M19.6 29 Q18.5 15.5 32 15.5 Q45.5 15.5 44.4 29 Q41 20.5 32 21 Q23 20.5 19.6 29Z" fill="${hc}"/>`;
  switch(hair){
    case "curly": return [[22,20],[28,17],[35,17],[41,20]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" fill="${hc}"/>`).join("");
    case "afro": return [[23,19],[29,16],[35,16],[41,19]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5.5" fill="${hc}"/>`).join("");
    case "short": return `<path d="M19 30 Q17 14 32 14 Q47 14 45 30 Q44 22 38 20 Q30 23 22 21 Q20 24 19 30Z" fill="${hc}"/>`;
    case "pixie": return `<path d="M19 31 Q17 14 32 14 Q47 14 45 29 Q42 24 40 22 L37 25 L34 21 L30 25 L27 21 L23 25 Q21 27 19 31Z" fill="${hc}"/>`;
    case "sidepart": return `<path d="M19 31 Q17 14 32 14 Q47 14 45 30 Q43 21 36 19 Q28 19 24 22 Q20 25 19 31Z" fill="${hc}"/><path d="M36 15 Q34 18 36 19.5" stroke="${shade(hc,-.25)}" stroke-width="1" fill="none"/>`;
    case "buzz": return `<path d="M19.6 28 Q19 16 32 16 Q45 16 44.4 28 Q42 20 32 19.5 Q22 20 19.6 28Z" fill="${hc}" opacity=".8"/>`;
    case "bald": return `<ellipse cx="27" cy="19" rx="4" ry="2" fill="#FFFFFF" opacity=".25"/>`;
    case "ponytail": case "bun": case "spacebuns": case "highpony": return `<path d="M19.6 29 Q18.5 15.5 32 15.5 Q45.5 15.5 44.4 29 Q42 21 32 19 Q22 21 19.6 29Z" fill="${hc}"/><path d="M26 17 Q30 18 32 19 M38 17 Q35 18 32 19" stroke="${shade(hc,.25)}" stroke-width=".9" fill="none"/>`;
    case "curtain": return `<path d="M19.4 31 Q18 15 32 15 Q46 15 44.6 31 Q42 22 34 21 Q32 26 30 21 Q22 22 19.4 31Z" fill="${hc}"/><path d="M31.6 16 Q31 20 32 24" stroke="${shade(hc,-.25)}" stroke-width=".8" fill="none"/>`;
    case "longwaves": return `<path d="M19 31 Q17 14 32 14 Q47 14 45 31 Q43 21 36 19 Q30 19 26 21 Q21 24 19 31Z" fill="${hc}"/><path d="M24 18 Q30 16 38 18" stroke="${shade(hc,.3)}" stroke-width="1" fill="none"/>`;
    case "quiff": return `<path d="M19.4 30 Q19 18 24 15 Q28 6 38 8 Q46 10 44.6 24 Q44.6 27 44.6 30 Q43 22 37 20 Q30 21 24 21 Q21 24 19.4 30Z" fill="${hc}"/><path d="M27 12 Q33 8 40 11" stroke="${shade(hc,.3)}" stroke-width="1" fill="none"/>`;
    case "undercut": return `<path d="M19.6 30 Q19 20 21 18 L21 30Z M44.4 30 Q45 20 43 18 L43 30Z" fill="${hc}" opacity=".45"/><path d="M20 21 Q22 11 34 11 Q46 12 45 20 Q38 16 30 22 Q24 20 20 21Z" fill="${hc}"/>`;
    case "slicked": return `<path d="M19.6 28 Q19 14 32 13.6 Q45 14 44.4 28 Q43 19 32 18.6 Q21 19 19.6 28Z" fill="${hc}"/>${[25,29,33,37].map(x=>`<path d="M${x} 15 Q${x+1} 17 ${x} 19" stroke="${shade(hc,.3)}" stroke-width=".7" fill="none"/>`).join("")}`;
    case "crew": return `<path d="M19.6 29 Q19 16 32 16 Q45 16 44.4 29 Q43 22 40 21 L24 21 Q21 22 19.6 29Z" fill="${hc}"/><path d="M19.8 29 v5 M44.2 29 v5" stroke="${hc}" stroke-width="1.6"/>`;
    case "manbun": return `<path d="M19.6 29 Q18.5 15.5 32 15.5 Q45.5 15.5 44.4 29 Q42 20 32 18.6 Q22 20 19.6 29Z" fill="${hc}"/><path d="M24 18 Q32 15 40 18" stroke="${shade(hc,.3)}" stroke-width=".8" fill="none"/>`;
    default: return bangs + `<path d="M24 19 Q28 23 27 27 M36 18 Q34 23 36 27" stroke="${shade(hc,.28)}" stroke-width=".8" fill="none"/>`;
  }
}
function faceShape(av){
  const s = av.skin;
  if (av.face==="round") return `<circle cx="32" cy="30.5" r="13.2" fill="${s}"/>`;
  if (av.face==="angular") return `<path d="M19.4 27 Q19.4 16.5 32 16.5 Q44.6 16.5 44.6 27 L43.6 35 Q40.5 43.2 32 44 Q23.5 43.2 20.4 35Z" fill="${s}"/>`;
  return `<ellipse cx="32" cy="30" rx="12.5" ry="13.8" fill="${s}"/>`;
}
function faceFeatures(av, mood){
  let s = "";
  const dark = ["#6B4129","#4A2C1C","#5E3B26"].includes(av.skin);
  const lid = dark ? "#150B06" : INK;
  if (dark) s += `<ellipse cx="27.6" cy="31.6" rx="3" ry="1.6" fill="#FFF" opacity=".12"/><ellipse cx="36.4" cy="31.6" rx="3" ry="1.6" fill="#FFF" opacity=".12"/>`;
  if (av.eyes==="open") s += `<g class="blink"><circle cx="27.6" cy="31" r="1.7" fill="${lid}"/><circle cx="36.4" cy="31" r="1.7" fill="${lid}"/><circle cx="28.1" cy="30.4" r=".55" fill="#FFF"/><circle cx="36.9" cy="30.4" r=".55" fill="#FFF"/></g>`;
  else if (av.eyes==="sleepy") s += `<path d="M25.6 31.6 h4.2 M34.2 31.6 h4.2" stroke="${lid}" stroke-width="1.4" stroke-linecap="round"/>`;
  else { s += `<path d="M25.5 31.5 q2.3 2 4.6 0 M33.9 31.5 q2.3 2 4.6 0" stroke="${lid}" stroke-width="${dark?1.7:1.3}" fill="none" stroke-linecap="round"/>`; if (av.eyes==="lashes") s += `<path d="M25.4 31.2 l-1.3 -.9 M30.2 31.2 l1.3 -.9 M33.8 31.2 l-1.3 -.9 M38.6 31.2 l1.3 -.9" stroke="${lid}" stroke-width="1" stroke-linecap="round"/>`; }
  const bc = shade(av.hc==="#EBDDB4"||av.hc==="#CFCBC4" ? "#8A7A68" : av.hc, -.15);
  if (av.brows==="soft") s += `<path d="M25 27 q2.6 -1.6 5.2 -.4 M33.8 26.6 q2.6 -1.2 5.2 .4" stroke="${bc}" stroke-width="1" fill="none" stroke-linecap="round"/>`;
  if (av.brows==="bold") s += `<path d="M24.8 27.2 q2.8 -2 5.6 -.8 M33.6 26.4 q2.8 -1.2 5.6 .8" stroke="${bc}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  if (av.details==="blush"||av.details==="both") s += `<ellipse cx="25" cy="35.5" rx="2.4" ry="1.4" fill="#E08A76" opacity=".55"/><ellipse cx="39" cy="35.5" rx="2.4" ry="1.4" fill="#E08A76" opacity=".55"/>`;
  if (av.details==="freckles"||av.details==="both") s += [[24,34],[26,35.4],[27.4,33.6],[36.6,33.6],[38,35.4],[40,34]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".55" fill="${shade(av.skin,-.35)}"/>`).join("");
  const fh = av.hc==="#EBDDB4" ? "#9A8A70" : av.hc;
  if (av.facial==="stubble") s += `<path d="M21 35 Q23 43 32 44 Q41 43 43 35 Q40 40 32 40.5 Q24 40 21 35Z" fill="${fh}" opacity=".28"/>`;
  if (av.facial==="beard") s += `<path d="M19.8 31 Q20 44 32 46.5 Q44 44 44.2 31 Q42 39 37 39 Q32 37 27 39 Q22 39 19.8 31Z" fill="${fh}"/>`;
  if (av.facial==="goatee") s += `<path d="M29 39.5 Q32 46 35 39.5 Q32 41 29 39.5Z" fill="${fh}"/>`;
  if (av.facial==="mustache"||av.facial==="beard"||av.facial==="goatee") s += `<path d="M27.6 37.4 Q30 35.6 32 36.8 Q34 35.6 36.4 37.4 Q34 38.6 32 37.8 Q30 38.6 27.6 37.4Z" fill="${fh}"/>`;
  else if (av.facial==="stubble"||av.facial==="none") s += mood==="big" ? `<path d="M29.6 37 q2.4 3 4.8 0Z" fill="#8E3B30"/>` : av.body==="fem" ? `<path d="M30 37.4 q2 1.8 4 0 q-2 -.6 -4 0Z" fill="#C2566A"/>` : `<path d="M30.4 37.6 q1.6 1.3 3.2 0" stroke="${dark?"#E8B8A0":INK}" stroke-width="1.1" fill="none" stroke-linecap="round"/>`;
  if (av.facial==="beard"||av.facial==="goatee") s += `<path d="M30.4 38.6 q1.6 1 3.2 0" stroke="${INK}" stroke-width="1" fill="none" stroke-linecap="round" opacity=".7"/>`;
  return s;
}
function headAcc(av){
  let s = "";
  const L = av._look?.wear || {};
  if (L.head || L.face) av = {...av, head: L.head ? "none" : av.head, glasses: L.face ? "none" : av.glasses};
  const ears = {studs:`<circle cx="19.6" cy="34" r="1.2" fill="#E7D7A6"/><circle cx="44.4" cy="34" r="1.2" fill="#E7D7A6"/>`, hoops:`<circle cx="19.6" cy="36.4" r="2.6" fill="none" stroke="#D9A441" stroke-width="1.1"/><circle cx="44.4" cy="36.4" r="2.6" fill="none" stroke="#D9A441" stroke-width="1.1"/>`}[av.ears];
  if (ears) s += ears;
  switch(av.glasses){
    case "round": s += `<circle cx="27.5" cy="31" r="4.3" fill="none" stroke="${INK}" stroke-width="1.3"/><circle cx="36.5" cy="31" r="4.3" fill="none" stroke="${INK}" stroke-width="1.3"/><path d="M31.8 31 h.4" stroke="${INK}" stroke-width="1.3"/>`; break;
    case "square": s += `<rect x="22.8" y="27.6" width="9" height="7" rx="1.4" fill="none" stroke="${INK}" stroke-width="1.4"/><rect x="32.2" y="27.6" width="9" height="7" rx="1.4" fill="none" stroke="${INK}" stroke-width="1.4"/>`; break;
    case "cateye": s += `<path d="M22.4 28.4 Q27 26.6 31.4 29 Q30.6 34.6 27 34.6 Q23 34.4 22.4 28.4Z M41.6 28.4 Q37 26.6 32.6 29 Q33.4 34.6 37 34.6 Q41 34.4 41.6 28.4Z" fill="none" stroke="#7A2E3A" stroke-width="1.4"/>`; break;
    case "sun": s += `<rect x="22.6" y="28" width="9.2" height="6.4" rx="3" fill="#2E2A28"/><rect x="32.2" y="28" width="9.2" height="6.4" rx="3" fill="#2E2A28"/><path d="M31.8 30 h.4" stroke="#2E2A28" stroke-width="1.4"/><path d="M24.6 29.6 l2 -.8" stroke="#FFF" stroke-width=".8" opacity=".6"/>`; break;
  }
  switch(av.head){
    case "beret": s += `<ellipse cx="30" cy="16" rx="15" ry="5.5" transform="rotate(-12 30 16)" fill="#B8423A"/><circle cx="29" cy="10.5" r="1.6" fill="#B8423A"/>`; break;
    case "beanie": s += `<path d="M18.5 24 Q18 10 32 10 Q46 10 45.5 24Z" fill="#C8743E"/><rect x="17.5" y="21" width="29" height="6" rx="3" fill="#A85C2E"/><circle cx="32" cy="8.5" r="3.6" fill="#EFE6D2"/>${[22,26,30,34,38,42].map(x=>`<path d="M${x} 21.6 v4.8" stroke="#8E4C25" stroke-width=".8"/>`).join("")}`; break;
    case "cap": s += `<path d="M19 23 Q19 11 32 11 Q45 11 45 23Z" fill="#34476B"/><path d="M38 22 Q50 21 52 24 Q46 25.5 38 24.5Z" fill="#2A3A58"/><circle cx="32" cy="11.5" r="1.2" fill="#2A3A58"/>`; break;
    case "sunhat": s += `<ellipse cx="32" cy="20" rx="23" ry="5.5" fill="#E2C98E"/><path d="M21 20 Q21 9 32 9 Q43 9 43 20Z" fill="#E8D19B"/><path d="M21.4 17.6 Q32 20.4 42.6 17.6 L42.8 20 Q32 22.6 21.2 20Z" fill="#B8423A"/>`; break;
    case "bucket": s += `<path d="M14 23 L19 21 Q20 10 32 10 Q44 10 45 21 L50 23 Q32 27 14 23Z" fill="#8FA36A"/><path d="M19 21 Q32 23.5 45 21" stroke="#6E8250" stroke-width="1" fill="none"/>`; break;
    case "crown": s += [[19,22,"#E07A5F"],[22.5,17.5,"#F2C14E"],[27,14.5,"#D88C98"],[32,13.6,"#FBF7EE"],[37,14.5,"#D88C98"],[41.5,17.5,"#F2C14E"],[45,22,"#E07A5F"]].map(([x,y,c])=>`<circle cx="${x}" cy="${y}" r="2.8" fill="${c}"/><circle cx="${x}" cy="${y}" r="1" fill="#C98A2E"/>`).join("") + `<ellipse cx="25" cy="16.2" rx="2.2" ry="1" transform="rotate(-30 25 16.2)" fill="#7FA35A"/><ellipse cx="39" cy="16.2" rx="2.2" ry="1" transform="rotate(30 39 16.2)" fill="#7FA35A"/>`; break;
    case "headband": s += `<path d="M19.2 24 Q20 14.6 32 14.6 Q44 14.6 44.8 24" stroke="#D88C98" stroke-width="3.2" fill="none" stroke-linecap="round"/>`; break;
    case "headphones": s += `<path d="M17.5 30 A14.5 14.5 0 0 1 46.5 30" stroke="${INK}" stroke-width="3" fill="none"/><rect x="14.5" y="26" width="6" height="10" rx="3" fill="#5E6A3E"/><rect x="43.5" y="26" width="6" height="10" rx="3" fill="#5E6A3E"/>`; break;
    case "flower": s += `${[0,72,144,216,288].map(r=>`<ellipse cx="43" cy="17" rx="2" ry="3.4" transform="rotate(${r} 43 20)" fill="#FBF7EE"/>`).join("")}<circle cx="43" cy="20" r="1.8" fill="#D29B3E"/>`; break;
  }
  if (L.head) s += accHead(L.head);
  if (L.face) s += accHead(L.face);
  return s;
}
function headSVG(av, mood){ return headBack(av) + faceShape(av) + `<path d="M19.6 32 q-2.6 0 -2.2 3 q.4 2.6 2.6 2.2Z M44.4 32 q2.6 0 2.2 3 q-.4 2.6 -2.6 2.2Z" fill="${av.skin}"/>` + headFront(av) + faceFeatures(av, mood) + headAcc(av); }
/* Bust clothing for the round portrait */
function bustSVG(av){
  const c = av.topc, d = shade(c,-.2), l = shade(c,.25);
  const base = `<path d="M9 66 Q11 47 32 46 Q53 47 55 66Z" fill="${c}"/>`;
  switch(av.top){
    case "cardigan": return base + `<path d="M26 46 L32 60 L38 46" fill="#F4EDE0"/><path d="M32 60 V66" stroke="${d}" stroke-width="1.2"/><circle cx="33.6" cy="61" r=".9" fill="${l}"/><circle cx="33.6" cy="64.4" r=".9" fill="${l}"/>`;
    case "tshirt": return base + `<path d="M26 46.4 Q32 51 38 46.4" stroke="${d}" stroke-width="1.6" fill="none"/>`;
    case "breton": return `<path d="M9 66 Q11 47 32 46 Q53 47 55 66Z" fill="#F4EDE0"/>${[52,57,62].map(y=>`<path d="M10 ${y} H54" stroke="${c}" stroke-width="2.4"/>`).join("")}<path d="M26 46.4 Q32 50 38 46.4" stroke="#D9CFBC" stroke-width="1.4" fill="none"/>`;
    case "hoodie": return `<path d="M20 50 Q32 40 44 50 Q38 47 32 47 Q26 47 20 50Z" fill="${d}"/>` + base + `<path d="M28 48 v8 M36 48 v8" stroke="#F4EDE0" stroke-width="1"/>`;
    case "shirt": return base + `<path d="M26 46 L32 52 L29 55Z M38 46 L32 52 L35 55Z" fill="${l}"/><path d="M32 52 V66" stroke="${d}" stroke-width="1"/><circle cx="32" cy="57" r=".9" fill="${d}"/><circle cx="32" cy="62" r=".9" fill="${d}"/>`;
    case "turtleneck": return base + `<rect x="26" y="40" width="12" height="9" rx="3" fill="${d}"/>`;
    case "jacket": return `<path d="M9 66 Q11 47 32 46 Q53 47 55 66Z" fill="${c}"/><path d="M27 46 L32 66 L37 46 Q32 49 27 46Z" fill="#F4EDE0"/><path d="M27 46 L30 56 L25 52Z M37 46 L34 56 L39 52Z" fill="${d}"/>`;
    case "overalls": return `<path d="M9 66 Q11 47 32 46 Q53 47 55 66Z" fill="#F4EDE0"/><rect x="23" y="55" width="18" height="12" rx="2" fill="${c}"/><path d="M24 56 L22 47 M40 56 L42 47" stroke="${c}" stroke-width="3"/><circle cx="25" cy="57" r="1.1" fill="#D9A441"/><circle cx="39" cy="57" r="1.1" fill="#D9A441"/>`;
    case "dress": return `<path d="M12 66 Q14 50 22 48 L26 52 Q32 56 38 52 L42 48 Q50 50 52 66Z" fill="${c}"/><path d="M22 48 L24 44 M42 48 L40 44" stroke="${c}" stroke-width="2"/>`;
    default: return base + `<path d="M26 46 q6 5 12 0" stroke="${d}" stroke-width="2.2" fill="none"/><path d="M14 64 h36" stroke="${d}" stroke-width="1" opacity=".4"/>`;
  }
}
function neckSVG(av, snow){
  const LN = av._look?.wear?.neck; if (LN) return accHead(LN);
  const n = av.neck==="none" && snow ? "scarf" : av.neck;
  if (n==="scarf") return `<path d="M24 44.5 Q32 50 40 44.5 L41 48 Q32 54 23 48Z" fill="#B8423A"/><path d="M36 49 l3 10 l-5 1Z" fill="#B8423A"/><path d="M25 46.5 Q32 51 39 46.5" stroke="#E07A5F" stroke-width="1" fill="none"/>`;
  if (n==="necklace") return `<path d="M26 46 Q32 54 38 46" stroke="#D9A441" stroke-width=".9" fill="none"/><circle cx="32" cy="51.4" r="1.4" fill="#D9A441"/>`;
  if (n==="bowtie") return `<path d="M32 47.5 L27 45 L27 50Z M32 47.5 L37 45 L37 50Z" fill="#B8423A"/><circle cx="32" cy="47.5" r="1.2" fill="#8E2F28"/>`;
  return "";
}
let avSeq = 0;
function avatarSVG(av, p, cls="av"){
  const cid = "avc" + (++avSeq), bg = p==="a" ? "var(--a-soft)" : "var(--b-soft)";
  const O = OUTFITS[av._look?.outfit];
  return `<svg class="${cls}" viewBox="0 0 64 64" aria-hidden="true"><defs><clipPath id="${cid}"><circle cx="32" cy="32" r="32"/></clipPath></defs>
    <g clip-path="url(#${cid})"><rect width="64" height="64" fill="${bg}"/>${headBack(av)}<g transform="translate(32 0) scale(${av.body==="fem"?.9:av.body==="masc"?1.1:1} 1) translate(-32 0)">${O ? outfitBust(O, av) : bustSVG(av)}</g><rect x="28" y="38" width="8" height="9" rx="3" fill="${av.skin}"/>${O && (O.collar==="cross"||O.collar==="high"||O.collar==="hood") ? "" : neckSVG(av)}${faceShape(av)}<path d="M19.6 32 q-2.6 0 -2.2 3 q.4 2.6 2.6 2.2Z M44.4 32 q2.6 0 2.2 3 q-.4 2.6 -2.6 2.2Z" fill="${av.skin}"/>${headFront(av)}${faceFeatures(av)}${headAcc(av)}</g></svg>`;
}
/*FIGURE*/
function randomAvatar(){
  const pick = k => AV_OPTS[k][Math.floor(Math.random()*AV_OPTS[k].length)][0];
  const o = {}; for (const k in AV_OPTS) o[k] = pick(k);
  if (Math.random() < .6 || o.body==="fem") o.facial = "none"; if (Math.random() < .5) o.head = "none"; if (Math.random() < .5) o.glasses = "none"; if (Math.random() < .5) o.neck = "none";
  return o;
}
