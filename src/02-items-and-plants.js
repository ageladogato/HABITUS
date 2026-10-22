function plantBody(kind){
  switch(kind){
    case "tulip": return `<path d="M20 40V16" stroke="var(--moss)" stroke-width="1.8"/><path d="M20 38 C12 34 11 26 13 22 C17 26 19 31 20 38Z" fill="var(--leaf)"/><path d="M20 36 C27 32 29 26 27 21 C23 25 21 29 20 36Z" fill="var(--leaf-2)"/><path d="M13 8 Q13 19 20 19 Q27 19 27 8 L23.5 12 L20 6 L16.5 12Z" fill="var(--bloom)"/>`;
    case "cactus": return `<rect x="15" y="12" width="10" height="28" rx="5" fill="var(--leaf)"/><path d="M15 28h-3a3 3 0 0 1-3-3v-6" stroke="var(--leaf)" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M25 24h3a3 3 0 0 0 3-3v-5" stroke="var(--leaf-2)" stroke-width="4" stroke-linecap="round" fill="none"/><circle cx="20" cy="11" r="3" fill="var(--bloom)"/>`;
    case "sunflower": return `<path d="M20 40V14" stroke="var(--moss)" stroke-width="1.8"/><ellipse cx="14" cy="30" rx="6" ry="3" transform="rotate(-25 14 30)" fill="var(--leaf)"/><ellipse cx="26" cy="25" rx="6" ry="3" transform="rotate(25 26 25)" fill="var(--leaf-2)"/><g fill="var(--ochre)">${[0,45,90,135,180,225,270,315].map(a=>`<ellipse cx="20" cy="5" rx="2.4" ry="4" transform="rotate(${a} 20 11)"/>`).join("")}</g><circle cx="20" cy="11" r="3.4" fill="var(--pot-rim)"/>`;
    case "monstera": return `<path d="M20 40 C20 32 18 28 19 22" stroke="var(--moss)" stroke-width="1.8" fill="none"/><path d="M19 23 C7 23 5 9 15 6 C24 3 33 10 29 18 C27 22 23 23 19 23Z" fill="var(--leaf)"/><path d="M12 12l5 3M14 8l4 5M24 8l-2 5M28 14l-6 2" stroke="var(--card)" stroke-width="1.4" stroke-linecap="round"/>`;
    case "lavender": return [14,20,26].map((x,i)=>{ const top=[12,7,13][i]; return `<path d="M20 40 Q${x} 28 ${x} ${top+8}" stroke="var(--moss)" stroke-width="1.4" fill="none"/>`+[0,1,2,3].map(j=>`<ellipse cx="${x+(j%2?1:-1)}" cy="${top+j*2.6}" rx="1.8" ry="1.6" fill="var(--lavbloom)"/>`).join(""); }).join("");
    default: return `<path d="M20 40 C20 30 19 20 22 7" stroke="var(--moss)" stroke-width="1.6" fill="none"/>${[[16,34,-35],[24,30,35],[16.5,25,-35],[24,21,35],[17.5,16,-40],[23.5,12,40],[21,7,0]].map(([x,y,a])=>`<ellipse cx="${x}" cy="${y}" rx="5" ry="2" transform="rotate(${a} ${x} ${y})" fill="${a<0?"var(--leaf)":"var(--leaf-2)"}"/>`).join("")}`;
  }
}
const sprout = `<path d="M20 40v-6" stroke="var(--moss)" stroke-width="1.6"/><ellipse cx="17.2" cy="33.5" rx="3" ry="1.5" transform="rotate(-30 17.2 33.5)" fill="var(--leaf-2)"/><ellipse cx="22.8" cy="33" rx="3" ry="1.5" transform="rotate(30 22.8 33)" fill="var(--leaf)"/>`;
const ol = `stroke="#7A6A55" stroke-width="1.1"`;
function itemSVG(kind){
  switch(kind){
    case "book": return `<g transform="rotate(-8)"><path d="M-21 -13 L0 -10 L0 13 L-21 10Z" fill="var(--window)" ${ol}/><path d="M21 -13 L0 -10 L0 13 L21 10Z" fill="var(--window)" ${ol}/><path d="M-17 -7 L-4 -5 M-17 -2 L-4 0 M-17 3 L-4 5 M4 -5 L17 -7 M4 0 L17 -2 M4 5 L17 3" stroke="#B8AA92"/><ellipse cx="11" cy="7" rx="5" ry="2.2" transform="rotate(-30 11 7)" fill="var(--ochre)"/></g>`;
    case "mug": return `<rect x="8" y="-3" width="9" height="6" rx="3" fill="none" stroke="var(--pot-rim)" stroke-width="2.5"/><circle r="11" fill="var(--window)" ${ol}/><circle r="8" fill="var(--pot-rim)"/>`;
    case "phone": return `<g transform="rotate(14)"><rect x="-10" y="-17" width="20" height="34" rx="5" fill="var(--cat-dark)"/><circle cx="-4" cy="-11" r="2.2" fill="#8A7F72"/><ellipse cx="3" cy="4" rx="7" ry="3" transform="rotate(-35 3 4)" fill="var(--bloom)"/></g>`;
    case "bottle": return `<g transform="rotate(-60)"><rect x="-6.5" y="-17" width="13" height="32" rx="5.5" fill="var(--b4)" ${ol}/><rect x="-4.5" y="-21" width="9" height="5" rx="1.5" fill="var(--moss)"/><rect x="-6.5" y="-3" width="13" height="7" fill="var(--window)" opacity=".7"/></g>`;
    case "sneakers": return `<g transform="rotate(10)"><path d="M-17 -12 q-4 10 0 20 q4 6 8 0 q3 -10 0 -20 q-4 -5 -8 0Z" fill="var(--window)" ${ol}/><path d="M3 -14 q-4 10 0 20 q4 6 8 0 q3 -10 0 -20 q-4 -5 -8 0Z" fill="var(--window)" ${ol}/><path d="M-15 -6h4M-15 -2h4M5 -8h4M5 -4h4" stroke="var(--bloom)" stroke-width="1.3"/></g>`;
    case "journal": return `<g transform="rotate(6)"><rect x="-14" y="-17" width="28" height="34" rx="2.5" fill="var(--moss)"/><rect x="-14" y="-17" width="4" height="34" fill="var(--leaf)"/><path d="M6 -17 v10 l2 -2 l2 2 v-10" fill="var(--bloom)"/><path d="M-4 20 L18 -2" stroke="var(--ochre)" stroke-width="3" stroke-linecap="round"/></g>`;
    case "fruit": return `<circle r="18" fill="var(--card-2)" ${ol}/><circle cx="-6" cy="-4" r="7" fill="var(--ochre)"/><circle cx="-6" cy="-4" r="5.2" fill="var(--bloom)" opacity=".75"/><circle cx="6" cy="-6" r="7" fill="var(--ochre)"/><circle cx="6" cy="-6" r="5.2" fill="var(--bloom)" opacity=".75"/>${[[2,8],[7,9],[4,12],[9,13],[-2,11],[6,16]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.6" fill="var(--lavbloom)"/>`).join("")}`;
    case "flowers": return `<g transform="rotate(-25)"><path d="M0 18 L-8 -2 L8 -2Z" fill="var(--window)" ${ol}/><path d="M0 4 L-6 -10 M0 4 L0 -13 M0 4 L6 -10" stroke="var(--moss)" stroke-width="1.5"/>${[[-6,-12],[0,-15],[6,-12]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4.5" fill="var(--bloom)"/><circle cx="${x}" cy="${y}" r="1.6" fill="var(--ochre)"/>`).join("")}</g>`;
    case "bread": return `<g transform="rotate(-12)"><rect x="-21" y="-11" width="42" height="22" rx="3" fill="var(--pot)"/><ellipse rx="15" ry="7" fill="var(--ochre)"/><path d="M-8 -4 l3 7 M-1 -5 l3 8 M6 -4 l3 7" stroke="var(--pot-rim)" stroke-width="1.4"/></g>`;
    case "headphones": return `<path d="M-13 4 A13 13 0 0 1 13 4" stroke="var(--cat-dark)" stroke-width="3.5" fill="none"/><ellipse cx="-13" cy="7" rx="5" ry="7" fill="var(--b)"/><ellipse cx="13" cy="7" rx="5" ry="7" fill="var(--b)"/>`;
    case "laptop": return `<rect x="-17" y="-12" width="34" height="21" rx="2" fill="#5A6470"/><rect x="-14.5" y="-9.5" width="29" height="16" fill="#9CC3E6"/><path d="M-21 9 h42 l-3 4 h-36Z" fill="#7E8892"/><path d="M-10 -4 h14 M-10 0 h20 M-10 4 h9" stroke="#F4EDE0" stroke-width="1.4"/>`;
    case "speech": return `<path d="M-18 -12 h24 a4 4 0 0 1 4 4 v10 a4 4 0 0 1 -4 4 h-14 l-6 6 v-6 h-4 a4 4 0 0 1 -4 -4 v-10 a4 4 0 0 1 4 -4Z" fill="var(--b4)"/><path d="M-12 -4 h14 M-12 1 h9" stroke="#F4EDE0" stroke-width="1.6" stroke-linecap="round"/><path d="M6 -2 h12 a4 4 0 0 1 4 4 v8 a4 4 0 0 1 -4 4 h-2 v5 l-5 -5 h-5 a4 4 0 0 1 -4 -4Z" fill="var(--bloom)"/>`;
    case "heart": return `<path d="M0 14 C-22 0 -16 -16 -6 -14 C-2 -13 0 -9 0 -9 C0 -9 2 -13 6 -14 C16 -16 22 0 0 14Z" fill="var(--bloom)"/><path d="M-8 -8 q-4 2 -3 6" stroke="#FFF" stroke-width="1.6" opacity=".6" fill="none" stroke-linecap="round"/>`;
    case "pillow": return `<g transform="rotate(-8)"><rect x="-20" y="-12" width="40" height="24" rx="9" fill="var(--window)" ${ol}/><rect x="-15" y="-7" width="30" height="14" rx="6" fill="none" stroke="#B8AA92" stroke-dasharray="2 2"/><path d="M8 -4 a5 5 0 1 0 5 7 a4 4 0 1 1 -5 -7Z" fill="var(--lavbloom)"/></g>`;
    default: return `<circle r="11" fill="var(--pot)"/><circle r="8.5" fill="var(--pot-rim)"/>${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-8" rx="4" ry="8" transform="rotate(${a})" fill="${a%144?"var(--leaf)":"var(--leaf-2)"}"/>`).join("")}`;
  }
}
/* shop items, centred on 0,0 */
function treatSVG(id){
  switch(id){
    case "yarn": return `<path d="M8 6 q14 6 10 16 q-3 6 6 8" stroke="var(--lavbloom)" stroke-width="1.6" fill="none"/><circle r="10" fill="var(--lavbloom)"/><path d="M-8 -4 q8 -6 16 2 M-9 2 q9 -6 18 3 M-5 7 q6 -3 12 1 M-3 -9 q-4 9 3 18" stroke="var(--b)" stroke-width="1.1" fill="none"/>`;
    case "fish": return `<ellipse rx="16" ry="10" fill="var(--window)" ${ol}/><path d="M-9 0 q7 -7 14 0 q-7 7 -14 0Z M5 0 l6 -5 v10Z" fill="var(--b4)"/><circle cx="-5" cy="-1" r="1" fill="var(--cat-dark)"/>`;
    case "berries": return [[-7,-3,-15],[3,-6,10],[0,5,0],[9,4,25]].map(([x,y,a])=>`<g transform="translate(${x} ${y}) rotate(${a})"><path d="M0 6 C-6 2 -5 -4 0 -3 C5 -4 6 2 0 6Z" fill="var(--bloom)"/><path d="M-3 -3 l3 -3 l3 3" stroke="var(--leaf)" stroke-width="2" fill="none"/><circle cx="-1" cy="0" r=".6" fill="var(--ochre)"/><circle cx="1.5" cy="2" r=".6" fill="var(--ochre)"/></g>`).join("");
    case "teapot": return `<path d="M12 -2 q10 -4 12 -10" stroke="var(--b4)" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M-12 -4 q-8 0 -8 6 q0 6 8 4" stroke="var(--b4)" stroke-width="3" fill="none"/><ellipse rx="14" ry="11" fill="var(--b4)" ${ol}/><ellipse cy="-3" rx="6" ry="4" fill="var(--window)"/><circle cy="-4" r="2" fill="var(--bloom)"/><path d="M-10 4 q10 5 20 0" stroke="var(--window)" stroke-width="1.5" fill="none"/>`;
    case "lantern": return `<circle r="20" fill="var(--ochre)" opacity=".25" class="flicker"/><rect x="-8" y="-11" width="16" height="22" rx="3" fill="var(--cat-dark)"/><rect x="-5.5" y="-8" width="11" height="16" rx="2" fill="var(--ochre)" class="flicker"/><path d="M-5 -11 q5 -7 10 0" stroke="var(--cat-dark)" stroke-width="1.6" fill="none"/>`;
    case "basket": return `<ellipse rx="20" ry="15" fill="var(--pot)"/><ellipse rx="16" ry="11" fill="var(--pot-rim)"/>${[-12,-6,0,6,12].map(x=>`<path d="M${x} -14 v28" stroke="var(--ochre)" stroke-width="1" opacity=".5"/>`).join("")}<circle cx="-5" cy="-3" r="4.5" fill="var(--bloom)"/><circle cx="3" cy="-5" r="4.5" fill="var(--bloom)"/><circle cx="-1" cy="3" r="4" fill="var(--bloom)"/><ellipse cx="9" cy="3" rx="5" ry="2.5" transform="rotate(30 9 3)" fill="var(--leaf)"/><path d="M-20 0 q20 -26 40 0" stroke="var(--pot)" stroke-width="3" fill="none"/>`;
    case "butterfly": return `<g class="flutter"><ellipse cx="-5" cy="-3" rx="5.5" ry="4" fill="var(--ochre)"/><ellipse cx="5" cy="-3" rx="5.5" ry="4" fill="var(--ochre)"/><ellipse cx="-4" cy="3" rx="3.5" ry="3" fill="var(--bloom)"/><ellipse cx="4" cy="3" rx="3.5" ry="3" fill="var(--bloom)"/></g><rect x="-.8" y="-5" width="1.6" height="10" rx=".8" fill="var(--cat-dark)"/>`;
    case "cushion": return `<rect x="-26" y="-22" width="52" height="44" rx="14" fill="var(--b3)" ${ol}/><rect x="-20" y="-16" width="40" height="32" rx="10" fill="none" stroke="var(--window)" stroke-width="1.4" stroke-dasharray="3 3"/>`;
    case "bow": return `<path d="M0 0 L-9 -6 L-9 6Z M0 0 L9 -6 L9 6Z" fill="var(--bloom)"/><circle r="2.6" fill="var(--pot-rim)"/>`;
    case "scarf": return `<path d="M-12 -8 q12 10 24 0" stroke="var(--ochre)" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M8 -4 l4 12 l-6 1Z" fill="var(--ochre)"/><path d="M-8 -4 q4 3 8 4" stroke="var(--bloom)" stroke-width="1.4" fill="none"/>`;
    case "hat": return `<ellipse rx="16" ry="13" fill="var(--b5)" ${ol}/><ellipse rx="9" ry="7.5" fill="var(--ochre)"/><path d="M-9 1 q9 4 18 0" stroke="var(--bloom)" stroke-width="2.4" fill="none"/>`;
    case "kitten": return `<g transform="scale(.55)">${catCurled("var(--cat-light)","#3B2E22","var(--ochre)")}</g>`;
    default: return "";
  }
}
const acornSVG = `<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 9 Q10 4 16 9 Q16 6 10 4.5 Q4 6 4 9Z" fill="var(--pot-rim)"/><path d="M5 9 Q5 17 10 18 Q15 17 15 9Z" fill="var(--ochre)"/><path d="M10 4.5 V2" stroke="var(--pot-rim)" stroke-width="1.6" stroke-linecap="round"/></svg>`;
function catCurled(fill, stroke, patch, acc){
  acc = acc || {};
  return `<g>
    <path class="tail" d="M24 6 q8 14 -10 18 q-16 2 -18 -6" stroke="${fill}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <g class="breathe"><ellipse rx="26" ry="18" fill="${fill}"/>${patch?`<ellipse cx="8" cy="-4" rx="10" ry="7" fill="${patch}"/><ellipse cx="-4" cy="8" rx="6" ry="4" fill="#5A4636"/>`:""}</g>
    ${acc.scarf?`<g transform="translate(-14 2)">${treatSVG("scarf")}</g>`:""}
    <circle cx="-20" cy="-8" r="12" fill="${fill}"/><path d="M-30 -14 l-2 -10 l8 5Z M-16 -18 l2 -9 l5 8Z" fill="${fill}"/>
    <path d="M-25 -7 q2 2 4 0 M-17 -9 q2 2 4 0" stroke="${stroke}" stroke-width="1.2" fill="none"/><ellipse cx="-20" cy="-3" rx="1.4" ry="1" fill="var(--bloom)" opacity=".8"/>
    ${acc.hat?`<g transform="translate(-21 -15) rotate(-15)">${treatSVG("hat")}</g>`:""}
    ${acc.bow&&!acc.hat?`<g transform="translate(-12 -20) rotate(20)">${treatSVG("bow")}</g>`:""}
    ${acc.bandana?`<path d="M-26 0 Q-16 6 -6 -2 L-14 12Z" fill="#B8423A"/><circle cx="-15" cy="4" r=".9" fill="#FBF7EE"/><circle cx="-12" cy="7" r=".9" fill="#FBF7EE"/>`:""}
    ${acc.bell?`<path d="M-28 1 Q-17 7 -7 -1" stroke="#34476B" stroke-width="2.6" fill="none"/><circle cx="-17" cy="6" r="2.6" fill="#D9A441"/><path d="M-17 7 v1.6" stroke="#8E6A2C" stroke-width=".8"/>`:""}
    ${acc.crown?`<g transform="translate(-20 -21)"><path d="M-6 4 L-6 -3 L-3 1 L0 -6 L3 1 L6 -3 L6 4Z" fill="#E8BE5E" stroke="#B9862C" stroke-width=".6"/><circle cx="0" cy="-6" r="1" fill="#B8423A"/></g>`:""}
  </g>`;
}
