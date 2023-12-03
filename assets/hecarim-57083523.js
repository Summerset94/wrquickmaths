import{j as a}from"./index-77f38fe5.js";function o({currentLevel:n,mod:s,bonus:t,atk:e,def:c,champ:h}){const i=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," WARPATH"]}),a.jsxs("p",{children:["Hecarim gains ",a.jsxs("abbr",{title:"12% bonus MoveSpeed",className:"stat--ad",children:[Math.round(t.moveSpeed*12/100)," bonus Attack Damage"]})]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," RAMPAGE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(4.5*s.atkcdr).toFixed(1)," /"," ",(4*s.atkcdr).toFixed(1)," /"," ",(3.5*s.atkcdr).toFixed(1)," /"," ",(3*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",28," /"," ",32," /"," ",36," /"," ",40]}),a.jsx("h5",{className:"stat--ad",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(5+e.attack*110/100)," /"," ",Math.round(15+e.attack*110/100)," /"," ",Math.round(25+e.attack*110/100)," /"," ",Math.round(35+e.attack*110/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((5+e.attack*110/100)*(1-s.defPhysRed))," /"," ",Math.round((15+e.attack*110/100)*(1-s.defPhysRed))," /"," ",Math.round((25+e.attack*110/100)*(1-s.defPhysRed))," /"," ",Math.round((35+e.attack*110/100)*(1-s.defPhysRed))]}),a.jsxs("p",{children:[a.jsx("b",{children:"TAP:"})," Hecarim charges his halberd for up to ",a.jsx("b",{children:"0.75 seconds"}),", increasing the area Hecarim will deal damage to.",a.jsx("br",{}),a.jsx("b",{children:"CAST:"})," Hecarim swings his haleberd, dealing up to ",a.jsx("span",{className:"stat--ad",children:"5 / 15 / 25 / 35 (+110% AD) physical damage "}),"based on charge time. ",a.jsx("br",{}),"If Hecarim hits an enemy champion or a large monster with a full charge, he ",a.jsx("span",{className:"stat--critChance",children:"critically strikes them for 120% damage"}),"  and gains a ",a.jsx("span",{className:"stat--moveSpeed",children:"40% Movement Speed"})," bonus that decays over 3 seconds. ",a.jsx("br",{}),"This also empowers Hecarim's next Rampage within the next 8 seconds to deal ",a.jsx("span",{className:"stat--ad",children:"125% damage"}),"."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," SPIRIT OF DREAD"]}),a.jsxs("h5",{children:["Cooldown:"," ",(16*s.atkcdr).toFixed(1)," /"," ",(15*s.atkcdr).toFixed(1)," /"," ",(14*s.atkcdr).toFixed(1)," /"," ",(15*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",50," /"," ",60," /"," ",70," /"," ",80]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(15+e.ap*20/100)," /"," ",Math.round(20+e.ap*20/100)," /"," ",Math.round(25+e.ap*20/100)," /"," ",Math.round(30+e.ap*20/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((15+e.ap*20/100)*(1-s.defMagRed))," /"," ",Math.round((20+e.ap*20/100)*(1-s.defMagRed))," /"," ",Math.round((25+e.ap*20/100)*(1-s.defMagRed))," /"," ",Math.round((30+e.ap*20/100)*(1-s.defMagRed))]}),a.jsx("h5",{className:"stat--hp",children:"Base Healing:"}),a.jsxs("p",{className:"stat--hp",children:[Math.round(5+e.health/100)," /"," ",Math.round(10+e.health/100)," /"," ",Math.round(15+e.health/100)," /"," ",Math.round(20+e.health/100)]}),a.jsxs("p",{children:["Gains ",a.jsx("span",{className:"stat--armor",children:"6 / 12 / 18 / 24 Armor"})," and ",a.jsx("span",{className:"stat--magres",children:"Magic Resist"}),", and heals himself for ",a.jsx("span",{className:"stat--hp",children:"5 / 10 / 15 / 20 (+1% HP) Health"}),". ",a.jsx("br",{}),"Deals ",a.jsx("span",{className:"stat--ap",children:"15 / 20 / 25 / 30 (+20% AP) magic damage over 4 seconds"})," to nearby enemies. ",a.jsx("br",{}),"Dealing damage to enemies heals him for ",a.jsx("span",{className:"stat--ad",children:"(20% of damage dealt + 0.02% bonus AD)"})," % of his Health. Healing from minions and monsters is reduced by 50% and capped at ",a.jsx("span",{className:"stat--hp",children:"90 Health"}),"."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," DEVASTATING CHARGE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(18*s.atkcdr).toFixed(1)," /"," ",(17*s.atkcdr).toFixed(1)," /"," ",(16*s.atkcdr).toFixed(1)," /"," ",(15*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",60," /"," ",60," /"," ",60," /"," ",60]}),a.jsx("h5",{className:"stat--ad",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(5+t.attack*30/100)," /"," ",Math.round(10+t.attack*30/100)," /"," ",Math.round(15+t.attack*30/100)," /"," ",Math.round(20+t.attack*30/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((5+t.attack*30/100)*(1-s.defPhysRed))," /"," ",Math.round((10+t.attack*30/100)*(1-s.defPhysRed))," /"," ",Math.round((15+t.attack*30/100)*(1-s.defPhysRed))," /"," ",Math.round((20+t.attack*30/100)*(1-s.defPhysRed))]}),a.jsxs("p",{children:["Gains ",a.jsxs("span",{className:"stat--moveSpeed",children:["25% (",Math.round(e.moveSpeed*25/100),") Movement Speed, wich increases to 65% (",Math.round(e.moveSpeed*65/100),")"]}),"  over 4 seconds. ",a.jsx("br",{}),"Hecarim dashes toward the enemy if his next attack is withing 5 seconds, dealing ",a.jsx("span",{className:"stat--ad",children:"5 / 10 / 15 / 20 (+30% bonus AD) physical damage"})," and kocking them back. ",a.jsx("br",{}),"He will also pursue the enemy that was knocked back. The remaining duration of this ability is paused during ",a.jsx("b",{children:"Onslaught of Shadows"}),"."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," ONSLAUGHT OF SHADOWS"]}),a.jsxs("h5",{children:["Cooldown:"," ",(100*s.atkcdr).toFixed(1)," /"," ",(85*s.atkcdr).toFixed(1)," /"," ",(70*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100," /"," ",100," /"," ",100]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(150+e.ap*100/100)," /"," ",Math.round(250+e.ap*100/100)," /"," ",Math.round(350+e.ap*100/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((150+e.ap*100/100)*(1-s.defMagRed))," /"," ",Math.round((250+e.ap*100/100)*(1-s.defMagRed))," /"," ",Math.round((350+e.ap*100/100)*(1-s.defMagRed))]}),a.jsxs("p",{children:["Hecarim summons spectral riders and charges forward, dealing ",a.jsx("span",{className:"stat--ap",children:"150 / 250 / 350 (+100% AP) magic damage"}),". ",a.jsx("br",{}),"Hecarim unleashes a shockwave at the end of the charge that Fears for between ",a.jsx("b",{children:"0.75 to 1.5 seconds"}),", increased by charge distance."]})]})}];return a.jsx(a.Fragment,{children:i.map((d,r)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:d.description},r)}))})}export{o as default};