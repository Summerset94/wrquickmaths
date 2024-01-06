import{j as a}from"./index-e0eb6c18.js";function o({currentLevel:d,mod:e,bonus:i,atk:s,def:l,champ:t}){const n=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," SECOND SKIN"]}),a.jsxs("p",{children:[a.jsx("b",{children:"Living weapon:"})," Kai'sa's abilities evolve on finishing full item."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Caustic Wounds:"}),"  Kai'sa's attacks stack Plasma for 4 seconds and deal ",a.jsxs("span",{className:"stat--ap",children:[(4.5+d/2).toFixed(1)," (+15% AP) bonus magic damage"]}),". Plasma detonates at 5 stacks, dealing ",a.jsx("span",{className:"stat--ap",children:"15% (+0.025% AP) bonus magic damage"})," of their missing Health."]}),a.jsx("p",{children:"Nearby allies apply 1 stack to champions they Immobilize."}),a.jsx("p",{children:"Plasma detonations deal a max of 400 damage to monsters."})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," ICATHIAN RAIN"]}),a.jsxs("h5",{children:["Cooldown:"," ",(9*e.atkcdr).toFixed(1)," /"," ",(8*e.atkcdr).toFixed(1)," /"," ",(7*e.atkcdr).toFixed(1)," /"," ",(6*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",55," /"," ",55," /"," ",55," /"," ",55]}),a.jsx("h5",{className:"stat--ad",children:"Damage per missile:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(40+i.attack*50/100+s.ap*30/100)," /"," ",Math.round(60+i.attack*50/100+s.ap*30/100)," /"," ",Math.round(80+i.attack*50/100+s.ap*30/100)," /"," ",Math.round(100+i.attack*50/100+s.ap*30/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((40+i.attack*50/100+s.ap*30/100)*(1-e.defPhysRed))," /"," ",Math.round((60+i.attack*50/100+s.ap*30/100)*(1-e.defPhysRed))," /"," ",Math.round((80+i.attack*50/100+s.ap*30/100)*(1-e.defPhysRed))," /"," ",Math.round((100+i.attack*50/100+s.ap*30/100)*(1-e.defPhysRed))]}),a.jsxs("p",{children:["Launches 6 missiles that split evenly among nearby enemies, each dealing ",a.jsxs("span",{className:"stat--ad",children:["40 / 60 / 80 / 100 (+50% bonus AD ",a.jsx("span",{className:"stat--ap",children:"+30% AP"}),") physical damage"]}),". Additional hits on champions or monsters deal 25% damage."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Living Weapon:"}),"  Icathain Rain instead fires 12 missiles."]}),a.jsx("p",{children:"Minions below 35% health take 150% damage."})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," VOID SEEKER"]}),a.jsxs("h5",{children:["Cooldown:"," ",(20*e.atkcdr).toFixed(1)," /"," ",(18*e.atkcdr).toFixed(1)," /"," ",(16*e.atkcdr).toFixed(1)," /"," ",(14*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",60," /"," ",65," /"," ",70," /"," ",75]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(30+s.ap*60/100+s.attack*110/100)," /"," ",Math.round(60+s.ap*60/100+s.attack*110/100)," /"," ",Math.round(90+s.ap*60/100+s.attack*110/100)," /"," ",Math.round(120+s.ap*60/100+s.attack*110/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((30+s.ap*60/100+s.attack*110/100)*(1-e.defMagRed))," /"," ",Math.round((60+s.ap*60/100+s.attack*110/100)*(1-e.defMagRed))," /"," ",Math.round((90+s.ap*60/100+s.attack*110/100)*(1-e.defMagRed))," /"," ",Math.round((120+s.ap*60/100+s.attack*110/100)*(1-e.defMagRed))]}),a.jsxs("p",{children:["Fires a blast that reveals the first enemy hit, adds 2 Plasma stacks, and deals ",a.jsxs("span",{className:"stat--ap",children:["30 / 60 / 90 / 120 (",a.jsx("span",{className:"stat--ad",children:"+110% AD"})," +60% AP) magic damage"]}),"."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Living Weapon:"})," Adds 3 stacks and refunds 70% Cooldown on champion hits."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," SUPERCHARGE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(16*e.atkcdr).toFixed(1)," /"," ",(14*e.atkcdr).toFixed(1)," /"," ",(12*e.atkcdr).toFixed(1)," /"," ",(10*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",30," /"," ",30," /"," ",30," /"," ",30]}),a.jsxs("p",{children:["Charges up for 1 second, gaining ",a.jsxs("abbr",{title:"60% / 65% / 70% / 75% (+100% Attack Speed)",className:"stat--moveSpeed",children:[Math.round(s.moveSpeed*60/100+i.as/t.asBase/100)," / ",Math.round(s.moveSpeed*65/100+i.as/t.asBase/100)," / ",Math.round(s.moveSpeed*70/100+i.as/t.asBase/100)," / ",Math.round(s.moveSpeed*75/100+i.as/t.asBase/100)," Movement Speed"]}),"."]}),a.jsxs("p",{children:["For 4 seconds after charging gain ",a.jsxs("abbr",{title:"45% / 55% / 65% / 75%",className:"stat--as",children:[(t.asBase*45/100).toFixed(3)," / ",(t.asBase*55/100).toFixed(3)," / ",(t.asBase*65/100).toFixed(3)," / ",(t.asBase*75/100).toFixed(3)," Attack speed"]}),"."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Living Weapon:"})," Grants invisibility during the charge up."]}),a.jsx("p",{children:"Attacks reduce Supercharge's Cooldown by 0.5 seconds.  Charge time and Movement Speed scale with Attack Speed."})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," KILLER INSTINCT"]}),a.jsxs("h5",{children:["Cooldown:"," ",(80*e.atkcdr).toFixed(1)," /"," ",(70*e.atkcdr).toFixed(1)," /"," ",(60*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100," /"," ",100," /"," ",100]}),a.jsx("h5",{className:"stat--hp",children:"Shield strength:"}),a.jsxs("p",{className:"stat--hp",children:[Math.round(75+s.attack*100/100+s.ap*70/100)," /"," ",Math.round(100+s.attack*100/100+s.ap*70/100)," /"," ",Math.round(125+s.attack*100/100+s.ap*70/100)]}),a.jsxs("p",{children:["Dash to a location near an enemy champion marked by Plasma, gaining a shield that aborbs ",a.jsxs("span",{className:"stat--hp",children:["75 / 100 / 125 (",a.jsx("span",{className:"stat--ad",children:"+100% AD"})," ",a.jsx("span",{className:"stat--ap",children:"+75% AP"}),") damage"]})," for 2 seconds."]})]})}];return a.jsx(a.Fragment,{children:n.map((c,r)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:c.description},r)}))})}export{o as default};