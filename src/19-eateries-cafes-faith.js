/* ---------- new eateries, study cafés, faith spaces ---------- */
const HAND = {
  slice:`<g transform="translate(14 -44) rotate(-30)"><path d="M0 0 L16 -6 L16 6Z" fill="#E8C690"/><path d="M2 0 L15 -4.6 L15 4.6Z" fill="#C9452E"/><circle cx="10" cy="-1" r="1.4" fill="#F2D27A"/><circle cx="12" cy="2" r="1.2" fill="#5E8A3C"/></g>`,
  wrap:`<g transform="translate(14 -46) rotate(-20)"><path d="M-4 6 L4 6 L8 -10 L-8 -10Z" fill="#F4EEE2" stroke="#C9B28E" stroke-width=".6"/><path d="M-8 -10 Q0 -18 8 -10" fill="#C98A4A"/><path d="M-6 -12 h12" stroke="#7FA35A" stroke-width="2"/><path d="M-5 -14 h10" stroke="#B8423A" stroke-width="1.6"/></g>`,
  bun:`<g transform="translate(14 -46)"><circle r="7" fill="#D9A45C"/><path d="M0 0 m-1 0 a1 1 0 1 1 2 0 a3 3 0 1 1 -6 0 a5 5 0 1 1 10 0" stroke="#A86E38" stroke-width="1.2" fill="none"/><path d="M-4 -5 q4 -2 8 0" stroke="#FBF7EE" stroke-width="1.4" fill="none"/></g>`,
  leaf:`<g transform="translate(14 -44)"><path d="M-8 -2 Q0 8 8 -2Z" fill="#7FA35A"/><circle cx="-3" cy="-4" r="3" fill="#E8B05A"/><circle cx="3" cy="-4" r="3" fill="#E8B05A"/><circle cx="0" cy="-7" r="3" fill="#E8B05A"/></g>`,
  matcha:`<g transform="translate(14 -48)"><path d="M-7 -6 h14 q0 9 -7 9 q-7 0 -7 -9Z" fill="#E8DCC4" stroke="#B9A88A" stroke-width=".6"/><ellipse cy="-6" rx="7" ry="1.8" fill="#8FB35A"/></g>`
};
function streetStall(ctx){
  let s = outdoorBase(ctx);
  s += `<path d="M110 74 L330 74 L346 104 L94 104Z" fill="#E07A3A"/>${Array.from({length:8},(_,i)=>`<path d="M${110+i*28} 74 L${104+i*30} 104" stroke="#F2C14E" stroke-width="7"/>`).join("")}<path d="M94 104 Q120 112 140 104 Q160 112 180 104 Q200 112 220 104 Q240 112 260 104 Q280 112 300 104 Q320 112 346 104" fill="#E07A3A"/>`;
  s += `<path d="M104 104 V250 M336 104 V250" stroke="#6B4A32" stroke-width="4"/>${Array.from({length:10},(_,i)=>`<circle cx="${110+i*24}" cy="${110+(i%2)*3}" r="4" fill="#F2A12E"/>`).join("")}`;
  s += `<path d="M118 120 Q220 132 322 120" stroke="#3B3A36" stroke-width=".6" fill="none"/>${Array.from({length:7},(_,i)=>`<circle cx="${128+i*30}" cy="${124+Math.sin(i)*2}" r="2.6" fill="#FFE7B0" class="glow"/>`).join("")}`;
  const vendor = withLook(localAvatar("delhi",21), {top:"shirt", topc:"#F4EEE2", bottom:"trousers", botc:"#8C6A4E"});
  s += `<g transform="translate(250 214) scale(.92)">${figureSVG(vendor,"stand",false,"stir")}</g>`;
  s += `<rect x="120" y="190" width="210" height="16" rx="3" fill="#B8BEC3"/><rect x="126" y="206" width="198" height="62" fill="#3F6B8F"/><path d="M126 222 H324" stroke="#F2C14E" stroke-width="3"/><circle cx="150" cy="276" r="10" fill="#3B3A36"/><circle cx="300" cy="276" r="10" fill="#3B3A36"/>`;
  s += [150,196,286].map((x,i)=>`<g transform="translate(${x} 190)"><path d="M-16 0 Q-18 -24 0 -26 Q18 -24 16 0Z" fill="#D7DCE0" stroke="#9AA6AC"/><ellipse cy="-24" rx="14" ry="3.4" fill="#C9D1D6"/><path class="steam" d="M-4 -30 q3 -5 0 -10 M4 -30 q3 -5 0 -10" stroke="#FFF" stroke-width="1.2" fill="none"/></g>`).join("") + `<g transform="translate(240 186)">${Array.from({length:5},(_,i)=>`<circle cx="${(i%3)*7-7}" cy="${-Math.floor(i/3)*6}" r="4" fill="#E8B05A"/>`).join("")}</g>`;
  s += `<rect x="190" y="132" width="70" height="20" rx="3" fill="#FBF3DC" stroke="#B8423A"/><text x="225" y="146" text-anchor="middle" font-size="10" font-weight="700" fill="#B8423A" font-family="Instrument Sans, sans-serif" letter-spacing="2">CHAAT</text>`;
  s += rotating([`<g transform="translate(340 238) scale(-.7 .7)">${figureSVG(localAvatar("delhi",22),"stand",false,"eat")}</g>`, `<g transform="translate(340 238) scale(-.7 .7)">${figureSVG(localAvatar("delhi",23),"stand",false,"phone")}</g>`, `<g transform="translate(340 238) scale(-.7 .7)">${figureSVG(localAvatar("delhi",24),"stand",false,"sip")}</g>`], 27, 3);
  return {s, fx:96, fy:234, sc:1.06, pose:"stand", hand:"leaf", lamps:[[220,124,120]], wins:[], outdoor:true};
}
function pizzeria(ctx){
  let s = room3d({wall:"#F4F1EA", floor:"#B5562C", floorKind:"tiles", ceilCol:"#EFEBE2"});
  s += `<rect x="34" y="120" width="292" height="76" fill="#3F6B4A"/>${Array.from({length:24},(_,i)=>`<path d="M${34+i*12} 120 v76" stroke="#355A3E" stroke-width="1"/>`).join("")}<rect x="34" y="114" width="292" height="6" fill="#C9372C"/>`;
  s += `<g class="neon"><rect x="120" y="24" width="120" height="34" rx="17" fill="none" stroke="#E0567A" stroke-width="2.6"/><text x="180" y="47" text-anchor="middle" font-size="16" font-weight="700" fill="#FFB0C4" font-family="Instrument Sans, sans-serif" letter-spacing="4">PIZZA</text></g>`;
  s += `<path d="M236 196 V110 a50 50 0 0 1 100 0 V196Z" fill="#B5562C"/><path d="M252 196 V118 a34 34 0 0 1 68 0 V196Z" fill="#2B1A12"/><g class="flicker"><path d="M262 196 q8 -30 22 -8 q6 -18 16 8Z" fill="#F2A65A"/></g>`;
  s += windowView(ctx.place, ctx.w, ctx.season, ctx.phase, 40, 26, 70, 84, ctx.uid+"pw", "arch");
  const pz = withLook(localAvatar("rome",6), {top:"tshirt", topc:"#FBF7EE", bottom:"trousers", botc:"#2B2B2B", head:"cap"});
  s += `<g transform="translate(212 206) scale(.82)">${figureSVG(pz,"stand",false,"stir")}</g>`;
  const front = `<rect x="150" y="196" width="190" height="80" fill="#C9C1B0"/><rect x="146" y="186" width="198" height="10" rx="3" fill="#EFE9DE"/><rect x="152" y="160" width="186" height="28" fill="#DCEBF2" opacity=".45" stroke="#B9C5CA"/>${[0,1,2,3,4].map(i=>`<rect x="${158+i*36}" y="174" width="32" height="12" rx="2" fill="#E8C690"/><rect x="${160+i*36}" y="175" width="28" height="9" fill="${["#C9452E","#F2D27A","#7FA35A","#C9452E","#E8D8B0"][i]}"/>`).join("")}`;
  s += bustle("rome", 212, 2) + streetCrowd("rome", 40, 26, 70, 84, ctx.uid+"pz", 3);
  return {s, front, fx:100, fy:234, sc:1.1, pose:"stand", hand:"slice", lamps:[[180,40,100],[286,170,90]], wins:[[40,26,70,84]]};
}
function souvlaki(ctx){
  let s = room3d({wall:"#F7F4EC", floor:"#D9CDB4", floorKind:"tiles", ceilCol:"#2F6FA8"});
  s += windowView(ctx.place, ctx.w, ctx.season, ctx.phase, 40, 30, 130, 120, ctx.uid+"sw", "pane") + `<rect x="40" y="30" width="130" height="120" fill="none" stroke="#2F6FA8" stroke-width="6"/>`;
  s += `<rect x="190" y="30" width="130" height="40" rx="3" fill="#2B2B2B"/><text x="255" y="48" text-anchor="middle" font-size="10" fill="#F4EEE2" font-family="Instrument Sans, sans-serif" letter-spacing="1.5">SOUVLAKI · GYROS</text><path d="M200 58 h80 M200 64 h60" stroke="#F4EEE2" stroke-width="1" opacity=".6"/>`;
  s += `<g transform="translate(286 150)"><rect x="18" y="-70" width="10" height="100" fill="#3B3A36"/><rect x="22" y="-70" width="6" height="100" fill="#E8973A" opacity=".5" class="glow"/><path d="M0 -76 V40" stroke="#9AA6AC" stroke-width="2"/><g><path d="M-12 -60 Q-16 -10 -10 30 L10 30 Q16 -10 12 -60Z" fill="#9A5A2E"/>${Array.from({length:8},(_,i)=>`<path d="M-13 ${-52+i*11} Q0 ${-48+i*11} 13 ${-52+i*11}" stroke="#7A4220" stroke-width="2" fill="none"/>`).join("")}<animateTransform attributeName="transform" type="scale" values="1 1;-1 1;1 1" dur="3s" repeatCount="indefinite"/></g></g>`;
  const cook = withLook(localAvatar("athens",6), {top:"tshirt", topc:"#2F6FA8", bottom:"trousers", botc:"#2B2B2B"});
  s += `<g transform="translate(236 212) scale(.84)">${figureSVG(cook,"stand",false,"stir")}</g><rect x="190" y="190" width="150" height="10" rx="3" fill="#C9C1B0"/><rect x="194" y="200" width="142" height="80" fill="#2F6FA8"/>${[0,1,2,3].map(i=>`<g transform="translate(${210+i*30} 186)"><path d="M-8 0 h16 l3 -12 h-22Z" fill="#F4EEE2" stroke="#C9B28E" stroke-width=".6"/></g>`).join("")}`;
  s += seatP("athens",23,70,252,.7,"eat");
  return {s, fx:126, fy:254, sc:1.08, pose:"bench", hand:"wrap", table:{col:"#2F6FA8", top:"#F4EEE2"}, chair:"#2F6FA8", lamps:[[110,24,90],[260,26,90]], wins:[[40,30,130,120]]};
}
function matchaBar(ctx){
  let s = room3d({wall:"#EFE8DA", floor:"#D9C9A8", floorKind:"planks", ceilCol:"#F7F2E8"});
  s += Array.from({length:14},(_,i)=>`<rect x="${200+i*9}" y="20" width="6" height="176" fill="#D2BE9A"/>`).join("");
  s += windowView(ctx.place, ctx.w, ctx.season, ctx.phase, 40, 26, 146, 140, ctx.uid+"mw", "pane");
  s += `<g transform="translate(272 40)"><circle r="22" fill="none" stroke="#5E8A3C" stroke-width="3"/><text y="5" text-anchor="middle" font-size="13" fill="#5E8A3C" font-family="Young Serif, Georgia, serif">抹茶</text></g><text x="272" y="82" text-anchor="middle" font-size="9" fill="#5E8A3C" font-family="Instrument Sans, sans-serif" letter-spacing="3">MATCHA</text>`;
  const barista = withLook(localAvatar("sf",24), {top:"tshirt", topc:"#5E8A3C", bottom:"trousers", botc:"#3B3A36"});
  s += `<g transform="translate(270 200) scale(.8)">${figureSVG(barista,"stand",false,"stir")}</g>`;
  s += `<g transform="translate(330 196)"><path d="M-12 0 h24 l-4 -22 h-16Z" fill="#E8DCC4"/>${canopy(0,-46,22,["#5E8A3C","#7FA35A","#4F7A3A"],rnd(6),9)}</g>`;
  const front = `<rect x="20" y="206" width="320" height="10" rx="4" fill="#C9A87A"/><rect x="24" y="216" width="312" height="70" fill="#E8DCC4"/>${Array.from({length:20},(_,i)=>`<path d="M${30+i*16} 216 v70" stroke="#DCCDAE" stroke-width="2"/>`).join("")}<g transform="translate(260 204)"><path d="M-12 -10 h24 q0 12 -12 12 q-12 0 -12 -12Z" fill="#FBF7EE" stroke="#B9A88A"/><ellipse cy="-10" rx="12" ry="3" fill="#8FB35A"/><g class="whisk"><path d="M2 -40 V-14" stroke="#C9A87A" stroke-width="2"/><path d="M-3 -14 Q2 -4 7 -14" stroke="#E8DCC4" stroke-width="3" fill="none"/></g></g>`;
  s += streetCrowd("sf", 40, 26, 146, 140, ctx.uid+"mt", 4) + bustle("sf", 212, 1);
  return {s, front, fx:150, fy:254, sc:1.1, pose:"bench", sip:"matcha", stool:true, lamps:[[120,20,90],[240,20,90]], wins:[[40,26,146,140]]};
}
const NEW_RESTO = {delhi:streetStall, rome:pizzeria, athens:souvlaki, sf:matchaBar};
Object.assign(RESTO, {delhi:{name:"a chaat stall", dish:"thali", tool:"none"}, rome:{name:"a pizzeria", dish:"pizza", tool:"fork"}, athens:{name:"a souvlaki shop", dish:"salad", tool:"fork"}, sf:{name:"a matcha bar", dish:"chowder", tool:"fork"}, copenhagen:{name:"a bakery", dish:"smorrebrod", tool:"fork"}});
/* sleek cultural cafés for study */
function studyCafe(city, ctx){
  const win = (x,y,wd,ht,kind) => windowView(ctx.place, ctx.w, ctx.season, ctx.phase, x, y, wd, ht, ctx.uid+"c"+x, kind);
  switch(city){
    case "paris": { let s = room3d({wall:"#E6DCC6", floor:"#EFE6D2", floorKind:"check", ceilCol:"#D9CBAE"}) + win(40,24,130,110,"pane") + `<rect x="190" y="24" width="130" height="110" fill="#C9D3D6" opacity=".6"/><rect x="190" y="24" width="130" height="110" fill="none" stroke="#C9A050" stroke-width="3"/><path d="M34 140 H326" stroke="#C9A050" stroke-width="3"/><rect x="34" y="144" width="292" height="40" rx="8" fill="#3F5A4A"/>${[60,300].map((x,i)=>seatP("paris",30+i,x,214,.62,i?"sip":"book")).join("")}${smallTable(84,192,34,"#EFEBE2")}${smallTable(276,192,34,"#EFEBE2")}` + walkerP(withLook(localAvatar("paris",6),{top:"shirt",topc:"#FBF7EE",bottom:"trousers",botc:"#1E1E22",neck:"bowtie"}),214,.66,"tray",15,130,5);
      return {s, desk:"#EFEBE2", arms:"write", item:"coffee", round:true, lamps:[[110,20,90],[250,20,90]], wins:[[40,24,130,110]], label:"a literary café"}; }
    case "rome": { let s = room3d({wall:"#EFE6D2", floor:"#C9B89A", floorKind:"tiles", ceilCol:"#E8DCC4"}) + win(40,30,110,120,"arch") + `<rect x="180" y="40" width="80" height="60" fill="#E07A3A"/><circle cx="210" cy="78" r="9" fill="none" stroke="#2B2B2B" stroke-width="2.4"/><circle cx="236" cy="78" r="9" fill="none" stroke="#2B2B2B" stroke-width="2.4"/><path d="M210 78 L222 64 L236 78 M222 64 h8" stroke="#2B2B2B" stroke-width="2" fill="none"/><rect x="180" y="40" width="80" height="60" fill="none" stroke="#C9A050" stroke-width="3"/>`;
      s += `<rect x="180" y="150" width="146" height="46" fill="#5A3A28"/><rect x="176" y="144" width="154" height="8" rx="2" fill="#EFEBE2"/><g transform="translate(286 144)"><rect x="-26" y="-34" width="52" height="34" rx="4" fill="#C9C9C9"/><rect x="-22" y="-30" width="44" height="12" rx="2" fill="#9AA6AC"/>${[-14,0,14].map(x=>`<path d="M${x} -18 v8" stroke="#3B3A36" stroke-width="2"/>`).join("")}<path class="steam" d="M-22 -36 q3 -6 0 -12" stroke="#FFF" stroke-width="1.6" fill="none"/></g>` + `<g transform="translate(250 150) scale(.7)">${figureSVG(withLook(localAvatar("rome",31),{top:"shirt",topc:"#FBF7EE",neck:"bowtie"}),"stand",false,"stir")}</g>`;
      return {s, desk:"#EFEBE2", item:"coffee", round:true, lamps:[[110,24,90],[250,24,90]], wins:[[40,30,110,120]], label:"an espresso bar"}; }
    case "copenhagen": { let s = room3d({wall:"#F4F1EA", floor:"#E2D2B0", floorKind:"planks", ceilCol:"#FBFAF6"}) + win(40,24,170,140,"pane") + [250,310].map(x=>`<g transform="translate(${x} 0)"><path d="M0 0 V36" stroke="#2B2B2B"/><path d="M-20 50 Q0 30 20 50Z" fill="#F4EEE2"/><path d="M-14 58 Q0 44 14 58Z" fill="#E8DCC4"/></g>`).join("") + `<g transform="translate(300 196)"><path d="M-12 0 h24 l-4 -22 h-16Z" fill="#E8DCC4"/>${canopy(0,-44,20,["#5E8A3C","#7FA35A"],rnd(9),8)}</g>` + seatP("copenhagen",32,250,234,.62,"laptop") + smallTable(272,212,40,"#E8DCC4") + candleSVG(272,212,8);
      return {s, desk:"#E8DCC4", item:"coffee", chair:"wishbone", lamps:[[250,50,90],[310,50,90]], wins:[[40,24,170,140]], label:"a Danish design café"}; }
    case "delhi": { let s = room3d({wall:"#EFE6D2", floor:"#C9B89A", floorKind:"tiles", ceilCol:"#E8DCC4"}) + win(40,30,90,140,"arch") + win(230,30,90,140,"arch") + `<g transform="translate(180 16)"><circle r="4" fill="#5A4030"/><g class="spinslow" style="animation-duration:1.6s">${[0,120,240].map(a=>`<ellipse rx="34" ry="5" transform="rotate(${a})" fill="#8C6A4E"/>`).join("")}</g></g>` + seatP("delhi",33,70,236,.6,"book") + smallTable(92,214,40,"#FBF7EE","#FBF7EE") + walkerP(withLook(localAvatar("delhi",34),{top:"shirt",topc:"#FBF7EE",bottom:"trousers",botc:"#FBF7EE"}),214,.62,"tray",17,130,7);
      return {s, desk:"#FBF7EE", item:"chai", cloth:true, lamps:[[180,30,110]], wins:[[40,30,90,140],[230,30,90,140]], label:"an old coffee house"}; }
  }
  return null;
}
/* faith spaces modelled on each city's main religion */
function faithSpace(city, ctx){
  switch(city){
    case "beijing": { let s = room3d({wall:"#7A2A22", side:"#6A241E", floor:"#6E5E50", floorKind:"tiles", ceilCol:"#2F6B6A"});
      s += `${[52,308].map(x=>`<rect x="${x-10}" y="14" width="20" height="182" fill="#B8423A"/><path d="M${x-10} 60 h20 M${x-10} 140 h20" stroke="#D9A441" stroke-width="3"/>`).join("")}<rect x="34" y="14" width="292" height="10" fill="#D9A441"/>`;
      s += `<g transform="translate(180 0)"><path d="M-70 196 V70 Q0 30 70 70 V196Z" fill="#4A1A16"/><circle cy="96" r="44" fill="#F2C14E" opacity=".25" class="glow"/><circle cy="96" r="30" fill="none" stroke="#D9A441" stroke-width="3"/><circle cy="92" r="11" fill="#D9A441"/><path d="M-6 82 q6 -8 12 0" fill="#C9902E"/><path d="M-22 150 Q-24 108 0 104 Q24 108 22 150Z" fill="#D9A441"/><path d="M-30 150 Q0 132 30 150 Q0 166 -30 150Z" fill="#C9902E"/><path d="M-40 168 Q0 148 40 168 L36 178 H-36Z" fill="#E8A0A8"/>${[-34,-24,-14,14,24,34].map(x=>`<path d="M${x} 160 q4 -8 8 0" fill="#F4C6CF"/>`).join("")}</g>`;
      s += [90,270].map(x=>`<g transform="translate(${x} 40)"><rect x="-14" y="0" width="28" height="90" fill="${x<180?"#34476B":"#5E8A3C"}"/><rect x="-14" y="0" width="28" height="90" fill="none" stroke="#D9A441" stroke-width="2"/><circle cy="40" r="8" fill="#D9A441" opacity=".7"/></g>`).join("");
      s += `<g transform="translate(180 192)">${Array.from({length:9},(_,i)=>`<g transform="translate(${(i-4)*14} 0)"><path d="M-4 0 h8 l-1 5 h-6Z" fill="#D9A441"/><ellipse class="flicker" style="animation-delay:-${i*.3}s" cy="-3" rx="1.6" ry="2.6" fill="#F6B66A"/></g>`).join("")}</g>${incense(70,226)}${incense(290,226)}`;
      return {s, pose:"cross", cushion:"#D9A441", lamps:[[180,96,120],[180,190,110]], wins:[], label:"a Buddhist temple hall"}; }
    case "athens": { let s = room3d({wall:"#C9A050", side:"#B58E40", floor:"#C9B89A", floorKind:"tiles", ceilCol:"#2F4A6B"});
      s += `<rect x="34" y="40" width="292" height="156" fill="#8E5E28"/>${[56,104,152,208,256,304].map((x,i)=>`<g transform="translate(${x} 0)"><path d="M-20 186 V82 a20 20 0 0 1 40 0 V186Z" fill="${i===2||i===3?"#5A3A1E":"#E8C25A"}"/>${i===2||i===3?"":`<circle cy="96" r="12" fill="#F6D27A" opacity=".85"/><rect x="-12" y="110" width="24" height="54" rx="3" fill="${["#34476B","#8E2F28","#34476B","","#8E2F28","#34476B"][i]}"/>`}</g>`).join("")}<path d="M152 186 V96 Q180 70 208 96 V186" fill="#3A2412"/><circle cx="180" cy="128" r="14" fill="#D9A441" opacity=".6"/>`;
      s += [110,250].map(x=>`<g transform="translate(${x} 0)"><path d="M0 0 V36" stroke="#8E6A2C"/><ellipse cy="44" rx="34" ry="7" fill="none" stroke="#D9A441" stroke-width="2.4"/>${[-28,-14,0,14,28].map(dx=>candleSVG(dx,42,6)).join("")}</g>`).join("");
      s += `<g transform="translate(318 214)"><rect x="-22" y="0" width="44" height="14" fill="#C9A050"/><rect x="-20" y="-2" width="40" height="4" fill="#E8D8B0"/>${[-14,-8,-2,4,10,16].map(x=>candleSVG(x,-2,16)).join("")}</g>`;
      return {s, pose:"bench", benchCol:"#6B4A32", lamps:[[110,44,100],[250,44,100],[318,196,70]], wins:[], label:"a Greek Orthodox church"}; }
    case "delhi": { let s = room3d({wall:"#E8C9A0", side:"#D9B88E", floor:"#C9B89A", floorKind:"tiles", ceilCol:"#C98A5A"});
      s += [56,304].map(x=>`<rect x="${x-12}" y="20" width="24" height="176" fill="#D9A06A"/>${[40,80,120,160].map(y=>`<path d="M${x-12} ${y} h24" stroke="#B57A4A" stroke-width="3"/><circle cx="${x}" cy="${y+10}" r="4" fill="#B57A4A"/>`).join("")}`).join("");
      s += `<g transform="translate(180 0)"><path d="M-60 196 V110 L-46 80 L-30 62 L0 30 L30 62 L46 80 L60 110 V196Z" fill="#C98A5A"/>${[70,90,110].map(y=>`<path d="M${-54+(y-70)/4} ${y} H${54-(y-70)/4}" stroke="#B57A4A" stroke-width="2"/>`).join("")}<path d="M-30 196 V140 a30 30 0 0 1 60 0 V196Z" fill="#3A1E12"/><circle cy="160" r="40" fill="#F6B66A" opacity=".3" class="glow"/><path d="M-30 140 Q0 158 30 140" stroke="#F2A12E" stroke-width="5" fill="none"/>${Array.from({length:7},(_,i)=>`<circle cx="${-30+i*10}" cy="${142+Math.sin(i/6*Math.PI)*16}" r="3.4" fill="${i%2?"#F2A12E":"#E0562A"}"/>`).join("")}</g>`;
      s += `<g transform="translate(120 20)"><g class="swing"><path d="M0 0 V30" stroke="#8E6A2C" stroke-width="1.4"/><path d="M-8 44 Q-8 30 0 30 Q8 30 8 44Z" fill="#C9A050"/></g></g>`;
      s += `<g transform="translate(180 258)">${[18,12,6].map((r,i)=>`<circle r="${r*2.4}" fill="none" stroke="${["#E0562A","#F2C14E","#7FA35A"][i]}" stroke-width="5" transform="scale(1 .3)"/>`).join("")}</g>`;
      s += Array.from({length:10},(_,i)=>`<g transform="translate(${70+i*24} 200)"><path d="M-5 0 q5 5 10 0Z" fill="#B57A3A"/><ellipse class="flicker" style="animation-delay:-${i*.27}s" cy="-3" rx="1.6" ry="3" fill="#F6B66A"/></g>`).join("");
      return {s, pose:"cross", cushion:"#C2387A", lamps:[[180,160,130],[180,200,120]], wins:[], label:"a Hindu temple"}; }
  }
  return null;
}
