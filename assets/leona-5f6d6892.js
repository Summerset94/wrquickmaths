import{j as a}from"./index-b8b36333.js";function o({currentLevel:r,mod:e,bonus:n,atk:s,def:c,champ:l}){const i=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," SUNLIGHT"]}),a.jsxs("p",{children:["Abilities apply Sunlight for 1.5 seconds. Other allied champions consume Sunlight when damaging enemies, dealing ",a.jsxs("abbr",{title:"34-160 based on level",className:"stat--ap",children:[Math.round(34+9*(r-1))," bonus magic damage"]})]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," SHIELD OF DAYBREAK"]}),a.jsxs("h5",{children:["Cooldown:"," ",(5*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",45," /"," ",50," /"," ",55," /"," ",60]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(15+s.ap*15/100)," /"," ",Math.round(50+s.ap*15/100)," /"," ",Math.round(85+s.ap*15/100)," /"," ",Math.round(120+s.ap*15/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((15+s.ap*15/100)*(1-e.defMagRed))," /"," ",Math.round((50+s.ap*15/100)*(1-e.defMagRed))," /"," ",Math.round((85+s.ap*15/100)*(1-e.defMagRed))," /"," ",Math.round((120+s.ap*15/100)*(1-e.defMagRed))]}),a.jsxs("p",{children:["Empowers the next attack to stun for 1 second and deal bonus ",a.jsx("span",{className:"stat--ap",children:"15 / 50 / 85 / 120 (+15% AP) magic damage"}),"."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," ECLIPSE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(14*e.atkcdr).toFixed(1)," /"," ",(13*e.atkcdr).toFixed(1)," /"," ",(12*e.atkcdr).toFixed(1)," /"," ",(11*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",60]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(60+s.ap*40/100)," /"," ",Math.round(95+s.ap*40/100)," /"," ",Math.round(130+s.ap*40/100)," /"," ",Math.round(165+s.ap*40/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((60+s.ap*40/100)*(1-e.defMagRed))," /"," ",Math.round((95+s.ap*40/100)*(1-e.defMagRed))," /"," ",Math.round((130+s.ap*40/100)*(1-e.defMagRed))," /"," ",Math.round((165+s.ap*40/100)*(1-e.defMagRed))]}),a.jsxs("h5",{children:["Bonus ",a.jsx("span",{className:"stat--armor",children:"Armor"})," and ",a.jsx("span",{className:"stat--magres",children:"Magic Resistance"}),":"]}),a.jsxs("p",{children:[a.jsx("span",{className:"stat--armor",children:Math.round(35+n.armor*20/100)}),", ",a.jsx("span",{className:"stat--magres",children:Math.round(35+n.magres*20/100)})," /"," ",a.jsx("span",{className:"stat--armor",children:Math.round(50+n.armor*20/100)}),", ",a.jsx("span",{className:"stat--magres",children:Math.round(50+n.magres*20/100)})," /"," ",a.jsx("span",{className:"stat--armor",children:Math.round(65+n.armor*20/100)}),", ",a.jsx("span",{className:"stat--magres",children:Math.round(65+n.magres*20/100)})," /"," ",a.jsx("span",{className:"stat--armor",children:Math.round(80+n.armor*20/100)}),", ",a.jsx("span",{className:"stat--magres",children:Math.round(80+n.magres*20/100)})]}),a.jsxs("p",{children:["For 3 seconds gain ",a.jsx("span",{className:"stat--armor",children:"35 / 50 / 65 / 80 (+20% bonus Armor) Armor"})," and ",a.jsx("span",{className:"stat--magres",children:"35 / 50 / 65 / 80 (+20% bonus Magic Resistance) Magic Resistance"})]}),a.jsxs("p",{children:["After the effects ends nearby enemies take ",a.jsx("span",{className:"stat--ap",children:"60 / 95 / 130 / 165 (+40% AP) magic damage"}),". If an enemy is hit, Leona retains her defensive bonuses for 3 seconds."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," ZENITH BLADE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(12*e.atkcdr).toFixed(1)," /"," ",(10*e.atkcdr).toFixed(1)," /"," ",(8*e.atkcdr).toFixed(1)," /"," ",(6*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",60]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(60+s.ap*40/100)," /"," ",Math.round(115+s.ap*40/100)," /"," ",Math.round(170+s.ap*40/100)," /"," ",Math.round(225+s.ap*40/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((60+s.ap*40/100)*(1-e.defMagRed))," /"," ",Math.round((115+s.ap*40/100)*(1-e.defMagRed))," /"," ",Math.round((170+s.ap*40/100)*(1-e.defMagRed))," /"," ",Math.round((225+s.ap*40/100)*(1-e.defMagRed))]}),a.jsxs("p",{children:["Deals ",a.jsx("span",{className:"stat--ap",children:"60 / 115 / 170 / 225 (+40% AP) magic damage"})," to enemies in a line."]}),a.jsx("p",{children:"Leona roots the last champion hit for 0.5 seconds and dashes to them."})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," SOLAR FLARE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(55*e.atkcdr).toFixed(1)," /"," ",(45*e.atkcdr).toFixed(1)," /"," ",(35*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(150+s.ap*80/100)," /"," ",Math.round(225+s.ap*80/100)," /"," ",Math.round(300+s.ap*80/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((150+s.ap*80/100)*(1-e.defMagRed))," /"," ",Math.round((225+s.ap*80/100)*(1-e.defMagRed))," /"," ",Math.round((300+s.ap*80/100)*(1-e.defMagRed))]}),a.jsxs("p",{children:["Calls down a beam of light, dealing ",a.jsx("span",{className:"stat--ap",children:"150 / 225 / 300 (+80% AP) magic damage"})," and slowing by ",a.jsx("span",{className:"stat--moveSpeed",children:"80%"})," for 1.5 seconds. Enemies in the center are stunned instead of slowed."]})]})}];return a.jsx(a.Fragment,{children:i.map((t,d)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:t.description},d)}))})}export{o as default};