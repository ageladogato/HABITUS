/* ---------- cosy cultural bedrooms ---------- */
const HOME_NAME = {tokyo:"a tatami room", beijing:"a courtyard-house bedroom", rome:"an ancient Roman house", athens:"an ancient Greek house", paris:"a Haussmann apartment", london:"a Victorian townhouse", nyc:"a brick loft", sf:"a Victorian with a bay window", copenhagen:"a hygge flat", delhi:"a haveli room"};
function homeScene(city, ctx){
  const {place, w, season, phase, uid, av, p} = ctx;
  const win = (x,y,wd,ht,kind) => windowView(place, w, season, phase, x, y, wd, ht, uid+"h"+x, kind);
  const blanket = p==="a" ? "var(--a-soft)" : "var(--b-soft)";
  let s = "", bed = "", lamps = [], wins = [];
  switch(city){
    case "tokyo":
      s += room3d({wall:"#E8DCC0", floor:"#C9C08A", floorKind:"tatami", ceilCol:"#6B4E3A"});
      s += win(70,40,130,100,"shoji"); wins.push([70,40,130,100]);
      s += `<rect x="236" y="30" width="80" height="166" fill="#DCCDAE" stroke="#6B4E3A" stroke-width="4"/><rect x="262" y="44" width="28" height="90" fill="#F4EEE2" stroke="#8C6A4E"/><path d="M270 58 h12 M276 58 v16 M270 84 q6 6 12 0" stroke="#2B2B2B" stroke-width="1.8" fill="none"/><g transform="translate(276 180)"><path d="M-10 0 h20 l-3 10 h-14Z" fill="#3B3A36"/><path d="M0 0 Q-8 -20 -4 -34 M0 0 Q6 -18 10 -30" stroke="#5E8A3C" stroke-width="1.6" fill="none"/><circle cx="-4" cy="-36" r="4" fill="#E07A5F"/><circle cx="10" cy="-32" r="3.4" fill="#F4EEE2"/></g>`;
      s += `<g transform="translate(56 214)"><rect x="-12" y="-36" width="24" height="36" rx="3" fill="#FBF3DC" stroke="#6B4E3A" stroke-width="2"/><path d="M-12 -24 h24 M-12 -12 h24 M0 -36 v36" stroke="#6B4E3A" stroke-width="1"/><rect x="-14" y="0" width="28" height="4" fill="#6B4E3A"/></g>`; lamps.push([56,196,90]);
      bed = `<g transform="translate(190 262)"><rect x="-96" y="-8" width="192" height="16" rx="6" fill="#FBF8F1" stroke="#E2D9C6"/>${sleeperSVG(av, blanket, 170)}</g>`;
      break;
    case "beijing":
      s += room3d({wall:"#E9D6BC", floor:"#8C5A3C", floorKind:"planks", ceilCol:"#9E2E2A"});
      s += win(214,44,96,96,"round"); wins.push([214,44,96,96]);
      s += `<g transform="translate(150 0)"><rect x="-110" y="70" width="220" height="10" fill="#7A2A22"/><path d="M-106 80 V220 M106 80 V220" stroke="#7A2A22" stroke-width="7"/>${Array.from({length:9},(_,i)=>`<rect x="${-100+i*22}" y="82" width="18" height="18" fill="none" stroke="#9E3A2E" stroke-width="2"/>`).join("")}<path d="M-100 100 Q-80 170 -96 220 L-80 220 Q-70 160 -86 100Z M100 100 Q80 170 96 220 L80 220 Q70 160 86 100Z" fill="#B8423A" opacity=".85"/></g>`;
      s += `<g transform="translate(330 30)"><g class="swing"><line y2="12" stroke="#3E3A36"/><ellipse cy="26" rx="12" ry="13" fill="#C9372C"/><rect x="-5" y="11" width="10" height="3" fill="#D9A441"/></g></g>`; lamps.push([330,56,90]);
      bed = `<g transform="translate(150 236)"><rect x="-100" y="0" width="200" height="34" rx="4" fill="#7A2A22"/><rect x="-100" y="-10" width="200" height="14" rx="5" fill="#F4EEE2"/>${sleeperSVG(av, "#C2552A", 176)}</g>`;
      break;
    case "rome":
      s += room3d({wall:"#A33A2A", side:"#8E3024", floor:"#D9C9A4", floorKind:"mosaic", ceilCol:"#7A2A1E"});
      s += `<rect x="34" y="30" width="292" height="12" fill="#1E1A16"/><rect x="34" y="150" width="292" height="46" fill="#1E1A16"/>${[60,130,230,300].map(x=>`<rect x="${x-22}" y="56" width="44" height="80" fill="none" stroke="#D9A441" stroke-width="2"/><path d="M${x-14} 90 q14 -20 28 0" stroke="#5E8A3C" stroke-width="2" fill="none"/><circle cx="${x}" cy="100" r="5" fill="#D9A441" opacity=".7"/>`).join("")}`;
      s += `<g>${win(150,40,64,150,"pane")}<rect x="150" y="40" width="64" height="150" fill="none" stroke="#1E1A16" stroke-width="6"/><rect x="164" y="60" width="8" height="130" fill="#F4EEE2" opacity=".9"/><rect x="192" y="60" width="8" height="130" fill="#F4EEE2" opacity=".9"/></g>`; wins.push([150,40,64,150]);
      s += `<g transform="translate(300 170)"><path d="M-14 0 q14 -10 26 0 l-4 6 h-18Z" fill="#B57A3A"/><ellipse class="flicker" cx="12" cy="-4" rx="3" ry="5" fill="#F6B66A"/><path d="M0 6 V26" stroke="#8C6A3A" stroke-width="2"/></g>`; lamps.push([312,166,90]);
      bed = `<g transform="translate(150 246)"><path d="M-104 0 h208 v20 h-208Z" fill="#6B4A32"/><path d="M-98 20 v18 M98 20 v18" stroke="#4A3324" stroke-width="5"/><path d="M-104 -6 q-10 -30 4 -36" stroke="#6B4A32" stroke-width="6" fill="none"/><rect x="-104" y="-10" width="208" height="14" rx="5" fill="#E8DCC4"/>${sleeperSVG(av, "#7A3A7A", 180)}</g>`;
      break;
    case "athens":
      s += room3d({wall:"#EFE2C6", floor:"#C9A87A", floorKind:"tiles", ceilCol:"#D9C4A0"});
      s += `<rect x="34" y="30" width="292" height="14" fill="#1E1A16"/>${Array.from({length:24},(_,i)=>`<path d="M${38+i*12} 41 v-8 h8 v5 h-4" stroke="#D9A441" stroke-width="1.4" fill="none"/>`).join("")}`;
      s += `${win(190,60,110,136,"pane")}<rect x="186" y="56" width="10" height="140" fill="#F4EEE2"/><rect x="294" y="56" width="10" height="140" fill="#F4EEE2"/><rect x="182" y="52" width="126" height="8" fill="#EFE6D2"/>`; wins.push([190,60,110,136]);
      s += `<g transform="translate(70 196)"><path d="M-12 0 q-6 -30 12 -44 q18 14 12 44Z" fill="#C2552A"/><path d="M-10 -20 h20" stroke="#1E1A16" stroke-width="3"/><path d="M-6 -44 q6 -6 12 0" stroke="#C2552A" stroke-width="3" fill="none"/></g><g transform="translate(130 150)"><path d="M-10 0 q10 -8 20 0 l-3 5 h-14Z" fill="#B57A3A"/><ellipse class="flicker" cx="10" cy="-3" rx="2.6" ry="4.4" fill="#F6B66A"/></g>`; lamps.push([140,146,80]);
      bed = `<g transform="translate(146 248)"><path d="M-96 -6 h192 v18 h-192Z" fill="#8C5A3C"/><path d="M-96 -6 q-14 -24 -2 -40 M96 -6 q8 -14 2 -24" stroke="#8C5A3C" stroke-width="6" fill="none"/><path d="M-90 12 v26 M90 12 v26" stroke="#6B4A32" stroke-width="5"/><rect x="-96" y="-12" width="192" height="12" rx="5" fill="#F4EEE2"/>${sleeperSVG(av, "#2F6FA8", 170)}</g>`;
      break;
    case "paris":
      s += room3d({wall:"#E9E2D4", floor:"#B98A5A", floorKind:"herring", ceilCol:"#F2EDE2"});
      s += [60,300].map(x=>`<rect x="${x-24}" y="40" width="48" height="140" fill="none" stroke="#D6CCBA" stroke-width="2"/>`).join("") + `<path d="M34 24 H326" stroke="#D6CCBA" stroke-width="5"/>`;
      s += `${win(126,30,108,158,"pane")}<path d="M120 150 H240 M120 170 H240" stroke="#2B2B2B" stroke-width="2"/>${Array.from({length:10},(_,i)=>`<path d="M${126+i*12} 150 v20" stroke="#2B2B2B" stroke-width="1.2"/>`).join("")}`; wins.push([126,30,108,158]);
      s += `<g transform="translate(180 0)"><path d="M0 0 V14" stroke="#C9A050"/>${[-18,-6,6,18].map(x=>`<path d="M${x} 20 v6" stroke="#C9A050" stroke-width="1.4"/><ellipse cx="${x}" cy="28" rx="2.4" ry="3.4" fill="#FFF6DC"/>`).join("")}<path d="M-22 22 Q0 12 22 22" stroke="#C9A050" stroke-width="2" fill="none"/></g>`; lamps.push([180,28,110]);
      bed = `<g transform="translate(180 250)"><path d="M-106 -50 Q-106 -66 -90 -66 M106 -50 Q106 -66 90 -66" stroke="#C9A050" stroke-width="3" fill="none"/><path d="M-106 -50 V30 M106 -50 V30" stroke="#C9A050" stroke-width="4"/><rect x="-104" y="0" width="208" height="20" rx="4" fill="#E8DCC4"/><rect x="-104" y="-10" width="208" height="14" rx="5" fill="#FBF8F1"/>${sleeperSVG(av, blanket, 186)}</g>`;
      break;
    case "london":
      s += room3d({wall:"#3F5A4A", floor:"#6B4A32", floorKind:"planks", ceilCol:"#E8E0CC"});
      s += Array.from({length:12},(_,i)=>Array.from({length:7},(_,j)=>`<path d="M${44+i*24} ${30+j*24} l4 6 l-4 6 l-4 -6Z" fill="#4E6B5A"/>`).join("")).join("");
      s += `${win(214,40,90,130,"pane")}<rect x="214" y="104" width="90" height="4" fill="#E8E0CC"/>`; wins.push([214,40,90,130]);
      s += `<g transform="translate(90 196)"><rect x="-40" y="-90" width="80" height="90" fill="#E8E0CC"/><rect x="-26" y="-60" width="52" height="60" fill="#1E1A16"/><g class="flicker"><path d="M-16 0 q6 -20 12 -6 q4 -14 10 0 q4 -10 10 6Z" fill="#F2A65A"/></g><rect x="-46" y="-96" width="92" height="8" fill="#D9CFBC"/><rect x="-20" y="-120" width="40" height="22" fill="#C9A87A"/><rect x="-16" y="-116" width="32" height="14" fill="#7FAED0" opacity=".6"/></g>`; lamps.push([90,170,100]);
      bed = `<g transform="translate(220 252)"><path d="M-96 -96 V30 M96 -96 V30" stroke="#5A3A28" stroke-width="6"/><path d="M-100 -96 H100" stroke="#5A3A28" stroke-width="8"/><path d="M-96 -92 Q-80 -40 -92 30 M96 -92 Q80 -40 92 30" stroke="#8E2F28" stroke-width="10" fill="none" opacity=".8"/><rect x="-92" y="0" width="184" height="22" rx="4" fill="#E8DCC4"/><rect x="-92" y="-10" width="184" height="14" rx="5" fill="#FBF8F1"/>${sleeperSVG(av, "#8E2F28", 166)}</g>`;
      break;
    case "nyc":
      s += room3d({wall:"#A0563E", floor:"#7A5236", floorKind:"planks", ceil:0});
      s += Array.from({length:28},(_,j)=>`<path d="M34 ${8+j*7} H326" stroke="#8E4A34" stroke-width="1"/>${Array.from({length:12},(_,i)=>`<path d="M${40+i*24+(j%2)*12} ${8+j*7} v7" stroke="#8E4A34" stroke-width="1"/>`).join("")}`).join("");
      s += `${win(60,20,200,150,"pane")}${[110,160,210].map(x=>`<path d="M${x} 20 V170" stroke="#2B2B2B" stroke-width="3"/>`).join("")}${[70,120].map(y=>`<path d="M60 ${y} H260" stroke="#2B2B2B" stroke-width="3"/>`).join("")}`; wins.push([60,20,200,150]);
      s += `<path d="M40 14 Q180 30 320 14" stroke="#3B3A36" stroke-width=".6" fill="none"/>${Array.from({length:12},(_,i)=>`<circle cx="${50+i*24}" cy="${18+Math.sin(i/2)*5}" r="2.2" fill="#F6D27A" class="glow" style="animation-delay:-${i*.3}s"/>`).join("")}<g transform="translate(296 196)"><path d="M-12 0 h24 l-4 -20 h-16Z" fill="#C27A52"/>${canopy(0,-40,22,["#5E8A3C","#7FA35A","#4F7A3A"],rnd(4),9)}</g><rect x="276" y="150" width="34" height="40" fill="#8E959B"/>${Array.from({length:6},(_,i)=>`<path d="M${280+i*5} 152 v36" stroke="#6E757B" stroke-width="1.6"/>`).join("")}`;
      lamps.push([300,40,100]);
      bed = `<g transform="translate(160 258)"><rect x="-110" y="0" width="220" height="18" rx="3" fill="#3B3A36"/><rect x="-110" y="-10" width="220" height="14" rx="5" fill="#FBF8F1"/>${sleeperSVG(av, blanket, 196)}</g>`;
      break;
    case "sf":
      s += room3d({wall:"#E9D4DA", floor:"#B98A5A", floorKind:"planks", ceilCol:"#F4EEE2"});
      s += `<path d="M34 150 H326" stroke="#F4EEE2" stroke-width="5"/>${Array.from({length:12},(_,i)=>`<path d="M${40+i*24} 152 V196" stroke="#D9C2C8" stroke-width="2"/>`).join("")}`;
      s += `${win(96,30,60,120,"pane")}${win(156,24,64,132,"pane")}${win(220,30,60,120,"pane")}<path d="M96 30 L156 24 M220 24 L280 30 M96 150 L156 156 M220 156 L280 150" stroke="#F4EEE2" stroke-width="5"/>`; wins.push([156,24,64,132]);
      s += `<g class="fogd" style="--dur:24s"><rect x="96" y="40" width="184" height="40" fill="#FFF" opacity=".25"/></g>`; lamps.push([60,120,80]);
      s += `<g transform="translate(60 150)"><path d="M0 0 V40" stroke="#C9A050" stroke-width="2"/><path d="M-12 0 Q0 -16 12 0Z" fill="#F4C6CF"/></g>`;
      bed = `<g transform="translate(200 256)"><path d="M-100 -60 Q-100 -76 -84 -76 H84 Q100 -76 100 -60 V20 M-100 -60 V20" stroke="#F4EEE2" stroke-width="4" fill="none"/>${Array.from({length:8},(_,i)=>`<path d="M${-84+i*24} -76 V-6" stroke="#F4EEE2" stroke-width="2"/>`).join("")}<rect x="-98" y="0" width="196" height="20" rx="4" fill="#E8DCC4"/><rect x="-98" y="-10" width="196" height="14" rx="5" fill="#FBF8F1"/>${sleeperSVG(av, "#BFD8D1", 176)}</g>`;
      break;
    case "copenhagen":
      s += room3d({wall:"#F4F1EA", floor:"#D9C4A0", floorKind:"planks", ceilCol:"#FBFAF6"});
      s += `${win(46,30,150,130,"pane")}`; wins.push([46,30,150,130]);
      s += `<g transform="translate(270 0)"><path d="M0 0 V40" stroke="#2B2B2B"/><path d="M-22 54 Q0 32 22 54Z" fill="#F4EEE2"/><path d="M-16 62 Q0 46 16 62Z" fill="#E8DCC4"/><ellipse cy="64" rx="10" ry="3" fill="#F6D27A" class="glow"/></g>`; lamps.push([270,70,110]);
      s += `<g transform="translate(310 196)"><path d="M-12 0 h24 l-4 -20 h-16Z" fill="#E8DCC4"/>${canopy(0,-40,20,["#5E8A3C","#7FA35A"],rnd(7),8)}</g><g transform="translate(70 192)">${candleSVG(0,0,14)}${candleSVG(12,0,10)}</g>`; lamps.push([76,176,60]);
      bed = `<g transform="translate(190 256)"><rect x="-104" y="-56" width="208" height="58" rx="6" fill="#E8DCC4"/><rect x="-104" y="0" width="208" height="18" rx="4" fill="#C9A87A"/><rect x="-104" y="-10" width="208" height="14" rx="5" fill="#FBF8F1"/><path d="M60 -12 q20 -8 40 0 q-4 12 -40 6Z" fill="#F4F1EA" stroke="#E2D9C6"/>${sleeperSVG(av, "#BFC9D4", 186)}</g>`;
      break;
    case "delhi": default:
      s += room3d({wall:"#E8C9A0", floor:"#B5733F", floorKind:"tiles", ceilCol:"#D9A441"});
      s += `${win(210,40,100,130,"arch")}<g transform="translate(210 40)">${Array.from({length:5},(_,r)=>Array.from({length:6},(_,c)=>`<circle cx="${c*17+8}" cy="${r*17+60}" r="6" fill="none" stroke="#C98A5A" stroke-width="1.8" opacity=".75"/>`).join("")).join("")}</g>`; wins.push([210,40,100,130]);
      s += `<path d="M44 40 h140 v100 h-140Z" fill="#C2387A" opacity=".9"/>${["#F2C14E","#E07A3A","#7FA35A","#34476B","#F2C14E"].map((c,i)=>`<path d="M44 ${50+i*20} h140" stroke="${c}" stroke-width="4"/>`).join("")}<g transform="translate(60 186)"><path d="M-8 0 h16 l-4 -6 h-8Z" fill="#C9A050"/><ellipse class="flicker" cy="-9" rx="2.4" ry="4" fill="#F6B66A"/></g>`; lamps.push([60,176,80]);
      bed = `<g transform="translate(150 250)"><path d="M-100 -50 Q-100 -70 0 -76 Q100 -70 100 -50 V0 H-100Z" fill="#8C5A3C"/><rect x="-100" y="0" width="200" height="20" rx="4" fill="#6B4A32"/><rect x="-100" y="-10" width="200" height="14" rx="5" fill="#FBF8F1"/>${sleeperSVG(av, "#E07A3A", 180)}</g><path d="M40 288 h160" stroke="#C2387A" stroke-width="4" opacity=".6"/>`;
  }
  return {s, bed, lamps, wins};
}
