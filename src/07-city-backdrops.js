/* ---------- trees for four seasons ---------- */
const FOL = {
  broad:{spring:["#A3C46A","#B9D47F","#8FB35A"], summer:["#6E9A45","#7FAA52","#5C8A3C"], fall:["#D07A36","#E0A045","#B9612C","#E8C25A"], winter:null},
  blossom:{spring:["#F5C6D3","#FBE0E8","#EFB0C3","#F8D3DE"], summer:["#78A24C","#8DB55E"], fall:["#C8452E","#E0703A","#D9A13B"], winter:null},
  maple:{spring:["#A9C870","#C3DA8A"], summer:["#6E9A45","#86AE58"], fall:["#C8372B","#E0582E","#F08A3C","#B32E25"], winter:null},
  ginkgo:{spring:["#B7D27C","#C9DE93"], summer:["#7FA54E","#93B862"], fall:["#E8C33C","#F2D35E","#D9AE2E"], winter:null},
  pine:{spring:["#5E7A45","#6F8C50"], summer:["#53703D","#64824A"], fall:["#5E7A45","#6F8C50"], winter:["#5A6E4A","#6A7E58"]},
  olive:{spring:["#9AAA86","#B3BFA0","#8A9C78"], summer:["#8E9F7A","#A6B592"], fall:["#9AAA86","#B3BFA0"], winter:["#97A587","#AAB69C"]},
  cypress:{spring:["#4E6B3E","#5C7A47"], summer:["#45603A","#557243"], fall:["#4E6B3E","#5C7A47"], winter:["#4C6340","#5A7049"]}
};
function canopy(cx, cy, r, cols, R, n=9){ let s = ""; for (let i=0;i<n;i++){ const a = R()*Math.PI*2, d = R()*r*.7; s += `<circle cx="${(cx+Math.cos(a)*d).toFixed(1)}" cy="${(cy+Math.sin(a)*d*.8).toFixed(1)}" r="${(r*.42+R()*r*.25).toFixed(1)}" fill="${cols[i%cols.length]}"/>`; } return s; }
function tree(kind, x, base, h, season, R, snowy){
  const cols = FOL[kind]?.[season];
  const trunk = kind==="olive" ? "#6B5E4A" : kind==="cypress" ? "#4A3A2C" : "#5B4636";
  let s = `<g class="sway">`;
  if (kind==="pine") {
    s += `<path d="M${x} ${base} C${x+3} ${base-h*.4} ${x-6} ${base-h*.6} ${x+2} ${base-h*.82}" stroke="${trunk}" stroke-width="${Math.max(2,h*.05)}" fill="none"/><path d="M${x+1} ${base-h*.7} l-${h*.18} -${h*.08} M${x+1} ${base-h*.74} l${h*.2} -${h*.07}" stroke="${trunk}" stroke-width="1.6"/>`;
    for (let i=0;i<7;i++) s += `<ellipse cx="${(x-h*.32+i*h*.105).toFixed(1)}" cy="${(base-h*.86+(R()*h*.06)).toFixed(1)}" rx="${(h*.14).toFixed(1)}" ry="${(h*.08).toFixed(1)}" fill="${cols[i%2]}"/>`;
    if (snowy) s += `<path d="M${x-h*.4} ${base-h*.9} Q${x} ${base-h*1.02} ${x+h*.4} ${base-h*.9}" stroke="#FFF" stroke-width="2.4" fill="none"/>`;
    return s + `</g>`;
  }
  if (kind==="cypress") {
    s += `<path d="M${x} ${base} V${base-h*.15}" stroke="${trunk}" stroke-width="2.4"/><path d="M${x} ${base-h} C${x+h*.16} ${base-h*.7} ${x+h*.14} ${base-h*.25} ${x} ${base-h*.12} C${x-h*.14} ${base-h*.25} ${x-h*.16} ${base-h*.7} ${x} ${base-h}Z" fill="${cols[0]}"/><path d="M${x+1} ${base-h*.9} C${x+h*.1} ${base-h*.65} ${x+h*.09} ${base-h*.3} ${x+1} ${base-h*.16}" stroke="${cols[1]}" stroke-width="2" fill="none"/>`;
    if (snowy) s += `<path d="M${x-3} ${base-h*.86} q3 -4 6 0" stroke="#FFF" stroke-width="2" fill="none"/>`;
    return s + `</g>`;
  }
  const r = h*.34, cy = base - h*.66;
  s += `<path d="M${x} ${base} C${x+2} ${base-h*.3} ${x-3} ${base-h*.45} ${x} ${cy+r*.3}" stroke="${trunk}" stroke-width="${Math.max(2.2,h*.06).toFixed(1)}" fill="none" stroke-linecap="round"/>`;
  if (!cols) {
    for (let i=0;i<6;i++){ const a = -Math.PI/2 + (i-2.5)*.45, len = r*(.8+R()*.4); s += `<path d="M${x} ${(cy+r*.3).toFixed(1)} q${(Math.cos(a)*len*.4).toFixed(1)} ${(Math.sin(a)*len*.6).toFixed(1)} ${(Math.cos(a)*len).toFixed(1)} ${(Math.sin(a)*len).toFixed(1)}" stroke="${trunk}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`; }
    if (snowy || season==="winter") s += `<path d="M${x-r*.6} ${cy-r*.1} q${r*.3} -${r*.2} ${r*.6} 0 M${x+r*.1} ${cy-r*.5} q${r*.25} -${r*.15} ${r*.5} 0" stroke="#FFF" stroke-width="2" fill="none" opacity=".9"/>`;
    return s + `</g>`;
  }
  s += canopy(x, cy, r, cols, R, kind==="olive"?11:9);
  if (kind==="olive") for (let i=0;i<6;i++) s += `<ellipse cx="${(x-r*.6+R()*r*1.2).toFixed(1)}" cy="${(cy-r*.5+R()*r).toFixed(1)}" rx="2.4" ry="1" fill="#D7DEC9" opacity=".8"/>`;
  if (kind==="broad" && season==="spring" && R()>.5) for (let i=0;i<5;i++) s += `<ellipse cx="${(x-r*.6+R()*r*1.2).toFixed(1)}" cy="${(cy-r*.5+R()*r).toFixed(1)}" rx="1.6" ry="3.2" fill="#F7F1E6"/>`;
  if (snowy) s += `<path d="M${x-r*.7} ${cy-r*.5} Q${x} ${cy-r*1.05} ${x+r*.7} ${cy-r*.5}" stroke="#FFF" stroke-width="3" fill="none" opacity=".9"/>`;
  return s + `</g>`;
}
const GRASS = {spring:["#A9C27A","#9DB76D"], summer:["#93B160","#87A555"], fall:["#B9B07A","#ADA46E"], winter:["#C9CCC0","#BCC0B3"]};

