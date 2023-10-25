import{j as a}from"./index-99cbdbed.js";function l({currentLevel:t,mod:s,bonus:r,atk:e,def:c}){const i=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," HEADSHOT"]}),a.jsxs("p",{children:["After 6 basic attacks (basic attacks from bush counts as 2) the next basic attack deals ",a.jsxs("abbr",{title:"50% - 100% based on level +125% critical strike chance. Shown pre/post-mitigation number",className:"stat--ad",children:[Math.round(e.attack*(50+(t<12?5*t-1:50)+e.critChance*125)/100)," (",Math.round(e.attack*(50+(t<12?5*t-1:50)+e.critChance*125)/100*(1-s.defPhysRed)),") bonus physical damage"]}),". ",a.jsx("b",{children:"Trapped"})," or ",a.jsx("b",{children:"Netted"})," enemies trigger a Headshot that has double range."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," PILLTOVER PEACEMAKER"]}),a.jsxs("h5",{children:["Cooldown:"," ",(9*s.atkcdr).toFixed(1)," /"," ",(8*s.atkcdr).toFixed(1)," /"," ",(7*s.atkcdr).toFixed(1)," /"," ",(6*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",50," /"," ",60," /"," ",70," /"," ",80]}),a.jsx("h5",{className:"stat--ad",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(60+e.attack*125/100)," /"," ",Math.round(110+e.attack*140/100)," /"," ",Math.round(160+e.attack*155/100)," /"," ",Math.round(210+e.attack*170/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((60+e.attack*125/100)*(1-s.defPhysRed))," /"," ",Math.round((110+e.attack*140/100)*(1-s.defPhysRed))," /"," ",Math.round((160+e.attack*155/100)*(1-s.defPhysRed))," /"," ",Math.round((210+e.attack*170/100)*(1-s.defPhysRed))]}),a.jsxs("p",{children:["Fires a narrow piercing bullet that deals ",a.jsx("span",{className:"stat--ad",children:" 60 / 110 / 160 / 210 (+ 125% / 140% / 155% / 170% AD) physical damage"}),". Hitting an enemy expands the bullet, but reduces subsequent damage by ",a.jsx("b",{children:"40%"}),". Always deals full damage to trapped or netted enemies."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," YORDLE SNAP TRAP"]}),a.jsxs("h5",{children:["Cooldown:"," ",(27*s.atkcdr).toFixed(1)," /"," ",(22*s.atkcdr).toFixed(1)," /"," ",(17*s.atkcdr).toFixed(1)," /"," ",(12*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",20," /"," ",20," /"," ",20," /"," ",20]}),a.jsx("h5",{children:"Active traps: 2 / 3 / 4 / 5"}),a.jsxs("p",{children:["Sets a trap. Enemy champions caught are immobilized for 1.5 seconds, revealed for a short duration and trigger a free ",a.jsx("b",{children:"Headshot"})," on them. Traps last for 30 seconds and  2 / 3 / 4 / 5 can be active at once."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," 90 CALIBER NET"]}),a.jsxs("h5",{children:["Cooldown:"," ",(16*s.atkcdr).toFixed(1)," /"," ",(14*s.atkcdr).toFixed(1)," /"," ",(12*s.atkcdr).toFixed(1)," /"," ",(10*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",75," /"," ",75," /"," ",75," /"," ",75]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(70+e.ap*80/100)," /"," ",Math.round(120+e.ap*80/100)," /"," ",Math.round(170+e.ap*80/100)," /"," ",Math.round(220+e.ap*80/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((70+e.ap*80/100)*(1-s.defMagRed))," /"," ",Math.round((120+e.ap*80/100)*(1-s.defMagRed))," /"," ",Math.round((170+e.ap*80/100)*(1-s.defMagRed))," /"," ",Math.round((220+e.ap*80/100)*(1-s.defMagRed))]}),a.jsxs("p",{children:["Fires a net, knocking Caitlyn backwards. The net deals ",a.jsx("span",{className:"stat--ap",children:"70 / 120 / 170 / 220 (+80% AP) magic damage"})," slows champion hit by 50% for 1.5 seconds and triggers a free ",a.jsx("b",{children:"Headshot"})," on them."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," ACE IN THE HOLE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(65*s.atkcdr).toFixed(1)," /"," ",(55*s.atkcdr).toFixed(1)," /"," ",(45*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100," /"," ",100," /"," ",100]}),a.jsx("h5",{className:"stat--ad",children:"Minimum damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(200+e.attack*200/100)," /"," ",Math.round(375+e.attack*200/100)," /"," ",Math.round(550+e.attack*200/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((200+e.attack*200/100)*(1-s.defPhysRed))," /"," ",Math.round((375+e.attack*200/100)*(1-s.defPhysRed))," /"," ",Math.round((550+e.attack*200/100)*(1-s.defPhysRed))]}),a.jsxs("p",{children:["Lines up the perfect shot, Revealing an enemy champion for 1.5 seconds before dealing ",a.jsxs("span",{className:"stat--ad",children:["200 / 375 / 550 (+200% AD) ",a.jsx("span",{className:"stat--hp",children:"(+20% of target's missing health)"})," physical damage"]}),". Enemy champions can intercept the bullet before it hits their ally."]})]})}];return a.jsx(a.Fragment,{children:i.map((d,n)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:d.description},n)}))})}export{l as default};
