/* ---------- wardrobe, accessories, shop ---------- */
const OUTFITS = {
  hanfu:{name:"Hanfu", city:"Beijing", price:60, col:"#E8B4B0", sleeves:"wide", lower:"robe", hem:"#B8423A", collar:"cross", sash:"#8E3B46"},
  kimono:{name:"Kimono", city:"Tokyo", price:60, col:"#34476B", sleeves:"wide", lower:"robe", pattern:"floral", collar:"cross", obi:"#D9A441"},
  trench:{name:"Trench coat", city:"Paris", price:45, col:"#C9A87A", sleeves:"normal", lower:"pants", lowerCol:"#2B2B2B", collar:"trench", shoes:"#3A2A22"},
  toga:{name:"Toga", city:"Rome", price:45, col:"#F4EEE2", sleeves:"none", lower:"robe", hem:"#7A3A7A", collar:"toga"},
  prom:{name:"Prom dress", city:"New York", price:60, col:"#C2387A", sleeves:"none", lower:"gown", collar:"sweet", sparkle:true},
  tiedye:{name:"Tie-dye", city:"San Francisco", price:35, col:"#F2C14E", sleeves:"short", lower:"pants", lowerCol:"#7E97AE", pattern:"tiedye", collar:"round"},
  fustanella:{name:"Fustanella", city:"Athens", price:60, col:"#F7F4EC", sleeves:"wide", lower:"pleats", collar:"vest", shoes:"#B8423A"},
  tuxedo:{name:"Tuxedo", price:55, col:"#26262A", sleeves:"normal", lower:"pants", lowerCol:"#26262A", collar:"tux", shoes:"#1E1E1E"},
  suit:{name:"Tailored suit", price:40, col:"#8C8F96", sleeves:"normal", lower:"pants", lowerCol:"#8C8F96", collar:"suit", shoes:"#3A2A22"},
  sundress:{name:"Sundress", price:30, col:"#F2D27A", sleeves:"none", lower:"dress", pattern:"floral2", collar:"straps"},
  raincoat:{name:"Raincoat", price:30, col:"#F2C14E", sleeves:"normal", lower:"robe", collar:"hood", shoes:"#3F5A4A"},
  puffer:{name:"Puffer coat", price:35, col:"#8FC1A9", sleeves:"normal", lower:"pants", lowerCol:"#3F5873", pattern:"quilt", collar:"high"},
  varsity:{name:"Varsity jacket", price:35, col:"#B8423A", sleeveCol:"#F4EDE0", sleeves:"normal", lower:"pants", lowerCol:"#3F5873", collar:"varsity"},
  pyjamas:{name:"Pyjamas", price:20, col:"#BFD4E6", sleeves:"normal", lower:"pants", lowerCol:"#BFD4E6", pattern:"stripes", collar:"pj", shoes:"#F4EDE0"}
};
const ACCESSORIES = {
  laurel:{name:"Laurel wreath", slot:"head", city:"Rome", price:15}, kanzashi:{name:"Kanzashi hairpin", slot:"head", city:"Tokyo", price:15},
  jadepin:{name:"Jade hairpin", slot:"head", city:"Beijing", price:15}, fez:{name:"Fez with tassel", slot:"head", city:"Athens", price:15},
  tiara:{name:"Tiara", slot:"head", price:25}, tophat:{name:"Top hat", slot:"head", price:25}, boater:{name:"Straw boater", slot:"head", price:15},
  pearls:{name:"Pearl necklace", slot:"neck", price:20}, goldchain:{name:"Gold chain", slot:"neck", price:15}, silkscarf:{name:"Silk scarf", slot:"neck", city:"Paris", price:15},
  hearts:{name:"Heart sunglasses", slot:"face", price:15}, monocle:{name:"Monocle", slot:"face", price:20},
  corsage:{name:"Wrist corsage", slot:"wrist", city:"New York", price:15}, bangle:{name:"Jade bangle", slot:"wrist", price:15}, watch:{name:"Wristwatch", slot:"wrist", price:15}, bracelets:{name:"Friendship bracelets", slot:"wrist", city:"San Francisco", price:10},
  fan:{name:"Folding fan", slot:"hand", city:"Tokyo", price:15}, baguette:{name:"Baguette", slot:"hand", city:"Paris", price:10}, gelato:{name:"Gelato", slot:"hand", city:"Rome", price:10},
  coffee:{name:"Coffee to go", slot:"hand", city:"New York", price:10}, teacup:{name:"Cup of tea", slot:"hand", city:"Beijing", price:10}, bouquet:{name:"Bouquet", slot:"hand", price:15}, camera:{name:"Film camera", slot:"hand", price:20},
  tote:{name:"Tote bag", slot:"bag", price:15}
};
const TREATS = {
  dumplings:{name:"Dumplings", city:"Beijing", price:6}, onigiri:{name:"Onigiri", city:"Tokyo", price:5}, croissants:{name:"Croissants", city:"Paris", price:5},
  pizza:{name:"Pizza", city:"Rome", price:6}, bagel:{name:"Bagel and coffee", city:"New York", price:5}, sourdough:{name:"Sourdough", city:"San Francisco", price:5},
  feta:{name:"Olives and feta", city:"Athens", price:5}, berries:{name:"Strawberries", price:3}, teapot:{name:"Teapot", price:5}, cake:{name:"Cake", price:8},
  basket:{name:"Wicker basket", price:6}, lantern:{name:"Lantern", price:6}, radio:{name:"Radio", price:8}, butterfly:{name:"Butterflies", price:4}
};
const CATSHOP = {
  yarn:{name:"Ball of yarn", price:3}, fish:{name:"Favourite treat", price:3}, cushion:{name:"Cushion", price:5}, bow:{name:"Bow", price:4}, scarf:{name:"Knitted scarf", price:4},
  hat:{name:"Straw hat", price:6}, catcrown:{name:"Tiny crown", price:10}, bandana:{name:"Bandana", price:6}, bell:{name:"Bell collar", price:6}, kitten:{name:"A little one", price:12}
};
const SHOPCATS = [["wardrobe","Wardrobe"],["accessories","Accessories"],["picnic","Snacks and things"],["cat","For your sidekick"]];
function priceOf(id){ return (OUTFITS[id]||ACCESSORIES[id]||TREATS[id]||CATSHOP[id])?.price || 0; }
const START_COINS = 100;
const coinSVG = `<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8.5" fill="#D9A441"/><circle cx="10" cy="10" r="6.4" fill="#E8BE5E" stroke="#B9862C" stroke-width=".8"/><path d="M10 6 C7 8 7 12 10 14 C13 12 13 8 10 6Z" fill="#B9862C" opacity=".7"/><path d="M10 7 V14" stroke="#E8BE5E" stroke-width=".7"/></svg>`;