/* ---------- backdrops (360 wide, horizon at y=125) ---------- */
function bdHutong(season, snowy, R){
  let s = `<path d="M-10 74 Q25 62 60 62 L170 62 Q200 62 220 74Z" fill="#A9AEB4"/><rect x="0" y="74" width="214" height="51" fill="#B6B8BA"/>`;
  s += tree(season==="spring"?"blossom":"ginkgo", 150, 96, 70, season, R, snowy);
  s += tree(season==="spring"?"blossom":"broad", 70, 125, 92, season, R, snowy);
  if (season==="fall") s += [[60,58],[84,62],[74,78],[94,70],[52,72],[80,48]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.6" fill="#E3672A"/>`).join("");
  s += `<rect x="0" y="94" width="186" height="31" fill="#9EA2A7"/><path d="M-4 96 L190 96 L186 89 L0 89Z" fill="#5A6068"/>${Array.from({length:5},(_,i)=>`<line x1="0" x2="186" y1="${100+i*5}" y2="${100+i*5}" stroke="#B3B6BA" stroke-width=".7"/>`).join("")}`;
  s += `<g stroke="#3E3A36" stroke-width="1.6" fill="none"><circle cx="128" cy="116" r="8"/><circle cx="156" cy="116" r="8"/><path d="M128 116 L138 104 L152 104 L156 116 M138 104 L142 116 L128 116 M150 100 h6 M136 101 h5"/></g><rect x="148" y="98" width="11" height="6" rx="1" fill="#C98A2E"/>`;
  s += `<rect x="186" y="72" width="180" height="53" fill="#8E9298"/>${Array.from({length:9},(_,i)=>`<line x1="186" x2="366" y1="${77+i*6}" y2="${77+i*6}" stroke="#A3A7AC" stroke-width=".7"/>`).join("")}`;
  s += `<path d="M176 74 Q190 70 194 58 L354 58 Q358 70 372 74Z" fill="#525960"/>${Array.from({length:20},(_,i)=>`<line x1="${196+i*8}" x2="${194+i*8.4}" y1="59" y2="73" stroke="#686F77" stroke-width="1.2"/>`).join("")}<path d="M188 58 Q186 50 180 50 L192 54 L356 54 L368 50 Q362 50 360 58Z" fill="#41474E"/>`;
  s += `<rect x="234" y="80" width="44" height="45" fill="#3E3A36"/><rect x="238" y="84" width="17.5" height="41" fill="#A8322A"/><rect x="256.5" y="84" width="17.5" height="41" fill="#A8322A"/>${[90,98,106].map(y=>[242,248,262,268].map(x=>`<circle cx="${x}" cy="${y}" r="1.1" fill="#D9A441"/>`).join("")).join("")}`;
  s += `<rect x="226" y="86" width="6" height="34" fill="#C23B2E"/><rect x="280" y="86" width="6" height="34" fill="#C23B2E"/><rect x="246" y="76" width="20" height="6" fill="#C23B2E"/>`;
  for (const x of [212,302]) s += `<g transform="translate(${x} 66)"><g class="swing"><line x1="0" y1="0" x2="0" y2="8" stroke="#3E3A36"/><rect x="-4" y="7" width="8" height="2.5" fill="#D9A441"/><ellipse cx="0" cy="17" rx="8" ry="8.5" fill="#C9372C"/><path d="M-6 17h12" stroke="#E0624F" stroke-width="1"/><rect x="-4" y="24.5" width="8" height="2.5" fill="#D9A441"/><path d="M0 27 v6" stroke="#D9A441" stroke-width="1.5"/></g></g>`;
  s += `<path d="M326 112 h18 l-2 13 h-14z" fill="#8C5A3C"/>${canopy(335,105,9,FOL.broad[season]||["#8E9298"],R,5)}`;
  if (snowy) s += `<path d="M0 89 L186 89" stroke="#FFF" stroke-width="3"/><path d="M190 54 L356 54" stroke="#FFF" stroke-width="4"/><path d="M-10 74 Q25 62 60 62 L170 62" stroke="#FFF" stroke-width="2.5" fill="none"/>`;
  return s;
}
function willow(x, sc, season, R){
  const wil = {spring:["#A7C266","#BCD47D"], summer:["#7FA54E","#93B862"], fall:["#D8B444","#E6C964"], winter:["#9C8C6A","#B0A07E"]}[season];
  let s = `<g transform="translate(${x} 0) scale(${sc} 1)"><path d="M0 125 C2 100 -4 80 4 50" stroke="#5B4636" stroke-width="5" fill="none"/><g class="sway">${season==="winter"?"":canopy(4,44,24,wil,R)}`;
  for (let i=0;i<16;i++){ const sx = -28+i*3.8, len = 40+R()*34; s += `<path d="M${sx.toFixed(1)} ${(44+R()*8).toFixed(1)} q${(R()*4-2).toFixed(1)} ${(len/2).toFixed(0)} ${(R()*6-3).toFixed(1)} ${len.toFixed(0)}" stroke="${wil[i%2]}" stroke-width="${season==="winter"?1:1.6}" fill="none" stroke-linecap="round"/>`; }
  return s + `</g></g>`;
}
function water(y0, h, col, R, n=9, w=360){ let s = `<rect x="0" y="${y0}" width="${w}" height="${h}" fill="${col}"/>`; for (let i=0;i<n;i++) s += `<path class="shimmer" style="--del:-${(R()*3).toFixed(2)}s" d="M${(R()*(w-30)).toFixed(0)} ${(y0+3+R()*(h-6)).toFixed(0)} h${(12+R()*20).toFixed(0)}" stroke="#E7F0F0" stroke-width="1.3" stroke-linecap="round"/>`; return s; }
function bdHouhai(season, snowy, R){
  let s = `<path d="M0 82 Q60 64 120 76 Q190 60 260 74 Q320 64 360 76 L360 90 L0 90Z" fill="#A4B1A1" opacity=".7"/>`;
  s += `<g opacity=".85"><rect x="236" y="72" width="54" height="18" fill="#9C8F84"/><path d="M248 72 a8 8 0 0 1 16 0Z M266 72 a8 8 0 0 1 16 0Z" fill="#6E655E"/><rect x="246" y="58" width="34" height="13" fill="#9E4A3C"/><path d="M228 74 Q240 70 244 66 L282 66 Q286 70 298 74Z" fill="#4C4F55"/><path d="M236 59 Q246 54 250 48 L276 48 Q280 54 290 59Z" fill="#4C4F55"/></g>`;
  s += water(88, 26, season==="winter"?"#B9C9CF":"#8FB4BE", R);
  s += `<g transform="translate(170 100)"><g class="bob"><path d="M-14 0 h28 l-5 6 h-18z" fill="#7A4E35"/><path d="M-2 -10 v10 M-2 -10 l10 8 h-10" stroke="#3E3A36" stroke-width="1" fill="#F4EAD6"/></g></g>`;
  s += `<rect x="0" y="113" width="360" height="4" fill="#EAE4D8"/>${Array.from({length:13},(_,i)=>`<rect x="${i*30+4}" y="109" width="5" height="16" fill="#E2DACB"/>`).join("")}<rect x="0" y="120" width="360" height="2" fill="#D9D0BF"/>`;
  s += willow(52,1,season,R) + willow(196,.7,season,R) + willow(318,.9,season,R);
  if (snowy) s += `<rect x="0" y="111" width="360" height="2.5" fill="#FFF"/><path d="M236 59 L290 59 M228 74 L298 74" stroke="#FFF" stroke-width="2"/>`;
  return s;
}
function haussmann(x, w, top, base, i, snowy){
  let s = `<path d="M${x} ${top} L${x+6} ${top-16} L${x+w-6} ${top-16} L${x+w} ${top}Z" fill="#7E8C99"/>`;
  for (let k=0;k<Math.floor(w/28);k++) s += `<rect x="${x+12+k*26}" y="${top-12}" width="8" height="9" rx="4" fill="#E9DEC8" stroke="#6F7C88"/>`;
  s += `<rect x="${x+10}" y="${top-24}" width="10" height="9" fill="#B9A58A"/><rect x="${x+12}" y="${top-28}" width="3" height="4" fill="#C26B45"/><rect x="${x+16}" y="${top-28}" width="3" height="4" fill="#C26B45"/>`;
  s += `<rect x="${x}" y="${top}" width="${w}" height="${base-top}" fill="${i%2?"#E2D5BC":"#EADFC9"}" stroke="#CDBFA5" stroke-width=".6"/>`;
  for (let r=0; top+6+r*15 < base-8; r++) { for (let c=0;c<Math.floor(w/21);c++) s += `<rect x="${x+7+c*21}" y="${top+6+r*15}" width="8" height="11" fill="#6E7F8D"/>`; if (r===1||r===3) s += `<line x1="${x+3}" x2="${x+w-3}" y1="${top+17+r*15}" y2="${top+17+r*15}" stroke="#2F2F2F" stroke-width="1.4"/>`; }
  if (snowy) s += `<path d="M${x+6} ${top-16} L${x+w-6} ${top-16}" stroke="#FFF" stroke-width="3"/>`;
  return s;
}
function bdSeine(season, snowy, R){
  let s = "";
  [[0,90,30],[90,92,22],[182,88,32],[270,92,24]].forEach(([x,w,top],i) => s += haussmann(x,w,top,92,i,snowy));
  s += water(90, 22, season==="winter"?"#A9BCC0":"#8AA6AC", R, 10);
  s += `<path d="M-10 84 L150 84 L150 92 L-10 92Z" fill="#CDBFA5"/><path d="M10 92 a22 14 0 0 1 44 0Z M74 92 a22 14 0 0 1 44 0Z" fill="#7B979D"/><path d="M-10 84 L150 84" stroke="#B5A68A" stroke-width="2"/>`;
  s += `<rect x="0" y="111" width="360" height="14" fill="#C9B99A"/>${Array.from({length:12},(_,i)=>`<line x1="${i*32}" x2="${i*32}" y1="111" y2="125" stroke="#B7A684" stroke-width=".8"/>`).join("")}`;
  s += [60,140,220].map(x=>`<rect x="${x}" y="104" width="26" height="8" fill="#3F6B4A"/><rect x="${x}" y="102" width="26" height="3" fill="#2F5238"/>`).join("");
  for (const x of [26,100,176,250,330]) s += tree("broad", x, 125, 70+R()*20, season, R, snowy);
  s += `<g stroke="#2A2A2A" stroke-width="1.6" fill="none"><path d="M300 125 V86"/><path d="M296 86 h8 l-1 -7 h-6z" fill="#3A3A3A"/></g><circle cx="300" cy="83" r="2.4" fill="#F1D48A" class="glow"/>`;
  if (snowy) s += `<rect x="0" y="110" width="360" height="2.5" fill="#FFF"/>`;
  return s;
}
function bdJardin(season, snowy, R){
  let s = `<g opacity=".75"><path d="M266 112 L276 74 L279 50 L282 24 L285 50 L288 74 L298 112 L290 112 Q282 94 274 112Z" fill="#8E9AA6"/><path d="M272 88 h20 M276 72 h12 M279 50 h6" stroke="#8E9AA6" stroke-width="3"/><path d="M282 24 v-8" stroke="#8E9AA6" stroke-width="1.5"/></g>`;
  s += `<g opacity=".55">${haussmann(0,70,64,104,0,snowy)}${haussmann(316,70,60,104,1,snowy)}</g>`;
  for (let i=0;i<9;i++) s += tree("broad", 14+i*40, 108, 46+R()*14, season, R, snowy).replace('class="sway"','class="sway" opacity=".8"');
  s += `<rect x="0" y="106" width="360" height="19" fill="#DCCDAE"/><path d="M0 106 h360" stroke="#C4B48F"/>`;
  for (const x of [20,110,250,342]) s += tree("broad", x, 124, 86+R()*20, season, R, snowy);
  s += `<g stroke="#4E7A55" stroke-width="2" fill="none" stroke-linecap="round">${[56,170].map(x=>`<path d="M${x} 124 l2 -12 h12 l2 12 M${x+2} 112 l-2 -12 M${x+1} 106 h3"/>`).join("")}</g>`;
  s += `<g transform="translate(206 116)"><ellipse rx="26" ry="5" fill="#C9C1B2"/><ellipse rx="22" ry="3.6" fill="#9BB8C0"/><path d="M0 -2 v-12" stroke="#C9C1B2" stroke-width="3"/><path class="shimmer" d="M-3 -14 q3 -6 6 0" stroke="#DCEBEE" stroke-width="1.5" fill="none"/></g>`;
  if (snowy) s += `<rect x="0" y="104" width="360" height="3" fill="#FFF"/>`;
  return s;
}
function bdRome(season, snowy, R){
  let s = "";
  const ochre = ["#D9A45C","#E2B877","#C98A4A","#E8C690","#D39A5A"];
  for (let i=0;i<14;i++){ const x = i*27-6, h = 20+R()*18, w = 30; s += `<rect x="${x}" y="${104-h}" width="${w}" height="${h}" fill="${ochre[i%5]}"/><path d="M${x-2} ${104-h} L${x+w/2} ${98-h} L${x+w+2} ${104-h}Z" fill="#B5562C"/>${Array.from({length:3},(_,k)=>`<rect x="${x+5+k*8}" y="${110-h}" width="4" height="6" fill="#7A5A3A" opacity=".7"/>`).join("")}`; }
  s += `<g transform="translate(250 0)"><rect x="-20" y="64" width="40" height="22" fill="#E8DCC4"/><rect x="-14" y="52" width="28" height="13" fill="#DCCFB5"/><path d="M-16 52 Q-16 26 0 24 Q16 26 16 52Z" fill="#9AA6AC"/><path d="M-8 50 Q-8 30 0 28 M8 50 Q8 30 0 28 M0 24 V52" stroke="#7E8A90" stroke-width="1" fill="none"/><rect x="-3" y="14" width="6" height="10" fill="#E8DCC4"/><circle cx="0" cy="12" r="2.4" fill="#C9B38E"/></g>`;
  s += `<g transform="translate(118 0)"><rect x="-10" y="76" width="20" height="14" fill="#E2D2B4"/><path d="M-9 76 Q-9 60 0 58 Q9 60 9 76Z" fill="#A9B2B6"/><rect x="-1.5" y="52" width="3" height="6" fill="#E2D2B4"/></g>`;
  s += `<rect x="176" y="56" width="10" height="38" fill="#D9C3A0"/><path d="M174 56 L181 46 L188 56Z" fill="#B5562C"/>${[62,72,82].map(y=>`<rect x="179" y="${y}" width="4" height="6" fill="#6B5547"/>`).join("")}`;
  if (snowy) s += `<rect x="0" y="80" width="360" height="1" fill="#FFF" opacity="0"/>`;
  s += tree(season==="spring"?"blossom":"broad", 150, 112, 56, season, R, snowy) + tree("broad", 210, 112, 52, season, R, snowy);
  for (const [x,h] of [[34,110],[96,96],[296,112],[346,92]]) s += tree("pine", x, 120, h, season, R, snowy);
  s += `<rect x="0" y="110" width="360" height="5" fill="#EFE7D6"/>${Array.from({length:24},(_,i)=>`<path d="M${i*15+5} 115 q-3 4 0 9 h5 q3 -5 0 -9Z" fill="#E6DCC8"/>`).join("")}<rect x="0" y="122" width="360" height="3" fill="#E6DCC8"/>`;
  return s;
}
function bdTokyo(season, snowy, R){
  let s = "";
  for (let i=0;i<16;i++){ const x = i*24-4, h = 18+R()*34; s += `<rect x="${x}" y="${104-h}" width="${20+R()*6}" height="${h}" fill="${["#B9BEC3","#C8CBCD","#A9AFB5"][i%3]}" opacity=".85"/>${Array.from({length:Math.floor(h/7)},(_,k)=>`<rect x="${x+4}" y="${108-h+k*7}" width="12" height="2" fill="#E3E6E8" opacity=".7"/>`).join("")}`; }
  s += `<g transform="translate(298 0)"><path d="M-16 104 L-3 20 L0 8 L3 20 L16 104Z" fill="#D6452E"/>${[40,62,84].map(y=>{ const w = 3+ (y-8)*16/96; return `<rect x="${-w}" y="${y}" width="${w*2}" height="6" fill="#F4EEE4"/>`; }).join("")}<path d="M-13 92 L13 92 M-9 70 L9 70 M-6 50 L6 50" stroke="#B5382A" stroke-width="1.2"/><rect x="-6" y="46" width="12" height="4" fill="#F4EEE4"/></g>`;
  s += `<g transform="translate(66 0)">`;
  for (let i=0;i<5;i++){ const y = 104 - i*15, w = 30 - i*4; s += `<rect x="${-w*.55}" y="${y-10}" width="${w*1.1}" height="10" fill="#B5382A"/><path d="M${-w-6} ${y-9} Q${-w} ${y-13} ${-w+2} ${y-15} L${w-2} ${y-15} Q${w} ${y-13} ${w+6} ${y-9}Z" fill="#3F3A3A"/>`; }
  s += `<path d="M0 30 V14" stroke="#C9A050" stroke-width="2"/>${[18,22,26].map(y=>`<circle cy="${y}" r="1.6" fill="#C9A050"/>`).join("")}</g>`;
  const kind = season==="spring" ? "blossom" : season==="fall" ? "maple" : "broad";
  for (let i=0;i<7;i++) s += tree(i%3===2 && season==="fall" ? "ginkgo" : kind, 120+i*30, 116, 50+R()*20, season, R, snowy);
  s += `<g transform="translate(200 116)"><path d="M-22 -34 h44 M-18 -28 h36" stroke="#D6452E" stroke-width="4"/><path d="M-14 -36 V8 M14 -36 V8" stroke="#D6452E" stroke-width="4"/></g>`;
  s += `<g transform="translate(26 122)"><rect x="-4" y="-6" width="8" height="6" fill="#A8A39A"/><rect x="-7" y="-12" width="14" height="6" fill="#B8B3AA"/><path d="M-9 -12 L0 -18 L9 -12Z" fill="#9A958C"/></g>`;
  s += tree(kind, 14, 124, 92, season, R, snowy) + tree(kind, 340, 124, 96, season, R, snowy);
  return s;
}
function bdCentral(season, snowy, R){
  let s = "";
  const tones = ["#B9B4AC","#A9A59F","#C7C1B6","#9FA4A8","#BCB6AA"];
  for (let i=0;i<15;i++){ const x = i*25-8, top = 18+R()*48, w = 20+R()*10; s += `<rect x="${x}" y="${top}" width="${w}" height="${100-top}" fill="${tones[i%5]}"/>`; for (let r=top+5;r<96;r+=6) s += `<path d="M${x+3} ${r} h${w-6}" stroke="#E6E2D8" stroke-width="1.4" stroke-dasharray="2 2" opacity=".6"/>`; }
  s += `<g transform="translate(180 0)"><rect x="-12" y="30" width="24" height="70" fill="#C7C1B6"/><rect x="-8" y="18" width="16" height="12" fill="#BDB7AC"/><rect x="-4" y="8" width="8" height="10" fill="#B3ADA2"/><path d="M0 8 V-6" stroke="#9A958C" stroke-width="1.6"/></g>`;
  s += `<g transform="translate(286 0)"><rect x="-11" y="38" width="22" height="62" fill="#C9C3B8"/><path d="M-9 38 Q0 18 9 38Z" fill="#D8D2C6"/><path d="M-6 38 Q0 26 6 38 M-3 38 Q0 30 3 38" stroke="#A9A39A" stroke-width="1" fill="none"/><path d="M0 22 V8" stroke="#A9A39A" stroke-width="1.4"/></g>`;
  for (let i=0;i<13;i++) s += tree("broad", i*30+2, 116, 40+R()*18, season, R, snowy);
  s += `<g stroke="#2A2A2A" stroke-width="1.6"><path d="M90 125 V96"/><path d="M270 125 V96"/></g><circle cx="90" cy="94" r="3" fill="#F1D48A" class="glow"/><circle cx="270" cy="94" r="3" fill="#F1D48A" class="glow"/>`;
  s += `<g stroke="#5B4636" stroke-width="2"><path d="M150 120 h40 M152 120 v5 M188 120 v5"/><path d="M150 114 h40" stroke-width="1.4"/></g>`;
  s += tree("broad", 20, 125, 100, season, R, snowy) + tree("broad", 340, 125, 96, season, R, snowy);
  return s;
}
function victorian(x, w, base, h, col, trim){
  let s = `<rect x="${x}" y="${base-h}" width="${w}" height="${h}" fill="${col}"/><path d="M${x-2} ${base-h} L${x+w/2} ${base-h-w*.62} L${x+w+2} ${base-h}Z" fill="${shade(col,-.12)}"/><path d="M${x+3} ${base-h} L${x+w/2} ${base-h-w*.5} L${x+w-3} ${base-h}" stroke="${trim}" stroke-width="1.2" fill="none"/>`;
  s += `<circle cx="${x+w/2}" cy="${base-h-w*.2}" r="3" fill="${trim}"/><path d="M${x+4} ${base-h*.78} h${w*.45} v${h*.34} h-${w*.45}Z" fill="#6E7F8D" stroke="${trim}" stroke-width="1"/><path d="M${x+w*.62} ${base-h*.78} h${w*.28} v${h*.24} h-${w*.28}Z M${x+w*.62} ${base-h*.4} h${w*.28} v${h*.28} h-${w*.28}Z" fill="#6E7F8D" stroke="${trim}" stroke-width="1"/>`;
  s += `<path d="M${x+4} ${base-h*.3} h${w*.45} M${x} ${base-h*.84} h${w}" stroke="${trim}" stroke-width="1.4"/><path d="M${x+w*.08} ${base} l${w*.16} -${h*.22} h${w*.18}" stroke="${trim}" stroke-width="1.6" fill="none"/>`;
  return s;
}
function bdAlamo(season, snowy, R){
  let s = `<rect x="200" y="56" width="18" height="40" fill="#AEB4B8"/><rect x="226" y="40" width="16" height="56" fill="#BFC4C7"/><path d="M258 96 L266 18 L274 96Z" fill="#D6D2CA"/><rect x="282" y="32" width="18" height="64" rx="9" fill="#C3C8CB"/><rect x="306" y="60" width="22" height="36" fill="#AFB5B9"/><rect x="334" y="70" width="20" height="26" fill="#B9BEC1"/><rect x="176" y="68" width="18" height="28" fill="#B3B8BC"/>`;
  s += `<path d="M0 96 Q180 86 360 98 L360 125 L0 125Z" fill="${GRASS[season][1]}"/>`;
  const cols = [["#E9C9D2","#FBF7EE"],["#BFD8D1","#FBF7EE"],["#F1DDB0","#7A9B8E"],["#C9D2E8","#FBF7EE"],["#E7D3C0","#8E5A6B"],["#D8C9E6","#FBF7EE"]];
  cols.forEach(([c,t],i) => s += victorian(22+i*52, 46, 106 - Math.abs(i-2.5)*2, 46, c, t));
  for (const x of [10,340]) s += tree("cypress", x, 118, 70, season, R, snowy);
  for (const x of [90,170,250]) s += tree("broad", x, 124, 44+R()*10, season, R, snowy);
  s += tree("broad", 40, 125, 70, season, R, snowy) + tree("broad", 316, 125, 66, season, R, snowy);
  return s;
}
function bdCrissy(season, snowy, R){
  let s = `<path d="M0 80 Q60 56 130 70 Q200 52 280 66 Q330 58 360 66 L360 92 L0 92Z" fill="${season==="summer"?"#B4A877":"#9AA58A"}"/>`;
  s += water(86, 32, "#7FA2B0", R, 12);
  const towers = [92, 252], deckY = 82, col = "#C0362C";
  s += `<path d="M-10 ${deckY} H370" stroke="${col}" stroke-width="3.4"/><path d="M-10 ${deckY+2.6} H370" stroke="#8E271F" stroke-width="1"/>`;
  s += `<path d="M-10 70 Q${towers[0]-46} 74 ${towers[0]} 26 Q172 78 ${towers[1]} 26 Q${towers[1]+46} 74 370 70" stroke="${col}" stroke-width="1.6" fill="none"/>`;
  for (let x=0;x<360;x+=7){ const t = x < towers[0] ? 26+44*Math.pow(1-x/towers[0],1.7)*1 : x < towers[1] ? 26 + 52*Math.sin(Math.PI*(x-towers[0])/(towers[1]-towers[0])) : 26+44*Math.pow((x-towers[1])/(360-towers[1]),1.7); if (t < deckY-1) s += `<path d="M${x} ${t.toFixed(1)} V${deckY}" stroke="${col}" stroke-width=".6" opacity=".7"/>`; }
  for (const x of towers) s += `<rect x="${x-5}" y="22" width="3.6" height="96" fill="${col}"/><rect x="${x+1.4}" y="22" width="3.6" height="96" fill="${col}"/>${[30,48,66].map(y=>`<rect x="${x-5}" y="${y}" width="10" height="3" fill="${col}"/>`).join("")}`;
  s += `<g transform="translate(150 106)"><g class="bob"><path d="M-10 0 h20 l-4 4 h-12z" fill="#F4EEE4"/><path d="M0 -16 V0 L10 -2Z" fill="#F4EEE4"/></g></g><g transform="translate(300 100)"><g class="bob" style="animation-delay:-1.4s"><path d="M-8 0 h16 l-3 3 h-10z" fill="#F4EEE4"/><path d="M0 -12 V0 L7 -2Z" fill="#E9C9D2"/></g></g>`;
  s += `<g class="fogd" style="--dur:30s"><path d="M-40 60 Q40 44 120 58 Q200 46 280 60 Q340 50 420 60 L420 74 L-40 74Z" fill="#F4F2EE" opacity=".55"/></g>`;
  s += `<path d="M0 116 Q180 110 360 118 L360 125 L0 125Z" fill="#E4D6B4"/>`;
  s += tree("cypress", 18, 124, 80, season, R, snowy) + tree("cypress", 340, 124, 74, season, R, snowy);
  return s;
}
function bdAthens(season, snowy, R){
  let s = `<path d="M150 104 Q170 70 200 66 L300 62 Q330 66 350 104Z" fill="#C9B38E"/><path d="M160 104 Q180 80 206 76" stroke="#B49B74" stroke-width="2" fill="none"/>`;
  s += `<g transform="translate(250 0)"><rect x="-44" y="58" width="88" height="5" fill="#EDE2C8"/>${Array.from({length:9},(_,i)=>`<rect x="${-40+i*10}" y="40" width="5" height="18" fill="#F1E8D2"/>`).join("")}<rect x="-44" y="35" width="88" height="5" fill="#E6D9BC"/><path d="M-44 35 L0 24 L44 35Z" fill="#EDE2C8"/><rect x="-44" y="63" width="88" height="3" fill="#D6C7A6"/></g>`;
  s += `<g transform="translate(176 0)"><rect x="-12" y="62" width="24" height="10" fill="#EDE2C8"/>${[0,1,2,3].map(i=>`<rect x="${-10+i*6}" y="50" width="3" height="12" fill="#F1E8D2"/>`).join("")}<rect x="-12" y="47" width="24" height="3" fill="#E6D9BC"/></g>`;
  const housesY = [96,102,92,100,106,98];
  housesY.forEach((y,i) => { const x = i*24+4; s += `<rect x="${x}" y="${y}" width="22" height="${125-y}" fill="#F7F4EC" stroke="#E1DACB" stroke-width=".6"/><rect x="${x+8}" y="${y+10}" width="6" height="9" fill="#2F6FA8"/><rect x="${x+3}" y="${y+4}" width="4" height="4" fill="#2F6FA8"/>${i===2?`<path d="M${x+5} ${y} Q${x+11} ${y-10} ${x+17} ${y}Z" fill="#2F6FA8"/>`:""}${i%2?`<circle cx="${x+18}" cy="${y+6}" r="3" fill="#C2387A"/><circle cx="${x+15}" cy="${y+4}" r="2.4" fill="#D9519A"/>`:""}`; });
  for (const [x,h] of [[160,40],[330,46]]) s += tree("cypress", x, 116, h*1.6, season, R, snowy);
  for (const x of [190,236,282,354]) s += tree("olive", x, 124, 44+R()*16, season, R, snowy);
  s += tree("olive", 18, 125, 80, season, R, snowy);
  return s;
}
const BACKDROP = {hutong:bdHutong, houhai:bdHouhai, seine:bdSeine, jardin:bdJardin, borghese:bdRome, ueno:bdTokyo, central:bdCentral, alamo:bdAlamo, crissy:bdCrissy, philopappou:bdAthens};
function groundSVG(place, season, w, y0, h, R){
  const paved = {hutong:["#BEB6A9","#A59C8D"], seine:["#D6C9AF","#C2B394"], borghese:["#DCCDA8","#C9B88E"], southbank:["#C9C0B0","#B0A696"], nyhavn:["#C6BCAA","#ACA290"]}[place];
  if (paved) { let s = `<rect x="0" y="${y0}" width="${w}" height="${h}" fill="${paved[0]}"/>`; for (let i=1;i<6;i++) s += `<line x1="0" x2="${w}" y1="${y0+i*i*h/36}" y2="${y0+i*i*h/36}" stroke="${paved[1]}" stroke-width="1"/>`; for (let i=-6;i<=6;i++) s += `<line x1="${w/2+i*24}" y1="${y0}" x2="${w/2+i*80}" y2="${y0+h}" stroke="${paved[1]}" stroke-width=".8"/>`; return s; }
  const [g1,g2] = GRASS[season];
  let s = `<rect x="0" y="${y0}" width="${w}" height="${h}" fill="${place==="crissy"?"#C9C08E":g1}"/>`;
  if (place==="jardin"||place==="central") for (let i=0;i<6;i++) s += `<path d="M${w/2-20-i*10} ${y0} L${-200+i*120} ${y0+h} L${-140+i*120} ${y0+h} L${w/2-14-i*10} ${y0}Z" fill="${g2}" opacity=".55"/>`;
  for (let i=0;i<14;i++){ const x = R()*w, y = y0+8+R()*(h-10); s += `<path d="M${x.toFixed(0)} ${y.toFixed(0)} l2 -6 l2 6 l2 -5" stroke="${g2}" stroke-width="1.3" fill="none"/>`; }
  if (season==="spring") for (let i=0;i<12;i++) s += `<circle cx="${(R()*w).toFixed(0)}" cy="${(y0+6+R()*(h-8)).toFixed(0)}" r="1.8" fill="${place==="philopappou"?"#C8372B":place==="ueno"?"#F5C6D3":"#FBF7EE"}"/>`;
  if (season==="fall") for (let i=0;i<14;i++) s += `<ellipse cx="${(R()*w).toFixed(0)}" cy="${(y0+6+R()*(h-8)).toFixed(0)}" rx="3.2" ry="1.6" fill="${["#D07A36","#E0A045","#B9612C"][i%3]}"/>`;
  if (season==="winter") for (let i=0;i<6;i++) s += `<ellipse cx="${(R()*w).toFixed(0)}" cy="${(y0+8+R()*(h-10)).toFixed(0)}" rx="${(14+R()*20).toFixed(0)}" ry="4" fill="#FFF" opacity=".7"/>`;
  return s;
}
