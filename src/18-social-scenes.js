/* ---------- connection: socialising ---------- */
const SOCIAL_VERB = {picnic:"having a picnic with friends", coffee:"catching up over coffee", cinema:"at the cinema with a friend", date:"on a candlelit date"};
const CHAT = {
  picnic:["Pass the snacks!","This view though…","Best day."], coffee:["How was your week?","You won’t believe it!","Same time next week?"],
  date:["Cheers to us.","I love this place.","Tell me everything."]
};
function socialScene(kind, p, d, opts, ctx){
  const {w, season, place, phase, av, petKind, shown, uid} = ctx, acc = accOf(shown), city = cityOf(place);
  const label = opts.label || `${name(p)} ${SOCIAL_VERB[kind]} in ${PLACES[place].city}.`;
  const pcs = p==="a" ? "var(--a-soft)" : "var(--b-soft)", pc = p==="a" ? "var(--a)" : "var(--b)";
  const friend = localAvatar(city, 120), friend2 = localAvatar(city, 121);
  let body = "", o = {};
  const talkBubbles = (lines, xs, y) => lines.slice(0,2).map((t,i)=>bubble(xs[i], y - i*26, t, i?"bubbleB":"bubbleA", i===1)).join("");
  if (kind==="picnic") {
    body += outdoorBase(ctx) + weatherTint(w,360,300);
    body += `<defs><pattern id="sp${uid}" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="var(--window)"/><rect width="20" height="7" fill="${pcs}" opacity=".65"/><rect width="7" height="20" fill="${pcs}" opacity=".65"/></pattern></defs><polygon points="70,206 290,206 340,292 20,292" fill="#000" opacity=".1" transform="translate(4 4)"/><polygon points="70,206 290,206 340,292 20,292" fill="url(#sp${uid})" stroke="var(--line)"/>`;
    body += `<g transform="translate(110 290) scale(1.08)"><g class="hero-fig">${figureSVG(av,"cross",false,"talk")}</g></g>`;
    body += `<g transform="translate(250 290) scale(-1 1)">${figureSVG(friend,"cross",false,"eat")}</g><g transform="translate(184 262) scale(.78)">${figureSVG(friend2,"cross",false,"sip")}</g>`;
    body += `<g transform="translate(176 274) scale(.9)">${treatSVG("basket")}</g><g transform="translate(140 252) scale(.7)">${treatSVG2(CITY_DISH[city]||"croissants")}</g><g transform="translate(222 252) scale(.7)">${treatSVG2("berries")}</g><g transform="translate(300 270) scale(.7)">${treatSVG2("cake")}</g>`;
    body += talkBubbles(CHAT.picnic, [130, 290], 96);
    body += [["ha!",150,150],["ha",246,140]].map(([t,x,y],i)=>`<g transform="translate(${x} ${y})"><g class="float" style="animation-delay:-${i*1.4}s"><text font-size="12" font-weight="600" fill="${pc}" font-family="Instrument Sans, sans-serif">${t}</text></g></g>`).join("");
    body += petIdle(petKind, acc, 40, 284);
  } else if (kind==="coffee") {
    body += outdoorBase(ctx) + weatherTint(w,360,300);
    body += `<path d="M0 30 H170 L190 70 H0Z" fill="${pc}" opacity=".9"/>${Array.from({length:6},(_,i)=>`<path d="M${i*30} 30 h15 l3 40 h-15Z" fill="#FBF8F1" opacity=".85"/>`).join("")}<path d="M0 70 ${Array.from({length:7},()=>`q14 8 27 0`).join(" ")}" fill="${pc}" opacity=".9"/>`;
    body += `<path d="M120 0 V30" stroke="#3B3A36"/><circle cx="120" cy="40" r="10" fill="#FFE7B0" opacity=".5" class="glow"/>`;
    body += [[96,"talk"],[264,"sip"]].map(([x,arms],i)=>`<g><path d="M${x-22} ${254-30*1.1} V${294}" stroke="#2F2F2F" stroke-width="2"/><path d="M${x-26} ${254-36*1.1-36} Q${x} ${254-36*1.1-50} ${x+26} ${254-36*1.1-36}" stroke="#2F2F2F" stroke-width="2.4" fill="none"/></g>`).join("");
    body += `<g transform="translate(110 256) scale(1.08)"><g class="hero-fig">${figureSVG(av,"bench",false,"talk")}</g></g><g transform="translate(250 256) scale(-1.04 1.04)">${figureSVG(friend,"bench",false,"sip")}</g>`;
    body += `<ellipse cx="180" cy="294" rx="50" ry="5" fill="#000" opacity=".12"/><ellipse cx="180" cy="214" rx="46" ry="9" fill="#EFEBE2" stroke="#C9C1B2"/><path d="M180 222 V292 M164 292 h32" stroke="#2F2F2F" stroke-width="3"/><g transform="translate(162 212)">${dishSVG("coffee")}</g><g transform="translate(198 212)">${dishSVG("coffee")}</g><g transform="translate(180 210) scale(.5)">${treatSVG2(CITY_DISH[city]||"croissants")}</g>`;
    body += talkBubbles(CHAT.coffee, [120, 300], 92);
    body += walkerP(withLook(localAvatar(city,7),{top:"shirt",topc:"#FBF7EE",neck:"bowtie"}), 222, .6, "tray", 16, 150, 3);
    body += petIdle(petKind, acc, 46, 286);
  } else if (kind==="cinema") {
    o.indoor = true;
    body += `<rect width="360" height="300" fill="#1A1014"/><path d="M0 0 H360 V40 Q180 20 0 40Z" fill="#3A0E14"/>${Array.from({length:12},(_,i)=>`<path d="M${i*32} 40 Q${i*32+16} 70 ${i*32+32} 40" fill="#5A1420"/>`).join("")}`;
    const sky = skyFor(w==="none"?"sunny":w, ["day","golden","dusk","night"][Math.floor(Date.now()/60000)%4]);
    body += `<defs><linearGradient id="scr${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7FAED0"/><stop offset="1" stop-color="#F2C98A"/></linearGradient><clipPath id="sc${uid}"><rect x="40" y="46" width="280" height="104"/></clipPath></defs><rect x="36" y="42" width="288" height="112" fill="#0E0A0C"/><g clip-path="url(#sc${uid})"><rect x="40" y="46" width="280" height="104" fill="url(#scr${uid})"><animate attributeName="opacity" values="1;.85;1;.92;1" dur="3s" repeatCount="indefinite"/></rect><g class="drift" style="--dx:440px;--dur:16s"><circle cx="0" cy="80" r="16" fill="#FBF8F1" opacity=".85"/><circle cx="20" cy="76" r="20" fill="#FBF8F1" opacity=".85"/></g><circle cx="270" cy="80" r="14" fill="#F4CE72"/><path d="M40 150 Q120 116 200 136 T320 126 V150Z" fill="#5E7A45"/><g class="walkacross" style="--dx:-320px;--dur:12s"><g transform="translate(330 126) scale(1.6)"><circle cy="-12" r="3" fill="#2B2B2B"/><rect x="-3" y="-9" width="6" height="10" rx="2" fill="#2B2B2B"/><path class="lg1" d="M0 0 l-2 7" stroke="#2B2B2B" stroke-width="2"/><path class="lg2" d="M0 0 l2 7" stroke="#2B2B2B" stroke-width="2"/></g></g></g>`;
    body += `<path d="M40 154 L0 300 M320 154 L360 300" stroke="#2A1418" stroke-width="2"/><rect x="0" y="154" width="360" height="146" fill="#140C10"/>`;
    for (let r=0;r<3;r++) for (let c=0;c<9;c++){ const x = 20 + c*40, y = 176 + r*22; body += `<rect x="${x-14}" y="${y}" width="28" height="18" rx="5" fill="#6E1A24"/>`; if ((r*9+c)%3!==1) body += `<circle cx="${x}" cy="${y-2}" r="7" fill="#2A1A1E"/>`; }
    body += `<path d="M40 46 L180 300 L320 46Z" fill="#BFD8F0" opacity=".06" class="glow"/>`;
    body += `<g transform="translate(140 262) scale(1.04)"><g class="hero-fig">${figureSVG(av,"bench",false,"eat")}</g></g><g transform="translate(222 262) scale(-1 1)">${figureSVG(friend,"bench",false,"sip")}</g>`;
    body += `<rect x="96" y="${262-30*1.04}" width="170" height="10" rx="4" fill="#8E2430"/><rect x="96" y="${262-30*1.04+10}" width="170" height="40" fill="#6E1A24"/>`;
    body += `<g transform="translate(181 226)"><path d="M-12 0 L12 0 L9 22 L-9 22Z" fill="#FBF8F1"/>${[-8,-3,2,7].map(x=>`<path d="M${x} 0 v22" stroke="#C9372C" stroke-width="2.4"/>`).join("")}${[-9,-4,1,6,10,-6,0,5].map((x,i)=>`<circle cx="${x}" cy="${-3-(i%3)*2}" r="3" fill="#FBF3DC"/>`).join("")}</g>`;
    body += `<rect width="360" height="300" fill="#BFD8F0" opacity=".05"><animate attributeName="opacity" values=".04;.1;.05;.12;.04" dur="3s" repeatCount="indefinite"/></rect>`;
    body += petIdle(petKind, acc, 320, 290);
    o.lamps = [[180,200,120]];
  } else if (kind==="date") {
    body += outdoorBase(ctx) + weatherTint(w,360,300) + `<rect width="360" height="300" fill="#2A1830" opacity=".25"/>`;
    body += `<path d="M0 30 Q90 52 180 34 Q270 52 360 30" stroke="#3B3A36" stroke-width=".6" fill="none"/>${Array.from({length:16},(_,i)=>`<circle cx="${i*24+8}" cy="${36+Math.sin(i/2)*8}" r="2.6" fill="#FFD58A" class="glow" style="animation-delay:-${i*.25}s"/>`).join("")}`;
    body += `<rect x="0" y="196" width="360" height="104" fill="#8C6A4E"/><path d="M0 196 H360" stroke="#6B4A32" stroke-width="3"/>${Array.from({length:12},(_,i)=>`<path d="M${i*32} 196 v6" stroke="#6B4A32" stroke-width="2"/>`).join("")}`;
    body += `<g transform="translate(110 256) scale(1.08)"><g class="hero-fig">${figureSVG(av,"bench",false,"sip")}</g></g><g transform="translate(250 256) scale(-1.06 1.06)">${figureSVG(friend,"bench",false,"talk")}</g>`;
    body += `<ellipse cx="180" cy="296" rx="64" ry="5" fill="#000" opacity=".15"/><path d="M110 208 h140 l6 22 h-152Z" fill="#FBF7EE"/><rect x="110" y="204" width="140" height="6" rx="3" fill="#EFE6D2"/><path d="M134 230 V294 M226 230 V294" stroke="#3B3A36" stroke-width="3"/>`;
    body += `${candleSVG(180,206,14)}<g transform="translate(150 204)"><path d="M-3 -16 h6 l-1 12 h-4Z" fill="#DCEBF2" opacity=".8" stroke="#9AB8C8" stroke-width=".5"/><path d="M0 -4 v4" stroke="#9AB8C8"/></g><g transform="translate(210 204)"><path d="M-3 -16 h6 l-1 12 h-4Z" fill="#DCEBF2" opacity=".8" stroke="#9AB8C8" stroke-width=".5"/><path d="M0 -4 v4" stroke="#9AB8C8"/></g><g transform="translate(232 204)"><path d="M-4 0 h8 l-1 -10 h-6Z" fill="#DCEBF2" opacity=".6"/>${[[-3,-14],[2,-16],[0,-12]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3" fill="#C9372C"/>`).join("")}</g><g transform="translate(130 204) scale(.6)">${dishSVG(RESTO[city]?.dish||"pizza")}</g>`;
    body += [[-20,-120],[24,-150],[0,-180]].map(([x,y],i)=>`<g transform="translate(${180+x} ${256+y})"><g class="float" style="animation-delay:-${i*1.4}s"><path d="M0 6 C-9 0 -7 -6 -3 -6 C-1 -6 0 -4 0 -4 C0 -4 1 -6 3 -6 C7 -6 9 0 0 6Z" fill="#E0567A"/></g></g>`).join("");
    body += talkBubbles(CHAT.date, [120, 300], 92);
    body += petIdle(petKind, acc, 44, 288);
    o.lamps = [[180,190,110]];
  }
  return sceneShell(uid, label, body, ctx, o);
}
