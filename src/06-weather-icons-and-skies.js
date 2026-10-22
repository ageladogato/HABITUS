/* ---------- weather icons (40x40) ---------- */
function icoSun(cx,cy,r,spin){ return `<g transform="translate(${cx} ${cy})"><g class="${spin?"spin":""}">${[0,45,90,135,180,225,270,315].map(a=>`<rect x="-1.4" y="${-r-7}" width="2.8" height="5" rx="1.4" fill="var(--ochre)" transform="rotate(${a})"/>`).join("")}</g><circle r="${r}" fill="var(--ochre)"/></g>`; }
function icoCloud(c,dx=0,dy=0,s=1){ return `<g transform="translate(${dx} ${dy}) scale(${s})"><g class="bob"><circle cx="13" cy="23" r="7" fill="${c}"/><circle cx="20" cy="18" r="9" fill="${c}"/><circle cx="28" cy="23" r="7" fill="${c}"/><rect x="10" y="22" width="21" height="8" rx="4" fill="${c}"/></g></g>`; }
const icoDrops = (n,c) => [13,20,27].slice(0,n).map((x,i)=>`<path class="drop" style="--dur:.9s;--del:-${i*.3}s" d="M${x} 32 l-1.5 4" stroke="${c}" stroke-width="2" stroke-linecap="round"/>`).join("");
const icoFlakes = n => [[13,34],[20,36],[27,33],[17,38]].slice(0,n).map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.8" fill="#9FB1C2"/>`).join("");
const icoWind = (y,c="var(--ink-soft)") => `<path d="M6 ${y} q12 -4 24 0 q4 1 4 -3" stroke="${c}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
function weatherIcon(w){
  switch(w){
    case "sunny": return icoSun(20,20,8,true);
    case "breezy": return icoSun(15,15,7,true)+icoWind(30)+`<path d="M12 36 q8 -3 16 0" stroke="var(--ink-soft)" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    case "partly": return icoSun(26,13,6,true)+icoCloud("var(--b4)",-3,3);
    case "windy": return icoCloud("var(--b4)",0,-6,.85)+icoWind(28)+icoWind(34);
    case "overcast": return icoCloud("#B9BDBF",6,-6,.8)+icoCloud("#9AA2A8",-2,2);
    case "fog": return icoCloud("#B9BDBF",0,-6)+`<path d="M8 30h24M11 35h18" stroke="#A9AFB3" stroke-width="2.4" stroke-linecap="round"/>`;
    case "drizzle": return icoDrops(2,"var(--b)")+icoCloud("#9AA4AC");
    case "rain": return icoDrops(3,"var(--b)")+icoCloud("#8E9AA3");
    case "snow": return icoFlakes(4)+icoCloud("#AEB7BF");
    case "storm": return `<path class="flash" d="M22 26 l-5 7 h4 l-3 6 l8 -9 h-4 l3 -4Z" fill="var(--ochre)" style="--del:-1s"/>`+icoCloud("#5E6670");
    case "blizzard": return icoFlakes(4)+icoCloud("#AEB7BF",0,-3)+icoWind(36,"#9FB1C2");
    default: return `<circle cx="20" cy="20" r="8" fill="none" stroke="var(--line-strong)" stroke-width="2" stroke-dasharray="3 3"/>`;
  }
}
const wxSVG = (w, cls="wx") => `<svg class="${cls} anim" viewBox="0 0 40 40" role="img" aria-label="${WX[w].label}">${weatherIcon(w)}</svg>`;

/* ---------- skies ---------- */
const SKY = {
  sunny:["#B9D5E3","#F4E4C4"], breezy:["#B9D5E3","#F1E6CC"], partly:["#C3D3DA","#EEE4D0"], windy:["#B6C6CC","#E6DECB"],
  overcast:["#B3B6B4","#D7D3C8"], fog:["#D4D2CC","#E5E1D7"], drizzle:["#A8AFB2","#CDCAC2"], rain:["#8C969C","#B7B8B2"],
  snow:["#C6CDD5","#ECEDEE"], storm:["#474F5E","#787D85"], blizzard:["#B9BFC7","#DFE2E5"], none:["#CBD4D2","#ECE4D2"]
};
const isSnowy = w => w==="snow" || w==="blizzard";
const isWet = w => ["drizzle","rain","storm"].includes(w);

