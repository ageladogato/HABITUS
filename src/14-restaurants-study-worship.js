/* ---------- interiors: restaurants, study spots, places of worship ---------- */
const INDOOR_ACTS = new Set(["nourish","hydrate","study","sleep","mindful"]);
const RESTO = {
  beijing:{name:"a Peking duck house", dish:"duck", tool:"chop"}, tokyo:{name:"a conveyor-belt sushi bar", dish:"sushi", tool:"chop"},
  paris:{name:"a mirrored brasserie", dish:"steakfrites", tool:"fork"}, rome:{name:"a trattoria", dish:"pizza", tool:"fork"},
  nyc:{name:"a supper club", dish:"cheesecake", tool:"fork"}, sf:{name:"the Ferry Building market hall", dish:"chowder", tool:"fork"},
  athens:{name:"a rooftop taverna", dish:"salad", tool:"fork"}, london:{name:"a proper pub", dish:"pie", tool:"fork"},
  copenhagen:{name:"a smørrebrød café", dish:"smorrebrod", tool:"fork"}, delhi:{name:"a chai house", dish:"thali", tool:"none"}
};
const STUDY = {
  beijing:"a traditional teahouse", tokyo:"a retro kissaten coffee house", paris:"a grand reading room", rome:"a baroque library",
  nyc:"the public library reading room", sf:"a beat-era bookshop", athens:"a café facing the Acropolis", london:"a domed reading room",
  copenhagen:"a waterside library", delhi:"a heritage library"
};
const WORSHIP = {
  beijing:"a lama temple hall", tokyo:"a Zen temple veranda", paris:"a gothic cathedral", rome:"the Pantheon", nyc:"a cathedral on Fifth Avenue",
  sf:"a cathedral labyrinth", athens:"a Byzantine chapel", london:"a domed cathedral", copenhagen:"a brick church", delhi:"the Lotus Temple"
};
const seatP = (city, k, x, y, s, arms) => `<g transform="translate(${x} ${y}) scale(${s})">${figureSVG(localAvatar(city,k),"bench",false,arms||"eat")}</g>`;
const crossP = (city, k, x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">${figureSVG(localAvatar(city,k),"cross",false,"meditate")}</g>`;
function walkerP(av, y, s, arms, dur, range, begin){
  const mv = motionOff() ? "" : `<animateTransform attributeName="transform" type="translate" values="${-range} 0;${range} 0;${-range} 0" keyTimes="0;.5;1" dur="${dur}s" begin="-${begin||0}s" repeatCount="indefinite"/>`;
  const fl = motionOff() ? "" : `<animateTransform attributeName="transform" type="scale" values="1 1;-1 1" keyTimes="0;.5" calcMode="discrete" dur="${dur}s" begin="-${begin||0}s" repeatCount="indefinite"/>`;
  return `<g transform="translate(180 ${y})"><g>${mv}<g>${fl}<g transform="scale(${s})">${figureSVG(av,"stand",false,arms,"walk")}</g></g></g></g>`;
}
const withLook = (av, patch) => ({...av, ...patch, _look:{outfit:null, wear:{}}});
const smallTable = (x, y, w, top, cloth) => `<ellipse cx="${x}" cy="${y+40}" rx="${w*.6}" ry="4" fill="#000" opacity=".1"/><rect x="${x-w/2}" y="${y}" width="${w}" height="6" rx="3" fill="${top}"/>${cloth?`<path d="M${x-w/2} ${y+4} h${w} l3 12 h-${w+6}Z" fill="${cloth}"/>`:""}<path d="M${x} ${y+6} V${y+40} M${x-10} ${y+40} h20" stroke="#3B3A36" stroke-width="2.4"/>`;
const pendant = (x, night, len, shade, glowR) => `<g transform="translate(${x} 0)"><path d="M0 0 V${len}" stroke="#2B2B2B"/>${shade||`<path d="M-12 ${len+12} Q0 ${len-4} 12 ${len+12}Z" fill="#C9A87A"/>`}<circle cy="${len+12}" r="${glowR||16}" fill="#FFE7B0" opacity="${night?.45:.18}" class="glow"/></g>`;
const globeLamp = (x, len) => `<g transform="translate(${x} 0)"><path d="M0 0 V${len}" stroke="#B5925A"/><circle cy="${len+8}" r="8" fill="#FFF6DC"/><circle cy="${len+8}" r="16" fill="#FFE7B0" opacity=".3" class="glow"/></g>`;
const candleSVG = (x, y, h) => `<g transform="translate(${x} ${y})"><rect x="-2.5" y="${-(h||10)}" width="5" height="${h||10}" fill="#FBF7EE"/><ellipse class="flicker" cy="${-(h||10)-3}" rx="1.8" ry="3.2" fill="#F2C14E"/><circle cy="${-(h||10)-3}" r="7" fill="#FFE7B0" opacity=".25" class="glow"/></g>`;
const floorPlanks = (col, y0) => `<rect y="${y0}" width="360" height="${300-y0}" fill="${col}"/>${Array.from({length:6},(_,j)=>`<path d="M0 ${y0+j*18+j*j*1.4} H360" stroke="${shade(col,-.14)}" stroke-width="1"/>`).join("")}`;
const floorTiles = (a, b, y0, size) => { let s = `<rect y="${y0}" width="360" height="${300-y0}" fill="${a}"/>`; for (let i=0;i<Math.ceil(360/size);i++) for (let j=0;j<Math.ceil((300-y0)/size);j++) if ((i+j)%2) s += `<rect x="${i*size}" y="${y0+j*size}" width="${size}" height="${size}" fill="${b}"/>`; return s; };
const pew = (x, y, w) => `<rect x="${x-w/2}" y="${y-30}" width="${w}" height="6" rx="2" fill="#6B4A32"/><rect x="${x-w/2}" y="${y}" width="${w}" height="7" rx="2" fill="#7A5236"/><path d="M${x-w/2+4} ${y-24} V${y+30} M${x+w/2-4} ${y-24} V${y+30}" stroke="#4A3324" stroke-width="3"/>`;
function stainedGlass(x, y, wd, ht, uid){
  const cols = ["#B8423A","#34476B","#D9A441","#4F7FA8","#7A3A7A","#5E8A3C"];
  let s = `<defs><clipPath id="sg${uid}${x}"><path d="M${x} ${y+ht} V${y+ht*.4} Q${x} ${y+ht*.06} ${x+wd/2} ${y} Q${x+wd} ${y+ht*.06} ${x+wd} ${y+ht*.4} V${y+ht}Z"/></clipPath></defs><g clip-path="url(#sg${uid}${x})" class="glow" style="animation-duration:7s">`;
  for (let i=0;i<4;i++) for (let j=0;j<8;j++) s += `<rect x="${x+i*wd/4}" y="${y+j*ht/8}" width="${wd/4}" height="${ht/8}" fill="${cols[(i*3+j)%6]}" opacity=".85"/>`;
  s += `</g><path d="M${x} ${y+ht} V${y+ht*.4} Q${x} ${y+ht*.06} ${x+wd/2} ${y} Q${x+wd} ${y+ht*.06} ${x+wd} ${y+ht*.4} V${y+ht}Z" fill="none" stroke="#3B3A36" stroke-width="3"/>${[1,2,3].map(i=>`<path d="M${x+i*wd/4} ${y+ht*.1} V${y+ht}" stroke="#3B3A36" stroke-width="1.2"/>`).join("")}<path d="M${x} ${y+ht/2} H${x+wd}" stroke="#3B3A36" stroke-width="1.2"/>`;
  return s;
}
function roseWindow(cx, cy, r){
  const cols = ["#B8423A","#34476B","#D9A441","#4F7FA8","#7A3A7A","#5E8A3C"];
  let s = `<circle cx="${cx}" cy="${cy}" r="${r+5}" fill="#5A5048"/><g class="glow" style="animation-duration:6s">`;
  for (let k=0;k<16;k++){ const a1 = k*Math.PI/8, a2 = (k+1)*Math.PI/8; s += `<path d="M${cx} ${cy} L${(cx+r*Math.cos(a1)).toFixed(1)} ${(cy+r*Math.sin(a1)).toFixed(1)} A${r} ${r} 0 0 1 ${(cx+r*Math.cos(a2)).toFixed(1)} ${(cy+r*Math.sin(a2)).toFixed(1)}Z" fill="${cols[k%6]}" stroke="#3B3A36" stroke-width="1"/>`; }
  return s + `</g><circle cx="${cx}" cy="${cy}" r="${r*.35}" fill="#D9A441" stroke="#3B3A36"/><circle cx="${cx}" cy="${cy}" r="${r*.6}" fill="none" stroke="#3B3A36" stroke-width="1.4"/>`;
}
const incense = (x, y) => `<g transform="translate(${x} ${y})"><path d="M-14 0 h28 l-4 14 h-20Z" fill="#8C6A3A"/><ellipse rx="15" ry="4" fill="#A8834A"/>${[-4,0,4].map((dx,i)=>`<path d="M${dx} 0 V-14" stroke="#B8423A" stroke-width="1"/><path class="smoke" style="animation-delay:-${i*1.3}s" d="M${dx} -14 q-4 -8 0 -16 q4 -8 0 -16" stroke="#F4F2EE" stroke-width="1.6" fill="none" opacity=".7"/>`).join("")}</g>`;

/* restaurants: return {bg, table, mainX} */
function restoRoom(city, ctx){
  const {place, w, season, phase, uid} = ctx, night = phase==="night"||phase==="dusk";
  const win = (x,y,wd,ht,kind) => windowView(place, w, season, phase, x, y, wd, ht, uid+"w"+x, kind);
  switch(city){
    case "tokyo": {
      let bg = `<rect width="360" height="300" fill="#E6D3B3"/>${Array.from({length:18},(_,i)=>`<path d="M${i*20} 0 V200" stroke="#D2BE9A" stroke-width="1.4"/>`).join("")}${floorPlanks("#7A5A40",200)}`;
      bg += win(24,24,120,82,"shoji");
      bg += `<rect x="160" y="30" width="190" height="34" fill="#5A4030"/>${Array.from({length:9},(_,i)=>`<rect x="${166+i*20}" y="34" width="14" height="26" fill="#FBF7EE"/><path d="M${170+i*20} 39 v14 M${173+i*20} 41 h4" stroke="#B8423A" stroke-width="1.2"/>`).join("")}`;
      bg += `<rect x="0" y="118" width="360" height="12" fill="#3F3A3A"/>${[40,320].map(x=>`<g transform="translate(${x} 130)"><g class="swing"><rect x="-8" y="0" width="16" height="22" rx="7" fill="#FBF7EE"/><path d="M-8 11 h16" stroke="#C9372C" stroke-width="2"/></g></g>`).join("")}`;
      const chef = withLook(localAvatar("tokyo",5), {top:"shirt", topc:"#FBF7EE", head:"headband", bottom:"trousers", botc:"#2B2B2B"});
      bg += `<g transform="translate(262 222) scale(.86)">${figureSVG(chef,"stand",false,"stir")}</g>`;
      bg += seatRot("tokyo",1,52,250,.86,"eat") + seatRot("tokyo",2,318,250,.86,"talk");
      const ty = 254 - 44*1.12;
      let belt = "";
      const sushiRow = (off) => Array.from({length:14},(_,i)=>`<g transform="translate(${off+i*30} ${ty-6})">${dishSVG("sushi").replace('#E07A5F', ["#E07A5F","#7FAED0","#D9A441","#9A86C2"][i%4])}</g>`).join("");
      belt = `<rect x="0" y="${ty-12}" width="360" height="14" fill="#B9BEC3"/><path d="M0 ${ty-12} H360 M0 ${ty+2} H360" stroke="#8E959B" stroke-width="1.4"/><g class="belt" style="--dx:-420px;--dur:14s">${sushiRow(0)}${sushiRow(420)}</g>`;
      const table = `<rect x="0" y="${ty+2}" width="360" height="${300-ty}" fill="#B9874F"/><path d="M0 ${ty+18} H360" stroke="#A0703E" stroke-width="2"/>` + belt;
      return {bg, table, noTable:true};
    }
    case "paris": {
      let bg = `<rect width="360" height="300" fill="#5A3A28"/><rect y="0" width="360" height="130" fill="#2F2A26"/>`;
      for (let i=0;i<4;i++) bg += `<rect x="${170+i*48}" y="18" width="40" height="100" rx="3" fill="#C9D3D6" opacity=".55"/><rect x="${170+i*48}" y="18" width="40" height="100" rx="3" fill="none" stroke="#C9A050" stroke-width="2.4"/><path d="M${176+i*48} 30 l14 20" stroke="#FFF" stroke-width="2" opacity=".35"/>`;
      bg += win(18,18,140,104,"pane") + `<text x="88" y="46" text-anchor="middle" font-size="14" font-family="Young Serif, Georgia, serif" fill="#D9A441" letter-spacing="2">BRASSERIE</text>`;
      bg += `<rect y="130" width="360" height="4" fill="#C9A050"/>` + floorTiles("#EFE6D2","#2B2B2B",200,10);
      bg += `<rect x="0" y="150" width="360" height="52" rx="8" fill="#9E2E2A"/>${Array.from({length:9},(_,i)=>`<path d="M${20+i*40} 152 V200" stroke="#7E2420" stroke-width="1.2"/>`).join("")}`;
      bg += [50,136,224,310].map(x=>globeLamp(x, 14)).join("");
      bg += seatRot("paris",1,40,206,.6,"talk") + seatRot("paris",2,84,206,.6,"eat") + smallTable(62,186,40,"#E9E2D2") + seatRot("paris",3,296,206,.6,"eat") + seatRot("paris",4,338,206,.6,"sip") + smallTable(318,186,40,"#E9E2D2");
      const waiter = withLook(localAvatar("paris",6), {top:"shirt", topc:"#FBF7EE", bottom:"trousers", botc:"#1E1E22", neck:"bowtie"});
      bg += walkerP(waiter, 218, .7, "tray", 14, 140, 3);
      return {bg, cloth:"#E9E2D2", round:true};
    }
    case "nyc": {
      let bg = `<rect width="360" height="300" fill="#5E1414"/>${Array.from({length:8},(_,i)=>`<rect x="${i*46+6}" y="20" width="36" height="170" rx="2" fill="none" stroke="#7A2020" stroke-width="2"/>`).join("")}<rect y="150" width="360" height="50" fill="#3A0C0C"/>`;
      bg += win(196,20,150,150,"pane") + floorPlanks("#2E1A14",200) + `<rect x="196" y="20" width="150" height="150" fill="#3A0C0C" opacity=".25"/>`;
      bg += `<g transform="translate(110 0)"><path d="M0 0 V18" stroke="#C9A050"/><path d="M-30 30 Q0 14 30 30" stroke="#C9A050" stroke-width="2" fill="none"/>${[-24,-12,0,12,24].map(x=>`<path d="M${x} ${24+Math.abs(x)/4} v8" stroke="#F4EEC8" stroke-width="2"/><circle cx="${x}" cy="${33+Math.abs(x)/4}" r="2.4" fill="#FFF6DC"/>`).join("")}<circle cy="30" r="40" fill="#FFE7B0" opacity=".16" class="glow"/></g>`;
      bg += [20,176].map(x=>`<g transform="translate(${x} 90)"><rect x="-4" y="0" width="8" height="12" rx="2" fill="#C9A050"/><circle cy="-2" r="12" fill="#FFE7B0" opacity=".35" class="glow"/></g>`).join("");
      const pianist = withLook(localAvatar("nyc",4), {top:"jacket", topc:"#1E1E22", bottom:"trousers", botc:"#1E1E22"});
      bg += `<g transform="translate(64 196)"><path d="M-40 -6 Q-44 -34 -10 -36 L40 -30 Q50 -28 46 -6Z" fill="#111"/><rect x="-40" y="-8" width="86" height="8" fill="#1A1A1A"/><rect x="-36" y="-12" width="60" height="5" fill="#FBF7EE"/>${Array.from({length:12},(_,i)=>`<rect x="${-34+i*5}" y="-12" width="2.4" height="3" fill="#111"/>`).join("")}<path d="M-30 0 V30 M38 0 V30" stroke="#111" stroke-width="3"/></g>`;
      bg += `<g transform="translate(64 214) scale(.72)">${figureSVG(pianist,"bench",false,"piano")}</g>` + [[30,-120],[54,-150],[80,-130]].map(([x,y],i)=>`<g transform="translate(${x} ${200+y})"><g class="float" style="animation-delay:-${i*1.2}s"><text font-size="14" fill="#E8C690" font-family="Georgia, serif">${i%2?"♫":"♪"}</text></g></g>`).join("");
      bg += seatRot("nyc",1,296,214,.62,"talk") + smallTable(318,194,44,"#FBF7EE","#FBF7EE") + seatRot("nyc",2,340,214,.62,"eat");
      bg += `<rect width="360" height="300" fill="#120606" opacity=".34"/>` + candleSVG(318,194,8);
      return {bg, cloth:"#F4E8D8", candle:true, chair:"#7A1A1A"};
    }
    case "beijing": {
      let bg = `<rect width="360" height="300" fill="#E9D6BC"/><rect width="360" height="20" fill="#9E2E2A"/>${Array.from({length:12},(_,i)=>`<path d="M${i*30+15} 20 v-14" stroke="#D9A441" stroke-width="2"/>`).join("")}${floorPlanks("#8C5A3C",200)}`;
      bg += win(20,34,130,110,"lattice");
      bg += `<rect x="190" y="40" width="150" height="100" fill="#5A2E22"/><rect x="194" y="44" width="142" height="92" fill="#F2D8A8" opacity=".25"/><path d="M194 52 H336" stroke="#888" stroke-width="2"/>${[214,246,278,310].map(x=>`<path d="M${x} 52 v10" stroke="#888"/><path d="M${x-10} 62 Q${x-12} 92 ${x} 100 Q${x+12} 92 ${x+10} 62Z" fill="#B5562C"/><path d="M${x-6} 70 q6 -4 12 0" stroke="#E0A045" stroke-width="1.4" fill="none"/>`).join("")}`;
      bg += [176,346].map(x=>`<g transform="translate(${x} 20)"><g class="swing"><line y2="10" stroke="#3E3A36"/><ellipse cy="24" rx="12" ry="13" fill="#C9372C"/><rect x="-5" y="9" width="10" height="3" fill="#D9A441"/><path d="M0 37 v8" stroke="#D9A441" stroke-width="2"/></g></g>`).join("");
      bg += seatRot("beijing",1,92,238,.86,"eat") + seatRot("beijing",2,268,238,.86,"talk");
      return {bg, cloth:"#9E2E2A", lazy:true};
    }
    case "rome": {
      let bg = `<rect width="360" height="300" fill="#EFD9B4"/>${floorTiles("#B5562C","#A04A26",200,18)}`;
      bg += win(18,24,110,120,"arch");
      bg += `<path d="M206 196 V108 a52 52 0 0 1 104 0 V196Z" fill="#B5562C"/>${Array.from({length:8},(_,i)=>`<path d="M206 ${118+i*9} h104" stroke="#9A4523" stroke-width=".7"/>`).join("")}<path d="M224 196 V116 a34 34 0 0 1 68 0 V196Z" fill="#2B1A12"/><g class="flicker"><path d="M236 196 q8 -30 22 -8 q6 -18 16 8Z" fill="#F2A65A"/><path d="M246 196 q5 -16 12 -4 q4 -8 8 4Z" fill="#F6D27A"/></g><circle cx="258" cy="170" r="40" fill="#F6B66A" opacity=".18" class="glow"/>`;
      bg += `<path d="M150 14 Q180 30 210 14" stroke="#C9B28E" fill="none"/>${[160,172,184,196].map((x,i)=>`<ellipse cx="${x}" cy="${20+i%2*4}" rx="3" ry="5" fill="${i%2?"#F4EEE2":"#B8423A"}"/>`).join("")}`;
      const pz = withLook(localAvatar("rome",6), {top:"tshirt", topc:"#FBF7EE", bottom:"trousers", botc:"#2B2B2B", head:"cap"});
      bg += `<g transform="translate(330 222) scale(.78)">${figureSVG(pz,"stand",false,"stir")}</g>`;
      bg += seatRot("rome",1,60,236,.72,"eat") + smallTable(84,212,52,"#FBF7EE","url(#ck-"+uid+")");
      return {bg, cloth:"check"};
    }
    case "athens": {
      let bg = `<rect width="360" height="300" fill="#F7F4EC"/>${floorTiles("#E8DCC4","#DCCDAE",200,20)}`;
      bg += win(14,20,150,150,"arch") + win(196,20,150,150,"arch");
      bg += `<path d="M0 10 Q90 26 180 12 Q270 26 360 10" stroke="#3B3A36" stroke-width=".6" fill="none"/>${Array.from({length:14},(_,i)=>`<circle cx="${i*26+10}" cy="${15+Math.sin(i)*4}" r="2" fill="#F6D27A" class="glow" style="animation-delay:-${i*.3}s"/>`).join("")}`;
      bg += `<g transform="translate(176 196)"><path d="M-10 0 h20 l-3 -16 h-14Z" fill="#C98A5A"/>${canopy(0,-30,14,FOL.olive.summer,rnd(8),8)}</g>`;
      bg += seatRot("athens",1,48,236,.72,"eat") + smallTable(72,212,46,"#7FAED0") + seatRot("athens",2,316,236,.72,"talk");
      return {bg, cloth:"#7FAED0", chairs:"#2F6FA8"};
    }
    case "london": {
      let bg = `<rect width="360" height="300" fill="#2F4436"/><rect y="120" width="360" height="80" fill="#5A3A28"/>${Array.from({length:9},(_,i)=>`<rect x="${i*40+6}" y="128" width="28" height="64" fill="none" stroke="#4A2E22" stroke-width="2"/>`).join("")}${floorPlanks("#5A3A28",200)}`;
      bg += win(16,18,130,96,"pane") + `<text x="81" y="108" text-anchor="middle" font-size="11" font-family="Young Serif, Georgia, serif" fill="#F4EEE2" opacity=".85">The Crown</text>`;
      bg += `<rect x="190" y="96" width="160" height="24" fill="#6B4A32"/><rect x="190" y="92" width="160" height="5" fill="#C9A050"/>${[212,236,260].map(x=>`<path d="M${x} 92 v-18" stroke="#C9A050" stroke-width="3"/><rect x="${x-3}" y="66" width="6" height="10" rx="2" fill="#2B2B2B"/>`).join("")}<rect x="280" y="26" width="64" height="44" fill="#2B2B2B" stroke="#8C6A4E" stroke-width="3"/><text x="312" y="42" text-anchor="middle" font-size="8" fill="#F4EEE2" font-family="sans-serif">PIE OF THE DAY</text><path d="M290 52 h44 M290 60 h32" stroke="#F4EEE2" stroke-width="1" opacity=".7"/>`;
      const barkeep = withLook(localAvatar("london",6), {top:"shirt", topc:"#FBF7EE", bottom:"trousers", botc:"#2B2B2B"});
      bg += `<g transform="translate(300 160) scale(.6)">${figureSVG(barkeep,"stand",false,"stir")}</g><rect x="190" y="120" width="160" height="10" fill="#4A2E22"/>`;
      bg += [70,180].map(x=>pendant(x,true,22,`<path d="M-10 34 Q0 20 10 34Z" fill="#C9A050"/>`)).join("");
      bg += seatRot("london",1,54,236,.72,"eat") + smallTable(78,212,46,"#6B4A32");
      return {bg, cloth:"#6B4A32"};
    }
    case "copenhagen": {
      let bg = `<rect width="360" height="300" fill="#EFE6D6"/>${floorPlanks("#C9A87A",200)}`;
      bg += win(18,22,170,130,"pane");
      bg += [240,320].map(x=>`<g transform="translate(${x} 0)"><path d="M0 0 V30" stroke="#2B2B2B"/><path d="M-22 44 Q0 22 22 44Z" fill="#F4EEE2"/><path d="M-16 52 Q0 36 16 52Z" fill="#E8DCC4"/><ellipse cy="54" rx="10" ry="3" fill="#F6D27A" class="glow"/></g>`).join("");
      bg += `<g transform="translate(330 196)"><path d="M-10 0 h20 l-3 -16 h-14Z" fill="#C27A52"/>${canopy(0,-34,18,["#5E8A3C","#7FA35A"],rnd(11),8)}</g>`;
      bg += seatRot("copenhagen",1,250,236,.72,"talk") + smallTable(274,212,46,"#E8DCC4") + candleSVG(274,212,8) + seatRot("copenhagen",2,298,236,.72,"sip");
      return {bg, cloth:"#F4EEE2", candle:true};
    }
    case "delhi": {
      let bg = `<rect width="360" height="300" fill="#F0D9B0"/>${floorTiles("#C9844E","#B5733F",200,20)}`;
      bg += win(16,26,120,124,"arch") + `<path d="M150 20 h200 v110 h-200Z" fill="#C2387A"/>${["#F2C14E","#E07A3A","#7FA35A","#34476B","#F2C14E"].map((c,i)=>`<path d="M150 ${32+i*20} h200" stroke="${c}" stroke-width="5"/>`).join("")}`;
      const wallah = withLook(localAvatar("delhi",5), {top:"tshirt", topc:"#F4EEE2", bottom:"trousers", botc:"#8C6A4E"});
      bg += `<g transform="translate(290 226) scale(.84)">${figureSVG(wallah,"stand",false,"pour")}</g><path class="pourstream" d="M266 154 Q276 176 300 191" stroke="#C98A4A" stroke-width="2.2" fill="none" stroke-dasharray="4 3"/>`;
      bg += seatRot("delhi",1,60,236,.72,"eat") + smallTable(84,212,46,"#C2387A");
      return {bg, cloth:"#E07A3A"};
    }
    case "sf": default: {
      let bg = `<rect width="360" height="300" fill="#E4DCCB"/><path d="M0 0 H360 V40 Q180 -6 0 40Z" fill="#9AA6AC"/>${Array.from({length:9},(_,i)=>`<path d="M${i*45} 0 Q${i*45+22} 30 ${i*45+45} 0" stroke="#5A6470" stroke-width="2" fill="none"/>`).join("")}<path d="M0 40 Q180 -6 360 40" stroke="#5A6470" stroke-width="3" fill="none"/>${floorTiles("#C9C0B0","#B9AF9E",200,24)}`;
      bg += win(126,50,108,90,"arch");
      bg += `<rect x="12" y="120" width="104" height="80" fill="#A86E48"/><rect x="12" y="110" width="104" height="12" fill="#2F4436"/><text x="64" y="120" text-anchor="middle" font-size="8" fill="#F4EEE2" font-family="sans-serif">SOURDOUGH</text>${[30,56,82].map(x=>`<ellipse cx="${x+6}" cy="140" rx="11" ry="7" fill="#C98A4A"/><path d="M${x} 138 q6 -4 12 0" stroke="#E8C690" stroke-width="1.4" fill="none"/>`).join("")}<rect x="250" y="120" width="98" height="80" fill="#5E8A3C"/><rect x="250" y="110" width="98" height="12" fill="#3B3A36"/><text x="299" y="120" text-anchor="middle" font-size="8" fill="#F4EEE2" font-family="sans-serif">OYSTERS</text>`;
      bg += walkerP(withLook(localAvatar("sf",4),{}), 214, .62, "walkarms", 16, 150, 2) + walkerP(withLook(localAvatar("sf",7),{}), 210, .56, "walkarms", 21, 150, 9);
      return {bg, cloth:"#E8DCC4"};
    }
  }
}
/* study spots */
function studyRoom(city, ctx){
  const {place, w, season, phase, uid} = ctx;
  const win = (x,y,wd,ht,kind) => windowView(place, w, season, phase, x, y, wd, ht, uid+"w"+x, kind);
  const shelves = (x, y, wdt, rows, h) => Array.from({length:rows},(_,r)=>`<rect x="${x}" y="${y+r*h+h-4}" width="${wdt}" height="4" fill="#6B4A32"/>${Array.from({length:Math.floor(wdt/9)},(_,k)=>`<rect x="${x+2+k*9}" y="${y+r*h+6+(k%3)*2}" width="7" height="${h-10-(k%3)*2}" fill="${["#B8423A","#34476B","#D9A441","#4F6B45","#9A86C2","#C8743E","#6B4A32"][(k+r*2)%7]}"/>`).join("")}`).join("");
  const greenLamp = (x,y) => `<g transform="translate(${x} ${y})"><path d="M0 0 V-12" stroke="#C9A050" stroke-width="1.6"/><path d="M-10 -12 Q0 -22 10 -12Z" fill="#2F6B4A"/><ellipse cy="-12" rx="10" ry="2" fill="#F6E7A8"/><circle cy="-6" r="16" fill="#F6E7A8" opacity=".22" class="glow"/></g>`;
  switch(city){
    case "beijing": return {bg:`<rect width="360" height="300" fill="#E2CFAE"/>${floorPlanks("#7A5236",200)}${win(30,26,130,130,"round")}<rect x="196" y="40" width="34" height="110" fill="#FBF7EE" stroke="#8C5A3C" stroke-width="2"/><path d="M206 54 h14 M213 54 v20 M206 84 q7 8 14 0 M208 100 h10 M213 96 v26 M206 128 l14 8" stroke="#2B2B2B" stroke-width="2.4" fill="none"/><g transform="translate(300 150)"><rect x="-26" y="0" width="52" height="8" fill="#6B4A32"/><path d="M-20 8 v40 M20 8 v40" stroke="#6B4A32" stroke-width="3"/><path d="M-8 0 h16 l-2 -10 h-12Z" fill="#7A4E35"/>${canopy(0,-30,18,["#5E7A45","#6F8C50"],rnd(2),7)}<path d="M0 -10 Q-6 -20 -2 -30" stroke="#5B4636" stroke-width="2.4" fill="none"/></g>${seatP("beijing",3,300,236,.62,"sip")}`, desk:"#7A4E35", item:"tea", arms:"book"};
    case "tokyo": return {bg:`<rect width="360" height="300" fill="#4A3426"/>${Array.from({length:12},(_,i)=>`<path d="M${i*30} 0 V200" stroke="#3E2C20" stroke-width="2"/>`).join("")}${floorPlanks("#3E2C20",200)}${win(20,28,120,90,"pane")}<rect x="190" y="120" width="160" height="10" fill="#6B4A32"/><g transform="translate(240 120)"><path d="M-8 0 h16 l-2 -6 h-12Z" fill="#2B2B2B"/><circle cy="-16" r="10" fill="#DCEBF2" opacity=".8" stroke="#9AB8C8"/><rect x="-3" y="-40" width="6" height="16" fill="#DCEBF2" opacity=".8" stroke="#9AB8C8"/>${[0,1,2].map(i=>`<circle cx="${(i-1)*3}" cy="-14" r="1.4" fill="#FFF" class="bubble" style="animation-delay:-${i*.4}s"/>`).join("")}<circle cy="2" r="4" fill="#F2A65A" class="flicker"/></g><g transform="translate(310 60)">${[0,1,2,3].map(i=>`<rect x="${i*8-16}" y="0" width="7" height="40" fill="${["#B8423A","#D9A441","#34476B","#2B2B2B"][i]}"/>`).join("")}</g>${pendant(100,true,30)}${pendant(260,true,26)}${seatP("tokyo",3,300,236,.62,"sip")}`, desk:"#6B4A32", item:"coffee", chair:"#9E2E2A"};
    case "paris": return {bg:`<rect width="360" height="300" fill="#E8DFCB"/>${Array.from({length:4},(_,i)=>`<path d="M${i*96} 200 V60 Q${i*96+48} 10 ${i*96+96} 60 V200" stroke="#F4EEE2" stroke-width="6" fill="none"/>`).join("")}${win(110,40,140,110,"arch")}${shelves(0,90,96,3,36)}${shelves(264,90,96,3,36)}${floorPlanks("#8C6A4E",200)}<rect x="20" y="196" width="320" height="4" fill="#5A3A28"/>${seatP("paris",3,60,236,.6,"book")}${seatP("paris",4,300,236,.6,"book")}`, desk:"#6B4A32", lamp:true};
    case "rome": return {bg:`<rect width="360" height="300" fill="#5A3A28"/>${shelves(0,10,360,2,44)}<rect x="0" y="100" width="360" height="6" fill="#C9A050"/>${shelves(0,108,120,2,44)}${shelves(240,108,120,2,44)}${win(126,110,108,86,"arch")}<path d="M300 106 L320 200" stroke="#8C6A4E" stroke-width="3"/>${Array.from({length:6},(_,i)=>`<path d="M${302+i*3} ${116+i*14} h10" stroke="#8C6A4E" stroke-width="2"/>`).join("")}${floorTiles("#C9B89A","#B9A88A",200,20)}<g transform="translate(40 196)"><circle cy="-30" r="20" fill="#C9B28E"/><path d="M-20 -30 h40 M-14 -44 q14 14 28 0" stroke="#7FA35A" stroke-width="2" fill="none"/><path d="M0 -10 V0 M-10 0 h20" stroke="#6B4A32" stroke-width="3"/></g>`, desk:"#4A3324", lamp:true};
    case "nyc": return {bg:`<rect width="360" height="300" fill="#C9A87A"/><rect x="20" y="8" width="320" height="60" fill="#B5925A"/><rect x="30" y="14" width="300" height="48" fill="#9CC3E6"/>${[[80,34],[200,30],[280,40]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="34" ry="10" fill="#FBF8F1" opacity=".9"/>`).join("")}<rect x="20" y="8" width="320" height="60" fill="none" stroke="#D9A441" stroke-width="4"/>${win(30,82,90,110,"arch")}${win(240,82,90,110,"arch")}${shelves(130,90,100,3,34)}${[110,250].map(x=>`<g transform="translate(${x} 70)"><path d="M0 0 V10" stroke="#C9A050"/>${[-10,0,10].map(dx=>`<circle cx="${dx}" cy="14" r="3" fill="#FFF6DC"/>`).join("")}<circle cy="14" r="20" fill="#FFE7B0" opacity=".2" class="glow"/></g>`).join("")}${floorPlanks("#6B4A32",200)}${seatP("nyc",3,60,236,.6,"book")}${seatP("nyc",4,300,236,.6,"laptop")}`, desk:"#5A3A28", lamp:true};
    case "sf": return {bg:`<rect width="360" height="300" fill="#EAE0CC"/>${shelves(0,20,120,5,36)}${shelves(240,20,120,5,36)}${win(130,30,100,110,"pane")}<rect x="150" y="150" width="60" height="22" fill="#2B2B2B"/><text x="180" y="165" text-anchor="middle" font-size="10" fill="#F4EEE2" font-family="Georgia, serif">POETRY</text>${floorPlanks("#A88A66",200)}${walkerP(withLook(localAvatar("sf",8),{}),214,.6,"book",22,120,4)}`, desk:"#8C6A4E"};
    case "athens": return {bg:`<rect width="360" height="300" fill="#F7F4EC"/>${win(10,16,160,170,"arch")}${win(190,16,160,170,"arch")}${floorTiles("#E8DCC4","#DCCDAE",200,20)}${canopy(186,24,14,["#C2387A","#D9519A","#7FA35A"],rnd(5),8)}`, desk:"#2F6FA8", item:"freddo"};
    case "london": return {bg:`<rect width="360" height="300" fill="#C9B89A"/><path d="M0 120 Q180 -60 360 120 Z" fill="#E4D7BE"/>${Array.from({length:9},(_,i)=>{ const a = Math.PI*(i+1)/10; return `<path d="M180 120 L${(180-200*Math.cos(a)).toFixed(0)} ${(120-170*Math.sin(a)).toFixed(0)}" stroke="#C9B28E" stroke-width="2"/>`; }).join("")}<circle cx="180" cy="0" r="22" fill="#F6E7A8" opacity=".7"/>${Array.from({length:6},(_,i)=>`<rect x="${30+i*54}" y="${66-Math.sin(Math.PI*(i+.5)/6)*24}" width="16" height="22" rx="8" fill="#BFD4E6"/>`).join("")}${shelves(0,120,360,2,40)}${floorPlanks("#5A3A28",200)}${seatP("london",3,60,236,.6,"book")}${seatP("london",4,300,236,.6,"write")}`, desk:"#4A2E22", lamp:true};
    case "copenhagen": return {bg:`<rect width="360" height="300" fill="#F4F2EE"/>${win(10,10,340,140,"pane")}<path d="M0 160 Q90 140 180 160 Q270 180 360 160 V172 Q270 192 180 172 Q90 152 0 172Z" fill="#FBFBF8" stroke="#D9D6D0"/>${floorPlanks("#D9C9A8",200)}${seatP("copenhagen",3,300,236,.6,"laptop")}`, desk:"#E8DCC4"};
    case "delhi": default: return {bg:`<rect width="360" height="300" fill="#F0D9B0"/>${win(20,30,100,130,"arch")}<g transform="translate(140 30)">${Array.from({length:6},(_,r)=>Array.from({length:8},(_,c)=>`<circle cx="${c*14+7}" cy="${r*14+7}" r="5.4" fill="none" stroke="#C98A5A" stroke-width="2"/>`).join("")).join("")}</g>${shelves(270,30,90,4,36)}<g transform="translate(200 18)"><circle r="4" fill="#5A4030"/><g class="spinslow" style="animation-duration:2s">${[0,120,240].map(a=>`<ellipse cx="0" cy="0" rx="34" ry="5" transform="rotate(${a})" fill="#8C6A4E"/>`).join("")}</g></g>${floorTiles("#C9844E","#B5733F",200,20)}${seatP("delhi",3,60,236,.6,"book")}`, desk:"#6B4A32", item:"chai"};
  }
}
/* places of worship */
function worshipRoom(city, ctx){
  const {place, w, season, phase, uid} = ctx;
  const win = (x,y,wd,ht,kind) => windowView(place, w, season, phase, x, y, wd, ht, uid+"w"+x, kind);
  switch(city){
    case "beijing": return {bg:`<rect width="360" height="300" fill="#8E2F28"/><rect width="360" height="34" fill="#D9A441"/>${Array.from({length:18},(_,i)=>`<path d="M${i*20+10} 34 v-26" stroke="#B9862C" stroke-width="3"/>`).join("")}<rect y="34" width="360" height="14" fill="#2F6B6A"/>${Array.from({length:12},(_,i)=>`<circle cx="${i*30+15}" cy="41" r="4" fill="#D9A441"/>`).join("")}${[40,320].map(x=>`<rect x="${x-10}" y="48" width="20" height="152" fill="#B8423A"/>`).join("")}${win(80,60,200,120,"lattice")}${floorTiles("#7A6A5A","#6E5E50",200,24)}${incense(80,226)}${incense(280,226)}`, pose:"cross", cushion:"#D9A441"};
    case "tokyo": {
      let bg = `<rect width="360" height="300" fill="#E8DCC4"/><rect width="360" height="20" fill="#3F3A3A"/><rect y="20" width="360" height="140" fill="#C9C1B0"/>`;
      bg += `<rect y="20" width="360" height="70" fill="${skyFor(w,phase)[0]}"/>${tree("maple",60,110,90,season,rnd(3),isSnowy(w))}${tree("pine",300,110,100,season,rnd(4),isSnowy(w))}<rect y="110" width="360" height="50" fill="#E9E4D6"/>${Array.from({length:7},(_,i)=>`<path d="M0 ${116+i*6} Q90 ${112+i*6} 180 ${116+i*6} T360 ${116+i*6}" stroke="#CFC8B6" stroke-width="1.2" fill="none"/>`).join("")}<g transform="translate(190 132)"><ellipse rx="22" ry="12" fill="#8E8A80"/><ellipse cx="-4" cy="-4" rx="12" ry="7" fill="#A29E94"/><ellipse rx="34" ry="16" fill="none" stroke="#CFC8B6" stroke-width="1.2"/></g><g transform="translate(110 140)"><ellipse rx="12" ry="7" fill="#8E8A80"/></g>`;
      bg += `${[0,90,180,270].map(x=>`<rect x="${x}" y="20" width="6" height="140" fill="#5A4030"/>`).join("")}<rect y="156" width="360" height="8" fill="#5A4030"/>${floorPlanks("#9A7A56",164)}`;
      return {bg, pose:"cross", cushion:"#2B2B2B"};
    }
    case "paris": return {bg:`<rect width="360" height="300" fill="#8E8576"/>${[0,1,2,3,4].map(i=>`<path d="M${i*90-20} 300 V80 Q${i*90+25} 0 ${i*90+70} 80 V300" stroke="#A39A8A" stroke-width="10" fill="none"/>`).join("")}${roseWindow(180,64,46)}${stainedGlass(20,60,44,110,uid)}${stainedGlass(296,60,44,110,uid)}${floorTiles("#BDB3A2","#A89E8E",200,22)}<g transform="translate(300 200)"><rect x="-26" y="-6" width="52" height="6" fill="#3B3A36"/>${[-20,-12,-4,4,12,20].map((x,i)=>candleSVG(x,-6,6+i%3*2)).join("")}</g>${pew(60,232,90)}${seatP("paris",5,40,236,.6,"lap")}`, pose:"bench", pew:true};
    case "rome": return {bg:`<rect width="360" height="300" fill="#CFC3AE"/><path d="M-20 140 Q180 -100 380 140Z" fill="#BFB29A"/>${Array.from({length:5},(_,r)=>Array.from({length:9},(_,c)=>{ const x = 30+c*38, y = 100-r*18 - Math.sin(Math.PI*(c+.5)/9)*40; return `<rect x="${x-8+r*2}" y="${y}" width="${16-r*2}" height="${12-r*1.4}" fill="#A99C84"/>`; }).join("")).join("")}<ellipse cx="180" cy="0" rx="26" ry="10" fill="#FBF8F1"/><path d="M154 0 L206 0 L250 300 L110 300Z" fill="#FFF6DC" opacity=".28" class="glow"/>${[0,1,2,3,4,5].map(i=>`<g transform="translate(${160+i*8} ${60+i*30})"><g class="float" style="animation-delay:-${i}s"><circle r="1.2" fill="#FFF"/></g></g>`).join("")}${[30,330].map(x=>`<rect x="${x-12}" y="110" width="24" height="90" fill="#E4D9C4"/>`).join("")}${floorTiles("#D8CDB8","#B9A88A",200,30)}<ellipse cx="180" cy="250" rx="70" ry="18" fill="none" stroke="#9A8C74" stroke-width="2"/>`, pose:"cross", cushion:"#7A3A7A"};
    case "nyc": return {bg:`<rect width="360" height="300" fill="#A39A8A"/>${[0,1,2,3,4].map(i=>`<path d="M${i*90-30} 300 V100 Q${i*90+15} 10 ${i*90+60} 100 V300" stroke="#B9B0A0" stroke-width="10" fill="none"/>`).join("")}${stainedGlass(40,30,50,150,uid)}${stainedGlass(155,20,50,160,uid)}${stainedGlass(270,30,50,150,uid)}${floorTiles("#C9C0B0","#B9AF9E",200,24)}${pew(60,222,110)}${pew(300,222,110)}${seatP("nyc",5,300,226,.6,"lap")}${seatP("nyc",6,40,226,.6,"lap")}`, pose:"bench", pew:true};
    case "sf": return {bg:`<rect width="360" height="300" fill="#8E8576"/>${stainedGlass(40,20,60,140,uid)}${roseWindow(180,70,40)}${stainedGlass(260,20,60,140,uid)}<rect y="190" width="360" height="110" fill="#B9AF9E"/>${[100,82,64,46,28].map((r,i)=>`<ellipse cx="180" cy="262" rx="${r*1.6}" ry="${r*.42}" fill="none" stroke="${i%2?"#8E8576":"#EAE4D6"}" stroke-width="5"/>`).join("")}`, pose:"cross", cushion:null};
    case "athens": return {bg:`<rect width="360" height="300" fill="#C9A050"/><path d="M60 150 Q180 -40 300 150Z" fill="#B5862C"/><circle cx="180" cy="40" r="26" fill="#D9B860"/>${[70,130,230,290].map(x=>`<path d="M${x-26} 196 V110 a26 26 0 0 1 52 0 V196Z" fill="#8E5E28"/><path d="M${x-20} 196 V112 a20 20 0 0 1 40 0 V196Z" fill="#E8C25A"/><circle cx="${x}" cy="122" r="10" fill="#F6D27A" opacity=".7"/>`).join("")}${[100,180,260].map(x=>`<g transform="translate(${x} 0)"><path d="M0 0 V54" stroke="#8E6A2C"/><path d="M-8 54 h16 l-3 12 h-10Z" fill="#B8423A" opacity=".85"/><ellipse class="flicker" cy="58" rx="2" ry="3" fill="#F2C14E"/><circle cy="60" r="14" fill="#F6B66A" opacity=".3" class="glow"/></g>`).join("")}${floorTiles("#C9B89A","#A89878",200,22)}<g transform="translate(316 210)"><rect x="-22" y="0" width="44" height="12" fill="#C9A050"/>${[-14,-6,2,10].map(x=>candleSVG(x,0,14)).join("")}</g>`, pose:"cross", cushion:"#7A3A7A"};
    case "london": return {bg:`<rect width="360" height="300" fill="#D8CDB8"/><path d="M-10 150 Q180 -90 370 150Z" fill="#C9B28E"/><path d="M40 150 Q180 -30 320 150Z" fill="#D9A441" opacity=".55"/>${Array.from({length:8},(_,i)=>`<path d="M180 150 L${(180-150*Math.cos(Math.PI*(i+1)/9)).toFixed(0)} ${(150-130*Math.sin(Math.PI*(i+1)/9)).toFixed(0)}" stroke="#B5925A" stroke-width="2"/>`).join("")}<rect y="150" width="360" height="10" fill="#B9A88A"/><path d="M0 160 H360" stroke="#2B2B2B" stroke-width="1"/>${Array.from({length:36},(_,i)=>`<path d="M${i*10} 160 v8" stroke="#2B2B2B" stroke-width=".8"/>`).join("")}${floorTiles("#EFE6D2","#2B2B2B",200,18)}${Array.from({length:4},(_,r)=>Array.from({length:6},(_,c)=>`<g transform="translate(${40+c*56} ${210+r*20})"><path d="M-10 0 h20 M-8 0 v8 M8 0 v8 M-10 -10 h20" stroke="#6B4A32" stroke-width="2"/></g>`).join("")).join("")}`, pose:"bench", pew:true};
    case "copenhagen": return {bg:`<rect width="360" height="300" fill="#EFE6D2"/>${Array.from({length:12},(_,i)=>`<path d="M${i*30} 0 V200" stroke="#E2D6BC" stroke-width="2"/>`).join("")}${[0,1,2].map(i=>`<path d="M${i*120} 200 V80 L${i*120+60} 0 L${i*120+120} 80 V200" stroke="#E2D6BC" stroke-width="8" fill="none"/>`).join("")}${win(150,40,60,130,"gothic")}${floorPlanks("#C9B89A",200)}${Array.from({length:3},(_,r)=>[60,300].map(x=>`<g transform="translate(${x} ${214+r*24})"><rect x="-30" y="0" width="60" height="5" fill="#C9A87A"/><path d="M-26 5 v12 M26 5 v12" stroke="#8C6A4E" stroke-width="2"/></g>`).join("")).join("")}${candleSVG(150,200,18)}${candleSVG(210,200,18)}`, pose:"bench", pew:true};
    case "delhi": default: {
      let bg = `<rect width="360" height="300" fill="#F7F4EC"/>`;
      for (let i=0;i<5;i++){ const cx = 30+i*75; bg += `<path d="M${cx-60} 200 Q${cx-40} 40 ${cx} 10 Q${cx+40} 40 ${cx+60} 200Z" fill="#FBFAF6" stroke="#E6E1D6" stroke-width="2"/>`; }
      bg += `<circle cx="180" cy="0" r="40" fill="#FFF6DC" opacity=".8" class="glow"/>${floorTiles("#F2EEE4","#E8E2D4",200,30)}${Array.from({length:3},(_,r)=>[60,300].map(x=>`<g transform="translate(${x} ${214+r*24})"><rect x="-34" y="0" width="68" height="7" rx="2" fill="#F4F1EA" stroke="#D9D2C2"/></g>`).join("")).join("")}${seatP("delhi",6,300,232,.6,"lap")}`;
      return {bg, pose:"bench", pew:true, benchCol:"#F4F1EA"};
    }
  }
}
function indoorScene(p, d, opts, ctx){
  const {actKey, doing, focus, w, season, place, phase, av, petKind, shown, uid} = ctx;
  const city = cityOf(place), night = phase==="night"||phase==="dusk";
  const sleeping = actKey==="sleep", study = actKey==="study", worship = actKey==="mindful";
  const Rs = RESTO[city] || RESTO.paris;
  const where = sleeping ? "in bed" : study ? STUDY[city] : worship ? WORSHIP[city] : Rs.name;
  const label = opts.label || `${name(p)} ${doing ? (sleeping ? "tucked in for the night" : study ? `deep in focus at ${where}` : worship ? `meditating in ${where}` : `eating at ${where}`) : "thinking about "+(focus?focus.name.toLowerCase():"today")}, ${PLACES[place].city}.`;
  let s = `<svg class="scene anim" viewBox="0 0 360 300" role="img" aria-label="${esc(label)}"><defs><clipPath id="clip-${uid}"><rect width="360" height="300"/></clipPath><linearGradient id="lamp-${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE7B0" stop-opacity=".55"/><stop offset="1" stop-color="#FFE7B0" stop-opacity="0"/></linearGradient><pattern id="ck-${uid}" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="#FBF7EE"/><rect width="6" height="6" fill="#C9372C"/><rect x="6" y="6" width="6" height="6" fill="#C9372C"/></pattern></defs><g clip-path="url(#clip-${uid})">`;
  let fx = 180, fy = 254, sc = 1.12, pose = "bench", arms = "rest", room = {};
  if (sleeping) {
    room = homeScene(city, {...ctx, p});
    s += room.s;
    if (doing) s += room.bed;
    else s += room.bed.replace(/<g transform="translate\(-?[\d.]+ -26\) rotate\(-74\)[\s\S]*?<\/g>(?=<g transform="translate)/, "");
    pose = "stand"; fy = 236; fx = 290; sc = 1.0; arms = "rest";
  } else if (study) { room = studyCafe(city, ctx) || studyRoom(city, ctx); s += room.s || room.bg; arms = doing ? (room.arms || "laptop") : "rest"; }
  else if (worship) { room = faithSpace(city, ctx) || worshipRoom(city, ctx); s += room.s || room.bg; pose = room.pose; arms = doing ? (pose==="cross" ? "meditate" : "lap") : "rest"; if (pose==="cross") { fy = 286; sc = 1.15; } }
  else {
    const nr = NEW_RESTO[city];
    if (nr) { room = nr(ctx); room.custom = true; s += room.s; fx = room.fx; fy = room.fy; sc = room.sc; pose = room.pose; }
    else { room = restoRoom(city, ctx); room.lamps = RESTO_LAMPS[city] || [[180,60,110]]; room.wins = RESTO_WINS[city] || []; s += room.bg + bustle(city, 212, city==="tokyo"?1:2); }
    arms = !doing ? "rest" : (room.sip || actKey==="hydrate") ? "sip" : "eat";
  }
  if (night) s += `<rect width="360" height="300" fill="#2A2040" opacity="${sleeping?.35:.14}"/>`;
  if (!sleeping && !doing && !worship && !room.custom) pose = "bench";
  if (room.custom) {
    room.noTable = true;
    let t = room.front || "";
    if (room.table) { const ty = fy - 44*sc; t = `<ellipse cx="${fx}" cy="${fy+42}" rx="40" ry="5" fill="#000" opacity=".1"/><ellipse cx="${fx}" cy="${ty+2}" rx="36" ry="8" fill="${room.table.top}" stroke="${room.table.col}" stroke-width="2"/><path d="M${fx} ${ty+8} V${fy+40} M${fx-14} ${fy+40} h28" stroke="${room.table.col}" stroke-width="3"/>` + t; }
    room.table = t;
  }
  // seat behind the figure
  if (worship) {
    if (pose==="cross" && room.cushion) s += `<ellipse cx="${fx}" cy="${fy-6}" rx="44" ry="10" fill="${room.cushion}"/><ellipse cx="${fx}" cy="${fy-9}" rx="38" ry="6" fill="#FFF" opacity=".12"/>`;
    if (pose==="bench") s += room.benchCol ? `<rect x="${fx-50}" y="${fy-34*sc}" width="100" height="8" rx="3" fill="${room.benchCol}" stroke="#D9D2C2"/>` : pew(fx, fy-34*sc+2, 110);
  } else if (!sleeping && !(room.noTable)) s += `<g><path d="M${fx-30} ${fy-30*sc} V${fy+36}" stroke="#5A4030" stroke-width="4"/><rect x="${fx-34}" y="${fy-36*sc-40}" width="68" height="42" rx="10" fill="${room.chair || room.chairs || "#8C5A3C"}"/><rect x="${fx-36}" y="${fy-32*sc}" width="72" height="8" rx="4" fill="#6B4A32"/></g>`;
  else if (room.noTable && pose==="bench") s += `<rect x="${fx-20}" y="${fy-34*sc}" width="40" height="8" rx="4" fill="${room.chair||"#9E2E2A"}"/><path d="M${fx} ${fy-26*sc} V${fy+40}" stroke="#5A4030" stroke-width="4"/>`;
  UTENSIL_SVG = room.hand ? HAND[room.hand] : `<g transform="translate(14 -42)">${TOOLS[Rs.tool]||""}${Rs.tool==="chop"?`<ellipse cx="18" cy="-13" rx="3.4" ry="2.4" fill="${MORSEL[city]}"/>`:Rs.tool==="fork"?`<circle cx="15" cy="-15" r="2.6" fill="${MORSEL[city]}"/>`:""}</g>`;
  SIP_SVG = room.sip ? HAND[room.sip] : "";
  if (room.chair==="wishbone" && !sleeping) s += `<g><path d="M${fx-28} ${fy-30*sc} Q${fx} ${fy-90} ${fx+28} ${fy-30*sc}" stroke="#C9A87A" stroke-width="5" fill="none"/><path d="M${fx} ${fy-30*sc-2} L${fx} ${fy-66}" stroke="#C9A87A" stroke-width="4"/></g>`;
  const breathe = smil("translate", ["0 0","0 -1.4","0 0"], sleeping?5.5:4.2);
  if (!(sleeping && doing)) s += `<g transform="translate(${fx} ${fy}) scale(${sc})"><g>${breathe}<g class="hero-fig">${figureSVG(av, pose, false, arms)}</g></g></g>`;
  if (sleeping) s += `${doing?["Z","z","Z"].map((z,i)=>`<g transform="translate(${130+i*12} ${150-i*14})"><g class="float" style="animation-delay:-${i*1.2}s"><text font-size="${16-i*3}" font-family="Young Serif, Georgia, serif" fill="#5A4A7A">${z}</text></g></g>`).join(""):""}`;
  else if (worship) { if (doing && pose==="cross") s += `<circle cx="${fx}" cy="${fy-90}" r="70" fill="#FFF6DC" opacity=".16" class="pulse"/>`; }
  else if (room.noTable) s += room.table;
  else {
    const ty = fy - 44*sc;
    const cloth = room.cloth==="check" ? `url(#ck-${uid})` : (room.cloth || "#F4EEE2");
    if (study) s += `<ellipse cx="${fx}" cy="${fy+42}" rx="90" ry="6" fill="#000" opacity=".1"/><rect x="${fx-86}" y="${ty-2}" width="172" height="8" rx="3" fill="${room.desk||"#8C5A3C"}"/><path d="M${fx-78} ${ty+6} L${fx-80} ${fy+40} M${fx+78} ${ty+6} L${fx+80} ${fy+40}" stroke="#3B3A36" stroke-width="3"/>`;
    else if (room.round) s += `<ellipse cx="${fx}" cy="${fy+42}" rx="70" ry="6" fill="#000" opacity=".1"/><ellipse cx="${fx}" cy="${ty+2}" rx="70" ry="12" fill="#E9E2D2" stroke="#C9C1B0"/><path d="M${fx} ${ty+12} V${fy+40} M${fx-20} ${fy+40} h40" stroke="#3B3A36" stroke-width="3.4"/>`;
    else s += `<ellipse cx="${fx}" cy="${fy+42}" rx="96" ry="7" fill="#000" opacity=".1"/><path d="M${fx-92} ${ty} h184 l6 26 h-196Z" fill="${cloth}"/><rect x="${fx-92}" y="${ty-4}" width="184" height="6" rx="3" fill="${room.cloth==="check"?"#E8DCC4":shade(room.cloth||"#F4EEE2",-.1)}"/><path d="M${fx-60} ${ty+26} V${fy+40} M${fx+60} ${ty+26} V${fy+40}" stroke="#4A3B2E" stroke-width="3.4"/>`;
    if (study) {
      if (room.lamp) s += `<g transform="translate(${fx-64} ${ty-2})"><path d="M0 0 V-12" stroke="#C9A050" stroke-width="1.6"/><path d="M-10 -12 Q0 -22 10 -12Z" fill="#2F6B4A"/><circle cy="-6" r="16" fill="#F6E7A8" opacity=".22" class="glow"/></g>`;
      if (room.arms!=="book") s += `<g transform="translate(${fx} ${ty-3})"><path d="M-18 0 L-15 -25 Q-15 -27 -13 -27 L13 -27 Q15 -27 15 -25 L18 0Z" fill="#8E98A2"/><path d="M-3 -15 q3 -4 6 0 q-3 3 -6 0Z" fill="#E6EAEE"/></g>`;
      const it = room.item==="tea" ? `<g transform="scale(.75)">${treatSVG("teapot")}</g>` : room.item==="freddo" ? `<path d="M-4 -14 h8 l-1 14 h-6Z" fill="#DCEBF2" stroke="#9AB8C8" stroke-width=".6"/><rect x="-3.4" y="-8" width="6.8" height="8" fill="#C98A4A"/><rect x="-3.4" y="-11" width="6.8" height="3" fill="#F4EEE2"/><path d="M1 -14 l3 -6" stroke="#B8423A" stroke-width="1.2"/>` : dishSVG(room.item==="chai"?"chai":"coffee");
      s += `<g transform="translate(${fx+58} ${ty-3})">${it}</g>`;
    } else if (doing || true) {
      const main = actKey==="hydrate" ? "water" : Rs.dish;
      if (room.lazy) {
        s += `<ellipse cx="${fx}" cy="${ty-2}" rx="40" ry="8" fill="#F4EEE2" opacity=".55" stroke="#C9C1B0"/>`;
        const path = `M${fx-34} ${ty-2} A34 7 0 1 0 ${fx+34} ${ty-2} A34 7 0 1 0 ${fx-34} ${ty-2}`;
        ["duck","dumplings","chai"].forEach((dsh,i) => { s += `<g transform="scale(.55)" opacity="1"><g>${motionOff()?"":`<animateMotion dur="12s" begin="-${i*4}s" repeatCount="indefinite" path="${path.replace(/-?[\d.]+/g, m => (parseFloat(m)/.55).toFixed(1))}"/>`}${motionOff()?`<g transform="translate(${((fx-30+i*30)/.55).toFixed(1)} ${((ty-4)/.55).toFixed(1)})">${dishSVG(dsh)}</g>`:dishSVG(dsh)}</g></g>`; });
      }
      s += `<g transform="translate(${fx-6} ${ty-4}) scale(.95)">${dishSVG(main)}</g>`;
      const side = city==="delhi" ? "chai" : ["nyc","paris","copenhagen","sf"].includes(city) ? "coffee" : city==="london" ? "teapot" : "water";
      s += `<g transform="translate(${fx+58} ${ty-4})">${side==="teapot"?`<g transform="scale(.7)">${treatSVG("teapot")}</g>`:dishSVG(side)}</g>`;
      if (room.candle) s += candleSVG(fx-58, ty-2, 10);
      [...shown].filter(id => TREATS[id] && !["basket","lantern","radio","butterfly"].includes(id)).slice(0,2).forEach((id,i)=> s += `<g transform="translate(${fx-80+i*22} ${ty-4}) scale(.5)">${treatSVG2(id)}</g>`);
    }
  }
  if (!doing && focus) s += `<g transform="translate(${fx+72} ${fy-178})"><g class="bob"><circle cx="-26" cy="44" r="3" fill="#FFFDF8"/><circle cx="-18" cy="32" r="5" fill="#FFFDF8"/><ellipse cx="7.5" cy="8" rx="30" ry="22" fill="#000" opacity=".08"/><ellipse cx="6" cy="6" rx="30" ry="22" fill="#FFFDF8"/><g transform="translate(6 6) scale(.9)">${itemSVG(focus.item)}</g></g></g>`;
  const acc = {bow:shown.has("bow"), scarf:shown.has("scarf"), hat:shown.has("hat"), crown:shown.has("catcrown"), bandana:shown.has("bandana"), bell:shown.has("bell")};
  const eating = !sleeping && !study && !worship;
  if (eating) s += petEating(petKind, acc, city, 64, 282);
  else s += `<g transform="translate(${sleeping?300:58} ${sleeping?282:282}) scale(.74)"><g>${smil("translate", ["0 0","10 0","10 0","0 0"], 16)}${shown.has("cushion")?treatSVG("cushion"):""}${petSVG(petKind, false, acc)}</g></g>`;
  const L = lighting(uid, phase, {indoor:true, windows: room.wins || [], lamps: room.lamps || []});
  s = s.replace(`<defs><clipPath id="clip-${uid}">`, `<defs>${L.defs}<clipPath id="clip-${uid}">`) + L.s;
  s += `<rect width="360" height="300" fill="#0B0F08" style="opacity:var(--scene-dim)" pointer-events="none"/>`;
  return s + `</g></svg>`;
}
function sceneSVG(p, d, opts){
  opts = opts || {};
  const focus = opts.habit || null, actKey = opts.act || actFor(focus);
  const special = actKey==="move" || actKey.startsWith("sport_") || actKey.startsWith("social_");
  if (!INDOOR_ACTS.has(actKey) && !special) return sceneOutdoor(p, d, opts);
  const r = opts.empty ? .9 : weekRate(p,d), w = opts.w || wxFor(r, d, p), season = opts.season || seasonFor(d), place = opts.place || placeOf(p);
  const doing = opts.doing ?? true;
  const phase = opts.phase || (opts.empty ? "day" : phaseOfP(p, d));
  const pk = opts.empty ? {} : (S.picnic[p] || {});
  const C = {actKey, doing, focus, w, season, place, phase, av: opts.av || avatarOf(p), petKind: opts.pet || petOf(p), shown: new Set(pk.shown || []), uid: "s"+p+(opts.uid||"")};
  if (actKey==="move" || actKey.startsWith("sport_")) return sportScene(p, d, opts, {...C, sport: actKey.startsWith("sport_") ? actKey.slice(6) : null});
  if (actKey.startsWith("social_")) return socialScene(actKey.slice(7), p, d, opts, C);
  return indoorScene(p, d, opts, {actKey, doing, focus, w, season, place, phase, av: opts.av || avatarOf(p), petKind: opts.pet || petOf(p), shown: new Set(pk.shown || []), uid: "s"+p+(opts.uid||"")});
}
