/* ---------- living crowds ---------- */
function rotating(list, dur, begin){
  const n = list.length;
  if (motionOff() || n < 2) return list[0] || "";
  return list.map((g,i) => {
    const st = i/n, en = (i+1)/n, f = .035;
    let kt, vals;
    if (i===0) { kt = [0, f, en-f, en, 1]; vals = [0,1,1,0,0]; }
    else if (i===n-1) { kt = [0, st, st+f, 1-f, 1]; vals = [0,0,1,1,0]; }
    else { kt = [0, st, st+f, en-f, en, 1]; vals = [0,0,1,1,0,0]; }
    return `<g opacity="${i===0?1:0}"><animate attributeName="opacity" values="${vals.join(";")}" keyTimes="${kt.map(v=>v.toFixed(3)).join(";")}" dur="${dur}s" begin="-${begin||0}s" repeatCount="indefinite"/>${g}</g>`;
  }).join("");
}
const seatRot = (city, k, x, y, s, arms) => rotating([seatP(city,k,x,y,s,arms||"eat"), seatP(city,k+41,x,y,s,"talk"), seatP(city,k+83,x,y,s,"sip")], 36, (k%7)*5);
function bustle(city, y, n){
  let s = "";
  const arms = ["walkarms","phone","tray","walkarms"];
  for (let i=0;i<(n||2);i++) s += walkerP(withLook(localAvatar(city,50+i*7),{}), y||212, .6 - i*.04, arms[i%4], 18 + i*7, 150, i*5);
  return s;
}
function streetCrowd(city, x0, y0, w, h, uid, n){
  let s = `<defs><clipPath id="sc${uid}"><rect x="${x0}" y="${y0}" width="${w}" height="${h}"/></clipPath></defs><g clip-path="url(#sc${uid})">`;
  const R = rnd(city.length*31+7);
  for (let i=0;i<n;i++){
    const right = i%2===0, dur = 9 + R()*9, sc = .38 + R()*.12, y = y0 + h - 4 - R()*8;
    const av = withLook(localAvatar(city, 60+i), {});
    s += `<g class="walkacross" style="--dx:${right ? w+80 : -(w+80)}px;--dur:${dur.toFixed(1)}s;--del:-${(R()*dur).toFixed(1)}s"><g transform="translate(${right ? x0-30 : x0+w+30} ${y.toFixed(0)}) scale(${right?sc:-sc} ${sc})">${figureSVG(av,"stand",false,["walkarms","phone","walkarms","sip"][i%4],"walk")}</g></g>`;
  }
  return s + `</g>`;
}
const MORSEL = {beijing:"#B5562C", tokyo:"#F08A5A", paris:"#7A3E2A", nyc:"#F4E2B8", london:"#D9A45C", rome:"#E8C690", athens:"#C98A4A", sf:"#C98A4A", copenhagen:"#D9A45C", delhi:"#E8B05A"};
function petEating(petKind, acc, city, x, y){
  const munch = motionOff() ? "" : `<animateTransform attributeName="transform" type="translate" values="0 0;-2 2;0 0" dur=".7s" repeatCount="indefinite"/>`;
  const food = MORSEL[city] || "#D9A45C";
  return `<g transform="translate(${x} ${y}) scale(.74)"><g>${munch}${petSVG(petKind, false, acc)}</g><g transform="translate(-44 10)"><ellipse rx="14" ry="5" fill="#FBF8F1" stroke="#D9CFBC"/><circle cx="-4" cy="-2" r="3.4" fill="${food}"/><circle cx="3" cy="-2.6" r="3" fill="${food}"/><circle cx="0" cy="-5" r="2.4" fill="${shade(food,.2)}"/></g></g>`;
}
const RESTO_LAMPS = {
  beijing:[[176,44,90],[346,44,90],[180,200,90]], tokyo:[[40,150,80],[320,150,80],[180,90,130]], paris:[[50,30,70],[136,30,70],[224,30,70],[310,30,70],[180,200,90]],
  nyc:[[180,196,70],[318,186,50],[110,44,80],[20,96,40],[176,96,40]], london:[[70,56,90],[180,56,90],[300,110,70]]
};
const RESTO_WINS = {beijing:[[20,34,130,110]], tokyo:[[24,24,120,82]], paris:[[18,18,140,104]], nyc:[[196,20,150,150]], london:[[16,18,130,96]]};
/* storybook bakery for Copenhagen */
function bakery(ctx){
  const {uid} = ctx;
  let s = room3d({wall:"#F0DDB8", floor:"#B98A5A", floorKind:"planks", ceilCol:"#8C5A3C", ceil:22});
  s += [70,150,230,310].map(x=>`<rect x="${x-6}" y="0" width="12" height="26" fill="#6B4A32"/>`).join("") + `<rect x="0" y="22" width="360" height="8" fill="#6B4A32"/>`;
  s += [[60,"#C98A5A"],[90,"#B57A4A"],[120,"#C98A5A"]].map(([x,c])=>`<g transform="translate(${x} 30)"><g class="swing"><path d="M0 0 V10" stroke="#3B3A36"/><path d="M-8 10 h16 v6 q-8 6 -16 0Z" fill="${c}"/><path d="M-10 13 h-6" stroke="#3B3A36" stroke-width="2"/></g></g>`).join("") + `<g transform="translate(160 30)">${[0,8,16].map(dx=>`<path d="M${dx} 0 q-3 14 2 20 M${dx} 0 q4 12 1 18" stroke="#7FA35A" stroke-width="2" fill="none"/>`).join("")}</g>`;
  s += windowView(ctx.place, ctx.w, ctx.season, ctx.phase, 44, 44, 110, 104, uid+"bk", "pane") + `<rect x="44" y="44" width="110" height="104" fill="none" stroke="#5A4030" stroke-width="6"/><path d="M99 44 V148 M44 96 H154" stroke="#5A4030" stroke-width="3"/>`;
  s += streetCrowd("copenhagen", 44, 44, 110, 104, uid+"b", 4);
  s += `<rect x="40" y="148" width="118" height="12" fill="#8C5A3C"/>${[56,82,108,134].map((x,i)=>`<g transform="translate(${x} 148)"><path d="M-7 0 h14 l-2 -8 h-10Z" fill="#C2552A"/><circle cy="-12" r="5" fill="#E0567A"/><circle cx="-5" cy="-10" r="3.4" fill="#5E8A3C"/><circle cx="5" cy="-10" r="3.4" fill="#5E8A3C"/></g>`).join("")}`;
  s += `<g transform="translate(100 66)"><g class="swing"><path d="M0 -20 V-8" stroke="#3B3A36"/><path d="M-14 8 Q-16 -8 -6 -6 Q0 4 6 -6 Q16 -8 14 8 Q8 16 0 6 Q-8 16 -14 8Z" fill="none" stroke="#D9A441" stroke-width="5"/></g></g>`;
  s += `<path d="M262 196 V112 a42 42 0 0 1 84 0 V196Z" fill="#A85C3A"/>${Array.from({length:8},(_,i)=>`<path d="M262 ${120+i*10} h84" stroke="#8E4A2C" stroke-width=".8"/>`).join("")}<path d="M276 196 V122 a28 28 0 0 1 56 0 V196Z" fill="#2B1A12"/><g class="flicker"><path d="M286 196 q8 -26 20 -6 q6 -14 14 6Z" fill="#F2A65A"/></g><circle cx="304" cy="176" r="40" fill="#F6B66A" opacity=".2" class="glow"/>`;
  const baker = withLook(localAvatar("copenhagen",25), {top:"shirt", topc:"#FBF7EE", bottom:"skirt", botc:"#C2552A", head:"headband"});
  s += `<g transform="translate(250 204) scale(.82)">${figureSVG(baker,"stand",false,"stir")}</g>`;
  s += [64,96,128].map((y,r)=>`<rect x="176" y="${y}" width="76" height="4" fill="#6B4A32"/>${Array.from({length:3},(_,k)=>rotating([r===0?`<ellipse cx="${190+k*24}" cy="${y-7}" rx="10" ry="6" fill="#8A5A3A"/><path d="M${183+k*24} ${y-9} h14" stroke="#A87A54" stroke-width="1.4"/>`:r===1?`<ellipse cx="${190+k*24}" cy="${y-7}" rx="10" ry="6" fill="#D9A45C"/><path d="M${182+k*24} ${y-9} q8 -4 16 0" stroke="#F4E2B8" stroke-width="1.4" fill="none"/>`:`<path d="M${180+k*24} ${y-1} q10 -14 20 0Z" fill="#C98A4A"/>`, ""], 14 + k*3 + r*2, k*2+r)).join("")}`).join("");
  s += `<rect x="176" y="34" width="76" height="22" rx="3" fill="#2B2B2B"/><text x="214" y="49" text-anchor="middle" font-size="11" fill="#F4EEE2" font-family="Young Serif, Georgia, serif">Bageri</text>`;
  s += [0,1,2,3,4,5].map(i=>`<g transform="translate(${70+i*14} ${80+i*12})"><g class="float" style="animation-delay:-${i*.9}s"><circle r="1" fill="#FFF" opacity=".8"/></g></g>`).join("");
  s += walkerP(withLook(localAvatar("copenhagen",70),{}), 214, .62, "shopper"==="x"?"walkarms":"walkarms", 16, 150, 0) + walkerP(withLook(localAvatar("copenhagen",71),{}), 212, .56, "phone", 22, 150, 9);
  s += `<g transform="translate(24 120)"><g class="swing"><path d="M0 0 V8" stroke="#3B3A36"/><path d="M-6 14 Q0 2 6 14Z" fill="#D9A441"/></g></g>`;
  const front = `<rect x="150" y="188" width="196" height="96" fill="#C9935F"/><path d="M150 210 H346 M150 240 H346" stroke="#B5824F" stroke-width="2"/><rect x="146" y="184" width="204" height="8" rx="3" fill="#8C5A3C"/><rect x="154" y="152" width="188" height="34" fill="#F4E8D0" opacity=".35" stroke="#C9B28E"/>${Array.from({length:6},(_,k)=>`<g transform="translate(${170+k*30} 176)"><circle r="9" fill="#D9A45C"/><path d="M0 0 m-1 0 a1 1 0 1 1 2 0 a3 3 0 1 1 -6 0 a5 5 0 1 1 10 0" stroke="#A86E38" stroke-width="1.2" fill="none"/><path d="M-5 -6 q5 -2 10 0" stroke="#FBF7EE" stroke-width="1.6" fill="none"/><path class="steam" style="animation-delay:-${k*.4}s" d="M0 -10 q3 -5 0 -10" stroke="#FFF" stroke-width="1" fill="none"/></g>`).join("")}`;
  return {s, front, fx:98, fy:234, sc:1.1, pose:"stand", hand:"bun", lamps:[[100,40,110],[214,30,90],[304,170,120]], wins:[[44,44,110,104]]};
}
NEW_RESTO.copenhagen = bakery;
/* lively gyros shop */
const _souvlaki = souvlaki;
NEW_RESTO.athens = function(ctx){
  const r = _souvlaki(ctx), uid = ctx.uid;
  r.s += streetCrowd("athens", 40, 30, 130, 120, uid+"g", 7);
  r.s += rotating([`<g transform="translate(316 214) scale(-.78 .78)">${figureSVG(withLook(localAvatar("athens",80),{}),"stand",false,"talk")}</g>`, `<g transform="translate(316 214) scale(-.78 .78)">${figureSVG(withLook(localAvatar("athens",81),{}),"stand",false,"phone")}</g>`, `<g transform="translate(316 214) scale(-.78 .78)">${figureSVG(withLook(localAvatar("athens",82),{}),"stand",false,"walkarms")}</g>`], 24, 2);
  r.s += bustle("athens", 214, 2);
  r.s = r.s.replace(seatP("athens",23,70,252,.7,"eat"), seatRot("athens",23,70,252,.7,"eat"));
  r.lamps = [[110,24,90],[260,26,90],[300,90,90]];
  return r;
};