/* worn look from the picnic doc */
function lookOf(p){ const pk = S.picnic[p] || {}, wear = {}; (pk.wear||[]).forEach(id => { const a = ACCESSORIES[id]; if (a) wear[a.slot] = id; }); return {outfit: OUTFITS[pk.outfit] ? pk.outfit : null, wear}; }

/* accessory drawings in the 64-box head space */
function accHead(id){
  switch(id){
    case "laurel": return [[17,26,-60],[18.5,21,-40],[21.5,17,-20],[26,14.4,-5],[38,14.4,5],[42.5,17,20],[45.5,21,40],[47,26,60]].map(([x,y,a])=>`<ellipse cx="${x}" cy="${y}" rx="3.4" ry="1.6" transform="rotate(${a} ${x} ${y})" fill="#7FA35A"/>`).join("") + `<circle cx="32" cy="14" r="1.4" fill="#D9A441"/>`;
    case "kanzashi": return `<path d="M42 14 L50 24" stroke="#C9A050" stroke-width="1.4"/>${[[48,14,"#D88C98"],[51,17,"#F4EDE0"],[46,18,"#D88C98"]].map(([x,y,c])=>`<circle cx="${x}" cy="${y}" r="2.6" fill="${c}"/>`).join("")}<path d="M50 24 v6 M48 24 v5 M52 24 v4" stroke="#D88C98" stroke-width=".8"/><circle cx="50" cy="30" r=".9" fill="#D88C98"/>`;
    case "jadepin": return `<path d="M20 12 L46 20" stroke="#4E9A78" stroke-width="2" stroke-linecap="round"/><circle cx="45" cy="19.6" r="2.4" fill="#5FB38D"/><path d="M45 22 v7" stroke="#B8423A" stroke-width="1.2"/><circle cx="45" cy="29.4" r="1.2" fill="#B8423A"/>`;
    case "fez": return `<path d="M24 20 L26 8 L38 8 L40 20Z" fill="#B8423A"/><ellipse cx="32" cy="8" rx="6" ry="1.6" fill="#9A3530"/><path d="M32 8 Q40 10 40 20" stroke="#2B2B2B" stroke-width="1.2" fill="none"/><path d="M40 20 l-1 5 M40 20 l1 5 M40 20 v5" stroke="#2B2B2B" stroke-width=".9"/>`;
    case "tiara": return `<path d="M21 20 Q32 13 43 20" stroke="#D7DCE0" stroke-width="1.6" fill="none"/><path d="M26 17.6 l1.4 -5 l1.4 5 M30.6 15.6 l1.4 -6 l1.4 6 M35.2 15.8 l1.4 -5 l1.4 5" stroke="#D7DCE0" stroke-width="1.2" fill="none"/><circle cx="32" cy="9.8" r="1.4" fill="#7FAED0"/><circle cx="27.4" cy="12.6" r="1" fill="#D88C98"/><circle cx="36.6" cy="12.8" r="1" fill="#D88C98"/>`;
    case "tophat": return `<ellipse cx="32" cy="18" rx="17" ry="3.6" fill="#1E1E22"/><rect x="23" y="-2" width="18" height="20" rx="2" fill="#26262A"/><rect x="23" y="12" width="18" height="3" fill="#B8423A"/>`;
    case "boater": return `<ellipse cx="32" cy="18" rx="18" ry="4" fill="#E2C98E"/><rect x="23" y="9" width="18" height="9" rx="2" fill="#E8D19B"/><rect x="23" y="13.6" width="18" height="3" fill="#34476B"/>`;
    case "pearls": return `<path d="M24 46 Q32 55 40 46" stroke="none" fill="none"/>${Array.from({length:9},(_,i)=>{ const t = i/8, x = 24+16*t, y = 46+7*Math.sin(Math.PI*t); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.2" fill="#FBF7EE" stroke="#D9CFBC" stroke-width=".3"/>`; }).join("")}`;
    case "goldchain": return `<path d="M25 46 Q32 55 39 46" stroke="#D9A441" stroke-width="1.3" fill="none" stroke-dasharray="1.6 .8"/>`;
    case "silkscarf": return `<path d="M24 45 Q32 51 40 45 L40 48 Q32 54 24 48Z" fill="#7FAED0"/><path d="M30 49 l-4 8 l4 -1 l2 -6Z M34 49 l4 8 l-4 -1 l-2 -6Z" fill="#D88C98"/><circle cx="32" cy="49" r="1.8" fill="#F2C14E"/>`;
    case "hearts": return `<path d="M27.5 34.5 l-4.5 -4.5 a2.5 2.5 0 0 1 4.5 -2.4 a2.5 2.5 0 0 1 4.5 2.4Z M36.5 34.5 l-4.5 -4.5 a2.5 2.5 0 0 1 4.5 -2.4 a2.5 2.5 0 0 1 4.5 2.4Z" fill="#E0567A"/><path d="M31.6 30 h.8" stroke="#3B2E22" stroke-width="1"/>`;
    case "monocle": return `<circle cx="36.5" cy="31" r="4.4" fill="#FFFFFF" fill-opacity=".2" stroke="#C9A050" stroke-width="1.2"/><path d="M40.4 33.4 Q42 42 38 48" stroke="#C9A050" stroke-width=".6" fill="none"/>`;
  }
  return "";
}
/* held items, centred at the hands (0,-46) in figure space */
function heldSVG(id){
  switch(id){
    case "fan": return `<g class="flutter-slow"><path d="M0 4 L-18 -14 A26 26 0 0 1 18 -14Z" fill="#D88C98"/>${[-14,-7,0,7,14].map(x=>`<path d="M0 4 L${x} -16" stroke="#B8423A" stroke-width=".7"/>`).join("")}<circle cx="-6" cy="-8" r="2" fill="#F4EDE0"/><circle cx="6" cy="-10" r="1.6" fill="#F4EDE0"/></g>`;
    case "baguette": return `<g transform="rotate(-35)"><rect x="-3" y="-26" width="9" height="40" rx="4.5" fill="#D9A45C"/>${[-18,-8,2].map(y=>`<path d="M-1 ${y} l5 4" stroke="#B57A3A" stroke-width="1.2"/>`).join("")}</g>`;
    case "gelato": return `<path d="M-5 -2 L0 14 L5 -2Z" fill="#D9A45C"/><circle cx="0" cy="-5" r="5.6" fill="#F4C6CF"/><circle cx="-2" cy="-10" r="4.6" fill="#9BC27A"/><circle cx="2.4" cy="-11" r="1" fill="#B8423A"/>`;
    case "coffee": return `<path d="M-5 -10 h10 l-1.4 18 h-7.2Z" fill="#F4EDE0"/><rect x="-5.4" y="-2" width="10.8" height="5" fill="#8A5A44"/><rect x="-6" y="-12" width="12" height="3" rx="1" fill="#3B3A36"/>`;
    case "teacup": return `<path d="M-7 -4 h14 q0 9 -7 9 q-7 0 -7 -9Z" fill="#F4EDE0" stroke="#7FAED0" stroke-width=".8"/><path d="M-3 -1 h6" stroke="#7FAED0" stroke-width="1"/><path class="steam" d="M-2 -8 q2 -3 0 -6 M2 -8 q2 -3 0 -6" stroke="#FFFFFF" stroke-width="1" fill="none" opacity=".8"/>`;
    case "bouquet": return `<path d="M0 10 L-7 -4 L7 -4Z" fill="#EFE6D2"/>${[[-5,-8,"#E07A5F"],[0,-11,"#F2C14E"],[5,-8,"#D88C98"],[-2,-4,"#9A86C2"],[3,-4,"#E07A5F"]].map(([x,y,c])=>`<circle cx="${x}" cy="${y}" r="3.2" fill="${c}"/>`).join("")}`;
    case "camera": return `<rect x="-11" y="-8" width="22" height="13" rx="2.4" fill="#2B2B2B"/><rect x="-11" y="-8" width="22" height="4" fill="#C9C1B2"/><circle cx="0" cy="-1" r="4.6" fill="#555"/><circle cx="0" cy="-1" r="2.6" fill="#7FAED0"/><rect x="5" y="-11" width="4" height="3" fill="#2B2B2B"/>`;
  }
  return "";
}
function wristSVG(id, x, y){
  switch(id){
    case "corsage": return `<circle cx="${x}" cy="${y+3}" r="3.4" fill="#F4EDE0"/><circle cx="${x-2}" cy="${y+1.6}" r="2" fill="#D88C98"/><circle cx="${x+2}" cy="${y+2}" r="2" fill="#D88C98"/>`;
    case "bangle": return `<ellipse cx="${x}" cy="${y+3}" rx="4.6" ry="2" fill="none" stroke="#5FB38D" stroke-width="1.8"/>`;
    case "watch": return `<rect x="${x-3}" y="${y+1.4}" width="6" height="3.4" rx="1" fill="#C9A050"/><rect x="${x-1.6}" y="${y+2}" width="3.2" height="2.2" fill="#F4EDE0"/>`;
    case "bracelets": return `<path d="M${x-4} ${y+2} h8 M${x-4} ${y+3.6} h8 M${x-4} ${y+5.2} h8" stroke-width="1.2" stroke="#E07A5F"/><path d="M${x-4} ${y+3.6} h8" stroke="#7FAED0" stroke-width="1.2"/>`;
  }
  return "";
}
const toteSVG = `<path d="M-12 -24 Q0 -38 12 -24" stroke="#C9A87A" stroke-width="2" fill="none"/><rect x="-14" y="-24" width="28" height="26" rx="2" fill="#EFE6D2" stroke="#C9B28E"/><circle cx="0" cy="-11" r="5" fill="#9BC27A"/><path d="M-3 -11 h6 M0 -14 v6" stroke="#EFE6D2" stroke-width="1"/>`;

/* outfit pieces */
let pSeq = 0;
function patternIn(kind, clipPath, box){
  const id = "pt"+(++pSeq); let s = `<defs><clipPath id="${id}"><path d="${clipPath}"/></clipPath></defs><g clip-path="url(#${id})">`;
  const [x0,y0,w,h] = box;
  if (kind==="floral") for (let i=0;i<14;i++){ const x = x0 + ((i*37)%w), y = y0 + ((i*23)%h); s += `<circle cx="${x}" cy="${y}" r="2.2" fill="#F4C6CF"/><circle cx="${x}" cy="${y}" r=".8" fill="#F2C14E"/>`; }
  if (kind==="floral2") for (let i=0;i<14;i++){ const x = x0 + ((i*31)%w), y = y0 + ((i*19)%h); s += `<circle cx="${x}" cy="${y}" r="1.6" fill="#FBF7EE"/>`; }
  if (kind==="pleats") for (let x=x0; x<x0+w; x+=3.4) s += `<path d="M${x} ${y0} v${h}" stroke="#D9D2C2" stroke-width=".8"/>`;
  if (kind.startsWith("breton:")) for (let y=y0+8; y<y0+h; y+=7) s += `<path d="M${x0} ${y} h${w}" stroke="${kind.slice(7)}" stroke-width="2.6"/>`;
  if (kind==="stripes") for (let x=x0; x<x0+w; x+=5) s += `<path d="M${x} ${y0} v${h}" stroke="#7FAED0" stroke-width="1.4"/>`;
  if (kind==="quilt") for (let y=y0+4; y<y0+h; y+=6) s += `<path d="M${x0} ${y} h${w}" stroke="${"#6EA88E"}" stroke-width="1.2"/>`;
  if (kind==="tiedye") { const cx = x0+w/2, cy = y0+h/2; ["#E07A5F","#F2C14E","#9BC27A","#7FAED0","#9A86C2","#D88C98"].forEach((c,i) => { s += `<circle cx="${cx}" cy="${cy}" r="${((6-i)*Math.max(w,h)/10).toFixed(1)}" fill="${c}"/>`; }); }
  return s + `</g>`;
}
let FT = "M-19 -76 Q-23 -56 -19 -34 L19 -34 Q23 -56 19 -76 Q0 -82 -19 -76Z";
const B_BASE = "M9 66 Q11 47 32 46 Q53 47 55 66Z";
function outfitTorsoFig(O, av){
  const c = O.col, d = shade(c,-.2), sk = av.skin;
  let s = "";
  if (O.collar==="sweet") s += `<path d="${FT}" fill="${sk}"/><path d="M-19 -60 Q-12 -66 0 -60 Q12 -66 19 -60 L19 -34 L-19 -34Z" fill="${c}"/>`;
  else if (O.collar==="straps") s += `<path d="${FT}" fill="${sk}"/><path d="M-18 -64 Q0 -58 18 -64 L19 -34 L-19 -34Z" fill="${c}"/><path d="M-12 -64 L-12 -78 M12 -64 L12 -78" stroke="${c}" stroke-width="2.4"/>`;
  else if (O.collar==="toga") s += `<path d="${FT}" fill="${sk}"/><path d="M-19 -78 Q-4 -80 4 -76 L20 -34 L-19 -34Z" fill="${c}"/><path d="M-19 -78 Q-4 -80 4 -76 L20 -34" stroke="${O.hem}" stroke-width="2.4" fill="none"/>`;
  else s += `<path d="${FT}" fill="${c}"/>`;
  if (O.pattern) s += patternIn(O.pattern, FT, [-24,-84,48,52]);
  if (O.sparkle) s += [[-8,-50],[6,-44],[-2,-38],[10,-56]].map(([x,y])=>`<path class="twinkle" d="M${x} ${y-2} v4 M${x-2} ${y} h4" stroke="#FFF" stroke-width="1"/>`).join("");
  switch(O.collar){
    case "cross": s += `<path d="M-9 -80 L7 -54" stroke="#F4EDE0" stroke-width="4"/><path d="M9 -80 L-7 -54" stroke="${d}" stroke-width="4.4"/>`; break;
    case "trench": s += `<path d="M-6 -80 L0 -56 L6 -80Z" fill="#F4EDE0"/>${[-72,-66,-60].map(y=>`<path d="M-5 ${y} H5" stroke="#34476B" stroke-width="1.6"/>`).join("")}<path d="M-8 -80 L-1 -56 L-13 -66Z M8 -80 L1 -56 L13 -66Z" fill="${d}"/><rect x="-19" y="-48" width="38" height="4" fill="${d}"/><rect x="-3" y="-49" width="6" height="6" fill="none" stroke="#3A2A22"/>`; break;
    case "tux": s += `<path d="M-6 -80 L0 -48 L6 -80Z" fill="#FBF7EE"/><path d="M-8 -80 L-1 -50 L-12 -64Z M8 -80 L1 -50 L12 -64Z" fill="#3A3A40"/><path d="M0 -76 L-5 -79 L-5 -73Z M0 -76 L5 -79 L5 -73Z" fill="#111"/><circle cx="0" cy="-62" r=".8" fill="#111"/><circle cx="0" cy="-56" r=".8" fill="#111"/>`; break;
    case "suit": s += `<path d="M-6 -80 L0 -52 L6 -80Z" fill="#FBF7EE"/><path d="M0 -76 L-2 -60 L0 -54 L2 -60Z" fill="#34476B"/><path d="M-8 -80 L-1 -52 L-12 -64Z M8 -80 L1 -52 L12 -64Z" fill="${d}"/>`; break;
    case "vest": s += `<path d="M-19 -76 Q-21 -56 -18 -40 L-8 -40 L-6 -78Z M19 -76 Q21 -56 18 -40 L8 -40 L6 -78Z" fill="#34476B"/>${[-70,-62,-54,-46].map(y=>`<path d="M-15 ${y} q3 -2 6 0 M9 ${y} q3 -2 6 0" stroke="#D9A441" stroke-width="1" fill="none"/>`).join("")}<rect x="-19" y="-40" width="38" height="5" fill="#B8423A"/>`; break;
    case "hood": s += `<path d="M-12 -80 Q0 -90 12 -80 Q0 -76 -12 -80Z" fill="${d}"/>${[-70,-62,-54].map(y=>`<rect x="-1.6" y="${y}" width="3.2" height="5" rx="1" fill="#3B3A36"/>`).join("")}<path d="M0 -78 V-36" stroke="${d}" stroke-width="1"/>`; break;
    case "high": s += `<rect x="-9" y="-86" width="18" height="10" rx="4" fill="${d}"/><path d="M0 -76 V-36" stroke="${d}" stroke-width="1.2"/>`; break;
    case "varsity": s += `<path d="M-6 -80 Q0 -76 6 -80" stroke="#F4EDE0" stroke-width="3" fill="none"/><text x="-11" y="-54" font-size="12" font-weight="700" fill="#F4EDE0" font-family="Georgia, serif">H</text><path d="M-19 -38 H19" stroke="#F4EDE0" stroke-width="3"/>`; break;
    case "pj": s += `<path d="M-7 -80 L0 -70 L7 -80" stroke="#34476B" stroke-width="2" fill="none"/>${[-64,-56,-48].map(y=>`<circle cx="0" cy="${y}" r="1" fill="#34476B"/>`).join("")}`; break;
    case "round": s += `<path d="M-6 -80 Q0 -75 6 -80" stroke="${d}" stroke-width="2" fill="none"/>`; break;
  }
  if (O.obi) s += `<rect x="-20" y="-54" width="40" height="11" fill="${O.obi}"/><path d="M-20 -48.5 H20" stroke="#B8862C" stroke-width="1"/><rect x="-4" y="-52" width="8" height="7" rx="1" fill="#B8423A"/>`;
  if (O.sash) s += `<rect x="-20" y="-48" width="40" height="6" fill="${O.sash}"/><path d="M6 -42 l3 10 l-5 0Z" fill="${O.sash}"/>`;
  return s;
}
function outfitLowerFig(O, av){
  const c = O.lowerCol || O.col, sk = av.skin, d = shade(c,-.2);
  let s = "";
  const legs = (th, sh) => `<path d="M-10 -32 L-31 -23" stroke="${th}" stroke-width="13" stroke-linecap="round"/><path d="M10 -32 L31 -23" stroke="${th}" stroke-width="13" stroke-linecap="round"/><path d="M-31 -23 L-5 -15" stroke="${sh}" stroke-width="11" stroke-linecap="round"/><path d="M31 -23 L5 -18" stroke="${sh}" stroke-width="11" stroke-linecap="round"/>`;
  const shoeC = O.shoes || ({sneakers:"#F4EDE0", boots:"#5A4030", loafers:"#3A2A22", sandals:"#B07A50"}[av.shoes] || "#3A2A22");
  const shoes = `<ellipse cx="4" cy="-18" rx="6.5" ry="4.4" fill="${shoeC}"/><ellipse cx="-4" cy="-14" rx="6.5" ry="4.4" fill="${shoeC}"/>`;
  if (O.lower==="pants") return legs(c, c) + shoes + `<path d="M-19 -38 H19 V-32 H-19Z" fill="${c}"/>`;
  if (O.lower==="dress") return legs(sk, sk) + shoes + `<path d="M-19 -42 Q-38 -32 -40 -21 Q0 -12 40 -21 Q38 -32 19 -42Z" fill="${c}"/>` + (O.pattern ? patternIn(O.pattern, "M-19 -42 Q-38 -32 -40 -21 Q0 -12 40 -21 Q38 -32 19 -42Z", [-42,-44,84,32]) : "");
  if (O.lower==="pleats") return legs("#F7F4EC", "#F7F4EC") + `<ellipse cx="4" cy="-18" rx="6.5" ry="4.4" fill="${shoeC}"/><ellipse cx="-4" cy="-14" rx="6.5" ry="4.4" fill="${shoeC}"/><circle cx="9" cy="-19" r="2.4" fill="#2B2B2B"/><circle cx="1" cy="-15" r="2.4" fill="#2B2B2B"/><path d="M-19 -42 Q-38 -32 -40 -21 Q0 -12 40 -21 Q38 -32 19 -42Z" fill="#F7F4EC"/>${Array.from({length:11},(_,i)=>`<path d="M${-16+i*3.2} -40 L${-36+i*7.2} -20" stroke="#D9D2C2" stroke-width=".8"/>`).join("")}`;
  if (O.lower==="gown") return `<path d="M-20 -44 Q-52 -28 -54 -10 Q0 4 54 -10 Q52 -28 20 -44Z" fill="${c}"/><path d="M-48 -12 Q-20 -20 -6 -40 M48 -12 Q20 -20 6 -40" stroke="${shade(c,.2)}" stroke-width="1.4" fill="none" opacity=".7"/>` + (O.sparkle ? [[-30,-16],[20,-20],[-8,-26],[36,-14]].map(([x,y])=>`<path class="twinkle" style="animation-delay:-${(Math.abs(x)%7)/4}s" d="M${x} ${y-2.4} v4.8 M${x-2.4} ${y} h4.8" stroke="#FFF" stroke-width="1.1"/>`).join("") : "");
  s += `<ellipse cx="6" cy="-10" rx="5" ry="3" fill="${shoeC}"/><ellipse cx="-6" cy="-9" rx="5" ry="3" fill="${shoeC}"/>`;
  s += `<path d="M-20 -44 Q-44 -30 -46 -14 Q0 -4 46 -14 Q44 -30 20 -44Z" fill="${c}"/>`;
  if (O.pattern) s += patternIn(O.pattern, "M-20 -44 Q-44 -30 -46 -14 Q0 -4 46 -14 Q44 -30 20 -44Z", [-48,-46,96,42]);
  if (O.hem) s += `<path d="M-45 -15 Q0 -5 45 -15" stroke="${O.hem}" stroke-width="3" fill="none"/>`;
  return s;
}
function outfitBust(O, av){
  const c = O.col, d = shade(c,-.2), sk = av.skin;
  let s = "";
  if (O.collar==="sweet" || O.collar==="straps" || O.collar==="toga") s += `<path d="${B_BASE}" fill="${sk}"/>`;
  if (O.collar==="sweet") s += `<path d="M13 66 Q15 57 22 55 Q27 52 32 56 Q37 52 42 55 Q49 57 51 66Z" fill="${c}"/>`;
  else if (O.collar==="straps") s += `<path d="M14 66 Q16 56 32 56 Q48 56 50 66Z" fill="${c}"/><path d="M22 57 L22 47 M42 57 L42 47" stroke="${c}" stroke-width="2"/>`;
  else if (O.collar==="toga") s += `<path d="M9 66 Q12 50 22 47 L48 66Z" fill="${c}"/><path d="M22 47 L48 66" stroke="${O.hem}" stroke-width="2.4"/>`;
  else s += `<path d="${B_BASE}" fill="${O.sleeveCol && O.collar==="varsity" ? c : c}"/>`;
  if (O.collar==="varsity") s += `<path d="M9 66 Q10 54 16 50 L20 66Z M55 66 Q54 54 48 50 L44 66Z" fill="${O.sleeveCol}"/><path d="M26 46.6 Q32 50 38 46.6" stroke="#F4EDE0" stroke-width="2.4" fill="none"/><text x="34" y="62" font-size="9" font-weight="700" fill="#F4EDE0" font-family="Georgia, serif">H</text>`;
  if (O.pattern && O.collar!=="straps") s += patternIn(O.pattern, B_BASE, [8,44,48,22]);
  if (O.pattern && O.collar==="straps") s += patternIn(O.pattern, "M14 66 Q16 56 32 56 Q48 56 50 66Z", [12,54,40,12]);
  switch(O.collar){
    case "cross": s += `<path d="M24 46 L37 66" stroke="#F4EDE0" stroke-width="3.6"/><path d="M40 46 L27 66" stroke="${d}" stroke-width="4"/>`; break;
    case "trench": s += `<path d="M27 46 L32 64 L37 46Z" fill="#F4EDE0"/><path d="M28 52 H36 M29 57 H35" stroke="#34476B" stroke-width="1.6"/><path d="M26 46 L31 64 L22 54Z M38 46 L33 64 L42 54Z" fill="${d}"/>`; break;
    case "tux": s += `<path d="M27 46 L32 66 L37 46Z" fill="#FBF7EE"/><path d="M26 46 L31 66 L22 56Z M38 46 L33 66 L42 56Z" fill="#3A3A40"/><path d="M32 49 L28 47 L28 51Z M32 49 L36 47 L36 51Z" fill="#111"/>`; break;
    case "suit": s += `<path d="M27 46 L32 66 L37 46Z" fill="#FBF7EE"/><path d="M32 48 L30 60 L32 64 L34 60Z" fill="#34476B"/><path d="M26 46 L31 66 L22 56Z M38 46 L33 66 L42 56Z" fill="${d}"/>`; break;
    case "vest": s += `<path d="M10 66 Q12 52 22 48 L27 66Z M54 66 Q52 52 42 48 L37 66Z" fill="#34476B"/><path d="M14 58 q3 -2 6 0 M44 58 q3 -2 6 0" stroke="#D9A441" stroke-width="1" fill="none"/>`; break;
    case "hood": s += `<path d="M20 50 Q32 40 44 50 Q38 47 32 47 Q26 47 20 50Z" fill="${d}"/><rect x="31" y="54" width="2.4" height="4" rx="1" fill="#3B3A36"/><rect x="31" y="60" width="2.4" height="4" rx="1" fill="#3B3A36"/>`; break;
    case "high": s += `<rect x="25" y="40" width="14" height="9" rx="4" fill="${d}"/>`; break;
    case "pj": s += `<path d="M26 46 L32 54 L38 46" stroke="#34476B" stroke-width="1.6" fill="none"/>`; break;
    case "round": s += `<path d="M26 46.4 Q32 51 38 46.4" stroke="${d}" stroke-width="1.6" fill="none"/>`; break;
  }
  if (O.obi) s += `<rect x="12" y="60" width="40" height="6" fill="${O.obi}"/>`;
  if (O.sash) s += `<rect x="12" y="62" width="40" height="4" fill="${O.sash}"/>`;
  return s;
}
/* treats & cat goods (centred at 0,0) */
function treatSVG2(id){
  switch(id){
    case "dumplings": return `<ellipse rx="18" ry="11" fill="#C9A86A"/><ellipse rx="15" ry="8.6" fill="#E2C78E"/>${[[-7,-1],[0,-3],[7,-1],[-3,4],[4,4]].map(([x,y])=>`<path d="M${x-4} ${y+1} q4 -6 8 0 q-4 2 -8 0Z" fill="#FBF7EE"/>`).join("")}<path d="M-18 0 h36" stroke="#B08D50" stroke-width=".8"/>`;
    case "onigiri": return [[-7,0],[7,2]].map(([x,y])=>`<g transform="translate(${x} ${y})"><path d="M0 -9 Q8 4 7 7 Q0 9 -7 7 Q-8 4 0 -9Z" fill="#FBF7EE" stroke="#D9CFBC" stroke-width=".6"/><rect x="-4" y="2" width="8" height="6" fill="#2F3B2F"/></g>`).join("");
    case "croissants": return [[-7,0,-15],[7,3,20]].map(([x,y,a])=>`<g transform="translate(${x} ${y}) rotate(${a})"><path d="M-10 2 Q-8 -8 0 -8 Q8 -8 10 2 Q6 -2 0 -2 Q-6 -2 -10 2Z" fill="#D9A45C"/><path d="M-4 -7 l1 5 M0 -8 v6 M4 -7 l-1 5" stroke="#B57A3A" stroke-width=".9"/></g>`).join("");
    case "pizza": return `<circle r="16" fill="#D9A45C"/><circle r="13" fill="#C9452E"/><circle r="12" fill="#F2D27A" opacity=".85"/>${[[-5,-4],[4,-6],[6,4],[-4,5],[0,0]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.2" fill="#B8423A"/>`).join("")}<ellipse cx="-1" cy="-8" rx="2.4" ry="1.2" fill="#5E8A3C"/><ellipse cx="7" cy="1" rx="2.4" ry="1.2" fill="#5E8A3C"/>`;
    case "bagel": return `<circle cx="-5" cy="2" r="9" fill="#C98A4A"/><circle cx="-5" cy="2" r="3" fill="var(--window)"/>${[[-9,-2],[-2,-3],[-7,6]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".8" fill="#F4EDE0"/>`).join("")}<g transform="translate(10 -2)"><path d="M-4 -8 h8 l-1 13 h-6Z" fill="#F4EDE0"/><rect x="-4.4" y="-2" width="8.8" height="4" fill="#8A5A44"/><rect x="-5" y="-10" width="10" height="2.6" rx="1" fill="#3B3A36"/></g>`;
    case "sourdough": return `<rect x="-17" y="-8" width="34" height="18" rx="3" fill="#8C5A3C"/><ellipse cy="0" rx="13" ry="9" fill="#C98A4A"/><path d="M-7 -3 q7 -4 14 0" stroke="#E8C690" stroke-width="2" fill="none"/>`;
    case "feta": return `<circle r="16" fill="#F4EDE0" stroke="#7FAED0" stroke-width="1.6"/><rect x="-9" y="-7" width="10" height="9" fill="#FBF7EE" stroke="#E1DACB"/><ellipse cx="-6" cy="-6.6" rx="2" ry=".8" fill="#5E8A3C"/>${[[5,-4],[8,2],[3,5],[-3,7],[6,8]].map(([x,y],i)=>`<ellipse cx="${x}" cy="${y}" rx="2.4" ry="1.8" fill="${i%2?"#3A3A2A":"#6E7E3A"}"/>`).join("")}`;
    case "cake": return `<ellipse cy="4" rx="15" ry="6" fill="#E8D2C4"/><rect x="-15" y="-6" width="30" height="10" fill="#F4C6CF"/><ellipse cy="-6" rx="15" ry="6" fill="#FBE3E8"/>${[-6,0,6].map(x=>`<rect x="${x-1}" y="-16" width="2" height="8" fill="#7FAED0"/><ellipse class="flicker" cx="${x}" cy="-17.6" rx="1.4" ry="2.2" fill="#F2C14E"/>`).join("")}${[[-8,-6],[4,-8],[9,-4]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.4" fill="#B8423A"/>`).join("")}`;
    case "radio": return `<rect x="-14" y="-8" width="28" height="18" rx="3" fill="#B8423A"/><circle cx="-6" cy="1" r="5" fill="#EFE6D2"/>${[-2,0,2].map(d=>`<path d="M${-9} ${1+d} h6" stroke="#B8423A" stroke-width=".6"/>`).join("")}<rect x="2" y="-3" width="9" height="3" rx="1" fill="#EFE6D2"/><circle cx="6" cy="4" r="2" fill="#3B3A36"/><path d="M8 -8 L14 -20" stroke="#3B3A36" stroke-width="1"/><g class="float"><path d="M-4 -14 v-6 l4 -1 v6" stroke="#3B2E22" stroke-width="1" fill="none"/><circle cx="-5" cy="-14" r="1.4" fill="#3B2E22"/><circle cx="-1" cy="-15" r="1.4" fill="#3B2E22"/></g>`;
    case "steakfrites": return `<ellipse rx="18" ry="7" fill="#FBF7EE" stroke="#D9CFBC" stroke-width=".6"/><ellipse cx="-5" cy="-1" rx="8" ry="4" fill="#7A3E2A"/><path d="M-9 -2 l8 1" stroke="#5A2A1A" stroke-width=".8"/>${[3,6,9,12].map((x,i)=>`<rect x="${x}" y="${-5+i%2}" width="2" height="8" rx="1" fill="#E8C25A" transform="rotate(${-20+i*12} ${x} 0)"/>`).join("")}`;
    case "duck": return `<ellipse rx="18" ry="7" fill="#FBF7EE" stroke="#D9CFBC" stroke-width=".6"/>${[-8,-3,2,7].map(x=>`<path d="M${x-3} -2 q3 -4 6 0 q-3 2 -6 0Z" fill="#B5562C"/>`).join("")}<ellipse cx="11" cy="2" rx="5" ry="2.6" fill="#F4EEE2"/><path d="M-12 3 h6" stroke="#7FA35A" stroke-width="2"/>`;
    case "sushi": return `<ellipse rx="10" ry="4" fill="#E07A5F" stroke="#B8423A" stroke-width=".6"/><rect x="-6" y="-5" width="12" height="5" rx="2" fill="#FBF7EE"/><path d="M-6 -6 q6 -3 12 0 v2 h-12Z" fill="#F08A5A"/>`;
    case "cheesecake": return `<ellipse rx="14" ry="5.4" fill="#FBF7EE" stroke="#D9CFBC" stroke-width=".6"/><path d="M-8 -1 L8 -1 L4 -9 L-8 -8Z" fill="#F4E2B8"/><path d="M-8 -8 L4 -9 L8 -1" fill="none" stroke="#C98A4A" stroke-width="1.6"/><circle cx="-3" cy="-10" r="2" fill="#B8423A"/>`;
    case "pie": return `<ellipse rx="16" ry="6" fill="#FBF7EE" stroke="#D9CFBC" stroke-width=".6"/><path d="M-10 -1 Q-10 -10 0 -10 Q10 -10 10 -1Z" fill="#D9A45C"/><path d="M-6 -6 l3 2 M0 -8 v3 M5 -6 l-2 2" stroke="#B57A3A" stroke-width="1"/><path d="M6 1 q4 -3 8 0" fill="#9BC27A"/>`;
    case "smorrebrod": return `<rect x="-16" y="-5" width="32" height="10" rx="2" fill="#E8DCC4"/>${[-9,0,9].map((x,i)=>`<rect x="${x-4}" y="-8" width="8" height="6" rx="1" fill="#6B4A32"/><ellipse cx="${x}" cy="-9" rx="4" ry="2" fill="${["#F08A5A","#F4EEE2","#9BC27A"][i]}"/>`).join("")}`;
    case "chowder": return `<ellipse rx="13" ry="6" fill="#C98A4A"/><ellipse cy="-2" rx="9" ry="3.6" fill="#F4EDE0"/><circle cx="-2" cy="-3" r="1" fill="#7FA35A"/><path class="steam" d="M0 -6 q2 -3 0 -6" stroke="#FFF" stroke-width="1" fill="none"/>`;
    case "salad": return `<ellipse rx="16" ry="6" fill="#FBF7EE" stroke="#7FAED0" stroke-width="1"/>${[[-7,-1,"#B8423A"],[4,-2,"#7FA35A"],[-1,1,"#F4EEE2"],[8,1,"#3A3A2A"],[-9,2,"#9BC27A"]].map(([x,y,c])=>`<ellipse cx="${x}" cy="${y}" rx="3" ry="2" fill="${c}"/>`).join("")}`;
    default: return treatSVG(id);
  }
}
