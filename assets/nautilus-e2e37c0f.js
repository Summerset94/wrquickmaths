import{j as a}from"./index-b373cb2d.js";function o({currentLevel:t,mod:e,bonus:r,atk:s,def:l,champ:h}){const i=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," STAGGERING BLOW"]}),a.jsxs("p",{children:["Attacks deal an additional ",a.jsxs("abbr",{title:"13 + 8 per level",className:"stat--ad",children:[13+Number(t*8)," physical damage"]})," and root the target for ",a.jsxs("abbr",{title:"1-1.75 based on level",children:[(1+.05357*(t-1)).toFixed(2)," seconds"]}),"."]}),a.jsx("p",{children:"6 seconds cooldown for the same target"})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," DREDGE LINE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(12*e.atkcdr).toFixed(1)," /"," ",(11*e.atkcdr).toFixed(1)," /"," ",(10*e.atkcdr).toFixed(1)," /"," ",(9*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",60]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(60+s.ap*90/100)," /"," ",Math.round(120+s.ap*90/100)," /"," ",Math.round(180+s.ap*90/100)," /"," ",Math.round(240+s.ap*90/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((60+s.ap*90/100)*(1-e.defMagRed))," /"," ",Math.round((120+s.ap*90/100)*(1-e.defMagRed))," /"," ",Math.round((180+s.ap*90/100)*(1-e.defMagRed))," /"," ",Math.round((240+s.ap*90/100)*(1-e.defMagRed))]}),a.jsxs("p",{children:["Hurls his anchor forward, dealing ",a.jsx("span",{className:"stat--ap",children:"60 / 120 / 180 / 240 (+90% AP) magic damage"})," to the first target hit and pulling them and Nautilus together."]}),a.jsx("p",{children:"if the anchor hits terrain, Nautilus pulls himself to the terrain and 50% of DREDGE LINE'S cooldown and mana coast are refunded."})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," TITAN'S WRATH"]}),a.jsxs("h5",{children:["Cooldown:"," ",(11*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",80]}),a.jsx("h5",{className:"stat--hp",children:"Shield:"}),a.jsxs("p",{className:"stat--hp",children:[Math.round(55+s.health*11/100)," /"," ",Math.round(65+s.health*12/100)," /"," ",Math.round(75+s.health*13/100)," /"," ",Math.round(85+s.health*14/100)]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(40+s.ap*40/100)," /"," ",Math.round(50+s.ap*40/100)," /"," ",Math.round(60+s.ap*40/100)," /"," ",Math.round(70+s.ap*40/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((40+s.ap*40/100)*(1-e.defMagRed))," /"," ",Math.round((50+s.ap*40/100)*(1-e.defMagRed))," /"," ",Math.round((60+s.ap*40/100)*(1-e.defMagRed))," /"," ",Math.round((70+s.ap*40/100)*(1-e.defMagRed))]}),a.jsxs("p",{children:["Gains a shield that absorbs ",a.jsx("span",{className:"stat--hp",children:"55 / 65 / 75 / 85 (+10 / 11 / 12 / 13% Max Health) damage"})," for 6 seconds."]}),a.jsxs("p",{children:["While the shield holds, Nautilus attacks are empowered to deal an additional ",a.jsx("span",{className:"stat--ap",children:"40 / 50 / 60 / 70 (+40% AP) magic damage"})," around the target."]}),a.jsx("p",{children:"Deals 200% damage against monsters."})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," RIPTIDE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(6.5*e.atkcdr).toFixed(1)," /"," ",(6*e.atkcdr).toFixed(1)," /"," ",(5.5*e.atkcdr).toFixed(1)," /"," ",(5*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",60," /"," ",70," /"," ",80," /"," ",90]}),a.jsxs("p",{children:["Sends weaves emanating outwards that deal ",a.jsx("span",{className:"stat--ap",children:"60 / 100 / 140 / 180 (+50% AP) magic damage"})," and slow by ",a.jsx("span",{className:"stat--moveSpeed",children:"35 / 40 / 45 / 50%"}),"  decaying over 1.5 seconds."]}),a.jsxs("p",{children:["Enemies hit by subsequent waves take ",a.jsx("span",{className:"stat--critChance",children:"50%"})," damage."]}),a.jsx("p",{children:"Deals 175% damage against monsters."})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," DEPTH CHARGE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(60*e.atkcdr).toFixed(1)," /"," ",(50*e.atkcdr).toFixed(1)," /"," ",(40*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(150+s.ap*80/100)," /"," ",Math.round(275+s.ap*80/100)," /"," ",Math.round(400+s.ap*80/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((150+s.ap*80/100)*(1-e.defMagRed))," /"," ",Math.round((275+s.ap*80/100)*(1-e.defMagRed))," /"," ",Math.round((400+s.ap*80/100)*(1-e.defMagRed))]}),a.jsxs("p",{children:["Nautilus fires a ",a.jsx("b",{children:"DEPTH CHARGE"})," that locks up on enemy champion and slowly travels towards the target, dealing ",a.jsx("span",{className:"stat--ap",children:"150 / 275 / 400 (+80% AP) magic damage"}),", knocking them Up and Stunning them for 1/1.5/2 seconds."]}),a.jsxs("p",{children:["Other enemies hit by the DEPTH CHARGE are also Knocked Up and Stunned and take ",a.jsx("span",{className:"stat--ap",children:"125 / 175 / 225 (+40% AP) magic damage"}),"."]})]})}];return a.jsx(a.Fragment,{children:i.map((n,d)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:n.description},d)}))})}export{o as default};