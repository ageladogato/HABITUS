/* ---------- sidekicks (resting, head around (-20,-8)) ---------- */
function petAccessories(acc, hx, hy){
  acc = acc || {}; if (!Object.values(acc).some(Boolean)) return "";
  return `<g transform="translate(${hx+20} ${hy+8})">
    ${acc.scarf?`<g transform="translate(-14 2)">${treatSVG("scarf")}</g>`:""}
    ${acc.hat?`<g transform="translate(-21 -15) rotate(-15)">${treatSVG("hat")}</g>`:""}
    ${acc.bow&&!acc.hat?`<g transform="translate(-12 -20) rotate(20)">${treatSVG("bow")}</g>`:""}
    ${acc.bandana?`<path d="M-26 0 Q-16 6 -6 -2 L-14 12Z" fill="#B8423A"/>`:""}
    ${acc.bell?`<path d="M-28 1 Q-17 7 -7 -1" stroke="#34476B" stroke-width="2.6" fill="none"/><circle cx="-17" cy="6" r="2.6" fill="#D9A441"/>`:""}
    ${acc.crown&&!acc.hat?`<g transform="translate(-20 -21)"><path d="M-6 4 L-6 -3 L-3 1 L0 -6 L3 1 L6 -3 L6 4Z" fill="#E8BE5E" stroke="#B9862C" stroke-width=".6"/></g>`:""}</g>`;
}
const sleepEyes = (x,y) => `<path d="M${x-5} ${y} q2 2 4 0 M${x+2} ${y-1} q2 2 4 0" stroke="#3B2E22" stroke-width="1.1" fill="none" stroke-linecap="round"/>`;
function petSVG(kind, alt, acc){
  let s = "", hx = -20, hy = -8;
  switch(kind){
    case "dog": { const c = alt ? "#EFE2C8" : "#C98A4A", d = shade(c,-.2);
      s = `<path class="tail" d="M24 -2 q12 -10 8 -20" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/><g class="breathe"><ellipse rx="27" ry="14" fill="${c}"/><ellipse cx="6" cy="2" rx="10" ry="6" fill="${d}" opacity=".5"/></g><ellipse cx="-14" cy="12" rx="8" ry="3.4" fill="${c}"/><ellipse cx="4" cy="13" rx="8" ry="3.4" fill="${c}"/><circle cx="-20" cy="-8" r="11.5" fill="${c}"/><ellipse cx="-31" cy="-4" rx="6" ry="4" fill="${shade(c,.15)}"/><circle cx="-36" cy="-5" r="1.8" fill="#2B2B2B"/><path d="M-14 -16 q8 2 6 14 q-6 -2 -6 -14Z" fill="${d}"/>${sleepEyes(-21,-9)}`; break; }
    case "bunny": { const c = alt ? "#C9B8A6" : "#F4EDE0";
      hx = -16; hy = -6;
      s = `<g class="breathe"><ellipse cx="4" rx="20" ry="15" fill="${c}" stroke="#D9CFBC" stroke-width=".6"/></g><circle cx="24" cy="2" r="5" fill="#FFF"/><g class="earwiggle"><ellipse cx="-20" cy="-26" rx="4" ry="12" transform="rotate(-12 -20 -26)" fill="${c}" stroke="#D9CFBC" stroke-width=".6"/><ellipse cx="-12" cy="-27" rx="4" ry="12" transform="rotate(10 -12 -27)" fill="${c}" stroke="#D9CFBC" stroke-width=".6"/><ellipse cx="-12" cy="-27" rx="1.8" ry="8" transform="rotate(10 -12 -27)" fill="#F4C6CF"/></g><circle cx="-16" cy="-6" r="10.5" fill="${c}" stroke="#D9CFBC" stroke-width=".6"/><circle cx="-24" cy="-3" r="1.3" fill="#E08A9A"/>${sleepEyes(-17,-7)}`; break; }
    case "fox": { const c = alt ? "#E8C690" : "#D9733A";
      s = `<path class="tail" d="M20 4 Q40 -4 36 -20 Q30 -10 18 -4Z" fill="${c}"/><path d="M36 -20 Q34 -14 30 -12" stroke="#FBF7EE" stroke-width="4" stroke-linecap="round"/><g class="breathe"><ellipse rx="25" ry="13" fill="${c}"/><ellipse cx="-4" cy="5" rx="14" ry="6" fill="#FBF7EE" opacity=".8"/></g><path d="M-31 -6 L-20 -20 L-9 -6 Q-20 4 -31 -6Z" fill="${c}"/><path d="M-30 -14 L-27 -26 L-22 -17Z M-18 -17 L-13 -26 L-11 -14Z" fill="${c}"/><path d="M-31 -6 Q-25 0 -20 -2 Q-26 -4 -31 -6Z" fill="#FBF7EE"/><circle cx="-31" cy="-6" r="1.6" fill="#2B2B2B"/>${sleepEyes(-20,-11)}`; hy = -12; break; }
    case "duck": { const c = alt ? "#F2D27A" : "#FBF7EE";
      hx = -14; hy = -14;
      s = `<g class="breathe"><ellipse cx="2" rx="22" ry="13" fill="${c}" stroke="#D9CFBC" stroke-width=".6"/><path d="M-2 -2 Q10 -6 18 2" stroke="#D9CFBC" stroke-width="1.2" fill="none"/></g><path d="M22 -4 l8 -4 l-2 8Z" fill="${c}"/><circle cx="-14" cy="-14" r="9" fill="${c}" stroke="#D9CFBC" stroke-width=".6"/><path d="M-23 -13 h-8 q2 4 8 3Z" fill="#E8973A"/><circle cx="-17" cy="-16" r="1.3" fill="#2B2B2B"/>`; break; }
    case "hedgehog": { const c = alt ? "#B9A48A" : "#7A5A42";
      s = `<g class="breathe"><path d="M-14 8 Q-20 -18 6 -20 Q30 -18 28 8Z" fill="${c}"/>${Array.from({length:9},(_,i)=>`<path d="M${-12+i*4.6} ${-16+Math.abs(i-4)*2} l2 -7 l2 7" fill="${shade(c,-.25)}"/>`).join("")}</g><path d="M-14 8 Q-30 6 -32 -2 Q-26 -10 -14 -8Z" fill="#E8D2B4"/><circle cx="-32" cy="-2" r="2" fill="#2B2B2B"/>${sleepEyes(-21,-4)}`; hx = -22; hy = -4; break; }
    case "tortoise": { const c = alt ? "#B9C98A" : "#7A9A55";
      s = `<ellipse cx="-24" cy="-2" rx="7" ry="5.6" fill="#A9B47F"/><path d="M-30 -3 q2 2 4 0" stroke="#3B2E22" stroke-width="1" fill="none"/><ellipse cx="-12" cy="8" rx="5" ry="3" fill="#A9B47F"/><ellipse cx="14" cy="8" rx="5" ry="3" fill="#A9B47F"/><g class="breathe"><path d="M-18 6 Q-18 -18 2 -18 Q22 -18 22 6Z" fill="${c}"/>${[[-8,-6],[4,-10],[12,-2],[0,0]].map(([x,y])=>`<path d="M${x-5} ${y} l5 -4 l5 4 l-5 4Z" fill="${shade(c,-.2)}"/>`).join("")}<path d="M-18 6 H22" stroke="${shade(c,-.3)}" stroke-width="2"/></g>`; hx = -24; hy = -4; break; }
    case "panda": { const c = alt ? "#E8B07A" : "#C2552A";
      s = `<path class="tail" d="M22 2 Q40 0 38 -14" stroke="${c}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M28 0 l4 -6 M34 -4 l3 -6" stroke="#F4EDE0" stroke-width="2"/><g class="breathe"><ellipse rx="25" ry="14" fill="${c}"/><ellipse cy="8" rx="20" ry="6" fill="#3B2A22" opacity=".7"/></g><circle cx="-20" cy="-8" r="12" fill="${c}"/><path d="M-30 -18 L-27 -23 L-23 -18Z M-17 -18 L-13 -23 L-10 -18Z" fill="${c}" stroke="#F4EDE0" stroke-width="1"/><ellipse cx="-26" cy="-3" rx="5" ry="3.6" fill="#F4EDE0"/><circle cx="-29" cy="-4" r="1.4" fill="#2B2B2B"/><path d="M-26 -14 q-3 2 -1 6 M-15 -14 q3 2 1 6" stroke="#F4EDE0" stroke-width="1.6" fill="none"/>${sleepEyes(-20,-9)}`; break; }
    default: return catCurled(alt ? "var(--cat-light)" : "var(--cat-dark)", alt ? "#3B2E22" : "var(--window)", null, acc);
  }
  return `<g>${s}${petAccessories(acc, hx, hy)}</g>`;
}
/* ---------- passers-by ---------- */
const WALKERS = new Set(["hutong","seine","jardin","borghese","ueno","central","crissy","philopappou","southbank","nyhavn","lodhi","houhai"]);
