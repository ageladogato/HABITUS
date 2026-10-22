/* ---------- three new cities ---------- */
function palm(x, base, h, R){
  let s = `<g class="sway"><path d="M${x} ${base} Q${x+6} ${base-h*.5} ${x+2} ${base-h}" stroke="#8C6E4E" stroke-width="${Math.max(2.4,h*.06)}" fill="none"/>`;
  for (let i=0;i<7;i++){ const a = -Math.PI/2 + (i-3)*.5, len = h*.42; s += `<path d="M${x+2} ${base-h} q${(Math.cos(a)*len*.5).toFixed(1)} ${(Math.sin(a)*len*.6-6).toFixed(1)} ${(Math.cos(a)*len).toFixed(1)} ${(Math.sin(a)*len*.4+8).toFixed(1)}" stroke="${i%2?"#5E8A3C":"#6E9A45"}" stroke-width="3.4" fill="none" stroke-linecap="round"/>`; }
  return s + `</g>`;
}
function bdLondon(season, snowy, R){
  let s = `<rect x="0" y="62" width="200" height="30" fill="#C9B48A"/>`;
  for (let i=0;i<12;i++){ const x = i*16+4; s += `<path d="M${x} 62 L${x+4} 48 L${x+8} 62Z" fill="#B9A276"/><rect x="${x+2}" y="68" width="4" height="10" fill="#8E7A58"/>`; }
  s += `<g transform="translate(92 0)"><rect x="-9" y="18" width="18" height="74" fill="#C9B48A"/><rect x="-11" y="28" width="22" height="22" fill="#BFA97E"/><circle cx="0" cy="39" r="8" fill="#F4EEE2" stroke="#3B3A36" stroke-width="1.2"/><path d="M0 39 L0 34 M0 39 L4 41" stroke="#3B3A36" stroke-width="1.2"/><path d="M-10 18 L0 -6 L10 18Z" fill="#5E6A6E"/><path d="M0 -6 V-14" stroke="#5E6A6E" stroke-width="1.4"/></g>`;
  s += `<g transform="translate(286 62)"><g class="spinslow"><circle r="46" fill="none" stroke="#D7DCE0" stroke-width="2.4"/>${Array.from({length:16},(_,i)=>{ const a = i*Math.PI/8; return `<path d="M0 0 L${(46*Math.cos(a)).toFixed(1)} ${(46*Math.sin(a)).toFixed(1)}" stroke="#D7DCE0" stroke-width=".8"/><ellipse cx="${(46*Math.cos(a)).toFixed(1)}" cy="${(46*Math.sin(a)).toFixed(1)}" rx="3.4" ry="2.4" fill="#EEF2F4" stroke="#9AA6AC" stroke-width=".6"/>`; }).join("")}</g><circle r="4" fill="#9AA6AC"/><path d="M-4 0 L-22 42 M4 0 L22 42" stroke="#9AA6AC" stroke-width="2.6"/></g>`;
  s += water(90, 22, season==="winter"?"#9DB0B4":"#7F969A", R, 10);
  s += `<path d="M-10 86 L190 86 L190 92 L-10 92Z" fill="#6E8B6A"/>${[20,70,120,170].map(x=>`<path d="M${x-22} 92 a22 10 0 0 1 44 0Z" fill="#5E7A5A"/>`).join("")}<g transform="translate(130 76)"><rect x="-14" y="-10" width="28" height="12" rx="2" fill="#C9372C"/><rect x="-14" y="-16" width="28" height="7" rx="2" fill="#C9372C"/>${[-10,-4,2,8].map(x=>`<rect x="${x}" y="-15" width="4" height="4" fill="#F4EEE2"/><rect x="${x}" y="-8" width="4" height="4" fill="#F4EEE2"/>`).join("")}</g>`;
  s += `<rect x="0" y="111" width="360" height="14" fill="#BDB3A2"/><path d="M0 111 h360" stroke="#A59C8D" stroke-width="1.4"/>`;
  for (const x of [40,150,250]) s += `<g stroke="#2A2A2A" stroke-width="1.4"><path d="M${x} 125 V100"/></g><circle cx="${x}" cy="98" r="2.6" fill="#F1D48A" class="glow"/>`;
  s += `<g transform="translate(330 104)"><rect x="-7" y="0" width="14" height="22" fill="#C9372C"/><rect x="-8" y="-3" width="16" height="4" rx="2" fill="#B5302A"/>${[3,8,13].map(y=>`<rect x="-5" y="${y}" width="10" height="3.6" fill="#F4EEE2" opacity=".8"/>`).join("")}</g>`;
  for (const x of [14,98,206,300]) s += tree("broad", x, 124, 60+R()*16, season, R, snowy);
  if (snowy) s += `<rect x="0" y="110" width="360" height="2.5" fill="#FFF"/>`;
  return s;
}
function bdNyhavn(season, snowy, R){
  const cols = ["#E8B04A","#C9452E","#4F7FA8","#E07A3A","#F4EEE2","#7FA35A","#D88C98"];
  let s = "";
  cols.forEach((c,i) => {
    const x = i*52-6, w = 50, top = 40 + (i%3)*8;
    s += `<rect x="${x}" y="${top}" width="${w}" height="${96-top}" fill="${c}" stroke="${shade(c,-.15)}" stroke-width=".6"/>`;
    if (i%2) s += `<path d="M${x} ${top} L${x+8} ${top} L${x+8} ${top-8} L${x+16} ${top-8} L${x+16} ${top-16} L${x+34} ${top-16} L${x+34} ${top-8} L${x+42} ${top-8} L${x+42} ${top} L${x+50} ${top}" fill="${c}" stroke="${shade(c,-.15)}" stroke-width=".6"/>`;
    else s += `<path d="M${x} ${top} L${x+25} ${top-20} L${x+50} ${top}Z" fill="${shade(c,-.1)}"/>`;
    for (let r=0; top+8+r*14 < 90; r++) for (let k=0;k<3;k++) s += `<rect x="${x+7+k*14}" y="${top+8+r*14}" width="7" height="9" fill="#F4EEE2" stroke="${shade(c,-.3)}" stroke-width=".6"/>`;
    if (snowy) s += `<path d="M${x} ${top} L${x+25} ${top-20} L${x+50} ${top}" stroke="#FFF" stroke-width="2" fill="none"/>`;
  });
  s += `<path d="M0 54 Q90 64 180 54 Q270 64 360 54" stroke="#3B3A36" stroke-width=".6" fill="none"/>${Array.from({length:18},(_,i)=>`<circle cx="${i*20+10}" cy="${57+Math.sin(i)*3}" r="1.6" fill="#F6D27A" class="glow" style="animation-delay:-${i*.3}s"/>`).join("")}`;
  s += water(94, 20, season==="winter"?"#9DB0B4":"#6E8FA0", R, 10);
  for (const [x,c] of [[70,"#8C5A3C"],[220,"#34476B"]]) s += `<g transform="translate(${x} 104)"><g class="bob"><path d="M-30 0 h60 l-7 9 h-46Z" fill="${c}"/><path d="M-30 0 h60" stroke="#F4EEE2" stroke-width="1.4"/><path d="M-6 0 V-40 M12 0 V-30" stroke="#5A4030" stroke-width="1.6"/><path d="M-6 -38 L14 -10 L-6 -10Z" fill="#F4EEE2" opacity=".85"/></g></g>`;
  s += `<rect x="0" y="113" width="360" height="12" fill="#BDB3A2"/><path d="M0 113 h360" stroke="#8E8576" stroke-width="1.6"/>`;
  s += `<g stroke="#2A2A2A" stroke-width="1.4" fill="none">${[150,176].map(x=>`<circle cx="${x}" cy="119" r="5"/><circle cx="${x+14}" cy="119" r="5"/><path d="M${x} 119 L${x+5} 112 L${x+12} 112 L${x+14} 119 M${x+5} 112 L${x+7} 119"/>`).join("")}</g>`;
  s += tree("broad", 14, 124, 70, season, R, snowy) + tree("broad", 344, 124, 66, season, R, snowy);
  return s;
}
function bdLodhi(season, snowy, R){
  let s = `<g transform="translate(232 0)"><rect x="-46" y="64" width="92" height="44" fill="#C98A5A"/>${[-34,-12,10,32].map(x=>`<path d="M${x-7} 108 V84 a7 8 0 0 1 14 0 V108Z" fill="#6B4A32"/>`).join("")}<rect x="-46" y="62" width="92" height="4" fill="#B57A4A"/><path d="M-22 62 Q-24 30 0 24 Q24 30 22 62Z" fill="#DCC9A6"/><path d="M0 24 V14" stroke="#B9A47E" stroke-width="2"/><circle cx="0" cy="12" r="2" fill="#B9A47E"/>${[-40,40].map(x=>`<rect x="${x-6}" y="50" width="12" height="12" fill="#C98A5A"/><path d="M${x-8} 50 Q${x} 38 ${x+8} 50Z" fill="#DCC9A6"/>`).join("")}</g>`;
  s += `<rect x="0" y="108" width="360" height="17" fill="#D9C9A4"/>`;
  for (const [x,h] of [[30,96],[120,80],[330,100]]) s += palm(x, 122, h, R);
  for (const x of [80,170]) s += tree("broad", x, 120, 52, season==="winter"?"fall":season, R, snowy);
  s += [[150,112],[178,116],[300,114]].map(([x,y])=>`<g transform="translate(${x} ${y})">${canopy(0,0,10,["#C2387A","#D9519A","#7FA35A"],R,6)}</g>`).join("");
  return s;
}
Object.assign(BACKDROP, {southbank:bdLondon, nyhavn:bdNyhavn, lodhi:bdLodhi}); delete BACKDROP.alamo;
