/* ---------- indoor scenes ---------- */
const TOOLS = {
  chop:`<path d="M0 0 L16 -14 M2 2 L18 -11" stroke="#8C5A3C" stroke-width="1.4" stroke-linecap="round"/>`,
  fork:`<path d="M0 0 L12 -12" stroke="#B8B8B8" stroke-width="1.6" stroke-linecap="round"/><path d="M11 -11 l3 -5 M12 -10 l4 -4 M13 -9 l5 -3" stroke="#B8B8B8" stroke-width=".9"/>`,
  none:""
};
function dishSVG(id){
  switch(id){
    case "ramen": return `<ellipse cy="2" rx="17" ry="7" fill="#2F2F2F"/><ellipse rx="16" ry="5.6" fill="#E8C690"/><path d="M-10 0 q4 -3 8 0 q4 3 8 0" stroke="#F4E2B8" stroke-width="1.4" fill="none"/><circle cx="6" cy="-1" r="3.4" fill="#FBF7EE"/><circle cx="6" cy="-1" r="1.6" fill="#F2C14E"/><rect x="-12" y="-3" width="6" height="4" fill="#5E8A3C"/><path class="steam" d="M-4 -6 q3 -5 0 -10 M4 -6 q3 -5 0 -10" stroke="#FFF" stroke-width="1.2" fill="none"/>`;
    case "thali": return `<ellipse rx="18" ry="7" fill="#C9C1B2"/><ellipse rx="16" ry="6" fill="#D9D2C4"/>${[[-9,-1,"#E8973A"],[0,-3,"#C2552A"],[9,-1,"#F2D27A"],[-3,2,"#7FA35A"],[6,2,"#FBF7EE"]].map(([x,y,c])=>`<ellipse cx="${x}" cy="${y}" rx="3.4" ry="1.8" fill="${c}"/>`).join("")}<path d="M-16 -6 q8 -6 14 -2" fill="#E8C690"/>`;
    case "chai": return `<path d="M-4 -9 h8 l-1 10 h-6Z" fill="#E9D8BA" stroke="#C9B28E" stroke-width=".5"/><rect x="-3.6" y="-6" width="7.2" height="6" fill="#C98A4A"/><path class="steam" d="M0 -12 q2 -3 0 -6" stroke="#FFF" stroke-width="1" fill="none"/>`;
    case "water": return `<path d="M-4 -12 h8 l-1 13 h-6Z" fill="#DCEBF2" stroke="#9AB8C8" stroke-width=".6"/><path d="M-3.4 -6 h6.8" stroke="#9CC3E6" stroke-width="5" opacity=".7"/><circle cx="2" cy="-9" r="1.6" fill="#F2D27A"/>`;
    case "coffee": return `<ellipse cy="1" rx="8" ry="2.4" fill="#FBF7EE"/><path d="M-5 -7 h10 v6 q-5 3 -10 0Z" fill="#FBF7EE" stroke="#C2B49C" stroke-width=".5"/><ellipse cy="-7" rx="5" ry="1.4" fill="#8A5A44"/><path class="steam" d="M0 -10 q2 -3 0 -6" stroke="#FFF" stroke-width="1" fill="none"/>`;
    default: return treatSVG2(id);
  }
}
function windowView(place, w, season, phase, x, y, wd, ht, uid, kind){
  const city = cityOf(place), R = rnd(place.length*17), sky = skyFor(w, phase), tint = PHASE_TINT[phase];
  const vb = `0 ${Math.max(0, 125 - 125*ht/wd*1.1)} 360 ${Math.min(160, 360*ht/wd)}`;
  let inside = `<defs><linearGradient id="ws${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient></defs><rect y="-40" width="360" height="200" fill="url(#ws${uid})"/>${groundSVG(place, season, 360, 124, 60, R)}${BACKDROP[place](season, isSnowy(w), rnd(place.length*7+3))}${passersby(place, rnd(place.length*3+1), isWet(w), 360)}${weatherTint(w,360,200)}${tint?`<rect y="-40" width="360" height="200" fill="${tint[0]}" opacity="${tint[1]}"/>`:""}${nightLights(rnd(5),360,phase)}${weatherFX(w, 360, 200, 125, rnd(9), season, {phase, noTint:true})}`;
  let s = `<svg x="${x}" y="${y}" width="${wd}" height="${ht}" viewBox="${vb}" preserveAspectRatio="xMidYMid slice" overflow="hidden">${inside}</svg>`;
  const fr = "#8C6A4E";
  if (kind==="arch") s = `<defs><clipPath id="wc${uid}"><path d="M${x} ${y+ht} V${y+wd/2} A${wd/2} ${wd/2} 0 0 1 ${x+wd} ${y+wd/2} V${y+ht}Z"/></clipPath></defs><g clip-path="url(#wc${uid})">${s}</g><path d="M${x} ${y+ht} V${y+wd/2} A${wd/2} ${wd/2} 0 0 1 ${x+wd} ${y+wd/2} V${y+ht}Z" fill="none" stroke="${fr}" stroke-width="5"/><path d="M${x+wd/2} ${y+4} V${y+ht}" stroke="${fr}" stroke-width="2.4"/>`;
  else if (kind==="gothic") s = `<defs><clipPath id="wc${uid}"><path d="M${x} ${y+ht} V${y+ht*.4} Q${x} ${y+ht*.06} ${x+wd/2} ${y} Q${x+wd} ${y+ht*.06} ${x+wd} ${y+ht*.4} V${y+ht}Z"/></clipPath></defs><g clip-path="url(#wc${uid})">${s}</g><path d="M${x} ${y+ht} V${y+ht*.4} Q${x} ${y+ht*.06} ${x+wd/2} ${y} Q${x+wd} ${y+ht*.06} ${x+wd} ${y+ht*.4} V${y+ht}Z" fill="none" stroke="${fr}" stroke-width="5"/><path d="M${x+wd/2} ${y} V${y+ht}" stroke="${fr}" stroke-width="2"/>`;
  else if (kind==="round") s = `<defs><clipPath id="wc${uid}"><circle cx="${x+wd/2}" cy="${y+ht/2}" r="${Math.min(wd,ht)/2}"/></clipPath></defs><g clip-path="url(#wc${uid})">${s}</g><circle cx="${x+wd/2}" cy="${y+ht/2}" r="${Math.min(wd,ht)/2}" fill="none" stroke="#6B4A32" stroke-width="7"/>`;
  else if (kind==="lattice") s += `<rect x="${x}" y="${y}" width="${wd}" height="${ht}" fill="none" stroke="#8E2F28" stroke-width="5"/>${Array.from({length:5},(_,i)=>`<path d="M${x+wd*(i+1)/6} ${y} V${y+ht}" stroke="#8E2F28" stroke-width="1.6"/>`).join("")}${Array.from({length:3},(_,i)=>`<path d="M${x} ${y+ht*(i+1)/4} H${x+wd}" stroke="#8E2F28" stroke-width="1.6"/>`).join("")}`;
  else if (kind==="shoji") s += `<rect x="${x}" y="${y}" width="${wd}" height="${ht}" fill="none" stroke="#6B4E3A" stroke-width="5"/>${Array.from({length:3},(_,i)=>`<path d="M${x+wd*(i+1)/4} ${y} V${y+ht}" stroke="#6B4E3A" stroke-width="2"/>`).join("")}<path d="M${x} ${y+ht*.66} H${x+wd}" stroke="#6B4E3A" stroke-width="2"/><rect x="${x}" y="${y+ht*.66}" width="${wd}" height="${ht*.34}" fill="#F4EEE2" opacity=".75"/>`;
  else s += `<rect x="${x}" y="${y}" width="${wd}" height="${ht}" fill="none" stroke="${fr}" stroke-width="5"/><path d="M${x+wd/2} ${y} V${y+ht} M${x} ${y+ht*.45} H${x+wd}" stroke="${fr}" stroke-width="2.4"/><path d="M${x+8} ${y+8} l14 14" stroke="#FFF" stroke-width="2" opacity=".35"/>`;
  return s;
}
