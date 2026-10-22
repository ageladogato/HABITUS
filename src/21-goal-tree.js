function treeSVG(f, blooms){
  f = Math.max(0, Math.min(1, f)); const r = 12 + f*24;
  return `<svg class="tree anim" viewBox="0 0 100 100" aria-hidden="true"><ellipse cx="50" cy="94" rx="32" ry="5" fill="var(--shade)"/>
    <g class="sway"><path d="M50 94 C50 80 47 70 50 ${76 - f*18}" stroke="var(--pot-rim)" stroke-width="${3+f*4}" fill="none" stroke-linecap="round"/>
    <circle cx="50" cy="${66 - f*18}" r="${r}" fill="var(--leaf)"/><circle cx="${50 - r*.62}" cy="${73 - f*15}" r="${r*.6}" fill="var(--leaf-2)"/><circle cx="${50 + r*.66}" cy="${72 - f*15}" r="${r*.55}" fill="var(--leaf)"/>
    ${[[42,48],[58,44],[52,60],[36,62]].slice(0,blooms).map(([x,y])=>`<circle cx="${x}" cy="${y + (1-f)*16}" r="3.4" fill="var(--bloom)"/><circle cx="${x}" cy="${y + (1-f)*16}" r="1.3" fill="var(--ochre)"/>`).join("")}</g></svg>`;
}

