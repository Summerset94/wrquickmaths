import{j as a}from"./index-8dfca7b9.js";function o({currentLevel:i,mod:e,bonus:s,atk:t,def:h,champ:l}){const d=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," GOES WHERE HE PLEASES"]}),a.jsxs("p",{children:["Resists the first immobilizing effect, losing ",a.jsx("span",{className:"stat--hp",children:"3% current Health"})," instead and dropping a Chemical Canister nearby. ",a.jsx("br",{}),"Retrieving the Canister reduces cooldown by ",a.jsx("b",{children:"10"})," seconds and heals Dr. Mundo for ",a.jsxs("abbr",{title:"4% of Max Health",className:"stat--hp",children:[Math.round(t.health*4/100)," health"]}),"  ",a.jsx("abbr",{title:"at level 1 / 5 / 9 / 13",children:"(40 / 30 / 20 / 10 second CD)"}),". Regenerates ",a.jsxs("abbr",{title:"1%-2% based on level of Max Health",className:"stat--hp",children:[Math.round(t.health*(1+.07142857142857142*(i-1))/100)," health "]}),"every 5 seconds. ",a.jsx("br",{}),"Enemy champions destroy the Canister if they reach it first."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," INFECTED BONESAW"]}),a.jsxs("h5",{children:["Cooldown:"," ",(4*e.atkcdr).toFixed(1)," /"," ",(4*e.atkcdr).toFixed(1)," /"," ",(4*e.atkcdr).toFixed(1)," /"," ",(4*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--hp",children:["Cost:"," ",50," /"," ",50," /"," ",50," /"," ",50]}),a.jsx("h5",{className:"stat--ap",children:"Damage target at 100% hp"}),a.jsxs("p",{className:"stat--ap",children:[" ",Math.max(Math.round(h.health*20/100*(1-e.defMagRed)),90)," /"," ",Math.max(Math.round(h.health*23/100*(1-e.defMagRed)),160)," /"," ",Math.max(Math.round(h.health*26/100*(1-e.defMagRed)),230)," /"," ",Math.max(Math.round(h.health*29/100*(1-e.defMagRed)),300)]}),a.jsxs("p",{children:["Throw bonesaw, dealing magic damage equal to ",a.jsx("span",{className:"stat--ap",children:"20% / 23% / 26% / 29% of the target's current Health ( min: 90 / 160 / 230 / 300)"}),"  and slowing them by ",a.jsx("span",{className:"stat--moveSpeed",children:"40%"}),"  for 2 seconds. ",a.jsx("br",{}),"If bonesaw hits an enemy restore half of it's health cost. restore 100% upon hitting Champions or Monsters."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," HEART ZAPPER"]}),a.jsxs("h5",{children:["Cooldown:"," ",(13*e.atkcdr).toFixed(1)," /"," ",(12*e.atkcdr).toFixed(1)," /"," ",(11*e.atkcdr).toFixed(1)," /"," ",(10*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--hp",children:["Cost:"," ",5,"% Current Health"]}),a.jsx("h5",{className:"stat--ap",children:"Damage per tick:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(20+t.ap*0/100)," /"," ",Math.round(40+t.ap*0/100)," /"," ",Math.round(60+t.ap*0/100)," /"," ",Math.round(80+t.ap*0/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((20+t.ap*0/100)*(1-e.defMagRed))," /"," ",Math.round((40+t.ap*0/100)*(1-e.defMagRed))," /"," ",Math.round((60+t.ap*0/100)*(1-e.defMagRed))," /"," ",Math.round((80+t.ap*0/100)*(1-e.defMagRed))]}),a.jsx("h5",{className:"stat--ap",children:"Detonation damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(20+s.health*7/100)," /"," ",Math.round(40+s.health*7/100)," /"," ",Math.round(60+s.health*7/100)," /"," ",Math.round(80+s.health*7/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((20+s.health*7/100)*(1-e.defMagRed))," /"," ",Math.round((40+s.health*7/100)*(1-e.defMagRed))," /"," ",Math.round((60+s.health*7/100)*(1-e.defMagRed))," /"," ",Math.round((80+s.health*7/100)*(1-e.defMagRed))]}),a.jsxs("p",{children:["Charges a defibrillator for 4 seconds, dealing ",a.jsx("span",{className:"stat--ap",children:"20 / 40 / 60 / 80 magic damage"})," per second to nearby enemies.",a.jsx("b",{children:"RECAST:"})," Detonates the defibrillator, dealing ",a.jsxs("span",{className:"stat--ap",children:["20 / 40 / 60 / 80 ",a.jsx("span",{className:"stat--hp",children:"(+7% bonus HP) "}),"magic damage"]})," to nearby enemies. If the detonation damaged an enemy, Dr. Mundo heals for ",a.jsx("span",{className:"stat--hp",children:"15%"})," of the damage taken ",a.jsx("u",{children:"during Heart Zapper's duration"}),".  If it damaged a champion or monster he heals ",a.jsx("span",{className:"stat--hp",children:"30% / 35% / 40% / 45%"})," instead."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," BLUNT FORCE TRAUMA"]}),a.jsxs("h5",{children:["Cooldown:"," ",(8*e.atkcdr).toFixed(1)," /"," ",(7*e.atkcdr).toFixed(1)," /"," ",(7*e.atkcdr).toFixed(1)," /"," ",(6*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--hp",children:["Cost:"," ",10," /"," ",20," /"," ",30," /"," ",40]}),a.jsx("h5",{className:"stat--ad",children:"Min damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(5+s.health*7/100)," /"," ",Math.round(20+s.health*7/100)," /"," ",Math.round(35+s.health*7/100)," /"," ",Math.round(50+s.health*7/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((5+s.health*7/100)*(1-e.defPhysRed))," /"," ",Math.round((20+s.health*7/100)*(1-e.defPhysRed))," /"," ",Math.round((35+s.health*7/100)*(1-e.defPhysRed))," /"," ",Math.round((50+s.health*7/100)*(1-e.defPhysRed))]}),a.jsx("h5",{className:"stat--ad",children:"Max damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round((5+s.health*7/100)*1.6)," /"," ",Math.round((20+s.health*7/100)*1.6)," /"," ",Math.round((35+s.health*7/100)*1.6)," /"," ",Math.round((50+s.health*7/100)*1.6)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((5+s.health*7/100*1.6)*(1-e.defPhysRed))," /"," ",Math.round((20+s.health*7/100*1.6)*(1-e.defPhysRed))," /"," ",Math.round((35+s.health*7/100*1.6)*(1-e.defPhysRed))," /"," ",Math.round((50+s.health*7/100*1.6)*(1-e.defPhysRed))]}),a.jsxs("p",{children:["Passive: Dr. Mundo gains ",a.jsx("span",{className:"stat--ad",children:"15 / 20 / 25 / 30, plus up to 30 / 45 / 50 / 60 Attack Damage"})," based on his missing health. Active: Empowers his next attack to deal an addition ",a.jsxs("span",{className:"stat--ad",children:["5 / 20 / 35 / 50 ",a.jsx("span",{className:"stat--hp",children:"(+7% bonus HP)"})," physical damage"]}),", increased by up to ",a.jsx("abbr",{title:"max bonus at 40% missing health",children:"60%"})," based on Dr. Mundo's missing heath. Dr. Mundo swats the target away if it was killed or was a small monster, dealing the same damage to enemies."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," MAXIMUM DOSAGE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(70*e.atkcdr).toFixed(1)," /"," ",(65*e.atkcdr).toFixed(1)," /"," ",(60*e.atkcdr).toFixed(1)]}),a.jsx("h5",{className:"stat--hp",children:"Healing:"}),a.jsxs("p",{className:"stat--hp",children:[Math.round(t.health*15/100)," /"," ",Math.round(t.health*35/100)," /"," ",Math.round(t.health*55/100)]}),a.jsxs("h5",{className:"stat--ad",children:["Bonus AD:"," ",Math.round(s.health*4/100)," /"," ",Math.round(s.health*5.5/100)," /"," ",Math.round(s.health*7/100)]}),a.jsxs("p",{children:["Dr. Mundo's base Health is increased by ",a.jsx("span",{className:"stat--hp",children:"25% / 30% / 35% of his missing Health"}),". He also gains ",a.jsx("span",{className:"stat--ad",children:"Attack Damage equal to 4% / 5.5% / 7% bonus HP"}),", ",a.jsx("span",{className:"stat--moveSpeed",children:"15% / 25% / 35% Movement Speed for 10 seconds"})," and heals ",a.jsx("span",{className:"stat--hp",children:"15% / 35% / 55%"})," of his maximum Health over the duration."]})]})}];return a.jsx(a.Fragment,{children:d.map((r,n)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:r.description},n)}))})}export{o as default};